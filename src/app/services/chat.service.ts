import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { ProviderAst } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  AUTH_URL = 'http://localhost:3000/token';
  INSTANCE_LOCATOR = 'v1:us1:de477ab4-3933-44e0-82f5-0d5e809d516c';
  GENERAL_ROOM_ID = 'c33cbe78-f668-4fa2-ba50-5bd09dd7faf9';
  GENERAL_ROOM_INDEX = 0;

  chatManager: ChatManager;
  currentUser;
  message = [];

  usersSubject = new BehaviorSubject([]);
  messagesSubject = new BehaviorSubject([]);

  constructor() { }

  async connectToChatkit(userId: string) {
    this.chatManager = new ChatManager({
      instanceLocator: this.INSTANCE_LOCATOR,
      userId: userId,
      tokenProvider: new TokenProvider({ url: this.AUTH_URL })
    });

    this.currentUser = await this.chatManager.connect();
    console.log(this.currentUser);

    await this.currentUser.subscribeToRoom({
      roomId: this.GENERAL_ROOM_ID,
      hooks: {
        onMessage: message => {
          this.message.push(message);
          this.messagesSubject.next(this.message);
        }
      },
      messageLimit: 20
    });
    const users = this.currentUser.rooms[this.GENERAL_ROOM_INDEX].users;
    this.usersSubject.next(users);
  }

  getUser() {
    return this.usersSubject;
  }

  getMessages() {
    return this.messagesSubject;
  }

  sendMessage(message) {
    return this.currentUser.sendMessage({
      text: message.text,
      roomId: message.roomId || this.GENERAL_ROOM_ID
    });
  }

  isUserOnLine(user): boolean {
    return user.presence.state === 'online';
  }

  getCurrentUser() {
    return this.currentUser;
  }
}
