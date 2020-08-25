import { from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { CommentComponent } from './comment/comment.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { ProductReturnComponent } from './order/product-return/product-return.component';
import { ProductImportComponent } from './order/product-import/product-import.component';
import { ProductOrderComponent } from './order/product-order/product-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomerComponent,
    SupplierComponent,
    ProductComponent,
    OrderComponent,
    CategoryComponent,
    CommentComponent,
    StatisticalComponent,
    ProductReturnComponent,
    ProductImportComponent,
    ProductOrderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
