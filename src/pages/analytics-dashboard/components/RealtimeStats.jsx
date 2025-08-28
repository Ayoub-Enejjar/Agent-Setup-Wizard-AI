import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealtimeStats = () => {
  const [stats, setStats] = useState({
    activeChats: 12,
    queuedMessages: 3,
    responseTime: 1.2,
    onlineAgents: 2
  });

  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        activeChats: Math.max(0, prev?.activeChats + Math.floor(Math.random() * 3) - 1),
        queuedMessages: Math.max(0, prev?.queuedMessages + Math.floor(Math.random() * 2) - 1),
        responseTime: Math.max(0.1, prev?.responseTime + (Math.random() * 0.4) - 0.2),
        onlineAgents: prev?.onlineAgents
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const realtimeMetrics = [
    {
      label: 'Active Chats',
      value: stats?.activeChats,
      icon: 'MessageCircle',
      color: 'text-secondary bg-secondary/10',
      trend: stats?.activeChats > 10 ? 'up' : 'stable'
    },
    {
      label: 'Queued Messages',
      value: stats?.queuedMessages,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      trend: stats?.queuedMessages > 5 ? 'up' : 'down'
    },
    {
      label: 'Avg Response Time',
      value: `${stats?.responseTime?.toFixed(1)}s`,
      icon: 'Zap',
      color: 'text-accent bg-accent/10',
      trend: stats?.responseTime < 2 ? 'down' : 'up'
    },
    {
      label: 'Online Agents',
      value: stats?.onlineAgents,
      icon: 'Users',
      color: 'text-success bg-success/10',
      trend: 'stable'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Real-time Activity</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setIsLive(!isLive)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isLive ? 'Pause' : 'Resume'}
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {realtimeMetrics?.map((metric, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${metric?.color}`}>
              <Icon name={metric?.icon} size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
              <div className="flex items-center justify-center space-x-1">
                <Icon 
                  name={
                    metric?.trend === 'up' ? 'TrendingUp' : 
                    metric?.trend === 'down'? 'TrendingDown' : 'Minus'
                  } 
                  size={12} 
                  className={
                    metric?.trend === 'up' ? 'text-destructive' : 
                    metric?.trend === 'down'? 'text-success' : 'text-muted-foreground'
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity Feed */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
        <div className="space-y-3 max-h-32 overflow-y-auto">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">New conversation started on WhatsApp</span>
            <span className="text-xs text-muted-foreground ml-auto">2s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Lead qualified and assigned to sales</span>
            <span className="text-xs text-muted-foreground ml-auto">15s ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Booking confirmed for tomorrow 2:00 PM</span>
            <span className="text-xs text-muted-foreground ml-auto">32s ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeStats;