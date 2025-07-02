import React, { useState } from 'react';
import { X, User, Mail, MessageSquare } from 'lucide-react';
import Button from './Button';

interface ClaimProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  athleteName: string;
}

const ClaimProfileModal: React.FC<ClaimProfileModalProps> = ({ isOpen, onClose, athleteName }) => {
  const [formData, setFormData] = useState({
    name: athleteName,
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
        setFormData({ name: athleteName, email: '', message: '' });
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-gray">
          <h2 className="text-xl font-bold text-charcoal font-heading">Claim Your Profile</h2>
          <button
            onClick={onClose}
            className="text-neutral-gray hover:text-primary-red transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2 font-heading">Claim Request Sent!</h3>
              <p className="text-text-secondary font-body">
                We've received your claim request and will get back to you within 24-48 hours.
              </p>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2 font-heading">Something went wrong</h3>
              <p className="text-text-secondary font-body mb-4">
                Please try again or contact us directly at info@gngengine.com
              </p>
              <Button variant="primary" onClick={() => setSubmitStatus('idle')}>
                Try Again
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-text-secondary font-body mb-6">
                Is this your profile? Fill out the form below and we'll help you claim it.
              </p>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2 font-heading">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-charcoal-black border border-neutral-gray rounded-lg text-text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-body"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2 font-heading">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-charcoal-black border border-neutral-gray rounded-lg text-text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-body"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2 font-heading">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-charcoal-black border border-neutral-gray rounded-lg text-text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-body resize-none"
                  placeholder="Tell us why you're claiming this profile and any additional information..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Claim Request'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimProfileModal; 