export interface ResumeData {
  name: string;
  title: string;
  birthday: string;
  email: string;
  jobTitle: string;
}

export interface services {
  thumbnail: {
    [key: string]: {
      title: string;
      icon: string;
      text: string;
      last?: boolean;
    },
  },
}

export interface Skills {
  groups: {
    icon: string;
    title: string;
    category: string;
    items: string[];
  }[];
}

export interface Contact {
  contacts: {
    key: string;
    url: string;
    icon: string;
  }[]
}

export interface Portfolio {
  id: string;
  tags: {
    tag: string;
  }[],
  image: string;
  screenshots: {
    url: string;
    caption: string;
  }[],
  links: {
    link: string;
    icon: string;
  }[],
  title: string;
  description: string;
  date: string;
  complexity: number;
  caption: string;
  challenges: string[];
}

interface WorkExperience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  isActive?: boolean;
  last?: boolean;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  last?: boolean;
}

interface Certifications {
  title: string;
  organization: string;
  image: string;
  last?: boolean;
}

interface Resume {
  work: WorkExperience[];
  education: Education[];
  certifications: Certifications[];
}


// Data

export const resumeData: ResumeData = {

  name: "Alexander Castro",
  title: "Full Stack Developer",
  birthday: "March 1st, 1995",
  email: "castroalexander1995@outlook.com",
  jobTitle: "Freelance Developer",
}

export const home = {
  aboutMe: {
    title: "About me",
    start:
      "I am a dedicated full-stack developer with a diverse background in military service, education, " +
      "and social media marketing. My passion lies in crafting efficient and innovative web solutions " +
      "that make a meaningful impact.",
    mid:
      "As a mental health advocate and content creator, I’ve channeled my personal experiences to help " +
      "others navigate life’s challenges, building communities focused on awareness and support. " +
      "This mission has shaped my commitment to leveraging technology to empower creators and foster positivity.",
    end:
      "I aspire to advance my career as a developer by designing tools and platforms that enable content " +
      "creators to connect, inspire, and bring more joy into the lives of their audiences.",
  },
}

export const services: services = {
  thumbnail: {
    web: {
      title: "Web Development",
      icon: "icon-[material-symbols--web]",
      text:
        "Build comprehensive web solutions by combining front-end user interfaces with back-end logic " +
        "and database integration for a seamless experience."
    },
    ai: {
      title: "Custom AI",
      icon: "icon-[material-symbols--robot-2-outline]",
      text:
        "Develop tailored Python-based AI tools to automate tasks, enhance business processes, " +
        "and solve unique problems."
    },
    consulting: {
      title: "Game Development",
      icon: "icon-[material-symbols--videogame-asset-rounded]",
      text:
        "Use Knowledge of Unreal Engine and C++/C to develop games, or templates. " +
        "Like the templates I sell on my Unreal Marketplace."
    },
    teach: {
      title: "Coding Tutorials",
      icon: "icon-[material-symbols--folder-code-outline-sharp]",
      text:
        "Provide beginner-to-intermediate programming lessons in Python, JavaScript, SQL, " +
        "and web development to help others learn and grow their technical skills."
    },
    SMM: {
      title: "Content Strategy",
      icon: "icon-[material-symbols--tag]",
      text:
        "Plan and execute strategies to grow audiences, increase engagement, " +
        "and amplify brand presence across social media platforms."
    },
    SEO: {
      title: "SEO Optimization",
      icon: "icon-[material-symbols--visibility]",
      text:
        "Enhance website visibility by improving search engine rankings through keyword research, " +
        "on-page optimization, and analytics-based insights.",
      last: true,
    },
  },
}

