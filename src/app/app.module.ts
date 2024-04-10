import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';
import { CpfMaskDirective } from './utils/document-mask.directive';
import { CelMaskDirective } from './utils/cel-mask.directive';
import { UserInfoComponent } from './component/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserProfileComponent,
    MainPageComponent,
    SideMenuComponent,
    CpfMaskDirective,
    CelMaskDirective,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
