import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { UserModel } from '../../user/model/user.model';
import { MetricsService } from '../service/metrics.service';

@Component({
  selector: 'app-top-users',
  templateUrl: 'top-users.component.html',
  styleUrls: ['./top-users.component.css']
})
export class TopUsersComponent {
  private readonly limit: number;
  public users: UserModel[];

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly service: MetricsService) {
    this.limit = 3;
    this.loadTopUsers();
  }

  private loadTopUsers(): void {
    this.service.getTopUsers(this.limit).subscribe(
      users => { this.users = users; }
    );
  }

  public picture(user: UserModel): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(user.picture);
  }
}