export const skills: Skills = {
  groups: [
    {
      icon: "icon-[material-symbols--web-asset]" ,
      title: "Front-End Development",
      category: "Frontend",
      items: [
        "React",
        "Javascript",
        "TypeScript",
        "Material-UI",
        "Tailwind CSS",
        "Next.js",
        "Vue.js",
        "Angular",
        "Svelte",
        "Lit",
        "Preact",
      ],
    },
    {
      icon: "icon-[material-symbols--dns-outline]" ,
      title: "Back-End Development",
      category: "Backend",
      items: [
        "Node.JS",
        "Express",
        "Python",
        "SQLite",
        "Express",
        "C++",
        "C",
      ],
    },
    {
      icon: "icon-[material-symbols--storage]" ,
      title: "Database Engineering",
      category: "Database",
      items: [
        "Firebase",
        "MySQL",
        "MongoDB",
        "Postgres",
      ],
    },
    {
      icon: "icon-[material-symbols--gamepad-rounded]" ,
      title: "Game Development",
      category: "Game Development",
      items: [
        "C++",
        "C",
        "Python",
        "Unreal Engine",
        "Unity",
        "Godot",
        "Unreal Marketplace",
      ],
    },
    {
      icon: "icon-[material-symbols--frame-source]" ,
      title: "Source Control",
      category: "Source Control",
      items: [
        "Git",
        "GitHub",
        "GitLab",
      ],
    },
    {
      icon: "icon-[material-symbols--public]" ,
      title: "Digital Marketing",
      category: "Digital Marketing",
      items: [
        "SEO",
        "Content Strategy",
        "Advertising",
        "Community Management",
        "Social Media Management",
        "Email Marketing",
        "Content Creation",
      ],
    },
    {
      icon: "icon-[material-symbols--phone-iphone-outline]" ,
      title: "Mobile App Development",
      category: "Mobile App Development",
      items: [
        "React Native",
        "Swift",
        "iOS Development",
        "Android Development",
        "React Native",
      ],
    },
    {
      icon: "icon-[material-symbols--code-blocks-outline-rounded]" ,
      title: "Algorithms & Data Structures",
      category: "Algorithms & Data Structures",
      items: [
        "Big O Notation",
        "Sorting Algorithms",
        "Graph Algorithms",
        "Dynamic Programming",
        "Data Structures",
      ],
    },
    {
      icon: "icon-[material-symbols--memory-outline]" ,
      title: "AI & Machine Learning",
      category: "AI & Machine Learning",
      items: [
        "Python AI Development",
        "TensorFlow",
        "OpenAI API",
        "Natural Language Processing (NLP)",
        "Machine Learning",
      ],
    },
  ],
}



