import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'todo-list'
  }, {
    path: 'todo-list', component: TodoListComponent
  }, {
    path: 'todo-add', component: TodoAddComponent
  }, {
    path: 'csv-upload', component: CsvUploadComponent
  }, {
    path: 'products', component: ProductsComponent
  }, {
    path: 'add-product', component: AddProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
