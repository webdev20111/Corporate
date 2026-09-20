import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent } from './page/page.component';
import { ContactComponent } from './contact/contact.component';
import { CareerRegistrationComponent } from './career-registration/career-registration.component';
import { InternshipComponent } from './internship/internship.component';

@NgModule({
  declarations: [
    PageComponent,
    ContactComponent,
    CareerRegistrationComponent,
    InternshipComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}

