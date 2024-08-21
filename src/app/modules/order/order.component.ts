// src/app/order/order.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { loadProducts, loadProductsByPage } from 'src/app/store/products';
import { selectAllProducts } from 'src/app/store/products';
import { ProductsState } from 'src/app/store/products';
import { addToCart, resetIsSuccessful, selectIsAddToCartSuccessful } from 'src/app/store/cart';
import { AuthState, selectRole, selectUsername } from 'src/app/store/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  products: any = [];
  username = '';
  showAlert: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 8;
  private readonly destroy$ = new Subject<void>();

  constructor(private store: Store<AuthState>, private router: Router, private route: ActivatedRoute) {
    this.store.select(selectAllProducts).pipe(takeUntil(this.destroy$)).subscribe(value => {
      if(value){
        this.products = value;
      }
    });

    this.store.select(selectUsername).pipe(takeUntil(this.destroy$)).subscribe(value => {
      if(value){
        this.username = value;
      }
    });

    this.store.select(selectRole).pipe(takeUntil(this.destroy$)).subscribe(value => {
      if(value && value !== 'user'){
       this.router.navigate(['/'])
      }
    });

    this.route.queryParams.subscribe(params => {
      if(params) {
        this.pageSize = params['pageSize'];
        this.pageNumber = params['pageNumber'];
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProductsByPage({pageNumber: this.pageNumber, pageSize: this.pageSize}));
    this.store.select(selectIsAddToCartSuccessful).subscribe(value => {
      if(value){
        this.showAlertMessage();
      }
    })
  }

  addToCart(id: string): void {
    console.log('add to cart ', id);
    this.store.dispatch(addToCart({ id }));
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


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(resetIsSuccessful());
  }
}