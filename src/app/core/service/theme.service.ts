import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'app-theme-mode';

  private readonly modeSubject = new BehaviorSubject<ThemeMode>('light');

  readonly mode$ = this.modeSubject.asObservable();

  readonly isDark$ = this.mode$.pipe(map((mode) => mode === 'dark'));

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  initializeTheme(): void {
    if (!this.isBrowser()) {
      return;
    }

    const savedMode = localStorage.getItem(this.storageKey) as ThemeMode | null;

    if (savedMode === 'dark' || savedMode === 'light') {
      this.setMode(savedMode);
      return;
    }

    this.setMode('light');
  }

  toggleTheme(): void {
    const currentMode = this.modeSubject.value;
    const nextMode: ThemeMode = currentMode === 'dark' ? 'light' : 'dark';

    this.setMode(nextMode);
  }

  setMode(mode: ThemeMode): void {
    if (!this.isBrowser()) {
      return;
    }

    this.modeSubject.next(mode);
    localStorage.setItem(this.storageKey, mode);

    this.applyThemeClass(mode);
    this.updateThemeColorMeta(mode);
  }

  getCurrentMode(): ThemeMode {
    return this.modeSubject.value;
  }

  private applyThemeClass(mode: ThemeMode): void {
    const html = this.document.documentElement;
    const body = this.document.body;

    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(`${mode}-theme`);
    html.setAttribute('data-theme', mode);

    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${mode}-theme`);
    body.setAttribute('data-theme', mode);
  }

  private updateThemeColorMeta(mode: ThemeMode): void {
    const color = mode === 'dark' ? '#0a0a0a' : '#ffffff';

    let meta = this.document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

    if (!meta) {
      meta = this.document.createElement('meta');
      meta.name = 'theme-color';
      this.document.head.appendChild(meta);
    }

    meta.content = color;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
