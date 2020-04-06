import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // pour récupérer les valeurs depuis navcomponent.html
  model: any ={};

  constructor(private authService : AuthService) { }

  ngOnInit() {

  }
  login(){
    //il faut souscrire au service avec le this.model
      //subscribe(observer=>)
    this.authService.login(this.model).subscribe(next =>{
      console.log('loggin OK !!!')} , error => {
        console.log('error'); 
      });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

}
