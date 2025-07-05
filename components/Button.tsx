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
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg',
        variant === 'secondary' && 'bg-white text-primary border border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 