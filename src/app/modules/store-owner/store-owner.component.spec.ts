import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOwnerComponent } from './store-owner.component';

describe('StoreOwnerComponent', () => {
  let component: StoreOwnerComponent;
  let fixture: ComponentFixture<StoreOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreOwnerComponent]
    });
    fixture = TestBed.createComponent(StoreOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
