import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from "./app-routing";
import { RegistrationComponent } from './registration/registration.component';


import { MyOwnCustomMaterialModule } from './my-own-custom-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataService } from './data/data.service';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { QuestionComponent } from './question/question.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    PostDialogComponent,
    QuestionComponent,
    CommentsComponent
  ],
  entryComponents: [PostDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    appRoutes,
    MyOwnCustomMaterialModule
  ],
  providers: [DataService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
