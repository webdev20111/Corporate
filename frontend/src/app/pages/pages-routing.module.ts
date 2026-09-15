import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { ContactComponent } from './contact/contact.component';
import { CareerRegistrationComponent } from './career-registration/career-registration.component';
import { InternshipComponent } from './internship/internship.component';

const routes: Routes = [
  { path: 'contact.html', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'careers-registration.html', redirectTo: 'careers-registration', pathMatch: 'full' },
  { path: 'careers.html', redirectTo: 'careers', pathMatch: 'full' },
  { path: 'about.html', redirectTo: 'about', pathMatch: 'full' },
  { path: 'services.html', redirectTo: 'services', pathMatch: 'full' },
  { path: 'industries.html', redirectTo: 'industries', pathMatch: 'full' },
  { path: 'insights.html', redirectTo: 'insights', pathMatch: 'full' },
  { path: 'products-platforms.html', redirectTo: 'products-platforms', pathMatch: 'full' },
  { path: 'research-innovation.html', redirectTo: 'research-innovation', pathMatch: 'full' },
  { path: 'alliances.html', redirectTo: 'alliances', pathMatch: 'full' },
  { path: 'software-development.html', redirectTo: 'software-development', pathMatch: 'full' },
  { path: 'hrms-solutions.html', redirectTo: 'hrms-solutions', pathMatch: 'full' },
  { path: 'hms-platforms.html', redirectTo: 'hms-platforms', pathMatch: 'full' },
  { path: 'support-maintenance.html', redirectTo: 'support-maintenance', pathMatch: 'full' },
  { path: 'web-development.html', redirectTo: 'web-development', pathMatch: 'full' },
  { path: '', component: PageComponent, data: { slug: 'home' } },
  { path: 'about', component: PageComponent, data: { slug: 'about' } },
  { path: 'alliances', component: PageComponent, data: { slug: 'alliances' } },
  { path: 'careers', component: PageComponent, data: { slug: 'careers' } },
  { path: 'careers-registration', component: CareerRegistrationComponent },
  { path: 'best-computer-science-internship', component: PageComponent, data: { slug: 'best-computer-science-internship' } },
  { path: 'internship-registration', component: InternshipComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'hms-platforms', component: PageComponent, data: { slug: 'hms-platforms' } },
  { path: 'hrms-solutions', component: PageComponent, data: { slug: 'hrms-solutions' } },
  { path: 'industries', component: PageComponent, data: { slug: 'industries' } },
  { path: 'insights', component: PageComponent, data: { slug: 'insights' } },
  { path: 'products-platforms', component: PageComponent, data: { slug: 'products-platforms' } },
  { path: 'research-innovation', component: PageComponent, data: { slug: 'research-innovation' } },
  { path: 'services', component: PageComponent, data: { slug: 'services' } },
  { path: 'software-development', component: PageComponent, data: { slug: 'software-development' } },
  { path: 'support-maintenance', component: PageComponent, data: { slug: 'support-maintenance' } },
  { path: 'web-development', component: PageComponent, data: { slug: 'web-development' } },
  { path: ':slug', component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
