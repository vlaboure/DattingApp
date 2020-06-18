import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  contener = 'Unread';

  constructor(private userService: UserService, private alerify: AlertifyService, 
              private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    })
  }

  loadMessages(){
    this.userService
    .getMessages(this.authService.decodedToken.nameid, 
      this.pagination.currentPage,
      this.pagination.itemsPerPage,
      this.contener)
    .subscribe(
      (res: PaginatedResult<Message[]>) =>{
        this.messages = res.result;
        this.pagination = res.pagination;
      },error =>{
        this.alerify.error(error);
      }
    );
    console.log('message component');
    debugger;
  }

  pageChanged(event: any): void{
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
