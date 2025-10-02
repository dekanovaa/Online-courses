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
    <div class="detail-container" *ngIf="course()">
      <button routerLink="/courses" class="btn-back">← Back to Courses</button>
      
      <div class="course-detail">
        <h1>{{ course()!.title }}</h1>
        <p class="author">by {{ course()!.author }}</p>
        
        <div class="meta">
          <span class="price">\${{ course()!.price }}</span>
          <span class="rating">⭐ {{ course()!.rating }} / 5.0</span>
        </div>

        <div class="description">
          <h3>Description</h3>
          <p>{{ course()!.fullDescription || course()!.description }}</p>
        </div>

        <button 
          *ngIf="authService.isAuthenticated()"
          (click)="toggleFavorite()"
          class="btn-favorite"
          [class.active]="favoritesService.isFavorite(course()!.id)">
          {{ favoritesService.isFavorite(course()!.id) ? '⭐ Remove from Favorites' : '☆ Add to Favorites' }}
        </button>
      </div>
    </div>

    <div class="not-found" *ngIf="!course()">
      <h2>Course not found</h2>
      <button routerLink="/courses" class="btn-back">Back to Courses</button>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .btn-back {
      padding: 10px 20px;
      background: #ecf0f1;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 24px;
      font-size: 1em;
    }
    .btn-back:hover {
      background: #bdc3c7;
    }
    .course-detail {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      margin: 0 0 8px 0;
      color: #333;
    }
    .author {
      color: #666;
      font-size: 1.1em;
      margin: 0 0 24px 0;
    }
    .meta {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #ecf0f1;
    }
    .price {
      color: #2ecc71;
      font-size: 1.5em;
      font-weight: 700;
    }
    .rating {
      color: #f39c12;
      font-size: 1.2em;
      font-weight: 600;
    }
    .description h3 {
      color: #555;
      margin: 0 0 16px 0;
    }
    .description p {
      color: #666;
      line-height: 1.6;
      font-size: 1.05em;
    }
    .btn-favorite {
      padding: 14px 24px;
      background: #ecf0f1;
      color: #333;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1em;
      font-weight: 600;
      margin-top: 24px;
      transition: all 0.2s;
    }
    .btn-favorite:hover {
      background: #bdc3c7;
    }
    .btn-favorite.active {
      background: #f39c12;
      color: white;
    }
    .not-found {
      text-align: center;
      padding: 60px 20px;
    }
    .not-found h2 {
      color: #999;
      margin-bottom: 24px;
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