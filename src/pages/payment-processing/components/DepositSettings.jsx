import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DepositSettings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const depositTypeOptions = [
    { value: 'percentage', label: 'Percentage of total' },
    { value: 'fixed', label: 'Fixed amount' },
    { value: 'service_based', label: 'Based on service type' }
  ];

  const reminderFrequencyOptions = [
    { value: 'immediate', label: 'Immediately' },
    { value: '1_hour', label: '1 hour before' },
    { value: '24_hours', label: '24 hours before' },
    { value: '48_hours', label: '48 hours before' },
    { value: '1_week', label: '1 week before' }
  ];

  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Deposit Collection Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure automated deposit requirements for booking confirmations
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleResetSettings}>
              Reset
            </Button>
            <Button size="sm" onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deposit Configuration */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-4">Deposit Requirements</h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Require deposit for all bookings"
                description="Customers must pay a deposit to confirm their booking"
                checked={localSettings?.requireDeposit}
                onChange={(e) => handleSettingChange('requireDeposit', e?.target?.checked)}
              />

              {localSettings?.requireDeposit && (
                <>
                  <Select
                    label="Deposit Type"
                    options={depositTypeOptions}
                    value={localSettings?.depositType}
                    onChange={(value) => handleSettingChange('depositType', value)}
                  />

                  {localSettings?.depositType === 'percentage' && (
                    <Input
                      label="Deposit Percentage"
                      type="number"
                      value={localSettings?.depositPercentage}
                      onChange={(e) => handleSettingChange('depositPercentage', e?.target?.value)}
                      placeholder="25"
                      description="Percentage of total booking amount"
                    />
                  )}

                  {localSettings?.depositType === 'fixed' && (
                    <Input
                      label="Fixed Deposit Amount"
                      type="number"
                      value={localSettings?.fixedDepositAmount}
                      onChange={(e) => handleSettingChange('fixedDepositAmount', e?.target?.value)}
                      placeholder="50.00"
                      description="Fixed amount in USD"
                    />
                  )}

                  <Input
                    label="Minimum Deposit Amount"
                    type="number"
                    value={localSettings?.minDepositAmount}
                    onChange={(e) => handleSettingChange('minDepositAmount', e?.target?.value)}
                    placeholder="10.00"
                    description="Minimum deposit amount regardless of calculation"
                  />

                  <Input
                    label="Maximum Deposit Amount"
                    type="number"
                    value={localSettings?.maxDepositAmount}
                    onChange={(e) => handleSettingChange('maxDepositAmount', e?.target?.value)}
                    placeholder="500.00"
                    description="Maximum deposit amount regardless of calculation"
                  />
                </>
              )}
            </div>
          </div>

          {/* Service-Based Settings */}
          {localSettings?.depositType === 'service_based' && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h5 className="font-medium text-foreground mb-3">Service-Based Deposits</h5>
              <div className="space-y-3">
                {localSettings?.serviceDeposits?.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Input
                      placeholder="Service name"
                      value={service?.name}
                      onChange={(e) => {
                        const updated = [...localSettings?.serviceDeposits];
                        updated[index].name = e?.target?.value;
                        handleSettingChange('serviceDeposits', updated);
                      }}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={service?.amount}
                      onChange={(e) => {
                        const updated = [...localSettings?.serviceDeposits];
                        updated[index].amount = e?.target?.value;
                        handleSettingChange('serviceDeposits', updated);
                      }}
                      className="w-24"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => {
                        const updated = localSettings?.serviceDeposits?.filter((_, i) => i !== index);
                        handleSettingChange('serviceDeposits', updated);
                      }}
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Plus"
                  onClick={() => {
                    const updated = [...(localSettings?.serviceDeposits || []), { name: '', amount: '' }];
                    handleSettingChange('serviceDeposits', updated);
                  }}
                >
                  Add Service
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Reminder Settings */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-4">Payment Reminders</h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Send payment reminders"
                description="Automatically remind customers about pending deposits"
                checked={localSettings?.sendReminders}
                onChange={(e) => handleSettingChange('sendReminders', e?.target?.checked)}
              />

              {localSettings?.sendReminders && (
                <>
                  <Select
                    label="First Reminder"
                    options={reminderFrequencyOptions}
                    value={localSettings?.firstReminderTiming}
                    onChange={(value) => handleSettingChange('firstReminderTiming', value)}
                  />

                  <Select
                    label="Second Reminder"
                    options={reminderFrequencyOptions}
                    value={localSettings?.secondReminderTiming}
                    onChange={(value) => handleSettingChange('secondReminderTiming', value)}
                  />

                  <Input
                    label="Maximum Reminders"
                    type="number"
                    value={localSettings?.maxReminders}
                    onChange={(e) => handleSettingChange('maxReminders', e?.target?.value)}
                    placeholder="3"
                    description="Maximum number of reminder messages to send"
                  />

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">Reminder Message Template</h5>
                    <textarea
                      className="w-full p-3 border border-border rounded-lg text-sm resize-none"
                      rows={4}
                      value={localSettings?.reminderTemplate}
                      onChange={(e) => handleSettingChange('reminderTemplate', e?.target?.value)}
                      placeholder="Hi {customer_name}, your booking with {business_name} requires a deposit of {deposit_amount} to confirm. Please complete payment at: {payment_link}"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Available variables: {'{customer_name}'}, {'{business_name}'}, {'{deposit_amount}'}, {'{payment_link}'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Cancellation Policy</h4>
            
            <div className="space-y-4">
              <Checkbox
                label="Refund deposits on cancellation"
                description="Automatically process refunds when bookings are cancelled"
                checked={localSettings?.refundOnCancellation}
                onChange={(e) => handleSettingChange('refundOnCancellation', e?.target?.checked)}
              />

              {localSettings?.refundOnCancellation && (
                <>
                  <Input
                    label="Refund Window (hours)"
                    type="number"
                    value={localSettings?.refundWindowHours}
                    onChange={(e) => handleSettingChange('refundWindowHours', e?.target?.value)}
                    placeholder="24"
                    description="Hours before appointment when refunds are allowed"
                  />

                  <Input
                    label="Cancellation Fee (%)"
                    type="number"
                    value={localSettings?.cancellationFeePercentage}
                    onChange={(e) => handleSettingChange('cancellationFeePercentage', e?.target?.value)}
                    placeholder="10"
                    description="Percentage of deposit to retain as cancellation fee"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Preview Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-4">Deposit Calculation Preview</h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Service Amount:</span>
              <div className="font-medium text-foreground">$100.00</div>
            </div>
            <div>
              <span className="text-muted-foreground">Deposit Required:</span>
              <div className="font-medium text-secondary">
                {localSettings?.depositType === 'percentage' 
                  ? `$${(100 * (localSettings?.depositPercentage || 25) / 100)?.toFixed(2)}`
                  : localSettings?.depositType === 'fixed'
                  ? `$${localSettings?.fixedDepositAmount || '50.00'}`
                  : '$25.00'
                }
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Remaining Balance:</span>
              <div className="font-medium text-foreground">
                {localSettings?.depositType === 'percentage' 
                  ? `$${(100 - (100 * (localSettings?.depositPercentage || 25) / 100))?.toFixed(2)}`
                  : localSettings?.depositType === 'fixed'
                  ? `$${(100 - (localSettings?.fixedDepositAmount || 50))?.toFixed(2)}`
                  : '$75.00'
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositSettings;