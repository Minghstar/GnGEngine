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
        'font-heading rounded-xl px-6 py-3 text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg focus:ring-primary transform hover:scale-105',
        variant === 'secondary' && 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg focus:ring-primary transform hover:scale-105',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 