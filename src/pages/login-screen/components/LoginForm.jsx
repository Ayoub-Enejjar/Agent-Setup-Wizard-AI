import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';


const LoginForm = ({
  onSubmit,
  loading,
  register,
  errors,
  email,
  password,
  showPassword,
  onTogglePassword,
  rememberMe,
  onRememberMeChange,
  onInputFocus,
  onForgotPassword
}) => {
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(value) || 'Please enter a valid email address';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    return value?.length >= 6 || 'Password must be at least 6 characters';
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
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
            placeholder="Enter your email"
            className={`
              w-full pl-10 pr-4 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.email 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
              ${email ? 'bg-background' : 'bg-input'}
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
            placeholder="Enter your password"
            className={`
              w-full pl-10 pr-12 py-3 border rounded-lg
              transition-all duration-120
              focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
              ${errors?.password 
                ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
              }
              ${password ? 'bg-background' : 'bg-input'}
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
      {/* Remember Me & Forgot Password */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => onRememberMeChange?.(e?.target?.checked)}
            className="w-4 h-4 text-primary border-input rounded focus:ring-2 focus:ring-ring transition-colors duration-120"
          />
          <span className="text-sm text-foreground">Remember me</span>
        </label>

        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-accent hover:text-accent/80 transition-colors duration-120"
        >
          Forgot password?
        </button>
      </motion.div>
      {/* Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading || !email || !password}
          className="transition-all duration-120 hover:shadow-lg"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </Button>
      </motion.div>
    </form>
  );
};

export default LoginForm;