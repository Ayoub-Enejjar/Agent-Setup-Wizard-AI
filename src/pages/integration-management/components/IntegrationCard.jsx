import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationCard = ({ integration, onConnect, onDisconnect, onConfigure, onTest }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success bg-success/10 border-success/20';
      case 'error': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'disconnected': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'disconnected': return 'Circle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${integration?.bgColor}`}>
            <Icon name={integration?.icon} size={24} className={integration?.iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{integration?.name}</h3>
            <p className="text-sm text-muted-foreground">{integration?.description}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(integration?.status)}`}>
          <Icon name={getStatusIcon(integration?.status)} size={12} />
          <span className="capitalize">{integration?.status}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {integration?.status === 'connected' ? (
            <>
              <Button variant="outline" size="sm" onClick={() => onConfigure(integration?.id)}>
                Configure
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onTest(integration?.id)}>
                Test
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => onConnect(integration?.id)}>
              Connect
            </Button>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          Details
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Last Connected:</span>
              <p className="font-medium">{integration?.lastConnected || 'Never'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Messages Today:</span>
              <p className="font-medium">{integration?.messagesCount || '0'}</p>
            </div>
            {integration?.status === 'error' && (
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Error:</span>
                <p className="text-destructive font-medium">{integration?.errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationCard;