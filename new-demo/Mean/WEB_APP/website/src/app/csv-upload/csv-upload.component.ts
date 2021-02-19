import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {
  public csvData = [];
  public p: number = 1;
  public filePath='';
  constructor(private service: TodoService,private toastr:ToastrService) { }

  ngOnInit() {
  }

  public upload(files: File[]): void {
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));

    // handleFileSelect(files)
    // function handleFileSelect(evt) {
    //   var f = evt.target.files[0]; // FileList object
    //   var reader = new FileReader();
    //   // Closure to capture the file information.
    //   reader.onload = (function (theFile) {
    //     return function (e) {
    //       var binaryData = e.target.result;
    //       //Converting Binary Data to base 64
    //       var base64String = window.btoa(binaryData);
    //       //showing file converted to base64Stringco
    //       console.log(base64String)
    //     };
    //   })(f);
    //   // Read in the image file as a data URL.
    //   reader.readAsBinaryString(f);
    // }

    this.service.CSV_Upload(formData).subscribe(
      (response: any) => {
        console.log(response)
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }

  public uploadCsv(): void {
    this.service.Insert_Csv().subscribe(
      (response: any) => {
        console.log(response)
        this.toastr.success(response.ResponseHeaderText,'Success');
        this.csvData = response.Data;
        this.filePath=response.ResponseMethod;
        console.log(this.filePath)
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    )
  }
}
