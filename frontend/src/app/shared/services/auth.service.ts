import { Injectable, NgZone, Component } from '@angular/core';
import { User } from '../../components/models/User';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  usersList: any[] = [];
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private db: FirebaseService // private db: FirebaseService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        let uid = JSON.stringify(result.user?.uid);
        uid = uid.replace(/"/g, '');
        console.log(`uid result = ${uid}`);
        console.log(`the whole result = ${JSON.stringify(result.user)}`);
        // this.db.get_user(uid).subscribe((user) => {
        //   console.log('Entering firebaseService...' + user.first_name);
        // });

        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((Authuser: any) => {
          if (Authuser) {
            this.db.get_user(uid).subscribe((user: any) => {
              console.log(user);
              // console.log(Authuser);
              let user_type = user[uid].user_type;
              console.log(`user type  = ${user_type}`);

              this.db.setUser(user[uid]);
              this.db.get_unit_costs().subscribe((costs: any) => {
                this.db.unit_cost = costs;
              });

              if (user_type === 'client') {
                //bnshof ba2a 3ala 7asab el type bta3o ynavigate l anhi home page
                this.router.navigate(['/ClientHome']);
                //this.router.navigate(['/ClientHome/'+this.specificUser.id]); // da el routing el sa7
              } else if (user_type === 'provider') {
                this.router.navigate(['/ProviderHome']);
                // this.router.navigate(['/ProviderHome/'+ this.specificUser.id]); // da el routing elsa7
              }

              // this.router.navigate(['dashboard']);
            });
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    type: string,
    address: string,
    contact_number: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(
          first_name,
          last_name,
          result.user,
          type,
          address,
          contact_number
        );
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(
    first_name: string,
    last_name: string,
    user: any,
    type: string,
    address: string,
    contact_number: string
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(`user in set user data = ${user}`);

    const userData: User = {
      user_id: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      first_name: first_name,
      last_name: last_name,
      user_type: type,
      address: address,
      contact_number: contact_number,
      Total_elec_bills: 0,
      Total_subs: 0,
      Total_water_bills: 0,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    console.log('Signed out Entered');

    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
