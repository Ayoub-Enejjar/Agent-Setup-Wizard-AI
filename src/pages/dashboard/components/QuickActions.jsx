import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'new-conversation',
      title: 'Start Conversation',
      description: 'Manually initiate customer chat',
      icon: 'MessageCirclePlus',
      color: 'secondary',
      route: '/conversations'
    },
    {
      id: 'create-booking',
      title: 'Create Booking',
      description: 'Schedule new appointment',
      icon: 'CalendarPlus',
      color: 'accent',
      route: '/booking-management'
    },
    {
      id: 'view-analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: 'BarChart3',
      color: 'success',
      route: '/analytics-dashboard'
    },
    {
      id: 'manage-integrations',
      title: 'Integrations',
      description: 'Connect new channels',
      icon: 'Puzzle',
      color: 'warning',
      route: '/integration-management'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'secondary':
        return 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20';
      case 'accent':
        return 'bg-accent/10 text-accent hover:bg-accent/20 border-accent/20';
      case 'success':
        return 'bg-success/10 text-success hover:bg-success/20 border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning hover:bg-warning/20 border-warning/20';
      default:
        return 'bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20';
    }
  };

  const handleActionClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Quick Actions</h3>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.route)}
            className={`p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-elevation-1 ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getColorClasses(action?.color)}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Need help getting started?</span>
          <Button variant="ghost" size="sm" iconName="HelpCircle">
            Guide
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;