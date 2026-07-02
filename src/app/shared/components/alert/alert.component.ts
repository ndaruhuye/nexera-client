import { Component, inject } from '@angular/core';
import { AlertType, AlertData } from '../../../core/model/alert.model';
import { AlertService } from '../../../core/service/alert.service';
import { ButtonTone } from '../button/button.component';

@Component({
  selector: 'app-alert',
  standalone: false,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);

  readonly alert$ = this.alertService.alert$;

  getDefaultIcon(type: AlertType): string {
    const icons: Record<AlertType, string> = {
      success: 'fa-solid fa-check',
      warning: 'fa-solid fa-triangle-exclamation',
      error: 'fa-solid fa-xmark',
      info: 'fa-solid fa-info',
      confirm: 'fa-solid fa-question',
    };

    return icons[type];
  }

  getButtonTone(type: AlertType): ButtonTone {
    const tones: Record<AlertType, ButtonTone> = {
      success: 'success',
      warning: 'warning',
      error: 'danger',
      info: 'primary',
      confirm: 'primary',
    };

    return tones[type];
  }

  onBackdropClick(alert: AlertData): void {
    if (alert.closeOnBackdrop) {
      this.cancel(alert);
    }
  }

  confirm(alert: AlertData): void {
    if (alert.type === 'confirm') {
      this.alertService.confirmAction();
      return;
    }

    this.alertService.close();
  }

  cancel(alert: AlertData): void {
    if (alert.type === 'confirm') {
      this.alertService.cancelAction();
      return;
    }

    this.alertService.close();
  }

  close(): void {
    this.alertService.close();
  }
}
