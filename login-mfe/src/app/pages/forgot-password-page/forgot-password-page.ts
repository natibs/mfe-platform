import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  NatiUiButtonDirective,
  NatiUiHeadingDirective,
  NatiUiInputDirective,
} from 'ui-components';
import { LOGIN_PATHS } from '../../login-paths';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NatiUiInputDirective,
    NatiUiButtonDirective,
    NatiUiHeadingDirective,
  ],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.scss',
})
export class ForgotPasswordPage {
  private readonly fb = inject(FormBuilder);

  protected readonly loginPath = LOGIN_PATHS.login;
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.set(true);
  }
}
