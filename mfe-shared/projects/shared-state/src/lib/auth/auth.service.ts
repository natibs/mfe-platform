import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user.model';

const STORAGE_KEY = 'mfe.auth.user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSignal = signal<User | null>(this.readStoredUser());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  login(user: User): void {
    this.currentUserSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private readStoredUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }
}
