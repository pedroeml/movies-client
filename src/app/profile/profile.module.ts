import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './service/profile.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    UserDetailsComponent,
    UserFormComponent,
  ],
  imports: [
    AuthModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    UserModule,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule { }
