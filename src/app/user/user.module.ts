import { NgModule } from '@angular/core';

import { UserRestService } from './service/user-rest.service';
import { UserService } from './service/user.service';

@NgModule({
  providers: [
    UserService,
    UserRestService,
  ],
})
export class UserModule { }
