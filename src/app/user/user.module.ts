import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from '../guards/admin-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LoginComponent, RegisterComponent, AdminPanelComponent],
  declarations: [LoginComponent, RegisterComponent, AdminPanelComponent],
  providers:[AdminGuard, UserService]
})
export class UserModule { }