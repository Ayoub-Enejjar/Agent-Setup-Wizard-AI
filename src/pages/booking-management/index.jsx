import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import Button from '../../components/ui/Button';
import CalendarView from './components/CalendarView';
import BookingDetailsPanel from './components/BookingDetailsPanel';
import NewBookingModal from './components/NewBookingModal';
import BookingFilters from './components/BookingFilters';
import BulkActionsBar from './components/BulkActionsBar';

const BookingManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    serviceId: '',
    locationId: '',
    dateRange: '',
    startDate: '',
    endDate: '',
    search: ''
  });

  // Mock data
  const mockBookings = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      customerId: "cust_001",
      customerEmail: "sarah.johnson@email.com",
      customerPhone: "+1 (555) 123-4567",
      customerAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      service: "Hair Cut & Style",
      serviceId: "service_001",
      duration: 90,
      dateTime: new Date(2025, 0, 25, 10, 0),
      location: "Downtown Salon",
      locationId: "loc_001",
      status: "confirmed",
      paymentStatus: "paid",
      totalAmount: 85,
      depositAmount: 25,
      notes: "Client prefers layers and wants to keep length",
      reminders: [
        { type: "SMS", timing: "24 hours before", sent: true },
        { type: "Email", timing: "2 hours before", sent: false }
      ]
    },
    {
      id: 2,
      customerName: "Michael Chen",
      customerId: "cust_002",
      customerEmail: "michael.chen@email.com",
      customerPhone: "+1 (555) 234-5678",
      customerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      service: "Beard Trim",
      serviceId: "service_002",
      duration: 30,
      dateTime: new Date(2025, 0, 25, 14, 30),
      location: "Downtown Salon",
      locationId: "loc_001",
      status: "pending",
      paymentStatus: "pending",
      totalAmount: 35,
      depositAmount: 0,
      notes: "First time client",
      reminders: [
        { type: "SMS", timing: "24 hours before", sent: false }
      ]
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      customerId: "cust_003",
      customerEmail: "emily.rodriguez@email.com",
      customerPhone: "+1 (555) 345-6789",
      customerAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      service: "Color Treatment",
      serviceId: "service_003",
      duration: 180,
      dateTime: new Date(2025, 0, 26, 9, 0),
      location: "Uptown Branch",
      locationId: "loc_002",
      status: "confirmed",
      paymentStatus: "partial",
      totalAmount: 150,
      depositAmount: 50,
      notes: "Wants to go from brunette to blonde highlights",
      reminders: [
        { type: "Email", timing: "48 hours before", sent: true },
        { type: "SMS", timing: "4 hours before", sent: false }
      ]
    },
    {
      id: 4,
      customerName: "David Thompson",
      customerId: "cust_004",
      customerEmail: "david.thompson@email.com",
      customerPhone: "+1 (555) 456-7890",
      customerAvatar: "https://randomuser.me/api/portraits/men/52.jpg",
      service: "Full Service",
      serviceId: "service_004",
      duration: 120,
      dateTime: new Date(2025, 0, 27, 11, 0),
      location: "Downtown Salon",
      locationId: "loc_001",
      status: "cancelled",
      paymentStatus: "failed",
      totalAmount: 95,
      depositAmount: 30,
      notes: "Cancelled due to emergency",
      reminders: []
    }
  ];

  const mockCustomers = [
    { id: "cust_001", name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "+1 (555) 123-4567" },
    { id: "cust_002", name: "Michael Chen", email: "michael.chen@email.com", phone: "+1 (555) 234-5678" },
    { id: "cust_003", name: "Emily Rodriguez", email: "emily.rodriguez@email.com", phone: "+1 (555) 345-6789" },
    { id: "cust_004", name: "David Thompson", email: "david.thompson@email.com", phone: "+1 (555) 456-7890" },
    { id: "cust_005", name: "Lisa Wang", email: "lisa.wang@email.com", phone: "+1 (555) 567-8901" }
  ];

  const mockServices = [
    { 
      id: "service_001", 
      name: "Hair Cut & Style", 
      price: 85, 
      duration: 90, 
      description: "Professional haircut with styling",
      requiresDeposit: true,
      depositAmount: 25
    },
    { 
      id: "service_002", 
      name: "Beard Trim", 
      price: 35, 
      duration: 30, 
      description: "Precision beard trimming and shaping",
      requiresDeposit: false,
      depositAmount: 0
    },
    { 
      id: "service_003", 
      name: "Color Treatment", 
      price: 150, 
      duration: 180, 
      description: "Full hair coloring service",
      requiresDeposit: true,
      depositAmount: 50
    },
    { 
      id: "service_004", 
      name: "Full Service", 
      price: 95, 
      duration: 120, 
      description: "Complete hair care package",
      requiresDeposit: true,
      depositAmount: 30
    }
  ];

  const mockLocations = [
    { id: "loc_001", name: "Downtown Salon", address: "123 Main St, Downtown" },
    { id: "loc_002", name: "Uptown Branch", address: "456 Oak Ave, Uptown" },
    { id: "loc_003", name: "Mall Location", address: "789 Shopping Center, Mall District" }
  ];

  const bookingStats = {
    total: mockBookings?.length,
    pending: mockBookings?.filter(b => b?.status === 'pending')?.length,
    confirmed: mockBookings?.filter(b => b?.status === 'confirmed')?.length,
    revenue: mockBookings?.filter(b => b?.paymentStatus === 'paid')?.reduce((sum, b) => sum + b?.totalAmount, 0)
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleTimeSlotClick = (date, time = null) => {
    setShowNewBookingModal(true);
  };

  const handleBookingDrop = (booking, targetDate, targetTime) => {
    console.log('Rescheduling booking:', booking?.id, 'to', targetDate, targetTime);
    // Handle booking rescheduling logic here
  };

  const handleNewBookingSave = async (bookingData) => {
    console.log('Creating new booking:', bookingData);
    // Handle new booking creation logic here
  };

  const handleBookingAction = (action, bookingId) => {
    console.log(`${action} booking:`, bookingId);
    // Handle booking actions (confirm, cancel, reschedule, etc.)
  };

  const handleBulkAction = (action, bookingIds) => {
    console.log(`Bulk ${action}:`, bookingIds);
    // Handle bulk actions
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      paymentStatus: '',
      serviceId: '',
      locationId: '',
      dateRange: '',
      startDate: '',
      endDate: '',
      search: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main className="transition-all duration-300 lg:ml-16 pt-16 lg:pt-0">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Booking Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage appointments, schedules, and customer bookings
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
              <Button
                variant="default"
                onClick={() => setShowNewBookingModal(true)}
                iconName="Plus"
                iconPosition="left"
              >
                New Booking
              </Button>
            </div>
          </div>

          {/* Filters */}
          <BookingFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            services={mockServices}
            locations={mockLocations}
            bookingStats={bookingStats}
          />

          {/* Bulk Actions */}
          <BulkActionsBar
            selectedBookings={selectedBookings}
            onClearSelection={() => setSelectedBookings([])}
            onBulkConfirm={(bookings) => handleBulkAction('confirm', bookings)}
            onBulkCancel={(bookings) => handleBulkAction('cancel', bookings)}
            onBulkReschedule={(bookings) => handleBulkAction('reschedule', bookings)}
            onBulkSendReminder={(bookings) => handleBulkAction('send_reminder', bookings)}
            onBulkExport={(bookings) => handleBulkAction('export', bookings)}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Calendar View - 60% width on desktop */}
            <div className="xl:col-span-3">
              <CalendarView
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                bookings={mockBookings}
                onBookingClick={handleBookingClick}
                onTimeSlotClick={handleTimeSlotClick}
                onBookingDrop={handleBookingDrop}
              />
            </div>

            {/* Booking Details Panel - 40% width on desktop */}
            <div className="xl:col-span-2">
              <BookingDetailsPanel
                selectedBooking={selectedBooking}
                onClose={() => setSelectedBooking(null)}
                onEdit={(id) => handleBookingAction('edit', id)}
                onCancel={(id) => handleBookingAction('cancel', id)}
                onConfirm={(id) => handleBookingAction('confirm', id)}
                onReschedule={(id) => handleBookingAction('reschedule', id)}
                onSendReminder={(id) => handleBookingAction('send_reminder', id)}
                onViewCustomer={(id) => handleBookingAction('view_customer', id)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* New Booking Modal */}
      <NewBookingModal
        isOpen={showNewBookingModal}
        onClose={() => setShowNewBookingModal(false)}
        onSave={handleNewBookingSave}
        customers={mockCustomers}
        services={mockServices}
        locations={mockLocations}
      />

      {/* Mobile Bottom Padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default BookingManagement;