import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NewBookingModal = ({ isOpen, onClose, onSave, customers, services, locations }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceId: '',
    locationId: '',
    date: '',
    time: '',
    duration: 60,
    notes: '',
    requiresDeposit: false,
    depositAmount: 0,
    sendReminder: true,
    reminderTiming: '24h'
  });

  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const serviceOptions = services?.map(service => ({
    value: service?.id,
    label: `${service?.name} - $${service?.price} (${service?.duration}min)`,
    description: service?.description
  }));

  const customerOptions = customers?.map(customer => ({
    value: customer?.id,
    label: customer?.name,
    description: customer?.email
  }));

  const locationOptions = locations?.map(location => ({
    value: location?.id,
    label: location?.name,
    description: location?.address
  }));

  const reminderOptions = [
    { value: '15m', label: '15 minutes before' },
    { value: '1h', label: '1 hour before' },
    { value: '24h', label: '24 hours before' },
    { value: '48h', label: '48 hours before' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCustomerChange = (customerId) => {
    if (customerId === 'new') {
      setIsNewCustomer(true);
      setFormData(prev => ({ 
        ...prev, 
        customerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: ''
      }));
    } else {
      setIsNewCustomer(false);
      const customer = customers?.find(c => c?.id === customerId);
      if (customer) {
        setFormData(prev => ({
          ...prev,
          customerId: customer?.id,
          customerName: customer?.name,
          customerEmail: customer?.email,
          customerPhone: customer?.phone
        }));
      }
    }
  };

  const handleServiceChange = (serviceId) => {
    const service = services?.find(s => s?.id === serviceId);
    if (service) {
      setFormData(prev => ({
        ...prev,
        serviceId: service?.id,
        duration: service?.duration,
        depositAmount: service?.requiresDeposit ? service?.depositAmount : 0,
        requiresDeposit: service?.requiresDeposit
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isNewCustomer) {
      if (!formData?.customerName?.trim()) newErrors.customerName = 'Customer name is required';
      if (!formData?.customerEmail?.trim()) newErrors.customerEmail = 'Email is required';
      if (!formData?.customerPhone?.trim()) newErrors.customerPhone = 'Phone number is required';
    } else {
      if (!formData?.customerId) newErrors.customerId = 'Please select a customer';
    }

    if (!formData?.serviceId) newErrors.serviceId = 'Please select a service';
    if (!formData?.locationId) newErrors.locationId = 'Please select a location';
    if (!formData?.date) newErrors.date = 'Date is required';
    if (!formData?.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
      setFormData({
        customerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        serviceId: '',
        locationId: '',
        date: '',
        time: '',
        duration: 60,
        notes: '',
        requiresDeposit: false,
        depositAmount: 0,
        sendReminder: true,
        reminderTiming: '24h'
      });
      setIsNewCustomer(false);
      setErrors({});
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Create New Booking</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Customer Information</h3>
            
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant={!isNewCustomer ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsNewCustomer(false)}
              >
                Existing Customer
              </Button>
              <Button
                type="button"
                variant={isNewCustomer ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsNewCustomer(true)}
              >
                New Customer
              </Button>
            </div>

            {!isNewCustomer ? (
              <Select
                label="Select Customer"
                options={[
                  ...customerOptions,
                  { value: 'new', label: '+ Add New Customer' }
                ]}
                value={formData?.customerId}
                onChange={handleCustomerChange}
                error={errors?.customerId}
                searchable
                placeholder="Search customers..."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Customer Name"
                  type="text"
                  value={formData?.customerName}
                  onChange={(e) => handleInputChange('customerName', e?.target?.value)}
                  error={errors?.customerName}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e?.target?.value)}
                  error={errors?.customerPhone}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData?.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e?.target?.value)}
                    error={errors?.customerEmail}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Service & Location */}
          <div className="space-y-4">
            <h3 className="font-medium">Booking Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Service"
                options={serviceOptions}
                value={formData?.serviceId}
                onChange={handleServiceChange}
                error={errors?.serviceId}
                searchable
                placeholder="Select service..."
              />
              
              <Select
                label="Location"
                options={locationOptions}
                value={formData?.locationId}
                onChange={(value) => handleInputChange('locationId', value)}
                error={errors?.locationId}
                placeholder="Select location..."
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="font-medium">Schedule</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Date"
                type="date"
                value={formData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                error={errors?.date}
                required
              />
              
              <Input
                label="Time"
                type="time"
                value={formData?.time}
                onChange={(e) => handleInputChange('time', e?.target?.value)}
                error={errors?.time}
                required
              />
              
              <Input
                label="Duration (minutes)"
                type="number"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e?.target?.value))}
                min="15"
                max="480"
              />
            </div>
          </div>

          {/* Payment & Reminders */}
          <div className="space-y-4">
            <h3 className="font-medium">Additional Options</h3>
            
            {formData?.requiresDeposit && (
              <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CreditCard" size={16} className="text-secondary" />
                  <span className="font-medium text-secondary">Deposit Required</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This service requires a deposit of ${formData?.depositAmount}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData?.sendReminder}
                    onChange={(e) => handleInputChange('sendReminder', e?.target?.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium">Send reminder</span>
                </label>
                
                {formData?.sendReminder && (
                  <Select
                    options={reminderOptions}
                    value={formData?.reminderTiming}
                    onChange={(value) => handleInputChange('reminderTiming', value)}
                    placeholder="Select timing..."
                  />
                )}
              </div>
            </div>
            
            <Input
              label="Special Notes"
              type="text"
              value={formData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
              placeholder="Any special requirements or notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="Calendar"
              iconPosition="left"
            >
              Create Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBookingModal;