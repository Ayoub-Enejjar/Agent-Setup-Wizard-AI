import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BusinessDetailsForm = ({ formData, onFormChange }) => {
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i?.toString()?.padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const timezoneOptions = [
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC-6', label: 'Central Time (UTC-6)' },
    { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC+0', label: 'GMT (UTC+0)' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' }
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleDayToggle = (dayId, checked) => {
    const updatedDays = checked
      ? [...formData?.operatingDays, dayId]
      : formData?.operatingDays?.filter(day => day !== dayId);
    
    handleInputChange('operatingDays', updatedDays);
  };

  return (
    <div className="space-y-8">
      {/* Business Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Business Name"
            type="text"
            placeholder="Enter your business name"
            value={formData?.businessName}
            onChange={(e) => handleInputChange('businessName', e?.target?.value)}
            required
          />
          
          <Input
            label="Contact Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData?.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
            required
          />
          
          <Input
            label="Business Email"
            type="email"
            placeholder="contact@yourbusiness.com"
            value={formData?.businessEmail}
            onChange={(e) => handleInputChange('businessEmail', e?.target?.value)}
            required
          />
          
          <Input
            label="Website URL"
            type="url"
            placeholder="https://yourbusiness.com"
            value={formData?.websiteUrl}
            onChange={(e) => handleInputChange('websiteUrl', e?.target?.value)}
          />
        </div>
        
        <Input
          label="Business Address"
          type="text"
          placeholder="123 Main St, City, State 12345"
          value={formData?.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e?.target?.value)}
          description="This will be used for location-based services and local SEO"
        />
      </div>
      {/* Operating Hours */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Operating Hours</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Opening Time"
            options={timeOptions}
            value={formData?.openingTime}
            onChange={(value) => handleInputChange('openingTime', value)}
            placeholder="Select opening time"
            required
          />
          
          <Select
            label="Closing Time"
            options={timeOptions}
            value={formData?.closingTime}
            onChange={(value) => handleInputChange('closingTime', value)}
            placeholder="Select closing time"
            required
          />
          
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={formData?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            placeholder="Select timezone"
            required
          />
        </div>
        
        <div className="space-y-4">
          <p className="text-sm font-medium text-foreground">Operating Days</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek?.map((day) => (
              <Checkbox
                key={day?.id}
                label={day?.label}
                checked={formData?.operatingDays?.includes(day?.id)}
                onChange={(e) => handleDayToggle(day?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Service Area */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Service Area</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Service Radius (miles)"
            type="number"
            placeholder="25"
            value={formData?.serviceRadius}
            onChange={(e) => handleInputChange('serviceRadius', e?.target?.value)}
            description="How far do you travel for services?"
            min="1"
            max="500"
          />
          
          <Input
            label="Primary Service Cities"
            type="text"
            placeholder="New York, Brooklyn, Queens"
            value={formData?.serviceCities}
            onChange={(e) => handleInputChange('serviceCities', e?.target?.value)}
            description="Comma-separated list of cities you serve"
          />
        </div>
      </div>
      {/* Contact Preferences */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Contact Preferences</h3>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            How would you like customers to reach you for urgent matters?
          </p>
          
          <div className="space-y-3">
            <Checkbox
              label="Phone calls during business hours"
              checked={formData?.allowPhoneCalls}
              onChange={(e) => handleInputChange('allowPhoneCalls', e?.target?.checked)}
            />
            
            <Checkbox
              label="Text messages for urgent requests"
              checked={formData?.allowTextMessages}
              onChange={(e) => handleInputChange('allowTextMessages', e?.target?.checked)}
            />
            
            <Checkbox
              label="Email for non-urgent inquiries"
              checked={formData?.allowEmails}
              onChange={(e) => handleInputChange('allowEmails', e?.target?.checked)}
            />
            
            <Checkbox
              label="WhatsApp Business messaging"
              checked={formData?.allowWhatsApp}
              onChange={(e) => handleInputChange('allowWhatsApp', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsForm;