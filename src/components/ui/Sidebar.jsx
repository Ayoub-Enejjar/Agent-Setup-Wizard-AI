import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      badge: null,
      tooltip: 'Overview and key metrics'
    },
    {
      label: 'Conversations',
      path: '/conversations',
      icon: 'MessageCircle',
      badge: 3,
      tooltip: 'Customer messages and chat'
    },
    {
      label: 'Bookings',
      path: '/booking-management',
      icon: 'Calendar',
      badge: null,
      tooltip: 'Appointment management'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      badge: null,
      tooltip: 'Performance insights'
    }
  ];

  const configurationItems = [
    {
      label: 'Integrations',
      path: '/integration-management',
      icon: 'Puzzle',
      badge: null,
      tooltip: 'Connect third-party services'
    },
    {
      label: 'Payments',
      path: '/payment-processing',
      icon: 'CreditCard',
      badge: null,
      tooltip: 'Transaction management'
    },
    {
      label: 'Agent Setup',
      path: '/agent-setup-wizard',
      icon: 'Bot',
      badge: null,
      tooltip: 'Configure AI agents'
    }
  ];

  const bottomItems = [
    {
      label: 'Settings',
      path: '/settings',
      icon: 'Settings',
      badge: null,
      tooltip: 'Account preferences'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const NavItem = ({ item, showLabel = true }) => {
    const active = isActive(item?.path);
    
    return (
      <div className="relative">
        <button
          onClick={() => window.location.href = item?.path}
          onMouseEnter={() => setHoveredItem(item?.path)}
          onMouseLeave={() => setHoveredItem(null)}
          className={`
            w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
            ${active 
              ? 'bg-secondary/10 text-secondary border border-secondary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }
          `}
        >
          <div className={`flex-shrink-0 ${active ? 'text-secondary' : ''}`}>
            <Icon name={item?.icon} size={20} />
          </div>
          
          {showLabel && (
            <>
              <span className="flex-1 text-left truncate">{item?.label}</span>
              {item?.badge && (
                <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-0.5 font-medium min-w-[20px] text-center">
                  {item?.badge}
                </span>
              )}
            </>
          )}
        </button>
        {/* Tooltip for collapsed state */}
        {isCollapsed && hoveredItem === item?.path && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 z-300">
            <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-elevation-2 whitespace-nowrap">
              <p className="text-sm font-medium">{item?.label}</p>
              {item?.tooltip && (
                <p className="text-xs text-muted-foreground mt-1">{item?.tooltip}</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-100
        ${isCollapsed ? 'lg:w-16' : 'lg:w-72'}
        transition-all duration-300 ease-in-out
      `}>
        <div className="flex flex-col w-full bg-primary border-r border-border">
          {/* Logo Section */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center px-4' : 'px-6'} py-4 border-b border-border/20`}>
            {isCollapsed ? (
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={20} className="text-secondary-foreground" />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={20} className="text-secondary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary-foreground">Rocket.new</h1>
                  <p className="text-xs text-primary-foreground/70">AI Business Platform</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
            {/* Main Navigation */}
            <div className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider px-3">
                  Main
                </h3>
              )}
              {navigationItems?.map((item) => (
                <NavItem key={item?.path} item={item} showLabel={!isCollapsed} />
              ))}
            </div>

            {/* Configuration */}
            <div className="space-y-2">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider px-3">
                  Configuration
                </h3>
              )}
              {configurationItems?.map((item) => (
                <NavItem key={item?.path} item={item} showLabel={!isCollapsed} />
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="px-4 py-4 border-t border-border/20">
            {bottomItems?.map((item) => (
              <NavItem key={item?.path} item={item} showLabel={!isCollapsed} />
            ))}
            
            {/* Collapse Toggle */}
            <div className="mt-4 pt-4 border-t border-border/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleCollapse}
                className={`w-full text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 ${
                  isCollapsed ? 'justify-center' : 'justify-start'
                }`}
              >
                <Icon 
                  name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                  size={16} 
                />
                {!isCollapsed && <span className="ml-2">Collapse</span>}
              </Button>
            </div>
          </div>
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems?.slice(0, 4)?.map((item) => {
            const active = isActive(item?.path);
            return (
              <button
                key={item?.path}
                onClick={() => window.location.href = item?.path}
                className={`
                  flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors relative
                  ${active ? 'text-secondary' : 'text-muted-foreground'}
                `}
              >
                <div className="relative">
                  <Icon name={item?.icon} size={20} />
                  {item?.badge && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item?.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item?.label}</span>
              </button>
            );
          })}
          
          {/* More Menu */}
          <button className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-muted-foreground">
            <Icon name="MoreHorizontal" size={20} />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;