import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const SocialLoginButtons = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: '🌐',
      provider: 'google',
      className: 'hover:bg-muted/80'
    },
    {
      name: 'Microsoft',
      icon: '🔷',
      provider: 'microsoft',
      className: 'hover:bg-muted/80'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map?.((provider, index) => (
        <motion.div
          key={provider?.provider}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => onSocialLogin?.(provider?.provider)}
            disabled={loading}
            className={`${provider?.className} transition-all duration-120 hover:shadow-md`}
          >
            <span className="mr-3 text-lg">{provider?.icon}</span>
            Continue with {provider?.name}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialLoginButtons;