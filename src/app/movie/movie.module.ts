import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ConfigModule } from '../config/config.module';
import { ProfileModule } from '../profile/profile.module';
import { MoviePlayerComponent } from './movie-player/movie-player.component';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieRowComponent } from './movie-row/movie-row.component';
import { MovieRestService } from './service/movie-rest.service';
import { MovieService } from './service/movie.service';

@NgModule({
  declarations: [
    MoviePlayerComponent,
    MovieRowComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule,
    MatProgressSpinnerModule,
    MovieRoutingModule,
    ProfileModule,
  ],
  providers: [
    MovieService,
    MovieRestService,
  ],
  exports: [
    MovieRowComponent,
  ]
})
export class MovieModule { }
