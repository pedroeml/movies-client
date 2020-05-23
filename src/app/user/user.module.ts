import { NgModule } from '@angular/core';

import { ConfigModule } from '../config/config.module';
import { UserMapper } from './mapper/user.mapper';
import { UserRestService } from './service/user-rest.service';
import { UserService } from './service/user.service';

@NgModule({
  imports: [
    ConfigModule,
  ],
  providers: [
    UserMapper,
    UserService,
    UserRestService,
  ],
})
export class UserModule { }
