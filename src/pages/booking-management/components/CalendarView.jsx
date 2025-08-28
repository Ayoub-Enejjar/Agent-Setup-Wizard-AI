import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ 
  currentDate, 
  onDateChange, 
  viewMode, 
  onViewModeChange, 
  bookings, 
  onBookingClick,
  onTimeSlotClick,
  onBookingDrop 
}) => {
  const [draggedBooking, setDraggedBooking] = useState(null);

  const getCalendarDays = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }
    
    return days;
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      days?.push(day);
    }
    return days;
  };

  const getBookingsForDate = (date) => {
    return bookings?.filter(booking => {
      const bookingDate = new Date(booking.dateTime);
      return bookingDate?.toDateString() === date?.toDateString();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-accent text-accent-foreground';
      case 'cancelled': return 'bg-destructive/10 text-destructive';
      case 'completed': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleDragStart = (e, booking) => {
    setDraggedBooking(booking);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetDate, targetTime = null) => {
    e?.preventDefault();
    if (draggedBooking && onBookingDrop) {
      onBookingDrop(draggedBooking, targetDate, targetTime);
    }
    setDraggedBooking(null);
  };

  const renderMonthView = () => {
    const days = getCalendarDays();
    const today = new Date();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-b border-border">
            {day}
          </div>
        ))}
        {/* Calendar Days */}
        {days?.map((day, index) => {
          const dayBookings = getBookingsForDate(day);
          const isCurrentMonth = day?.getMonth() === currentDate?.getMonth();
          const isToday = day?.toDateString() === today?.toDateString();
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                !isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : 'bg-card'
              } ${isToday ? 'ring-2 ring-secondary' : ''}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, day)}
              onClick={() => onTimeSlotClick && onTimeSlotClick(day)}
            >
              <div className={`text-sm font-medium mb-1 ${isToday ? 'text-secondary' : ''}`}>
                {day?.getDate()}
              </div>
              <div className="space-y-1">
                {dayBookings?.slice(0, 3)?.map(booking => (
                  <div
                    key={booking?.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, booking)}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onBookingClick(booking);
                    }}
                    className={`text-xs p-1 rounded cursor-pointer transition-all hover:scale-105 ${getStatusColor(booking?.status)}`}
                  >
                    <div className="font-medium truncate">{booking?.customerName}</div>
                    <div className="truncate">{booking?.service}</div>
                  </div>
                ))}
                {dayBookings?.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{dayBookings?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="flex flex-col">
        {/* Week Header */}
        <div className="grid grid-cols-8 gap-1 mb-4">
          <div className="p-3"></div>
          {days?.map(day => {
            const isToday = day?.toDateString() === new Date()?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center border border-border rounded-lg ${
                isToday ? 'bg-secondary/10 border-secondary' : 'bg-card'
              }`}>
                <div className="text-sm font-medium">{day?.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className={`text-lg font-bold ${isToday ? 'text-secondary' : ''}`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Time Grid */}
        <div className="grid grid-cols-8 gap-1 max-h-96 overflow-y-auto">
          {hours?.map(hour => (
            <React.Fragment key={hour}>
              <div className="p-2 text-sm text-muted-foreground text-right border-r border-border">
                {hour?.toString()?.padStart(2, '0')}:00
              </div>
              {days?.map(day => {
                const timeSlotBookings = bookings?.filter(booking => {
                  const bookingDate = new Date(booking.dateTime);
                  return bookingDate?.toDateString() === day?.toDateString() && 
                         bookingDate?.getHours() === hour;
                });
                
                return (
                  <div
                    key={`${day?.toISOString()}-${hour}`}
                    className="min-h-[60px] p-1 border border-border hover:bg-muted/50 cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day, `${hour}:00`)}
                    onClick={() => onTimeSlotClick && onTimeSlotClick(day, `${hour}:00`)}
                  >
                    {timeSlotBookings?.map(booking => (
                      <div
                        key={booking?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, booking)}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onBookingClick(booking);
                        }}
                        className={`text-xs p-1 rounded mb-1 cursor-pointer transition-all hover:scale-105 ${getStatusColor(booking?.status)}`}
                      >
                        <div className="font-medium truncate">{booking?.customerName}</div>
                        <div className="truncate">{booking?.service}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayBookings = getBookingsForDate(currentDate);
    
    return (
      <div className="space-y-2">
        {/* Day Header */}
        <div className="p-4 bg-card border border-border rounded-lg text-center">
          <div className="text-lg font-bold">{currentDate?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {dayBookings?.length} appointments scheduled
          </div>
        </div>
        {/* Time Slots */}
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {hours?.map(hour => {
            const hourBookings = dayBookings?.filter(booking => {
              const bookingDate = new Date(booking.dateTime);
              return bookingDate?.getHours() === hour;
            });
            
            return (
              <div
                key={hour}
                className="flex border border-border rounded-lg overflow-hidden hover:bg-muted/50 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, currentDate, `${hour}:00`)}
                onClick={() => onTimeSlotClick && onTimeSlotClick(currentDate, `${hour}:00`)}
              >
                <div className="w-20 p-3 bg-muted text-sm font-medium text-center border-r border-border">
                  {hour?.toString()?.padStart(2, '0')}:00
                </div>
                <div className="flex-1 p-3 space-y-2">
                  {hourBookings?.length === 0 ? (
                    <div className="text-sm text-muted-foreground">Available</div>
                  ) : (
                    hourBookings?.map(booking => (
                      <div
                        key={booking?.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, booking)}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onBookingClick(booking);
                        }}
                        className={`p-2 rounded cursor-pointer transition-all hover:scale-105 ${getStatusColor(booking?.status)}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{booking?.customerName}</div>
                            <div className="text-sm opacity-90">{booking?.service}</div>
                          </div>
                          <div className="text-sm">
                            {booking?.duration}min
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(currentDate);
                if (viewMode === 'month') {
                  newDate?.setMonth(newDate?.getMonth() - 1);
                } else if (viewMode === 'week') {
                  newDate?.setDate(newDate?.getDate() - 7);
                } else {
                  newDate?.setDate(newDate?.getDate() - 1);
                }
                onDateChange(newDate);
              }}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <h2 className="text-lg font-semibold min-w-[200px] text-center">
              {viewMode === 'month' && currentDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              {viewMode === 'week' && `Week of ${currentDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              {viewMode === 'day' && currentDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newDate = new Date(currentDate);
                if (viewMode === 'month') {
                  newDate?.setMonth(newDate?.getMonth() + 1);
                } else if (viewMode === 'week') {
                  newDate?.setDate(newDate?.getDate() + 7);
                } else {
                  newDate?.setDate(newDate?.getDate() + 1);
                }
                onDateChange(newDate);
              }}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          {['day', 'week', 'month']?.map(mode => (
            <Button
              key={mode}
              variant={viewMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange(mode)}
            >
              {mode?.charAt(0)?.toUpperCase() + mode?.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      {/* Calendar Content */}
      <div className="p-4">
        {viewMode === 'month' && renderMonthView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'day' && renderDayView()}
      </div>
    </div>
  );
};

export default CalendarView;