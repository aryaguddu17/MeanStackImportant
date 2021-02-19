import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicGrid } from './grid.model';
import { FormGroup, FormArray, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  mode: boolean;
  touchedRows: any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.addRow();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }
  private saveUsername: boolean = true;
  discountper:number=0;
  initiateForm(): FormGroup {
    return this.fb.group({
      catalogid: ['', Validators.required],
      item: ['', [Validators.required]],
      itemdesc: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unitprice: ['',[Validators.required]],
      vattype: [''],
      isEditable: [true]
    });
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.push(this.initiateForm());
  }

  deleteRow(index: number) {
    const control =  this.userTable.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    group.get('isEditable').setValue(false);
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  subTotal:any=0;
  discount:any=0;
  vat:any=0;
  grandTotal:any=0;
  addDecimalDiscount:any=0;
  submitForm() {
    const control = this.userTable.get('tableRows') as FormArray;
    this.touchedRows = control.controls.filter(row => row.touched).map(row => row.value);
    var subTot=0;
    var vatValue=0;
    for(let i=0;i < this.touchedRows.length;i++){
      subTot +=parseFloat(this.touchedRows[i].unitprice);
      if(this.touchedRows[i].vattype =='included'){
        vatValue +=((17/ 100) * this.touchedRows[i].unitprice);
      }
    }

    this.subTotal=subTot;
    this.discount=((this.discountper/ 100) * this.subTotal).toFixed(2);
    this.vat=vatValue;
    var totalDiscount=(this.discount);
    this.grandTotal=(this.subTotal+this.vat)-totalDiscount;  
    var grandDecimal=(this.grandTotal % 1).toFixed(2);
    if(this.saveUsername ==false){
      var disc=parseFloat(this.discount);
      var grad=parseFloat(grandDecimal);
      this.addDecimalDiscount=disc + grad;
    }
  }

  toggleTheme() {
    this.mode = !this.mode;
  }
}
