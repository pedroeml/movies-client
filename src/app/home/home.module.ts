import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    AuthModule,
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule { }
