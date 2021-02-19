import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from '../../../Globals/app.config';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../../Validators/custom-validator.directive';
import { BsModalRef } from 'ngx-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Options } from 'ng5-slider';
import { JobpostService } from '../../../Services/jobpost.service';
import { MasterService } from '../../../Services/master.service';
import { from } from 'rxjs/observable/from';
import { RegistrationService } from '../../../Services/registration.service';
import { CompanyProfileService } from '../../../Services/companyprofile.service';
import * as $ from 'jquery';
import { combineAll } from 'rxjs/operators';


@Component({
  selector: 'app-Common-Layout',
  templateUrl: './Common-Layout.Component.html'
})

export class CommonLayoutComponent implements OnInit {
  item: any = [];
  FilterJob: FormGroup;
  ShowFilter: any = '1';
  Showpushdata: any = '0';
  logintype: number = 0;
  StateiD: number = 0;
  DistrictID: any = '';
  JobKeyword: any = '';
  ShowPushData: any = {};
  PushData: any = {};
  jobdetail: any = [];
  senddatafilter: any = [];
  adminId: any;
  PageNumber: number = 0;
  Response: any = [];
  AreaResponce: any = {};
  bgcolor: string = 'grey';

  @Input() result: string = "";
  @Output() clicked = new EventEmitter<string>();
  @Output() backcliked = new EventEmitter<string>();
  constructor(
    private authenticationService: AuthenticationService
    , private cookieService: CookieService
    , private router: Router
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private spinnerService: Ng4LoadingSpinnerService
    , private JobpostService: JobpostService
    , private MasterService: MasterService
    , private toastrService: ToastrService
    , private CompanyProfileService: CompanyProfileService
    , private registService: RegistrationService
  ) {
  }
  redirection: any;
  redirect: any;
  ngOnInit() {
    this.compid = localStorage.getItem('compid');
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });

    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.GetFilter(this.PageNumber, '', 'init');
    this.hrefurl = '1';
    this.GetAllState();
  }

  companyregisterdata: any = [];
  from: any;
  DbResponce: any = [];

  GetFilterSearch(pageNumber, isScrol: any, src) {
    this.pageNumber = 0;
    this.GetFilter(pageNumber, isScrol, src);

  }

  GetFilter(pageNumber, isScrol: any, src) {
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdata = '1';
    }
    this.from = isScrol;
    this.item = localStorage.getItem('phpadminid');
    if (this.FilterJob.value.logintype != '') {
      this.logintype = this.FilterJob.value.logintype;
    } else {
      this.logintype = 0;
    }
    if (this.FilterJob.value.StateiD != '') {
      this.StateiD = this.FilterJob.value.StateiD;
    } else {
      this.StateiD = 0;
    }
    if (this.FilterJob.value.DistrictID != '') {
      this.DistrictID = this.FilterJob.value.DistrictID;
    } else {
      this.DistrictID = 0;
    }
    if (this.FilterJob.value.JobKeyword != '') {
      this.JobKeyword = this.FilterJob.value.JobKeyword;
    } else {
      this.JobKeyword = 0;
    }

    let statedid;
    let districtid;
    statedid = this.FilterJob.value.StateiD;
    districtid = this.FilterJob.value.DistrictID;
    let statename = (this.states).filter(function (entry) {
      return entry.ID == statedid;
    });
    let districtname = (this.district1).filter(function (entry) {
      return entry.ID == districtid;
    });
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.ShowPushData = {};
    this.ShowPushData = {
      "logintype": this.FilterJob.value.logintype != '' ? this.FilterJob.value.logintype : 'NA',
      "StateiD": statename != '' ? statename[0]['STATENAME'] : 'NA',
      "Districtid": districtname != '' ? districtname[0]['DISTRICTNAME'] : 'NA',
      "JobKeyword": this.FilterJob.value.JobKeyword != '' ? this.FilterJob.value.JobKeyword : 'NA',
    };

    this.senddatafilter = {
      'logintype': this.FilterJob.value.logintype != '' ? this.FilterJob.value.logintype : "",
      'JobKeyword': this.FilterJob.value.JobKeyword != '' ? this.FilterJob.value.JobKeyword : "",
      'StateiD': this.FilterJob.value.StateiD != '' ? this.FilterJob.value.StateiD : "",
      'DistrictID': this.FilterJob.value.DistrictID != '' ? this.FilterJob.value.DistrictID : "",
      'Adminid': this.adminId,
      'PageNumber': pageNumber
    };

    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.registService.GetFilterCompanyRegistration(this.senddatafilter).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.concat(this.DbResponce.Data);
          this.from = 'scroll';
        } else {
          this.companyregisterdata = [];
          this.from = '';
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.registService.GetFilterCompanyRegistration(this.senddatafilter).subscribe(res => {
        this.companyregisterdata = res;
        if (this.companyregisterdata != null) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.Data;
        } else {
          this.companyregisterdata = [];
          this.spinnerService.hide();
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }


  viewfalse: any = '1';
  delay: boolean = false;
  pageNumber: number = 0;
  postion: any;
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.postion = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= (0.8 * max)) {
      if (this.delay) {
        return
      }
      this.delay = true;
      if (this.companyregisterdata.length >= 10 && this.viewfalse == '1') {
        this.pageNumber = this.pageNumber + 1;
        this.GetFilter(this.pageNumber, 'scroll', 'src');
      }
    }
  }

  hrefurl: any = '1';
  registbackbtn: any = '0';
  backbtn: any = '0';
  compid: any;
  viewdata(companyId: any) {
    this.compid = companyId;
    localStorage.setItem('compid', this.compid);
    this.hrefurl = '0';
    this.clicked.emit(companyId);
    this.backbtn = '1';
    this.viewfalse = '0';
    this.ShowFilter = '0';
    this.Showpushdata = '0';
    $('.page-filters').slideToggle();

  }

  back() {
    this.backbtn = '0';
    this.backcliked.emit();
    this.hrefurl = '1';
    this.viewfalse = '1';
    this.ShowFilter = '1';
    this.Showpushdata = '0';
    window.scroll(0, this.postion);
    this.GetFilter(this.PageNumber, this.from, '');
    $('.page-filters').slideToggle();
  }

  states: any = [];
  GetAllState() {
    this.spinnerService.show();
    this.JobpostService.GetAllStates().subscribe(res => {
      this.states = res
      if (this.states!=null) {
        this.spinnerService.hide();
        this.states = this.states.Data;
      }
      else{
        this.states=[];
        this.spinnerService.hide();
      }
    });
  }

  district1: any = [];
  GetAllDistrict(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
      this.FilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if(event!=''|| event!=null){
      this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();
    this.JobpostService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res
      if (this.district1 != null) {
        this.spinnerService.hide();
        this.district1 = this.district1.Data;
      }
      else{
        this.district1=[];
        this.spinnerService.hide();
      }
    });
  }

  reset() {
   
    this.compid = localStorage.removeItem('compid');;
    this.Showpushdata = 0;
    this.PageNumber = 0;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.district1 = [];
    this.GetFilter(this.PageNumber, '', 'init');
    this.hrefurl = '1';
   // this.GetAllState();
  }

}



