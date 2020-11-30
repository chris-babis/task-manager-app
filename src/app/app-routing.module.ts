import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: NavigationComponent, children: [
    {path: '', component: OverviewComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
