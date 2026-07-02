import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertData, AlertOptions, AlertType } from '../model/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly alertSubject = new BehaviorSubject<AlertData | null>(null);
  readonly alert$: Observable<AlertData | null> = this.alertSubject.asObservable();

  private autoCloseTimer?: ReturnType<typeof setTimeout>;
  private confirmResolver?: (result: boolean) => void;

  success(options: AlertOptions): void {
  this.open('success', {
    duration: options.duration ?? 3000,
    closeOnBackdrop: true,
    ...options,
  });
}

warning(options: AlertOptions): void {
  this.open('warning', {
    duration: options.duration ?? 4000,
    closeOnBackdrop: true,
    ...options,
  });
}

error(options: AlertOptions): void {
  this.open('error', {
    duration: options.duration ?? 5000,
    closeOnBackdrop: true,
    ...options,
  });
}

info(options: AlertOptions): void {
  this.open('info', {
    duration: options.duration ?? 3000,
    closeOnBackdrop: true,
    ...options,
  });
}

  confirm(options: AlertOptions): Promise<boolean> {
    this.clearTimer();

    const alert: AlertData = {
      id: crypto.randomUUID(),
      type: 'confirm',
      title: options.title,
      message: options.message,
      icon: options.icon,
      confirmText: options.confirmText ?? 'Confirm',
      cancelText: options.cancelText ?? 'Cancel',
      showCancel: true,
      dismissible: options.dismissible ?? false,
      closeOnBackdrop: options.closeOnBackdrop ?? false,
      duration: 0,
    };

    this.alertSubject.next(alert);

    return new Promise<boolean>((resolve) => {
      this.confirmResolver = resolve;
    });
  }

  close(): void {
    this.clearTimer();
    this.alertSubject.next(null);
    this.confirmResolver = undefined;
  }

  confirmAction(): void {
    this.confirmResolver?.(true);
    this.close();
  }

  cancelAction(): void {
    this.confirmResolver?.(false);
    this.close();
  }

  private open(type: AlertType, options: AlertOptions): void {
    this.clearTimer();

    const alert: AlertData = {
      id: crypto.randomUUID(),
      type,
      title: options.title,
      message: options.message,
      icon: options.icon,
      confirmText: options.confirmText ?? 'Okay',
      cancelText: options.cancelText ?? 'Cancel',
      showCancel: options.showCancel ?? false,
      dismissible: options.dismissible ?? true,
      closeOnBackdrop: options.closeOnBackdrop ?? true,
      duration: options.duration ?? 0,
    };

    this.alertSubject.next(alert);

    if (alert.duration && alert.duration > 0) {
      this.autoCloseTimer = setTimeout(() => {
        this.close();
      }, alert.duration);
    }
  }

  private clearTimer(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }
}
