import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private alertifyService: AlertifyService
            , private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUSers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }
    // appel de l'observable getUsers
  // loadUSers(){
  //   this.userService.getUsers().subscribe((users: User[]) =>{
  //     this.users = users;
  //   }, error =>{
  //     this.alertifyService.error(error);
  //   })
  // }
}
