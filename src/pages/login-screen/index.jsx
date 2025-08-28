import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';


import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import AuthLayout from './components/AuthLayout';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setError: setFormError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = async (data) => {
    if (loginAttempts >= 3) {
      setError('Too many failed attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login - in real implementation, integrate with Supabase
      if (data?.email === 'demo@example.com' && data?.password === 'password123') {
        // Store remember me preference
        if (rememberMe) {
          localStorage?.setItem('rememberLogin', 'true');
        }
        
        // Navigate to dashboard on successful login
        navigate('/dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        setError('Invalid email or password. Please try again.');
        
        // Add shake animation to form
        const formElement = document?.getElementById('login-form');
        if (formElement) {
          formElement?.classList?.add('animate-shake');
          setTimeout(() => {
            formElement?.classList?.remove('animate-shake');
          }, 500);
        }
      }
    } catch (error) {
      console?.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate social authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social login
      navigate('/dashboard');
    } catch (error) {
      console?.error('Social login error:', error);
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleInputFocus = (fieldName) => {
    clearErrors(fieldName);
    setError(null);
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
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your AI assistant dashboard
          </p>
        </motion.div>

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

        {/* Login Form */}
        <motion.div
          id="login-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-8 rounded-xl shadow-elevation-2 border border-border"
        >
          <LoginForm
            onSubmit={handleSubmit(onSubmit)}
            loading={loading}
            register={register}
            errors={errors}
            email={email}
            password={password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            rememberMe={rememberMe}
            onRememberMeChange={setRememberMe}
            onInputFocus={handleInputFocus}
            onForgotPassword={handleForgotPassword}
          />

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-border" />
            <div className="px-4 text-sm text-muted-foreground">
              Or continue with
            </div>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Social Login */}
          <SocialLoginButtons
            onSocialLogin={handleSocialLogin}
            loading={loading}
          />

          {/* Register Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link 
                to="/registration-screen" 
                className="text-accent hover:text-accent/80 font-medium transition-colors duration-100"
              >
                Create one here
              </Link>
            </p>
          </motion.div>
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
              Secure Login
            </span>
            <span>•</span>
            <span>256-bit Encryption</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </motion.div>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;