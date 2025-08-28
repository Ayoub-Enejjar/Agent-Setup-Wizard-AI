import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'conversation',
      customer: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      message: 'Inquired about premium hair styling package',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      priority: 'high',
      channel: 'whatsapp'
    },
    {
      id: 2,
      type: 'booking',
      customer: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      message: 'Booked consultation for tomorrow 2:00 PM',
      timestamp: new Date(Date.now() - 900000),
      status: 'confirmed',
      priority: 'medium',
      channel: 'web'
    },
    {
      id: 3,
      type: 'payment',
      customer: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      message: 'Completed $150 payment for repair service',
      timestamp: new Date(Date.now() - 1800000),
      status: 'completed',
      priority: 'low',
      channel: 'instagram'
    },
    {
      id: 4,
      type: 'lead',
      customer: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      message: 'New lead from delivery service inquiry',
      timestamp: new Date(Date.now() - 3600000),
      status: 'new',
      priority: 'high',
      channel: 'whatsapp'
    },
    {
      id: 5,
      type: 'conversation',
      customer: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      message: 'Asked about pricing for bulk orders',
      timestamp: new Date(Date.now() - 7200000),
      status: 'pending',
      priority: 'medium',
      channel: 'web'
    }
  ];

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    return activity?.type === filter;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'conversation': return 'MessageCircle';
      case 'booking': return 'Calendar';
      case 'payment': return 'CreditCard';
      case 'lead': return 'UserPlus';
      default: return 'Activity';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return 'MessageCircle';
      case 'instagram': return 'Instagram';
      case 'web': return 'Globe';
      default: return 'MessageSquare';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'confirmed': return 'text-secondary bg-secondary/10';
      case 'completed': return 'text-accent bg-accent/10';
      case 'new': return 'text-warning bg-warning/10';
      case 'pending': return 'text-muted-foreground bg-muted/50';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
        
        <div className="flex space-x-2">
          {['all', 'conversation', 'booking', 'payment', 'lead']?.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize ${
                filter === filterType
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div key={activity?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  <img
                    src={activity?.avatar}
                    alt={activity?.customer}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card flex items-center justify-center ${
                  activity?.type === 'conversation' ? 'bg-secondary' :
                  activity?.type === 'booking' ? 'bg-accent' :
                  activity?.type === 'payment'? 'bg-success' : 'bg-warning'
                }`}>
                  <Icon name={getActivityIcon(activity?.type)} size={10} className="text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{activity?.customer}</h3>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(activity?.priority)}`} />
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name={getChannelIcon(activity?.channel)} size={12} />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{activity?.message}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(activity?.status)}`}>
                    {activity?.status}
                  </span>
                  
                  <div className="flex space-x-2">
                    {activity?.type === 'conversation' && activity?.status === 'active' && (
                      <Button variant="ghost" size="sm" iconName="MessageSquare">
                        Reply
                      </Button>
                    )}
                    {activity?.type === 'lead' && activity?.status === 'new' && (
                      <Button variant="ghost" size="sm" iconName="UserCheck">
                        Qualify
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;