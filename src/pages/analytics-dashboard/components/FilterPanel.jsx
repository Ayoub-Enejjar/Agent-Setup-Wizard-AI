import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  timeRange, 
  setTimeRange, 
  selectedChannels, 
  setSelectedChannels, 
  dateRange, 
  setDateRange,
  onExport,
  onRefresh 
}) => {
  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const channelOptions = [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'webchat', label: 'Web Chat' },
    { value: 'sms', label: 'SMS' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export PDF Report' },
    { value: 'csv', label: 'Export CSV Data' },
    { value: 'excel', label: 'Export Excel File' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters & Actions</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh
        </Button>
      </div>
      <div className="space-y-6">
        {/* Time Range Filter */}
        <div>
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-full"
          />
        </div>

        {/* Custom Date Range */}
        {timeRange === 'custom' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange?.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                End Date
              </label>
              <input
                type="date"
                value={dateRange?.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}

        {/* Channel Filter */}
        <div>
          <Select
            label="Channels"
            options={channelOptions}
            value={selectedChannels}
            onChange={setSelectedChannels}
            multiple
            searchable
            clearable
            placeholder="Select channels to analyze"
            className="w-full"
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('pdf')}
              iconName="FileText"
              iconPosition="left"
              fullWidth
            >
              Export PDF Report
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('csv')}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Download CSV Data
            </Button>
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Scheduled Reports</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">Weekly Summary</span>
              </div>
              <span className="text-xs text-success">Active</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              fullWidth
            >
              Add Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;