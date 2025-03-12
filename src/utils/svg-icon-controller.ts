import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface SvgIconProps {
  src: string;
  color?: string;
  stroke?: string;
  size?: string;
}

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="icon-container" [innerHTML]="svgContent"></div>`,
  styles: [`
    .icon-container {
      display: inline-block;
    }
  `]
})
export class SvgIconComponent implements OnInit, OnChanges {
  @Input() src!: string;
  @Input() color: string = 'black';
  @Input() stroke: string = 'none';
  @Input() size: string = '32px';

  svgContent: SafeHtml | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src'] || changes['color'] || changes['stroke'] || changes['size']) {
      this.loadSvg();
    }
  }

  private loadSvg(): void {
    if (!this.src) return;

    this.http.get(this.src, { responseType: 'text' })
      .subscribe({
        next: (svg: string) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, 'image/svg+xml');
          const svgElement = doc.querySelector('svg');

          if (svgElement) {
            svgElement.setAttribute('width', this.size);
            svgElement.setAttribute('height', this.size);
            svgElement.setAttribute('fill', this.color);
            svgElement.setAttribute('stroke', this.stroke);

            // Sanitize the SVG to prevent XSS
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgElement.outerHTML);
          }
        },
        error: (error) => {
          console.error('Error loading SVG:', error);
        }
      });
  }
}
