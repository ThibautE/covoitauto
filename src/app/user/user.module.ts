import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { LoginService } from './login/login.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from '../guards/admin-guard';
import { AuthGuard } from '../guards/auth-guard';
import { LoginUComponent } from './login/login-u/login-u.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginUComponent,
  },
  {
    path: 'connexion',
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
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule, LoginComponent, UserProfileComponent, RegisterComponent, AdminPanelComponent],
  declarations: [LoginComponent, UserProfileComponent, RegisterComponent, AdminPanelComponent, LoginUComponent],
  providers:[AdminGuard, UserService, LoginService]
})
export class UserModule { }