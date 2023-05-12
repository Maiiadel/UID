import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FirebaseService } from 'src/app/shared/services/firebase.service';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
import { UsersService } from 'C:/Users/Mai/UI project/src/app/shared/services/users.service';
>>>>>>> parent of 8fa2cdf (;)

@Component({
  selector: 'app-provider-home',
  templateUrl: './provider-home.component.html',
  styleUrls: ['./provider-home.component.scss'],
})
export class ProviderHomeComponent implements OnInit {
  user: any;
  //providerName:string="Provider Khaled";
  constructor(private db: FirebaseService) {}
  ngOnInit(): void {
    this.user = this.db.user;
    console.log(
      `this.user['first_name'] = ${JSON.stringify(this.user['first_name'])}`
    );
  }
}
