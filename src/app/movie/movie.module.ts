import { NgModule } from '@angular/core';

import { ConfigModule } from '../config/config.module';
import { MovieRestService } from './service/movie-rest.service';
import { MovieService } from './service/movie.service';

@NgModule({
  imports: [
    ConfigModule,
  ],
  providers: [
    MovieService,
    MovieRestService,
  ],
})
export class MovieModule { }
