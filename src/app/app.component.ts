import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private coreToken: AuthService) {
    this.setTimeout();
    this.userInactive.subscribe(() =>
      console.log('user has been inactive for 5s')
    );
  }
  title = 'frontend-code';

  userActivity: any;
  userInactive: Subject<any> = new Subject();

  setTimeout() {
    if (localStorage.getItem('tokenLocal') != null) {
      this.userActivity = setTimeout(
        () => this.userInactive.next(undefined),60000);
    }
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
