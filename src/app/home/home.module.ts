import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MovieModule } from '../movie/movie.module';
import { ProfileModule } from '../profile/profile.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeService } from './service/home.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    MovieModule,
    ProfileModule,
  ],
  providers: [
    HomeService,
  ],
})
export class HomeModule { }
