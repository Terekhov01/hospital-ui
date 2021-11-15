import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user/user.component';
import {AddUserComponent} from './add-doctor/add-user.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./user/user/user.service";
import { OrderByPipe } from './order-by.pipe';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    OrderByPipe,
    UpdateDoctorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
