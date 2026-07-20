import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import ConversationChart from './components/ConversationChart';
import ChannelPerformance from './components/ChannelPerformance';
import ConversionFunnel from './components/ConversionFunnel';
import FilterPanel from './components/FilterPanel';
import InsightsPanel from './components/InsightsPanel';
import RealtimeStats from './components/RealtimeStats';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AnalyticsDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedChannels, setSelectedChannels] = useState(['whatsapp', 'instagram', 'webchat']);
  const [dateRange, setDateRange] = useState({
    start: '2024-07-23',
    end: '2024-08-22'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for metrics cards
  const metricsData = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'MessageCircle',
      trend: true,
      subtitle: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      trend: true,
      subtitle: 'leads to customers'
    },
    {
      title: 'Revenue Generated',
      value: '$18,420',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: true,
      subtitle: 'this month'
    },
    {
      title: 'Avg Response Time',
      value: '1.2s',
      change: '-15%',
      changeType: 'positive',
      icon: 'Clock',
      trend: true,
      subtitle: 'AI response speed'
    }
  ];

  // Mock data for conversation chart
  const conversationData = [
    { date: '2024-08-15', conversations: 145, responses: 289 },
    { date: '2024-08-16', conversations: 167, responses: 334 },
    { date: '2024-08-17', conversations: 134, responses: 267 },
    { date: '2024-08-18', conversations: 189, responses: 378 },
    { date: '2024-08-19', conversations: 156, responses: 312 },
    { date: '2024-08-20', conversations: 178, responses: 356 },
    { date: '2024-08-21', conversations: 203, responses: 406 },
    { date: '2024-08-22', conversations: 187, responses: 374 }
  ];

  // Mock data for channel performance
  const channelData = [
    { name: 'WhatsApp', leads: 1247, conversions: 342 },
    { name: 'Instagram', leads: 856, conversions: 198 },
    { name: 'Web Chat', leads: 634, conversions: 167 },
    { name: 'SMS', leads: 423, conversions: 89 }
  ];

  // Mock data for conversion funnel
  const funnelData = [
    { name: 'Initial Contact', value: 3160 },
    { name: 'Qualified Lead', value: 1847 },
    { name: 'Proposal Sent', value: 892 },
    { name: 'Converted Customer', value: 267 }
  ];

  // Mock data for insights
  const insights = [
    {
      type: 'positive',
      title: 'Peak Performance Hour',
      description: 'Highest conversion rate occurs between 2-4 PM weekdays',
      value: '34.2% conversion'
    },
    {
      type: 'warning',
      title: 'Instagram Engagement Drop',
      description: 'Instagram DM response rate decreased by 18% this week',
      value: '-18% response rate'
    },
    {
      type: 'info',
      title: 'WhatsApp Dominance',
      description: 'WhatsApp generates 67% of all qualified leads',
      value: '67% lead share'
    }
  ];

  // Mock data for recommendations
  const recommendations = [
    {
      title: 'Optimize Instagram Response Templates',
      description: 'Update Instagram auto-responses to match WhatsApp success patterns',
      priority: 'high',
      impact: '+15% conversion rate'
    },
    {
      title: 'Extend Peak Hour Coverage',
      description: 'Add more agent availability during 2-4 PM peak conversion window',
      priority: 'medium',
      impact: '+8% lead capture'
    },
    {
      title: 'Implement SMS Follow-up',
      description: 'Add SMS follow-up sequence for unresponsive web chat leads',
      priority: 'low',
      impact: '+5% re-engagement'
    }
  ];

  const handleExport = (format) => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      console.log(`Exporting ${format} report...`);
      setIsLoading(false);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      console.log('Data refreshed');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="transition-all duration-300 lg:ml-16">
        <Header />
        
        <main className="p-6 pb-20 lg:pb-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive performance insights and conversion tracking for your AI agents
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={handleRefresh}
                loading={isLoading}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Data
              </Button>
              <Button
                variant="default"
                onClick={() => handleExport('pdf')}
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="mb-8">
            <RealtimeStats />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Main Analytics */}
            <div className="xl:col-span-3 space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metricsData?.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric?.title}
                    value={metric?.value}
                    change={metric?.change}
                    changeType={metric?.changeType}
                    icon={metric?.icon}
                    trend={metric?.trend}
                    subtitle={metric?.subtitle}
                  />
                ))}
              </div>

              {/* Conversation Volume Chart */}
              <ConversationChart data={conversationData} timeRange={timeRange} />

              {/* Channel Performance and Conversion Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChannelPerformance data={channelData} />
                <ConversionFunnel data={funnelData} />
              </div>
            </div>

            {/* Right Column - Filters and Insights */}
            <div className="xl:col-span-1 space-y-6">
              <FilterPanel
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                selectedChannels={selectedChannels}
                setSelectedChannels={setSelectedChannels}
                dateRange={dateRange}
                setDateRange={setDateRange}
                onExport={handleExport}
                onRefresh={handleRefresh}
              />
              
              <InsightsPanel
                insights={insights}
                recommendations={recommendations}
              />
            </div>
          </div>

          {/* Mobile-specific bottom spacing */}
          <div className="h-20 lg:hidden"></div>
        </main>
      </div>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-6 flex items-center space-x-3">
            <Icon name="Loader2" size={20} className="animate-spin text-secondary" />
            <span className="text-foreground">Processing data...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;