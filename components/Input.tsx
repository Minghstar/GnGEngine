import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => (
  <input
    className="rounded-lg border border-neutral-gray px-4 py-2 text-base bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-accent-blue w-full"
    {...props}
  />
);

export default Input; 