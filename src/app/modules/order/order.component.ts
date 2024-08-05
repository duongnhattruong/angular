// src/app/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from 'src/app/store/products';
import { selectAllProducts } from 'src/app/store/products';
import { ProductsState } from 'src/app/store/products';
import { addToCart } from 'src/app/store/cart';
import { selectUsername } from 'src/app/store/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products: any = [];
  username = '';
  usernameDisplay = '';
  showAlert: boolean = false;

  constructor(private store: Store<ProductsState>, private router: Router) {
    this.store.select(selectAllProducts).subscribe(value => {
      if(value){
        this.products = value;
      }
    });

    this.store.select(selectUsername).subscribe(value => {
      if(value){
        this.username = value;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.usernameDisplay = localStorage.getItem("username") || '';
  }

  addToCart(id: string): void {
    console.log('add to cart ', id);
    
    this.store.dispatch(addToCart({ id }));
    this.showAlertMessage();
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }

  showAlertMessage(): void {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 700); 
  }
}