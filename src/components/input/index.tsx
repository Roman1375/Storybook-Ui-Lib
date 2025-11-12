import {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.css';
import { Eye, EyeOff, X } from 'lucide-react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  clearable?: boolean;
  label?: string;
};

export type InputRef = { focus: () => void; clear: () => void };

export const Input = forwardRef<InputRef, InputProps>(
  ({ type = 'text', clearable = false, label, value, onChange, ...rest }, ref) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState('');
    const currentValue = (isControlled ? (value as string | number) : internalValue) ?? '';

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

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <input
            id={id}
            ref={inputRef}
            className={styles.input}
            type={effectiveType}
            value={currentValue}
            onChange={handleChange}
            {...rest}
          />

          <div className={styles.inputButtons}>
            {clearable && String(currentValue).length > 0 && (
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="Clear input"
                onClick={handleClear}
              >
                <X size={18} color="#e5d7ff" />
              </button>
            )}
            {isPassword && (
              <button
                type="button"
                className={styles.iconBtn}
                aria-label={show ? 'Hide password' : 'Show password'}
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={18} color="#e5d7ff" /> : <Eye size={18} color="#e5d7ff" />}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
