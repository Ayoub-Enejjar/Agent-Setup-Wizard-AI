import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WhatsAppSetup = ({ isOpen, onClose, onSave }) => {
  const [qrCode, setQrCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const generateQRCode = async () => {
    if (!phoneNumber) return;
    setIsGeneratingQR(true);
    // Generate real wa.me QR code from the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const waLink = `https://wa.me/${cleanNumber}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services`;
    setTimeout(() => {
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(waLink)}`);
      setIsGeneratingQR(false);
      setConnectionStatus('connected');
    }, 1500);
  };

  const handleSave = () => {
    const config = {
      phoneNumber,
      businessName,
      qrCode,
      status: connectionStatus
    };
    onSave(config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevation-2 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">WhatsApp Business Setup</h2>
              <p className="text-sm text-muted-foreground">Connect your WhatsApp Business account</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Business Name"
                type="text"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e?.target?.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e?.target?.value)}
                required
              />
            </div>
          </div>

          {/* QR Code Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">QR Code Setup</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={generateQRCode}
                loading={isGeneratingQR}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Generate QR
              </Button>
            </div>

            <div className="bg-muted rounded-lg p-6">
              {qrCode ? (
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-white rounded-lg">
                    <img src={qrCode} alt="WhatsApp QR Code" className="w-48 h-48 mx-auto" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Scan with WhatsApp Business</p>
                    <p className="text-xs text-muted-foreground">
                      Open WhatsApp Business → Settings → Business Tools → QR Code → Scan Code
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-success' : 'bg-warning animate-pulse'}`}></div>
                    <span className={`font-medium ${connectionStatus === 'connected' ? 'text-success' : 'text-warning'}`}>
                      {connectionStatus === 'connected' ? 'Link generated!' : 'Waiting for connection...'}
                    </span>
                  </div>
                  {connectionStatus === 'connected' && phoneNumber && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const cleanNum = phoneNumber.replace(/[^0-9]/g, '');
                        window.open(`https://wa.me/${cleanNum}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services`, '_blank');
                      }}
                      iconName="ExternalLink"
                      iconPosition="left"
                    >
                      Test WhatsApp Link
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Click "Generate QR" to create your connection code</p>
                </div>
              )}
            </div>
          </div>

          {/* Connection Status */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={20} className="text-secondary" />
              <div>
                <p className="text-sm font-medium text-foreground">Connection Tips</p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                  <li>• Ensure your phone has internet connection</li>
                  <li>• Use WhatsApp Business app (not regular WhatsApp)</li>
                  <li>• QR code expires in 5 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={!businessName || !phoneNumber}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSetup;