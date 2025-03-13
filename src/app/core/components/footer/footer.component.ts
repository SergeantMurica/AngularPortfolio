import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {contact} from '../../../../utils/resumeData';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <footer class="bg-main/20 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-bodyText text-sm">
              © {{ currentYear }} The Pantheon Dev. All rights reserved.
            </p>
          </div>

          <!-- Social media links -->
          <div class="flex gap-4">
            <a *ngFor="let social of socialLinks | slice:0:3"
               [href]="social.url"
               target="_blank"
               class="social-icon"
               (mouseenter)="animateSocialIcon($event)"
               (mouseleave)="resetSocialIcon($event)">
              <span class="{{social.icon}}" style="width: 1.2em; height: 1.2em;"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {

  socialLinks = [...contact];

  animateSocialIcon(event: MouseEvent) {
    const icon = event.currentTarget as HTMLElement;
    icon.classList.add('animate-bounce');
  }

  resetSocialIcon(event: MouseEvent) {
    const icon = event.currentTarget as HTMLElement;
    icon.classList.remove('animate-bounce');
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  protected readonly contact = contact;
}
