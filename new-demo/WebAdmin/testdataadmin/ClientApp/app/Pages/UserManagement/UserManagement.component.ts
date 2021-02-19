import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../Services/jobpost.service';
import { UserManagementService } from '../../Services/UserManagement.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-UserManagement',
  templateUrl: './UserManagement.component.html'
})
export class UserManagementComponent implements OnInit {
  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you sure you want to delete';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  modalRef: BsModalRef;

  delay: boolean = false;
  viewfalse: any = 1;
  from: any;
  data: any;

  Response: any = [];
  alluserdetail: any = [];
  singleuserdetail: any = [];
  deleteuser: any = [];
  singleuserupdatedetails: any = [];
  singleusereditdetails: any = [];
  item: any;
  Usermanagementid: any;
  cardview: any = '1';
  formview: any = '1';
  singledetailsview: any = '1';
  Editview: any = '1';
  pageNumber: number = 0;
  rForm: FormGroup;
  FilterUsers: FormGroup;
  Userdata: any = '';
  Adminid: any;
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private registService: RegistrationService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private UserManagementService:UserManagementService,
    private router: Router) {
  }

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
        if(this.stopcall!=null){
        if (this.alluserdetail.length >= 10 && this.viewfalse == 1) {
          this.pageNumber = this.pageNumber + 1;
          this.AllUserRegistrationDetails(this.pageNumber, 'scroll', this.Userdata);
        }
      }
      }
    }
  }
  ngOnInit() {

      $('.page-filters h2 a').click(function () {
          $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
          $(this).parent().parent().find('.filter-wrapper').slideToggle();
      });
      $('.filter-toggle').click(function () {
          $('.filter-wrapper').slideToggle();
      });

    this.item = localStorage.getItem('phpadminid');
    this.Adminid = JSON.parse(this.item);

    this.rForm = this.formBuilder.group({
      'name': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, , Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'designation': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
    });

    this.FilterUsers = this.formBuilder.group({
      'Email': ['', Validators.nullValidator],
      'Mobile': ['', Validators.nullValidator],
      'JobKeyword': ['', Validators.nullValidator],
    });
    this.AllUserRegistrationDetails(0, '', this.FilterUsers);
  }

  // *************User Registration(Rajeev Jha on 5:2:19)*******
  UserRegistration(data) {
    // ********* Condition to remove the space *****************
    if (this.rForm.controls.name.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }

    if (this.rForm.controls.username.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }

    if (this.rForm.controls.designation.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }

    // ********* Condition to remove the space End Here **********

    if (this.rForm.valid) {
      var name = data.name;
      var email = data.email;
      var mobile = data.mobile;
      var username = data.username;
      var designatiom = data.designation
      var senddata = {
        'Adminid': this.Adminid,
        'Name': name,
        'Email': email,
        'Mobile': mobile,
        'Username': username,
        'Designation': designatiom
      }
      this.spinnerService.show();
      this.UserManagementService.UserRegistration(senddata).subscribe(res => {
        this.Response = res;
        if (this.Response.responseResult != false) {
          this.spinnerService.hide();
          this.Response = this.Response.message;
          this.rForm.reset();
          //this.toasterService.success("User has been saved successfully.");
          this.toasterService.success(this.Response);
          this.cardview = 1;
          this.formview = 1;
          this.AllUserRegistrationDetails(0, '', this.FilterUsers);
        } else {
          this.Response = [];
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
  }
  UserRegister() {
    this.viewfalse = 0;
    this.rForm.reset();
    this.cardview = 0;
    this.formview = 0;
  }
  Back() {
    this.cardview = 1;
    this.formview = 1;
    this.rForm.reset();
  }
  Close() {
    this.viewfalse = 1;
    this.cardview = 1;
    this.formview = 1;
    this.rForm.reset();
  }
  singleback() {
    this.cardview = '1';
    this.formview = '1';
    this.singledetailsview = '1';
  }
  updateback() {
    this.cardview = '1';
    this.singledetailsview = '1';
    this.Editview = '1';
  }

  
  id: any = '';
  SingleUserRegistrationDetails(id) {
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '0';
    this.id = id;
    localStorage.setItem('usermanagementid', JSON.stringify(id));
    var senddata = {
      'Adminid': this.Adminid,
      'Id': id
    }
    this.spinnerService.show();
    this.JobpostService.SingleUserRegistrationDetails(senddata).subscribe(res => {
      this.singleuserdetail = res;
      if (this.singleuserdetail != null) {
        this.spinnerService.hide();
        this.singleuserdetail = this.singleuserdetail.Data;
      } else {
        this.singleuserdetail = [];
        this.spinnerService.hide();
      }
    });
  }
  activeuser:any;
  ActiveInactiveeuser(id, status) {
    if (status == 1) {
      var userstatus = false;
    }
    else {
      userstatus = true;
    }
    this.stopcall='';
    var id = id;
    var senddata = {
      'Adminid': this.Adminid,
      'userId': id,
      "stataus": userstatus
    }
    let paramsend=JSON.stringify(senddata);
    this.activeuser={
      'HSTPLRequest':{
       'data':paramsend,
       'typeFor':'DeleteUserManagement'
      }

    }
    this.spinnerService.show();
    // this.JobpostService.Deletesingleuser(this.activeuser).subscribe(res => {
    //   this.deleteuser = res;
      this.JobpostService.Deletesingleuser(this.activeuser).subscribe(res => {
        this.deleteuser = res;
      if (this.deleteuser != null) {
        this.modalRef.hide();
        this.spinnerService.hide();
        this.deleteuser = this.deleteuser.Data;
        if (status == 0) {
          this.toasterService.success("User has been Active successfully.");
        } else {
          this.toasterService.success("User has been Inactive successfully.");
        }
        this.AllUserRegistrationDetails(0, '', this.Userdata);
      } else {
        this.deleteuser = [];
        this.spinnerService.hide();
      }
    });
  }
  userid: any;
  singleuserdata:any;
  SingleUseredit(id, ISACTIVE) {
    if (ISACTIVE == 1) {
      this.viewfalse = 0;
      this.cardview = '0';
      this.formview = '1';
      this.singledetailsview = '1';
      this.Editview = '0';
      this.userid = id;

      var senddata = {
        'Adminid': this.Adminid,
        'Mobile':'',
        'Email':'',
        'search':'',
        'Pagenumber':0,
        'userId': this.userid
      }
      let paramsend=JSON.stringify(senddata);
      this.singleuserdata = {
        'HSTPLRequest': {
           'data': paramsend,
           'typeFor': 'AdminGetUserManagement',
        }
      }
      this.spinnerService.show();
      this.JobpostService.SingleUseredit(this.singleuserdata).subscribe(res => {
        this.singleusereditdetails = res;
        if (this.singleusereditdetails.hstplResponse.data != null) {
          this.spinnerService.hide();
          this.singleusereditdetails = JSON.parse(this.singleusereditdetails.hstplResponse.data);
        } else {
          this.singleusereditdetails = [];
          this.spinnerService.hide();
        }
        this.rForm.controls['name'].setValue(this.singleusereditdetails[0].FIRSTNAME);
        this.rForm.controls['email'].setValue(this.singleusereditdetails[0].Email);
        this.rForm.controls['mobile'].setValue(this.singleusereditdetails[0].PHONENO);
        this.rForm.controls['username'].setValue(this.singleusereditdetails[0].USERNAME);
        this.rForm.controls['designation'].setValue(this.singleusereditdetails[0].DESIGNATION);
      });
    }
    else {
      this.toasterService.error("This user is Inactive");
    }
  }
  // Updateuser(data) {
  //   this.viewfalse = 0;
  //   if (this.rForm.controls.name.value.trim() == '') {
  //     this.toasterService.error("All mandatory fields are required.")
  //     return false;
  //   }
  //   if (this.rForm.controls.designation.value.trim() == '') {
  //     this.toasterService.error("All mandatory fields are required.")
  //     return false;
  //   }

  //   if (this.rForm.valid) {
  //     var usermanagementid = this.userid;
  //     var name = data.name;
  //     var email = data.email;
  //     var mobile = data.mobile;
  //     var username = data.username;
  //     var designatiom = data.designation
  //     var senddata = {
  //       'Adminid': this.Adminid,
  //       'Usermanagementid': usermanagementid,
  //       'Name': name,
  //       'Email': email,
  //       'Mobile': mobile,
  //       'Username': username,
  //       'Designation': designatiom
  //     }
  //     this.spinnerService.show();
  //     this.JobpostService.Updateuser(senddata).subscribe(res => {
  //       this.Response = res;
  //       if (this.Response != null) {
  //         this.spinnerService.hide();
  //         this.Response = this.Response.Data;
  //         this.rForm.reset();
  //         this.toasterService.success("User has been updated successfully.");
  //         this.viewfalse = 1;
  //         this.cardview = 1;
  //         this.Editview = 1;
  //         this.AllUserRegistrationDetails(0, '', this.Userdata);
  //       } else {
  //         this.Response = [];
  //         this.spinnerService.hide();
  //       }
  //     });
  //   }
  //   else {
  //     this.toasterService.error("All mendatory fields are required");
  //   }
  // }
  Updateuser(data) {
    this.viewfalse = 0;
    if (this.rForm.controls.name.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }
    if (this.rForm.controls.designation.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }
    this.stopcall="";

    if (this.rForm.valid) {
      var usermanagementid = this.userid;
      var name = data.name;
      var email = data.email;
      var mobile = data.mobile;
      var username = data.username;
      var designatiom = data.designation
      var senddata = {
        'Adminid': this.Adminid,
        // 'Usermanagementid': usermanagementid,
        'userId': usermanagementid,
        'Name': name,
        'Email': email,
        'Mobile': mobile,
        'Username': username,
        'Designation': designatiom
      }
      this.spinnerService.show();
      this.UserManagementService.UserRegistration(senddata).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.spinnerService.hide();
          this.Response = this.Response.Data;
          this.rForm.reset();
          this.toasterService.success("User has been updated successfully.");
          this.viewfalse = 1;
          this.cardview = 1;
          this.Editview = 1;
          this.AllUserRegistrationDetails(0, '', this.Userdata);
        } else {
          this.Response = [];
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
  }
  emailvalues = '';
  dbResponse: any;
  checkverifymail: boolean = false
  Emailcheck(event: any) {
    this.emailvalues = event.target.value;
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)) {
      var emailsend = this.emailvalues;
      var senddata = { Emailsend: emailsend }
      this.spinnerService.show();
      this.JobpostService.Emailcheck(senddata).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.Data[0].ACTION;
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          if (this.dbResponse != 1) {
            this.checkverifymail = true;
          }
          else {
            this.toasterService.error("Email already exist");
            this.checkverifymail = false;
            this.rForm.controls['email'].setValue('');
            this.spinnerService.hide();
          }
        }
      });
    }
  }
  usernamevalues = '';
  checkverifyusername: boolean = false;
  Usernamecheck(event: any) {
    this.usernamevalues = event.target.value;
    var usernamevalues = this.usernamevalues;
    var senddata = { Usernamevalues: usernamevalues }
    if (this.usernamevalues.length > 0) {
      this.spinnerService.show();
      this.JobpostService.Usernamecheck(senddata).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.Data[0].ACTION;
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          if (this.dbResponse == 0) {
            this.checkverifyusername = true;
          }
          else {
            this.toasterService.error("Username already exist");
            this.checkverifyusername = false;
            this.rForm.controls['username'].setValue('');
            this.spinnerService.hide();
          }
        }
      });
    }
  }
  mobilevalues = '';
  checkveriymobile: boolean = false;
  Mobilecheck(event: any) {
    this.mobilevalues = event.target.value;
    var mobilevalues = this.mobilevalues;
    var IndNum = /^[0]?[6789]\d{9}$/;
    var senddata = { Mobilevalues: mobilevalues }
    if (this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)) {

      this.JobpostService.Mobilecheck(senddata).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.Data[0].ACTION;
        if (this.dbResponse != null) {
          if (this.dbResponse == 0) {
            this.checkveriymobile = true;
          }
          else {
            this.toasterService.error("Mobile number already exist");
            this.checkveriymobile = false;
            this.rForm.controls['mobile'].setValue('');

          }
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
  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {

    this.modalRef.hide();
  }

  alluserdetailget: any = [];
  getfilterdata:any;
  Mobile: any = '';
  Email: any = '';
  JobKeyword: any = '';
  norecord:boolean=false;
  stopcall:any=[];
  AllUserRegistrationDetails(pageNumber, from, data) {
    this.id = 0;
    this.Userdata = data;
    if (this.Userdata.Email != undefined) {
      this.Email = this.Userdata.Email;
    }
    else {
      this.Email = '';
    }
    if (this.Userdata.JobKeyword != undefined) {
      this.JobKeyword = this.Userdata.JobKeyword;
    }
    else {
      this.JobKeyword = '';
    }
    if (this.Userdata.Mobile != undefined) {
      this.Mobile = this.Userdata.Mobile;
    }
    else {
      this.Mobile = '';
    }
    this.pageNumber = pageNumber
    var senddata = {
      'Adminid': this.Adminid,
      'Mobile': this.Mobile,
      'Email': this.Email,
      'search': this.JobKeyword,
      'Pagenumber': pageNumber,
      'userId':0,
    }
    let paramsend=JSON.stringify(senddata);
    this.getfilterdata = {
      'HSTPLRequest': {
        // 'clientKey':"",
         'data': paramsend,
         'typeFor': 'AdminGetUserManagement',
        //'lstImage': lstImage
      }
    }
    if (from == 'scroll') {
      this.spinnerService.show();
      this.JobpostService.AllUserRegistrationDetails(this.getfilterdata).subscribe(res => {
        this.dbResponse = res;
        
        if (this.dbResponse.hstplResponse.data != null) {
         // this.spinnerService.hide();
          this.alluserdetail = this.alluserdetail.concat(JSON.parse(this.dbResponse.hstplResponse.data));
          this.norecord=false;
        }
        
        this.delay = false;
        this.stopcall=this.dbResponse.hstplResponse.data;
        this.spinnerService.hide();
      });
    }
    else {
      this.spinnerService.show();
      this.JobpostService.AllUserRegistrationDetails(this.getfilterdata).subscribe(res => {
        this.dbResponse = res;
        if (this.dbResponse.hstplResponse.data != null) {
          this.spinnerService.hide();
          this.alluserdetail = JSON.parse(this.dbResponse.hstplResponse.data);
          this.norecord=false;
        } else {
          this.alluserdetail = [];
          this.spinnerService.hide();
          this.toasterService.error("No Record Found");
          this.norecord=true;
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }

  ResetUser() {
    this.FilterUsers.controls.Email.setValue('');
    this.FilterUsers.controls.Mobile.setValue('');
    this.FilterUsers.controls.JobKeyword.setValue('');
    this.AllUserRegistrationDetails(0, '', this.FilterUsers);
  }
}