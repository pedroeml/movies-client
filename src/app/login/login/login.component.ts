import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoading: boolean;
  public error: string;
  private readonly returnUrl: string;

  constructor(
    private readonly service: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder) {
    this.isLoading = false;
    this.error = '';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.service.logout();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    const username: string = this.form.controls['username'].value;
    const password: string = this.form.controls['password'].value;
    this.isLoading = true;
    this.service.login(username, password).pipe(
      first(),
    ).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.error = error.error.message;
        this.isLoading = false;
      });
  }
}
