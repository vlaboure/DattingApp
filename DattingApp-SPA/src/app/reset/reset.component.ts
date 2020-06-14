import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  @Output() cancelReset = new EventEmitter(); 
  user: User;
  private router: Router;
  resetForm: FormGroup;
  bsConfig: Partial <BsDatepickerConfig>;
  login: string;

  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private fb: FormBuilder
  ){ }

  ngOnInit() {
    this.bsConfig = {
    containerClass: 'theme-red'
    },
    this.createForm();
    this.login = this.authService.getLogin();
  }
  createForm() {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(6),
        Validators.maxLength(12)]],
      confirmpassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator}); 
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password') === g.get('confirmpassword');
  }

  resetPassword(){
    // assigner les valeur dans resetForm à user
    this.user = Object.assign({},this.resetForm.value)
    console.log(this.resetForm.value);
  }

  cancel(){
    // envoi de l'event avec la valeur false pour valider le cancel
    this.cancelReset.emit(false);
    console.log('cancelled');
  }

}
