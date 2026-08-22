import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  NatiUiButtonDirective,
  NatiUiHeadingDirective,
  NatiUiInputDirective,
} from 'ui-components';
import { AuthService, ROUTE_PATHS } from 'shared-state';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NatiUiInputDirective,
    NatiUiButtonDirective,
    NatiUiHeadingDirective,
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly signupPath = ROUTE_PATHS.signup;
  protected readonly forgotPasswordPath = ROUTE_PATHS.forgotPassword;

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email } = this.form.getRawValue();
    this.auth.login({ id: crypto.randomUUID(), name: email.split('@')[0], email });
    this.router.navigate(['/', ROUTE_PATHS.articles]);
  }
}
