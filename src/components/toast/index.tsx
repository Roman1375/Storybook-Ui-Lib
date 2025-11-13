import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './Toast.module.css';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export type ToastProps = {
  type?: ToastType;
  title?: string;
  message?: ReactNode;
  duration?: number;
  closable?: boolean;
  open?: boolean;
  onClose?: () => void;
};

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
};

export const Toast: FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  duration = 3000,
  closable = true,
  open = true,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(open);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => setIsOpen(open), [open]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (duration <= 0) return;
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
      onClose?.();
    }, duration);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isOpen, duration, onClose]);

  const root = typeof document !== 'undefined' ? document.body : null;
  if (!mounted || !root) return null;

  return createPortal(
    <div className={styles.container} role="region" aria-live="polite">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.toast} ${styles[type]}`}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', stiffness: 400, damping: 80 }}
            variants={variants}
            role="status"
          >
            <div className={styles.toastContent}>
              {title && <div className={styles.title}>{title}</div>}
              {message && <div>{message}</div>}
            </div>
            {closable && (
              <button
                type="button"
                className={styles.closeBtn}
                aria-label="Close toast"
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
              >
                <X />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    root,
  );
};
