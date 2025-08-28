import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const ChannelPerformance = ({ data }) => {
  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'WhatsApp': return 'MessageCircle';
      case 'Instagram': return 'Instagram';
      case 'Web Chat': return 'Globe';
      case 'SMS': return 'Smartphone';
      default: return 'MessageSquare';
    }
  };

  const formatTooltip = (value, name) => {
    if (name === 'leads') return [`${value} leads`, 'Total Leads'];
    if (name === 'conversions') return [`${value} conversions`, 'Conversions'];
    return [value, name];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Channel Performance</h3>
          <p className="text-sm text-muted-foreground">Lead generation and conversion by channel</p>
        </div>
      </div>
      {/* Channel Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {data?.map((channel, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={`p-2 rounded-lg ${
              channel?.name === 'WhatsApp' ? 'bg-success/10 text-success' :
              channel?.name === 'Instagram' ? 'bg-accent/10 text-accent' :
              channel?.name === 'Web Chat'? 'bg-secondary/10 text-secondary' : 'bg-warning/10 text-warning'
            }`}>
              <Icon name={getChannelIcon(channel?.name)} size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{channel?.name}</p>
              <p className="text-xs text-muted-foreground">
                {((channel?.conversions / channel?.leads) * 100)?.toFixed(1)}% conv.
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: 'var(--color-foreground)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="leads" 
              fill="var(--color-secondary)" 
              radius={[4, 4, 0, 0]}
              name="leads"
            />
            <Bar 
              dataKey="conversions" 
              fill="var(--color-accent)" 
              radius={[4, 4, 0, 0]}
              name="conversions"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChannelPerformance;