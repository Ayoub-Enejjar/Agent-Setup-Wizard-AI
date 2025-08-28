import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversionFunnel = ({ data }) => {
  const calculateConversionRate = (current, previous) => {
    return previous > 0 ? ((current / previous) * 100)?.toFixed(1) : '0.0';
  };

  const getStageColor = (index) => {
    const colors = [
      'bg-secondary/10 text-secondary border-secondary/20',
      'bg-accent/10 text-accent border-accent/20',
      'bg-success/10 text-success border-success/20',
      'bg-warning/10 text-warning border-warning/20'
    ];
    return colors?.[index % colors?.length];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Conversion Funnel</h3>
          <p className="text-sm text-muted-foreground">Lead progression through sales stages</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            {calculateConversionRate(data?.[data?.length - 1]?.value, data?.[0]?.value)}%
          </p>
          <p className="text-sm text-muted-foreground">Overall Conversion</p>
        </div>
      </div>
      <div className="space-y-4">
        {data?.map((stage, index) => {
          const conversionRate = index > 0 ? calculateConversionRate(stage?.value, data?.[index - 1]?.value) : '100.0';
          const widthPercentage = (stage?.value / data?.[0]?.value) * 100;
          
          return (
            <div key={index} className="relative">
              {/* Stage Bar */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStageColor(index)?.split(' ')?.[0]}`}></div>
                      <span className="text-sm font-medium text-foreground">{stage?.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-muted-foreground">
                        {stage?.value?.toLocaleString()} leads
                      </span>
                      {index > 0 && (
                        <span className="text-sm font-medium text-foreground">
                          {conversionRate}%
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-3 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getStageColor(index)?.split(' ')?.[0]}`}
                      style={{ width: `${widthPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* Conversion Arrow */}
              {index < data?.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name="ArrowDown" size={16} />
                    <span className="text-xs">
                      {calculateConversionRate(data?.[index + 1]?.value, stage?.value)}% convert
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Funnel Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">{data?.[0]?.value?.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Leads</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {data?.length > 1 ? calculateConversionRate(data?.[1]?.value, data?.[0]?.value) : '0'}%
            </p>
            <p className="text-sm text-muted-foreground">Qualification Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">
              {data?.[data?.length - 1]?.value?.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Conversions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionFunnel;