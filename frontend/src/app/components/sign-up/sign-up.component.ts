import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  SignUpForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
  ) {}
  ngOnInit() {
    this.SignUpForm = this.fb.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  // ngOnInit() {
  //   this.SignUpForm= new FormGroup({
  //     Fname:new FormControl( ['', [Validators.required, Validators.minLength(3)]]),
  //     email: new FormControl(['',[Validators.required, Validators.email]])}
  //   );
  // }
  onSubmit(myform: FormGroup) {
    Swal.fire({
      title: 'Successfully Signed Up',
      icon: 'success',
    }).then();
  }
}
