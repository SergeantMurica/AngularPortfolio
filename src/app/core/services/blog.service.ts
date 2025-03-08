import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
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
    return this.http.get<BlogPost[]>('assets/data/blog-posts.json').pipe(
      catchError(error => {
        console.error('Error fetching blog posts', error);
        return of([]);
      })
    );
  }

  getBlogPost(id: string): Observable<BlogPost | undefined> {
    return this.getBlogPosts().pipe(
      map(posts => posts.find(post => post.id === id))
    );
  }
}
