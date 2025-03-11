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
      title: 'Freelance Developer',
      company: 'Self-Employed',
      period: '2024 - Present',
      location: 'Phoenix, AZ',
      description: 'Aided companies in building scalable and efficient web applications. Range of projects from personal websites to a complex nonprofit platforms.',
      technologies: ['React', 'TypeScript', 'Material UI', 'Jest']
    },
    {
      title: 'The Pantheon Dev',
      company: 'Self-Employed',
      period: '2025 - Present',
      location: 'Phoenix, AZ',
      description: 'Currently developing a new UI library for React based projects, called Maia UI, and a productivity application called ChronosBoard.',
      technologies: ['React', 'TypeScript', 'SCSS', 'PostCSS', 'Tailwind CSS', 'Jest', 'Storybook', 'UI Testing', 'UI/UX Design']
    },
    {
      title: 'Content Creator',
      company: 'Self-Employed',
      period: '04/2021 - 12/2024',
      location: 'Phoenix, AZ',
      description: 'Produce content focused on mental health awareness and suicide prevention through gaming and entertainment.',
      technologies: ['DaVinci Resolve', 'TikTok', 'YouTube', 'Instagram']
    },
    {
      title: 'Sales Professional',
      company: 'Bell Honda',
      period: '10/2023 - 11/2023',
      location: 'Phoenix, AZ',
      description: 'Engaged with clients to identify needs and deliver desired vehicle.',
      technologies: ['Salesforce', 'CRM', 'Customer Service']
    },
    {
      title: 'Director of Development',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '01/2023 - 05/2023',
      location: 'Online',
      description: 'Led development initiatives to secure funding and build partnerships for the organization. While also designing and implemented strategic plans to enhance organizational growth.',
      technologies: ['Project Management', 'Fundraising', 'Partnership Building']
    },
    {
      title: 'Volunteer Director of Marketing',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '05/2022 - 01/2023',
      location: 'Online',
      description: 'Managed SEO strategies, advertising campaigns, and the social media presence of the organization. Also redesigned the organization\'s website to improve functionality and engagement.',
      technologies: ['SEO', 'Advertising', 'Social Media Management', 'Website Design']
    },
    {
      title: 'Social Media Coordinator',
      company: 'Liftable Media',
      period: '03/2022 - 8/2022',
      location: 'Phoenix, AZ',
      description: 'Planned, created, and scheduled content for Western Journal News. Helped establish a successful workflow for producing and distributing news shorts on TikTok, YouTube, and Instagram Reels.',
      technologies: ['Content Creation', 'Social Media Management', 'Video Editing']
    },
    {
      title: 'Substitute Teacher',
      company: 'DVUSD',
      period: '09/2020 - 05/2021',
      location: 'Phoenix, AZ',
      description: 'Delivered flexible teaching solutions, adapting to various educational levels and classroom needs.',
      technologies: ['Teaching', 'Classroom Management', 'Curriculum Development']
    },
    {
      title: 'Volunteer Moderator/Event Manager',
      company: 'JoshDub’s Discord Server',
      period: '11/2019 - 05/2022',
      location: 'Online',
      description: 'Assisted in managing a +90,000 member online community, while organizing events.',
      technologies: ['Community Management', 'Event Planning', 'Discord Bot Development']
    },
    {
      title: 'Combat Medic/Healthcare Specialist',
      company: 'U.S. Army',
      period: '06/2013 - 06/2018',
      location: 'Fort Bragg, NC & Vicenza, Italy',
      description: 'Delivered emergency medical treatment and primary care for soldiers in both normal, and critical situations.',
      technologies: ['EMT', 'Military Medicine', 'Combat Support']
    }
  ];

  education: Education[] = [
    {
      degree: 'Associates of Applied Science in Web Development',
      institution: 'Glendale Community College',
      period: '09/2024 - Present',
      location: 'Glendale, AZ',
      description: 'Started with basic HTML, CSS, and JavaScript Knowledge, the desire to learn how to code professionally, quickly turned into a passion more than anything else.'
    }
    ,
    {
      degree: 'Bachelor of Science in Political Science',
      institution: 'Methodist University',
      period: '09/2018 - 05/2020',
      location: 'Fayetteville, NC',
      description: 'Completed with concentrations in International Relations, Public Administration, and a minor in History. While also completing Leadership Fellows and NSLS curriculum and requirements.'
    }
  ];

  skills = [
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Material UI', 'Bootstrap', 'React', 'Vue.js', 'Next.js', 'Gatsby', 'Lit', 'Svelte', 'Preact']
    },
    {
      category: 'Tools & Methodologies',
      items: ['Git', 'Webpack', 'Nx', 'JIRA', 'Agile', 'Scrum', 'CI/CD', 'Jest', 'Cypress', 'Storybook', 'ESLint', 'Prettier', 'Postman']
    },
    {
      category: 'Backend & Others',
      items: ['Node.js', 'Express', 'RESTful APIs', 'Firebase', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Apollo']
    },
    {
      category: 'AI & Machine Learning',
      items: ['Python', 'TensorFlow', 'OpenAI API', 'Natural Language Processing (NLP)']
    },
    {
      category: 'Algorithms & Data Structures',
      items: ['Big O Notation', 'Sorting Algorithms', 'Graph Algorithms', 'Dynamic Programming']
    },
    {
      category: 'Game Development',
      items: ['Unreal Engine', 'C++', 'C', 'Python']
    }
  ];
}
