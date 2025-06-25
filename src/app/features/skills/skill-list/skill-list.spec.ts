import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SkillList } from './skill-list';

describe('SkillList', () => {
  let component: SkillList;
  let fixture: ComponentFixture<SkillList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillList, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
