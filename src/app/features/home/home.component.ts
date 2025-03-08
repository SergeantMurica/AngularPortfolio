import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {StateService} from '../../core/services/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  template: `
    <section class="py-12">
      <div class="max-w-4xl mx-auto text-center" @fadeIn>
        <div class="mb-8">
          <img
            src="assets/images/profile.jpg"
            alt="Profile"
            class="w-40 h-40 mx-auto rounded-full object-cover shadow-lg"
          />
        </div>

        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ userInfo.name }}
        </h1>

        <h2 class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {{ userInfo.title }}
        </h2>

        <p class="text-lg mb-8 max-w-2xl mx-auto">
          I'm a passionate developer with expertise in Angular, TypeScript, and modern web
          technologies. I love building responsive, user-friendly applications with clean code
          and optimal performance.
        </p>

        <div class="flex justify-center gap-4">
          <a mat-raised-button color="primary" routerLink="/portfolio">View My Work</a>
          <a mat-raised-button routerLink="/contact">Contact Me</a>
        </div>
      </div>
    </section>

    <section class="py-8 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">Tech Stack</h2>

        <div class="ticker-tape-container overflow-hidden">
          <div class="ticker-tape-content flex gap-8 animate-scroll">
            <div *ngFor="let tech of techStack" class="tech-item flex items-center gap-2">
              <img [src]="tech.logo" [alt]="tech.name" class="w-8 h-8"/>
              <span>{{ tech.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-scroll {
      animation: scroll 20s linear infinite;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .ticker-tape-container {
      width: 100%;
    }

    .ticker-tape-content {
      display: inline-flex;
      white-space: nowrap;
      padding-right: 100%;
    }

    .tech-item {
      flex: 0 0 auto;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('600ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  userInfo = {
    name: 'Alex Developer',
    title: 'Frontend Engineer',
    email: 'alex@example.com'
  };

  techStack = [
    {name: 'Angular', logo: 'assets/logos/angular.png'},
    {name: 'TypeScript', logo: 'assets/logos/typescript.png'},
    {name: 'JavaScript', logo: 'assets/logos/javascript.png'},
    {name: 'HTML5', logo: 'assets/logos/html5.png'},
    {name: 'CSS3', logo: 'assets/logos/css3.png'},
    {name: 'Sass', logo: 'assets/logos/sass.png'},
    {name: 'Node.js', logo: 'assets/logos/nodejs.png'},
    {name: 'RxJS', logo: 'assets/logos/rxjs.png'},
    {name: 'Tailwind CSS', logo: 'assets/logos/tailwind.png'},
    {name: 'Git', logo: 'assets/logos/git.png'},
  ];

  constructor(private stateService: StateService) {
  }

  ngOnInit() {
    // Get user info from state if needed
    this.stateService.getState().subscribe(state => {
      this.userInfo = state.user;
    });
  }
}
