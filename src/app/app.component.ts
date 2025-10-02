import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo">CourseHub</div>
        <div class="nav-links">
          <a routerLink="/courses" routerLinkActive="active">Courses</a>
          <a *ngIf="authService.isAuthenticated()" 
             routerLink="/favorites" 
             routerLinkActive="active">Favorites</a>
          <a *ngIf="!authService.isAuthenticated()" 
             routerLink="/login" 
             routerLinkActive="active">Login</a>
          <a *ngIf="!authService.isAuthenticated()" 
             routerLink="/register" 
             routerLinkActive="active">Register</a>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background: #2c3e50;
      color: white;
      padding: 0 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }
    .logo {
      font-size: 1.5em;
      font-weight: 700;
    }
    .nav-links {
      display: flex;
      gap: 24px;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .nav-links a:hover {
      background: rgba(255,255,255,0.1);
    }
    .nav-links a.active {
      background: rgba(255,255,255,0.2);
    }
  `]
})
export class AppComponent {
  authService = inject(AuthService);
}