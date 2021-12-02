import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { AccountService } from './_services/account.service';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Fioance';

  currentUserObservable$: Observable<User> | undefined;
  constructor(
    private primengConfig: PrimeNGConfig,
    private accountService: AccountService
  ) {}
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.setCurrentUser();
    this.currentUserObservable$ = this.accountService.currentUser$;
  }

  setCurrentUser() {
    const userExist: string | null = localStorage.getItem('user');
    if (!userExist) {
      this.accountService.setCurrentUser(undefined);
      return;
    }

    const user: User = JSON.parse(userExist);
    this.accountService.setCurrentUser(user);
  }
}
