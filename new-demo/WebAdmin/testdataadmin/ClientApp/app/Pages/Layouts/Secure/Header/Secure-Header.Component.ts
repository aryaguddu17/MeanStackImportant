import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../../../Globals/app.config';
import { AuthenticationService } from '../../../../Services/authenticate.service';
import { NgProgress } from 'ngx-progressbar';
@Component({
  selector: 'app-SecureHeader',
  templateUrl: './Secure-Header.Component.html'
})
export class SecureHeaderComponent {
  UserInfo: any = {};
  Response: any = {};
  UpdatePasswordForm: FormGroup;
  sts: boolean = false;
  errmsg: any = '';
  firstname: any;
  fname: any = '';

  constructor(private http: HttpClient
    , private router: Router
    , private config: AppConfig
    , private _cookieService: CookieService
    , private toastrService: ToastrService
    , private modalService: BsModalService
    , private authenticationService: AuthenticationService
    , private spinnerService: Ng4LoadingSpinnerService
    , private appConfig: AppConfig
    , private formBuilder: FormBuilder
    , public ngProgress: NgProgress,

  ) { }

  ngOnInit() {
    this.firstname = localStorage.getItem('firstname');
    var firstname = JSON.parse(this.firstname);
    this.fname = firstname.replace(/['"]+/g, '');
    this.UserInfo = this.appConfig.UserInfo
    this.UpdatePasswordForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      reenter_new_password: ['', [Validators.required]]

    });
  }

  logout() {
    localStorage.removeItem('UserInfo');
    localStorage.clear();
    this._cookieService.deleteAll('UserInfo', this.config.DomainName);
    this.router.navigate(['/']);
  }

  checkCurrentPassword(event: any) {
    var currentpassword = event.target.value;
    this.authenticationService.CheckPassword(currentpassword)
      .subscribe(res => {
        this.Response = res;
        if (this.Response.responseResult == false) {
          this.errmsg = 'Wrong current password';
          this.sts = false;
          return false;
        } else {
          this.errmsg = '';
          this.sts = true;
        }
      });
  }

  UpdatePassword(resetpasswordformvalue) {
    if (resetpasswordformvalue.new_password != resetpasswordformvalue.reenter_new_password) {
      this.toastrService.error('Password and Confirm Password Did Not Matched');
      this.sts = false;
      return false;
    } else {
      this.sts = true;
    }
    this.authenticationService.ChangePassword(resetpasswordformvalue.current_password, resetpasswordformvalue.new_password, resetpasswordformvalue.reenter_new_password)
      .subscribe(res => {
        var response = res;
        if (response != null) {
          this.toastrService.success("Password updated successfully.");
          this.UpdatePasswordForm.reset();
          this.logout();
        } else {
          this.toastrService.error('something went wrong');
        }
      });
  }

  clearUpdatePasswordForm() {
    this.UpdatePasswordForm.reset();
  }
}