import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export type Theme =
  | 'default'
  | 'coding'
  | 'usa'
  | 'matrix'
  | 'pirate'
  | 'cyberpunk'
  | 'minimalist'
  | 'retro'
  | 'nature'
  | 'ocean'
  | 'sunset'
  | 'serene'
  | 'autumn'
  | 'mint';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private validThemes: Theme[] = [
    'default', 'coding', 'usa', 'matrix', 'pirate', 'cyberpunk',
    'minimalist', 'retro', 'nature', 'ocean', 'sunset',
    'serene', 'autumn', 'mint'
  ];

  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.themeSubject.value);
  }

  setTheme(newTheme: Theme): void {
    try {
      localStorage.setItem('theme', newTheme);
      this.applyTheme(newTheme);
      this.themeSubject.next(newTheme);
    } catch (e) {
      console.warn('Could not save theme to localStorage');
    }
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  private getInitialTheme(): Theme {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && this.isValidTheme(savedTheme)) {
        return savedTheme;
      }
    } catch (e) {
      console.warn('Could not access localStorage for theme');
    }
    return 'default';
  }

  private isValidTheme(theme: string): theme is Theme {
    return this.validThemes.includes(theme as Theme);
  }

  private applyTheme(newTheme: Theme): void {
    try {
      document.documentElement.setAttribute('data-theme', newTheme);
      this.setTheme(newTheme);
    } catch (e) {
      console.warn('Could not apply theme to document');
    }
  }

}
