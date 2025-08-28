import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

import AuthLayout from '../login-screen/components/AuthLayout';
import RegistrationForm from './components/RegistrationForm';
import StepIndicator from './components/StepIndicator';
import BusinessDetailsForm from './components/BusinessDetailsForm';
import VerificationStep from './components/VerificationStep';

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [error, setError] = useState(null);
  const [registrationData, setRegistrationData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
    clearErrors,
    getValues
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      businessType: '',
      businessSize: '',
      industry: ''
    }
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const email = watch('email');

  // Calculate password strength
  React.useEffect(() => {
    if (password) {
      let strength = 0;
      if (password?.length >= 8) strength += 1;
      if (/[A-Z]/?.test(password)) strength += 1;
      if (/[a-z]/?.test(password)) strength += 1;
      if (/[0-9]/?.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/?.test(password)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const steps = [
    { number: 1, title: 'Account Details', description: 'Create your account' },
    { number: 2, title: 'Business Information', description: 'Tell us about your business' },
    { number: 3, title: 'Verification', description: 'Verify your email' }
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      if (currentStep === 1) {
        // Validate account details
        await trigger(['fullName', 'email', 'password', 'confirmPassword']);
        if (!acceptTerms) {
          setError('Please accept the terms and conditions to continue');
          return;
        }
        
        // Store account data and proceed to next step
        setRegistrationData(prev => ({ ...prev, ...data }));
        setCurrentStep(2);
        
      } else if (currentStep === 2) {
        // Validate business details
        await trigger(['businessName', 'businessType', 'businessSize', 'industry']);
        
        // Store business data and proceed to verification
        const fullData = { ...registrationData, ...data };
        setRegistrationData(fullData);
        
        // Simulate API call to create account
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Send verification email (simulate)
        setCurrentStep(3);
        
      } else if (currentStep === 3) {
        // Complete registration and redirect
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/agent-setup-wizard');
      }
      
    } catch (error) {
      console?.error('Registration error:', error);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegistration = async (provider) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social registration - go straight to business details
      setCurrentStep(2);
    } catch (error) {
      console?.error('Social registration error:', error);
      setError(`Failed to register with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleInputFocus = (fieldName) => {
    clearErrors(fieldName);
    setError(null);
  };

  const resendVerification = async () => {
    setLoading(true);
    try {
      // Simulate resending verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message (could be implemented with toast)
    } catch (error) {
      setError('Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Join thousands of businesses growing with AI
          </p>
        </motion.div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-destructive text-sm text-center">
              {error}
            </p>
          </motion.div>
        )}

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-8 rounded-xl shadow-elevation-2 border border-border"
        >
          {currentStep === 1 && (
            <RegistrationForm
              onSubmit={handleSubmit(onSubmit)}
              loading={loading}
              register={register}
              errors={errors}
              password={password}
              confirmPassword={confirmPassword}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              showConfirmPassword={showConfirmPassword}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              passwordStrength={passwordStrength}
              acceptTerms={acceptTerms}
              onAcceptTermsChange={setAcceptTerms}
              subscribeNewsletter={subscribeNewsletter}
              onSubscribeNewsletterChange={setSubscribeNewsletter}
              onInputFocus={handleInputFocus}
              onSocialRegistration={handleSocialRegistration}
            />
          )}

          {currentStep === 2 && (
            <BusinessDetailsForm
              onSubmit={handleSubmit(onSubmit)}
              onBack={handleStepBack}
              loading={loading}
              register={register}
              errors={errors}
              onInputFocus={handleInputFocus}
            />
          )}

          {currentStep === 3 && (
            <VerificationStep
              email={email || registrationData?.email}
              onSubmit={handleSubmit(onSubmit)}
              onResendVerification={resendVerification}
              loading={loading}
            />
          )}

          {/* Login Link - Only show on first step */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login-screen" 
                  className="text-accent hover:text-accent/80 font-medium transition-colors duration-100"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Secure Registration
            </span>
            <span>•</span>
            <span>No Setup Fees</span>
            <span>•</span>
            <span>Free 14-day Trial</span>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationScreen;