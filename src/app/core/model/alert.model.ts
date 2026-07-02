export type AlertType = 'success' | 'warning' | 'error' | 'info' | 'confirm';

export interface AlertData {
  id: string;
  type: AlertType;

  title: string;
  message?: string;

  icon?: string;

  confirmText?: string;
  cancelText?: string;

  showCancel?: boolean;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;

  /**
   * Auto-close duration in milliseconds.
   * Use 0 or undefined to disable auto close.
   */
  duration?: number;
}

export interface AlertOptions {
  title: string;
  message?: string;

  icon?: string;

  confirmText?: string;
  cancelText?: string;

  showCancel?: boolean;
  dismissible?: boolean;
  closeOnBackdrop?: boolean;
  duration?: number;
}
