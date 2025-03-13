export default {
    name: "Alexander Castro",
    title: "Full Stack Developer",
    birthday: "March 1st, 1995",
    email: "castroalexander1995@outlook.com",
    jobTitle: "Freelance Developer",
}


export interface Home {
    aboutMe: {
        title: string;
        start: string;
        mid: string;
        end: string;
    };
    services: {
        title: string;
        thumbnail: {
            web: {
                title: string;
                icon: string;
                text: string;
            };
            ai: {
                title: string;
                icon: string;
                text: string;
            };
            consulting: {
                title: string;
                icon: string;
                text: string;
            };
            teach: {
                title: string;
                icon: string;
                text: string;
            };
            SMM: {
                title: string;
                icon: string;
                text: string;
            };
            SEO: {
                title: string;
                icon: string;
                text: string;
            };
        };
    };
    skills: {
        title: string;
        groups: {
            icon: string;
            title: string;
            description: string[];
        }[];
    };
}

export const home: Home = {
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
            "I aspire to advance my career as a developer by designing tools and platforms that enable content creators to connect, inspire, and bring more joy into the lives of their audiences.",
    },
    services: {
        title: "My Services",
        thumbnail: {
            web: {
                title: "Web Development",
                icon: "PhBrowsers",
                text:
                    "Build comprehensive web solutions by combining front-end user interfaces with back-end logic " +
                    "and database integration for a seamless experience."
            },
            ai: {
                title: "Custom AI",
                icon: "PhRobot",
                text:
                    "Develop tailored Python-based AI tools to automate tasks, enhance business processes, " +
                    "and solve unique problems."
            },
            consulting: {
                title: "Game Development",
                icon: "PhGameController",
                text:
                    "Use Knowledge of Unreal Engine and C++/C to develop games, or templates. " +
                    "Like the templates I sell on my Unreal Marketplace."
            },
            teach: {
                title: "Coding Tutorials",
                icon: "PhCode",
                text:
                    "Provide beginner-to-intermediate programming lessons in Python, JavaScript, SQL, " +
                    "and web development to help others learn and grow their technical skills."
            },
            SMM: {
                title: "Content Strategy",
                icon: "PhTag",
                text:
                    "Plan and execute strategies to grow audiences, increase engagement, " +
                    "and amplify brand presence across social media platforms."
            },
            SEO: {
                title: "SEO Optimization",
                icon: "PhGlobe",
                text:
                    "Enhance website visibility by improving search engine rankings through keyword research, " +
                    "on-page optimization, and analytics-based insights.",
            },
        },
    },

    skills: {
        title: "My Skills",
        groups: [
            {
                icon: "frontend.svg",
                title: "Front-End Development",
                description: [
                    "React",
                    "Javascript",
                    "TypeScript",
                    "Material-UI",
                ],
            },
            {
                icon: "backend.svg",
                title: "Back-End Development",
                description: [
                    "Node.JS",
                    "Express",
                    "Python",
                ],
            },
            {
                icon: "database.svg",
                title: "Database Engineering",
                description: [
                    "Firebase",
                    "MySQL",
                    "MongoDB",
                    "Postgres",
                ],
            },
            {
                icon: "game.svg",
                title: "Game Development",
                description: [
                    "C++",
                    "C",
                    "Python",
                    "Unreal Engine"
                ],
            },
            {
                icon: "github.svg",
                title: "Source Control",
                description: [
                    "Git",
                    "GitHub",
                    "GitLab"
                ],
            },
            {
                icon: "globe.svg",
                title: "Digital Marketing",
                description: [
                    "SEO",
                    "Content Strategy",
                    "Advertising",
                    "Community Management",
                ],
            },
            {
                icon: "smartphone.svg",
                title: "Mobile App Development",
                description: [
                    "React Native",
                    "Swift",
                    "iOS Development",
                ],
            },
            {
                icon: "code.svg",
                title: "Algorithms & Data Structures",
                description: [
                    "Big O Notation",
                    "Sorting Algorithms",
                    "Graph Algorithms",
                    "Dynamic Programming",
                ],
            },
            {
                icon: "memory.svg",
                title: "AI & Machine Learning",
                description: [
                    "Python AI Development",
                    "TensorFlow",
                    "OpenAI API",
                    "Natural Language Processing (NLP)",
                ],
            },
        ],
    },
}

