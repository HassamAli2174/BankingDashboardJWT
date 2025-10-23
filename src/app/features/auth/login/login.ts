import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loading = false;
  error = '';
  currentYear = new Date().getFullYear();


  @ViewChild('usernameInput') usernameInput!: ElementRef;
new: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    // redirect if already logged in
    if (this.auth.hasToken()) this.router.navigate(['/dashboard']);

    // focus input after slight delay
    setTimeout(() => this.usernameInput?.nativeElement?.focus(), 300);
  }

  submit(form: NgForm) {
    if (form.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid username or password';
        this.loading = false;
      }
    });
  }
}
