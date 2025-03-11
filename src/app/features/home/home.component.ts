import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
    RouterModule,
    NgOptimizedImage
  ],
  template: `
    <section class="py-12 max-h-[52vh]">
      <div class="max-w-4xl mx-auto text-center" @fadeIn>
        <div class="mb-8">
          <img
            ngSrc="/assets/images/profileImage.png"
            alt="Profile"
            class="w-40 h-40 mx-auto rounded-full object-cover shadow-lg"
            height="500" width="500"/>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ userInfo.name }}
        </h1>

        <h2 class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {{ userInfo.title }}
        </h2>

        <p class="text-lg mb-8 max-w-2xl mx-auto">
          {{ aboutMe.start }}
        </p>

        <div class="flex justify-center gap-4">
          <a mat-raised-button color="primary" routerLink="/portfolio">View My Work</a>
          <a mat-raised-button routerLink="/contact">Contact Me</a>
          <a mat-raised-button routerLink="/resume">View My Resume</a>
        </div>
      </div>
    </section>

    <section class="py-8 bg-background w-full">
      <div class="stack-container mx-auto">
        <h2 class="text-2xl font-bold text-center">Tech Stack</h2>

        <div class="ticker-tape-container overflow-hidden">
          <div class="ticker-tape-content flex gap-8 animate-scroll">
            <div *ngFor="let tech of techStack" class="tech-item flex items-center gap-2">
              <img [ngSrc]="tech.logo" [alt]="tech.name" class="w-8 h-8" height="32" width="32"/>
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

    .stack-container {
      max-width: 1200px;
      border-radius: 10px;
      border: 1px solid var(--highlight-color);
      margin-top: 3rem;
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
    title: 'Full Stack Engineer',
    email: 'castroalexander1995@outlook.com'
  };

  aboutMe = {
    title: "About me",
    start:
      "I am a dedicated full-stack developer with a diverse background in military service, education, and social media marketing. My passion lies in crafting efficient and innovative web solutions that make a meaningful impact.",
    mid:
      "As a mental health advocate and content creator, I’ve channeled my personal experiences to help others navigate life’s challenges, building communities focused on awareness and support. This mission has shaped my commitment to leveraging technology to empower creators and foster positivity.",
    end:
      "I aspire to advance my career as a developer by designing tools and platforms that enable content creators to connect, inspire, and bring more joy into the lives of their audiences.",
  };

  techStack = [
    {name: "Angular", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/angular.svg"},
    {name: "Sass", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/sass.svg"},
    {name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/nodejs.svg"},
    {name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/tailwindcss.svg"},

    {name: "SQLite", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/sqlite.svg"},
    {name: "Express", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/express.svg"},
    {name: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/python.svg"},
    {name: "C++", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/cplusplus.svg"},
    {name: "Unreal Engine", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/unrealengine.svg"},
    {name: "Material-UI", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/material-ui.svg"},
    {name: "DaVinci Resolve", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/davinciresolve.svg"},
    {name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Firebase", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/firebase.svg"},
    {name: "Buffer", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/buffer.svg"},
    {name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mongodb.svg"},
    {name: "Git", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/git.svg"},
    {name: "Swift", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/swift.svg"},
    {name: "GitLab", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/gitlab.svg"},
    {name: "Node.JS", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/nodejs.svg"},
    {name: "GitHub", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg"},
    {name: "Postgres", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/postgresql.svg"},
    {name: "CSS", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/css3.svg"},
    {name: "Hootsuite", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/hootsuite.svg"},
    {name: "React Native", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Vercel", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/vercel.svg"},
    {name: "HTML", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/html5.svg"},
    {name: "C", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/c.svg"},
    {name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg"},
    {name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/typescript.svg"},
    {name: "MySQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mysql.svg"},
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
