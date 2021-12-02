import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Member } from '../models/member';
import { MembersService } from '../_services/members.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [MessageService],
})
export class NavComponent implements OnInit {
  displayLoginModal: boolean = false;
  displayRegisterModal: boolean = false;

  currentUserObservable$: Observable<User> | undefined;
  model: any = {};
  loginModel: any = {};
  value3: string = '';
  userMember!: Member;
  user!: User;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private memberService: MembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.currentUserObservable$ = this.accountService.currentUser$;
    this.getUser();
  }
  showResponsiveLogin() {
    this.displayLoginModal = true;
  }

  showResponsiveRegister() {
    this.displayRegisterModal = true;
  }

  submitRegister() {
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastr.error('Unexpcted Error Occured!! Try Again Later');
      }
    );
  }

  submitLogin() {
    this.accountService.login(this.loginModel).subscribe(
      (response) => {
        // Navigate to differente Page
        this.displayLoginModal = false;
        this.router.navigateByUrl('/members');
        this.toastr.success('Logged In Successfully!!');
      },
      (error) => {
        this.toastr.error('Incorrect User or Password!! Try Again ');
      }
    );
  }

  submitSignout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  getUser() {
    this.memberService.getMemberByUser(this.user.username).subscribe((user) => {
      this.userMember = user;
    });
  }
}
