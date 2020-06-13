import {Injectable} from '@angular/core';
import {User} from '../_models/user';
import { UserService } from '../_services/user.service';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Message } from '../_models/message';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
   pageNumber = 1;
   pageSize = 5;
   messageContener = 'unread';

   constructor(private userService: UserService, private router: Router,
               private alertify: AlertifyService, private authService: AuthService){}
   resolve(route: ActivatedRouteSnapshot): Observable<Message[]>{
      return this.userService.getMessages(this.authService.decodedToken.nameid, 
             this.pageNumber, this.pageSize, this.messageContener)
      .pipe(
         catchError(error => {
            this.alertify.error('Erreur lors de la récupération des messages');
            this.router.navigate(['/home']);
            return of(null); // return of--> return observable of(null)
         })
      );
   }
}