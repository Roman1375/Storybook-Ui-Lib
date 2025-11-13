import {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  KeyboardEvent,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.css';
import { Eye, EyeOff, X } from 'lucide-react';

type BaseProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export type InputProps = BaseProps & {
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  label?: string;
  error?: string | boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type InputRef = {
  focus: () => void;
  clear: () => void;
};

export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      label,
      error,
      value,
      defaultValue = '',
      onChange,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState<string>(defaultValue);
    const currentValue: string = String((isControlled ? value : internalValue) ?? '');

    const [show, setShow] = useState(false);
    const isPassword = type === 'password';
    const effectiveType = isPassword ? (show ? 'text' : 'password') : type;

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => handleClear(),
    }));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (isControlled) {
        const event = new Event('input', { bubbles: true });
        if (inputRef.current) {
          inputRef.current.value = '';
          inputRef.current.dispatchEvent(event);
        }
      } else {
        setInternalValue('');
      }
      inputRef.current?.focus();
    };

    const handleMouseDownIcon = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape' && clearable && currentValue.length > 0) {
        e.stopPropagation();
        handleClear();
      }
    };

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={`${styles.label} ${error && styles.errorState}`} htmlFor={id}>
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <input
            id={id}
            ref={inputRef}
            className={`${styles.input} ${error && styles.inputError}`}
            type={effectiveType}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            aria-invalid={!!error}
            {...rest}
          />

          <div className={styles.inputButtons} aria-hidden="true">
            {clearable && String(currentValue).length > 0 && (
              <button
                type="button"
                className={`${styles.iconBtn} ${error && styles.iconBtnError}`}
                aria-label="Clear input"
                onClick={handleClear}
                onMouseDown={handleMouseDownIcon}
              >
                <X />
              </button>
            )}
            {isPassword && (
              <button
                type="button"
                className={`${styles.iconBtn} ${error && styles.iconBtnError}`}
                aria-label={show ? 'Hide password' : 'Show password'}
                onClick={() => setShow(!show)}
                onMouseDown={handleMouseDownIcon}
              >
                {show ? <EyeOff /> : <Eye />}
              </button>
            )}
          </div>
        </div>
        {error && (
          <p className={styles.errorMessage} role="alert">
            {typeof error === 'string' ? error : 'Error'}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
