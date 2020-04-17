import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/Http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

/**
 * création d'un header pour autorisations pour les requêtes get
 */
    /* plus nécessaire car  JwtModule.forRoot dans app.module*/
// const httpOptions = {
//   headers: new HttpHeaders({
//     // tslint:disable-next-line: object-literal-key-quotes
//     'Authorization' : 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    // il faut typer le retrun <User[]>car get retourne un object et pas un user
    // si pas de  JwtModule.forRoot dans app.module--> get doit contenir option pour token
    return this.http.get<User[]>(environment.apiUrl + 'users');
  }
  getUser(id): Observable<User>{
    // il faut typer le retrun <User[]>car get retourne un object et pas un user
        // si pas de  JwtModule.forRoot dans app.module--> get doit contenir option pour token
    return this.http.get<User>(environment.apiUrl + 'users/' + id);
  }
}
