import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OwnerProject } from './project/owner-project.guard';
import { ProjectResolver } from './project/project-resolver.service';
import { ProjectComponent } from './project/project.component';
import { AuthGuardService } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: NavigationComponent, canActivate:[AuthGuardService] ,children: [
    {path: '', component: HomeComponent},
    {path: 'create', component: CreateComponent},
    {path: 'project/:id', component: ProjectComponent,canActivate: [OwnerProject], resolve:[ProjectResolver]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
