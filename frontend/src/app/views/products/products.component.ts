// ** Angular Imports
import { Component, OnInit } from '@angular/core';

// ** Angular Material Imports
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// ** Component Imports
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';

// ** Type Imports
import { Product } from 'src/app/types/product';

// ** Service Imports
import { ProductService } from 'src/app/services/product.service';

// ** Third Party Imports
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productId: number | null;

  // ** Vars
  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'description',
    'price',
    'build_price',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();

  constructor(
    public dialog: MatDialog,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this._productService.getProducts().subscribe((products) => {
      this.dataSource.data = products.products;
    });
  }

  openDialog(id?: number) {
    id ? (this.productId = id) : (this.productId = null);

    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '100%',
      height: 'auto',
      data: {
        product: id
          ? this.dataSource.data.find((product) => product.id === id)
          : null,
      },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (!result) return;

      if (this.productId) {
        this.dataSource.data = this.dataSource.data.map((product) => {
          if (product.id === this.productId) {
            return result;
          } else {
            return product;
          }
        });
      } else {
        this.dataSource.data.push(result);
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(id).subscribe((result) => {
          this.dataSource.data = this.dataSource.data.filter(
            (product) => product.id !== id
          );

          Swal.fire('Deleted!', result.message, 'success');
        });
      }
    });
  }
}
