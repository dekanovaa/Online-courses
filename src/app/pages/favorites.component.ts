import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';
import { CourseService } from '../services/course.service';
import { CourseCardComponent } from '../components/course-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  template: `
    <div class="favorites-container">
      <h1>My Favorite Courses</h1>
      
      <div class="course-grid" *ngIf="favoriteCourses().length > 0">
        <app-course-card 
          *ngFor="let course of favoriteCourses()" 
          [course]="course">
        </app-course-card>
      </div>

      <div class="empty-state" *ngIf="favoriteCourses().length === 0">
        <p>You haven't added any favorites yet.</p>
        <a routerLink="/courses" class="btn-browse">Browse Courses</a>
      </div>
    </div>
  `,
  styles: [`
    .favorites-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      margin: 0 0 32px 0;
      color: #333;
    }
    .course-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }
    .empty-state p {
      color: #999;
      font-size: 1.2em;
      margin-bottom: 24px;
    }
    .btn-browse {
      display: inline-block;
      padding: 12px 24px;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
    }
    .btn-browse:hover {
      background: #2980b9;
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