import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import {Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import {Md5} from "md5-typescript";
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//import * as $ from 'jquery';
@Component({
  selector: 'app-registrationview',
  templateUrl: './RegistrationView.component.html'
  
})

export class RegistrationViewComponent implements OnInit {
  
  data:any; 
  Response:any;   
  titleAlert:string = 'can not be blank'; 
  res:any;
  rForm: FormGroup;
  msg:any="";
  item: any=[];
  listing:any='1';
  backbtn:any='1';
  CompanyRegister:any='1';
  RegistrationView:any='1'; 
  RegistrationUpdate:any='1';
  EditButton:any='1';
  public popoverTitle: string = 'Are You sure?';
  public popoverMessage: string = 'Are you really sure you want to approve this?';
  public popoverMessage1: string = 'Are you really sure you want to change status?';
  confirmText:any='Yes';
  cancelText:any='No';
  cutpanvalue:any='';
  // btnsubmit1:any='1';
  // btnsubmit:any='1';
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http:Http, 
    private JobpostService:JobpostService, 
    private https:HttpClientModule,
    private toasterService:ToastrService,
    private registService: RegistrationService
    ,private spinnerService:Ng4LoadingSpinnerService,
    private router:Router){
      

    }
    ngOnInit() {

      //this.GetAllState();
      this.rForm = this.formBuilder.group({
       'cname' :    ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
       'logintype': ['', Validators.required],
      'firstname' : ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
     
      'email' : ['', [Validators.required, , Validators.compose([CustomValidators.vaildEmail]),, Validators.compose([CustomValidators.removeSpaces])]],
      'mobile' : ['', [Validators.required, , Validators.compose([CustomValidators.validMobile])]],
      'username' :['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      // 'password' :['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'pancard' : ['', [Validators.nullValidator, Validators.compose([CustomValidators.validpanformate])]],
      
      'Designation' :['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      // 'gst':['', [Validators.required, Validators.compose([CustomValidators.validgdteenformate])]],
      gst: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.validgdteenformate]),Validators.compose([CustomValidators.removeSpaces])]],
    
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });

    
      this.viewdata();
   
  }

  companyregisterdata:any=[];
  Registration(data) {
   // alert(this.cutpanvalue);
    //alert(this.panvalue1);
    if(this.rForm.valid){
    this.item=localStorage.getItem('phpadminid');
     var adminid=JSON.parse(this.item);
     var cname=data.cname;
     var firstname=data.firstname;
     var lastname='Null';
     var email=data.email;
     var mobile=data.mobile;
     var username=data.username;
    //  var password= Md5.init(data.password);
     var logintype=data.logintype;
     var pancard=data.pancard;
     //alert(pancard);
     var gst=data.gst;
     var Designation=data.Designation;
     var StateiD=data.StateiD;
     var DistrictID=data.DistrictID;
     

     this.companyid=localStorage.getItem('companyid');
     var companyid=JSON.parse(this.companyid);
     this.cutpanvalue = gst.substr(2,10);
     //alert(this.cutpanvalue);

     var senddata = { 
              'Adminid': adminid,
              'Companyid':companyid,
              'Cname': cname, 
              'Firstname': firstname,
              'Lastname':lastname,
              'Email': email, 
              'Mobile': mobile, 
              'Username': username, 
              // 'Password': password, 
              'Logintype': logintype,
              'Pancard': pancard,
              'Gst': gst, 
              'Designation': Designation,
              'stateid':StateiD,
              'districtid':DistrictID
      }
        if(this.cutpanvalue == pancard ){
        this.JobpostService.Registrationupdate(senddata).subscribe(res => {
         this.Response = res;
         this.viewdata();
         });
         
          this.rForm.reset();
           this.toasterService.success("Company updated successfully");
          // this.router.navigate(['/Register']);
          this.RegistrationView='1';
          this.RegistrationUpdate='1';
          this.EditButton='1';
        }
        else{
         this.toasterService.error("PAN must be a part of GSTN"); 
        // this.rForm.controls['email'].setValue('');
        }
    }
      else{
        this.RegistrationUpdate='0';
        this.EditButton='1';
       // this.toasterService.error("All mendatory fields are required"); 
      }
    
     
    }
   
    approvecompanystatus:any=[];
    item1: any=[];
    ApproveCompany(){
      this.item=localStorage.getItem('phpadminid');
      var phpadminid=JSON.parse(this.item);
      this.item1=localStorage.getItem('companyid');
      var companyid=JSON.parse(this.item1);
      var senddata={phpadminid:phpadminid,companyid:companyid}
      this.JobpostService.ApproveCompany(senddata).subscribe(res => {
     
      this.approvecompanystatus = res;    
    
      if(this.approvecompanystatus !=null){
      
           this.approvecompanystatus =this.approvecompanystatus.Data;
             this.toasterService.success("Company Verified successfully");
             this.viewdata();
  
      }else{
            
             this.approvecompanystatus = [];
      }
    
    });

    // this.btnsubmit1='0';
    // this.btnsubmit='0';

    }

    disapprovecompanystatus:any=[];
   // item1: any=[];
    DisapproveCompany(){
      this.item=localStorage.getItem('phpadminid');
      var phpadminid=JSON.parse(this.item);
      this.item1=localStorage.getItem('companyid');
      var companyid=JSON.parse(this.item1);
      var senddata={phpadminid:phpadminid,companyid:companyid}
     // alert(JSON.stringify(senddata));
      this.JobpostService.DisapproveCompany(senddata).subscribe(res => {
     
      this.disapprovecompanystatus = res;    
    
      if(this.disapprovecompanystatus !=null){
      
           this.disapprovecompanystatus =this.disapprovecompanystatus.Data;
             this.toasterService.success("Company disapproved successfully");
             this.viewdata();
  
      }else{
            
             this.disapprovecompanystatus = [];
      }
    
    });

    
    }

   
  Getallcompanyregisterdata() {
    
    this.item=localStorage.getItem('phpadminid');
    var adminid=JSON.parse(this.item);
    var senddata={Adminid:adminid}  
    
    this.JobpostService.Getallcompanyregisterdata(senddata).subscribe(res => {
     
    this.companyregisterdata = res;    
    if(this.companyregisterdata !=null){
  
           this.companyregisterdata =this.companyregisterdata.Data;
           

    }else{
          
           this.companyregisterdata = [];
    }
  
  });
  
  }

    emailvalues = '';
    dbResponse:any;
    checkverifymail: boolean = false
    emailcheck(event: any){
      this.emailvalues = event.target.value;
      var emailsend=this.emailvalues;
      var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if(this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)){
       
       this.registService.CheckEmail(emailsend).subscribe(res => {
        this.Response = res;
        this.dbResponse=this.Response;
       
        
      if (this.dbResponse != null) {
        if (this.dbResponse.responseResult) {
          this.checkverifymail = true;
        }
        else {
          this.toasterService.error(this.dbResponse.message);
          this.checkverifymail = false;
          this.rForm.controls['email'].setValue('');
        }
      } else {
        this.toasterService.error(this.Response.message);
        this.checkverifymail = false;
        this.rForm.controls['email'].setValue('');
      }
    });
}
    }

usernamevalues = '';
checkverifyusername: boolean = false;
usernamecheck(event: any){
  this.usernamevalues = event.target.value;
  var usernamevalues=this.usernamevalues;
  
   this.registService.username_verification(usernamevalues).subscribe(res => {
    this.Response = res;
    this.dbResponse=this.Response;
   
  if (this.dbResponse != null) {
    if (this.dbResponse.responseResult) {
      this.checkverifyusername = true;
    }
    else {
      this.toasterService.error(this.dbResponse.message);
      this.checkverifyusername = false;
      this.rForm.controls['username'].setValue('');
    }
  } else {
    this.toasterService.error(this.Response.message);
    this.checkverifyusername = false;
    this.rForm.controls['username'].setValue('');
  }
});
}

//cutpanvalue:any='';
isGst:boolean=false;
gstvalues = '';
checkverifygst: boolean = false;
gstncheck(event: any){
  this.gstvalues = event.target.value;
  var gstvalues=this.gstvalues;

 // this.cutpanvalue = this.gstvalues.substr(2,10);
 // alert(this.cutpanvalue);
  var reggstin = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
  if(this.gstvalues.length == 15 && reggstin.test(this.gstvalues)){
   
   this.registService.CheckGstn(gstvalues).subscribe(res => {
    this.Response = res;
    this.dbResponse=this.Response;
   
    
  if (this.dbResponse != null) {
    if (this.dbResponse.responseResult) {
      this.checkverifygst = true;
    }
    else {
      this.toasterService.error(this.dbResponse.message);
      this.checkverifygst = false;
      this.rForm.controls['gst'].setValue('');
    }
  } else {
    this.toasterService.error(this.Response.message);
    this.checkverifygst = false;
    this.rForm.controls['gst'].setValue('');
  }
});
}
}
panvalue1:any='';
panvalues = '';
checkveriypan: boolean = false;
isPan:boolean=false;

pancheck(event: any){
 
  //this.panvalue1 = this.gstvalues.substr(0,10);
  //alert(this.panvalue1);
  this.panvalues = event.target.value;
  var panvalues=this.panvalues;
  this.panvalue1=event.target.value;
  var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  if(this.panvalues.length == 10 && regpan.test(this.panvalues)){
   
   this.registService.CheckPanCard(panvalues).subscribe(res => {
    this.Response = res;
    this.dbResponse=this.Response;
   
    
  if (this.dbResponse != null) {
    if (this.dbResponse.responseResult) {
      this.checkveriypan = true;
    }
    else {
      this.toasterService.error(this.dbResponse.message);
      this.checkveriypan = false;
      this.rForm.controls['pancard'].setValue('');
    }
  } else {
    this.toasterService.error(this.Response.message);
    this.checkveriypan = false;
    this.rForm.controls['pancard'].setValue('');
  }
});
}
}
mobilevalues = '';
checkveriymobile: boolean = false;
mobilecheck(event: any){
  this.mobilevalues = event.target.value;
  var mobilevalues=this.mobilevalues;
  var IndNum = /^[0]?[6789]\d{9}$/;
  if(this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)){
   this.registService.CheckMobile(mobilevalues).subscribe(res => {
    this.Response = res;
    this.dbResponse=this.Response;
   
    
  if (this.dbResponse != null) {
    if (this.dbResponse.responseResult) {
      this.checkveriymobile = true;
    }
    else {
      this.toasterService.error(this.dbResponse.message);
      this.checkveriymobile = false;
      this.rForm.controls['mobile'].setValue('');
    }
  } else {
    this.toasterService.error(this.Response.message);
    this.checkveriymobile = false;
    this.rForm.controls['mobile'].setValue('');
  }
});
}
}
    
   


  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  

  sendcomapnyid:any='';
  companyid:any='';
  companyregisterdatashow:any=[];
  viewdata(){
    this.listing         = '0';
    this.CompanyRegister = '0';
    this.backbtn='0';
    this.item=localStorage.getItem('phpadminid');
    var adminid=JSON.parse(this.item);
    this.companyid=localStorage.getItem('companyid');
    var companyid=JSON.parse(this.companyid);
   
    var senddata={Companyid:companyid,Adminid:adminid}  
    this.spinnerService.show();
    this.JobpostService.viewdata(senddata).subscribe(res => { 
      this.spinnerService.hide();
    this.companyregisterdatashow = res;    
    if(this.companyregisterdatashow !=null){
           this.companyregisterdatashow =this.companyregisterdatashow.Data;
    }else{  
           this.companyregisterdatashow = [];
    }
  
  });


    
  }
  BButton:any;
  Back()
  {

    this.RegistrationView='1'; 
    this.RegistrationUpdate='1';
    this.EditButton='1'; 
     this. BButton='1';
  }
   Dbresponse:any=[];
   companydata:any=[];
  EditCompanyRegis(){
    this.GetAllState();
    this.RegistrationView='0'; 
    this.RegistrationUpdate='0';
    this.EditButton='0'; 
    this.listing         = '0';
    this.CompanyRegister = '0';
    this.backbtn='0';
    this.item=localStorage.getItem('phpadminid');
    var adminid=JSON.parse(this.item);
    this.companyid=localStorage.getItem('companyid');
    var companyid=JSON.parse(this.companyid);
    var senddata={Companyid:companyid,Adminid:adminid}  
    this.JobpostService.viewdata(senddata).subscribe(res => { 
    this.Dbresponse = res;    
    if(this.Dbresponse !=null){
           this.companydata =this.Dbresponse.Data;
          //debugger
          
    }else{  
           this.companydata = [];
    }  
   
    this.rForm.controls['StateiD'].setValue(this.companydata[0].STATEID);
    this.rForm.controls['DistrictID'].setValue(this.companydata[0].DISTRICTID);
    this.rForm.controls['cname'].setValue(this.companydata[0].COMPANYNAME);
    if(this.companydata[0].PANCARD){
      this.rForm.controls['pancard'].setValue(this.companydata[0].PANCARD);
      this.isPan=true;
    }else{
      this.isPan=false;
    }

    if(this.companydata[0].GSTNO){
      this.rForm.controls['gst'].setValue(this.companydata[0].GSTNO);
      this.isGst=true;
    }else{
      this.isGst=false;
    }
    
    this.JobpostService.GetAllDistrict(this.companydata[0].STATEID).subscribe(res => {
      this.district1 = res
      
      if (this.district1) {
        this.district1 = this.district1.Data;
       
      }
    });
  });
    
}
 //  get All States
 states:any=[];
 GetAllState(){​
  this.JobpostService.GetAllStates().subscribe(res => {
  this.states = res
  if (this.states ) {
    this.states = this.states.Data;
    
  }
});
}


district1:any=[]; 
GetAllDistrict(event: any) {
  this.JobpostService.GetAllDistrict(event).subscribe(res => {
  this.district1 = res
  
  if (this.district1) {
    this.district1 = this.district1.Data;
   
  }
});
}

BackToRegistration(){
  this.router.navigate(['/Register',{ showdata:'true' }]);
}


}