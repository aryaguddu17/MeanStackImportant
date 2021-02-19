import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { UserInfoService } from '../../Services/userInfo.service.';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-SuscribeUser',
  templateUrl: './SuscribeUser.component.html'
})
export class SuscribeUserComponent implements OnInit {
  modalRef: BsModalRef;
  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you sure you want to delete';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  data: any;
  Response: any = [];
  alluserdetail: any = [];
  item: any;
  cardview: any = '1';
  pageNumber: number = 0;
  FilterJob: FormGroup;
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private userinfoService: UserInfoService,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private registService: RegistrationService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private modalService: BsModalService
  ) {
  }
  ngOnInit() {
    // $('.page-filters h2 a').click(function () {
    //   $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
    //   $(this).parent().parent().find('.filter-wrapper').slideToggle();
    // });
    // $('.filter-toggle').click(function () {
    //   $('.filter-wrapper').slideToggle();
    // });
    this.FilterJob = this.formBuilder.group({
      'Email': ['', Validators.nullValidator],
      'Mobile': ['', Validators.nullValidator],
      'JobKeyword': ['', Validators.nullValidator],
    })
    this.GetFilter(this.pageNumber, '', this.copydata);
  }
  viewfalse: any = '1';
  delay: boolean = false;
  postion: any;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      this.postion = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.alluserdetail.length >= 10 && this.viewfalse == '1') {
          this.pageNumber = this.pageNumber + 1;
          this.GetFilter(this.pageNumber, 'scroll', this.copydata);
        }
      }
    }
  }

  Dbresopnse: any = [];
  from: any;
  senddatafilter: any = [];
  ShowPushData: any;
  search: any;
  copydata: any = '';
  Email: any = '';
  Mobile: any = '';
  JobKeyword: any = ''
  GetFilter(pageNumber, isScrol: any, data) {
    this.from = isScrol;
    this.copydata = data;
    //this.search = search;

    // this.ShowPushData = {
    //   "Mobile": this.FilterJob.value.Mobile != '' ? this.FilterJob.value.Mobile : "",
    //   "Email": this.FilterJob.value.Email != '' ? this.FilterJob.value.Email : "",
    //   "Search": this.FilterJob.value.JobKeyword != '' ? this.FilterJob.value.JobKeyword : "",
    // };

    if (data.Email != undefined) {
      this.Email = data.Email.trim();
    } else {
      this.Email = '';
    }

    if (data.Mobile != undefined) {
      this.Mobile = data.Mobile.trim();
    } else {
      this.Mobile = '';
    }

    if (data.JobKeyword != undefined) {
      this.JobKeyword = data.JobKeyword.trim();
    } else {
      this.JobKeyword = '';
    }
    if (pageNumber == 0) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = pageNumber;
    }

    var senddata = {
      "Mobile": this.Mobile, "Email": this.Email, "Search": this.JobKeyword, "Pagenumber": pageNumber
    }

    // this.senddatafilter = {
    //   "Mobile": this.FilterJob.value.Mobile != ''&&this.FilterJob.value.Mobile !=null  ? this.FilterJob.value.Mobile : "",
    //   "Email": this.FilterJob.value.Email != '' && this.FilterJob.value.Email != null ? this.FilterJob.value.Email : "",
    //   "Search": this.FilterJob.value.JobKeyword != '' && this.FilterJob.value.JobKeyword !=null? this.FilterJob.value.JobKeyword : "",
    //   "Pagenumber": pageNumber
    // };

    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.userinfoService.GetEmpSubscriptionDetails(senddata).subscribe(res => {
        this.Dbresopnse = res;
        if (this.Dbresopnse != null) {
          this.spinnerService.hide();
          this.alluserdetail = this.alluserdetail.concat(this.Dbresopnse.lstSubscriptionDetails);
          this.from = 'scroll';
        } else {
          this.alluserdetail = [];
          this.spinnerService.hide();
        }
        this.from = '';
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.userinfoService.GetEmpSubscriptionDetails(senddata).subscribe(res => {
        this.Dbresopnse = res;
        this.alluserdetail = this.Dbresopnse.lstSubscriptionDetails;
        if (this.alluserdetail.length > 0) {
          this.alluserdetail = this.Dbresopnse.lstSubscriptionDetails;
          this.spinnerService.hide();
        } else {
          this.alluserdetail = [];
          this.toasterService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  subscibeId: any;
  subcribeuserdata: any = [];
  openModal(template: TemplateRef<any>, subscibeid: any) {
    this.subcribeuserdata = [];
    this.subscibeId = subscibeid;
    this.getsubscribuserdetails();
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'candidate-view-modal modal-lg' }
      ));
  }
  getsubscribuserdetails() {
    this.spinnerService.show();
    this.userinfoService.GetAdminCompanyDetailBySubscriptionId(this.subscibeId).subscribe(res => {
      this.Dbresopnse = res;
      if (this.Dbresopnse != null) {
        this.spinnerService.hide();
        this.subcribeuserdata = this.Dbresopnse.lstCompanyDetailByCompanyId[0];
      } else {
        this.subcribeuserdata = [];
        this.spinnerService.hide();
      }
    });
  }
  resetcall() {
    this.subscibeId = 0;
    this.copydata = [];
    this.GetFilter(this.pageNumber, '', this.copydata);
  }
}