import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderProfileComponent } from './provider-profile.component';

describe('ProviderProfileComponent', () => {
  let component: ProviderProfileComponent;
  let fixture: ComponentFixture<ProviderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
