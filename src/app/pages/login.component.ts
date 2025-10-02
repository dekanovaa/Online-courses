import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" placeholder="Enter your email">
            <div class="error" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']">
              Email is required
            </div>
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" formControlName="password" placeholder="Enter your password">
            <div class="error" *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']">
              Password is required
            </div>
          </div>

          <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
          
          <button type="submit" [disabled]="loginForm.invalid">Login</button>
          
          <p class="switch-auth">
            Don't have an account? <a routerLink="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    .auth-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }
    h2 {
      margin: 0 0 24px 0;
      text-align: center;
      color: #333;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      color: #555;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1em;
      box-sizing: border-box;
    }
    input:focus {
      outline: none;
      border-color: #667eea;
    }
    .error {
      color: #e74c3c;
      font-size: 0.85em;
      margin-top: 4px;
    }
    button {
      width: 100%;
      padding: 14px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1em;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover:not(:disabled) {
      background: #5568d3;
    }
    button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    .switch-auth {
      text-align: center;
      margin-top: 16px;
      color: #666;
    }
    .switch-auth a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const success = this.authService.login(email!, password!);
      
      if (success) {
        this.router.navigate(['/courses']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    }
  }
}
