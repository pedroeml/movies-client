import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/service/auth.service';
import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let fixture: ComponentFixture<MainNavComponent>;
  let component: MainNavComponent;
  let service: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
      ],
      declarations: [
        MainNavComponent,
      ],
      providers: [
        { provide: AuthService, useClass: class {
          isLoggedIn() { return true; }
          logout() { }
        } },
      ],
    }).compileComponents().then(() => {
      service = TestBed.get(AuthService);
      router = TestBed.get(Router);
      fixture = TestBed.createComponent(MainNavComponent);
      component = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });
  }));

  describe('Initializing component', () => {
    it('should be defined', () => {
      expect(component).toBeDefined();
    });
  });

  describe('isLoggedIn', () => {
    let isLoggedIn: boolean;

    beforeEach(() => {
      spyOn(service, 'isLoggedIn').and.callThrough();
      isLoggedIn = component.isLoggedIn;
    });

    it('should have been the isLoggedIn method from AuthService', () => {
      expect(service.isLoggedIn).toHaveBeenCalled();
    });

    it('should have been returned true', () => {
      expect(isLoggedIn).toBeTruthy();
    });
  });

  describe('logout', () => {
    const path: string = '/login';

    beforeEach(() => {
      spyOn(service, 'logout');
      spyOn(router, 'navigateByUrl');
      component.logout();
    });

    it('should have been called the logout method from AuthService', () => {
      expect(service.logout).toHaveBeenCalled();
    });

    it(`should have been called the navigateByUrl method from Router with '${path}' as param`, () => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(path);
    });
  });
});