export const resume: Resume = {
  work: [
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      period: '2024 - Present',
      location: 'Phoenix, AZ',
      description: 'Aided companies in building scalable and efficient web applications. Range of projects from personal websites to a complex nonprofit platforms.',
      technologies: ['React', 'TypeScript', 'Material UI', 'Jest'],
      isActive: true,
    },
    {
      title: 'The Pantheon Dev',
      company: 'Self-Employed',
      period: '2025 - Present',
      location: 'Phoenix, AZ',
      description: 'Currently developing a new UI library for React based projects, called Maia UI, and a productivity application called ChronosBoard.',
      technologies: ['React', 'TypeScript', 'SCSS', 'PostCSS', 'Tailwind CSS', 'Jest', 'Storybook', 'UI Testing', 'UI/UX Design'],
      isActive: true,
    },
    {
      title: 'Content Creator',
      company: 'Self-Employed',
      period: '04/2021 - 12/2024',
      location: 'Phoenix, AZ',
      description: 'Produce content focused on mental health awareness and suicide prevention through gaming and entertainment.',
      technologies: ['DaVinci Resolve', 'TikTok', 'YouTube', 'Instagram'],
      isActive: false,
    },
    {
      title: 'Sales Professional',
      company: 'Bell Honda',
      period: '10/2023 - 11/2023',
      location: 'Phoenix, AZ',
      description: 'Engaged with clients to identify needs and deliver desired vehicle.',
      technologies: ['Salesforce', 'CRM', 'Customer Service'],
      isActive: false,
    },
    {
      title: 'Director of Development',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '01/2023 - 05/2023',
      location: 'Online',
      description: 'Led development initiatives to secure funding and build partnerships for the organization. While also designing and implemented strategic plans to enhance organizational growth.',
      technologies: ['Project Management', 'Fundraising', 'Partnership Building'],
      isActive: false,
    },
    {
      title: 'Volunteer Director of Marketing',
      company: 'Veterans Gaming & Mental Health Mission',
      period: '05/2022 - 01/2023',
      location: 'Online',
      description: 'Managed SEO strategies, advertising campaigns, and the social media presence of the organization. Also redesigned the organization\'s website to improve functionality and engagement.',
      technologies: ['SEO', 'Advertising', 'Social Media Management', 'Website Design'],
      isActive: false,
    },
    {
      title: 'Social Media Coordinator',
      company: 'Liftable Media',
      period: '03/2022 - 8/2022',
      location: 'Phoenix, AZ',
      description: 'Planned, created, and scheduled content for Western Journal News. Helped establish a successful workflow for producing and distributing news shorts on TikTok, YouTube, and Instagram Reels.',
      technologies: ['Content Creation', 'Social Media Management', 'Video Editing'],
      isActive: false,
    },
    {
      title: 'Substitute Teacher',
      company: 'DVUSD',
      period: '09/2020 - 05/2021',
      location: 'Phoenix, AZ',
      description: 'Delivered flexible teaching solutions, adapting to various educational levels and classroom needs.',
      technologies: ['Teaching', 'Classroom Management', 'Curriculum Development'],
      isActive: false,
    },
    {
      title: 'Volunteer Moderator/Event Manager',
      company: 'JoshDub’s Discord Server',
      period: '11/2019 - 05/2022',
      location: 'Online',
      description: 'Assisted in managing a +90,000 member online community, while organizing events.',
      technologies: ['Community Management', 'Event Planning', 'Discord Bot Development'],
      isActive: false,
    },
    {
      title: 'Combat Medic/Healthcare Specialist',
      company: 'U.S. Army',
      period: '06/2013 - 06/2018',
      location: 'Fort Bragg, NC & Vicenza, Italy',
      description: 'Delivered emergency medical treatment and primary care for soldiers in both normal, and critical situations.',
      technologies: ['EMT', 'Military Medicine', 'Combat Support'],
      isActive: false,
      last: true,
    }
  ],

  education: [
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
      description: 'Completed with concentrations in International Relations, Public Administration, and a minor in History. While also completing Leadership Fellows and NSLS curriculum and requirements.',
      last: true,
    }
  ],

  certifications: [

    {
      title: "Full-Stack Development",
      organization: "Mimo.org",
      image: "/assets/images/certs/FullStackCert.jpg",
    },
    {
      title: "Front-End Development",
      organization: "Mimo.org",
      image: "/assets/images/certs/FrontEndCert.jpg",
    },
    {
      title: "Back-End Development",
      organization: "Mimo.org",
      image: "/assets/images/certs/BackEndCert.jpg",
    },
    {
      title: "AI Development in Python",
      organization: "Mimo.org",
      image: "/assets/images/certs/PythonAICert.jpg",
      last: true,
    },

  ],
}

export const contact: Contact = {
  contacts: [
    {
      key: "LinkedIn",
      url: "https://www.linkedin.com/in/alexanderscastro/",
      icon: "icon-[line-md--linkedin]",
    },
    {
      key: "Github",
      url: "https://github.com/SergeantMurica",
      icon: "icon-[line-md--github-loop]",
    },
    {
      key: "LeetCode",
      url: "https://leetcode.com/u/SergeantMurica/",
      icon: "icon-[line-md--document-code]",
    },
    {
      key: "Facebook",
      url: "https://www.facebook.com/SergeantMurica",
      icon: "icon-[line-md--facebook]",
    },
    {
      key: "YouTube",
      url: "https://www.youtube.com/c/SergeantMurica",
      icon: "icon-[line-md--youtube]",
    },
    {
      key: "X",
      url: "https://twitter.com/SergeantMurica",
      icon: "icon-[line-md--twitter-x-alt]",
    },
    {
      key: "Instagram",
      url: "https://instagram.com/sergeantmurica",
      icon: "icon-[line-md--instagram]",
    },
  ],
}

