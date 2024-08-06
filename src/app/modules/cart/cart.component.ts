// src/app/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthState, selectRole } from 'src/app/store/auth';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  private readonly destroy$ = new Subject<void>();

  constructor(private store: Store<AuthState>, private router: Router, private cartService: CartService) {
    this.store.select(selectRole).pipe(takeUntil(this.destroy$)).subscribe(value => {
      if(value && value !== 'user'){
       this.router.navigate(['/'])
      }
    });
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe((items) => {
      this.cartItems = items;
    });
  }
}
