import {Component, OnInit} from '@angular/core';
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

      <main class="flex-grow container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
      <app-settings-switcher></app-settings-switcher>

      <app-footer></app-footer>
    </div>
  `,
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

  ngOnInit() {
    // Initialize app state if needed
  }
}
