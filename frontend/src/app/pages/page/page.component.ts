import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml, Meta, Title } from '@angular/platform-browser';
import { Page, PageService } from '../../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  page?: Page;
  content?: SafeHtml;
  loading = true;
  private currentSlug = '';

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.setLoadingState(true);
    const dataSlug = this.route.snapshot.data['slug'];
    const paramSlug = this.route.snapshot.paramMap.get('slug');
    let slug = dataSlug ?? paramSlug;

    if (!slug) {
      this.setLoadingState(false);
      return;
    }

    if (slug.endsWith('.html')) {
      slug = slug.replace(/\.html$/, '');
    }

    this.setPageClass(slug);

    this.pageService.getPage(slug).subscribe({
      next: (page) => {
        try {
          this.page = page;
          this.applyMeta(page);
          const html = this.stripLayout(this.fixAssetPaths(page.content_html ?? ''));
          this.content = this.sanitizer.bypassSecurityTrustHtml(html);
          setTimeout(() => this.wireVideoControls(), 0);
          setTimeout(() => this.wireRouterLinks(), 0);
        } finally {
          this.setLoadingState(false);
          if (sessionStorage.getItem('restoreScroll') === '1') {
            setTimeout(() => this.restoreScroll(), 50);
          }
        }
      },
      error: () => {
        this.setLoadingState(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.setLoadingState(false);
    this.setPageClass('');
  }

  private fixAssetPaths(html: string): string {
    return html
      .replace(/src="assets\//g, 'src="/assets/')
      .replace(/href="assets\//g, 'href="/assets/');
  }

  private applyMeta(page: Page): void {
    const title = page.meta_title || page.title || 'MPS Software Solution';
    const description = page.meta_description || '';
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    if (page.meta_keywords) {
      this.meta.updateTag({ name: 'keywords', content: page.meta_keywords });
    }
    this.meta.updateTag({ property: 'og:title', content: page.og_title || title });
    this.meta.updateTag({ property: 'og:description', content: page.og_description || description });
    if (page.og_image) {
      this.meta.updateTag({ property: 'og:image', content: page.og_image });
    }
  }

  private wireRouterLinks(): void {
    // 1. Wire up custom [routerlink] elements
    const links = document.querySelectorAll<HTMLElement>('[routerlink]');
    links.forEach((link) => {
      if (link.dataset['boundRouter'] === 'true') {
        return;
      }
      link.dataset['boundRouter'] = 'true';
      link.setAttribute('role', 'link');
      link.setAttribute('tabindex', '0');
      link.style.cursor = 'pointer';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const target = link.getAttribute('routerlink');
        if (target) {
          this.router.navigateByUrl(target);
        }
      });
      link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const target = link.getAttribute('routerlink');
          if (target) {
            this.router.navigateByUrl(target);
          }
        }
      });
    });

    // 2. Wire up all standard <a> tags with hrefs loaded from CMS content
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    anchors.forEach((a) => {
      if (a.dataset['boundRouter'] === 'true') {
        return;
      }
      const href = a.getAttribute('href') || '';
      
      // Skip external protocols
      if (
        href.startsWith('http://') || 
        href.startsWith('https://') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:')
      ) {
        return;
      }

      a.dataset['boundRouter'] = 'true';
      a.addEventListener('click', (event) => {
        event.preventDefault();
        
        let target = href;

        // If it's a hash, check if an element with that ID exists on the current page
        if (target.startsWith('#')) {
          const element = document.getElementById(target.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            // Target page routing fallback for missing hash elements
            this.router.navigateByUrl('/' + target.substring(1));
          }
          return;
        }

        // Clean up relative HTML page links to root paths (e.g. software-development.html -> /software-development)
        if (target.endsWith('.html')) {
          target = '/' + target.replace(/\.html$/, '');
        } else if (!target.startsWith('/')) {
          target = '/' + target;
        }

        this.router.navigateByUrl(target);
      });
    });
  }

  private stripLayout(html: string): string {
    const withoutBlocks = html
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '');

    const parser = new DOMParser();
    const doc = parser.parseFromString(withoutBlocks, 'text/html');
    doc.querySelectorAll('nav, footer').forEach((node) => node.remove());
    doc.querySelectorAll('.navbar, .footer, #navMain').forEach((node) => node.remove());
    return doc.body.innerHTML;
  }

  private wireVideoControls(): void {
    const video = document.querySelector<HTMLVideoElement>('#heroVideo');
    const toggle = document.querySelector<HTMLElement>('[data-video-toggle]');
    if (!video || !toggle || toggle.dataset['bound'] === 'true') {
      return;
    }

    toggle.dataset['bound'] = 'true';

    toggle.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => undefined);
        toggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        video.pause();
        toggle.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    });
  }

  private setLoadingState(isLoading: boolean): void {
    this.loading = isLoading;
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.toggle('page-loading', isLoading);
    }
  }

  private restoreScroll(): void {
    const saved = sessionStorage.getItem('scrollY');
    if (!saved) {
      return;
    }
    const y = Number(saved);
    if (!Number.isNaN(y)) {
      window.scrollTo(0, y);
    }
  }

  private setPageClass(slug: string): void {
    if (typeof document === 'undefined' || !document.body) {
      return;
    }
    if (this.currentSlug) {
      document.body.classList.remove(`page-${this.currentSlug}`);
    }
    this.currentSlug = slug;
    if (slug) {
      document.body.classList.add(`page-${slug}`);
    }
  }
}
