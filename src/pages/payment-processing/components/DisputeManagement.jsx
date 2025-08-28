import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const DisputeManagement = ({ disputes, onUpdateDispute, onUploadEvidence }) => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Disputes' },
    { value: 'open', label: 'Open' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' },
    { value: 'expired', label: 'Expired' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-warning/10 text-warning', label: 'Open' },
      under_review: { color: 'bg-secondary/10 text-secondary', label: 'Under Review' },
      won: { color: 'bg-success/10 text-success', label: 'Won' },
      lost: { color: 'bg-destructive/10 text-destructive', label: 'Lost' },
      expired: { color: 'bg-muted text-muted-foreground', label: 'Expired' }
    };

    const config = statusConfig?.[status] || statusConfig?.open;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getDisputeTypeIcon = (type) => {
    const typeIcons = {
      chargeback: 'CreditCard',
      inquiry: 'HelpCircle',
      fraud: 'Shield',
      duplicate: 'Copy',
      unrecognized: 'AlertTriangle'
    };
    return typeIcons?.[type] || 'AlertTriangle';
  };

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
    })?.format(new Date(date));
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredDisputes = disputes?.filter(dispute => {
    const matchesStatus = filterStatus === 'all' || dispute?.status === filterStatus;
    const matchesSearch = !searchQuery || 
      dispute?.transactionId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      dispute?.customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const DisputeModal = ({ dispute, onClose }) => {
    const [evidenceFiles, setEvidenceFiles] = useState([]);
    const [responseText, setResponseText] = useState('');

    const handleFileUpload = (event) => {
      const files = Array.from(event?.target?.files);
      setEvidenceFiles(prev => [...prev, ...files]);
    };

    const handleSubmitResponse = () => {
      onUpdateDispute(dispute?.id, {
        status: 'under_review',
        response: responseText,
        evidence: evidenceFiles
      });
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
        <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Dispute #{dispute?.id}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Transaction: {dispute?.transactionId}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Dispute Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Dispute Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium text-foreground">{formatCurrency(dispute?.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-foreground capitalize">{dispute?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    {getStatusBadge(dispute?.status)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium text-foreground">{formatDate(dispute?.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className={`font-medium ${getDaysRemaining(dispute?.deadline) <= 3 ? 'text-destructive' : 'text-foreground'}`}>
                      {formatDate(dispute?.deadline)} ({getDaysRemaining(dispute?.deadline)} days)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Customer Information</h4>
                <div className="flex items-center space-x-3">
                  <Image
                    src={dispute?.customer?.avatar}
                    alt={dispute?.customer?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-foreground">{dispute?.customer?.name}</div>
                    <div className="text-sm text-muted-foreground">{dispute?.customer?.email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Reason */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Dispute Reason</h4>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-foreground">{dispute?.reason}</p>
              </div>
            </div>

            {/* Response Form */}
            {dispute?.status === 'open' && (
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Submit Response</h4>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Response Message
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg text-sm resize-none"
                    rows={4}
                    value={responseText}
                    onChange={(e) => setResponseText(e?.target?.value)}
                    placeholder="Provide your response to this dispute..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Evidence Files
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="evidence-upload"
                    />
                    <label htmlFor="evidence-upload" className="cursor-pointer">
                      <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload evidence files
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG, DOC files up to 10MB each
                      </p>
                    </label>
                  </div>
                  
                  {evidenceFiles?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {evidenceFiles?.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/30 rounded p-2">
                          <span className="text-sm text-foreground">{file?.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEvidenceFiles(prev => prev?.filter((_, i) => i !== index))}
                            iconName="X"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitResponse} disabled={!responseText?.trim()}>
                    Submit Response
                  </Button>
                </div>
              </div>
            )}

            {/* Existing Evidence */}
            {dispute?.evidence && dispute?.evidence?.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3">Submitted Evidence</h4>
                <div className="space-y-2">
                  {dispute?.evidence?.map((evidence, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/30 rounded p-3">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{evidence?.filename}</span>
                      </div>
                      <Button variant="ghost" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Dispute Management</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor and respond to payment disputes and chargebacks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by transaction ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
          />
        </div>
        <Select
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          className="w-full sm:w-48"
        />
      </div>
      {/* Disputes List */}
      <div className="space-y-4">
        {filteredDisputes?.map((dispute) => (
          <div key={dispute?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${dispute?.status === 'open' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                  <Icon name={getDisputeTypeIcon(dispute?.type)} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Dispute #{dispute?.id}</h4>
                  <p className="text-sm text-muted-foreground">Transaction: {dispute?.transactionId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {getStatusBadge(dispute?.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDispute(dispute)}
                >
                  View Details
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <div className="font-medium text-foreground">{formatCurrency(dispute?.amount)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Customer:</span>
                <div className="font-medium text-foreground">{dispute?.customer?.name}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Created:</span>
                <div className="font-medium text-foreground">{formatDate(dispute?.createdAt)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Deadline:</span>
                <div className={`font-medium ${getDaysRemaining(dispute?.deadline) <= 3 ? 'text-destructive' : 'text-foreground'}`}>
                  {getDaysRemaining(dispute?.deadline)} days remaining
                </div>
              </div>
            </div>

            {dispute?.status === 'open' && getDaysRemaining(dispute?.deadline) <= 3 && (
              <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2 text-destructive">
                  <Icon name="AlertTriangle" size={16} />
                  <span className="text-sm font-medium">Urgent: Response deadline approaching</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredDisputes?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No disputes found</h3>
            <p className="text-muted-foreground">
              {filterStatus === 'all' 
                ? "You don't have any payment disputes at the moment." : `No disputes with status"${filterStatus}" found.`
              }
            </p>
          </div>
        )}
      </div>
      {/* Dispute Detail Modal */}
      {selectedDispute && (
        <DisputeModal
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
        />
      )}
    </div>
  );
};

export default DisputeManagement;