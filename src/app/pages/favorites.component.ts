import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { CourseService } from '../services/course.service';
import { CourseCardComponent } from '../components/course-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, RouterModule],
  template: `
    <div class="favorites-page">
      <div class="header-section">
        <div class="container">
          <div class="header-content">
            <div class="icon-wrapper">
              <span class="heart-icon"><i class="fa-regular fa-thumbs-up"></i></span>
            </div>
            <div class="header-text">
              <h1>My Favorite Courses</h1>
              <p class="subtitle">Your curated collection of learning</p>
            </div>
          </div>
          <div class="favorites-count" *ngIf="favoriteCourses().length > 0">
            <span class="count-number">{{ favoriteCourses().length }}</span>
            <span class="count-label">{{ favoriteCourses().length === 1 ? 'Course' : 'Courses' }}</span>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="container">
          <div class="course-grid" *ngIf="favoriteCourses().length > 0">
            <app-course-card 
              *ngFor="let course of favoriteCourses()" 
              [course]="course">
            </app-course-card>
          </div>

          <div class="empty-state" *ngIf="favoriteCourses().length === 0">
            <div class="empty-icon"><i class="fa-regular fa-thumbs-up"></i></div>
            <h2>No favorites yet</h2>
            <p>Start building your collection by adding courses you love!</p>
            <a routerLink="/courses" class="btn-browse">
              <span class="btn-icon">🔍</span>
              Discover Courses
            </a>
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

    .favorites-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #e8f4f4 0%, #f5fafa 100%);
    }

    .header-section {
      background: linear-gradient(135deg, #7fc8c8 0%, #5bb5b5 100%);
      padding: 50px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .header-section::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -120px;
      width: 350px;
      height: 350px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
    }

    .header-section::after {
      content: '';
      position: absolute;
      bottom: -90px;
      left: -90px;
      width: 280px;
      height: 280px;
      background: rgba(255, 255, 255, 0.06);
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
      align-items: center;
      gap: 24px;
      margin-bottom: 20px;
    }

    .icon-wrapper {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transform: rotate(-5deg);
      transition: transform 0.3s;
    }

    .icon-wrapper:hover {
      transform: rotate(0deg) scale(1.05);
    }

    .heart-icon {
      font-size: 2.5em;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    .header-text h1 {
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

    .favorites-count {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.95);
      padding: 16px 28px;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .count-number {
      font-size: 2em;
      font-weight: 700;
      color: #2c5f5f;
      line-height: 1;
    }

    .count-label {
      color: #666;
      font-weight: 500;
      font-size: 0.95em;
    }

    .main-content {
      padding: 40px 0;
    }

    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      max-width: 600px;
      margin: 0 auto;
    }

    .empty-icon {
      font-size: 5em;
      margin-bottom: 24px;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .empty-state h2 {
      color: #2c5f5f;
      font-size: 2em;
      margin-bottom: 16px;
      font-weight: 700;
    }

    .empty-state p {
      color: #666;
      font-size: 1.15em;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .btn-browse {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: linear-gradient(135deg, #5bb5b5 0%, #4a9d9d 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.05em;
      box-shadow: 0 4px 15px rgba(91, 181, 181, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-browse:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 25px rgba(91, 181, 181, 0.4);
    }

    .btn-icon {
      font-size: 1.3em;
    }

    @media (max-width: 768px) {
      .header-text h1 {
        font-size: 1.8em;
      }

      .subtitle {
        font-size: 1em;
      }

      .header-content {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
      }

      .icon-wrapper {
        width: 70px;
        height: 70px;
      }

      .heart-icon {
        font-size: 2em;
      }

      .favorites-count {
        width: 100%;
        justify-content: center;
      }

      .course-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      .empty-state {
        padding: 60px 20px;
      }

      .empty-icon {
        font-size: 4em;
      }

      .empty-state h2 {
        font-size: 1.5em;
      }
    }
  `]
})
export class FavoritesComponent {
  private favoritesService = inject(FavoritesService);
  private courseService = inject(CourseService);

  favoriteCourses = computed(() => {
    const favoriteIds = this.favoritesService.favorites();
    return favoriteIds
      .map(id => this.courseService.getCourseById(id))
      .filter(course => course !== undefined);
  });
}