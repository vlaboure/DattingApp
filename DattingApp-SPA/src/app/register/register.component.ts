import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 // @Input() valuesFromHome;
  @Output() cancelRegister = new EventEmitter(); 
  model: any ={};
  constructor(private authService: AuthService) { } 

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(() => {
      console.log('register accompli');
    }, error => {console.log(error); });
    console.log(this.model);
  }

  cancel(){
    // envoi de l'event avec la valeur false pour valider le cancel
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
