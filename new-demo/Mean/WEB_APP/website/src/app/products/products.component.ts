import { FormValidateService } from './../services/form-validate.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any = [];
  public fileLocation: any = '';
  public updateProductForm: FormGroup;
  public id: any;
  public imageUrl: any;

  constructor(private productService: ProductService, private router: Router, public modalService: BsModalService, public modalRef: BsModalRef,
    private multerService: TodoService, private formValidateService: FormValidateService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log(response)
        this.products = response.data;
        this.fileLocation = "http://localhost:8080/api/image/";
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  public updateProductDetails(template: TemplateRef<any>, product: any): void {
    this.createFormControls(product);
    this.id = product._id;
    this.imageUrl = product.imageUrl;
    this.modalRef = this.modalService.show(template);
  }

  public submit(): void {
    if (this.updateProductForm.valid) {
      let obj = {
        id: this.id,
        name: this.updateProductForm.value.name,
        price: this.updateProductForm.value.price,
        imageUrl: this.imageUrl
      }
      this.productService.updateProduct(obj).subscribe(
        (response: any) => {
          console.log(response);
          this.modalRef.hide();
          this.getProducts();
        }, (error: HttpErrorResponse) => {
          console.log(error)
        }
      )
    } else {
      this.formValidateService.validateAllFormFields(this.updateProductForm)
    }
  }

  public deleteProduct(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe(
          (response: any) => {
            console.log(response);
            this.modalRef.hide();
            this.getProducts();
            this.toastr.success(response.objResponse.responseText,'Success');
          }, (error: HttpErrorResponse) => {
            console.log(error)
          }
        )
      }
    })
  }

  private createFormControls(product: any): void {
    this.updateProductForm = new FormGroup({
      name: new FormControl(product.name, [Validators.required]),
      image: new FormControl(product.imageUrl, [Validators.required]),
      price: new FormControl(product.price, [Validators.required])
    })
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
}
