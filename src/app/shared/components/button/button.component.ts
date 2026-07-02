import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost';
export type ButtonTone = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonHtmlType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'solid';
  @Input() tone: ButtonTone = 'primary';
  @Input() size: ButtonSize = 'md';

  @Input() htmlType: ButtonHtmlType = 'button';

  @Input() disabled = false;
  @Input() loading = false;
  @Input() block = false;

  /**
   * Use Font Awesome classes, for example:
   * leftIcon="fa-solid fa-arrow-right"
   */
  @Input() leftIcon?: string;
  @Input() rightIcon?: string;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get buttonClasses(): string[] {
    return [
      `app-button--${this.variant}`,
      `app-button--${this.tone}`,
      `app-button--${this.size}`,
      this.block ? 'app-button--block' : '',
      this.loading ? 'app-button--loading' : '',
    ].filter(Boolean);
  }

  handleClick(event: MouseEvent): void {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }
}
