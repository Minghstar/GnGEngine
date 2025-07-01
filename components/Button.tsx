import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <button
      className={clsx(
        'font-heading rounded-xl px-6 py-3 text-base font-bold transition focus:outline-none',
        variant === 'primary' && 'bg-primary-red text-text-white hover:bg-accent-blue',
        variant === 'secondary' && 'bg-neutral-gray text-primary-red border border-primary-red hover:bg-primary-red hover:text-text-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 