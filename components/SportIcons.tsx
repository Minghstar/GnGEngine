import React from 'react';

interface SportIconProps {
  sport: string;
  className?: string;
  size?: number;
}

const SportIcons: React.FC<SportIconProps> = ({ sport, className = "", size = 24 }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Football': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7v10" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'Basketball': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Soccer': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    'Tennis': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M11 12h2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 9l8 6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 15l8-6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Swimming': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 8l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 12l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 16l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    'Track and Field': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 6l-12 12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    'Baseball': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 4l-8 8 8 8 8-8-8-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'Volleyball': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 8l-8 8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Golf': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 18l-4-8 8-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 10l8-4" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    'Lacrosse': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8v8" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'Hockey': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="8" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8v8" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="1" fill="currentColor"/>
      </svg>
    ),
    'Rowing': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 8l4 4 4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 12l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Cross Country': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 12l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 16l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Wrestling': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6v12" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'Softball': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4l-8 8 8 8 8-8-8-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'Field Hockey': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="8" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8v8" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Water Polo': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 8l-8 8" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    'Rugby': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7v10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 9l8 6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 15l8-6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Cricket': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 4l-8 8 8 8 8-8-8-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 4v16" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8l8 8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 8l-8 8" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'Other': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 12h8" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v8" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  };

  return (
    <div className="inline-block">
      {iconMap[sport] || iconMap['Other']}
    </div>
  );
};

export default SportIcons; 