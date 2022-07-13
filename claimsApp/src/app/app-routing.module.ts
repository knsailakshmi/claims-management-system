import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminportalComponent} from './adminportal/adminportal.component';
import {AuthComponent} from './auth/auth.component';
import {ClaimsstatusComponent} from './claimsstatus/claimsstatus.component';
import {HomeComponent} from './home/home.component';
import {MemberportalComponent} from './memberportal/memberportal.component';
import {ProcessclaimComponent} from './processclaim/processclaim.component';
import {SignupComponent} from './signup/signup.component';
import {SubmitclaimComponent} from './submitclaim/submitclaim.component';
import {UpdatememComponent} from './updatemem/updatemem.component';
import {ViewclaimComponent} from './viewclaim/viewclaim.component';
import { ViewmemberComponent } from './viewmember/viewmember.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'memberportal', component: MemberportalComponent,canActivate:[AuthGuard]},
  {path: 'submitclaim', component: SubmitclaimComponent,canActivate:[AuthGuard]},
  {path: 'updatemem', component: UpdatememComponent,canActivate:[AuthGuard]},
  {path: 'claimsstatus', component: ClaimsstatusComponent,canActivate:[AuthGuard]},
  {path: 'adminportal', component: AdminportalComponent,canActivate:[AuthGuard]},
  {path: 'processclaim/:claimId', component: ProcessclaimComponent,canActivate:[AuthGuard]},
  {path: 'viewclaim', component: ViewclaimComponent,canActivate:[AuthGuard]},
  {path: 'viewmember', component:ViewmemberComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
