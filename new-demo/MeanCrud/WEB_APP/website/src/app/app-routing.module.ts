import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'todo-list'
  }, {
    path: 'todo-list', component: TodoListComponent
  }, {
    path: 'todo-add', component: TodoAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
