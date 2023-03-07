import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children:[
        ]}
    ])
  ],
  exports:[
    RouterModule
  ],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent
  ]
})
export class AdminModule{}
