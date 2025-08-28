import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import LiveChatPreview from './components/LiveChatPreview';
import SetupChecklist from './components/SetupChecklist';
import QuickActions from './components/QuickActions';
import PerformanceChart from './components/PerformanceChart';

import Button from '../../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock real-time data updates
  const [metrics, setMetrics] = useState({
    totalConversations: 1247,
    conversionRate: 24.8,
    revenueGenerated: 18750,
    activeLeads: 89
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setMetrics(prev => ({
        totalConversations: prev?.totalConversations + Math.floor(Math.random() * 10),
        conversionRate: Math.max(0, prev?.conversionRate + (Math.random() - 0.5) * 2),
        revenueGenerated: prev?.revenueGenerated + Math.floor(Math.random() * 500),
        activeLeads: Math.max(0, prev?.activeLeads + Math.floor(Math.random() * 6) - 3)
      }));
      setRefreshing(false);
    }, 1500);
  };

  const handleMetricClick = (metricType) => {
    switch (metricType) {
      case 'conversations': navigate('/conversations');
        break;
      case 'analytics': navigate('/analytics-dashboard');
        break;
      case 'revenue': navigate('/payment-processing');
        break;
      case 'leads': navigate('/conversations');
        break;
      default:
        break;
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!refreshing) {
        setMetrics(prev => ({
          totalConversations: prev?.totalConversations + Math.floor(Math.random() * 3),
          conversionRate: Math.max(0, prev?.conversionRate + (Math.random() - 0.5) * 0.5),
          revenueGenerated: prev?.revenueGenerated + Math.floor(Math.random() * 100),
          activeLeads: Math.max(0, prev?.activeLeads + Math.floor(Math.random() * 3) - 1)
        }));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshing]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <Header />
        
        <main className="p-6 pb-20 lg:pb-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor your AI assistant performance and manage customer interactions
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setDateRange('7d')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    dateRange === '7d' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setDateRange('30d')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    dateRange === '30d' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  30 Days
                </button>
                <button
                  onClick={() => setDateRange('90d')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    dateRange === '90d' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  90 Days
                </button>
              </div>
              
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Conversations"
              value={metrics?.totalConversations?.toLocaleString()}
              change="+12.5%"
              changeType="positive"
              icon="MessageCircle"
              color="secondary"
              onClick={() => handleMetricClick('conversations')}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${metrics?.conversionRate?.toFixed(1)}%`}
              change="+3.2%"
              changeType="positive"
              icon="TrendingUp"
              color="accent"
              onClick={() => handleMetricClick('analytics')}
            />
            <MetricCard
              title="Revenue Generated"
              value={`$${metrics?.revenueGenerated?.toLocaleString()}`}
              change="+8.7%"
              changeType="positive"
              icon="DollarSign"
              color="success"
              onClick={() => handleMetricClick('revenue')}
            />
            <MetricCard
              title="Active Leads"
              value={metrics?.activeLeads?.toString()}
              change="-2.1%"
              changeType="negative"
              icon="Users"
              color="warning"
              onClick={() => handleMetricClick('leads')}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <PerformanceChart />
            </div>
            
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Activity and Chat Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Activity Feed - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Right Sidebar Content */}
            <div className="space-y-6">
              {/* Live Chat Preview */}
              <div className="h-96">
                <LiveChatPreview />
              </div>
              
              {/* Setup Checklist */}
              <div className="h-96">
                <SetupChecklist />
              </div>
            </div>
          </div>

          {/* Mobile Bottom Spacing */}
          <div className="h-20 lg:hidden" />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;