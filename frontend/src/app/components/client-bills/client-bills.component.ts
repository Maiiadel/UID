import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

interface Bill {
  user_id: string;
  id: string;
  type: string;
  month: string;
  payment_method: string;
  cost: Number;
  usage: Number;
  due_date: Number;
  due_amount: Number;
  status: string;
}

const ELEMENT_DATA: Bill[] = [
  {
    user_id: 'string',
    id: '16552156',
    type: 'Water',
    month: 'May',
    payment_method: 'fawry',
    cost: 5411,
    usage: 45121,
    due_date: 15,
    due_amount: 0,
    status: 'unpaid',
  },
  {
    user_id: 'string',
    id: '4684651',
    type: 'Electricity',
    month: 'April',
    payment_method: 'fawry',
    cost: 8451,
    usage: 65152,
    due_date: 15,
    due_amount: 100,
    status: 'unpaid',
  },
  {
    user_id: 'string',
    id: '87415415',
    type: 'Water',
    month: 'May',
    payment_method: 'fawry',
    cost: 5411,
    usage: 45121,
    due_date: 15,
    due_amount: 0,
    status: 'unpaid',
  },
];

@Component({
  selector: 'app-client-bills',
  templateUrl: './client-bills.component.html',
  styleUrls: ['./client-bills.component.scss'],
})
export class ClientBillsComponent {
  displayedColumns: string[] = [
    'Bill ID',
    'Type',
    'Month',
    'Payment method',
    'Cost',
    'usage',
    'Due date',
    'Status',
    'Due amount',
    'Actions',
  ];

  new_bill_group!: FormGroup;
  show: boolean = false;
  bills_list: Bill[] = [];
  data = ELEMENT_DATA;

  new_bill_inserted: any = {};

  months: any = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'Augest',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  constructor(private db: FirebaseService) {
    console.log(`dataSource= ${this.data}`);

    this.new_bill_group = new FormGroup({
      bill_type_selected: new FormControl(),
      month_selected: new FormControl(),
      bill_amount: new FormControl(),
    });

    // try {
    //   this.bills_list = this.db.user['bills'];
    // } catch (error) {
    //   console.log(error);
    //   this.bills_list = [];
    // }
  }

  toggleFormShow() {
    this.show = !this.show;
  }

  calculateBill() {
    this.db.get_unit_costs().subscribe((unit_costs: any) => {
      console.log(
        `this.bill_type_selected = ${this.new_bill_group.value.bill_type_selected}`
      );

      let _bill_type_selected = this.new_bill_group.value.bill_type_selected;
      let _month_selected = Number(this.new_bill_group.value.month_selected);
      let _bill_amount = parseFloat(this.new_bill_group.value.bill_amount);
      let _bill_type = _bill_type_selected;

      if (_bill_type_selected === 'Electricity') {
        _bill_type_selected = 'electricity_unit_costs';
      } else if (_bill_type_selected === 'Water') {
        _bill_type_selected = "'water_unit_costs";
      }

      let unit_cost = unit_costs[_bill_type_selected];

      let today = new Date();
      console.log(`unit_cost['cost_per_unit'] = ${unit_cost['cost_per_unit']}`);

      let todayDateOfMonth = today.getDate();
      var _bill_cost: Number =
        _bill_amount * Number(unit_cost['cost_per_unit']);

      let due_amount_verified: boolean =
        todayDateOfMonth > unit_cost['due_day'];
      if (due_amount_verified) {
        _bill_cost += unit_cost['due_amount'];
      }
      console.log(`_bill_cost: ${_bill_cost}`);

      console.log(`this.db.user['user_id']: ${this.db.user['user_id']}`);

      let new_bill: Bill = {
        user_id: this.db.user['user_id'],
        id: '',
        type: _bill_type,
        month: this.months[_month_selected],
        payment_method: 'fawry',
        cost: _bill_cost,
        usage: _bill_amount + unit_cost['unit'],
        due_date: unit_cost['due_day'],
        due_amount: due_amount_verified ? unit_cost['due_amount'] : 0,
        status: 'unpaid',
      };
      // this.db.add_client_bill(this.new_bill_inserted).subscribe((data: any) => {
      //   console.log(data);
      //   this.bills_list.push(this.new_bill_inserted);
      //   Swal.fire({
      //     title: 'Bill Calculated and added to Bills ',
      //     icon: 'success',
      //   }).then();
      //   this.show = false;
      // });

      this.bills_list.push(new_bill);
    });
  }

  pay_bill(bill_id: string) {}
}
