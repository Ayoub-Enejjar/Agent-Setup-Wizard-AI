import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionFilters = ({ onFiltersChange, onExport }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last_30_days',
    status: 'all',
    gateway: 'all',
    customer: '',
    minAmount: '',
    maxAmount: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'last_7_days', label: 'Last 7 days' },
    { value: 'last_30_days', label: 'Last 30 days' },
    { value: 'last_90_days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'disputed', label: 'Disputed' }
  ];

  const gatewayOptions = [
    { value: 'all', label: 'All Gateways' },
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'square', label: 'Square' },
    { value: 'local_bank', label: 'Local Bank Transfer' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      dateRange: 'last_30_days',
      status: 'all',
      gateway: 'all',
      customer: '',
      minAmount: '',
      maxAmount: ''
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters?.status !== 'all' || filters?.gateway !== 'all' || 
                          filters?.customer || filters?.minAmount || filters?.maxAmount;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Transaction Filters</h3>
          {hasActiveFilters && (
            <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full font-medium">
              Filters Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          label="Gateway"
          options={gatewayOptions}
          value={filters?.gateway}
          onChange={(value) => handleFilterChange('gateway', value)}
        />

        <Input
          label="Customer Search"
          type="text"
          placeholder="Name or email..."
          value={filters?.customer}
          onChange={(e) => handleFilterChange('customer', e?.target?.value)}
        />
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
          <Input
            label="Min Amount"
            type="number"
            placeholder="0.00"
            value={filters?.minAmount}
            onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
          />

          <Input
            label="Max Amount"
            type="number"
            placeholder="1000.00"
            value={filters?.maxAmount}
            onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
          />

          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              disabled={!hasActiveFilters}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;