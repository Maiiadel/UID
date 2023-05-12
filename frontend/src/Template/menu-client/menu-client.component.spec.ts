import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClientComponent } from './menu-client.component';

describe('MenuClientComponent', () => {
  let component: MenuClientComponent;
  let fixture: ComponentFixture<MenuClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
