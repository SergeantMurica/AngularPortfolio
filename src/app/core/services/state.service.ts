import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface AppState {
  isLoading: boolean;
  user: {
    name: string;
    title: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: AppState = {
    isLoading: false,
    user: {
      name: 'Alexander Castro',
      title: 'Full Stack Engineer',
      email: 'Castroalexander1995@outlook.com'
    }
  };

  private state = new BehaviorSubject<AppState>(this.initialState);

  getState(): Observable<AppState> {
    return this.state.asObservable();
  }

  setState(newState: Partial<AppState>) {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }

  setLoading(isLoading: boolean) {
    this.setState({isLoading});
  }
}