export const portfolio: Portfolio[] = [
  {
    id: "ChronosBoard",
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/ChronosBoard.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/ChronosBoard.png",
        caption: "A modern React and Typescript productivity application.",
      },
      {
        url: "/assets/images/portfolio/ChronosBoard2.png",
        caption: "A modern React and Typescript productivity application.",
      },
      {
        url: "/assets/images/portfolio/ChronosBoard3.png",
        caption: "A modern React and Typescript productivity application.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica", icon: "icon-[line-md--github-loop]" },
      {link: "https://ChronosBoard.com/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "ChronosBoard",
    description: "A modern React and typescript Kanban board application that allows users to create, " +
      "organize, and prioritize tasks. While also giving a timer and notepad for each task." +
      "This project was devised after completing my respective Kanban board and timer projects." +
      "This project has quickly become my favorite project to work on, and I am constantly improving it." +
      "Recently, I have added a new feature that allows users to create Mind Maps. " +
      "This project is still in development, but I am excited to share it with you.",
    date: "02/20/2025",
    complexity: 50,
    caption: "A modern React and Typescript productivity application.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "PokemonGameSite",
    tags: [
      {tag: "React"},
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Pokemon.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/Pokemon.png",
        caption: "Interactive Pokémon-themed gaming site.",
      },
      {
        url: "/assets/images/portfolio/Pokemon2.png",
        caption: "Interactive Pokémon-themed gaming site.",
      },
      {
        url: "/assets/images/portfolio/Pokemon3.png",
        caption: "Interactive Pokémon-themed gaming site.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/pokemon-gamepage", icon: "icon-[line-md--github-loop]" },
      {link: "https://pokemon-gamepage.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Pokemon Game-site",
    description: "A React-based Pokémon-themed gaming platform that allows users to engage with " +
      "a variety of interactive features inspired by the Pokémon universe. " +
      "Designed with a focus on dynamic UI.",
    date: "12/17/2024",
    complexity: 20,
    caption: "Interactive Pokémon-themed gaming site.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "ColorSchemeGenerator",
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/ColorGen.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/ColorGen.png",
        caption: "A modern React and Typescript color scheme generator.",
      },
      {
        url: "/assets/images/portfolio/ColorGen2.png",
        caption: "A modern React and Typescript color scheme generator.",
      },
      {
        url: "/assets/images/portfolio/ColorGen3.png",
        caption: "A modern React and Typescript color scheme generator.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/ColorSchemeGenerator", icon: "icon-[line-md--github-loop]" },
      {link: "https://color-scheme-generator-pearl.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Color Scheme Generator",
    description: "A React-based color scheme generator that allows users to generate a variety of " +
      "color schemes based on their preferences. This project was inspired by the need of Color Schemes " +
      "for developers and creatives to quickly generate a variety of color schemes for their projects.",
    date: "02/05/2025",
    complexity: 25,
    caption: "A modern React and Typescript color scheme generator.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "ModernPortfolio",
    tags: [
      {tag: "React"},
    ],
    image: "/assets/images/portfolio/ModernPortfolio.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/ModernPortfolio.png",
        caption: "Stylish, responsive portfolio template.",
      },
      {
        url: "/assets/images/portfolio/ModernPortfolio2.png",
        caption: "Stylish, responsive portfolio template.",
      },
      {
        url: "/assets/images/portfolio/ModernPortfolio3.png",
        caption: "Stylish, responsive portfolio template.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/modernportfolio", icon: "icon-[line-md--github-loop]" },
      {link: "https://modernportfolio-nu.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Modern Portfolio Template",
    description: "A modern React portfolio template showcasing a professional design with responsive layouts." +
      " Ideal for developers and creatives to present their work in a visually stunning and functional way.",
    date: "01/05/2025",
    complexity: 14,
    caption: "Stylish, responsive portfolio template.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "MenuSystemTemplate",
    tags: [
      {tag: "Unreal Engine"},
    ],
    image: "/assets/images/portfolio/MenuSystemTemplate.jpg",
    screenshots: [
      {
        url: "/assets/images/portfolio/MenuSystemTemplate.jpg",
        caption: "A versatile template for creating dynamic and customizable menu systems in Unreal Engine.",
      },
      {
        url: "/assets/images/portfolio/MenuSystemTemplate2.jpg",
        caption: "A versatile template for creating dynamic and customizable menu systems in Unreal Engine.",
      },
      {
        url: "/assets/images/portfolio/MenuSystemTemplate3.jpg",
        caption: "A versatile template for creating dynamic and customizable menu systems in Unreal Engine.",
      },
    ],
    links: [
      {link: "https://www.fab.com/listings/73044038-b7ce-4292-837e-8db8cc9d9a6f", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Menu System Template",
    description: "A fully customizable menu system template built in Unreal Engine. " +
      "This project provides a ready-to-use framework for menus, including options for settings, " +
      "save/load functionality, and dynamic navigation.",
    date: "07/05/2024",
    complexity: 18,
    caption: "A versatile template for creating dynamic and customizable menu systems in Unreal Engine.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "RTSTemplate",
    tags: [
      {tag: "Unreal Engine"},
    ],
    image: "/assets/images/portfolio/RTSTemplate.jpg",
    screenshots: [
      {
        url: "/assets/images/portfolio/RTSTemplate.jpg",
        caption: "A robust Unreal Engine template for building real-time strategy games with ease.",
      },
      {
        url: "/assets/images/portfolio/RTSTemplate2.jpg",
        caption: "A robust Unreal Engine template for building real-time strategy games with ease.",
      },
      {
        url: "/assets/images/portfolio/RTSTemplate3.jpg",
        caption: "A robust Unreal Engine template for building real-time strategy games with ease.",
      },
    ],
    links: [
      {link: "https://www.fab.com/listings/cdf45c60-6a3c-41d3-89da-7c74d85a0f96", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "RTS Template",
    description: "An RTS template designed in Unreal Engine, featuring core gameplay mechanics such as unit " +
      "selection, movement, and management. Perfect for developers looking to jumpstart their " +
      "real-time strategy game projects.",
    date: "04/05/2024",
    complexity: 15,
    caption: "A robust Unreal Engine template for building real-time strategy games with ease.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "RickAndMortyList",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/RickAndMorty.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/RickAndMorty.png",
        caption: "Character explorer for Rick and Morty fans.",
      },
      {
        url: "/assets/images/portfolio/RickAndMorty2.png",
        caption: "Character explorer for Rick and Morty fans.",
      },
      {
        url: "/assets/images/portfolio/RickAndMorty3.png",
        caption: "Character explorer for Rick and Morty fans.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/rick-and-morty-list", icon: "icon-[line-md--github-loop]" },
      {link: "https://rick-and-morty-list-rosy.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Rick And Morty List",
    description: "A JavaScript application that fetches and displays information about characters " +
      "from the Rick and Morty universe.",
    date: "12/04/2024",
    complexity: 8,
    caption: "Character explorer for Rick and Morty fans.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "MeasurementConverter",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Converter.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/Converter.png",
        caption: "Easily convert units with precision.",
      },
      {
        url: "/assets/images/portfolio/Converter2.png",
        caption: "Easily convert units with precision.",
      },
      {
        url: "/assets/images/portfolio/Converter3.png",
        caption: "Easily convert units with precision.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/Measurement-Converter", icon: "icon-[line-md--github-loop]" },
      {link: "https://measurement-converter-five.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Measurement Converter",
    description: "A utility tool built in JavaScript for converting measurements across various units, including " +
      "length, weight, and temperature. Features an intuitive interface and accurate calculations",
    date: "11/21/2024",
    complexity: 9,
    caption: "Easily convert units with precision.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "DadJokeBot",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/JokeBot.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/JokeBot.png",
        caption: "A short description",
      },
      {
        url: "/assets/images/portfolio/JokeBot2.png",
        caption: "A short description",
      },
      {
        url: "/assets/images/portfolio/JokeBot3.png",
        caption: "A short description",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/dad-joke-bot", icon: "icon-[line-md--github-loop]" },
      {link: "https://dad-joke-bot-rosy.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Dad Joke Bot",
    description: "A JavaScript chatbot delivering a good amount of classic dad jokes.",
    date: "11/13/2024",
    complexity: 7,
    caption: "A short description",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "KanbanBoardProject",
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/KanBanBoard.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/KanBanBoard.png",
        caption: "A basic and responsive Kanban Board.",
      },
      {
        url: "/assets/images/portfolio/KanBanBoard2.png",
        caption: "A basic and responsive Kanban Board.",
      },
      {
        url: "/assets/images/portfolio/KanBanBoard3.png",
        caption: "A basic and responsive Kanban Board.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/Kanban-Board", icon: "icon-[line-md--github-loop]" },
      {link: "https://kanban-board-iota-nine.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Kanban Board Project",
    description: "A Kanban board application that allows users to create, " +
      "organize, and prioritize tasks. This project helped inspire me to make the Full Stack ChronosBoard project. ",
    date: "1/06/2025",
    complexity: 12,
    caption: "A basic and responsive Kanban Board.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "TimerProject",
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/Timer.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/Timer.png",
        caption: "A basic and responsive Timer.",
      },
      {
        url: "/assets/images/portfolio/Timer2.png",
        caption: "A basic and responsive Timer.",
      },
      {
        url: "/assets/images/portfolio/Timer3.png",
        caption: "A basic and responsive Timer.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/timer-project", icon: "icon-[line-md--github-loop]" },
      {link: "https://timer-project-weld.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Timer Project",
    description: "A Timer application that allows users to create tasks and time them" +
      ". This project helped inspire me to make the Full Stack ChronosBoard project. ",
    date: "1/08/2025",
    complexity: 12,
    caption: "A basic and responsive Timer.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "NoteAppProject",
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/NoteApp.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/NoteApp.png",
        caption: "Note taking application.",
      },
      {
        url: "/assets/images/portfolio/NoteApp2.png",
        caption: "Note taking application.",
      },
      {
        url: "/assets/images/portfolio/NoteApp3.png",
        caption: "Note taking application.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/Notes-App", icon: "icon-[line-md--github-loop]" },
      {link: "https://modernportfolio-nu.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Note App Project",
    description: "This project was a final step in my process of learning React and TypeScript " +
      "enough to make a Full Stack project. This is library based, and allows users to create notes. However, " +
      "it was reworked and created from scratch in ChronosBoard.",
    date: "1/08/2025",
    complexity: 5,
    caption: "Note taking application.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "CaesarsCipher",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Cipher.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/Cipher.png",
        caption: "Encrypt and decrypt messages with ease.",
      },
      {
        url: "/assets/images/portfolio/Cipher2.png",
        caption: "Encrypt and decrypt messages with ease.",
      },
      {
        url: "/assets/images/portfolio/Cipher3.png",
        caption: "Encrypt and decrypt messages with ease.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/caesars-cipher", icon: "icon-[line-md--github-loop]" },
      {link: "https://caesars-cipher-pied.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Caesar's Cipher",
    description: "A JavaScript implementation of Caesar's Cipher, a classic encryption algorithm. " +
      "The tool allows users to encode and decode messages with customizable shift values, " +
      "making cryptography simple and accessible",
    date: "11/18/2024",
    complexity: 3,
    caption: "Encrypt and decrypt messages with ease.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "PixelPaws",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/PixelPaws.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/PixelPaws.png",
        caption: "Interactive pet care simulation game.",
      },
      {
        url: "/assets/images/portfolio/PixelPaws2.png",
        caption: "Interactive pet care simulation game.",
      },
      {
        url: "/assets/images/portfolio/PixelPaws3.png",
        caption: "Interactive pet care simulation game.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/pixel-paws-practice", icon: "icon-[line-md--github-loop]" },
      {link: "https://pixel-paws-practice.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Pet Care Game",
    description: "A JavaScript game where users care for virtual pets by feeding them, or they run away.",
    date: "11/15/2024",
    complexity: 3,
    caption: "Interactive pet care simulation game.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "Trivia",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Trivia.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/Trivia.png",
        caption: "Test your knowledge with fun trivia questions.",
      },
      {
        url: "/assets/images/portfolio/Trivia2.png",
        caption: "Test your knowledge with fun trivia questions.",
      },
      {
        url: "/assets/images/portfolio/Trivia3.png",
        caption: "Test your knowledge with fun trivia questions.",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/Trivia-Game", icon: "icon-[line-md--github-loop]" },
      {link: "https://trivia-game-weld-chi.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Trivia",
    description: "A JavaScript-based trivia game that challenges players with questions across various " +
      "categories. Offers a simple design, responsive scoring, and a large question bank.",
    date: "11/28/2024",
    complexity: 3,
    caption: "Test your knowledge with fun trivia questions.",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },
  {
    id: "NumberGuess",
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/NumberGuess.png",
    screenshots: [
      {
        url: "/assets/images/portfolio/NumberGuess.png",
        caption: "Guess the number and beat the game!",
      },
      {
        url: "/assets/images/portfolio/NumberGuess2.png",
        caption: "Guess the number and beat the game!",
      },
      {
        url: "/assets/images/portfolio/NumberGuess3.png",
        caption: "Guess the number and beat the game!",
      },
    ],
    links: [
      {link: "https://github.com/SergeantMurica/number-game", icon: "icon-[line-md--github-loop]" },
      {link: "https://number-game-omega-two.vercel.app/", icon: "icon-[line-md--link]" },
      {link: "/blog", icon: "icon-[line-md--align-justify]" },
    ],
    title: "Number Guessing Game",
    description: "A classic JavaScript game where players guess a randomly generated number within a range. " +
      "Features interactive hints, and a simple gameplay loop",
    date: "11/05/2024",
    complexity: 4,
    caption: "Guess the number and beat the game!",
    challenges: [
      "Creating a responsive and user-friendly interface.",
      "Implementing real-time updates and notifications.",
      "Ensuring data security and privacy.",
      "Optimizing performance for large-scale applications.",
      "Integrating with external APIs and services.",
    ],
  },

]

export const toolTicker: Array<{ name: string, icon: string, top?: boolean }> = [
  {name: "JavaScript", icon: "icon-[simple-icons--javascript]", top: true},
  {name: "TypeScript", icon: "icon-[simple-icons--typescript]", top: true},
  {name: "Vue.js", icon: "icon-[simple-icons--vuedotjs]", top: true},
  {name: "Angular", icon: "icon-[simple-icons--angular]", top: true},
  {name: "Svelte", icon: "icon-[simple-icons--svelte]", top: true},
  {name: "Lit", icon: "icon-[simple-icons--lit]", top: true},
  {name: "Preact", icon: "icon-[simple-icons--preact]", top: true},
  {name: "Unity", icon: "icon-[simple-icons--unity]", top: true},
  {name: "C#", icon: "icon-[simple-icons--csharp]", top: true},
  {name: "Express", icon: "icon-[simple-icons--express]", top: true},
  {name: "Python", icon: "icon-[simple-icons--python]", top: true},
  {name: "HTML", icon: "icon-[simple-icons--html5]", top: true},
  {name: "CSS", icon: "icon-[simple-icons--css3]", top: true},
  {name: "C", icon: "icon-[simple-icons--c]", top: true},
  {name: "C++", icon: "icon-[simple-icons--cplusplus]", top: true},
  {name: "Unreal Engine", icon: "icon-[simple-icons--unrealengine]", top: true},
  {name: "Material-UI", icon: "icon-[simple-icons--mui]", top: true},
  {name: "React", icon: "icon-[simple-icons--react]", top: true},
  {name: "Node.JS", icon: "icon-[simple-icons--nodedotjs]", top: true},
  {name: "Next.js", icon: "icon-[simple-icons--nextdotjs]", top: true},
  {name: "Tailwind CSS", icon: "icon-[simple-icons--tailwindcss]", top: true},
  {name: "Swift", icon: "icon-[simple-icons--swift]", top: true},
  {name: "SQLite", icon: "icon-[simple-icons--sqlite]"},
  {name: "Bootstrap", icon: "icon-[simple-icons--bootstrap]"},
  {name: "DaVinci Resolve", icon: "icon-[simple-icons--davinciresolve]"},
  {name: "Firebase", icon: "icon-[simple-icons--firebase]"},
  {name: "JSS", icon: "icon-[simple-icons--jss]"},
  {name: "Buffer", icon: "icon-[simple-icons--buffer]"},
  {name: "MongoDB", icon: "icon-[simple-icons--mongodb]"},
  {name: "Git", icon: "icon-[simple-icons--git]"},
  {name: "GitLab", icon: "icon-[simple-icons--gitlab]"},
  {name: "GitHub", icon: "icon-[simple-icons--github]"},
  {name: "Postgresql", icon: "icon-[simple-icons--postgresql]"},
  {name: "Hootsuite", icon: "icon-[simple-icons--hootsuite]"},
  {name: "React Native", icon: "icon-[simple-icons--react]"},
  {name: "Vercel", icon: "icon-[simple-icons--vercel]"},
  {name: "MySQL", icon: "icon-[simple-icons--mysql]"},
  {name: "Godot", icon: "icon-[simple-icons--godotengine]"},
  {name: "TSNode", icon: "icon-[simple-icons--tsnode]" },
  {name: ".ENV", icon: "icon-[simple-icons--dotenv]" },
  {name: "NPM", icon: "icon-[simple-icons--npm]" },
  {name: "Yarn", icon: "icon-[simple-icons--yarn]" },
  {name: "Bash", icon: "icon-[simple-icons--gnubash]" },
]


