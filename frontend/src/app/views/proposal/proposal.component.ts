// ** Angular Imports
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

// ** RxJS Imports
import { Observable, startWith, map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

// ** Service Imports
import { ProductService } from 'src/app/services/product.service';

// ** Type Imports
import { Product } from 'src/app/types/product';
import {
  Cart,
  CartPostRequest,
  ExposedSide,
  HingeSide,
} from 'src/app/types/cart';

// ** Third Party Imports
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.scss'],
})
export class ProposalComponent {
  // ** Autocomplete Vars
  productAutocompleteControl = new FormControl<Product | string>('');
  options: Product[];
  filteredOptions: Observable<Product[]>;

  // ** Table Vars
  dataSource = new MatTableDataSource<Cart>();
  displayedColumns: string[] = [
    'id',
    'quantity',
    'item',
    'hinge_side',
    'exposed_side',
    'price',
    'has_build',
    'total',
    'actions',
  ];
  hingeSides = Object.values(HingeSide);
  exposedSides = Object.values(ExposedSide);
  allBuildPrice: boolean = false;
  shouldAddTop: boolean = false;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    // Set products for autocomplete
    this._productService.getProducts().subscribe((result) => {
      this.options = result.products;

      this.filteredOptions = this.productAutocompleteControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options;
        })
      );
    });

    // Set cart data for table
    this._cartService.getCartData().subscribe((result) => {
      this.dataSource.data = result.cart;
      if (
        this.dataSource.data.every((cart) => cart.has_build) &&
        this.dataSource.data.length > 0
      ) {
        this.allBuildPrice = true;
      }
    });
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) ||
        option.code.toLowerCase().includes(filterValue)
    );
  }

  displayProduct(product: Product): string {
    return product ? `${product.name} (${product.code})` : '';
  }

  onProductSelect(selectedProduct: Product) {
    const productExists = this.dataSource.data.find(
      (product) => product.product_id === selectedProduct.id
    );

    if (productExists) {
      this._cartService
        .changeQuantity(productExists.id!, productExists.quantity + 1)
        .subscribe((result) => {
          const index = this.dataSource.data.findIndex(
            (product) => product.id === result.cart.id
          );
          this.dataSource.data[index] = result.cart;
          this.dataSource.data = this.dataSource.data;
        });
    } else {
      const newCartProduct: CartPostRequest = {
        product_id: selectedProduct.id,
        total: selectedProduct.price,
      };
      this._cartService.addToCart(newCartProduct).subscribe((result) => {
        this.shouldAddTop
          ? this.dataSource.data.unshift(result.cart)
          : this.dataSource.data.push(result.cart);

        this.dataSource.data = this.dataSource.data;
      });

      if (this.allBuildPrice) {
        this.allBuildPrice = false;
      }
    }

    this.productAutocompleteControl.setValue('');
  }

  onShouldAddTopChange() {
    this.shouldAddTop = !this.shouldAddTop;
  }

  onQuantityChange(cart: Cart, action: 'increase' | 'decrease') {
    if (action === 'decrease' && cart.quantity === 1) {
      this.onDelete(cart.id!);
      return;
    }

    this._cartService
      .changeQuantity(
        cart.id!,
        action === 'increase' ? cart.quantity + 1 : cart.quantity - 1
      )
      .subscribe((result) => {
        const index = this.dataSource.data.findIndex(
          (product) => product.id === result.cart.id
        );
        this.dataSource.data[index] = result.cart;
        this.dataSource.data = this.dataSource.data;
      });
  }

  onSideChange(
    cart: Cart,
    side: 'hinge_side' | 'exposed_side',
    value: HingeSide | ExposedSide
  ) {
    console.log({ cart, side, value });

    if (typeof value === 'undefined') {
      value = HingeSide.None;
    }

    this._cartService.changeSide(cart.id!, side, value).subscribe((result) => {
      const index = this.dataSource.data.findIndex(
        (product) => product.id === result.cart.id
      );
      this.dataSource.data[index] = result.cart;
      this.dataSource.data = this.dataSource.data;
    });
  }

  onBuildChange(cart: Cart) {
    this._cartService.toggleBuildPrice(cart).subscribe((result) => {
      if (!result.cart.has_build && this.allBuildPrice) {
        this.allBuildPrice = false;
      }

      const index = this.dataSource.data.findIndex(
        (product) => product.id === result.cart.id
      );
      this.dataSource.data[index] = result.cart;
      this.dataSource.data = this.dataSource.data;

      if (this.dataSource.data.every((cart) => cart.has_build)) {
        this.allBuildPrice = true;
      }
    });
  }

  onAllBuildChange(val: boolean) {
    this.allBuildPrice = val;
    this._cartService.toggleAllBuildPrice(val).subscribe((result) => {
      this.dataSource.data = result.cart;
    });
  }

  onDelete(id: number) {
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
        this._cartService.removeItem(id).subscribe((result) => {
          this.dataSource.data = this.dataSource.data.filter(
            (cart) => cart.id !== id
          );

          Swal.fire('Deleted!', result.message, 'success');
        });
      }
    });
  }
}
