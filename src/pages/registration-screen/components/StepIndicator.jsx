import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between">
        {steps?.map?.((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200
                  ${step?.number < currentStep
                    ? 'bg-success text-success-foreground'
                    : step?.number === currentStep
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {step?.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step?.number
                )}
              </div>
              
              {/* Step Text */}
              <div className="mt-2 text-center">
                <div
                  className={`
                    text-xs font-medium
                    ${step?.number <= currentStep 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                    }
                  `}
                >
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {/* Connection Line */}
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 mt-[-20px]">
                <div
                  className={`
                    h-full transition-all duration-200
                    ${step?.number < currentStep 
                      ? 'bg-success' :'bg-muted'
                    }
                  `}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default StepIndicator;