import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { User } from '../interface/user';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userId: string = '';
  userList: any = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.chatService.connectToChatkit(this.userId);
    this.chatService.getUser().subscribe((users) => {
      this.userList = users;
    });
  }

  isOnline(user) {
    return this.chatService.isUserOnLine(user);
  }
}
