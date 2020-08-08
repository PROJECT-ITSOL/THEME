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
  // {path:'homeAdmin',component: HomeComponent}
  {
    path: 'homeAdmin',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {path:'',redirectTo:'customer',pathMatch:'full'},
      { path: 'customer', component: CustomerComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'product', component: ProductComponent },
      {
        path: 'order',
        component: OrderComponent,
        children: [
          { path: '', redirectTo: 'list-order', pathMatch: 'full' },
          { path: 'list-order', component: ProductOrderComponent },
          { path: 'product-import', component: ProductOrderComponent },
          { path: 'product-return', component: ProductReturnComponent },
        ],
      },
      { path: 'category', component: CategoryComponent },
      { path: 'comment', component: CommentComponent },
      { path: 'statistical', component: StatisticalComponent}, 
    ],
  },
  // {path:'/admin/home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
