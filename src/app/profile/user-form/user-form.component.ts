import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserRequest } from '../../user/integration/user.request';
import { UserModel } from '../../user/model/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public user: UserModel;

  @Input()
  public isUpdating: boolean;

  @Output()
  public readonly editedUser: EventEmitter<UserRequest>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.editedUser = new EventEmitter<UserRequest>();
    this.isUpdating = false;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usernameCtrl: [this.username, [Validators.required]],
      passwordCtrl: ['', [Validators.required, Validators.pattern(this.password)]],
      emailCtrl: [this.email, [Validators.email]],
      firstnameCtrl: [this.firstName, [Validators.required]],
      lastnameCtrl: [this.lastName, [Validators.required]],
      countryCtrl: [this.country, [Validators.required]],
    });
  }

  get isLoading(): boolean {
    return !this.user || this.isUpdating;
  }

  get username(): string {
    return this.user && this.user.username ? this.user.username : '';
  }

  get password(): string {
    return this.user && this.user.password ? this.user.password : '';
  }

  get email(): string {
    return this.user && this.user.email ? this.user.email : '';
  }

  get firstName(): string {
    return this.user && this.user.firstName ? this.user.firstName : '';
  }

  get lastName(): string {
    return this.user && this.user.lastName ? this.user.lastName : '';
  }

  get country(): string {
    return this.user && this.user.country ? this.user.country : '';
  }

  public save(): void {
    const email: string = this.form.controls['emailCtrl'].value.toString();
    const firstName: string = this.form.controls['firstnameCtrl'].value.toString();
    const lastName: string = this.form.controls['lastnameCtrl'].value.toString();

    const request: UserRequest = {
      firstName,
      lastName,
      email,
    };

    this.editedUser.emit(request);
    this.form.controls['passwordCtrl'].setValue('');
  }

  public onSubmit(): void {
    if (this.form.valid && !this.isLoading) {
      this.save();
    }
  }
}
