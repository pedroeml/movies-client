import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './guards/auth.guard';
import { fakeBackendProvider } from './provider/fake-backend.provider';
import { httpErrorProvider } from './provider/http-error.provider';
import { jwtProvider } from './provider/jwt.provider';
import { AuthRestService } from './service/auth-rest.service';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [],
  imports: [
    ConfigModule,
    UserModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthRestService,
    AuthService,
    fakeBackendProvider,
    httpErrorProvider,
    jwtProvider,
  ],
})
export class AuthModule { }
