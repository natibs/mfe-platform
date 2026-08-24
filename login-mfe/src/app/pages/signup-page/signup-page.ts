import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  NatiUiButtonDirective,
  NatiUiHeadingDirective,
  NatiUiInputDirective,
} from 'ui-components';
import { AuthService } from 'shared-state';
import { LOGIN_PATHS } from '../../login-paths';

@Component({
  selector: 'app-signup-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NatiUiInputDirective,
    NatiUiButtonDirective,
    NatiUiHeadingDirective,
  ],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss',
})
export class SignupPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loginPath = LOGIN_PATHS.login;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email } = this.form.getRawValue();
    this.auth.login({ id: crypto.randomUUID(), name, email });
    this.router.navigate(['/']);
  }
}
