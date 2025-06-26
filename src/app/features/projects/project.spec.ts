import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { Project } from './project';

describe('Project', () => {
  let service: Project;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      provideHttpClientTesting(),
    ]});
    service = TestBed.inject(Project);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
