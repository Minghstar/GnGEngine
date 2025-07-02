import React, { useState } from 'react';
import { Share2, Copy, Mail, MessageCircle, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleWhatsApp = () => {
    const text = `${title}${description ? ` - ${description}` : ''}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Check out this athlete: ${title}`;
    const body = `${description || 'Check out this amazing athlete'}${description ? '' : ` - ${title}`}\n\n${url}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  const handleTwitter = () => {
    const text = `${title}${description ? ` - ${description}` : ''}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary-red" />
        <span className="text-sm font-heading font-semibold text-charcoal">Share this profile</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-charcoal-black text-text-white rounded-lg hover:bg-neutral-gray transition-colors duration-200 font-body text-sm"
          title="Copy link to clipboard"
        >
          <Copy className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-4 py-2 bg-charcoal-black text-text-white rounded-lg hover:bg-neutral-gray transition-colors duration-200 font-body text-sm"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
        
        <button
          onClick={handleEmail}
          className="flex items-center gap-2 px-4 py-2 bg-charcoal-black text-text-white rounded-lg hover:bg-neutral-gray transition-colors duration-200 font-body text-sm"
          title="Share via email"
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        
        <button
          onClick={handleTwitter}
          className="flex items-center gap-2 px-4 py-2 bg-charcoal-black text-text-white rounded-lg hover:bg-neutral-gray transition-colors duration-200 font-body text-sm"
          title="Share on Twitter/X"
        >
          <Twitter className="w-4 h-4" />
          Twitter/X
        </button>
      </div>
    </div>
  );
};

export default ShareButtons; 