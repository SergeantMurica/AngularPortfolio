import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {HeaderComponent} from './core/components/header/header.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {ThemeService} from './core/services/theme.service';
import {StateService} from './core/services/state.service';
import {ModeService} from './core/services/mode.service';
import {VersionService} from './core/services/version.service';
import {SettingsSwitcherComponent} from './core/components/settings-switcher.component';
import {gsap} from 'gsap';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HeaderComponent,
    FooterComponent,
    SettingsSwitcherComponent,
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-background">
      <app-header></app-header>

      <div class="appRoot-section" #appRootSection>
        <div class="parallax-layer back-layer" #backLayer></div>
        <div class="parallax-layer mid-layer" #midLayer></div>
      <main class="flex-grow container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
      </div>

      <app-settings-switcher></app-settings-switcher>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .appRoot-section {
      width: 100%;
      overflow: hidden;
      perspective: 1000px;
    }

    .parallax-layer {
      transform-style: preserve-3d;
      position: absolute;
      width: 100%;
      height: 100%;
      will-change: transform;
    }
    .back-layer {
      background: radial-gradient(circle at center, var(--color-highlight) 0%, var(--color-background) 70%);
      transform: scale(1.2);
      mix-blend-mode: multiply;
      opacity: 0.3;
    }

    .mid-layer {
      background: url('/assets/svg/grid.svg');
      opacity: 0.1;
    }`

  ]
})




export class AppComponent implements OnInit {
  title: string = 'angular-portfolio';
  constructor(
    private themeService: ThemeService,
    private stateService: StateService,
    private modeService: ModeService,
    private versionService: VersionService
  ) {
  }

  @ViewChild('appRootSection') appRootSection!: ElementRef;
  @ViewChild('backLayer') backLayer!: ElementRef;
  @ViewChild('midLayer') midLayer!: ElementRef;

  ngOnInit() {
    // Initialize app state if needed
  }
  ngAfterViewInit() {
    this.initParallaxEffect();  // Call the function here
  }

  initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { width, height } = this.appRootSection.nativeElement.getBoundingClientRect();

      const xPercent = (clientX / width - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / height - 0.5) * 2; // -1 to 1

      gsap.to(this.backLayer.nativeElement, {
        x: xPercent * 30,
        y: yPercent * 30,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(this.midLayer.nativeElement, {
        x: xPercent * 60,
        y: yPercent * 60,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }
}
