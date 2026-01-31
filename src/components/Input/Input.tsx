import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  success,
  className = '',
  disabled,
  ...props
}) => {
  const inputClasses = [
    'input-field',
    error ? 'error' : '',
    success && !error ? 'success' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        disabled={disabled}
        {...props}
      />
      {error && (
        <span className="input-error">
          ⚠️ {error}
        </span>
      )}
      {helperText && !error && (
        <span className="input-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
