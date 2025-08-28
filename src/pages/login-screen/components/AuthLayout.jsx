import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1B2B] via-[#0F1724] to-[#0B1B2B] relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-secondary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-accent/30 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-secondary/20 rounded-full" />
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Desktop Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white"
        >
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6 text-white">
              AI-Powered Business Growth
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Smart Automation</h3>
                  <p className="text-gray-300">
                    Automate customer interactions and boost conversions with intelligent AI responses
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Real-time Analytics</h3>
                  <p className="text-gray-300">
                    Track performance, conversion rates, and revenue with comprehensive dashboards
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Seamless Integration</h3>
                  <p className="text-gray-300">
                    Connect with WhatsApp, websites, and popular platforms effortlessly
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  SOC2 Certified
                </span>
                <span>•</span>
                <span>Enterprise Ready</span>
                <span>•</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;