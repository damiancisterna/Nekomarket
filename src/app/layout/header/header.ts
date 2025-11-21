import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { UiStore } from '../../core/ui.store';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  cart = inject(CartService);
  ui   = inject(UiStore);
}
