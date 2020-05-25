import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { MovieModule } from '../movie/movie.module';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetricsRoutingModule } from './metrics-routing.module';
import { MetricsService } from './service/metrics.service';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MetricsRoutingModule,
    MovieModule,
    ProfileModule,
    UserModule,
  ],
  providers: [
    MetricsService,
  ],
})
export class MetricsModule { }
