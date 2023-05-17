import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-client-bills',
  templateUrl: './client-bills.component.html',
  styleUrls: ['./client-bills.component.scss'],
})
export class ClientBillsComponent {
  new_bill_group!: FormGroup;
  show: boolean = false;

  constructor(private db: FirebaseService) {
    this.new_bill_group = new FormGroup({
      bill_type_selected: new FormControl(),
      month_selected: new FormControl(),
      bill_amount: new FormControl(),
    });
  }

  toggleFormShow() {
    this.show = !this.show;
  }

  calculateBill() {
    console.log(
      `this.bill_type_selected = ${this.new_bill_group.value.bill_type_selected}`
    );

    let _bill_type_selected = this.new_bill_group.value.bill_type_selected;
    let _month_selected = Number(this.new_bill_group.value.month_selected);
    let _bill_amount = Number(this.new_bill_group.value.bill_amount);

    if (_bill_type_selected === 'Electricity') {
      _bill_type_selected = 'electricity_unit_costs';
    } else if (_bill_type_selected === 'Water') {
      _bill_type_selected = "'water_unit_costs";
    }
    console.log(`_bill_type_selected: ${_bill_type_selected}`);

    let unit_cost = this.db.unit_cost[_bill_type_selected];

    let today = new Date();
    let todayDateOfMonth = today.getDate();

    console.log(`unit_cost['cost_per_unit']: ${unit_cost['cost_per_unit']}`);
    console.log(`_bill_amount: ${_bill_amount}`);
    var bill_cost = _bill_amount * unit_cost['cost_per_unit'];

    if (todayDateOfMonth > unit_cost['due_day']) {
      bill_cost += unit_cost['due_amount'];
      console.log(`bill_cost: ${bill_cost}`);
    }
    console.log(`bill_cost: ${bill_cost}`);

    Swal.fire({
      title: 'Bill Calculated and added to Bills ',
      icon: 'success',
    }).then();
    this.show = false;
  }
}
