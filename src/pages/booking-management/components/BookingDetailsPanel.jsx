import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookingDetailsPanel = ({ 
  selectedBooking, 
  onClose, 
  onEdit, 
  onCancel, 
  onConfirm, 
  onReschedule,
  onSendReminder,
  onViewCustomer 
}) => {
  if (!selectedBooking) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Booking Selected</h3>
          <p className="text-sm">Click on a booking in the calendar to view details</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'bg-secondary text-secondary-foreground', icon: 'CheckCircle' },
      pending: { color: 'bg-accent text-accent-foreground', icon: 'Clock' },
      cancelled: { color: 'bg-destructive/10 text-destructive', icon: 'XCircle' },
      completed: { color: 'bg-success/10 text-success', icon: 'Check' },
      no_show: { color: 'bg-warning/10 text-warning', icon: 'AlertTriangle' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{status?.replace('_', ' ')?.toUpperCase()}</span>
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      paid: { color: 'bg-success/10 text-success', icon: 'CreditCard' },
      partial: { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      pending: { color: 'bg-muted text-muted-foreground', icon: 'Clock' },
      failed: { color: 'bg-destructive/10 text-destructive', icon: 'XCircle' }
    };
    
    const config = statusConfig?.[paymentStatus] || statusConfig?.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} />
        <span>{paymentStatus?.toUpperCase()}</span>
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold">Booking Details</h3>
          {getStatusBadge(selectedBooking?.status)}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={16} />
        </Button>
      </div>
      <div className="p-4 space-y-6">
        {/* Customer Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Customer Information</h4>
          <div className="flex items-center space-x-3">
            <Image
              src={selectedBooking?.customerAvatar}
              alt={selectedBooking?.customerName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h5 className="font-medium">{selectedBooking?.customerName}</h5>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewCustomer(selectedBooking?.customerId)}
                  className="text-secondary hover:text-secondary"
                >
                  <Icon name="ExternalLink" size={14} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{selectedBooking?.customerEmail}</p>
              <p className="text-sm text-muted-foreground">{selectedBooking?.customerPhone}</p>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Booking Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Service</label>
              <p className="text-sm font-medium">{selectedBooking?.service}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <p className="text-sm font-medium">{selectedBooking?.duration} minutes</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
              <p className="text-sm font-medium">
                {new Date(selectedBooking.dateTime)?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(selectedBooking.dateTime)?.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Location</label>
              <p className="text-sm font-medium">{selectedBooking?.location}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Payment Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
              <p className="text-sm font-medium">${selectedBooking?.totalAmount}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
              <div className="mt-1">
                {getPaymentStatusBadge(selectedBooking?.paymentStatus)}
              </div>
            </div>
            {selectedBooking?.depositAmount && (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Deposit Paid</label>
                  <p className="text-sm font-medium">${selectedBooking?.depositAmount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Remaining</label>
                  <p className="text-sm font-medium">
                    ${selectedBooking?.totalAmount - selectedBooking?.depositAmount}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Special Requirements */}
        {selectedBooking?.notes && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Special Requirements</h4>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">{selectedBooking?.notes}</p>
            </div>
          </div>
        )}

        {/* Reminder Settings */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Reminder Settings</h4>
          <div className="space-y-2">
            {selectedBooking?.reminders?.map((reminder, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Bell" size={14} className="text-muted-foreground" />
                  <span className="text-sm">{reminder?.type} - {reminder?.timing}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  reminder?.sent ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                }`}>
                  {reminder?.sent ? 'Sent' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          {selectedBooking?.status === 'pending' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onConfirm(selectedBooking?.id)}
              iconName="CheckCircle"
              iconPosition="left"
            >
              Confirm
            </Button>
          )}
          
          {['confirmed', 'pending']?.includes(selectedBooking?.status) && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReschedule(selectedBooking?.id)}
                iconName="Calendar"
                iconPosition="left"
              >
                Reschedule
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(selectedBooking?.id)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSendReminder(selectedBooking?.id)}
            iconName="Bell"
            iconPosition="left"
          >
            Send Reminder
          </Button>
          
          {selectedBooking?.status !== 'cancelled' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel(selectedBooking?.id)}
              iconName="XCircle"
              iconPosition="left"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPanel;