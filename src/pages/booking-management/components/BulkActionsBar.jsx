import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedBookings, 
  onClearSelection, 
  onBulkConfirm, 
  onBulkCancel, 
  onBulkReschedule, 
  onBulkSendReminder,
  onBulkExport 
}) => {
  const actionOptions = [
    { value: '', label: 'Select Action...' },
    { value: 'confirm', label: 'Confirm Bookings' },
    { value: 'cancel', label: 'Cancel Bookings' },
    { value: 'reschedule', label: 'Reschedule Bookings' },
    { value: 'send_reminder', label: 'Send Reminders' },
    { value: 'export', label: 'Export Selected' }
  ];

  const handleBulkAction = (action) => {
    switch (action) {
      case 'confirm':
        onBulkConfirm(selectedBookings);
        break;
      case 'cancel':
        onBulkCancel(selectedBookings);
        break;
      case 'reschedule':
        onBulkReschedule(selectedBookings);
        break;
      case 'send_reminder':
        onBulkSendReminder(selectedBookings);
        break;
      case 'export':
        onBulkExport(selectedBookings);
        break;
      default:
        break;
    }
  };

  if (selectedBookings?.length === 0) {
    return null;
  }

  return (
    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-secondary" />
            <span className="font-medium text-secondary">
              {selectedBookings?.length} booking{selectedBookings?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconPosition="left"
          >
            Clear Selection
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-48">
            <Select
              options={actionOptions}
              value=""
              onChange={handleBulkAction}
              placeholder="Choose action..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkConfirm(selectedBookings)}
              iconName="CheckCircle"
              iconPosition="left"
            >
              Confirm
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkSendReminder(selectedBookings)}
              iconName="Bell"
              iconPosition="left"
            >
              Remind
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onBulkCancel(selectedBookings)}
              iconName="XCircle"
              iconPosition="left"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;