import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  templateUrl: './floating-actions.component.html',
  styleUrls: ['./floating-actions.component.scss']
})
export class FloatingActionsComponent {
  showScrollTop = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
