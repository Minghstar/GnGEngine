import React from 'react';

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <div className={`bg-white rounded-2xl shadow-md p-4 ${className || ''}`}>
    {children}
  </div>
);

export default Card; 