export interface Resume {
    worktitle: string;
    edutitle: string;
    certtitle: string;
    work: {
        title: string;
        company: string;
        date: string;
        description: string;
    }[];
    education: {
        major: string;
        minor: string;
        school: string;
        date: string;
    }[];
    certs: {
        title: string;
        company: string;
        image: string;
        date: string;
    }[];
}

export const resume: Resume = {
    worktitle: "Working History",
    edutitle: "Education History",
    certtitle: "My Certifications",

    work: [
        {
            title: "Freelancer",
            company: "Self-Employed",
            date: "08/2022 - Current",
            description: "",
        },
        {
            title: "Content Creator",
            company: "Self-Employed",
            date: "04/2021 - 12/2024",
            description: "Produce content focused on mental health awareness and suicide prevention through gaming and entertainment.",
        },
        {
            title: "Sales Professional",
            company: "Bell Honda",
            date: "10/2023 - 11/2023",
            description: "Engaged with clients to identify needs and deliver desired vehicle.",
        },
        {
            title: "Director of Development",
            company: "Veterans Gaming & Mental Health Mission",
            date: "01/2023 - 05/2023",
            description: "Led development initiatives to secure funding and build partnerships for the organization. While also designing and implemented strategic plans to enhance organizational growth.",
        },
        {
            title: "Volunteer Director of Marketing",
            company: "Veterans Gaming & Mental Health Mission",
            date: "05/2022 - 01/2023",
            description: "Managed SEO strategies, advertising campaigns, and the social media presence of the organization. Also redesigned the organization's website to improve functionality and engagement.",
        },
        {
            title: "Social Media Coordinator",
            company: "Liftable Media",
            date: "03/2022 - 8/2022",
            description: "Planned, created, and scheduled content for Western Journal News. Helped establish a successful workflow for producing and distributing news shorts on TikTok, YouTube, and Instagram Reels.",
        },
        {
            title: "Substitute Teacher",
            company: "DVUSD",
            date: "09/2020 - 05/2021",
            description: "Delivered flexible teaching solutions, adapting to various educational levels and classroom needs.",
        },
        {
            title: "Volunteer Moderator/Event Manager",
            company: "JoshDub’s Discord Server",
            date: "11/2019 - 05/2022",
            description: "Assisted in managing a +90,000 member online community, while organizing events.",
        },
        {
            title: "Combat Medic/Healthcare Specialist",
            company: "U.S. Army",
            date: "06/2013 - 06/2018",
            description: "Delivered emergency medical treatment and primary care for soldiers in both normal, and critical situations.",
        },
    ],

    education: [
        {
            major: "Bachelor of Science in Political Science",
            minor:
                "Completed with concentrations in International Relations, Public Administration, and a minor in History. " +
                "While also completing Leadership Fellows and NSLS curriculum and requirements",
            school: "Methodist University",
            date: "09/2018 - 05/2020",
        },
        {
            major: "Associates of Applied Science in Web Development",
            minor:
                "Started with basic HTML, CSS, and JavaScript Knowledge, the desire to learn how to code professionally, " +
                "quickly turned into a passion more than anything else.",
            school: "Glendale Community College",
            date: "09/2024 - Present",
        },
    ],

    certs: [

        {
            title: "Full-Stack Development",
            company: "Mimo.org",
            image: "/assets/images/certs/FullStackCert.jpg",
            date: "12/14/2024",
        },
        {
            title: "Back-End Development",
            company: "Mimo.org",
            image: "/assets/images/certs/BackEndCert.jpg",
            date: "12/14/2024",
        },
        {
            title: "Front-End Development",
            company: "Mimo.org",
            image: "/assets/images/certs/FrontEndCert.jpg",
            date: "12/10/2024",
        },
        {
            title: "AI Development in Python",
            company: "Mimo.org",
            image: "/assets/images/certs/PythonAICert.jpg",
            date: "11/27/2024",
        },

    ],
}


