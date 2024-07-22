import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-light text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;