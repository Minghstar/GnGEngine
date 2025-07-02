import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { getViewCount, incrementViewCount, formatViewCount } from '../utils/viewCounter';

interface ViewCounterProps {
  athleteId: string;
  className?: string;
}

const ViewCounter: React.FC<ViewCounterProps> = ({ athleteId, className = "" }) => {
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    // Increment view count on component mount
    const newCount = incrementViewCount(athleteId);
    setViewCount(newCount);
  }, [athleteId]);

  return (
    <div className={`flex items-center gap-2 text-sm text-neutral-gray font-body ${className}`}>
      <Eye className="w-4 h-4" />
      <span>{formatViewCount(viewCount)}</span>
    </div>
  );
};

export default ViewCounter; 