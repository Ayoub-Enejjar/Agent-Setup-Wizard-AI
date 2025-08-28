import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import SocialLoginButtons from '../../login-screen/components/SocialLoginButtons';

const RegistrationForm = ({
  onSubmit,
  loading,
  register,
  errors,
  password,
  confirmPassword,
  showPassword,
  onTogglePassword,
  showConfirmPassword,
  onToggleConfirmPassword,
  passwordStrength,
  acceptTerms,
  onAcceptTermsChange,
  subscribeNewsletter,
  onSubscribeNewsletterChange,
  onInputFocus,
  onSocialRegistration
}) => {
  const validateFullName = (value) => {
    if (!value) return 'Full name is required';
    return value?.length >= 2 || 'Name must be at least 2 characters';
  };

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(value) || 'Please enter a valid email address';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value?.length < 8) return 'Password must be at least 8 characters';
    return true;
  };

  const validateConfirmPassword = (value) => {
    if (!value) return 'Please confirm your password';
    return value === password || 'Passwords do not match';
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
      case 3:
        return 'Medium';
      case 4:
      case 5:
        return 'Strong';
      default:
        return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-destructive';
      case 2:
      case 3:
        return 'bg-warning';
      case 4:
      case 5:
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const passwordRequirements = [
    { test: password?.length >= 8, label: 'At least 8 characters' },
    { test: /[A-Z]/?.test(password), label: 'One uppercase letter' },
    { test: /[a-z]/?.test(password), label: 'One lowercase letter' },
    { test: /[0-9]/?.test(password), label: 'One number' },
    { test: /[^A-Za-z0-9]/?.test(password), label: 'One special character' }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Full Name Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('fullName', {
              validate: validateFullName,
              onChange: () => onInputFocus?.('fullName')
            })}
            type="text"
            placeholder="Enter your full name"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.fullName 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
            `}
          />
          {errors?.fullName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-destructive"
            >
              {errors?.fullName?.message}
            </motion.p>
          )}
        </div>
      </motion.div>
      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('email', {
              validate: validateEmail,
              onChange: () => onInputFocus?.('email')
            })}
            type="email"
            placeholder="Enter your email address"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.email 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
            `}
          />
          {errors?.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-destructive"
            >
              {errors?.email?.message}
            </motion.p>
          )}
        </div>
      </motion.div>
      {/* Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('password', {
              validate: validatePassword,
              onChange: () => onInputFocus?.('password')
            })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            className={`
              w-full pl-10 pr-12 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.password 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
            `}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-120"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Password strength</span>
                <span className="text-xs font-medium">{getPasswordStrengthText()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Password Requirements */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2 space-y-1"
            >
              {passwordRequirements?.map?.((req, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  {req?.test ? (
                    <Check className="w-3 h-3 text-success" />
                  ) : (
                    <X className="w-3 h-3 text-muted-foreground" />
                  )}
                  <span className={req?.test ? 'text-success' : 'text-muted-foreground'}>
                    {req?.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
          
          {errors?.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-destructive"
            >
              {errors?.password?.message}
            </motion.p>
          )}
        </div>
      </motion.div>
      {/* Confirm Password Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            {...register('confirmPassword', {
              validate: validateConfirmPassword,
              onChange: () => onInputFocus?.('confirmPassword')
            })}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className={`
              w-full pl-10 pr-12 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.confirmPassword 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
            `}
          />
          <button
            type="button"
            onClick={onToggleConfirmPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-120"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
          {errors?.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-destructive"
            >
              {errors?.confirmPassword?.message}
            </motion.p>
          )}
        </div>
      </motion.div>
      {/* Terms and Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-4"
      >
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => onAcceptTermsChange?.(e?.target?.checked)}
            className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring transition-colors duration-120 mt-0.5"
          />
          <span className="text-sm text-foreground leading-relaxed">
            I agree to the{' '}
            <button type="button" className="text-accent hover:text-accent/80 underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-accent hover:text-accent/80 underline">
              Privacy Policy
            </button>
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={subscribeNewsletter}
            onChange={(e) => onSubscribeNewsletterChange?.(e?.target?.checked)}
            className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring transition-colors duration-120 mt-0.5"
          />
          <span className="text-sm text-muted-foreground leading-relaxed">
            Subscribe to our newsletter for updates and tips
          </span>
        </label>
      </motion.div>
      {/* Create Account Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading || !acceptTerms}
          className="transition-all duration-120 hover:shadow-lg"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>
      </motion.div>
      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-border" />
        <div className="px-4 text-sm text-muted-foreground">
          Or register with
        </div>
        <div className="flex-1 border-t border-border" />
      </div>
      {/* Social Registration */}
      <SocialLoginButtons
        onSocialLogin={onSocialRegistration}
        loading={loading}
      />
    </form>
  );
};

export default RegistrationForm;