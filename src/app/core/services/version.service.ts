import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Version {
  id: string;
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  // You'll need to import your actual portfolio versions
  private portfolioVersions: Version[] = [
    {id: '1', name: 'Version 1', url: 'https://v1.example.com'},
    {id: '2', name: 'Version 2', url: 'https://v2.example.com'},
    // Add more versions as needed
  ];

  private versionState = new BehaviorSubject<{
    versions: Version[];
    currentVersion: Version;
    loading: boolean;
  }>({
    versions: this.portfolioVersions,
    currentVersion: this.portfolioVersions[0],
    loading: false
  });

  public versionState$: Observable<{
    versions: Version[];
    currentVersion: Version;
    loading: boolean;
  }> = this.versionState.asObservable();

  constructor() {
  }

  setCurrentVersion(version: Version): void {
    // Set loading state
    this.versionState.next({
      ...this.versionState.value,
      loading: true
    });

    // Simulate loading (replace with actual loading logic)
    setTimeout(() => {
      this.versionState.next({
        ...this.versionState.value,
        currentVersion: version,
        loading: false
      });

      // Open the URL in a new tab and close current window
      this.openAndClose(version.url);
    }, 500);
  }

  private openAndClose(url: string): void {
    window.opener = null;
    window.open(url, "_blank");
    window.close();
  }
}
