import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/models/user';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member!: Member;
  userFromObserverable!: User;

  @ViewChild('editForm') editForm!: NgForm;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(
    private memberService: MembersService,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.userFromObserverable = user;
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.memberService
      .getMemberByUser(this.userFromObserverable.username)
      .subscribe((user) => {
        this.member = user;
      });
  }

  updateMember() {
    console.log(this.member);
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile Updated Successfully✅');
      this.editForm.reset(this.member);
    });
  }
}
