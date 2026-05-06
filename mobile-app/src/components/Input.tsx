import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={`relative flex items-center ${icon ? 'pr-10' : ''}`}>
        <input
          className={`w-full px-4 py-3 rounded-2xl bg-white border-2 transition-all duration-200 focus:outline-none ${
            error 
              ? 'border-red-400 focus:border-red-500' 
              : 'border-gray-100 focus:border-primary-400'
          } ${className}`}
          {...props}
        />
        {icon && (
          <span className="absolute right-3 text-gray-400">{icon}</span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
