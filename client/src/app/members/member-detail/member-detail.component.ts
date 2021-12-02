import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  images: any = [];
  active5 = 0;
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit() {
    this.loadMemberDetail();
    this.getPhotos();
  }
  loadMemberDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMember(id).subscribe((member) => {
        this.member = member;
      });
    }
  }

  getPhotos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.memberService.getMember(id).subscribe((member) => {
        this.images = this.member.photos;
      });
    }
  }
}
