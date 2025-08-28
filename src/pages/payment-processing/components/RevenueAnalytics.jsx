import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RevenueAnalytics = ({ analyticsData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('last_30_days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const periodOptions = [
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_90_days', label: 'Last 90 days' },
    { value: 'last_year', label: 'Last year' }
  ];

  const metricOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'transactions', label: 'Transaction Count' },
    { value: 'average_order', label: 'Average Order Value' },
    { value: 'success_rate', label: 'Success Rate' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  // Mock data for charts
  const revenueData = [
    { date: '2024-08-15', revenue: 12500, transactions: 45, avgOrder: 278 },
    { date: '2024-08-16', revenue: 15200, transactions: 52, avgOrder: 292 },
    { date: '2024-08-17', revenue: 9800, transactions: 38, avgOrder: 258 },
    { date: '2024-08-18', revenue: 18600, transactions: 61, avgOrder: 305 },
    { date: '2024-08-19', revenue: 14300, transactions: 48, avgOrder: 298 },
    { date: '2024-08-20', revenue: 16900, transactions: 55, avgOrder: 307 },
    { date: '2024-08-21', revenue: 13700, transactions: 42, avgOrder: 326 },
    { date: '2024-08-22', revenue: 11200, transactions: 39, avgOrder: 287 }
  ];

  const paymentMethodData = [
    { name: 'Credit Card', value: 65, amount: 45200, color: '#00D1FF' },
    { name: 'PayPal', value: 20, amount: 13900, color: '#7C4DFF' },
    { name: 'Bank Transfer', value: 10, amount: 6950, color: '#10B981' },
    { name: 'Apple Pay', value: 3, amount: 2085, color: '#F59E0B' },
    { name: 'Google Pay', value: 2, amount: 1390, color: '#EF4444' }
  ];

  const gatewayPerformanceData = [
    { gateway: 'Stripe', successRate: 98.5, volume: 52300, avgTime: 1.2 },
    { gateway: 'PayPal', successRate: 97.8, volume: 18900, avgTime: 2.1 },
    { gateway: 'Square', successRate: 96.9, volume: 12400, avgTime: 1.8 },
    { gateway: 'Local Bank', successRate: 94.2, volume: 8600, avgTime: 3.5 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.name?.includes('Rate') ? formatPercentage(entry?.value) : formatCurrency(entry?.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Revenue Analytics</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track payment performance and revenue trends
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-40"
          />
          <Button variant="outline" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="DollarSign" size={20} className="text-success" />
            <span className="text-xs text-success font-medium">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(101200)}</div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CreditCard" size={20} className="text-secondary" />
            <span className="text-xs text-success font-medium">+8.3%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">380</div>
          <div className="text-sm text-muted-foreground">Transactions</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <span className="text-xs text-success font-medium">+5.7%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{formatCurrency(266)}</div>
          <div className="text-sm text-muted-foreground">Avg Order Value</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-xs text-success font-medium">+0.8%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">97.8%</div>
          <div className="text-sm text-muted-foreground">Success Rate</div>
        </div>
      </div>
      {/* Revenue Trend Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Revenue Trend</h4>
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-48"
          />
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => selectedMetric === 'revenue' ? formatCurrency(value) : value}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={selectedMetric === 'revenue' ? 'revenue' : selectedMetric === 'transactions' ? 'transactions' : 'avgOrder'}
                stroke="var(--color-secondary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Methods Distribution */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Payment Methods</h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentMethodData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% (${formatCurrency(props?.payload?.amount)})`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {paymentMethodData?.map((method, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: method?.color }}
                />
                <span className="text-foreground">{method?.name}</span>
                <span className="text-muted-foreground">({method?.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gateway Performance */}
        <div>
          <h4 className="font-medium text-foreground mb-4">Gateway Performance</h4>
          <div className="space-y-4">
            {gatewayPerformanceData?.map((gateway, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-foreground">{gateway?.gateway}</h5>
                  <span className={`text-sm font-medium ${gateway?.successRate >= 98 ? 'text-success' : gateway?.successRate >= 95 ? 'text-warning' : 'text-destructive'}`}>
                    {formatPercentage(gateway?.successRate)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Volume:</span>
                    <div className="font-medium text-foreground">{formatCurrency(gateway?.volume)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Time:</span>
                    <div className="font-medium text-foreground">{gateway?.avgTime}s</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${gateway?.successRate >= 98 ? 'bg-success' : gateway?.successRate >= 95 ? 'bg-warning' : 'bg-destructive'}`}
                      style={{ width: `${gateway?.successRate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;