import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
} from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'search'
  | 'url'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'textarea';

export type InputSize = 'sm' | 'md' | 'lg';

export type AppInputMode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url';

export interface InputErrorMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
  min?: string;
  max?: string;
  pattern?: string;
  number?: string;
  custom?: string;
}

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements ControlValueAccessor {
  @ViewChild('inputRef')
  inputRef?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  @Input() id = `input-${Math.random().toString(36).slice(2, 11)}`;
  @Input() name = '';

  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';

  /**
   * Use this only when you want to force one error message.
   * For normal validation messages, use errorMessages instead.
   */
  @Input() errorText = '';

  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';

  @Input('inputmode') inputMode?: AppInputMode;
  @Input() autocomplete = 'off';
  @Input() autocapitalize:
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters' = 'off';

  @Input() autocorrect: 'on' | 'off' = 'off';
  @Input() spellcheck: boolean | 'true' | 'false' = false;

  @Input() leftIcon = '';
  @Input() rightIcon = '';

  @Input() rows = 4;

  @Input() min?: number;
  @Input() max?: number;

  /**
   * Supports both:
   * [minlength]="3"
   * [minLength]="3"
   */
  @Input() minLength?: number;
  @Input('minlength') set minlengthAlias(value: number | string | undefined) {
    this.minLength = this.toNumberOrUndefined(value);
  }

  /**
   * Supports both:
   * [maxlength]="10"
   * [maxLength]="10"
   */
  @Input() maxLength?: number;
  @Input('maxlength') set maxlengthAlias(value: number | string | undefined) {
    this.maxLength = this.toNumberOrUndefined(value);
  }

  @Input() pattern?: string | RegExp;

  @Input() required = false;
  @Input() readonly = false;
  @Input() block = true;

  @Input() clearable = false;
  @Input() autofocus = false;
  @Input() trimOnBlur = true;

  @Input() numericOnly = false;
  @Input() allowDecimal = false;

  @Input() errorMessages: InputErrorMessages = {};

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();
  @Output() rightIconClick = new EventEmitter<void>();

  value = '';
  disabled = false;
  touched = false;
  passwordVisible = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(@Optional() @Self() public readonly ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get isTextarea(): boolean {
    return this.type === 'textarea';
  }

  get resolvedInputType(): string {
    if (this.type === 'password') {
      return this.passwordVisible ? 'text' : 'password';
    }

    if (this.type === 'textarea') {
      return 'text';
    }

    return this.type;
  }

  get resolvedInputMode(): AppInputMode | null {
    if (this.inputMode) {
      return this.inputMode;
    }

    if (this.numericOnly) {
      return this.allowDecimal ? 'decimal' : 'numeric';
    }

    const modes: Partial<Record<InputType, AppInputMode>> = {
      email: 'email',
      number: 'decimal',
      tel: 'tel',
      search: 'search',
      url: 'url',
    };

    return modes[this.type] ?? null;
  }

  get hasValue(): boolean {
    return (
      this.value !== null &&
      this.value !== undefined &&
      String(this.value).length > 0
    );
  }

  get hasLeftIcon(): boolean {
    return !!this.leftIcon;
  }

  get hasRightAction(): boolean {
    return this.type === 'password' || this.clearable || !!this.rightIcon;
  }

  get currentErrors(): ValidationErrors | null {
    const controlErrors = this.ngControl?.control?.errors;

    if (controlErrors) {
      return controlErrors;
    }

    return this.getInternalErrors();
  }

  get shouldShowError(): boolean {
    const control = this.ngControl?.control;

    if (control) {
      return control.invalid && (control.touched || this.touched);
    }

    return this.touched && !!this.currentErrors;
  }

  get hasError(): boolean {
    return this.shouldShowError;
  }

  get resolvedErrorText(): string {
    if (!this.hasError) {
      return '';
    }

    if (this.errorText) {
      return this.errorText;
    }

    const errors = this.currentErrors;

    if (!errors) {
      return '';
    }

    return this.getValidationMessage(errors);
  }

  get describedById(): string | null {
    if (this.hint || this.hasError) {
      return `${this.id}-description`;
    }

    return null;
  }

  get wrapperClasses(): string[] {
    return [
      `app-input--${this.size}`,
      this.block ? 'app-input--block' : '',
      this.hasError ? 'app-input--error' : '',
      this.disabled ? 'app-input--disabled' : '',
      this.readonly ? 'app-input--readonly' : '',
      this.hasLeftIcon ? 'app-input--with-left-icon' : '',
      this.hasRightAction ? 'app-input--with-right-action' : '',
    ].filter(Boolean);
  }

  writeValue(value: string | number | null): void {
    this.value = value === null || value === undefined ? '' : String(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    let nextValue = target.value;

    if (this.numericOnly) {
      nextValue = this.sanitizeNumericValue(nextValue);
      target.value = nextValue;
    }

    this.updateValue(nextValue);
  }

  handleBlur(): void {
    this.touched = true;
    this.onTouched();

    if (this.trimOnBlur && typeof this.value === 'string') {
      const trimmedValue = this.value.trim();

      if (trimmedValue !== this.value) {
        this.updateValue(trimmedValue);
      }
    }

    this.inputBlur.emit(this.value);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.enterPressed.emit(this.value);
    }
  }

  clear(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.updateValue('');
    this.touched = true;
    this.onTouched();
    this.cleared.emit();

    queueMicrotask(() => {
      this.focus();
    });
  }

  togglePasswordVisibility(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.passwordVisible = !this.passwordVisible;
  }

  handleRightIconClick(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this.rightIconClick.emit();
  }

  focus(): void {
    this.inputRef?.nativeElement.focus();
  }

  private updateValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  private getInternalErrors(): ValidationErrors | null {
    const errors: ValidationErrors = {};
    const value = this.value;

    if (this.required && this.isEmpty(value)) {
      errors['required'] = true;
    }

    if (!this.isEmpty(value)) {
      if (this.type === 'email' && !this.isValidEmail(value)) {
        errors['email'] = true;
      }

      if (this.type === 'number' && Number.isNaN(Number(value))) {
        errors['number'] = true;
      }

      if (
        this.minLength !== undefined &&
        value.length < Number(this.minLength)
      ) {
        errors['minlength'] = {
          requiredLength: Number(this.minLength),
          actualLength: value.length,
        };
      }

      if (
        this.maxLength !== undefined &&
        value.length > Number(this.maxLength)
      ) {
        errors['maxlength'] = {
          requiredLength: Number(this.maxLength),
          actualLength: value.length,
        };
      }

      if (this.min !== undefined && Number(value) < Number(this.min)) {
        errors['min'] = {
          min: Number(this.min),
          actual: Number(value),
        };
      }

      if (this.max !== undefined && Number(value) > Number(this.max)) {
        errors['max'] = {
          max: Number(this.max),
          actual: Number(value),
        };
      }

      if (this.pattern && !this.matchesPattern(value, this.pattern)) {
        errors['pattern'] = {
          requiredPattern: this.pattern.toString(),
          actualValue: value,
        };
      }
    }

    return Object.keys(errors).length ? errors : null;
  }

  private sanitizeNumericValue(value: string): string {
    if (this.allowDecimal) {
      return value.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1');
    }

    return value.replace(/\D/g, '');
  }

  private isEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || String(value).trim() === '';
  }

  private isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  private matchesPattern(value: string, pattern: string | RegExp): boolean {
    if (pattern instanceof RegExp) {
      return pattern.test(value);
    }

    return new RegExp(pattern).test(value);
  }

  private toNumberOrUndefined(
    value: number | string | undefined,
  ): number | undefined {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }

    return Number(value);
  }

  private getValidationMessage(errors: ValidationErrors): string {
    if (errors['required']) {
      return (
        this.errorMessages.required ||
        `${this.label || 'This field'} is required.`
      );
    }

    if (errors['email']) {
      return this.errorMessages.email || 'Please enter a valid email address.';
    }

    if (errors['number']) {
      return this.errorMessages.number || 'Please enter a valid number.';
    }

    if (errors['minlength']) {
      return (
        this.errorMessages.minlength ||
        `Minimum ${errors['minlength'].requiredLength} characters required.`
      );
    }

    if (errors['maxlength']) {
      return (
        this.errorMessages.maxlength ||
        `Maximum ${errors['maxlength'].requiredLength} characters allowed.`
      );
    }

    if (errors['min']) {
      return this.errorMessages.min || `Minimum value is ${errors['min'].min}.`;
    }

    if (errors['max']) {
      return this.errorMessages.max || `Maximum value is ${errors['max'].max}.`;
    }

    if (errors['pattern']) {
      return this.errorMessages.pattern || 'Invalid format.';
    }

    return this.errorMessages.custom || 'Invalid field.';
  }
}
