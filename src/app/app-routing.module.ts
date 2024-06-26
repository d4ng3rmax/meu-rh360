import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { RegisterComponent } from './component/register/register.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { authGuard } from './Guard/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'user',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: '/register', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
      { path: 'info', component: UserInfoComponent, canActivate: [authGuard] },
    ]
  },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
