import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBillsComponent } from './client-bills.component';

describe('ClientBillsComponent', () => {
  let component: ClientBillsComponent;
  let fixture: ComponentFixture<ClientBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
