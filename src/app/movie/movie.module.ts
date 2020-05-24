import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfigModule } from '../config/config.module';
import { MovieRowComponent } from './movie-row/movie-row.component';
import { MovieRestService } from './service/movie-rest.service';
import { MovieService } from './service/movie.service';

@NgModule({
  declarations: [
    MovieRowComponent,
  ],
  imports: [
    CommonModule,
    ConfigModule,
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
