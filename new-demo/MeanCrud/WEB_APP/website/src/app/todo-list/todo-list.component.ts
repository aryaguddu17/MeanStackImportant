import { Component, OnInit } from '@angular/core';
import { TodoService } from './../services/todo.service';
import { FormValidateService } from '../shared/form-validate.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todoNewItems = [];
  public todoInProgressItems = [];
  public todoCompletedItems = [];
  constructor(private todoService: TodoService, private formValidateService: FormValidateService,
    ) { }

  ngOnInit() {
    this.getTodos();
  }

  //TODO_GET_SUCCESS Method
  public TODO_GET_SUCCESS(response: any): void {
    console.log(response.objResponse)
    this.todoNewItems = response.objResponse.todoNewItems;
    this.todoInProgressItems = response.objResponse.todoInProgressItems;
    this.todoCompletedItems = response.objResponse.todoCompletedItems;
  }

  public deleteTodo(id): void {
    this.todoService.Todo_Delete(id).subscribe(
      (response: any) => {
        console.log(response)
        this[response.objResponse.responseMethod](response);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  public TODO_DELETE_SUCCESS(response: any): void {
    console.log(response)
    this.getTodos();
  }

  public updateTodo(id, status): void {
    let updateObj = {
      Id: id,
      status: status
    }
    this.todoService.Todo_Update(updateObj).subscribe(
      (response: any) => {
        console.log(response)
        this[response.objResponse.responseMethod](response);
      }, (error: any) => {
        console.log(error);
      }
    )
  }

  //TODO_UPDATE_SUCCESS
  public TODO_UPDATE_SUCCESS(response): void {
    console.log(response);
    this.getTodos();
  }

  public getTodos(): void {
    this.todoService.Todo_Get().subscribe(response => {
      console.log('ssssssssss',response);
    });
    // this.todoService.Todo_Get().subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     this[response.objResponse.responseMethod](response);
    //   }, (error: any) => {
    //     console.log(error);
    //   }
    // )
  }

}
