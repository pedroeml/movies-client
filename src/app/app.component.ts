import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  private readonly unsubscribe$: Subject<void>;
  private readonly isHandset$: Observable<boolean>;

  constructor(private readonly breakpointObserver: BreakpointObserver) {
    this.unsubscribe$ = new Subject<void>();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      takeUntil(this.unsubscribe$),
      map(result => result.matches),
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get observeIsHandset(): Observable<boolean> {
    return this.isHandset$;
  }
}
