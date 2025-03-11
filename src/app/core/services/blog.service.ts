import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import blogData from "../../../utils/blogData";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) {
  }

  getBlogPosts(): Observable<BlogPost[]> {
    const blogs = blogData.blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content.join(' '),
      author: blog.author,
      image: blog.image,
      date: blog.date,
      tags: blog.tags.map(tag => tag.tag)
    }));
    return of(blogs);
  }

  getBlogPost(id: string): Observable<BlogPost | undefined> {
    return this.getBlogPosts().pipe(
      map(posts => posts.find(post => post.id === id))
    );
  }
}
