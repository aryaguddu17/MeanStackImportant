import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import {Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Console } from '@angular/core/src/console';
import { CompanyProfileService } from '../../Services/companyprofile.service';
@Component({
  selector: 'app-CompanyViewReport',
  templateUrl: './CompanyViewReport.component.html',
})
export class CompanyViewReportComponent implements OnInit {
  
  Response   : any={};
  PageNumber : number=1;
  ShowData   : any=[];
  companyId  : any;
  totalCompanyData:any=0;
  ShowAllCompany:boolean=true;
  goback:boolean;
  ShowDetail:boolean;
  isValid:boolean=true;
  count:any=1;
  constructor(private formBuilder   : FormBuilder
             ,private http          : Http
             ,private https         : HttpClientModule
             ,private toastrService : ToastrService
             ,private router        : Router 
             ,private CompanyProfileService:CompanyProfileService,

    
    ) { }


    
  ngOnInit() {
    this.GetCompanyData();
    }

 

  last:any=[]
  GetCompanyData(){
    // this.PageNumber=1;
    this.CompanyProfileService.GetAllCompany(this.count).subscribe(res =>{
      this.Response = res;
      if( this.Response!=null){
        if(this.Response.lstAppliedJobList!=''){
          this.ShowData         = this.Response.lstCompanyReport
          this.totalCompanyData = this.Response.lstCompanyReport[0].totalCompany;
         
         // console.log(this.ShowData)
         //alert(this.totalCompanyData);
          // this.count=[];
          // for(var i =0; i<(Math.ceil(this.totalCompanyData/10)); i++){
          //   this.count.push(i+1);
          //  this.last = i+1;
          // }
          
        }else{
          this.ShowData = [];
        }
      }
      else{
        this.Response= [];
      }
    });

  }

  SerialNumber:number=1; 
  Pagination(src){
   
    if(src==1){
      this.count++;
    }else{
      this.count--;
    }
    // this.SerialNumber = ((this.PageNumber)*this.count)+1;
    this.GetCompanyData();    
   }
   Previous(){
    this.count--;
    this.GetCompanyData();    
   }
  
   pagenumber:number=0;
   totalCompany:any=[];
   GetDataByCompany(companyId,pagenumber){
     
     this.CompanyProfileService.GetDataByCompany(companyId,this.pagenumber).subscribe(res =>{
      this.Response = res;
      if( this.Response!=null){
        if(this.Response.lstOpeningByCompanyId!=''){
          this.totalCompany = this.Response.lstOpeningByCompanyId;
        }
      }
      else{
        this.Response= [];
      }
     });
    this.ShowAllCompany=false;
    this.goback=true;
    this.ShowDetail=true;
   }

   backprofile(){
    this.ShowAllCompany=true;
    this.ShowDetail=false;
    this.goback=false;
   }
}
