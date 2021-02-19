import { TodoService } from './../services/todo.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Routes, Router } from '@angular/router';
import { FormValidateService } from '../shared/form-validate.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public addProductForm: FormGroup;
  constructor(private productService: ProductService, private multerService: TodoService, private routes: Router, private validateService: FormValidateService) { }

  ngOnInit() {
    this.createFormControls();
  }

  public submit(): void {
    if (this.addProductForm.valid) {
      let objProductAdd = {
        name: this.addProductForm.value.name,
        price: this.addProductForm.value.price
      }
      this.productService.addProduct(objProductAdd).subscribe(
        (response: any) => {
          this.routes.navigate(['/products']);
        }, (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
    } else {
      this.validateService.validateAllFormFields(this.addProductForm)
    }
  }

  public onImageSelect(files: File[]): void {
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.multerService.CSV_Upload(formData).subscribe(
      (response: any) => {
        console.log(response)
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  private createFormControls(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required])
    })
  }
}
