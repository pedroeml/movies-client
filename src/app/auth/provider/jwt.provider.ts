import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from '../interceptor/jwt.interceptor';

export const jwtProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true,
};
