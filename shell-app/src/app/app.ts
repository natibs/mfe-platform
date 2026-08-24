import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RemoteOutletComponent } from './remote-outlet/remote-outlet.component';
import { NAV_ITEMS, ROUTE_PATHS } from './nav-config';

@Component({
  imports: [RouterOutlet, RemoteOutletComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly sidebarInputs = { navItems: NAV_ITEMS, loginPath: ROUTE_PATHS.login };
}
