import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = signal<User[]>([]);
  currentUser = signal<string | null>(null);

  constructor(private router: Router) {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users.set(JSON.parse(savedUsers));
    }
    
    const loggedUser = localStorage.getItem('currentUser');
    if (loggedUser) {
      this.currentUser.set(loggedUser);
    }
  }

  register(email: string, password: string): boolean {
    const existingUser = this.users().find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUsers = [...this.users(), { email, password }];
    this.users.set(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users().find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.set(email);
      localStorage.setItem('currentUser', email);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
