

import { Component, HostListener, NgZone } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private storageKey = 'scrollY';
  routeLoading = false;

  constructor(private router: Router, private zone: NgZone) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.routeLoading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.routeLoading = false;
      }
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        const shouldRestore = sessionStorage.getItem('restoreScroll') === '1';
        const hasFragment = !!this.router.parseUrl(nav.urlAfterRedirects).fragment;
        if (!shouldRestore) {
          if (!hasFragment) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => window.scrollTo(0, 0), 0);
            });
          }
          return;
        }

        const saved = sessionStorage.getItem(this.storageKey);
        const y = Number(saved ?? '');
        if (Number.isNaN(y)) {
          sessionStorage.removeItem('restoreScroll');
          return;
        }

        this.zone.runOutsideAngular(() => {
          setTimeout(() => window.scrollTo(0, y), 0);
        });
        sessionStorage.removeItem('restoreScroll');
      });
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    sessionStorage.setItem(this.storageKey, String(window.scrollY));
    sessionStorage.setItem('restoreScroll', '1');
  }
}
