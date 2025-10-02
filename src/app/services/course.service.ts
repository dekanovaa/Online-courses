import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses = signal<Course[]>([
    {
      id: 1,
      title: 'Angular Mastery',
      author: 'John Doe',
      price: 49.99,
      rating: 4.8,
      description: 'Master Angular from basics to advanced',
      fullDescription: 'Complete guide to Angular including components, services, routing, and state management.'
    },
    {
      id: 2,
      title: 'TypeScript Deep Dive',
      author: 'Jane Smith',
      price: 39.99,
      rating: 4.9,
      description: 'Advanced TypeScript patterns and practices',
      fullDescription: 'Learn advanced TypeScript features, generics, decorators, and type systems.'
    },
    {
      id: 3,
      title: 'RxJS Fundamentals',
      author: 'Bob Johnson',
      price: 29.99,
      rating: 4.6,
      description: 'Reactive programming with RxJS',
      fullDescription: 'Master observables, operators, and reactive patterns in modern web development.'
    },
    {
      id: 4,
      title: 'Web Performance',
      author: 'Alice Brown',
      price: 59.99,
      rating: 4.7,
      description: 'Optimize your web applications',
      fullDescription: 'Techniques for improving load times, runtime performance, and user experience.'
    }
  ]);

  private searchTerm = signal<string>('');
  private sortBy = signal<'price' | 'rating' | null>(null);

  filteredCourses = computed(() => {
    let result = this.courses();
    
    const search = this.searchTerm().toLowerCase();
    if (search) {
      result = result.filter(c => c.title.toLowerCase().includes(search));
    }
    
    const sort = this.sortBy();
    if (sort === 'price') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  });

  getCourseById(id: number): Course | undefined {
    return this.courses().find(c => c.id === id);
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setSortBy(sortBy: 'price' | 'rating' | null): void {
    this.sortBy.set(sortBy);
  }
}