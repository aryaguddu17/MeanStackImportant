import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from './../services/todo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { FormValidateService } from '../shared/form-validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  public todoAddForm: FormGroup
  constructor(private todoService: TodoService, private formValidateService: FormValidateService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.createFormControls();
  }


  //form Controls
  public createFormControls(): void {
    this.todoAddForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  //submit todo details
  public submit(): void {
    if (this.todoAddForm.valid) {
      let todoDetails = {
        name: this.todoAddForm.value.name,
        description: this.todoAddForm.value.description,
        status: 'new'
      }
      this.todoService.Todo_Add(todoDetails).subscribe(
        (response: any) => {
          this[response.objResponse.responseMethod](response);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    } else {
      this.formValidateService.validateAllFormFields(this.todoAddForm)
    }
  }

  //TODO_ADD_SUCCESS
  public TODO_ADD_SUCCESS(response): void {
    console.log(response);
    this.toastr.success(response.objResponse.responseText,'Success');
    this.router.navigate(['/todo-list']);
  }

  //TODO_ADD_Fail
  public TODO_ADD_Fail(response): void {
    this.toastr.error(response.objResponse.responseText,'Error');
    console.log(response);
  }
}
