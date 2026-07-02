import { Component } from '@angular/core';
import { SeoService } from './core/service/seo.service';
import { ThemeService } from './core/service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private readonly seoService: SeoService,
    private readonly themeService: ThemeService,
  ) {
    this.isDark$ = this.themeService.isDark$;
  }

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.seoService.watchRouteSeo();
  }

  readonly isDark$;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
