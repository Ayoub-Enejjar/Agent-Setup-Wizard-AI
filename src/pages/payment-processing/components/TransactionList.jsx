import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TransactionList = ({ transactions, onRefund, onViewReceipt, onViewCustomer }) => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Completed' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      failed: { color: 'bg-destructive/10 text-destructive', label: 'Failed' },
      refunded: { color: 'bg-muted text-muted-foreground', label: 'Refunded' },
      disputed: { color: 'bg-accent/10 text-accent', label: 'Disputed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPaymentMethodIcon = (method) => {
    const methodIcons = {
      'credit_card': 'CreditCard',
      'paypal': 'Wallet',
      'bank_transfer': 'Building2',
      'apple_pay': 'Smartphone',
      'google_pay': 'Smartphone'
    };
    return methodIcons?.[method] || 'CreditCard';
  };

  const getGatewayLogo = (gateway) => {
    const gatewayLogos = {
      stripe: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop&crop=center',
      paypal: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=32&h=32&fit=crop&crop=center',
      square: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=32&h=32&fit=crop&crop=center'
    };
    return gatewayLogos?.[gateway] || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=32&fit=crop&crop=center';
  };

  const handleSelectTransaction = (transactionId) => {
    setSelectedTransactions(prev => 
      prev?.includes(transactionId) 
        ? prev?.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTransactions?.length === transactions?.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions?.map(t => t?.id));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTransactions?.length === transactions?.length}
                onChange={handleSelectAll}
                className="rounded border-border text-secondary focus:ring-secondary"
              />
              <span className="text-sm font-medium text-foreground">
                {selectedTransactions?.length > 0 
                  ? `${selectedTransactions?.length} selected` 
                  : 'Select all'
                }
              </span>
            </label>
          </div>
          
          {selectedTransactions?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Selected
              </Button>
              <Button variant="outline" size="sm" iconName="RefreshCw">
                Bulk Refund
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr key={transaction?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedTransactions?.includes(transaction?.id)}
                      onChange={() => handleSelectTransaction(transaction?.id)}
                      className="rounded border-border text-secondary focus:ring-secondary"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        #{transaction?.id}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Image
                          src={getGatewayLogo(transaction?.gateway)}
                          alt={transaction?.gateway}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {transaction?.gateway}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={transaction?.customer?.avatar}
                      alt={transaction?.customer?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {transaction?.customer?.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction?.customer?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-foreground">
                    {formatCurrency(transaction?.amount)}
                  </div>
                  {transaction?.fee && (
                    <div className="text-xs text-muted-foreground">
                      Fee: {formatCurrency(transaction?.fee)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPaymentMethodIcon(transaction?.paymentMethod)} size={16} />
                    <span className="text-sm text-foreground capitalize">
                      {transaction?.paymentMethod?.replace('_', ' ')}
                    </span>
                  </div>
                  {transaction?.last4 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      •••• {transaction?.last4}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(transaction?.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {formatDate(transaction?.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewReceipt(transaction?.id)}
                      iconName="Receipt"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewCustomer(transaction?.customer?.id)}
                      iconName="User"
                    />
                    {transaction?.status === 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRefund(transaction?.id)}
                        iconName="RefreshCw"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {transactions?.map((transaction) => (
          <div key={transaction?.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.includes(transaction?.id)}
                  onChange={() => handleSelectTransaction(transaction?.id)}
                  className="rounded border-border text-secondary focus:ring-secondary"
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    #{transaction?.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(transaction?.createdAt)}
                  </div>
                </div>
              </div>
              {getStatusBadge(transaction?.status)}
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <Image
                src={transaction?.customer?.avatar}
                alt={transaction?.customer?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  {transaction?.customer?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {transaction?.customer?.email}
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {formatCurrency(transaction?.amount)}
                </div>
                {transaction?.fee && (
                  <div className="text-xs text-muted-foreground">
                    Fee: {formatCurrency(transaction?.fee)}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name={getPaymentMethodIcon(transaction?.paymentMethod)} size={16} />
                  <span className="text-sm text-foreground capitalize">
                    {transaction?.paymentMethod?.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={getGatewayLogo(transaction?.gateway)}
                    alt={transaction?.gateway}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {transaction?.gateway}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewReceipt(transaction?.id)}
                  iconName="Receipt"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewCustomer(transaction?.customer?.id)}
                  iconName="User"
                />
                {transaction?.status === 'completed' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRefund(transaction?.id)}
                    iconName="RefreshCw"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {transactions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or check back later for new transactions.
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;