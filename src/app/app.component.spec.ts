import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { SeoService } from './core/service/seo.service';
import { ThemeService } from './core/service/theme.service';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  const seoService = jasmine.createSpyObj<SeoService>('SeoService', [
    'watchRouteSeo',
  ]);
  const themeService = {
    initializeTheme: jasmine.createSpy('initializeTheme'),
    toggleTheme: jasmine.createSpy('toggleTheme'),
    isDark$: of(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [AppComponent],
      providers: [
        { provide: SeoService, useValue: seoService },
        { provide: ThemeService, useValue: themeService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize theme and route SEO watchers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(themeService.initializeTheme).toHaveBeenCalled();
    expect(seoService.watchRouteSeo).toHaveBeenCalled();
  });

  it('should render the app alert host and router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-alert')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
