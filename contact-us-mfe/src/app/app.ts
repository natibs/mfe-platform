import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  NatiUiButtonDirective,
  NatiUiHeadingDirective,
  NatiUiInputDirective,
  NatiUiTextareaDirective,
} from 'ui-components';

@Component({
  imports: [
    ReactiveFormsModule,
    NatiUiInputDirective,
    NatiUiTextareaDirective,
    NatiUiButtonDirective,
    NatiUiHeadingDirective,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class RemoteEntryComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.set(true);
    this.form.reset();
  }
}
