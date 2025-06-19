import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectModel } from '../models/project.model';

@Component({
  selector: 'app-project-viewer',
  templateUrl: './project-viewer.component.html'
})
export class ProjectViewerComponent implements OnChanges {
  @Input() project: ProjectModel | null = null;
  @Output() close = new EventEmitter<void>();
  safeUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.project?.link) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.link);
    }
  }
}
