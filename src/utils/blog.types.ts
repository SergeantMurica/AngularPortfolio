export interface Tag {
    tag: string;
}

export interface BlogType {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    image: string;
    tags: Tag[];
    content: string[];
}

export interface BlogDataType {
    blogs: BlogType[];
}
