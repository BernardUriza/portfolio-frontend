import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillService } from '../skill.service';
import { SkillModel } from '../models/skill.model';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-list.html',
  styleUrls: ['./skill-list.scss']
})
export class SkillList implements OnInit {
  skills: SkillModel[] = [];
  error = '';

  constructor(private service: SkillService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: data => this.skills = data,
      error: () => this.error = 'Failed to load skills'
    });
  }
}
