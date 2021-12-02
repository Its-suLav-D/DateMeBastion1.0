import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { MessageService } from '../_services/message.service';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages?: Message[] = [];
  pagination?: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  containerOptions: any[];

  constructor(private messageService: MessageService) {
    this.containerOptions = [
      {
        label: 'Unread',
        value: 'Unread',
      },
      {
        label: 'Inbox',
        value: 'Inbox',
      },
      {
        label: 'Outbox',
        value: 'Outbox',
      },
    ];
  }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        console.log(response);
        this.messages = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.Page;
    this.loadMessages();
  }
}
