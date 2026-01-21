import { SvgLoader } from '@/components/svg-loader.component';
import { LANGUAGES } from '@/constants';
import { CustomInputProps } from '@/types';
import { FocusEvent, memo, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_ERROR_TEXT = 'This field is required';
const baseInputClasses =
  'block w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none duration-200 bg-transparent autofill:bg-transparent';
const inputStyles = {
  border: 'border px-3 py-2 rounded-md',
  underline: 'border-b-1 p-1',
  floatingLabel: 'border px-3 pt-4 pb-2 rounded-md',
};

export const CustomInput = memo(
  ({
    label,
    id,
    ref,
    type = 'text',
    placeholder = '',
    name,
    value = '',
    className = '',
    inputClassName = '',
    disabled = false,
    inputStyle = 'border',
    icon,
    hasError = false,
    errorText,
    autoComplete,
    onChange,
    onFocus,
    onBlur,
  }: CustomInputProps) => {
    const { i18n } = useTranslation();
    const randomId = useId();
    const inputId = id || randomId;
    const errorId = `${inputId}-error`;
    const [isFocused, setIsFocused] = useState(false);

    const language = i18n.resolvedLanguage || i18n.language || LANGUAGES.en;
    const showLabel = label && inputStyle !== 'floatingLabel';
    const ariaLabel = !showLabel ? label || placeholder : undefined;

    const onChangeHandler = ({
      target: { value },
    }: {
      target: { value: string };
    }) => {
      if (onChange) onChange(value);
    };

    const onFocusHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
      if (inputStyle === 'floatingLabel' && !event.target.value)
        setIsFocused(true);
      if (typeof onFocus === 'function') onFocus(event);
    };

    const onBlurHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
      if (inputStyle === 'floatingLabel' && !event.target.value)
        setIsFocused(false);
      if (typeof onBlur === 'function') onBlur(event);
    };

    return (
      <div className={`flex flex-col space-y-1 select-none ${className}`}>
        {showLabel && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SvgLoader name={icon} color="currentColor" />
            </div>
          )}
          <input
            name={name}
            ref={ref}
            id={inputId}
            type={type}
            placeholder={
              inputStyle === 'floatingLabel' && !placeholder
                ? undefined
                : placeholder
            }
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            className={`${baseInputClasses} ${inputClassName} ${
              inputStyles[inputStyle]
            } ${icon ? 'pl-10' : ''} ${
              hasError
                ? 'border-red-500 dark:border-red-400'
                : 'focus:border-indigo-500'
            }`}
            disabled={disabled}
            aria-invalid={!!hasError}
            aria-describedby={hasError ? errorId : undefined}
            aria-label={ariaLabel}
            autoComplete={autoComplete}
          />
          {inputStyle === 'floatingLabel' && (label || placeholder) && (
            <label
              htmlFor={inputId}
              className={`absolute px-1.5 text-sm duration-200 pointer-events-none text-gray-700 dark:text-gray-300 ${
                isFocused || value || placeholder
                  ? 'scale-75 -translate-y-3'
                  : ''
              } ${language === LANGUAGES.en ? 'origin-top-left left-2' : 'origin-top-right right-2'} top-4 ${icon ? 'left-10' : ''}`}
            >
              {label || placeholder}
            </label>
          )}
          {hasError && (
            <p id={errorId} className="mt-1 text-sm text-red-500">
              {errorText ? errorText : DEFAULT_ERROR_TEXT}
            </p>
          )}
        </div>
      </div>
    );
  },
);
