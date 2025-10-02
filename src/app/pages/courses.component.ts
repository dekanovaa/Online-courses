import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { CourseCardComponent } from '../components/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCardComponent],
  template: `
    <div class="courses-container">
      <div class="header">
        <h1>Available Courses</h1>
        <div class="user-info" *ngIf="authService.isAuthenticated()">
          <span>{{ authService.currentUser() }}</span>
          <button (click)="authService.logout()" class="btn-logout">Logout</button>
        </div>
      </div>

      <div class="filters">
        <input 
          type="text" 
          placeholder="Search courses..." 
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()">
        
        <select [(ngModel)]="sortBy" (ngModelChange)="onSortChange()">
          <option [ngValue]="null">Sort by...</option>
          <option value="price">Price (Low to High)</option>
          <option value="rating">Rating (High to Low)</option>
        </select>
      </div>

      <div class="course-grid">
        <app-course-card 
          *ngFor="let course of courseService.filteredCourses()" 
          [course]="course">
        </app-course-card>
      </div>

      <div class="no-results" *ngIf="courseService.filteredCourses().length === 0">
        No courses found matching your criteria.
      </div>
    </div>
  `,
  styles: [`
    .courses-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    h1 {
      margin: 0;
      color: #333;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn-logout {
      padding: 8px 16px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-logout:hover {
      background: #c0392b;
    }
    .filters {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    input, select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1em;
    }
    input {
      flex: 1;
      min-width: 200px;
    }
    select {
      min-width: 180px;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .no-results {
      text-align: center;
      padding: 40px;
      color: #999;
      font-size: 1.1em;
    }
  `]
})
export class CoursesComponent {
  courseService = inject(CourseService);
  authService = inject(AuthService);

  searchTerm = '';
  sortBy: 'price' | 'rating' | null = null;

  onSearchChange(): void {
    this.courseService.setSearchTerm(this.searchTerm);
  }

  onSortChange(): void {
    this.courseService.setSortBy(this.sortBy);
  }
}
