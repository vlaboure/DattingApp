import { Component, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // pour envoi à nav val de regiser
  registerMode = false;
  reset = false;
 // values: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  //  this.getValues();
  }

  registerToggle(){
    this.registerMode = true;
  }

  resetPassword(){
    this.reset = true;
    console.log(this.reset);
  }
  // getValues(){
  //   // subscribe car on travaille sur des promesses
  //   this.http.get('http://localhost:5000/api/values').subscribe(response =>{
  //     this.values = response;
  //   }, error => {console.log(error); });
  // }

    cancelRegisterMode(registerMode: boolean){
      this.registerMode = registerMode;
    }
    cancelResetMode(resetMode: boolean){
      this.reset = resetMode;
    }
}
