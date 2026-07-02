import { Component, Input } from '@angular/core';

export type LoaderType = 'spinner' | 'dots' | 'bar' | 'pulse';
export type LoaderSize = 'sm' | 'md' | 'lg';
export type LoaderTone = 'primary' | 'white' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input() type: LoaderType = 'spinner';
  @Input() size: LoaderSize = 'md';
  @Input() tone: LoaderTone = 'primary';

  @Input() text = '';
  @Input() fullscreen = false;
  @Input() backdrop = true;

  get wrapperClasses(): string[] {
    return [
      this.fullscreen ? 'loader-wrapper--fullscreen' : 'loader-wrapper--inline',
      this.fullscreen && this.backdrop ? 'loader-wrapper--backdrop' : '',
    ].filter(Boolean);
  }

  get loaderClasses(): string[] {
    return [
      `loader--${this.type}`,
      `loader--${this.size}`,
      `loader--${this.tone}`,
    ];
  }
}
