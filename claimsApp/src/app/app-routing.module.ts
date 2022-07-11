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

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'memberportal', component: MemberportalComponent},
  {path: 'submitclaim', component: SubmitclaimComponent},
  {path: 'updatemem', component: UpdatememComponent},
  {path: 'claimsstatus', component: ClaimsstatusComponent},
  {path: 'adminportal', component: AdminportalComponent},
  {path: 'processclaim/:claimId', component: ProcessclaimComponent},
  {path: 'viewclaim', component: ViewclaimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
