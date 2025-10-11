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
        <div class="logo-section">
          <div class="logo-icon">
          <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <span class="logo-text">CourseHub</span>
        </div>
        <div class="nav-links">
          <a routerLink="/courses" routerLinkActive="active" class="nav-link">
            <span class="link-icon"><i class="fa-solid fa-person-chalkboard"></i></span>
            <span class="link-text">Courses</span>
          </a>
          <a
            *ngIf="authService.isAuthenticated()"
            routerLink="/favorites"
            routerLinkActive="active"
            class="nav-link"
          >
            <span class="link-icon">
            <i class="fa-regular fa-thumbs-up"></i>
            </span>
            <span class="link-text">Favorites</span>
          </a>
          <a
            *ngIf="!authService.isAuthenticated()"
            routerLink="/login"
            routerLinkActive="active"
            class="nav-link login-link"
          >
            <span class="link-icon">
            <i class="fa-solid fa-right-to-bracket"></i>
            </span>
            <span class="link-text">Login</span>
          </a>
          <a
            *ngIf="!authService.isAuthenticated()"
            routerLink="/register"
            routerLinkActive="active"
            class="nav-link register-link"
          >
            <span class="link-icon"><i class="fa-solid fa-user-plus"></i></span>
            <span class="link-text">Register</span>
          </a>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .navbar {
        background: linear-gradient(135deg, #5bb5b5 0%, #4a9d9d 100%);
        color: white;
        padding: 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 0;
        z-index: 1000;
        backdrop-filter: blur(10px);
      }

      .nav-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
        padding: 0 30px;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .logo-section:hover {
        transform: scale(1.05);
      }

      .logo-icon {
        font-size: 2em;
        animation: bounce 2s ease-in-out infinite;
      }

      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }

      .logo-text {
        font-size: 1.6em;
        font-weight: 700;
        background: linear-gradient(135deg, #ffffff 0%, #e0f7f7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .nav-links {
        display: flex;
        gap: 12px;
        align-items: center;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        text-decoration: none;
        padding: 10px 18px;
        border-radius: 50px;
        transition: all 0.3s;
        font-weight: 500;
        font-size: 0.95em;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid transparent;
      }

      .nav-link:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .nav-link.active {
        background: white;
        color: #2c5f5f;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
      }

      .link-icon {
        font-size: 1.2em;
      }

      .login-link {
        background: rgba(255, 255, 255, 0.15);
      }

      .login-link:hover {
        background: rgba(255, 255, 255, 0.25);
      }

      .login-link.active {
        background: rgba(255, 255, 255, 0.95);
        color: #2c5f5f;
      }

      .register-link {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.2) 0%,
          rgba(255, 255, 255, 0.15) 100%
        );
        border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .register-link:hover {
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0.25) 100%
        );
        border-color: rgba(255, 255, 255, 0.5);
      }

      .register-link.active {
        background: white;
        color: #2c5f5f;
        border-color: white;
      }

      @media (max-width: 768px) {
        .nav-content {
          height: auto;
          flex-direction: column;
          padding: 15px 20px;
          gap: 15px;
        }

        .logo-section {
          width: 100%;
          justify-content: center;
        }

        .logo-text {
          font-size: 1.4em;
        }

        .nav-links {
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .nav-link {
          padding: 8px 14px;
          font-size: 0.9em;
        }

        .link-text {
          display: none;
        }

        .link-icon {
          font-size: 1.5em;
        }
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        .nav-content {
          padding: 0 20px;
        }

        .logo-text {
          font-size: 1.4em;
        }

        .nav-links {
          gap: 8px;
        }

        .nav-link {
          padding: 8px 14px;
          font-size: 0.9em;
        }
      }
    `,
  ],
})
export class AppComponent {
  authService = inject(AuthService);
}
