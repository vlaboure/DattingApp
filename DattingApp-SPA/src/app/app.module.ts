import { BrowserModule, HammerGestureConfig, enableDebugTools, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/Http';
import { JwtModule } from '@auth0/angular-jwt'; // a mettre en tête
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.Interceptor';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/message.component';
import {AuthGuard} from './_guards/auth.guard';
import { appRoutes } from './routes';
import {UserService} from './_services/user.service';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AlertifyService } from './_services/alertify.service';
import { MemberDetailResolver } from './_resolver/member-detail-resolver';
import { MemberListResolver } from './_resolver/member-list-resolver';



export function tokenGetter(){
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig{
   overrides = {
      pinch: {enable: false},
      rotate: {enable: false}

   };
}


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      /****** utilier .froRoot permet de créer un singleton
       * **** pour n'appliquer le service que sur la route en cours
       */
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
           // indique routes autorisées et lancées au demarrage
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService,
      AlertifyService,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
