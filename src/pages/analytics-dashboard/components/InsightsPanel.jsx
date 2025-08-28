import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = ({ insights, recommendations }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Lightbulb';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-destructive bg-destructive/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'info': return 'text-secondary bg-secondary/10';
      default: return 'text-accent bg-accent/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Key Insights</h3>
          <Icon name="Lightbulb" size={20} className="text-accent" />
        </div>

        <div className="space-y-4">
          {insights?.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`p-2 rounded-lg ${getInsightColor(insight?.type)}`}>
                <Icon name={getInsightIcon(insight?.type)} size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">{insight?.title}</p>
                <p className="text-sm text-muted-foreground">{insight?.description}</p>
                {insight?.value && (
                  <p className="text-lg font-bold text-foreground mt-2">{insight?.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
          <div className="flex items-center space-x-1 text-accent">
            <Icon name="Bot" size={16} />
            <span className="text-xs font-medium">AI Powered</span>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations?.map((rec, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <h4 className="text-sm font-medium text-foreground">{rec?.title}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec?.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                  rec?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                }`}>
                  {rec?.priority} priority
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-accent">
                  Potential impact: {rec?.impact}
                </span>
                <Button variant="ghost" size="sm">
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth iconName="RefreshCw" iconPosition="left">
            Generate New Recommendations
          </Button>
        </div>
      </div>
      {/* Performance Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Performance Alerts</h3>
          <Icon name="Bell" size={20} className="text-warning" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Response Time Increase</p>
              <p className="text-xs text-muted-foreground">Average response time up 23% this week</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Conversion Goal Met</p>
              <p className="text-xs text-muted-foreground">Monthly target achieved 3 days early</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="ghost" size="sm" fullWidth>
            View All Alerts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;