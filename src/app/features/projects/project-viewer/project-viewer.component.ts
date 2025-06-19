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
    if (!this.project?.githubRepo) {
      this.readmeHtml = '<p class="text-rojo-oscuro">No README.md disponible</p>';
      this.loadingMd = false;
      return;
    }
    const repoUrl = `https://raw.githubusercontent.com/${this.project.githubRepo}/master/README.md`;
    this.http.get(repoUrl, { responseType: 'text' }).subscribe(md => {
      this.readmeHtml = marked(md);
      this.loadingMd = false;
    }, () => {
      this.readmeHtml = '<p class="text-rojo-oscuro">No README.md disponible</p>';
      this.loadingMd = false;
    });
  }
}
