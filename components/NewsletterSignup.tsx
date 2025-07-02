import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Button from './Button';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the email to your backend/newsletter service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter signup failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal-black rounded-2xl p-6 border border-neutral-gray">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary-red rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-text-white" />
        </div>
        <h3 className="text-xl font-bold text-text-white mb-2 font-heading">
          Stay in the Loop
        </h3>
        <p className="text-text-secondary font-body">
          Get notified about new Aussie athletes joining GNG Engine
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-heading font-semibold">Successfully subscribed!</span>
          </div>
          <p className="text-text-secondary text-sm font-body">
            You'll receive updates about new athletes and platform features.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 bg-background border border-neutral-gray rounded-lg text-text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent font-body"
              required
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup; 