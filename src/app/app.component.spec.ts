import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from './auth/service/auth.service';
import { MainNavComponent } from './main-nav/main-nav.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let breakpointObserver: BreakpointObserver;

  const breakpointMatches: BreakpointState = {
    breakpoints: { },
    matches: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
      ],
      providers: [
        BreakpointObserver,
        { provide: AuthService, useClass: class { isLoggedIn() { return false; } } },
      ],
      declarations: [
        AppComponent,
        MainNavComponent
      ],
    }).compileComponents().then(() => {
      breakpointObserver = TestBed.get(BreakpointObserver);

      spyOn(breakpointObserver, 'observe').and.returnValue(of(breakpointMatches));

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
      });
    });
  }));

  describe('Initializing component', () => {
    it('should be defined', () => {
      expect(component).toBeDefined();
    });
  });

  describe('observeIsHandset', () => {
    let isHandset: boolean;

    beforeEach(() => {
      component.observeIsHandset.subscribe(
        res => { isHandset = res; }
      );
    });

    it(`should have returned ${breakpointMatches.matches}`, () => {
      expect(isHandset).toBe(breakpointMatches.matches);
    });
  });
});
