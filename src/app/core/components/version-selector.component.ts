import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Version, VersionService} from '../services/version.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-version-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <button
        *ngFor="let version of versions"
        (click)="setCurrentVersion(version)"
        [disabled]="loading || currentVersion?.id === version.id"
        class="w-full px-3 py-2 rounded text-sm flex items-center justify-between"
        [ngClass]="{
          'bg-main text-background': currentVersion?.id === version.id,
          'bg-container text-main hover:bg-shading': currentVersion?.id !== version.id,
          'opacity-50 cursor-not-allowed': loading
        }"
      >
        <span>{{ version.name }}</span>
        <span *ngIf="currentVersion?.id === version.id"
              class="text-xs text-headingText bg-background bg-opacity-20 px-2 py-0.5 rounded">
          Active
        </span>
      </button>

      <div *ngIf="loading" class="text-center text-sm text-captionText mt-2">
        Loading version...
      </div>
    </div>
  `
})
export class VersionSelectorComponent implements OnInit, OnDestroy {
  versions: Version[] = [];
  currentVersion?: Version;
  loading: boolean = false;
  private subscription?: Subscription;

  constructor(private versionService: VersionService) {
  }

  ngOnInit(): void {
    this.subscription = this.versionService.versionState$.subscribe(state => {
      this.versions = state.versions;
      this.currentVersion = state.currentVersion;
      this.loading = state.loading;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setCurrentVersion(version: Version): void {
    this.versionService.setCurrentVersion(version);
  }
}
