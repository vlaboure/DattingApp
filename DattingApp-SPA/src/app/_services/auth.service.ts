import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

/**************************************************************************************************/
              /****service injecté pour le login */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl  = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
// tslint:disable-next-line: typedef-whitespace
constructor(private Http : HttpClient) { }

// tslint:disable-next-line: whitespace
// tslint:disable-next-line: typedef-whitespace

// ************************************************************** */
// le login avec le this.model passé en paramètre
  login(model: any){
                        // pipe empile chk fonction avec le resultat de la fonction précédente
    return this.Http.post(this.baseUrl + 'login', model).pipe(
                        // on passe user venant du serveur en paramètre
      map((response: any) => {
        const user = response;
        if (user){
                  // le token est enregistré en local pour les connexions futures
          localStorage.setItem('token', user.token);
          // user ---> token dans le http envoyé par le serveur
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    // tslint:disable-next-line: semicolon
    )
  }

  register(model: any){
    return this.Http.post(this.baseUrl + 'register', model);
  }

  //
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}