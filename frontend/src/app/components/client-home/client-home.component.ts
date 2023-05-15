import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { User } from '../models/User';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
})
export class ClientHomeComponent implements OnInit {
  clientName: string = '';
  user: User = {};
  constructor(private db: FirebaseService) {}
  ngOnInit(): void {
    this.user = this.db.user;
    console.log(
      `this.user['first_name'] = ${JSON.stringify(this.user['first_name'])}`
    );
  }
}
