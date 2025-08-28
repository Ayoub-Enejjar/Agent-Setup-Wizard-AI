import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Briefcase, ChevronDown, ArrowLeft, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

const BusinessDetailsForm = ({
  onSubmit,
  onBack,
  loading,
  register,
  errors,
  onInputFocus
}) => {
  const businessTypes = [
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'saas', label: 'SaaS Company' },
    { value: 'agency', label: 'Marketing Agency' },
    { value: 'consulting', label: 'Consulting Business' },
    { value: 'restaurant', label: 'Restaurant/Food Service' },
    { value: 'retail', label: 'Retail Business' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' }
  ];

  const businessSizes = [
    { value: 'solo', label: 'Solo Entrepreneur (1 person)' },
    { value: 'small', label: 'Small Team (2-10 people)' },
    { value: 'medium', label: 'Growing Business (11-50 people)' },
    { value: 'large', label: 'Established Company (50+ people)' }
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional-services', label: 'Professional Services' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' }
  ];

  const validateBusinessName = (value) => {
    if (!value) return 'Business name is required';
    return value?.length >= 2 || 'Business name must be at least 2 characters';
  };

  const validateSelect = (fieldName) => (value) => {
    if (!value) return `Please select your ${fieldName}`;
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Tell us about your business
        </h2>
        <p className="text-sm text-muted-foreground">
          Help us customize your experience
        </p>
      </motion.div>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Business Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              {...register('businessName', {
                validate: validateBusinessName,
                onChange: () => onInputFocus?.('businessName')
              })}
              type="text"
              placeholder="Enter your business name"
              className={`
                w-full pl-10 pr-4 py-3 border rounded-lg
                transition-all duration-120
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
                ${errors?.businessName 
                  ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
                }
              `}
            />
            {errors?.businessName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors?.businessName?.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Business Type */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              {...register('businessType', {
                validate: validateSelect('business type'),
                onChange: () => onInputFocus?.('businessType')
              })}
              className={`
                w-full pl-10 pr-10 py-3 border rounded-lg appearance-none
                transition-all duration-120
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
                ${errors?.businessType 
                  ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
                }
              `}
            >
              <option value="">Select your business type</option>
              {businessTypes?.map?.((type) => (
                <option key={type?.value} value={type?.value}>
                  {type?.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            {errors?.businessType && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors?.businessType?.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Business Size */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              {...register('businessSize', {
                validate: validateSelect('business size'),
                onChange: () => onInputFocus?.('businessSize')
              })}
              className={`
                w-full pl-10 pr-10 py-3 border rounded-lg appearance-none
                transition-all duration-120
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
                ${errors?.businessSize 
                  ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
                }
              `}
            >
              <option value="">Select your business size</option>
              {businessSizes?.map?.((size) => (
                <option key={size?.value} value={size?.value}>
                  {size?.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            {errors?.businessSize && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors?.businessSize?.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Industry */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Building className="h-5 w-5 text-muted-foreground" />
            </div>
            <select
              {...register('industry', {
                validate: validateSelect('industry'),
                onChange: () => onInputFocus?.('industry')
              })}
              className={`
                w-full pl-10 pr-10 py-3 border rounded-lg appearance-none
                transition-all duration-120
                focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
                ${errors?.industry 
                  ? 'border-destructive focus:ring-destructive focus:border-destructive' :'border-input hover:border-ring/50'
                }
              `}
            >
              <option value="">Select your industry</option>
              {industries?.map?.((industry) => (
                <option key={industry?.value} value={industry?.value}>
                  {industry?.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
            {errors?.industry && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive"
              >
                {errors?.industry?.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex space-x-4 pt-4"
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBack}
            disabled={loading}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </div>
            ) : (
              'Continue'
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default BusinessDetailsForm;