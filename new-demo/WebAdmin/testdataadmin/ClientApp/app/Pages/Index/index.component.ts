import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
//import { JobpostService } from '../../Services/jobpost.service';
import { LoginService } from '../../Services/Login.service';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { environment } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-indexComponent',
  templateUrl: './index.component.html',

})
export class IndexComponent {
  modalRef: BsModalRef;
  rForm: FormGroup;
  otpForm: FormGroup;
  data: any;
  Response: any;
  msg: any = "";
  dbResponse: any;
  isUserLoggedIn: any;
  senddata: any = {};
  Items: any = '';
  otpResponse: any;
  count: any = 1;
  otpVerify: any;
  resendOtp: any;
  CompanyRegister: any = '1';
  show1: any = '1';
  hide1: any = '1';
  isProduction: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: Http,
    private LoginService: LoginService,
    private https: HttpClientModule,
    private router: Router,
    private toasterService: ToastrService,
    private modalService: BsModalService,
    private spinnerService: Ng4LoadingSpinnerService,
    private formBuilder: FormBuilder,
  ) {

    this.rForm = fb.group({
      'username': [null, Validators.required],
    });
  }
  ngOnInit() {

    this.otpForm = this.formBuilder.group({
      'otp': [null, Validators.required],
    });
    this.isProduction = environment.production;
  }

  modalRef_hide() {
    this.count = 1;
    this.modalRef.hide();
    this.otpForm.controls['otp'].setValue('');
  }

  mobile: any;
  userdata: any;
  otp: any;
  message: any;
  login(template: TemplateRef<any>) {//use to validate username(Rajeev Jha-1174)
    const postData = {
      'userName': (this.rForm.value.username).trim()
    }
    if (this.count == 1) {
      this.spinnerService.show();
      this.LoginService.login(postData).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.lstAdmLoginDetail[0];
        if (this.Response.status != false) {
          if (this.dbResponse.id != null && this.dbResponse.isactive == true) {
            // this.spinnerService.hide();
            this.userdata = this.Response.lstAdmLoginDetail[0];
            var adminid = this.Response.lstAdmLoginDetail[0].id;
            localStorage.setItem('phpadminid', JSON.stringify(adminid));
            var firstName = this.Response.lstAdmLoginDetail[0].firstName;
            localStorage.setItem('firstname', JSON.stringify(firstName));
            this.rForm.reset();
            this.modalRef = this.modalService.show(template,
              { backdrop: 'static', keyboard: false, class: 'roj-admin-login-otp' });
            const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
            this.mobile = this.userdata.mobile.trim();
            if (this.isProduction) {
              this.senddata = { 'Mobile': this.mobile, isProduction: this.isProduction };
              this.sendSms();
            }
            else {
              this.senddata = { 'Mobile': this.mobile, isProduction: this.isProduction };
              this.sendSms();
            }
          }
          else {
            this.count = 1;
            this.rForm.reset();
            this.toasterService.error("Invalid username");
            this.spinnerService.hide();
          }
        }

        else {
          this.count = 1;
          this.rForm.reset();
          this.toasterService.error("Invalid username");
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.rForm.reset();
      this.spinnerService.hide();
      // this.modalRef.hide();
    }
    this.count++;
  }

  gotoRegister() {
    this.router.navigate(['/Register']);
  }

  setItem(item: any) {
    var jobTitle = item.jobTitle;
    var companyName = item.companyName;
    var jobDescription = item.jobDescription;
    localStorage.setItem('item', JSON.stringify(item));
  }
  sendSms() {//use to send sms(Rajeev Jha-1174)
    // this.spinnerService.show();
    this.LoginService.AdminSendSms(this.senddata).subscribe(res => {
      this.otpResponse = res;
      if (this.otpResponse != null) {
        this.spinnerService.hide();
        this.toasterService.success("OTP has been send to register mobile number");
      }
      else {
        this.otpResponse = [];
        this.spinnerService.hide();
      }
    });
  }

  // SendOtp() {
  //   this.LoginService.AdminSendSms(this.senddata).subscribe(res => {
  //     this.otpResponse = res;
  //     if (this.otpResponse != null) {
  //       this.toasterService.success("OTP has been send to register mobile number ");
  //     }
  //     else {
  //       this.otpResponse = [];
  //     }
  //   });
  // }

  VerifyOtp(otp: any) {//use to verify otp(Rajeev Jha-1174)
    this.mobile = this.userdata.mobile;
    var otp = otp.otp;
    var senddata = { "OTP": otp, "MobileNo": this.mobile }
    this.spinnerService.show();
    this.LoginService.AdminCheckOTP(senddata).subscribe(res => {
      this.otpVerify = res
      if (this.otpVerify.responseResult != false) {
        this.spinnerService.hide();
        this.otpForm.reset();
        this.toasterService.success("OTP has been verified successfully ");
        this.router.navigate(['/Dashboard']);
        this.modalRef.hide();
      } else {
        this.otpForm.reset();
        this.toasterService.error("Invalid otp");
        this.spinnerService.hide();
      }
    });
  }

  counter: number = 20;
  status: boolean = false;
  CountOtp: any = 1;
  ResendOtp(otp: any) {//use to resend otp(Rajeev Jha-1174)
    if (this.CountOtp == 1) {
      if (this.isProduction) {
        this.spinnerService.show();
        this.LoginService.AdminSendSms(this.senddata).subscribe(res => {
          this.resendOtp = res
          let intervalId = setInterval(() => {
            this.counter = this.counter - 1;
            if (this.counter === 0)
              clearInterval(intervalId)
          }, 1000)

          this.status = true;
          this.show1 = 0;
          this.hide1 = 0;

          setTimeout(() => {
            this.status = false;
            this.CompanyRegister = 1;
            this.show1 = 1;
            this.hide1 = 1;
          }, 20000)
          if (this.status = true) {
            this.CountOtp = 0;
            this.CompanyRegister = 0;
          }
        })
        this.toasterService.success("OTP has been send to register mobile number ");
        this.counter = 20;
        this.spinnerService.hide();
      }


      else {
        this.spinnerService.show();
        this.LoginService.AdminSendSms(this.senddata).subscribe(res => {
          this.resendOtp = res

          let intervalId = setInterval(() => {
            this.counter = this.counter - 1;

            if (this.counter === 0)
              clearInterval(intervalId)

          }, 1000)

          this.status = true;
          this.show1 = 0;
          this.hide1 = 0;

          setTimeout(() => {
            this.status = false;
            this.CompanyRegister = 1;
            this.show1 = 1;
            this.hide1 = 1;
          }, 20000)
          if (this.status = true) {
            this.CountOtp = 0;
            this.CompanyRegister = 0;
          }
          this.toasterService.success("OTP has been send to register mobile number ");
          this.spinnerService.hide();
        })
      }
      this.counter = 20;

    }
    this.CountOtp++;
  }

}




