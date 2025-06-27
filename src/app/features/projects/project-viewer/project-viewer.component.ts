import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectModel } from '../models/project.model';

@Component({
  selector: 'app-project-viewer',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './project-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectViewerComponent implements OnChanges {
  @Input() project: ProjectModel | null = null;
  @Output() close = new EventEmitter<void>();
  safeUrl: SafeResourceUrl | null = null;
  readmeHtml = '';
  loadingMd = false;
  showFullDesc = false;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnChanges(): void {
    if (!this.project) {
      return;
    }
    this.safeUrl = this.project.link
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.project.link)
      : null;
    this.fetchReadme();
  }

  private fetchReadme(): void {
    this.readmeHtml = '';
    if (!this.project?.githubRepo) {
      return;
    }
    this.loadingMd = true;
    const repoUrl = `https://raw.githubusercontent.com/${this.project.githubRepo}/master/README.md`;
    this.http.get(repoUrl, { responseType: 'text' }).subscribe({
      next: md => {
        const htmlOrPromise = marked.parse(md);
        if (typeof htmlOrPromise === 'string') {
          this.readmeHtml = htmlOrPromise;
          this.loadingMd = false;
        } else if (htmlOrPromise instanceof Promise) {
          htmlOrPromise.then(res => {
            this.readmeHtml = res;
            this.loadingMd = false;
          });
        }
      },
      error: () => {
        this.readmeHtml = `<p>No README.md disponible en ${repoUrl}</p>`;
        this.loadingMd = false;
      },
    });
  }

  toggleDescription(): void {
    this.showFullDesc = !this.showFullDesc;
  }
}
