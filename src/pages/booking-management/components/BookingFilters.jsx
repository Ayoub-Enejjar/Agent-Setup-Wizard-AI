import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BookingFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  services, 
  locations, 
  bookingStats 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' },
    { value: 'no_show', label: 'No Show' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'partial', label: 'Partial' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const serviceOptions = [
    { value: '', label: 'All Services' },
    ...services?.map(service => ({
      value: service?.id,
      label: service?.name
    }))
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    ...locations?.map(location => ({
      value: location?.id,
      label: location?.name
    }))
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this_week', label: 'This Week' },
    { value: 'next_week', label: 'Next Week' },
    { value: 'this_month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-secondary">{bookingStats?.total}</div>
          <div className="text-sm text-muted-foreground">Total Bookings</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-accent">{bookingStats?.pending}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-success">{bookingStats?.confirmed}</div>
          <div className="text-sm text-muted-foreground">Confirmed</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-2xl font-bold text-foreground">${bookingStats?.revenue}</div>
          <div className="text-sm text-muted-foreground">Revenue</div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status || ''}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Filter by status..."
        />

        <Select
          label="Payment Status"
          options={paymentStatusOptions}
          value={filters?.paymentStatus || ''}
          onChange={(value) => handleFilterChange('paymentStatus', value)}
          placeholder="Filter by payment..."
        />

        <Select
          label="Service"
          options={serviceOptions}
          value={filters?.serviceId || ''}
          onChange={(value) => handleFilterChange('serviceId', value)}
          placeholder="Filter by service..."
          searchable
        />

        <Select
          label="Location"
          options={locationOptions}
          value={filters?.locationId || ''}
          onChange={(value) => handleFilterChange('locationId', value)}
          placeholder="Filter by location..."
        />
      </div>
      {/* Date Range and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange || ''}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Select date range..."
        />

        {filters?.dateRange === 'custom' && (
          <>
            <Input
              label="Start Date"
              type="date"
              value={filters?.startDate || ''}
              onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={filters?.endDate || ''}
              onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
            />
          </>
        )}

        {filters?.dateRange !== 'custom' && (
          <div className="md:col-span-2">
            <Input
              label="Search"
              type="search"
              value={filters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              placeholder="Search by customer name, email, or phone..."
            />
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;