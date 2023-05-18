import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailAuthCredential } from 'firebase/auth';
import { NgModel } from '@angular/forms';
import { Item } from 'src/app/components/models/Item';
import { User } from 'src/app/components/models/User';
import { Bill } from 'src/app/components/models/Bill';
import { Bundle } from 'src/app/components/models/Bundle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  items: any;
  user: any;
  users: any;
  userType: any;
  unit_cost: any;

  readonly Root = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    this.items = this.http.get(this.Root + '/items');
    return this.items;
  }

  get_user(uid: string): Observable<User> {
    console.log('get_user in FirebaseService Entered');
    // const encodedEmail = encodeURIComponent(email);
    let url = this.Root + `/user/${uid}`;
    console.log(url);
    this.user = this.http.post(url, uid);
    // this.user = this.user[uid];
    console.log(this.user);
    console.log(`this.user[uid] = ${this.user[uid]}`);

    return this.user;
  }

  setUser(user: any) {
    this.user = {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type,
      email: user.email,
      address: user.address,
      contact_number: user.contact_number,
      Total_elec_bills: user.Total_elec_bills,
      Total_subs: user.Total_subs,
      Total_water_bills: user.Total_water_bills,
    };
  }

  get_unit_costs(): any {
    let url = this.Root + `/unit_costs`;
    console.log(url);
    let costs = this.http.get(url);
    this.unit_cost = { costs };
    return costs;
  }

  add_client_bill(new_bill: Bill): any {
    let url = this.Root + `/add_client_bill`;
    console.log(`new_bill: ${new_bill}`);

    let uid = this.user.user_id;
    let data = { uid, new_bill };
    console.log(url);
    let response = this.http.post<Bill>(url, new_bill);
    return response;
  }

  fetchUsers(): Observable<any> {
    this.users = this.http.get(this.Root + `/users`);
    return this.users;
  }
}
