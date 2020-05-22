import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from '../interceptor/http-error.interceptor';

export const httpErrorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
