import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Only used when this remote is run standalone at its own dev-server port.
 * When embedded in the shell, the shell's Router loads LOGIN_ROUTES directly
 * (see federation.config.mjs's './Routes' expose) and this component is unused.
 */
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet />',
})
export class RemoteEntryComponent {}
