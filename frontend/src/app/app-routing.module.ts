import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//importing components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientBillsComponent } from './components/client-bills/client-bills.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ProviderAddBundleComponent } from './components/provider-add-bundle/provider-add-bundle.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';
import { ProviderHomeComponent } from './components/provider-home/provider-home.component';
// route guard
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'ClientHome/:id', component: ClientHomeComponent },
  { path: 'ClientBills/:id', component: ClientBillsComponent },
  { path: 'ClientProfile/:id', component: ClientProfileComponent },
  { path: 'ProviderProfile/:id', component: ProviderProfileComponent },
  { path: 'ProviderAddBundle/:id', component: ProviderAddBundleComponent },
  { path: 'ProviderHome/:id', component: ProviderHomeComponent },

  { path: 'ClientHome', component: ClientHomeComponent },
  { path: 'ProviderHome', component: ProviderHomeComponent },
  // fel client bills 3ayzeen n3ml 7esab eno ypreview el water bs w el electricity bs
  { path: 'ClientBills', component: ClientBillsComponent },
  { path: 'ClientProfile', component: ClientProfileComponent },
  { path: 'ProviderProfile', component: ProviderProfileComponent },
  { path: 'ProviderAddBundle', component: ProviderAddBundleComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
