import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked'; // Instala con: npm i marked
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-viewer',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './project-viewer.component.html'
})
export class ProjectViewerComponent implements OnChanges {
  @Input() project: any = null;
  @Output() close = new EventEmitter<void>();
  safeUrl: SafeResourceUrl | null = null;
  readmeHtml = '';
  loadingMd = true;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  ngOnChanges() {
    if (this.project?.link) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.link);
    }
    this.fetchReadme();
  }

  fetchReadme() {
    this.loadingMd = true;
    const repoUrl = `https://raw.githubusercontent.com/BernardUriza/sparkfoxFull/master/README.md`;
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
        this.readmeHtml = '<p>No README.md disponible at '+repoUrl+'</p>';
        this.loadingMd = false;
    }
    });

  }
}
