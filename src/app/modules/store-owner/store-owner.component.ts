// src/app/store-owner/store-owner.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadProducts } from 'src/app/store/products';
import { selectAllProducts } from 'src/app/store/products';
import { ProductsState } from 'src/app/store/products';
import { ProductService } from '../../services/product.service';

declare var bootstrap: any;

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner.component.html',
  styleUrls: ['./store-owner.component.scss']
})
export class StoreOwnerComponent implements OnInit {
  products$: Observable<any[]>;
  addProductForm: FormGroup;

  constructor(
    private store: Store<ProductsState>,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    this.products$ = this.store.select(selectAllProducts);
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  openAddProductModal(): void {
    const modalElement = document.getElementById('addProductModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  onAddProduct(): void {
    if (this.addProductForm.valid) {
      const newProduct = this.addProductForm.value;
      // Add logic to send the new product to the server and update the state
      this.productService.addProduct(newProduct).subscribe(() => {
        this.store.dispatch(loadProducts());
        this.addProductForm.reset();
        const modalElement = document.getElementById('addProductModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      });
    }
  }

  onEdit(product: any): void {
    // Handle edit action
    console.log('edit ', product);
    
  }

  onDelete(productId: number): void {
    // Handle delete action
    console.log('delete ', productId);

  }
}
