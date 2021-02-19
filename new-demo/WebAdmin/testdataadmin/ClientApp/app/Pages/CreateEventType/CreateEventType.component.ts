import { Component, OnInit, HostListener,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {CreateEventTypeService } from '../../Services/CreateEventType.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-CreateEventType',
  templateUrl: './CreateEventType.component.html'
})

export class CreateEventTypeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private CreateEventTypeService:CreateEventTypeService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private router: Router) {
  }
  viewfalse: any = 1;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {

    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.SearchCreateETlistResultUse.length >= 10 && this.viewfalse == 1) {
          this.pageNumber = this.pageNumber + 1;
          this.SearchCreateETlist(this.pageNumber, 'scroll', this.searchkey);
        }
      }
    }
  }

  adminId: any;
  CreateET: FormGroup;
  FilterCreateET:FormGroup;
  CETUpdateform:FormGroup;
  cardview: any = '1';
  formview: any = '1';
  Editview: any = '1';
  ngOnInit() {
    
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));

    this.SearchCreateETlist(0,'',this.searchkey);

    this.CreateET = this.formBuilder.group({
      'name': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
    });

    this.FilterCreateET = this.formBuilder.group({
      'GsearchD': ['', Validators.nullValidator],
    });

    this.CETUpdateform = this.formBuilder.group({
      'nameupdate': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
    });
    this. cardview=1;
    this.formview=1;

  }

  CETName:any;
  CreateETRResponse:any=[];
  CreateETRResponseuse:any=[];
  evnettypecheck:any=1;

  CreateETR(formdata){//Use to submit the form data
    if (this.CreateET.controls.name.value.trim() == '') {
      this.toasterService.error("Please enter name.")
      return false;
    }
    if (this.CreateET.valid) {
      this.CETName = this.CreateET.controls.name.value;
     
      var senddata = {
        'eventName': this.CETName, 
        'createdBy': this.adminId,
        'eventTypeId':0
      }
      this.spinnerService.show();
      if(this.evnettypecheck==1){
      this.CreateEventTypeService.CreateETR(senddata).subscribe(res => {
        this.CreateETRResponse = res;
        if (this.CreateETRResponse != null) {
          this.spinnerService.hide();
          this.CreateETRResponseuse = this.CreateETRResponse.Data;
          this.CreateET.reset();
          this.toasterService.success("Event Type has been saved successfully.");
          this.cardview = 1;
          this.formview = 1;

          this.SearchCreateETlist(0,'',this.searchkey);

        } else {
          this.CreateETRResponse = [];
          this.spinnerService.hide();
        }
      });
    }
    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
    this.evnettypecheck++;
  }

  Close(){//Use to close the form OR also used for going back to create event type list
    this.cardview=1;
    this.formview=1;
    this.Editview=1;
  }

  OpenCreateETform(){//Use to open create event type form
    this.CreateET.reset();
    this.formview=0;
    this.cardview=0;
    this.evnettypecheck=1;

  }
  pageNumber: number = 0;
  from:any;
  data:any;
  SearchCreateETlistResult:any=[];
  SearchCreateETlistResultUse:any=[];
  searchkey:any;
  sendsearchdata:any;
  delay: boolean = false;
  
  SearchCreateETlist(pageNumber, from, data){//Use to search  from create event type list
    if(data!=null && data!=""){
     this.searchkey=data.GsearchD;
    }
    else{
      this.searchkey="";
    }
    
     this.pageNumber=pageNumber;

     this.sendsearchdata={
      'adminId': this.adminId,
      'searchKey': this.searchkey,
      'pageNumber': this.pageNumber,
    }
    if (from == 'scroll') {
      this.spinnerService.show();
      this.CreateEventTypeService.SearchCreateETlist(this.sendsearchdata).subscribe(res => {
        this.SearchCreateETlistResult = res;
        if (this.SearchCreateETlistResult != null) {
          this.spinnerService.hide();
          this.SearchCreateETlistResultUse = this.SearchCreateETlistResultUse.concat(this.SearchCreateETlistResult.lstAllEventType);
        }
        this.delay = false;
      });
    }
   else{
    this.spinnerService.show();
    this.CreateEventTypeService.SearchCreateETlist(this.sendsearchdata).subscribe(res => {
    this.SearchCreateETlistResult = res;
    if (this.SearchCreateETlistResult != null) {
      this.spinnerService.hide();
      this.SearchCreateETlistResultUse = this.SearchCreateETlistResult.lstAllEventType;
    } else {
      this.SearchCreateETlistResult = [];
      this.spinnerService.hide();
    }
    this.delay = false;
    this.from = '';
   });
  }
  this.from = '';
}

  ResetSearchCreateETlist(){//Use to reset the create event list filter

    this.SearchCreateETlist(0,'',"");

  }

  eventId:any;

  EditCreateET(item:any){//Use to edit the create event type
    var eventname=item.eventName;
    this.CETUpdateform.controls['nameupdate'].setValue(eventname);
    this.eventId=item.eventId;
    this. Editview=0;
    this.cardview=0;
  }

  CETNameUpdate:any;
  CreateETRResponseu:any=[];
  CreateETRResponseuuse:any=[];
  UpdateCET(updateformdata){//Use to update create event type
    if (this.CETUpdateform.controls.nameupdate.value.trim() == '') {
      this.toasterService.error("Please enter name.")
      return false;
    }
    if (this.CETUpdateform.valid) {
      this.CETNameUpdate = this.CETUpdateform.controls.nameupdate.value;
     
      var senddata = {
        'eventName': this.CETNameUpdate, 
        'createdBy': this.adminId,
        'eventTypeId':this.eventId
      }
      this.spinnerService.show();
      this.CreateEventTypeService.UpdateCET(senddata).subscribe(res => {
        this.CreateETRResponseu = res;
        if (this.CreateETRResponseu != null) {
          this.spinnerService.hide();
          this.CreateETRResponseuuse = this.CreateETRResponseu;
          this.CETUpdateform.reset();
          //this.toasterService.success("Event Type has been updated successfully.");
          this.toasterService.success(this.CreateETRResponseuuse.message);
          this.cardview = 1;
          this.formview = 1;
          this.Editview=1;

          this.SearchCreateETlist(0,'',this.searchkey);

        } else {
          this.CreateETRResponseu = [];
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
  }


  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {

    this.modalRef.hide();
  }

  Activeeventtype(item:any){//Used to active event type
   var eventId=item.eventId;
   var status=true;

   var senddata = {
       'adminId': this.adminId,
       'eventTypeId':eventId,
       'status':status
     }

   this.spinnerService.show();
   this.CreateEventTypeService.Incativeeventtype(senddata).subscribe(res => {
     this.IncativeeventtypeResult = res;
     if (this.IncativeeventtypeResult != null) {
       this.spinnerService.hide();
       this.IncativeeventtypeResultUse = this.IncativeeventtypeResult;
       this.modalRef.hide();
       this.SearchCreateETlist(0,'',this.searchkey);
     } else {
       this.IncativeeventtypeResult = [];
       this.spinnerService.hide();
     }
   });

  }


  IncativeeventtypeResult:any=[];
  IncativeeventtypeResultUse:any=[];

  Incativeeventtype(item:any){//Used to inactive event type
    var eventId=item.eventId;
    var status=false;

    var senddata = {
        'adminId': this.adminId,
        'eventTypeId':eventId,
        'status':status
      }

    this.spinnerService.show();
    this.CreateEventTypeService.Incativeeventtype(senddata).subscribe(res => {
      this.IncativeeventtypeResult = res;
      if (this.IncativeeventtypeResult != null) {
        this.spinnerService.hide();
        this.IncativeeventtypeResultUse = this.IncativeeventtypeResult;
        this.modalRef.hide();
        this.SearchCreateETlist(0,'',this.searchkey);
      } else {
        this.IncativeeventtypeResult = [];
        this.spinnerService.hide();
      }
    });

  }
  
}

  
 
 

  

 

 

 
 
  
 
 
 
  

  

 
 

 


  

  

  


  
 
 

  
  

 

 

 


  


 

 

  

  

 
 
 