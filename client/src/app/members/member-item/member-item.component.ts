import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css'],
})
export class MemberItemComponent implements OnInit {
  @Input() memberFromList!: Member;
  constructor(
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(
      () => {
        this.toastr.success(`You have liked ${this.memberFromList.knownAs}`);
      },
      (error) => {
        console.log(error);
        this.toastr.error('You already Like the User');
      }
    );
  }
}
