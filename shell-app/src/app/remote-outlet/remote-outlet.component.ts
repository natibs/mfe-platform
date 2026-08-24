import { Component, Type, ViewContainerRef, effect, inject, input } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-remote-outlet',
  template: '',
})
export class RemoteOutletComponent {
  readonly remoteName = input.required<string>();
  readonly exposedModule = input.required<string>();
  readonly inputs = input<Record<string, unknown>>({});

  private readonly vcr = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const remoteName = this.remoteName();
      const exposedModule = this.exposedModule();
      const inputs = this.inputs();

      loadRemoteModule(remoteName, exposedModule)
        .then((m) => {
          this.vcr.clear();
          const componentRef = this.vcr.createComponent(m.RemoteEntryComponent as Type<unknown>);
          for (const [key, value] of Object.entries(inputs)) {
            componentRef.setInput(key, value);
          }
        })
        .catch((err) => console.error(`Failed to load remote ${remoteName}${exposedModule}`, err));
    });
  }
}
