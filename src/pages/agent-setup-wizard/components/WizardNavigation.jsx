import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WizardNavigation = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSkip,
  isNextDisabled = false,
  isLoading = false,
  showSkip = false
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-card border-t border-border px-4 py-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left Side - Back Button */}
        <div className="flex items-center space-x-4">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          
          {showSkip && !isLastStep && (
            <Button
              variant="ghost"
              onClick={onSkip}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip this step
            </Button>
          )}
        </div>

        {/* Center - Auto-save Indicator */}
        <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Save" size={16} />
          <span>Auto-saving progress...</span>
        </div>

        {/* Right Side - Next/Complete Button */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {currentStep} of {totalSteps}
          </div>
          
          <Button
            variant={isLastStep ? "default" : "secondary"}
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            loading={isLoading}
            iconName={isLastStep ? "Check" : "ChevronRight"}
            iconPosition="right"
            className="min-w-[120px]"
          >
            {isLastStep ? 'Complete Setup' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WizardNavigation;