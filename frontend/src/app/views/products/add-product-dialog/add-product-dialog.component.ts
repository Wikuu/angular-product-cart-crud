// ** Angular Imports
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// ** Service Imports
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent {
  // ** Vars
  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product | null }
  ) {
    const numericValidations = [
      Validators.required,
      Validators.min(0),
      Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
    ];

    this.productForm = this._fb.group({
      name: [this.getDefaultValue('name'), Validators.required],
      description: [this.getDefaultValue('description'), Validators.required],
      code: [this.getDefaultValue('code'), Validators.required],
      price: [this.getDefaultValue('price'), numericValidations],
      build_price: [this.getDefaultValue('build_price'), numericValidations],
    });
  }

  getDefaultValue(
    key: 'name' | 'description' | 'code' | 'price' | 'build_price'
  ) {
    return this.data.product?.[key] ?? '';
  }

  checkError(key: 'name' | 'description' | 'code' | 'price' | 'build_price') {
    return (
      this.productForm.get(key)?.invalid && this.productForm.get(key)?.touched
    );
  }

  submitHandler() {
    if (this.productForm.valid) {
      // If update
      if (this.data.product) {
        this._productService
          .updateProduct(this.data.product.id, {
            ...this.productForm.value,
            id: this.data.product.id,
          })
          .subscribe((result) => {
            this._dialogRef.close(result.product);
          });
      } else {
        this._productService
          .addProduct(this.productForm.value)
          .subscribe((result) => {
            this._dialogRef.close(result.product);
          });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
