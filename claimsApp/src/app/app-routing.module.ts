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
<<<<<<< HEAD
import { ViewmemberComponent } from './viewmember/viewmember.component';
=======
>>>>>>> 1f5f5ae57d9b99b0a0150a860c7f9349e2bf2edd

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
<<<<<<< HEAD
  {path: 'viewclaim', component: ViewclaimComponent},
  {path: 'viewmember', component:ViewmemberComponent}
=======
  {path: 'viewclaim', component: ViewclaimComponent}
>>>>>>> 1f5f5ae57d9b99b0a0150a860c7f9349e2bf2edd
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
