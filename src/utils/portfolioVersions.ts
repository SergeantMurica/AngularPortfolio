export interface Version {
    id: string;
    name: string;
    date: string;
    description: string;
    tech: string[];
    url: string;
}

export default [
    {
        id: "homepage",
        name: "The Portfolio Hub",
        date: "2025",
        description: "Modern React implementation with hooks and context",
        tech: ["React", "TypeScript", "Tailwind CSS"],
        url: "https://alexander-portfolio-hub.vercel.app/"
    },
    {
        id: "vue-portfolio",
        name: "Vue Portfolio",
        date: "2025",
        description: "Modern Vue implementation with hooks and context",
        tech: ["Vue", "TypeScript", "Tailwind CSS"],
        url: "https://alexander-vue-portfolio.vercel.app/"
    },
]

