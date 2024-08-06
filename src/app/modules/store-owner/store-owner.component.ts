// src/app/store-owner/store-owner.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadProducts } from 'src/app/store/products';
import { selectAllProducts } from 'src/app/store/products';
import { ProductsState } from 'src/app/store/products';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { selectRole } from 'src/app/store/auth';
import { Route, Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-store-owner',
  templateUrl: './store-owner.component.html',
  styleUrls: ['./store-owner.component.scss']
})
export class StoreOwnerComponent implements OnInit {
  products$: Observable<any[]>;
  private readonly destroy$ = new Subject<void>();
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  currentProductId: number | null = null;
  productIdToDelete: number | null = null;

  constructor(
    private store: Store<ProductsState>,
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.products$ = this.store.select(selectAllProducts);
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });

    this.store.select(selectRole).pipe(takeUntil(this.destroy$)).subscribe(value => {
      if(value && value !== 'admin'){
       this.router.navigate(['/'])
      }
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
      this.productService.addProduct(newProduct).subscribe(() => {
        this.store.dispatch(loadProducts());
        this.addProductForm.reset();
        const modalElement = document.getElementById('addProductModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.toastr.success('Product added successfully!', 'Success');
      });
    }
  }

  openEditProductModal(product: any): void {
    this.currentProductId = product.id;
    this.editProductForm.patchValue(product);
    const modalElement = document.getElementById('editProductModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  onUpdateProduct(): void {
    if (this.editProductForm.valid && this.currentProductId !== null) {
      const updatedProduct = this.editProductForm.value;
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.store.dispatch(loadProducts());
        this.editProductForm.reset();
        const modalElement = document.getElementById('editProductModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        this.toastr.success('Product updated successfully!', 'Success');
      });
    }
  }

  onDelete(productId: number): void {
    if (window.confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.store.dispatch(loadProducts());
        this.toastr.success('Product deleted successfully!', 'Success');
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