export interface Contact {
    key: string;
    url: string;
    icon: string;
}

export const contact: Contact[] = [
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
]

export interface Tool {
    name: string;
    icon: string;
}

export const toolTicker: Tool[] = [
    {name: "SQLite", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/sqlite.svg"},
    {name: "Express", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/express.svg"},
    {name: "Python", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/python.svg"},
    {name: "C++", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/cplusplus.svg"},
    {name: "Unreal Engine", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/unrealengine.svg"},
    {name: "Material-UI", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/material-ui.svg"},
    {name: "DaVinci Resolve", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/davinciresolve.svg"},
    {name: "React", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Firebase", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/firebase.svg"},
    {name: "Buffer", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/buffer.svg"},
    {name: "MongoDB", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mongodb.svg"},
    {name: "Git", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/git.svg"},
    {name: "Swift", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/swift.svg"},
    {name: "GitLab", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/gitlab.svg"},
    {name: "Node.JS", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/nodejs.svg"},
    {name: "GitHub", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/github.svg"},
    {name: "Postgres", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/postgresql.svg"},
    {name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/css3.svg"},
    {name: "Hootsuite", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/hootsuite.svg"},
    {name: "React Native", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg"},
    {name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/vercel.svg"},
    {name: "HTML", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/html5.svg"},
    {name: "C", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/c.svg"},
    {name: "JavaScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg"},
    {name: "TypeScript", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/typescript.svg"},
    {name: "MySQL", icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/mysql.svg"},
]


export interface PortfolioTabs {
    overTabs: string[];
    subTabs: {
        [key: string]: string[];
    };
    languages: string[];
}

export interface Portfolio {
    tags: { tag: string }[];
    image: string;
    links: { link: string, icon: string }[];
    title: string;
    description: string;
    date: string;
    complexity: number;
    caption: string;
    challenges: string;
}

export const portfolioTabs: PortfolioTabs = {
    overTabs: ["Web Development", "Game Development", "AI Development"],
    subTabs: {
        "Web Development": ["JavaScript", "TypeScript", "React", "Tailwind CSS"],
        "Game Development": ["Unreal Engine", "C", "C#", "C++"],
        "AI Development": ["Python"]
    },
    // This language array can include additional known languages even if no projects exist for them yet.
    languages: ["JavaScript", "TypeScript", "React", "Tailwind CSS", "Python", "C", "C++", "C#"]
}


export const portfolio: Portfolio[] = [
    {
        tags: [
            {tag: "React"},
            {tag: "TypeScript"},
            {tag: "Tailwind CSS"},
        ],
        image: "/assets/images/portfolio/ChronosBoard.png",
        links: [
            {link: "https://github.com/SergeantMurica", icon: "github.svg"},
            {link: "https://ChronosBoard.com/", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
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
      challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "React"},
            {tag: "JavaScript"},
        ],
        image: "/assets/images/portfolio/Pokemon.png",
        links: [
            {link: "https://github.com/SergeantMurica/pokemon-gamepage", icon: "github.svg"},
            {link: "https://pokemon-gamepage.vercel.app/", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "Pokemon Game-site",
        description: "A React-based Pokémon-themed gaming platform that allows users to engage with " +
            "a variety of interactive features inspired by the Pokémon universe. " +
            "Designed with a focus on dynamic UI.",
        date: "12/17/2024",
        complexity: 20,
        caption: "Interactive Pokémon-themed gaming site.",
        challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "React"},
            {tag: "TypeScript"},
            {tag: "Tailwind CSS"},
        ],
        image: "/assets/images/portfolio/ColorGen.png",
        links: [
            {link: "https://github.com/SergeantMurica/ColorSchemeGenerator", icon: "github.svg"},
            {link: "https://color-scheme-generator-pearl.vercel.app/", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "Color Scheme Generator",
        description: "A React-based color scheme generator that allows users to generate a variety of " +
            "color schemes based on their preferences. This project was inspired by the need of Color Schemes " +
            "for developers and creatives to quickly generate a variety of color schemes for their projects.",
        date: "02/05/2025",
        complexity: 25,
        caption: "A modern React and Typescript color scheme generator.",
      challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "React"},
        ],
        image: "/assets/images/portfolio/ModernPortfolio.png",
        links: [
            {link: "https://github.com/SergeantMurica/modernportfolio", icon: "github.svg"},
            {link: "https://modernportfolio-nu.vercel.app/", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "Modern Portfolio Template",
        description: "A modern React portfolio template showcasing a professional design with responsive layouts." +
            " Ideal for developers and creatives to present their work in a visually stunning and functional way.",
        date: "01/05/2025",
        complexity: 14,
        caption: "Stylish, responsive portfolio template.",
      challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "Unreal Engine"},
        ],
        image: "/assets/images/portfolio/MenuSystemTemplate.jpg",
        links: [
            {link: "https://www.fab.com/listings/73044038-b7ce-4292-837e-8db8cc9d9a6f", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "Menu System Template",
        description: "A fully customizable menu system template built in Unreal Engine. " +
            "This project provides a ready-to-use framework for menus, including options for settings, " +
            "save/load functionality, and dynamic navigation.",
        date: "07/05/2024",
        complexity: 18,
        caption: "A versatile template for creating dynamic and customizable menu systems in Unreal Engine.",
        challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "Unreal Engine"},
        ],
        image: "/assets/images/portfolio/RTSTemplate.jpg",
        links: [
            {link: "https://www.fab.com/listings/cdf45c60-6a3c-41d3-89da-7c74d85a0f96", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "RTS Template",
        description: "An RTS template designed in Unreal Engine, featuring core gameplay mechanics such as unit " +
            "selection, movement, and management. Perfect for developers looking to jumpstart their " +
            "real-time strategy game projects.",
        date: "04/05/2024",
        complexity: 15,
        caption: "A robust Unreal Engine template for building real-time strategy games with ease.",
        challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
    {
        tags: [
            {tag: "JavaScript"},
        ],
        image: "/assets/images/portfolio/RickAndMorty.png",
        links: [
            {link: "https://github.com/SergeantMurica/rick-and-morty-list", icon: "github.svg"},
            {link: "https://rick-and-morty-list-rosy.vercel.app/", icon: "link.svg"},
            {link: "blog#/blog", icon: "blog.svg"},
        ],
        title: "Rick And Morty List",
        description: "A JavaScript application that fetches and displays information about characters " +
            "from the Rick and Morty universe.",
        date: "12/04/2024",
        complexity: 8,
        caption: "Character explorer for Rick and Morty fans.",
        challenges: "One of the main challenges was optimizing performance for mobile devices while maintaining complex animations. I solved this by implementing lazy loading, code splitting, and using hardware-accelerated CSS properties.",
    },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Converter.png",
    links: [
      {link: "https://github.com/SergeantMurica/Measurement-Converter", icon: "github.svg"},
      {link: "https://measurement-converter-five.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Measurement Converter",
    description: "A utility tool built in JavaScript for converting measurements across various units, including " +
      "length, weight, and temperature. Features an intuitive interface and accurate calculations",
    date: "11/21/2024",
    complexity: 9,
    caption: "Easily convert units with precision.",
    challenges: ""
  },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/JokeBot.png",
    links: [
      {link: "https://github.com/SergeantMurica/dad-joke-bot", icon: "github.svg"},
      {link: "https://dad-joke-bot-rosy.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Dad Joke Bot",
    description: "A JavaScript chatbot delivering a good amount of classic dad jokes.",
    date: "11/13/2024",
    complexity: 7,
    caption: "A short description",
    challenges: "",
  },
  {
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/KanBanBoard.png",
    links: [
      {link: "https://github.com/SergeantMurica/Kanban-Board", icon: "github.svg"},
      {link: "https://kanban-board-iota-nine.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Kanban Board Project",
    description: "A Kanban board application that allows users to create, " +
      "organize, and prioritize tasks. This project helped inspire me to make the Full Stack ChronosBoard project. ",
    date: "1/06/2025",
    complexity: 12,
    caption: "A basic and responsive Kanban Board.",
    challenges: ""
  },
  {
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/Timer.png",
    links: [
      {link: "https://github.com/SergeantMurica/timer-project", icon: "github.svg"},
      {link: "https://timer-project-weld.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Timer Project",
    description: "A Timer application that allows users to create tasks and time them" +
      ". This project helped inspire me to make the Full Stack ChronosBoard project. ",
    date: "1/08/2025",
    complexity: 12,
    caption: "A basic and responsive Timer.",
    challenges: ""
  },
  {
    tags: [
      {tag: "React"},
      {tag: "TypeScript"},
      {tag: "Tailwind CSS"},
    ],
    image: "/assets/images/portfolio/NoteApp.png",
    links: [
      {link: "https://github.com/SergeantMurica/Notes-App", icon: "github.svg"},
      {link: "https://modernportfolio-nu.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Note App Project",
    description: "This project was a final step in my process of learning React and TypeScript " +
      "enough to make a Full Stack project. This is library based, and allows users to create notes. However, " +
      "it was reworked and created from scratch in ChronosBoard.",
    date: "1/08/2025",
    complexity: 5,
    caption: "Note taking application.",
    challenges: ""
  },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Cipher.png",
    links: [
      {link: "https://github.com/SergeantMurica/caesars-cipher", icon: "github.svg"},
      {link: "https://caesars-cipher-pied.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Caesar's Cipher",
    description: "A JavaScript implementation of Caesar's Cipher, a classic encryption algorithm. " +
      "The tool allows users to encode and decode messages with customizable shift values, " +
      "making cryptography simple and accessible",
    date: "11/18/2024",
    complexity: 3,
    caption: "Encrypt and decrypt messages with ease.",
    challenges: ""
  },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/PixelPaws.png",
    links: [
      {link: "https://github.com/SergeantMurica/pixel-paws-practice", icon: "github.svg"},
      {link: "https://pixel-paws-practice.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Pet Care Game",
    description: "A JavaScript game where users care for virtual pets by feeding them, or they run away.",
    date: "11/15/2024",
    complexity: 3,
    caption: "Interactive pet care simulation game.",
    challenges: ""
  },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/Trivia.png",
    links: [
      {link: "https://github.com/SergeantMurica/Trivia-Game", icon: "github.svg"},
      {link: "https://trivia-game-weld-chi.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Trivia",
    description: "A JavaScript-based trivia game that challenges players with questions across various " +
      "categories. Offers a simple design, responsive scoring, and a large question bank.",
    date: "11/28/2024",
    complexity: 3,
    caption: "Test your knowledge with fun trivia questions.",
    challenges: ""
  },
  {
    tags: [
      {tag: "JavaScript"},
    ],
    image: "/assets/images/portfolio/NumberGuess.png",
    links: [
      {link: "https://github.com/SergeantMurica/number-game", icon: "github.svg"},
      {link: "https://number-game-omega-two.vercel.app/", icon: "link.svg"},
      {link: "blog#/blog", icon: "blog.svg"},
    ],
    title: "Number Guessing Game",
    description: "A classic JavaScript game where players guess a randomly generated number within a range. " +
      "Features interactive hints, and a simple gameplay loop",
    date: "11/05/2024",
    complexity: 4,
    caption: "Guess the number and beat the game!",
    challenges: ""
  },

]
