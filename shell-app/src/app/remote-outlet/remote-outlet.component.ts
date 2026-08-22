import { Component, Type, ViewContainerRef, effect, inject, input } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

/**
 * Mounts a remote's exposed component outside the Router (for MFEs like the
 * sidebar/footer that are always present, not tied to a route). Every remote
 * exposes its root component under the same export name, RemoteEntryComponent,
 * so this stays generic across all of them.
 */
@Component({
  selector: 'app-remote-outlet',
  template: '',
})
export class RemoteOutletComponent {
  readonly remoteName = input.required<string>();
  readonly exposedModule = input.required<string>();

  private readonly vcr = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const remoteName = this.remoteName();
      const exposedModule = this.exposedModule();

      loadRemoteModule(remoteName, exposedModule)
        .then((m) => {
          this.vcr.clear();
          this.vcr.createComponent(m.RemoteEntryComponent as Type<unknown>);
        })
        .catch((err) => console.error(`Failed to load remote ${remoteName}${exposedModule}`, err));
    });
  }
}
