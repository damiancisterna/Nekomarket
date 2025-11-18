import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { UiStore } from '../../core/ui.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  cart = inject(CartService);
  ui   = inject(UiStore);
}
