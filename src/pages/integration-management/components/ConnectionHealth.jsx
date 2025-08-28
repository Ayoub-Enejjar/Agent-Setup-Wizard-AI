import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionHealth = ({ healthData }) => {
  const getHealthColor = (percentage) => {
    if (percentage >= 95) return 'text-success bg-success/10';
    if (percentage >= 80) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getHealthIcon = (percentage) => {
    if (percentage >= 95) return 'CheckCircle';
    if (percentage >= 80) return 'AlertTriangle';
    return 'XCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Connection Health</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Message Delivery Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Message Delivery</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getHealthColor(healthData?.deliveryRate)}`}>
              <Icon name={getHealthIcon(healthData?.deliveryRate)} size={12} />
              <span>{healthData?.deliveryRate}%</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${healthData?.deliveryRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            {healthData?.messagesDelivered} of {healthData?.totalMessages} messages delivered
          </p>
        </div>

        {/* API Response Time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">API Response Time</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              healthData?.avgResponseTime < 200 ? 'text-success bg-success/10' :
              healthData?.avgResponseTime < 500 ? 'text-warning bg-warning/10': 'text-destructive bg-destructive/10'
            }`}>
              <Icon name="Zap" size={12} />
              <span>{healthData?.avgResponseTime}ms</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((1000 - healthData?.avgResponseTime) / 10, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            Average response time over last 24h
          </p>
        </div>

        {/* Error Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Error Rate</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
              healthData?.errorRate < 1 ? 'text-success bg-success/10' :
              healthData?.errorRate < 5 ? 'text-warning bg-warning/10': 'text-destructive bg-destructive/10'
            }`}>
              <Icon name="AlertCircle" size={12} />
              <span>{healthData?.errorRate}%</span>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-destructive h-2 rounded-full transition-all duration-300"
              style={{ width: `${healthData?.errorRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground">
            {healthData?.errorCount} errors in last 24h
          </p>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {healthData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                activity?.type === 'success' ? 'bg-success' :
                activity?.type === 'warning'? 'bg-warning' : 'bg-destructive'
              }`}></div>
              <span className="text-muted-foreground text-xs">
                {new Date(activity.timestamp)?.toLocaleTimeString()}
              </span>
              <span className="text-foreground">{activity?.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionHealth;