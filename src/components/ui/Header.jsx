import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New customer inquiry',
      message: 'Sarah Johnson sent a message about booking consultation',
      time: '2 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'booking',
      title: 'Booking confirmed',
      message: 'Meeting with Alex Chen scheduled for tomorrow 2:00 PM',
      time: '15 min ago',
      unread: true
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      message: '$299 payment processed for Premium Plan',
      time: '1 hour ago',
      unread: false
    }
  ];

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message': return 'MessageCircle';
      case 'booking': return 'Calendar';
      case 'payment': return 'CreditCard';
      default: return 'Bell';
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-100">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`relative transition-all duration-200 ${isSearchFocused ? 'ring-2 ring-ring' : ''} rounded-lg`}>
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search customers, bookings, conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-200">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div
                      key={notification?.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors ${
                        notification?.unread ? 'bg-secondary/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification?.type === 'message' ? 'bg-secondary/10 text-secondary' :
                          notification?.type === 'booking'? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                        }`}>
                          <Icon name={getNotificationIcon(notification?.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-foreground truncate">
                              {notification?.title}
                            </p>
                            {notification?.unread && (
                              <div className="w-2 h-2 bg-secondary rounded-full ml-2 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification?.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                JD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 z-200">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-foreground">John Doe</p>
                      <p className="text-sm text-muted-foreground">john@example.com</p>
                      <p className="text-xs text-secondary font-medium">Premium Plan</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3">
                    <Icon name="CreditCard" size={16} className="text-muted-foreground" />
                    <span>Billing & Plans</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3">
                    <Icon name="Building" size={16} className="text-muted-foreground" />
                    <span>Switch Account</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3">
                    <Icon name="Settings" size={16} className="text-muted-foreground" />
                    <span>Preferences</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors flex items-center space-x-3 text-destructive">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside handlers */}
      {(isNotificationOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;