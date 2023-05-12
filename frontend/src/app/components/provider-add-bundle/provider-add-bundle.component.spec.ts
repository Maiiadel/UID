import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAddBundleComponent } from './provider-add-bundle.component';

describe('ProviderAddBundleComponent', () => {
  let component: ProviderAddBundleComponent;
  let fixture: ComponentFixture<ProviderAddBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAddBundleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderAddBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
