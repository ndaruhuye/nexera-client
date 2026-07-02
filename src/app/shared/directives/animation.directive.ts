import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AppAnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'rotate'
  | 'flip'
  | 'bounce'
  | 'shake'
  | 'zoom-in'
  | 'zoom-out';

@Directive({
  selector: '[appAnimation]',
  standalone: false,
})
export class AnimationDirective implements OnInit, OnDestroy {
  /**
   * Main animation input.
   *
   * Usage:
   * <div appAnimation="slide-up"></div>
   * or
   * <div [appAnimation]="'slide-up'"></div>
   */
  @Input('appAnimation') animationType: AppAnimationType = 'fade';

  @Input() appAnimationStep = 0;
  @Input() appAnimationIndex = 0;
  @Input() appAnimationOnce = true;
  @Input() appAnimationDuration = 600;
  @Input() appAnimationDelay = 0;
  @Input() appAnimationThreshold = 0.3;
  @Input() appAnimationRootMargin = '0px 0px -10% 0px';

  private observer?: IntersectionObserver;
  private currentAnimation?: Animation;
  private timeoutId?: number;
  private hasAnimated = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.showElement();
      return;
    }

    if (this.prefersReducedMotion()) {
      this.showElement();
      return;
    }

    this.prepareHiddenState();
    this.createObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.currentAnimation?.cancel();

    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  private createObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const isVisible =
            entry.isIntersecting &&
            entry.intersectionRatio >= this.appAnimationThreshold;

          if (isVisible) {
            this.handleEnterViewport();
          } else {
            this.handleLeaveViewport();
          }
        }
      },
      {
        threshold: this.appAnimationThreshold,
        rootMargin: this.appAnimationRootMargin,
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  private handleEnterViewport(): void {
    if (this.appAnimationOnce && this.hasAnimated) {
      return;
    }

    const delay =
      this.appAnimationDelay +
      this.appAnimationStep * this.appAnimationIndex;

    this.timeoutId = window.setTimeout(() => {
      this.playAnimation();
      this.hasAnimated = true;

      if (this.appAnimationOnce) {
        this.observer?.unobserve(this.elementRef.nativeElement);
      }
    }, delay);
  }

  private handleLeaveViewport(): void {
    if (this.appAnimationOnce) {
      return;
    }

    this.currentAnimation?.cancel();
    this.prepareHiddenState();
  }

  private prepareHiddenState(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'will-change', 'opacity, transform');
  }

  private showElement(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.setStyle(element, 'opacity', '1');
    this.renderer.removeStyle(element, 'transform');
    this.renderer.removeStyle(element, 'will-change');
  }

  private playAnimation(): void {
    const element = this.elementRef.nativeElement;
    const keyframes = this.getKeyframes(this.animationType);

    this.currentAnimation?.cancel();

    this.renderer.setStyle(element, 'opacity', '1');

    this.currentAnimation = element.animate(keyframes, {
      duration: this.appAnimationDuration,
      easing: this.getEasing(this.animationType),
      fill: 'forwards',
    });

    this.currentAnimation.onfinish = () => {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.removeStyle(element, 'will-change');
    };
  }

  private getKeyframes(type: AppAnimationType): Keyframe[] {
    const animations: Record<AppAnimationType, Keyframe[]> = {
      fade: [
        { opacity: 0 },
        { opacity: 1 },
      ],

      'slide-up': [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],

      'slide-down': [
        { opacity: 0, transform: 'translateY(-24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],

      'slide-left': [
        { opacity: 0, transform: 'translateX(32px)' },
        { opacity: 1, transform: 'translateX(0)' },
      ],

      'slide-right': [
        { opacity: 0, transform: 'translateX(-32px)' },
        { opacity: 1, transform: 'translateX(0)' },
      ],

      rotate: [
        { opacity: 0, transform: 'rotate(-8deg) scale(0.96)' },
        { opacity: 1, transform: 'rotate(0deg) scale(1)' },
      ],

      flip: [
        { opacity: 0, transform: 'perspective(800px) rotateY(90deg)' },
        { opacity: 1, transform: 'perspective(800px) rotateY(0deg)' },
      ],

      bounce: [
        { opacity: 0, transform: 'translateY(28px)', offset: 0 },
        { opacity: 1, transform: 'translateY(-10px)', offset: 0.55 },
        { opacity: 1, transform: 'translateY(0)', offset: 1 },
      ],

      shake: [
        { opacity: 1, transform: 'translateX(0)', offset: 0 },
        { opacity: 1, transform: 'translateX(-10px)', offset: 0.2 },
        { opacity: 1, transform: 'translateX(10px)', offset: 0.4 },
        { opacity: 1, transform: 'translateX(-10px)', offset: 0.6 },
        { opacity: 1, transform: 'translateX(10px)', offset: 0.8 },
        { opacity: 1, transform: 'translateX(0)', offset: 1 },
      ],

      'zoom-in': [
        { opacity: 0, transform: 'scale(0.92)' },
        { opacity: 1, transform: 'scale(1)' },
      ],

      'zoom-out': [
        { opacity: 0, transform: 'scale(1.08)' },
        { opacity: 1, transform: 'scale(1)' },
      ],
    };

    return animations[type] || animations.fade;
  }

  private getEasing(type: AppAnimationType): string {
    if (type === 'bounce') {
      return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    }

    if (type === 'shake') {
      return 'ease-in-out';
    }

    return 'cubic-bezier(0.22, 1, 0.36, 1)';
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
