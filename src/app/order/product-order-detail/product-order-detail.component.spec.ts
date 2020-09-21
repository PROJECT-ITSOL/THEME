import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderDetailComponent } from './product-order-detail.component';

describe('ProductOrderDetailComponent', () => {
  let component: ProductOrderDetailComponent;
  let fixture: ComponentFixture<ProductOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
