import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, RefreshCw, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

const VerificationStep = ({
  email,
  onSubmit,
  onResendVerification,
  loading
}) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Countdown timer for resend button
  useEffect(() => {
    let interval;
    if (countdown > 0 && !canResend) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [countdown, canResend]);

  // Simulate email verification check (in real app, this would poll the server)
  useEffect(() => {
    const checkVerification = setInterval(() => {
      // Simulate random verification after some time
      if (Math.random() > 0.95) {
        setIsVerified(true);
        clearInterval(checkVerification);
      }
    }, 2000);

    return () => clearInterval(checkVerification);
  }, []);

  const handleResendClick = async () => {
    setCountdown(60);
    setCanResend(false);
    await onResendVerification?.();
  };

  const handleContinue = () => {
    // In real implementation, you might want to check verification status
    onSubmit?.();
  };

  return (
    <div className="text-center space-y-6">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="flex justify-center"
      >
        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
          {isVerified ? (
            <CheckCircle className="w-8 h-8 text-success" />
          ) : (
            <Mail className="w-8 h-8 text-secondary" />
          )}
        </div>
      </motion.div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {isVerified ? 'Email Verified!' : 'Check your email'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isVerified ? (
            'Your email has been verified successfully.'
          ) : (
            <>
              We've sent a verification link to{' '}
              <span className="font-medium text-foreground">{email}</span>
            </>
          )}
        </p>
      </motion.div>
      {/* Instructions */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Please check your email and click the verification link to continue.</p>
            <p>Don't forget to check your spam folder!</p>
          </div>
        </motion.div>
      )}
      {/* Verification Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {isVerified ? (
          <div className="flex items-center justify-center space-x-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Email verified successfully</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span>Waiting for verification...</span>
          </div>
        )}
      </motion.div>
      {/* Resend Button */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            type="button"
            variant="ghost"
            onClick={handleResendClick}
            disabled={!canResend || loading}
            className="text-sm"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </div>
            ) : canResend ? (
              <div className="flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend verification email
              </div>
            ) : (
              `Resend in ${countdown}s`
            )}
          </Button>
        </motion.div>
      )}
      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          type="button"
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          disabled={loading}
          className="transition-all duration-120 hover:shadow-lg"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Completing registration...
            </div>
          ) : isVerified ? (
            'Complete Registration'
          ) : (
            'I\'ll verify later'
          )}
        </Button>
      </motion.div>
      {/* Skip Link */}
      {!isVerified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="pt-4"
        >
          <button
            type="button"
            onClick={handleContinue}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-120"
          >
            Skip verification for now
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default VerificationStep;