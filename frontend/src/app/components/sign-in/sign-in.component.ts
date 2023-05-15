import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  SignInForm!: FormGroup;
  usersList: any = [];
  specificUser: any;
  userServ: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private db: FirebaseService
  ) {}
  ngOnInit() {
    //console.log('Sign in Entered');

    this.SignInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(myform: FormGroup, Email: string, Pswd: string) {
    this.authService.SignIn(Email, Pswd);
  }
}
