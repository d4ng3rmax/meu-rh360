import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CpfMaskDirective } from './utils/document-mask.directive';
import { CelMaskDirective } from './utils/cel-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserProfileComponent,
    MainPageComponent,
    SideMenuComponent,
    CpfMaskDirective,
    CelMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
