import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHomeComponent } from './provider-home.component';

describe('ProviderHomeComponent', () => {
  let component: ProviderHomeComponent;
  let fixture: ComponentFixture<ProviderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
