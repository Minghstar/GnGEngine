import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = (props) => (
  <select
    className="rounded-lg border border-neutral-gray px-4 py-2 text-base bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-accent-blue w-full"
    {...props}
  />
);

export default Select; 