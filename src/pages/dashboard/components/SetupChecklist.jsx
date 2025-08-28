import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SetupChecklist = () => {
  const [completedItems, setCompletedItems] = useState(['agent-template', 'business-info']);

  const checklistItems = [
    {
      id: 'agent-template',
      title: 'Choose Agent Template',
      description: 'Select industry-specific AI assistant',
      route: '/agent-setup-wizard',
      estimatedTime: '2 min',
      priority: 'high'
    },
    {
      id: 'business-info',
      title: 'Business Information',
      description: 'Add your business details and hours',
      route: '/agent-setup-wizard',
      estimatedTime: '3 min',
      priority: 'high'
    },
    {
      id: 'payment-setup',
      title: 'Payment Gateway',
      description: 'Connect payment processing',
      route: '/payment-processing',
      estimatedTime: '5 min',
      priority: 'medium'
    },
    {
      id: 'whatsapp-integration',
      title: 'WhatsApp Business',
      description: 'Connect WhatsApp for messaging',
      route: '/integration-management',
      estimatedTime: '4 min',
      priority: 'medium'
    },
    {
      id: 'booking-calendar',
      title: 'Booking Calendar',
      description: 'Set up appointment scheduling',
      route: '/booking-management',
      estimatedTime: '3 min',
      priority: 'medium'
    },
    {
      id: 'web-widget',
      title: 'Website Widget',
      description: 'Add chat widget to your website',
      route: '/integration-management',
      estimatedTime: '2 min',
      priority: 'low'
    }
  ];

  const completionPercentage = Math.round((completedItems?.length / checklistItems?.length) * 100);

  const toggleItem = (itemId) => {
    setCompletedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const handleItemClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Setup Progress</h3>
          <span className="text-sm font-medium text-secondary">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-secondary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          {completedItems?.length} of {checklistItems?.length} steps completed
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {checklistItems?.map((item) => {
            const isCompleted = completedItems?.includes(item?.id);
            
            return (
              <div
                key={item?.id}
                className={`p-3 border rounded-lg transition-all duration-200 hover:shadow-elevation-1 ${
                  isCompleted 
                    ? 'border-success/20 bg-success/5' :'border-border hover:border-secondary/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleItem(item?.id)}
                    className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isCompleted
                        ? 'border-success bg-success text-white' :'border-muted-foreground hover:border-secondary'
                    }`}
                  >
                    {isCompleted && <Icon name="Check" size={12} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium text-sm ${
                        isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                      }`}>
                        {item?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getPriorityBadge(item?.priority)}`}>
                          {item?.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {item?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Icon name="Clock" size={12} />
                        <span>{item?.estimatedTime}</span>
                      </div>
                      
                      {!isCompleted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleItemClick(item?.route)}
                          iconName="ArrowRight"
                          iconPosition="right"
                        >
                          Setup
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {completionPercentage === 100 ? (
        <div className="p-4 border-t border-border">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-1">Setup Complete!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Your AI assistant is ready to handle customer interactions.
            </p>
            <Button variant="secondary" fullWidth iconName="Rocket">
              Launch Assistant
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-border">
          <Button 
            variant="outline" 
            fullWidth 
            iconName="Play"
            onClick={() => {
              const nextIncomplete = checklistItems?.find(item => !completedItems?.includes(item?.id));
              if (nextIncomplete) {
                handleItemClick(nextIncomplete?.route);
              }
            }}
          >
            Continue Setup
          </Button>
        </div>
      )}
    </div>
  );
};

export default SetupChecklist;