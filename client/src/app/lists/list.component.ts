import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  members: Partial<Member[]> = [];
  predicate = 'liked';
  stateOptions: any[];
  visibleMember: any;

  constructor(private memberService: MembersService) {
    this.stateOptions = [
      {
        label: 'Members I Like',
        value: 'liked',
      },
      { label: 'Members who like Me', value: 'likedBy' },
    ];
  }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService.getLikes(this.predicate).subscribe((response) => {
      this.members = response;
    });
  }
}
