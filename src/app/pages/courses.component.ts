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
    <div class="courses-page">
      <div class="header-section">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <h1>Available Courses</h1>
              <p class="subtitle">Discover and learn new skills</p>
            </div>
            <div class="user-info" *ngIf="authService.isAuthenticated()">
              <div class="user-avatar">
                <span>{{ getUserInitials() }}</span>
              </div>
              <div class="user-details">
                <span class="user-name">{{ authService.currentUser() }}</span>
                <button (click)="authService.logout()" class="btn-logout">
                  <span class="logout-icon"><i class="fa-solid fa-right-from-bracket"></i></span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="container">
          <div class="filters-section">
            <div class="search-wrapper">
              <span class="search-icon">🔍
                
              </span>
              <input 
                type="text" 
                placeholder="Search courses..." 
                [(ngModel)]="searchTerm"
                (ngModelChange)="onSearchChange()">
            </div>
            
            <div class="sort-wrapper">
              <span class="sort-icon"><i class="fa-solid fa-sort"></i></span>
              <select [(ngModel)]="sortBy" (ngModelChange)="onSortChange()">
                <option [ngValue]="null">Sort by...</option>
                <option value="price">Price (Low to High)</option>
                <option value="rating">Rating (High to Low)</option>
              </select>
            </div>
          </div>

          <div class="course-grid">
            <app-course-card 
              *ngFor="let course of courseService.filteredCourses()" 
              [course]="course">
            </app-course-card>
          </div>

          <div class="no-results" *ngIf="courseService.filteredCourses().length === 0">
            <div class="no-results-icon">📚</div>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .courses-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #e8f4f4 0%, #f5fafa 100%);
    }

    .header-section {
      background: linear-gradient(135deg, #7fc8c8 0%, #5bb5b5 100%);
      padding: 40px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .header-section::before {
      content: '';
      position: absolute;
      top: -100px;
      right: -100px;
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .fa-sort{
      color: orange;
    }

    .header-section::after {
      content: '';
      position: absolute;
      bottom: -80px;
      left: -80px;
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .header-left h1 {
      color: white;
      font-size: 2.5em;
      margin-bottom: 8px;
      font-weight: 700;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1em;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255, 255, 255, 0.95);
      padding: 12px 20px;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.2em;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .user-name {
      color: #2c5f5f;
      font-weight: 600;
      font-size: 0.95em;
    }

    .btn-logout {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-logout:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
    }

    .logout-icon {
      font-size: 1.1em;
    }

    .main-content {
      padding: 40px 0;
    }

    .filters-section {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .search-wrapper,
    .sort-wrapper {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 4px 16px;
      border: 2px solid transparent;
      transition: border-color 0.3s, box-shadow 0.3s;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .search-wrapper {
      flex: 1;
      min-width: 250px;
    }

    .sort-wrapper {
      min-width: 220px;
    }

    .search-wrapper:focus-within,
    .sort-wrapper:focus-within {
      border-color: #5bb5b5;
      box-shadow: 0 4px 16px rgba(91, 181, 181, 0.2);
    }

    .search-icon,
    .sort-icon {
      font-size: 1.3em;
      margin-right: 12px;
    }

    input,
    select {
      flex: 1;
      padding: 14px 0;
      border: none;
      background: transparent;
      font-size: 1em;
      color: #333;
      outline: none;
    }

    input::placeholder {
      color: #999;
    }

    select {
      cursor: pointer;
      color: #555;
      font-weight: 500;
    }

    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .no-results {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .no-results-icon {
      font-size: 4em;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .no-results h3 {
      color: #2c5f5f;
      font-size: 1.8em;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .no-results p {
      color: #999;
      font-size: 1.1em;
    }

    @media (max-width: 768px) {
      .header-left h1 {
        font-size: 1.8em;
      }

      .subtitle {
        font-size: 1em;
      }

      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .user-info {
        width: 100%;
        justify-content: space-between;
      }

      .filters-section {
        flex-direction: column;
      }

      .search-wrapper,
      .sort-wrapper {
        width: 100%;
        min-width: 100%;
      }

      .course-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
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

  getUserInitials(): string {
    const email = this.authService.currentUser() || '';
    return email.charAt(0).toUpperCase();
  }
}