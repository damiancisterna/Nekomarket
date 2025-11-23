import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../../core/cart.service';
import { UiStore } from '../../core/ui.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  cart = inject(CartService);
  ui   = inject(UiStore);
  private router = inject(Router);

  searchTerm = '';

  onSearch(): void {
    const term = this.searchTerm.trim();
    this.router.navigate(['/'], {
      queryParams: term ? { q: term } : {}
    });
  }
}
