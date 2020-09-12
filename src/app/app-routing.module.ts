import { ProductImportDetailComponent } from './order/product-import-detail/product-import-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductImportComponent } from './order/product-import/product-import.component';
import { StatisticalComponent } from './statistical/statistical.component';
import { CommentComponent } from './comment/comment.component';
import { CategoryComponent } from './category/category.component';
import { ProductReturnComponent } from './order/product-return/product-return.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOrderComponent } from './order/product-order/product-order.component';

const routes: Routes = [
  { path: 'loginAdmin', component: LoginComponent },
  { path: '', redirectTo: '/loginAdmin', pathMatch: 'full' },
  {
    path: 'homeAdmin',  component: HomeComponent,
    canActivate: [AuthGuard],   
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'product', component: ProductComponent },
      {
        path: 'order',
        children: [
          { path: '', redirectTo: 'list-order', pathMatch: 'full' },
          { path: 'list-order', component: ProductOrderComponent },
          { path: 'product-import', component: ProductImportComponent },
          { path: 'product-return', component: ProductReturnComponent },
          { path: 'product-import-detail',component: ProductImportDetailComponent }
        ],
      },
      { path: 'category', component: CategoryComponent },
      { path: 'comment', component: CommentComponent },
      { path: 'statistical', component: StatisticalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
