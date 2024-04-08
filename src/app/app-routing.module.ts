import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
// import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redireciona para login se a rota estiver vazia
  {
    path: 'user',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: '/register', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  // { path: 'company-registration', component: CompanyRegistrationComponent },
  // { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
