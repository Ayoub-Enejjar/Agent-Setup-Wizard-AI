import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PaymentOverviewCard from './components/PaymentOverviewCard';
import TransactionFilters from './components/TransactionFilters';
import TransactionList from './components/TransactionList';
import PaymentGatewayConfig from './components/PaymentGatewayConfig';
import DepositSettings from './components/DepositSettings';
import DisputeManagement from './components/DisputeManagement';
import RevenueAnalytics from './components/RevenueAnalytics';

const PaymentProcessing = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for payment overview
  const overviewData = [
    {
      title: 'Total Revenue',
      amount: 125400,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      iconColor: 'bg-success/10 text-success',
      trend: '+$15,200 vs last month'
    },
    {
      title: 'Pending Payments',
      amount: 8750,
      change: '-5.2%',
      changeType: 'negative',
      icon: 'Clock',
      iconColor: 'bg-warning/10 text-warning',
      trend: '23 pending transactions'
    },
    {
      title: 'Refund Requests',
      amount: 2340,
      change: '+8.1%',
      changeType: 'positive',
      icon: 'RefreshCw',
      iconColor: 'bg-destructive/10 text-destructive',
      trend: '12 active requests'
    },
    {
      title: 'Gateway Performance',
      amount: '97.8%',
      change: '+0.8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      iconColor: 'bg-secondary/10 text-secondary',
      trend: 'Success rate this month'
    }
  ];

  // Mock transaction data
  const transactionData = [
    {
      id: 'TXN-2024-001',
      customer: {
        id: 'CUST-001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      amount: 299.99,
      fee: 8.99,
      paymentMethod: 'credit_card',
      last4: '4242',
      gateway: 'stripe',
      status: 'completed',
      createdAt: '2024-08-22T10:30:00Z'
    },
    {
      id: 'TXN-2024-002',
      customer: {
        id: 'CUST-002',
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      amount: 149.50,
      fee: 4.49,
      paymentMethod: 'paypal',
      gateway: 'paypal',
      status: 'pending',
      createdAt: '2024-08-22T09:15:00Z'
    },
    {
      id: 'TXN-2024-003',
      customer: {
        id: 'CUST-003',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      amount: 89.99,
      fee: 2.70,
      paymentMethod: 'apple_pay',
      gateway: 'stripe',
      status: 'completed',
      createdAt: '2024-08-22T08:45:00Z'
    },
    {
      id: 'TXN-2024-004',
      customer: {
        id: 'CUST-004',
        name: 'David Thompson',
        email: 'david.thompson@email.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      amount: 450.00,
      fee: 13.50,
      paymentMethod: 'bank_transfer',
      gateway: 'local_bank',
      status: 'failed',
      createdAt: '2024-08-22T07:20:00Z'
    },
    {
      id: 'TXN-2024-005',
      customer: {
        id: 'CUST-005',
        name: 'Lisa Wang',
        email: 'lisa.wang@email.com',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      },
      amount: 199.99,
      fee: 5.99,
      paymentMethod: 'credit_card',
      last4: '1234',
      gateway: 'square',
      status: 'refunded',
      createdAt: '2024-08-21T16:30:00Z'
    }
  ];

  // Mock gateway data
  const gatewayData = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Global payment processing platform',
      enabled: true,
      apiKey: '••••••••••••sk_live_123',
      secretKey: '••••••••••••sk_secret_456',
      webhookUrl: 'https://rocket.new/webhooks/stripe',
      feePercentage: 2.9,
      fixedFee: 0.30,
      successRate: 98.5,
      avgProcessingTime: 1.2,
      monthlyVolume: 52300,
      totalTransactions: 1247,
      features: ['Credit Cards', 'Digital Wallets', 'Bank Transfers', 'Subscriptions']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Digital payment and money transfer service',
      enabled: true,
      apiKey: '••••••••••••pp_live_789',
      secretKey: '••••••••••••pp_secret_012',
      webhookUrl: 'https://rocket.new/webhooks/paypal',
      feePercentage: 3.49,
      fixedFee: 0.49,
      successRate: 97.8,
      avgProcessingTime: 2.1,
      monthlyVolume: 18900,
      totalTransactions: 456,
      features: ['PayPal Balance', 'Credit Cards', 'Bank Transfers']
    },
    {
      id: 'square',
      name: 'Square',
      description: 'Point of sale and payment processing',
      enabled: false,
      apiKey: '',
      secretKey: '',
      webhookUrl: '',
      feePercentage: 2.6,
      fixedFee: 0.10,
      successRate: 96.9,
      avgProcessingTime: 1.8,
      monthlyVolume: 12400,
      totalTransactions: 289,
      features: ['Credit Cards', 'Contactless', 'Gift Cards']
    }
  ];

  // Mock deposit settings
  const depositSettings = {
    requireDeposit: true,
    depositType: 'percentage',
    depositPercentage: 25,
    fixedDepositAmount: 50,
    minDepositAmount: 10,
    maxDepositAmount: 500,
    sendReminders: true,
    firstReminderTiming: '24_hours',
    secondReminderTiming: '1_hour',
    maxReminders: 3,
    reminderTemplate: `Hi {customer_name}, your booking with {business_name} requires a deposit of {deposit_amount} to confirm. Please complete payment at: {payment_link}`,
    refundOnCancellation: true,
    refundWindowHours: 24,
    cancellationFeePercentage: 10,
    serviceDeposits: [
      { name: 'Hair Cut & Style', amount: 25 },
      { name: 'Color Treatment', amount: 50 },
      { name: 'Wedding Package', amount: 200 }
    ]
  };

  // Mock dispute data
  const disputeData = [
    {
      id: 'DISP-2024-001',
      transactionId: 'TXN-2024-001',
      customer: {
        id: 'CUST-001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      amount: 299.99,
      type: 'chargeback',
      status: 'open',
      reason: `Customer claims they did not receive the service as described. They state that the hair coloring service was not performed according to their specifications and the result was significantly different from what was agreed upon.`,
      createdAt: '2024-08-20T14:30:00Z',
      deadline: '2024-08-27T23:59:59Z',
      evidence: []
    },
    {
      id: 'DISP-2024-002',
      transactionId: 'TXN-2024-003',
      customer: {
        id: 'CUST-003',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      amount: 89.99,
      type: 'inquiry',
      status: 'under_review',
      reason: 'Customer is questioning the charge and requesting more information about the transaction.',
      createdAt: '2024-08-19T11:15:00Z',
      deadline: '2024-08-26T23:59:59Z',
      evidence: [
        { filename: 'service_agreement.pdf', uploadedAt: '2024-08-20T09:30:00Z' },
        { filename: 'before_after_photos.jpg', uploadedAt: '2024-08-20T09:32:00Z' }
      ]
    }
  ];

  const handleFiltersChange = (filters) => {
    console.log('Filters changed:', filters);
  };

  const handleExportTransactions = () => {
    console.log('Exporting transactions...');
  };

  const handleRefundTransaction = (transactionId) => {
    console.log('Processing refund for transaction:', transactionId);
  };

  const handleViewReceipt = (transactionId) => {
    console.log('Viewing receipt for transaction:', transactionId);
  };

  const handleViewCustomer = (customerId) => {
    console.log('Viewing customer:', customerId);
  };

  const handleUpdateGateway = (gatewayId, updates) => {
    console.log('Updating gateway:', gatewayId, updates);
  };

  const handleTestGateway = (gatewayId) => {
    console.log('Testing gateway:', gatewayId);
  };

  const handleUpdateDepositSettings = (settings) => {
    console.log('Updating deposit settings:', settings);
  };

  const handleUpdateDispute = (disputeId, updates) => {
    console.log('Updating dispute:', disputeId, updates);
  };

  const handleUploadEvidence = (disputeId, files) => {
    console.log('Uploading evidence for dispute:', disputeId, files);
  };

  const tabNavigation = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'transactions', label: 'Transactions', icon: 'CreditCard' },
    { id: 'gateways', label: 'Gateways', icon: 'Settings' },
    { id: 'deposits', label: 'Deposits', icon: 'Wallet' },
    { id: 'disputes', label: 'Disputes', icon: 'Shield' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'}`}>
        <Header />
        
        <main className="p-6 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Payment Processing</h1>
                <p className="text-muted-foreground mt-1">
                  Manage transactions, gateways, and payment workflows
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabNavigation?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-secondary text-secondary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {overviewData?.map((data, index) => (
                      <PaymentOverviewCard key={index} {...data} />
                    ))}
                  </div>
                  <RevenueAnalytics analyticsData={{}} />
                </>
              )}

              {activeTab === 'transactions' && (
                <>
                  <TransactionFilters 
                    onFiltersChange={handleFiltersChange}
                    onExport={handleExportTransactions}
                  />
                  <TransactionList
                    transactions={transactionData}
                    onRefund={handleRefundTransaction}
                    onViewReceipt={handleViewReceipt}
                    onViewCustomer={handleViewCustomer}
                  />
                </>
              )}

              {activeTab === 'gateways' && (
                <PaymentGatewayConfig
                  gateways={gatewayData}
                  onUpdateGateway={handleUpdateGateway}
                  onTestGateway={handleTestGateway}
                />
              )}

              {activeTab === 'deposits' && (
                <DepositSettings
                  settings={depositSettings}
                  onUpdateSettings={handleUpdateDepositSettings}
                />
              )}

              {activeTab === 'disputes' && (
                <DisputeManagement
                  disputes={disputeData}
                  onUpdateDispute={handleUpdateDispute}
                  onUploadEvidence={handleUploadEvidence}
                />
              )}

              {activeTab === 'analytics' && (
                <RevenueAnalytics analyticsData={{}} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentProcessing;