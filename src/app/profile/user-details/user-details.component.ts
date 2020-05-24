import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { first } from 'rxjs/operators';

import { UserRequest } from '../../user/integration/user.request';
import { UserModel } from '../../user/model/user.model';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  public user: UserModel;
  public isUpdating: boolean;
  public readonly pictureBase64: SafeResourceUrl;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly snackBar: MatSnackBar,
    private readonly service: ProfileService) {
    this.isUpdating = false;
    this.pictureBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(this.service.user.picture);
    this.loadUser();
  }

  get isLoading(): boolean {
    return !this.user;
  }

  public loadUser(): void {
    this.service.load().pipe(
      first(),
    ).subscribe(
      user => { this.user = user; }
    );
  }

  public updateUser(request: UserRequest): void {
    let message = '';
    this.isUpdating = true;

    this.service.update(this.user.id, request).subscribe(
      user => {
        this.user = user;
        message = 'Saved successfully!';
      },
      err => {
        message = 'An error occured while saving.';
      },
      () => {
        this.openSackBar(message, 'OK');
        this.isUpdating = false;
      }
    );
  }

  private openSackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
