import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPanel } from './cart-panel';

describe('CartPanel', () => {
  let component: CartPanel;
  let fixture: ComponentFixture<CartPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
