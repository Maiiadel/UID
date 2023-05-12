import { Component } from '@angular/core';

@Component({
  selector: 'app-provider-add-bundle',
  templateUrl: './provider-add-bundle.component.html',
  styleUrls: ['./provider-add-bundle.component.scss']
})
export class ProviderAddBundleComponent {
  show: boolean = false;
  Bundlename: number = 0;

  showForm() {
    this.show = true;
  }
  addBundle() {
    // Add your code to calculate the bill here
    // Swal.fire({
    //   title: 'Bill Calculated and added to Bills ',
    //   icon: 'success',
    // }).then();
    this.show = false;
  }
}
