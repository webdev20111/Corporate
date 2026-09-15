import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private navSub?: Subscription;

  constructor(private router: Router, private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.navSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.closeMenus(false));
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onHeaderClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Ignore clicks that toggle dropdowns or the mobile navbar.
    if (target.closest('[data-bs-toggle="dropdown"]')) return;
    if (target.closest('.navbar-toggler')) return;

    // Close menus when a navigational link inside the header is clicked.
    const link = target.closest('a[routerLink], a[href]') as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute('href')?.trim();
    if (href === '#') return;

    const clickedInsideMega = !!target.closest('.dropdown-mega');
    this.closeMenus(clickedInsideMega);
  }

  private closeMenus(lockHover = false): void {
    const root = this.host.nativeElement;

    // Close any open dropdowns.
    root.querySelectorAll<HTMLElement>('.dropdown-menu.show').forEach((menu) => {
      menu.classList.remove('show');
    });

    root.querySelectorAll<HTMLElement>('.dropdown.show').forEach((dropdown) => {
      dropdown.classList.remove('show');
    });

    root
      .querySelectorAll<HTMLElement>('[data-bs-toggle="dropdown"][aria-expanded="true"]')
      .forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));

    // Close mobile navbar collapse if open.
    const navMain = root.querySelector<HTMLElement>('#navMain');
    if (navMain?.classList.contains('show')) {
      navMain.classList.remove('show');
    }

    const navToggle = root.querySelector<HTMLButtonElement>(
      '.navbar-toggler[aria-controls="navMain"]'
    );
    if (navToggle?.getAttribute('aria-expanded') === 'true') {
      navToggle.setAttribute('aria-expanded', 'false');
    }

    if (lockHover) {
      // Prevent hover from immediately re-opening the mega menu after a header link click.
      root.querySelectorAll<HTMLElement>('.dropdown-mega').forEach((mega) => {
        if (mega.classList.contains('mega-locked')) return;

        mega.classList.add('mega-locked');

        const onLeave = () => {
          mega.classList.remove('mega-locked');
          mega.removeEventListener('mouseleave', onLeave);
        };

        mega.addEventListener('mouseleave', onLeave);
      });
    }
  }
}
