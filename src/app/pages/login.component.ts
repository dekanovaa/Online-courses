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
      <div class="auth-wrapper">
        <div class="auth-card">
          <div class="tabs">
            <div class="tab active">Login</div>
            <a routerLink="/register" class="tab">Sign up</a>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <div class="input-wrapper">
                <span class="icon"><i class="fa-solid fa-at"></i></span>
                <input type="email" formControlName="email" placeholder="Email or phone number">
              </div>
              <div class="error" *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']">
                Email is required
              </div>
            </div>
            
            <div class="form-group">
              <div class="input-wrapper">
                <span class="icon"><i class="fa-solid fa-lock"></i></span>
                <input type="password" formControlName="password" placeholder="Password">
              </div>
              <div class="error" *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']">
                Password is required
              </div>
            </div>

            <div class="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>

            <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
            
            <button type="submit" [disabled]="loginForm.invalid" class="login-btn">Login</button>
          </form>
        </div>
        
        <div class="illustration">
          <div class="laptop">
            <div class="screen"></div>
            <div class="keyboard"></div>
          </div>
          <div class="plant"></div>
          <div class="coffee"></div>
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
    
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #a8d5d5 0%, #b8e6e6 50%, #7fc8c8 100%);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    .auth-container::before {
      content: '';
      position: absolute;
      top: -200px;
      left: -200px;
      width: 500px;
      height: 500px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
    
    .auth-container::after {
      content: '';
      position: absolute;
      bottom: -150px;
      right: -150px;
      width: 400px;
      height: 400px;
      background: rgba(127, 200, 200, 0.2);
      border-radius: 50%;
    }
    
    .auth-wrapper {
      display: flex;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      max-width: 900px;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    
    .auth-card {
      flex: 1;
      padding: 50px 40px;
      min-width: 400px;
    }
    
    .tabs {
      display: flex;
      gap: 30px;
      margin-bottom: 40px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .tab {
      padding: 12px 0;
      font-size: 16px;
      color: #999;
      cursor: pointer;
      text-decoration: none;
      position: relative;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .tab:hover {
      color: #666;
    }
    
    .tab.active {
      color: #2c5f5f;
      font-weight: 600;
    }
    
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #5bb5b5;
    }
    
    .form-group {
      margin-bottom: 24px;
    }
    
    .input-wrapper {
      display: flex;
      align-items: center;
      background: #f5f9f9;
      border-radius: 10px;
      padding: 4px 16px;
      border: 2px solid transparent;
      transition: border-color 0.3s;
    }
    
    .input-wrapper:focus-within {
      border-color: #5bb5b5;
      background: white;
    }
    
    .icon {
      font-size: 20px;
      margin-right: 12px;
    }
    
    input {
      flex: 1;
      padding: 14px 0;
      border: none;
      background: transparent;
      font-size: 15px;
      color: #333;
      outline: none;
    }
    
    input::placeholder {
      color: #999;
    }
    
    .error {
      color: #e74c3c;
      font-size: 0.85em;
      margin-top: 6px;
      margin-left: 16px;
    }
    
    .forgot-password {
      text-align: right;
      margin-bottom: 20px;
    }
    
    .forgot-password a {
      color: #5bb5b5;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .forgot-password a:hover {
      color: #4a9d9d;
    }
    
    .error-message {
      background: #ffe5e5;
      color: #e74c3c;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 0.9em;
    }
    
    .login-btn {
      width: 100%;
      padding: 16px;
      background: linear-gradient(135deg, #5bb5b5 0%, #4a9d9d 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      margin-top: 10px;
    }
    
    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(91, 181, 181, 0.4);
    }
    
    .login-btn:disabled {
      background: linear-gradient(135deg, #ccc 0%, #bbb 100%);
      cursor: not-allowed;
      transform: none;
    }
    
    .illustration {
      flex: 1;
      background: linear-gradient(135deg, #7fc8c8 0%, #5bb5b5 100%);
      padding: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .laptop {
      width: 280px;
      height: 180px;
      position: relative;
      z-index: 2;
    }
    
    .screen {
      width: 100%;
      height: 140px;
      background: white;
      border-radius: 8px 8px 0 0;
      border: 8px solid #2c5f5f;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .screen::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
    }
    
    .keyboard {
      width: 110%;
      height: 10px;
      background: #2c5f5f;
      border-radius: 0 0 8px 8px;
      margin-left: -5%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    
    .plant {
      position: absolute;
      right: 80px;
      bottom: 80px;
      width: 50px;
      height: 80px;
      background: white;
      border-radius: 0 0 25px 25px;
      z-index: 1;
    }
    
    .plant::before {
      content: '';
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 50px;
      background: #2d8659;
      border-radius: 50% 50% 0 0;
    }
    
    .plant::after {
      content: '';
      position: absolute;
      top: -25px;
      left: 10px;
      width: 20px;
      height: 40px;
      background: #2d8659;
      border-radius: 50% 50% 0 0;
      transform: rotate(-20deg);
    }
    
    .coffee {
      position: absolute;
      left: 70px;
      top: 100px;
      width: 40px;
      height: 50px;
      background: #e74c3c;
      border-radius: 0 0 20px 20px;
      z-index: 1;
    }
    
    .coffee::before {
      content: '';
      position: absolute;
      top: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 35px;
      height: 10px;
      background: #c0392b;
      border-radius: 5px 5px 0 0;
    }
    
    @media (max-width: 768px) {
      .auth-wrapper {
        flex-direction: column;
      }
      
      .illustration {
        display: none;
      }
      
      .auth-card {
        min-width: 100%;
      }
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