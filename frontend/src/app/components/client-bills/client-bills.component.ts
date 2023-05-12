import { Component } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';  

@Component({
  selector: 'app-client-bills',
  templateUrl: './client-bills.component.html',
  styleUrls: ['./client-bills.component.scss']
})
export class ClientBillsComponent {
  show: boolean = false;
  billAmount: number = 0;

  showForm() {
    this.show = true;
  }
  calculateBill() {
    // Add your code to calculate the bill here
    // Swal.fire({
    //   title: 'Bill Calculated and added to Bills ',
    //   icon: 'success',
    // }).then();
    this.show = false;
  }
}
