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
    {
      id: "v1",
      name: "Angular",
      url: "https://alexander-angular-portfolio.vercel.app/",
    },
    {
      id: "v2",
      name: "The Hub",
      url: "https://alexander-portfolio-hub.vercel.app/",
    },
    {
      id: "v3",
      name: "Svelte",
      url: "https://svelte-portfolio-pied.vercel.app/",
    },
    {
      id: "v4",
      name: "Preact",
      url: "https://preact-portfolio-vert.vercel.app/",
    },
    {
      id: "v5",
      name: "Lit",
      url: "https://alexanders-lit-portfolio.vercel.app/",
    },
    {
      id: "v6",
      name: "Vue",
      url: "https://alexander-vue-portfolio.vercel.app/",
    },
    {
      id: "v7",
      name: "Next.js",
      url: "https://alexanders-next-js-portfolio.vercel.app/",
    },



    {
      id: "v8",
      name: "HTML",
      url: "https://preact-portfolio-vert.vercel.app/",
    },
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
