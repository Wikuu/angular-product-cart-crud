// ** Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ** Route Import
import { AppRoutingModule } from './app-routing.module';

// ** Angular Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

// ** Component Imports
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { ProductsComponent } from './views/products/products.component';
import { ProposalComponent } from './views/proposal/proposal.component';
import { AddProductDialogComponent } from './views/products/add-product-dialog/add-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';

const ANGULAR_MATERIAL_MODULES = [
  BrowserAnimationsModule,
  MatInputModule,
  MatGridListModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatChipsModule,
];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SidebarComponent,
    ContentComponent,
    ProductsComponent,
    ProposalComponent,
    AddProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...ANGULAR_MATERIAL_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
