/*

npm i -g @angular/cli
npm i --force
npm i
npm install @ng-bootstrap/ng-bootstrap@latest --force
npm install @angular-devkit/build-angular@latest --force
ng update @angular/core --force
npm install --legacy-peer-deps 

cd frontend
ng serve

ng serve --disable-host-check


*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { HeaderComponent } from '../Template/header/header.component';
import { FooterComponent } from '../Template/footer/footer.component';
import { MenuClientComponent } from '../Template/menu-client/menu-client.component';
import { MenuProviderComponent } from '../Template/menu-provider/menu-provider.component';
import { ClientHomeComponent } from './components/client-home/client-home.component';
import { ClientBillsComponent } from './components/client-bills/client-bills.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ProviderProfileComponent } from './components/provider-profile/provider-profile.component';
import { ProviderAddBundleComponent } from './components/provider-add-bundle/provider-add-bundle.component';
import { ProviderHomeComponent } from './components/provider-home/provider-home.component';

// Services
import { AuthService } from './shared/services/auth.service';
import { FirebaseService } from './shared/services/firebase.service';
// import { FirebaseApp } from '@angular/fire/app';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
    FooterComponent,
    MenuClientComponent,
    MenuProviderComponent,
    ClientHomeComponent,
    ClientBillsComponent,
    ClientProfileComponent,
    ProviderProfileComponent,
    ProviderAddBundleComponent,
    ProviderHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [AuthService, FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {
  title = 'Billing System ';
}
