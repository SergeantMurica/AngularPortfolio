import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {animate, style, transition, trigger} from '@angular/animations';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Professional Experience</h1>

      <div class="timeline">
        <mat-card *ngFor="let job of experience; let i = even" class="mb-6"
                  [ngClass]="{'timeline-right': i}" @fadeInUp>
          <mat-card-header>
            <mat-card-title>{{ job.title }}</mat-card-title>
            <mat-card-subtitle>{{ job.company }} | {{ job.period }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="mt-4">
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ job.location }}</p>
            <p class="mb-4">{{ job.description }}</p>

            <div class="flex flex-wrap gap-2 mt-2">
              <span *ngFor="let tech of job.technologies"
                    class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                {{ tech }}
              </span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-divider class="my-10"></mat-divider>

      <h1 class="text-3xl font-bold mb-8 text-center">Education</h1>

      <div class="education">
        <mat-card *ngFor="let edu of education" class="mb-6" @fadeInUp>
          <mat-card-header>
            <mat-card-title>{{ edu.degree }}</mat-card-title>
            <mat-card-subtitle>{{ edu.institution }} | {{ edu.period }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="mt-4">
            <p class="text-gray-600 dark:text-gray-300 mb-2">{{ edu.location }}</p>
            <p>{{ edu.description }}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-divider class="my-10"></mat-divider>

      <div class="skills">
        <h1 class="text-3xl font-bold mb-8 text-center">Skills</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <mat-card *ngFor="let category of skills" @fadeInUp>
            <mat-card-header>
              <mat-card-title>{{ category.category }}</mat-card-title>
            </mat-card-header>

            <mat-card-content>
              <div class="flex flex-wrap gap-2 mt-4">
                <span *ngFor="let skill of category.items"
                      class="px-3 py-1 bg-primary-light text-white rounded-full text-sm">
                  {{ skill }}
                </span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .timeline {
      position: relative;
    }

    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2px;
      background-color: #e0e0e0;
      transform: translateX(-50%);
    }

    .timeline-right {
      margin-left: auto;
      max-width: calc(50% - 2rem);
    }

    .timeline mat-card {
      max-width: calc(50% - 2rem);
      transition: transform 0.3s ease;
    }

    .timeline mat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .timeline::before {
        left: 1rem;
      }

      .timeline mat-card,
      .timeline-right {
        max-width: calc(100% - 3rem);
        margin-left: 3rem;
      }
    }
  `],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('500ms ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class ResumeComponent {
  experience: Experience[] = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovations Inc.',
      period: '2020 - Present',
      location: 'San Francisco, CA',
      description: 'Led the frontend development team in building modern web applications using Angular. Implemented state management solutions with RxJS and NgRx. Mentored junior developers and established best practices.',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Material UI', 'Jest']
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Solutions LLC',
      period: '2018 - 2020',
      location: 'Austin, TX',
      description: 'Developed responsive web applications using Angular. Collaborated with backend developers to integrate RESTful APIs. Implemented unit tests and end-to-end tests.',
      technologies: ['Angular', 'JavaScript', 'SCSS', 'Karma', 'Jasmine']
    },
    {
      title: 'Web Developer',
      company: 'Creative Web Agency',
      period: '2016 - 2018',
      location: 'Seattle, WA',
      description: 'Built interactive websites for clients across various industries. Focused on responsive design and cross-browser compatibility.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap']
    }
  ];

  education: Education[] = [
    {
      degree: 'Master of Computer Science',
      institution: 'University of Technology',
      period: '2014 - 2016',
      location: 'Boston, MA',
      description: 'Specialized in Human-Computer Interaction and Web Technologies. Thesis on "Optimization Techniques for Single Page Applications".'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      period: '2010 - 2014',
      location: 'Chicago, IL',
      description: 'Major in Computer Science with a minor in Graphic Design. Graduated with honors.'
    }
  ];

  skills = [
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Material UI']
    },
    {
      category: 'Tools & Methodologies',
      items: ['Git', 'Webpack', 'Nx', 'JIRA', 'Agile', 'Scrum', 'CI/CD', 'Jest', 'Cypress']
    },
    {
      category: 'Backend & Others',
      items: ['Node.js', 'Express', 'RESTful APIs', 'Firebase', 'MongoDB', 'AWS', 'Docker']
    }
  ];
}
