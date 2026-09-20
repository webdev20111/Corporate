import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';//form

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FloatingActionsComponent } from './shared/floating-actions/floating-actions.component';
import { AppointmentFormComponent } from './shared/appointment-form/appointment-form.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FloatingActionsComponent,
    AppointmentFormComponent,
    ChatbotComponent
  ],

  imports: [
  BrowserModule,
  HttpClientModule,
  FormsModule,//add forms module
  AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

