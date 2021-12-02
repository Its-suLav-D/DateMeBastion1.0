import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members!: Member[];
  visibleMember: any;
  constructor(private memberService: MembersService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.memberService.getMembers().subscribe((member: Member[]) => {
      this.members = member;
    });
  }
}
