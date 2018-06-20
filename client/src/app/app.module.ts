import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { appRoutes } from "./app-routing";
import { RegistrationComponent } from './registration/registration.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent, PostDialogComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {AuthService} from './service/auth.service';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { CommentService } from './service/comment.service';
import { QuestionService } from './service/question.service';
import { SubscribeService } from './service/subscribtions.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { MaterialModule } from './material.module';
import { RegistrationService } from './service/registration.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PostDialogComponent
  ],
  entryComponents: [PostDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    appRoutes,
    MaterialModule,
    HttpClientModule
  ],
  providers: [AuthService,
    RegistrationService,
    CommentService, 
    QuestionService, 
    SubscribeService, 
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
