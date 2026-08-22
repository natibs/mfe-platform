import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, NAV_ITEMS, ROUTE_PATHS } from 'shared-state';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class RemoteEntryComponent {
  protected readonly auth = inject(AuthService);
  protected readonly navItems = NAV_ITEMS;
  protected readonly loginPath = ROUTE_PATHS.login;
}
