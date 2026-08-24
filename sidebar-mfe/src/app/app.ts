import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, NavItem } from 'shared-state';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class RemoteEntryComponent {
  protected readonly auth = inject(AuthService);

  readonly navItems = input<readonly NavItem[]>([]);
  readonly loginPath = input('login');
}
