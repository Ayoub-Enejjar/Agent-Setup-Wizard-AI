import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentOverviewCard = ({ title, amount, change, changeType, icon, iconColor, trend }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon name={icon} size={24} />
        </div>
        <div className="flex items-center space-x-1">
          <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          <span className={`text-sm font-medium ${getChangeColor()}`}>
            {change}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          {typeof amount === 'number' ? formatCurrency(amount) : amount}
        </h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {trend && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>This month</span>
            <span className="font-medium">{trend}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOverviewCard;