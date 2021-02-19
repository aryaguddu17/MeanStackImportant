import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http'; 
import { JobpostService } from '../../Services/jobpost.service';
import { UpdateprofileService } from '../../Services/updateprofile.service';
import {Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Console } from '@angular/core/src/console';
@Component({  
  selector: 'app-CompanyViewComponent',
  templateUrl: './CompanyView.component.html',
})
export class CompanyViewComponent implements OnInit {
  DbResponse:any;
  profile:any;
  View: FormGroup;
  data:any;
  Response:any;
  candiIiD:any;
  designation:any;
  c_id:any;
  ShowData:any='0';
  docverify: FormGroup;
  update_company_profile: FormGroup;
  profiledata:any=[];
  pangst:any=[];
  pangstsend:any=[];
  PAN:any;
  cv: any = {};
  cid: any;
  ProfileResponce: any = {};
  viewProfile: boolean = false;
  viewProfiledata: any = {};
  hem:any={};
  documents:any;
  viewdatashow:any='1';
  updatadatashow:any='0';
  editdata:any='0';
  editProfileResponce: any = {};
  editProfiledata: any = {};
  allStates:any=[];
  states:any=[];
  allDistrict:any={};
  p: number = 1;
  companyviewshow:any='0';
  public popoverTitle: string = 'Are You sure?';
  public popoverMessage: string = 'Are you really sure you want to approve this?';
  public popoverMessage1: string = 'Are you really sure you want to change status?';
  confirmText:any='Yes';
  cancelText:any='No';
    updatepassword2:FormGroup;
    companyId:any;
    constructor(private formBuilder: FormBuilder,
    private http:Http, 
    private JobpostService:JobpostService, 
    private profileservice: UpdateprofileService,
    private https:HttpClientModule,
    private toastrService: ToastrService,
    private router:Router) { }
    onClicked(companyid:string){ 
      if(companyid!=''){  
      this.companyviewshow='1';
      this.companyId=companyid;
      this.viewdata();
      this.getCompanyId();
      }  
    }
    onbackregist()
    {
      this.companyviewshow='0';

    }
    ngOnInit() { 
      localStorage.removeItem('compid');
    }
    item:any;
    companyregisterdatashow:any=[];
    RegistrationView:any='0';
    viewdata(){
     this.item=localStorage.getItem('phpadminid');
      var adminid=JSON.parse(this.item);
      var senddata={Companyid:this.companyId,Adminid:adminid,PageNumber:0} 
      this.JobpostService.viewdata(senddata).subscribe(res => { 
      this.companyregisterdatashow = res;
      if(this.companyregisterdatashow !=null){
      this.companyregisterdatashow =this.companyregisterdatashow.Data;        
      }else{  
      this.companyregisterdatashow = [];
      } 
      
      this.RegistrationView='1';   
    });
    }   
  phpadminid: any=[];
  company:any=[];
  dbresponse:any=[];
  companydetails:any=[];
  dbresponse1:any=[];
  searchsts:boolean=false;
  companyid:any='';
  sendcomapnyid:any='';
  verifysts:any='';  
  getCompanyId(){
      this.companydetails=[];
      this.phpadminid=localStorage.getItem('phpadminid');
      var adminid=JSON.parse(this.phpadminid);
      this.JobpostService.GetCompanyDetails(this.companyId,adminid).subscribe(res => {
        this.dbresponse1 = res
        if(this.dbresponse1.lstCompanyProfile!=null){
          this.companydetails=this.dbresponse1.lstCompanyProfile;
          this.companydetails=this.companydetails[0];   
        }else{
          this.companydetails=this.dbresponse1.lstCompanyProfile1;
          this.companydetails=this.companydetails;
        }    
      });
  
  }
  Back(){
    this.viewdatashow='1';
    this.updatadatashow='0';
    this.editdata='0';
  }
  editBack(){
    this.viewdatashow='0';
    this.updatadatashow='1';
    this.editdata='0';
  }

  GetAllState(){
    this.profileservice.GetAllStates().subscribe(res => {
          this.allStates = res;
          if( this.allStates!=null){      
          this.states = this.allStates.Data;
          }
          else{
            this.allStates= [];
          }
    });
  }
  GetAllDistrict(event:any) {

    this.profileservice.GetAllDistricts(event).subscribe(res => {
      this.allDistrict = res;   
          if (this.allDistrict != null){
              this.allDistrict = this.allDistrict;
          }else {
            this.allDistrict=[];
          }
    });
  }   
 
} 