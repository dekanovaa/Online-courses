import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoriteIds = signal<number[]>([]);

  constructor() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favoriteIds.set(JSON.parse(saved));
    }
  }

  favorites = computed(() => this.favoriteIds());

  toggleFavorite(courseId: number): void {
    const current = this.favoriteIds();
    const index = current.indexOf(courseId);
    
    let updated: number[];
    if (index > -1) {
      updated = current.filter(id => id !== courseId);
    } else {
      updated = [...current, courseId];
    }
    
    this.favoriteIds.set(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  }

  isFavorite(courseId: number): boolean {
    return this.favoriteIds().includes(courseId);
  }
}
