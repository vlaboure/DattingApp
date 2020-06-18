import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() receptId: number;
  messages: Message[];
  newMessage: any ={};

  constructor(private userService: UserService, private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.receptId)
    .subscribe(messages => {
      this.messages = messages;
    }
      ,error =>{
        this.alertify.error(error);
      });
      console.log(this.receptId);
  }
  sendMessage(){
    this.newMessage.receptId = this.receptId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
    .subscribe((message: Message) =>
    {
      // unshift: place au début du tableau
      this.messages.unshift(message);
      // effacer le message
      this.newMessage = "";
    }, error => {this.alertify.error(error); });
  }
}
