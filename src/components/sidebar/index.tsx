import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ChevronRightIcon, X } from 'lucide-react';
import styles from './sidebar.module.css';

export type MenuItem = {
  label: string;
  href?: string;
  children?: MenuItem[];
};

export type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: MenuItem[];
};

export const SidebarMenu: FC<SidebarMenuProps> = ({ open, onClose, title = 'Menu', items }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (path: string) => setExpanded((s) => ({ ...s, [path]: !s[path] }));

  const renderItems = (nodes: MenuItem[], parentPath = '') => (
    <ul className={styles.list}>
      {nodes.map((n, idx) => {
        const path = parentPath ? `${parentPath}.${idx}` : `${idx}`;
        const hasChildren = !!n.children?.length;
        const isOpen = !!expanded[path];
        if (hasChildren) {
          return (
            <li key={path}>
              <button className={`${styles.item} ${styles.row}`} onClick={() => toggle(path)}>
                <span>{n.label}</span>
                <ChevronRightIcon className={`${styles.chev} ${isOpen ? styles.chevOpen : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.children}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderItems(n.children!, path)}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        }
        return (
          <li key={path}>
            {n.href ? (
              <a className={styles.link} href={n.href} onClick={onClose}>
                {n.label}
              </a>
            ) : (
              <button className={styles.item} onClick={onClose}>
                {n.label}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );

  const root = typeof document !== 'undefined' ? document.body : null;
  if (!root) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className={styles.panel}
            initial={{ x: 360 }}
            animate={{ x: 0 }}
            exit={{ x: 360 }}
            transition={{ type: 'tween', duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <div className={styles.header}>
              {title}
              <button className={styles.closeBtn} aria-label="Close menu" onClick={onClose}>
                <X />
              </button>
            </div>
            <nav>{renderItems(items)}</nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    root,
  );
};
