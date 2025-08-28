import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompletionScreen = ({ setupData, onGoToDashboard, onTestAgent }) => {
  const completedIntegrations = Object.entries(setupData?.integrations || {})?.filter(([_, config]) => config?.enabled)?.length;

  const nextSteps = [
    {
      id: 'test',
      title: 'Test Your Agent',
      description: 'Try out your AI assistant with sample conversations',
      icon: 'MessageCircle',
      action: onTestAgent,
      buttonText: 'Test Now'
    },
    {
      id: 'dashboard',
      title: 'View Dashboard',
      description: 'Monitor performance and manage your agent',
      icon: 'BarChart3',
      action: onGoToDashboard,
      buttonText: 'Go to Dashboard'
    },
    {
      id: 'customize',
      title: 'Advanced Customization',
      description: 'Fine-tune responses and add custom workflows',
      icon: 'Settings',
      action: () => window.location.href = '/agent-setup-wizard',
      buttonText: 'Customize'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Animation */}
      <div className="relative">
        <div className="w-24 h-24 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center mb-6">
          <Icon name="Check" size={40} className="text-secondary-foreground" />
        </div>
        
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-secondary/20 rounded-full animate-ping" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-2 border-secondary/10 rounded-full animate-ping animation-delay-75" />
        </div>
      </div>
      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          🎉 Your AI Agent is Ready!
        </h2>
        <p className="text-lg text-muted-foreground">
          Congratulations! Your AI assistant has been successfully configured and deployed.
        </p>
      </div>
      {/* Setup Summary */}
      <div className="bg-card border border-border rounded-xl p-6 text-left">
        <h3 className="text-lg font-semibold text-foreground mb-4">Setup Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Business Name:</span>
              <span className="text-sm font-medium text-foreground">
                {setupData?.businessDetails?.businessName || 'Not specified'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Industry Template:</span>
              <span className="text-sm font-medium text-foreground">
                {setupData?.selectedTemplate?.name || 'General Business'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Personality:</span>
              <span className="text-sm font-medium text-foreground capitalize">
                {setupData?.personality || 'Professional'}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Operating Hours:</span>
              <span className="text-sm font-medium text-foreground">
                {setupData?.businessDetails?.openingTime || '09:00'} - {setupData?.businessDetails?.closingTime || '17:00'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Integrations:</span>
              <span className="text-sm font-medium text-foreground">
                {completedIntegrations} connected
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm font-medium text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">What's Next?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nextSteps?.map((step) => (
            <div
              key={step?.id}
              className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-elevation-2 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                <Icon name={step?.icon} size={24} />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">{step?.title}</h4>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={step?.action}
                className="w-full"
              >
                {step?.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <h3 className="text-lg font-semibold mb-4">Your Agent is Now Live!</h3>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm opacity-80">Availability</div>
          </div>
          <div>
            <div className="text-2xl font-bold">&lt;2s</div>
            <div className="text-sm opacity-80">Response Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{completedIntegrations}</div>
            <div className="text-sm opacity-80">Channels</div>
          </div>
        </div>
      </div>
      {/* Primary Action */}
      <div className="pt-4">
        <Button
          variant="default"
          size="lg"
          onClick={onGoToDashboard}
          iconName="ArrowRight"
          iconPosition="right"
          className="px-8"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompletionScreen;