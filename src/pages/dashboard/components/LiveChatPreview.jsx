import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveChatPreview = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeChats, setActiveChats] = useState(3);
  const [selectedChat, setSelectedChat] = useState(null);

  const chatPreviews = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hi, I need help with booking an appointment',
      timestamp: new Date(Date.now() - 120000),
      unread: 2,
      status: 'typing',
      channel: 'whatsapp'
    },
    {
      id: 2,
      customer: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'What are your pricing options?',
      timestamp: new Date(Date.now() - 300000),
      unread: 0,
      status: 'online',
      channel: 'web'
    },
    {
      id: 3,
      customer: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thank you for the quick response!',
      timestamp: new Date(Date.now() - 900000),
      unread: 0,
      status: 'away',
      channel: 'instagram'
    }
  ];

  const sampleMessages = [
    {
      id: 1,
      sender: 'customer',
      message: 'Hi, I need help with booking an appointment',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: 2,
      sender: 'agent',
      message: 'Hello! I\'d be happy to help you book an appointment. What service are you interested in?',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 3,
      sender: 'customer',
      message: 'I\'m looking for a premium hair styling session',
      timestamp: new Date(Date.now() - 60000)
    }
  ];

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return 'MessageCircle';
      case 'instagram': return 'Instagram';
      case 'web': return 'Globe';
      default: return 'MessageSquare';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'typing': return 'bg-secondary';
      case 'away': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChats(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Live Chat</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-destructive'}`} />
            <span className="text-sm text-muted-foreground">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeChats} active conversations
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOnline(!isOnline)}
            iconName={isOnline ? 'Pause' : 'Play'}
          >
            {isOnline ? 'Pause' : 'Resume'}
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {!selectedChat ? (
          <div className="h-full overflow-y-auto">
            {chatPreviews?.map((chat) => (
              <div
                key={chat?.id}
                onClick={() => setSelectedChat(chat)}
                className="p-3 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                      <img
                        src={chat?.avatar}
                        alt={chat?.customer}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-card ${getStatusColor(chat?.status)}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {chat?.customer}
                        </h4>
                        <Icon name={getChannelIcon(chat?.channel)} size={12} className="text-muted-foreground" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-muted-foreground">
                          {formatTime(chat?.timestamp)}
                        </span>
                        {chat?.unread > 0 && (
                          <span className="bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                            {chat?.unread}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {chat?.status === 'typing' ? (
                          <span className="flex items-center space-x-1">
                            <Icon name="MoreHorizontal" size={12} className="animate-pulse" />
                            <span className="italic">typing...</span>
                          </span>
                        ) : (
                          chat?.lastMessage
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedChat(null)}
                    iconName="ArrowLeft"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                      <img
                        src={selectedChat?.avatar}
                        alt={selectedChat?.customer}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{selectedChat?.customer}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{selectedChat?.status}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreVertical" />
              </div>
            </div>

            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {sampleMessages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      message?.sender === 'agent' ?'bg-secondary text-secondary-foreground' :'bg-muted text-foreground'
                    }`}
                  >
                    <p>{message?.message}</p>
                    <p className={`text-xs mt-1 ${
                      message?.sender === 'agent' ? 'text-secondary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {formatTime(message?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" iconName="User">
                  Handoff
                </Button>
                <Button variant="secondary" size="sm" iconName="MessageSquare" fullWidth>
                  Quick Reply
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChatPreview;