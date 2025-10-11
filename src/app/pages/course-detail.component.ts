import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { FavoritesService } from '../services/favorites.service';
import { AuthService } from '../services/auth.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-page" *ngIf="course()">
      <div class="header-section">
        <div class="container">
          <button routerLink="/courses" class="btn-back">
            <span class="back-icon"><i class="fa-solid fa-arrow-left"></i></span>
            Back to Courses
          </button>
        </div>
      </div>

      <div class="main-content">
        <div class="container">
          <div class="course-header">
            <div class="course-icon">📚</div>
            <div class="course-title-section">
              <h1>{{ course()!.title }}</h1>
              <p class="author">
                <span class="author-icon">👨‍🏫</span>
                by {{ course()!.author }}
              </p>
            </div>
          </div>

          <div class="course-content">
            <div class="meta-cards">
              <div class="meta-card price-card">
                <div class="meta-icon">💰</div>
                <div class="meta-info">
                  <span class="meta-label">Price</span>
                  <span class="meta-value">\${{ course()!.price }}</span>
                </div>
              </div>

              <div class="meta-card rating-card">
                <div class="meta-icon">⭐</div>
                <div class="meta-info">
                  <span class="meta-label">Rating</span>
                  <span class="meta-value">{{ course()!.rating }} / 5.0</span>
                </div>
              </div>
            </div>

            <div class="description-card">
              <div class="section-header">
                <span class="section-icon">📖</span>
                <h3>About This Course</h3>
              </div>
              <p class="description-text">{{ course()!.fullDescription || course()!.description }}</p>
            </div>

            <button 
              *ngIf="authService.isAuthenticated()"
              (click)="toggleFavorite()"
              class="btn-favorite"
              [class.active]="favoritesService.isFavorite(course()!.id)">
              <span class="favorite-icon">
                {{ favoritesService.isFavorite(course()!.id) ? '❤️' : '🤍' }}
              </span>
              {{ favoritesService.isFavorite(course()!.id) ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>

            <div class="action-hint" *ngIf="!authService.isAuthenticated()">
              <span class="hint-icon">ℹ️</span>
              Please <a routerLink="/login">login</a> to add courses to favorites
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="not-found-page" *ngIf="!course()">
      <div class="container">
        <div class="not-found-content">
          <div class="not-found-icon">😕</div>
          <h2>Course Not Found</h2>
          <p>The course you're looking for doesn't exist or has been removed.</p>
          <button routerLink="/courses" class="btn-back-home">
            <span class="back-icon">←</span>
            Back to Courses
          </button>
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

    .detail-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #e8f4f4 0%, #f5fafa 100%);
    }

    .header-section {
      background: linear-gradient(135deg, #7fc8c8 0%, #5bb5b5 100%);
      padding: 30px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .header-section::before {
      content: '';
      position: absolute;
      top: -80px;
      right: -80px;
      width: 250px;
      height: 250px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.95);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      color: #2c5f5f;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-back:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    .back-icon {
      font-size: 1.2em;
    }

    .main-content {
      padding: 40px 0;
    }

    .course-header {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 32px;
      background: white;
      padding: 32px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .course-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #7fc8c8 0%, #5bb5b5 100%);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5em;
      box-shadow: 0 4px 15px rgba(91, 181, 181, 0.3);
      flex-shrink: 0;
    }

    .course-title-section {
      flex: 1;
    }

    h1 {
      color: #2c5f5f;
      font-size: 2.2em;
      margin-bottom: 12px;
      font-weight: 700;
      line-height: 1.3;
    }

    .author {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      font-size: 1.1em;
    }

    .author-icon {
      font-size: 1.3em;
    }

    .course-content {
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }

    .meta-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .meta-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      border-radius: 16px;
      transition: transform 0.2s;
    }

    .meta-card:hover {
      transform: translateY(-4px);
    }

    .price-card {
      background: linear-gradient(135deg, #d4f4dd 0%, #c8f0d4 100%);
    }

    .rating-card {
      background: linear-gradient(135deg, #fff4d4 0%, #ffefc8 100%);
    }

    .meta-icon {
      font-size: 2.5em;
    }

    .meta-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meta-label {
      color: #666;
      font-size: 0.9em;
      font-weight: 500;
    }

    .meta-value {
      color: #2c5f5f;
      font-size: 1.5em;
      font-weight: 700;
    }

    .description-card {
      padding: 32px;
      background: linear-gradient(135deg, #f8fcfc 0%, #f0f8f8 100%);
      border-radius: 16px;
      margin-bottom: 32px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .section-icon {
      font-size: 1.8em;
    }

    .section-header h3 {
      color: #2c5f5f;
      font-size: 1.5em;
      font-weight: 700;
    }

    .description-text {
      color: #555;
      line-height: 1.8;
      font-size: 1.05em;
    }

    .btn-favorite {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: linear-gradient(135deg, #e8f4f4 0%, #d4eaea 100%);
      color: #2c5f5f;
      border: 2px solid transparent;
      border-radius: 50px;
      cursor: pointer;
      font-size: 1.05em;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }

    .btn-favorite:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      border-color: #5bb5b5;
    }

    .btn-favorite.active {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
      color: white;
    }

    .btn-favorite.active:hover {
      border-color: #ff6b6b;
    }

    .favorite-icon {
      font-size: 1.4em;
    }

    .action-hint {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 24px;
      background: linear-gradient(135deg, #fff4d4 0%, #ffefc8 100%);
      border-radius: 12px;
      margin-top: 20px;
      color: #666;
    }

    .hint-icon {
      font-size: 1.5em;
    }

    .action-hint a {
      color: #5bb5b5;
      font-weight: 600;
      text-decoration: none;
    }

    .action-hint a:hover {
      text-decoration: underline;
    }

    .not-found-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #e8f4f4 0%, #f5fafa 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .not-found-content {
      text-align: center;
      background: white;
      padding: 60px 40px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      max-width: 500px;
    }

    .not-found-icon {
      font-size: 5em;
      margin-bottom: 24px;
      animation: swing 2s ease-in-out infinite;
    }

    @keyframes swing {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-10deg); }
      75% { transform: rotate(10deg); }
    }

    .not-found-content h2 {
      color: #2c5f5f;
      font-size: 2em;
      margin-bottom: 16px;
      font-weight: 700;
    }

    .not-found-content p {
      color: #666;
      font-size: 1.1em;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .btn-back-home {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: linear-gradient(135deg, #5bb5b5 0%, #4a9d9d 100%);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 1.05em;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(91, 181, 181, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-back-home:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 25px rgba(91, 181, 181, 0.4);
    }

    @media (max-width: 768px) {
      .course-header {
        flex-direction: column;
        text-align: center;
      }

      h1 {
        font-size: 1.8em;
      }

      .author {
        justify-content: center;
      }

      .course-content {
        padding: 24px;
      }

      .meta-cards {
        grid-template-columns: 1fr;
      }

      .description-card {
        padding: 24px;
      }

      .btn-favorite {
        width: 100%;
        justify-content: center;
      }

      .not-found-content {
        padding: 40px 24px;
      }

      .not-found-icon {
        font-size: 4em;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  favoritesService = inject(FavoritesService);
  authService = inject(AuthService);

  course = signal<Course | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.course.set(this.courseService.getCourseById(id));
  }

  toggleFavorite(): void {
    const courseId = this.course()?.id;
    if (courseId) {
      this.favoritesService.toggleFavorite(courseId);
    }
  }
}