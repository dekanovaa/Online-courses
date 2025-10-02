import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../models/course.model';
import { FavoritesService } from '../services/favorites.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="course-card">
      <h3>{{ course.title }}</h3>
      <p class="author">by {{ course.author }}</p>
      <p class="description">{{ course.description }}</p>
      <div class="meta">
        <span class="price">\${{ course.price }}</span>
        <span class="rating">⭐ {{ course.rating }}</span>
      </div>
      <div class="actions">
        <a [routerLink]="['/courses', course.id]" class="btn-primary">View Details</a>
        <button 
          *ngIf="authService.isAuthenticated()"
          (click)="toggleFavorite()"
          class="btn-favorite"
          [class.active]="favoritesService.isFavorite(course.id)">
          {{ favoritesService.isFavorite(course.id) ? '⭐ Favorited' : '☆ Add to Favorites' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .course-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .course-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    h3 {
      margin: 0 0 8px 0;
      color: #333;
    }
    .author {
      color: #666;
      font-size: 0.9em;
      margin: 0 0 12px 0;
    }
    .description {
      color: #444;
      margin: 0 0 16px 0;
      line-height: 1.5;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      font-weight: 600;
    }
    .price {
      color: #2ecc71;
      font-size: 1.2em;
    }
    .rating {
      color: #f39c12;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .btn-primary, .btn-favorite {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9em;
      text-decoration: none;
      text-align: center;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #3498db;
      color: white;
      flex: 1;
    }
    .btn-primary:hover {
      background: #2980b9;
    }
    .btn-favorite {
      background: #ecf0f1;
      color: #333;
      flex: 1;
    }
    .btn-favorite:hover {
      background: #bdc3c7;
    }
    .btn-favorite.active {
      background: #f39c12;
      color: white;
    }
  `]
})
export class CourseCardComponent {
  @Input({ required: true }) course!: Course;
  
  favoritesService = inject(FavoritesService);
  authService = inject(AuthService);

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.course.id);
  }
}