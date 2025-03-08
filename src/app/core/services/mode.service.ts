import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export type Mode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ModeService {
  private modeSubject = new BehaviorSubject<Mode>(this.getInitialMode());
  public mode$: Observable<Mode> = this.modeSubject.asObservable();

  constructor() {
    this.applyMode(this.modeSubject.value);
  }

  toggleMode(): void {
    try {
      const currentMode = this.modeSubject.value;
      const newMode: Mode = currentMode === 'light' ? 'dark' : 'light';

      localStorage.setItem('mode', newMode);
      this.applyMode(newMode);
      this.modeSubject.next(newMode);
    } catch (e) {
      console.warn('Could not toggle mode');
    }
  }

  setMode(newMode: Mode): void {
    try {
      localStorage.setItem('mode', newMode);
      this.applyMode(newMode);
      this.modeSubject.next(newMode);
    } catch (e) {
      console.warn('Could not save mode to localStorage');
    }
  }

  getCurrentMode(): Mode {
    return this.modeSubject.value;
  }

  private getInitialMode(): Mode {
    try {
      const storedMode = localStorage.getItem('mode') as Mode;
      if (storedMode === 'light' || storedMode === 'dark') {
        return storedMode;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      console.warn('Could not access localStorage for mode');
    }
    return 'light';
  }

  private applyMode(mode: Mode): void {
    try {
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('Could not apply mode to document');
    }
  }
}
