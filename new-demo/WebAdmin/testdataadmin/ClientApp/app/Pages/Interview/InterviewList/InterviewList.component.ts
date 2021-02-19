import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../../Services/jobpost.service';
import { MasterService } from '../../../Services/master.service';
import { CustomValidators } from '../../../Validators/custom-validator.directive';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { UpdateprofileService } from '../../../Services/updateprofile.service';
import { RegistrationService } from '../../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AmazingTimePickerService } from 'amazing-time-picker';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { AppConfig } from '../../../Globals/app.config';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CompanyProfileService } from '../../../Services/companyprofile.service';
import { interviewListService } from '../../../Services/interview.service';
import { CandidateService } from '../../../Services/candidate.service';
import { Options } from 'ng5-slider';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-InterviewList',
  templateUrl: './InterviewList.component.html'

})

export class InterviewListComponent implements OnInit {
  modalsuitable: BsModalRef;
  modalRef: BsModalRef;
  modalRefdesc: BsModalRef;
  modaldefualt: BsModalRef;
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  FilterCompanyRegistration: FormGroup;
  FilterJobByComoany: FormGroup;
  InterviewSearch: FormGroup;
  ScheduleInterviewForm: FormGroup;
  NotSuitableCandidateForm: FormGroup;
  adminId: any;
  CompanyId: any;
    showHideToggle: boolean = false;
    buttonName: any = 'View More...'
  JobCardShow: any = false;
  InterviewCardShow: any = false;
  JobInterviewDetailcard: any = false;
  lstState: any = [];
  district: any = [];
  ShowPushDatajob: any = [];
  pushdatajob: any = [];
  ShowPushDataInterview: any = [];
  pushdataInterview: any = [];
  DbResponce: any = [];
  joblistRes: any = [];
  joblist: any = [];
  InterviewResfinal: any = [];
  InterviewRes: any = [];
  JobDetail: any = [];
  InterviewDetail: any = [];
  delay: any = false;
  PageNumber: number = 0;
  JobId: number;
  from: any = '';
  count: any = [];
  AppliedCandidateList: any = [];
  HideCommon: any = 1;
  interviewformValid = true;
  DateMsg = true;
  TimeMsg = true;
  TimeRange = true;
  PreviousStatusArray: any = [];
  token: any;
  tokenResponse: any = [];
  CompanyListShow: any = true;
  PageNumberCmp: number = 0;
  CompIdReviewApp:any;
  constructor(private formBuilder: FormBuilder,
    private appConfig: AppConfig,
    private spinnerService: Ng4LoadingSpinnerService,
    private http: Http,
    private modalService: BsModalService,
    private JobpostService: JobpostService,
    private companyProfileService: CompanyProfileService,
    private walkinService: WalkinPostService,
    private masterService: MasterService,
    private profileservice: UpdateprofileService,
    private registService: RegistrationService,
    private InterviewService: interviewListService,
    private CandidateService: CandidateService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private atp: AmazingTimePickerService,
    private route: ActivatedRoute,
    private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= (0.8 * max)) {
      if (this.delay) {
        return
      }
      this.delay = true;
      if (this.RegisteredCompany.length >= 10 && this.CompanyListShow == true) {
        this.PageNumberCmp = this.PageNumberCmp + 1;
        this.GetCompanyData(this.PageNumberCmp, 'scroll');
      }
      else if (this.InterviewRes.length >= 10 && this.InterviewCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, this.PageNumber, 'scroll');
      }
      else if (this.joblist.length >= 10 && this.JobCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetJobListByComapnyId(this.PageNumber, 'scroll');
      }
    }
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
    });
  }
  compid: any;
  ngOnInit() {

    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });


    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.compid = localStorage.getItem('compid');
  //  this.CompIdReviewApp = localStorage.getItem('companyid');
    localStorage.removeItem('compid');

    // Code to get Job id and other parameter while redirecting from review application


    var temp = this.route.snapshot.paramMap.get('JobInterviewDetailcard');
    var temp1 = this.route.snapshot.paramMap.get('JobCardShow');
    var temp2 = this.route.snapshot.paramMap.get('InterviewCardShow');
    var cpmid = this.route.snapshot.paramMap.get('compid');

    this.FilterCompanyRegistration = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'InterviewSchedule': ['', Validators.nullValidator],
    });

    this.ScheduleInterviewForm = this.formBuilder.group({
      InterviewDate: ['', [Validators.required,]],
      InterviewDateTo: ['', [Validators.required,]],
      fromtime: ['', [Validators.required,]],
      totime: ['', [Validators.required,]],
      address: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      jobdesription: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      rolesresponsibility: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      StateID: ['', [Validators.required,]],
      DistrictID: ['', [Validators.required,]],
      Location: ['', [Validators.nullValidator,]],

    });
    this.FilterJobByComoany = this.formBuilder.group({
      Stateid: ['', ''],
      Districtid: ['', ''],
      SearchKeyJob: ['', ''],
      JobType: ['', ''],
    });
    this.InterviewSearch = this.formBuilder.group({
      Stateid: ['', ''],
      Districtid: ['', ''],
      SearchKeyInterview: ['', ''],
      DateFrom: ['', ''],
      DateTo: ['', ''],
      LocationFilter: ['', ''],
    });
    this.NotSuitableCandidateForm = this.formBuilder.group({
      remarkforNotsuitable: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
    });
    var id = parseInt(this.route.snapshot.paramMap.get('jid'));//InterView Shedule
    this.CompIdReviewApp = parseInt(this.route.snapshot.paramMap.get('cmpid'));//InterView Shedule
    var usrid = parseInt(this.route.snapshot.paramMap.get('UserId'));
    var usrstatus =this.route.snapshot.paramMap.get('userStatus');
    var scrstatus =this.route.snapshot.paramMap.get('scrStatus');

    if (id && usrid && usrstatus && scrstatus) {
     this.GetInterviewSchedulePage(id, usrid, usrstatus, scrstatus);
     //this.GetJobDetailForScheduleInterview(id, usrid,usrstatus)
    }
    else {
    }
    this.GetCompanyData(0, '');
    if (temp != null) {

      this.JobInterviewDetailcard = false;
      this.JobCardShow = false;
      this.InterviewCardShow = true;
      this.onCompanyClicked(cpmid);

    }
    this.GetAllStates();
  }
  BackToReview:boolean=false;
  jid:any;
  userid:any;
  userstatus:any;
  scrstatus:any;
  GetInterviewSchedulePage(jobid:any,userid:any,userstatus:any,scrstatus:any){
    this.jid = jobid;
    this.userid = userid;
    this.userstatus = userstatus;
    this.scrstatus = scrstatus;

    this.BackToReview = true;
    this.GetJobDetailForScheduleInterview(jobid, userid,userstatus);

  }
  BackToReviewApplication(){
    //this.CompIdReviewApp = '';
    localStorage.removeItem('companyid');
    this.router.navigate(['/ReviewApplication', { cmpid: parseInt(this.CompIdReviewApp),jid: parseInt(this.jid), UserId:  parseInt(this.userid) ,userStatus: this.userstatus,scrstatus: this.scrstatus}]);

  }
  toggle() {
      this.showHideToggle = !this.showHideToggle;
      if (this.showHideToggle) {
          this.buttonName = 'View Less...'
      }
      else {
          this.buttonName = 'View More...'
      }
    }
  ComSearch:boolean= false
  GetCompanyDataFilter() {
    this.GetCompanyData(0, '');
    this.ComSearch = true;
  }
  Response: any
  ResponseResult: any
  RegisteredCompany: any=[];
  ShowPushDataCompany: any;
  GetCompanyData(pgno: any, from: any) {
    this.from = from;
    this.PageNumberCmp = pgno;
    let statedid = 0;
    let districtid = 0;
    let logintype;
    let JobKeyword;

    statedid = this.FilterCompanyRegistration.value.StateiD;
    districtid = this.FilterCompanyRegistration.value.DistrictID;
    logintype = this.FilterCompanyRegistration.value.logintype;
    JobKeyword = this.FilterCompanyRegistration.value.JobKeyword;

    let statename = (this.lstState).filter(function (entry) {
      return entry.id == statedid;
    });
    let districtname = (this.district).filter(function (entry) {
      return entry.id == districtid;
    });
    var datasend = {
      'Adminid': this.adminId,
      'CompanyId': 0,
      'Logintype': this.FilterCompanyRegistration.value.logintype ? this.FilterCompanyRegistration.value.logintype : "",
      'StateiD': this.FilterCompanyRegistration.value.StateiD ? this.FilterCompanyRegistration.value.StateiD : 0,
      'Districtid': this.FilterCompanyRegistration.value.DistrictID ? this.FilterCompanyRegistration.value.DistrictID : 0,
      'SearchKey': this.FilterCompanyRegistration.value.JobKeyword ? this.FilterCompanyRegistration.value.JobKeyword : "",
      'Page': this.PageNumberCmp,
      //'AppliedCandidate': this.FilterCompanyRegistration.value.ApplicationRcvd ? this.FilterCompanyRegistration.value.ApplicationRcvd : null,
      'IsInverviewSchld': this.FilterCompanyRegistration.value.InterviewSchedule ? this.FilterCompanyRegistration.value.InterviewSchedule : null,
    };

    this.ShowPushDataCompany = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "JobKeyword": this.FilterCompanyRegistration.value.JobKeyword ? this.FilterCompanyRegistration.value.JobKeyword : 'NA',
      "logintype": this.FilterCompanyRegistration.value.logintype ? this.FilterCompanyRegistration.value.logintype : 'NA',
      'isInverviewSchld': this.FilterCompanyRegistration.value.InterviewSchedule ? this.FilterCompanyRegistration.value.InterviewSchedule : 'NA',
    };

    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.InterviewService.GetFilterCompanyInterviewSchedule(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstAdmCompanyapplicationRecieved;
        // if (this.Response.lstCompanyProfile.length > 0) {
        if (this.ResponseResult != null) {

          this.RegisteredCompany = this.RegisteredCompany.concat(this.ResponseResult);
          this.spinnerService.hide();
          //this.from = 'scroll';
        }
        else {
          this.Response = [];
          // this.from = '';
          // if (pageNumber == 0) {
          //   this.toastrService.error("No Record Found");
          // }
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    } else {
      this.spinnerService.show();
      
      this.InterviewService.GetFilterCompanyInterviewSchedule(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstAdmCompanyapplicationRecieved;
        // if (this.Response.lstCompanyProfile.length > 0) {
        if (this.ResponseResult != null) {

          this.spinnerService.hide();
          this.RegisteredCompany = this.ResponseResult;
        }
        else {
          this.RegisteredCompany = [];
          this.toastrService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
        // this.from = '';
      });
    }
  }


  onCompanyClicked(companyid: string) {
    this.CompanyListShow = false;
    this.RegisteredCompany = [];
    this.CompanyId = companyid;
    this.GetWorkLocation();
    this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, this.PageNumber, this.from);
  }

  BackToCompanyList() {
    this.InterviewCardShow = false;
    this.CompanyListShow = true;
    this.PageNumber = 0;
    this.InterviewRes = [];
    this.RegisteredCompany = [];
    this.GetCompanyData(0, '');
  }

  CompanyResultReset() {
    this.CompanyId = 0;
    this.PageNumber = 0;
    this.ComSearch = false;
    this.FilterCompanyRegistration.controls['JobKeyword'].setValue("");
    this.FilterCompanyRegistration.controls['DistrictID'].setValue("");
    this.FilterCompanyRegistration.controls['StateiD'].setValue("");
    this.FilterCompanyRegistration.controls['logintype'].setValue("");
    this.RegisteredCompany = [];
    this.GetCompanyData(this.PageNumber, '');
    this.district = [];
  }


  // Code to get company work location on the basis of Company Id
  workLocation: any = [];
  GetWorkLocation() {
    var parentid = 0;
    this.CompanyId;
    this.CompIdReviewApp;

    this.InterviewService.GetCompanyWorkLocation(this.CompanyId?this.CompanyId:this.CompIdReviewApp, this.adminId).subscribe(res => {
      this.DbResponce = res;

      if (this.DbResponce != null) {
        this.workLocation = this.DbResponce.lstCompanyWorkLocation
      }
    });
  }
  onClicked(companyid: string) {
    this.HideCommon = 2;
    this.CompanyId = companyid;
    this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, this.PageNumber, this.from);
  }
  /***Code to get interview list on the basis of Company Id *****/
  pushdataInterviewList: any = [];
  intercomlist: any = {};
  GetInterviewList:any;
  GetInterviewListByCompanyId(cpmid: any, admid: any, pgno: any, from: any) {

    this.JobCardShow = false;
    this.InterviewCardShow = true;
    this.JobInterviewDetailcard = false;

    this.pushdataInterviewList = {
      "AdminId": this.adminId,
      "CompanyId": this.CompanyId,
      "StateId": this.InterviewSearch.controls.Stateid.value?this.InterviewSearch.controls.Stateid.value:0,
      "DistrictId": this.InterviewSearch.controls.Districtid.value?this.InterviewSearch.controls.Districtid.value:0,
      "Worklocationid": this.InterviewSearch.controls.LocationFilter.value?this.InterviewSearch.controls.LocationFilter.value:0,
      "Searchkey": this.InterviewSearch.controls.SearchKeyInterview.value,
      "InterviewDateFrom": this.InterviewSearch.controls.DateFrom.value,
      "InterviewDateTo": this.InterviewSearch.controls.DateTo.value,
      "pageNumber": pgno,
    };
    var parasend=JSON.stringify(this.pushdataInterviewList);
    this.GetInterviewList={
      'HSTPLRequest':{
        'data':parasend,
        'typeFor':'AdminGetInterviewListbyCompanyId'
      }
      }

    let statedid = 0;
    let districtid = 0;
    let worklocationid = 0;

    statedid = this.InterviewSearch.value.Stateid;
    districtid = this.InterviewSearch.value.Districtid;
    worklocationid = this.InterviewSearch.value.LocationFilter;

    let statename = (this.lstState).filter(function (entry) {
      return entry.id == statedid;
    });
    let districtname = (this.district).filter(function (entry) {
      return entry.id == districtid;
    });

    let locationname = (this.workLocation).filter(function (entry) {
      return entry.id == worklocationid;
    });
    this.ShowPushDataInterview = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "Keyword": this.InterviewSearch.controls.SearchKeyInterview.value ? this.InterviewSearch.controls.SearchKeyInterview.value : 'NA',
      "DateFrom": this.InterviewSearch.controls.DateFrom.value,
      "DateTo": this.InterviewSearch.controls.DateTo.value,
      "Location": locationname != '' ? locationname[0]['address'] : 'NA',
    };

    if (from == 'scroll') {
      this.spinnerService.show();
      this.InterviewService.getAdminInterviewlistByCompanyId(this.GetInterviewList).subscribe(res => {
        this.DbResponce = res;
        //alert(this.DbResponce.hstplResponse.data.length)
        this.spinnerService.hide();
        this.InterviewResfinal = JSON.parse(this.DbResponce.hstplResponse.data);
        // this.InterviewResfinal = this.DbResponce.Data;
        if (this.InterviewResfinal != null) {
          this.InterviewRes = this.InterviewRes.concat(this.InterviewResfinal);
        }
        // else {
        //   this.InterviewRes = [];
        //   this.spinnerService.hide();
        // }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.InterviewService.getAdminInterviewlistByCompanyId(this.GetInterviewList).subscribe(res => {
        this.DbResponce = res;
        //alert(this.DbResponce.hstplResponse.data.length)
        this.spinnerService.hide();
        this.InterviewResfinal = JSON.parse(this.DbResponce.hstplResponse.data);
        // this.InterviewResfinal = this.DbResponce.Data;
        if (this.InterviewResfinal != null) {
          this.InterviewRes = this.InterviewResfinal;
        }
        else {
          this.InterviewRes = [];
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    }

  }


  onbackregist() {
    this.joblist = [];
    this.ShowPushDatajob = [];
    this.pushdatajob = [];
    this.pushdataInterviewList = [];
    this.GetInterviewList = [];
    this.InterviewCardShow = false;
    this.JobCardShow = false;
    this.JobInterviewDetailcard = false;
    this.FilterJobByComoany.reset();
    this.ScheduleInterviewForm.reset();
    this.FilterJobByComoany.controls['Stateid'].setValue(0);
    this.FilterJobByComoany.controls['Districtid'].setValue(0);
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
  }

  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    this.ScheduleInterviewForm.controls['DistrictID'].setValue('');
    this.GetAllDistrict(statename, "profile");
  }
  private GetAllDistrict(id: any, From: string) {
    try {

      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res;
      });
    } catch  { }
  }
  SearchResultJob: any = false;
  GetJobListByComapnyIdFilter(page: any, from: any) {
    this.PageNumber = 0;
    this.GetJobListByComapnyId(page, from);
    this.SearchResultJob = true;

  }
  /***Code to get job list on the basis of Company Id *****/

  joblistResFilter: any = [];
  GetJobListByComapnyId(page: any, from: any) {
    this.HideCommon = 0;
    this.JobCardShow = true;
    this.SearchResultInterview = false;
    this.InterviewCardShow = false;
    let statedid;
    let districtid;
    statedid = this.FilterJobByComoany.value.Stateid;
    districtid = this.FilterJobByComoany.value.Districtid;
    let statename = (this.lstState).filter(function (entry) {
      return entry.id == statedid;
    });
    let districtname = (this.district).filter(function (entry) {
      return entry.id == districtid;
    });
    this.ShowPushDatajob = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "Keyword": this.FilterJobByComoany.controls.SearchKeyJob.value ? this.FilterJobByComoany.controls.SearchKeyJob.value : 'NA',
      "JobType": this.FilterJobByComoany.controls.JobType.value ?  this.FilterJobByComoany.controls.JobType.value : 'All',
    };
    this.pushdatajob = {
      "StateId": this.FilterJobByComoany.controls.Stateid.value != '' ? parseInt(this.FilterJobByComoany.controls.Stateid.value) : 0,
      "DistrictId": this.FilterJobByComoany.controls.Districtid.value != '' ? parseInt(this.FilterJobByComoany.controls.Districtid.value) : 0,
      "PageNumber": this.PageNumber != 0 ? this.PageNumber : 0,
      "Search": this.FilterJobByComoany.controls.SearchKeyJob.value,
      "JobType": this.FilterJobByComoany.controls.JobType.value ?  this.FilterJobByComoany.controls.JobType.value : 'ALL',
      "CompanyId": this.CompanyId,
      "AdminId": this.adminId
    };
    if (from == 'scroll') {

      this.spinnerService.show();
      try {
        var jobid = 0;
        this.InterviewService.GetJobListByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.spinnerService.hide();
          this.joblistResFilter = (this.DbResponce.lstJobListByCompanyId).filter(function (entry) {
            return entry.totalAppliedCandidate != 0;
          });
          if (this.DbResponce.lstJobListByCompanyId != null) {
            this.joblistRes = this.DbResponce.lstJobListByCompanyId;
            //this.joblistRes = this.joblistResFilter;
            this.joblist = this.joblist.concat(this.joblistRes);
          }
          else {
            this.joblist = [];
            this.spinnerService.hide();
          }
          this.delay = false;
        });
      } catch  { }
    }
    else {
      this.spinnerService.show();
      this.PageNumber = 0;
      try {
        var jobid = 0;
        this.InterviewService.GetJobListByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.spinnerService.hide();

          this.joblistResFilter = (this.DbResponce.lstJobListByCompanyId).filter(function (entry) {
            return entry.totalAppliedCandidate != 0;
          });

          if (this.DbResponce.lstJobListByCompanyId != null) {
            this.joblistRes = this.DbResponce.lstJobListByCompanyId;
            //this.joblistRes = this.joblistResFilter;
            this.joblist = this.joblistRes;
          }
          else {
            this.joblist = [];
            this.spinnerService.hide();
          }
          this.delay = false;
        });
      } catch  { }
    }
  }
  SearchResultInterview: any = false;
  GetInterviewListFilter(PageNo: any, from: any) {
    this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, PageNo, from);
    this.SearchResultInterview = true;
  }

  InterviewSchedulePage() {
    this.AddCandidateCount = 1;
    this.PageNumber = 0;
    this.GetJobListByComapnyId(0, '');
    this.JobCardShow = true;
    this.InterviewCardShow = false;
    this.JobInterviewDetailcard = false;
  }
  /*** Code to get job detail on the basis of job id *****/

  UserId: any;
  userStatus: any;
  jobid: any;
  minDate = new Date();
  GetJobDetailForScheduleInterview(jobid, userid: any,userstatus:any) {
    this.userStatus = userstatus;
    if(this.userStatus){
    this.JobInterviewDetailcard = true;
    this.CompanyListShow = false;
    this.jobid = jobid;
    this.UserId = userid;
    this.PageNumber = 0;
    this.userStatus = userstatus;
    //this.JobInterviewDetailcard = true;
   
    this.InterviewCardShow = false;
    this.JobCardShow = false;
    this.SearchResultJob = false;
    this.GetWorkLocation();
    this.GetToken(this.UserId);
    this.ScheduleInterviewForm.controls['Location'].setValue('');
    this.ScheduleInterviewForm.controls['StateID'].setValue('');
    this.ScheduleInterviewForm.controls['DistrictID'].setValue('');
    try {
      this.spinnerService.show();
      this.InterviewService.GetAppliedJobById(this.adminId, this.jobid).subscribe(res => {
        this.DbResponce = res
        this.spinnerService.hide();
        if (this.DbResponce != null) {
          this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
        }
      });

    } catch  { }

  }
  else{
    this.toastrService.error('Inactive user not allowed to schedule the interview.');
  }

  }
  // Code to get the state distric on the basis of work location id 
  LocationResponse: any = [];
  OnLocationChange(Location: any) {
    if (Location == '') {
      this.toastrService.error('Please Select Location');
      this.ScheduleInterviewForm.controls['StateID'].setValue('');
      this.ScheduleInterviewForm.controls['DistrictID'].setValue('');
    }

    this.InterviewService.GetCompanyWorkLocationstateDistrict(this.adminId, Location).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.LocationResponse = this.DbResponce.lstInterviewList[0]
        this.ScheduleInterviewForm.controls['StateID'].setValue(this.LocationResponse.stateid);
        this.GetAllDistrict(this.LocationResponse.stateid, "");
        this.ScheduleInterviewForm.controls['DistrictID'].setValue(this.LocationResponse.districtid);
      }
    });
    this.ScheduleInterviewForm.get('StateID').disable();
    this.ScheduleInterviewForm.get('DistrictID').disable();

  }
  /***Code to enter other address on other address check box click if user do not want to use company work location *****/
  OtherAddress: any = false;
  ChangeAddress(event: any) {

    this.district = [];
    this.ScheduleInterviewForm.get('StateID').enable();
    this.ScheduleInterviewForm.get('DistrictID').enable();

    if (event) {
      this.OtherAddress = true;
      this.ScheduleInterviewForm.controls['Location'].setValue('');
      this.ScheduleInterviewForm.controls['StateID'].setValue('');
      this.ScheduleInterviewForm.controls['DistrictID'].setValue('');

    }
    else {
      this.OtherAddress = false;
      this.ScheduleInterviewForm.controls['address'].setValue('');
      this.ScheduleInterviewForm.controls['StateID'].setValue('');
      this.ScheduleInterviewForm.controls['DistrictID'].setValue('');
    }
  }
  /* Fonction that is called on click og add candidate button to show candidate list */
  AddCandidateCount = 1;
  AddCandidateButton: boolean = true;
  candidatedetail: any = [];
  candidatedetailList: any = [];
  applicantListshow: any = false;
  JoinedFilter: any = [];
  AddCandidate(jobid: any) {
    if (this.AddCandidateCount == 1) {
      this.AddCandidateButton = false;
      this.candidatedetailList = null;
      this.candidatedetail = null;
      this.dtOptions = null;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        paging: true,
        searching: true,
        destroy: false,
        retrieve: true,
      };
      this.dtTrigger = new Subject<any>();
      let InterviewId = 0;
      this.applicantListshow = true;
      let postData = {
        "JobId": jobid,
        "InterviewId": InterviewId,
      };
      this.candidatedetail = [];
      this.spinnerService.show();

      this.AppliedCandidateList = [];
      this.DbResponce = [];
      this.InterviewService.GetCommanCandidateList(this.adminId, jobid, 0, 0).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.AppliedCandidateList = this.DbResponce.lstCandidateInfo;
          // this.AppliedCandidateList = (this.AppliedCandidateList).filter(function (entry) {
          //   return entry.joiningstatus == 1;
          // });
          this.dtTrigger.next();

          this.spinnerService.hide();
        }
      });
    }
    this.AddCandidateCount++;
  }
  /***  Functon that is called on click of check box in candidate list    *****/

  JobIdSuitable: any;
  OpeningIdSuitable: any;
  CandIdSuitable: any;
  SourceTypeForSuitable: any;
  SourceIdForSuitable: any;
  IsSuitable: any;
  pusharray: any = [];
  ExistingCandidate: any = [];
  idFormArrayOpening: any = [];
  CompanyExelData: any = [];
  UniqueId:any;
  CandidateIndex: any;
  pushUniqueSuitCand: any = [];
   ExistingUniqueCandidate: any = [];
  Array=new Array(5);
  onChange(item:any,id: any, isChecked: boolean, jobId: any, openingid: any, candId: any, sourceid: any, sourcetype: any, isSuitable: any, candIndex: any) {
    this.JobIdSuitable = jobId;
    this.OpeningIdSuitable = openingid;
    this.CandIdSuitable = candId;
    this.SourceTypeForSuitable = sourcetype;
    this.SourceIdForSuitable = sourceid;
    this.IsSuitable = isSuitable;
    this.ExistingCandidate = [];
    this.UniqueId = this.CandIdSuitable +''+ this.OpeningIdSuitable; 
    var Uniqid = this.UniqueId;

    //  this.ExistingUniqueCandidate = (this.suitabilityStatus).filter(function (entry) {
    //   return entry.UniqueId == Uniqid;
    // });
  


    this.ExistingCandidate = (this.suitabilityStatus).filter(function (entry) {
      return entry.Candid == candId;
    });

    if (isChecked) {

//       var data=[];
//        this.Array[candIndex]=item;
//        JSON.stringify(this.Array)
//        console.log( JSON.stringify(this.Array));
//        if (candIndex in this.Array) {
//        // myObj["name"]
//       console.log(this.Array[candIndex]);
//        data= this.Array[candIndex];       
//    } 

      this.idFormArray.push(this.CandIdSuitable);
      this.idFormArrayOpening.push({
        'Candid': this.CandIdSuitable,
        "openingid": this.OpeningIdSuitable,
      });
      if (this.IsSuitable == 1 || this.IsSuitable == 0 || this.IsSuitable == 2) {
        if (this.ExistingCandidate.length == 0) {
          this.pusharray.push(candId);
          this.suitabilityStatus.push({
            'Candid': this.CandIdSuitable,
            "issuitable": this.IsSuitable,
            "jobid": this.JobIdSuitable,
            "openingid": this.OpeningIdSuitable,
            "Sourceid": this.SourceIdForSuitable,
            "SourceType": this.SourceTypeForSuitable,
            "Remarks": ''
          });
        }
        else {

        }
      }
    }
    else {

      let index = this.idFormArray.indexOf(id);
      let indexofsuitablearray = this.pusharray.indexOf(candId);
      // if select all is checked than individual candidate unchecked
      if (this.selectedAll) {

        //if not suitable or select status candidate unchecked as on check all only 
        // suitable candidate is pushed in the array
        if (index < 0 && indexofsuitablearray < 0) {
          // no need to splice any id as it is not present in the array
        }
        else {
          this.idFormArray.splice(index, 1);
          this.idFormArrayOpening.splice(index, 1);
          this.suitabilityStatus.splice(indexofsuitablearray, 1);
          this.pusharray.splice(indexofsuitablearray, 1);
          this.ExistingCandidate.splice(indexofsuitablearray, 1);
          this.PreviousStatusArray.splice(indexofsuitablearray, 1);
          // code to select the dropdown option via screening module
          var SuitableStatus = this.IsSuitable;
          $("#" + "myDropDown" + candIndex).val(SuitableStatus);
          if(this.idFormArray.length == 0){
            this.selectedAll = false;
          }

        }
      }
      else {
        this.idFormArray.splice(index, 1);
        this.idFormArrayOpening.splice(index, 1);
        this.suitabilityStatus.splice(indexofsuitablearray, 1);
        this.pusharray.splice(indexofsuitablearray, 1);
        this.ExistingCandidate.splice(indexofsuitablearray, 1);
        this.PreviousStatusArray.splice(indexofsuitablearray, 1);
        // code to select the dropdown option via screening module
        var SuitableStatus = this.IsSuitable;
        $("#" + "myDropDown" + candIndex).val(SuitableStatus);
      }
    }
  }
 
  /***  function call while change the suitable / not suitable drop down    *****/
  NotSuitableRemark: any;
  issuitable: number;
  suitabilityStatus: any = [];
  jobidfornotsuitable: any;
  candidfornotsuitable: any;
  openingidfornotsuitable: any;
  sourcetypefornotsuitable: any;
  sourceidfornotsuitable: any;
  NotSuitable: boolean = false;
  interviewId: any;
  CandName: any;
  ListIndex: any;
  JobSuitability(templatefornotsuitable: TemplateRef<any>, status: number, candid: any, candname: any, jobid: any, openingid: any, sourcetype: any, sourceid: any, listindex: any) {
    this.CandName = candname;
    this.ListIndex = listindex;
    this.ExistingCandidate = [];

    //For not suitable candidate parameter values
    this.issuitable = status;
    this.candidfornotsuitable = candid;
    this.openingidfornotsuitable = openingid;
    this.jobidfornotsuitable = jobid;
    this.sourcetypefornotsuitable = sourcetype;
    this.sourceidfornotsuitable = sourceid;
    //code to check that cand id is already exist in array
    this.ExistingCandidate = (this.suitabilityStatus).filter(function (entry) {
      return entry.Candid == candid;
    });

    // code to remove previous cand status from array
    if (this.ExistingCandidate.length != 0) {
      //status is changed with check all of already exixsting candidate
      // if (this.selectedAll && (status == 2 || status == 0 || status == 1)) {
      if (this.selectedAll) {

        if (status == 2 || status == 1) {
          let indexofsuitablearray = this.pusharray.indexOf(candid);
          this.suitabilityStatus.splice(indexofsuitablearray, 1);
          this.pusharray.splice(indexofsuitablearray, 1);

          this.pusharray.push(candid);
          this.suitabilityStatus.push({
            'Candid': candid,
            "issuitable": status,
            "jobid": jobid,
            "openingid": openingid,
            "Sourceid": sourceid,
            "SourceType": sourcetype,
            "Remarks": ''
          });
        }

        if (status == 0) {
          this.modalsuitable = this.modalService.show(templatefornotsuitable,
            { backdrop: 'static', keyboard: false });
        }

      }
      //when candidate is exist in array and check all is not checked
      else {
        if (status == 1 || status == 2) {
          let indexofsuitablearray = this.pusharray.indexOf(candid);
          this.suitabilityStatus.splice(indexofsuitablearray, 1);
          this.pusharray.splice(indexofsuitablearray, 1);

          // To push suitable candidate status in array
          this.pusharray.push(candid);
          this.suitabilityStatus.push({
            'Candid': candid,
            "issuitable": status,
            "jobid": jobid,
            "openingid": openingid,
            "Sourceid": sourceid,
            "SourceType": sourcetype,
            "Remarks": ''
          });
        }
        if (status == 0) {
          this.modalsuitable = this.modalService.show(templatefornotsuitable,
            { backdrop: 'static', keyboard: false });

        }

      }
      //check all condition ends here

      //if candidate does not exist in the array existing array lenth is zero
    }
    else {
      // existing array lenth is zero means candidate does not exist in array
      if (this.selectedAll) {
        if (status == 2 || status == 1) {
          this.idFormArray.push(candid);
          this.idFormArrayOpening.push({
            'Candid': candid,
            "openingid": openingid,
          });
          this.pusharray.push(candid);
          this.suitabilityStatus.push({
            'Candid': candid,
            "issuitable": status,
            "jobid": jobid,
            "openingid": openingid,
            "Sourceid": sourceid,
            "SourceType": sourcetype,
            "Remarks": ''
          });

        }
        if (status == 0) {
          this.modalsuitable = this.modalService.show(templatefornotsuitable,
            { backdrop: 'static', keyboard: false });
        }

      }
      // existing array lenth is zero means candidate does not exist in array and check all is not checked
      else {

        if (status == 1 || status == 2) {
          this.pusharray.push(candid);
          this.suitabilityStatus.push({
            'Candid': candid,
            "issuitable": status,
            "jobid": jobid,
            "openingid": openingid,
            "Sourceid": sourceid,
            "SourceType": sourcetype,
            "Remarks": ''
          });
        }
        if (status == 0) {
          this.modalsuitable = this.modalService.show(templatefornotsuitable,
            { backdrop: 'static', keyboard: false });
        }

      }

    }
  }
  /*** while click on close in not suitable pop up    *****/

  CloseNotSuitableRemark() {
    this.modalsuitable.hide()
    this.PreviousStatusArray = [];
    var candIdStatus = this.candidfornotsuitable;
    this.PreviousStatusArray = (this.suitabilityStatus).filter(function (entry) {
      return entry.Candid == candIdStatus;
    });
    if (this.PreviousStatusArray.length != 0) {
      var SuitableStatus = this.PreviousStatusArray[0].issuitable;
      $("#" + "myDropDown" + this.ListIndex).val(SuitableStatus);
    }
    else if (this.PreviousStatusArray.length == 0) {
      this.PreviousStatusArray = [];
      this.PreviousStatusArray = (this.AppliedCandidateList).filter(function (entry) {
        return entry.candId == candIdStatus;
      });

      var beforeChecked = this.PreviousStatusArray[0].issuitable;
      $("#" + "myDropDown" + this.ListIndex).val(beforeChecked);

    }
    else {
      var SuitableStatusNull = 2;
      $("#" + "myDropDown" + this.ListIndex).val(beforeChecked);
    }

  }
  /**** function that is called when not suitable remark is submitted    *****/
  SubmitNotSuitableRemark() {
    if (this.NotSuitableCandidateForm.value.remarkofrejection == '') {
      this.NotSuitableCandidateForm.controls['remarkofrejection'].setValue('');
      return false;
    }
    if (this.ExistingCandidate.length == 0) {
      if (this.selectedAll) {
        this.idFormArray.push(this.candidfornotsuitable);
        this.idFormArrayOpening.push({
          'Candid': this.candidfornotsuitable,
          "openingid": this.openingidfornotsuitable,
        });
        this.pusharray.push(this.candidfornotsuitable);
        this.suitabilityStatus.push({
          'Candid': this.candidfornotsuitable,
          'issuitable': this.issuitable,
          'jobid': this.jobidfornotsuitable,
          'openingid': this.openingidfornotsuitable,
          "Sourceid": this.sourceidfornotsuitable,
          "SourceType": this.sourcetypefornotsuitable,

          'Remarks': this.NotSuitableCandidateForm.value.remarkforNotsuitable.trim(),
        });

      } else {
        this.pusharray.push(this.candidfornotsuitable);
        this.suitabilityStatus.push({
          'Candid': this.candidfornotsuitable,
          'issuitable': this.issuitable,
          'jobid': this.jobidfornotsuitable,
          'openingid': this.openingidfornotsuitable,
          "Sourceid": this.sourceidfornotsuitable,
          "SourceType": this.sourcetypefornotsuitable,

          'Remarks': this.NotSuitableCandidateForm.value.remarkforNotsuitable.trim(),
        });

      }
    }

    //To splice already suitable candidate from array
    else if (this.ExistingCandidate.length != 0) {
      let indexofsuitablearray = this.pusharray.indexOf(this.candidfornotsuitable);
      this.suitabilityStatus.splice(indexofsuitablearray, 1);
      this.pusharray.splice(indexofsuitablearray, 1);
      //this.ExistingCandidate.splice(indexofsuitablearray, 1);


      this.pusharray.push(this.candidfornotsuitable);
      this.suitabilityStatus.push({
        'Candid': this.candidfornotsuitable,
        'issuitable': this.issuitable,
        'jobid': this.jobidfornotsuitable,
        'openingid': this.openingidfornotsuitable,
        "Sourceid": this.sourceidfornotsuitable,
        "SourceType": this.sourcetypefornotsuitable,

        'Remarks': this.NotSuitableCandidateForm.value.remarkforNotsuitable.trim(),
      });
    }
    this.modalsuitable.hide();
    this.NotSuitableCandidateForm.reset();
  }
  /*** Code to select all suitable candidate when click on check all on candidate list *****/
  selectedAll: any;
  selectAll(e) {
    if (e.target.checked) {
      for (var i = 0; i < this.AppliedCandidateList.length; i++) {
       // if (this.AppliedCandidateList[i].issuitable == 1) {
        this.AppliedCandidateList[i].selected = this.selectedAll;
        //}
        let index = this.idFormArray.indexOf(this.AppliedCandidateList[i].candId);
        if (this.suitabilityStatus.length != 0) {
          var cnd = this.AppliedCandidateList[i].candId;
          this.ExistingCandidate = (this.suitabilityStatus).filter(function (entry) {
            return entry.Candid == cnd;
          });
          if (this.ExistingCandidate.length != 0) {
            if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
            this.idFormArrayOpening.push({
              "Candid": this.AppliedCandidateList[i].candId,
              "openingid": this.AppliedCandidateList[i].candjobopeningid
            });
          }
            if (index < 0) {
              if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
              this.idFormArray.push(this.AppliedCandidateList[i].candId);
              }
            }
          } else {
          //to stop interview schedule of those candidate whome offer letter is released
       
            if (this.AppliedCandidateList[i].candidatestaus == 'SUITABLE' || this.AppliedCandidateList[i].candidatestaus == 'NOTSUITABLE' || this.AppliedCandidateList[i].candidatestaus == 'DISQULIFIED' || this.AppliedCandidateList[i].candidatestaus == 'PENDING' || this.AppliedCandidateList[i].candidatestaus == 'SCHEDULED' || this.AppliedCandidateList[i].candidatestaus == 'SELECTED') {
            if (this.AppliedCandidateList[i].issuitable == 1) {
              if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
              this.idFormArrayOpening.push({
                "Candid": this.AppliedCandidateList[i].candId,
                "openingid": this.AppliedCandidateList[i].candjobopeningid
              });
              this.suitabilityStatus.push({
                'Candid': this.AppliedCandidateList[i].candId,
                "issuitable": this.AppliedCandidateList[i].issuitable,
                "jobid": this.AppliedCandidateList[i].interviewSchldJOBID,
                "openingid": this.AppliedCandidateList[i].candjobopeningid,
                "Sourceid": this.AppliedCandidateList[i].candidatesourceid,
                "SourceType": this.AppliedCandidateList[i].apitype,
                "Remarks": ''
              });
            }
              if (index < 0) {
                if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
                this.idFormArray.push(this.AppliedCandidateList[i].candId);
                this.pusharray.push(this.AppliedCandidateList[i].candId);
                }
              }
            }
          }
          }
        } else {
          //To maintain drop down value as previous status that is coming from back end
          var suit = this.AppliedCandidateList[i].issuitable;
          $("#" + "myDropDown" + i).val(suit);

         //to stop interview schedule of those candidate whome offer letter is released
          if (this.AppliedCandidateList[i].candidatestaus == 'SUITABLE' || this.AppliedCandidateList[i].candidatestaus == 'NOTSUITABLE' || this.AppliedCandidateList[i].candidatestaus == 'DISQULIFIED' || this.AppliedCandidateList[i].candidatestaus == 'PENDING' || this.AppliedCandidateList[i].candidatestaus == 'SCHEDULED' || this.AppliedCandidateList[i].candidatestaus == 'SELECTED') {

          if (this.AppliedCandidateList[i].issuitable == 1) {
            if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
            this.idFormArrayOpening.push({
              "Candid": this.AppliedCandidateList[i].candId,
              "openingid": this.AppliedCandidateList[i].candjobopeningid
            });
            this.suitabilityStatus.push({
              'Candid': this.AppliedCandidateList[i].candId,
              "issuitable": this.AppliedCandidateList[i].issuitable,
              "jobid": this.AppliedCandidateList[i].interviewSchldJOBID,
              "openingid": this.AppliedCandidateList[i].candjobopeningid,
              "Sourceid": this.AppliedCandidateList[i].candidatesourceid,
              "SourceType": this.AppliedCandidateList[i].apitype,
              "Remarks": ''
            });
          }
          }
          if (index < 0) {
            // if status changes first and than check all selected -- ends
            if (this.AppliedCandidateList[i].issuitable == 1) {
              if (this.AppliedCandidateList[i].candidatestaus != 'PLACED') {
              this.idFormArray.push(this.AppliedCandidateList[i].candId);
              this.pusharray.push(this.AppliedCandidateList[i].candId);
              }
            }
          }
        }
        }
        // Only suitable candidate having status 1 will be schedule for the interiew ends
      }
    } else {
      for (var i = 0; i < this.AppliedCandidateList.length; i++) {
        this.AppliedCandidateList[i].selected = false;
        this.idFormArray = [];
        this.pusharray = [];
        this.idFormArrayOpening = [];
        this.suitabilityStatus = [];
        this.ExistingCandidate = [];
        this.PreviousStatusArray = [];
      }
    }
  }
  /* function that is called on click on submit button while scheduling interview */
  startDate: any;
  EndDate: any;
  idFormArray: any = [];
  idFormArraycand: any = [];
  SuitableCandidate: any = [];
  FilteredResult: any = [];
  CandidateArray: any = [];
  filteredCandidateArray: any = [];
  ScheduleInterview(jobid: any) {
    var str = this.ScheduleInterviewForm.value.InterviewDate;
    this.startDate = this.ScheduleInterviewForm.value.InterviewDate;
    this.EndDate = this.ScheduleInterviewForm.value.InterviewDateTo;
    this.startDate = moment(this.startDate).format('MM/DD/YYYY');
    this.EndDate = moment(this.EndDate).format('MM/DD/YYYY');
    let MinTime = this.ScheduleInterviewForm.value.fromtime;
    let Maxtime = this.ScheduleInterviewForm.value.totime;
   
    if (this.idFormArray.length > 0 && this.suitabilityStatus.length > 0) {
      if ((this.ScheduleInterviewForm.value.address == null || this.ScheduleInterviewForm.value.address == '') &&
        (this.ScheduleInterviewForm.value.Location == 0 || this.ScheduleInterviewForm.value.Location == null)) {
          this.interviewformValid = true;
        this.toastrService.error('Please Select Location Or Enter Address');
        return false;
      }
      if (this.startDate > this.EndDate) {
        this.interviewformValid = true;
        //this.DateMsg = false;
        this.toastrService.error('To Date Can Not be Less than From Date.');
        return false;
      } else {
        this.interviewformValid = false;
        this.DateMsg = true;
      }

      if (MinTime < '06.00' || Maxtime > '23.00') {
        this.interviewformValid = true;
        this.toastrService.error('Please enter interview time between 6 AM to 10 PM.');
        //this.TimeRange = false;
        return false;
      }
      else {
        this.interviewformValid = false;
        this.TimeRange = true;
      }

      if (MinTime > Maxtime) {
        this.interviewformValid = true;
        this.TimeMsg = false;
        this.toastrService.error('Please enter interview time between 6 AM to 10 PM.');
        return false;
      } else {
        this.interviewformValid = false;
        this.TimeMsg = true;
      }
      for (var i = 0; i < this.suitabilityStatus.length; i++) {
        for (var j = 0; j < this.idFormArray.length; j++) {
          var a = this.suitabilityStatus[i].Candid;
          if (this.idFormArray[j] == a) {
            this.SuitableCandidate.push({
              "candId": this.suitabilityStatus[i].Candid,
              "jobId": this.suitabilityStatus[i].jobid,
              "jobOpeningId": this.suitabilityStatus[i].openingid,
              "isSuitable": parseInt(this.suitabilityStatus[i].issuitable),
              "Sourceid": this.suitabilityStatus[i].Sourceid,
              "SourceType": this.suitabilityStatus[i].SourceType,
              "Remarks": this.suitabilityStatus[i].Remarks,
              "AdminId": this.adminId,
              "UserId": this.UserId
            });

          }
        }
      }
      // for (let index = 0; index < this.idFormArrayOpening.length; index++) {
      //   this.CandidateArray.push({
      //     "CandId": this.idFormArrayOpening[index].Candid,
      //     "jobOpeningId": this.idFormArrayOpening[index].openingid,
      //     "InterviewDateFrom": this.startDate,
      //     "InterviewDateTo": this.EndDate,
      //     "InterviewTo": this.ScheduleInterviewForm.value.totime,
      //     "InterviewFrom": this.ScheduleInterviewForm.value.fromtime
      //   });
      // }
      this.filteredCandidateArray = (this.SuitableCandidate).filter(function (entry) {
        return entry.isSuitable == 1;
      });

      for (let index = 0; index < this.idFormArrayOpening.length; index++) {
        for (let index1 = 0; index1 < this.filteredCandidateArray.length; index1++) {
          var b = this.idFormArrayOpening[index].Candid;
          if (this.filteredCandidateArray[index1].candId == b) {
            this.CandidateArray.push({
              "CandId": this.idFormArrayOpening[index].Candid,
              "jobOpeningId": this.idFormArrayOpening[index].openingid,
              "InterviewDateFrom": this.startDate,
              "InterviewDateTo": this.EndDate,
              "InterviewTo": this.ScheduleInterviewForm.value.totime,
              "InterviewFrom": this.ScheduleInterviewForm.value.fromtime
            });
          }
        }
      }

      if (this.SuitableCandidate.length != 0) {
        this.interviewformValid = false;
        this.FilteredResult = (this.SuitableCandidate).filter(function (entry) {
          return entry.isSuitable == 1;
        });

        if (this.FilteredResult.length != 0) {
          this.interviewformValid = false;
          this.InterviewService.UpdateSuitabilityStatusOfAppliedCandidate(this.SuitableCandidate).subscribe(res => {
            this.DbResponce = res
            //this.toastrService.success(this.DbResponce.message);
          });
        } else {
          this.toastrService.error('Please select atleast one suitable candidate.');
          this.filteredCandidateArray = [];
          this.CandidateArray = [];
          this.SuitableCandidate = [];
          this.interviewformValid = true;
          return false;
        };
      }


      this.interviewId = 0;
      var scheduleinterviewdetail = {};
      scheduleinterviewdetail = JSON.stringify({
        "StateId": this.ScheduleInterviewForm.value.StateID ? this.ScheduleInterviewForm.value.StateID : this.LocationResponse.stateid,
        "DistrictId": this.ScheduleInterviewForm.value.DistrictID ? this.ScheduleInterviewForm.value.DistrictID : this.LocationResponse.districtid,
        "InterviewDateFrom": this.startDate,
        "InterviewDateTo": this.EndDate,
        "InterviewTo": this.ScheduleInterviewForm.value.totime,
        "InterviewFrom": this.ScheduleInterviewForm.value.fromtime,
        "Address": this.ScheduleInterviewForm.value.address,
        "Workloc": this.ScheduleInterviewForm.value.Location ? this.ScheduleInterviewForm.value.Location : 0,
        "JobDescription": this.ScheduleInterviewForm.value.jobdesription,
        "RolesAndResponsibility": this.ScheduleInterviewForm.value.rolesresponsibility,
        "interviewId": this.interviewId,
        "CandidateList": this.CandidateArray,
        "UserId": this.UserId,
        "JobId": jobid,
        "AdminId": this.adminId,
      });

      try {
        this.spinnerService.show();
        this.InterviewService.addInterviewschedule(scheduleinterviewdetail).subscribe(res => {
          this.DbResponce = res
          if (this.DbResponce.responseResult == true) {
            this.spinnerService.hide();
            this.toastrService.success(this.DbResponce.message);
            this.ScheduleInterviewForm.reset();
            this.router.navigate(['/InterviewList']);
            if(this.BackToReview){
              this.CompanyId = localStorage.getItem('companyid');
            }
            this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, this.PageNumber, this.from);
            this.interviewformValid = true;
            this.AddCandidateCount = 1;
            this.idFormArray = [];
            this.idFormArrayOpening = [];
            this.SuitableCandidate = [];
            this.suitabilityStatus = [];
            this.ExistingCandidate = [];
            this.PreviousStatusArray = [];
            this.BackToReview = false;
            this.pusharray = [];
            this.filteredCandidateArray = [];
            this.JobInterviewDetailcard = false;
            this.applicantListshow = false;
            this.JobCardShow = false;
            this.InterviewCardShow = true;
            this.JobInterviewDetailcard = false;
            this.OtherAddress = false;
            this.AddCandidateButton = true;

          }
          else {
            this.spinnerService.hide();
            this.toastrService.error(this.DbResponce.message);
            this.interviewformValid = false;
          }

        });
      } catch  { }



    }
    else {
      this.toastrService.error("Please Select Suitable Candidate");
      return false;
    }

  }
  BackToInerviewList() {
    this.JobCardShow = false;
    this.InterviewCardShow = true;
    this.JobInterviewDetailcard = false;
    this.pushdatajob = [];
    this.ShowPushDatajob = [];


  }


  BackToJobList() {
    this.minDate = new Date();
    this.JobDetail = [];
    this.suitabilityStatus = [];
    this.pusharray = [];
    this.idFormArrayOpening = [];
    this.idFormArray = [];
    this.ExistingCandidate = [];
    this.AddCandidateCount = 1;
    this.JobCardShow = true;
    this.selectedAll = false;
    this.InterviewCardShow = false;
    this.JobInterviewDetailcard = false;
    this.applicantListshow = false;
    this.AddCandidateButton = true;
    this.OtherAddress = false;
    this.ScheduleInterviewForm.reset();
    //this.pushdatajob = [];
    // this.ShowPushDatajob
    this.InterviewSearch.controls['Stateid'].setValue('');
    this.InterviewSearch.controls['Districtid'].setValue('');
    this.InterviewSearch.controls['DateFrom'].setValue('');
    this.InterviewSearch.controls['DateTo'].setValue('');
    this.InterviewSearch.controls['LocationFilter'].setValue('');
    this.InterviewSearch.controls['SearchKeyInterview'].setValue('');
    this.minDate = new Date();
  }


  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();

  }
  /*** Code to Change time formate 24 hour to 12 hour formate *****/
  converttime(time24) {
    var ts = time24;
    if (ts != null && ts.length == 5) {
      var H = +ts.substr(0, 2);
      var h = (H % 12) || 12;
      h = (h < 10) ? (0 + h) : h;
      var ampm = H < 12 ? " AM" : " PM";
      ts = h + ts.substr(2, 3) + ampm;
      return ts;
    } else {
      return "NA";
    }
  }

  BackToInterviewList() {
    this.HideCommon = 2;
    this.PageNumber = 0;
    this.pushdatajob = [];
    this.AddCandidateCount = 1;
    this.SearchResultJob = false;
    this.JobInterviewDetailcard = false;
    this.applicantListshow = false;
    this.InterviewCardShow = true;
    this.JobCardShow = false;
    this.AddCandidateButton = true;
  }

  goToCommon() {
    this.HideCommon = 1;
    // this. minDate = new Date();
    this.SearchResultInterview = false;
    this.JobCardShow = false;
    this.InterviewCardShow = false;
    this.JobInterviewDetailcard = false;
    this.applicantListshow = false;
    this.AddCandidateButton = true;
    this.pushdatajob = [];
    this.ShowPushDatajob = [];
    this.ShowPushDataInterview = [];
    this.pushdataInterview = [];
    this.FilterJobByComoany.reset();
    this.InterviewSearch.reset();
    this.ScheduleInterviewForm.reset();
    this.FilterJobByComoany.controls['Stateid'].setValue('');
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
    this.router.navigate(['/InterviewList']);
  }
  ResetFilterResultforjob() {
    this.PageNumber = 0;
    this.FilterJobByComoany.controls['Stateid'].setValue('');
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
    this.SearchResultJob = false;
    this.GetJobListByComapnyId(this.PageNumber, '');
    this.district = [];

  }
  ResetFilterResult() {
    this.PageNumber = 0;
    this.InterviewSearch.controls['Stateid'].setValue('');
    this.InterviewSearch.controls['Districtid'].setValue('');
    this.InterviewSearch.controls['DateFrom'].setValue('');
    this.InterviewSearch.controls['DateTo'].setValue('');
    this.InterviewSearch.controls['LocationFilter'].setValue('');
    this.InterviewSearch.controls['SearchKeyInterview'].setValue('');
    this.SearchResultInterview = false;
    this.GetInterviewListByCompanyId(this.CompanyId, this.adminId, this.PageNumber, '');
    this.district = [];

  }
  GetInterviewId(InterviewId: any, JobId: any, CompId: any) {
    localStorage.setItem('Interviewid', InterviewId);
    localStorage.setItem('JobId', JobId);
    localStorage.setItem('CompId', CompId);
  }

  screeningAnswer: any = [];
  modalScreening: BsModalRef;
  appliedCandidate: any;
  index: any;
  result: any;
  ScrStatus: any;
  openscreeningModal(templateSector: TemplateRef<any>, CandListDetail: any, i) {


    this.appliedCandidate = CandListDetail;
    this.ScrStatus = CandListDetail.issuitable;
    this.index = i;

    let postScrData = {
      'Jobid': CandListDetail.interviewSchldJOBID,
      'Jobopeningid': CandListDetail.candjobopeningid,
      'candidateid': CandListDetail.candId,
      'adminid': this.adminId,
      'userid': 0
    };

    this.spinnerService.show();
    this.screeningAnswer = [];
    this.InterviewService.getScreeningAnswer(postScrData).subscribe(res => {

      this.result = res
      this.spinnerService.hide();
      if (this.result.getquestiongroup[0].groupList.length) {
        this.modalScreening = this.modalService.show(templateSector, { class: 'modal-md' });
        this.screeningAnswer = this.result.getquestiongroup[0];
      } else {
        this.toastrService.error('server error')
      }
    });
  }


  closeScreeningModal() {
    this.modalScreening.hide();
  }
  CandDetail: any = [];
  selectSuitable(templatefornotsuitable: TemplateRef<any>, value: any, appliedjob, i: any) {
    this.CandDetail = appliedjob;

    // FOR CHANGE DROPDOWN VALUE WHEN CLICK IN SUITABLE AND NOT SUITABLE AFTER CHECK SCREENING QUESTION.
    var SuitableStatus = value;
    $("#" + "myDropDown" + i).val(SuitableStatus);

    this.modalScreening.hide();
    //this.AppliedCandidateList[i].suitableCand = value;
    this.JobSuitability(templatefornotsuitable, value, this.CandDetail.candId, this.CandDetail.candname, this.CandDetail.interviewSchldJOBID, this.CandDetail.candjobopeningid, this.CandDetail.apitype, this.CandDetail.candidatesourceid, i);
  }
  GetToken(user: any) {
    this.InterviewService.getToken(user).subscribe(res => {
      this.tokenResponse = res
      if (this.tokenResponse.lsttoken != null) {
        this.token = this.tokenResponse.lsttoken[0].token;
        this.token = 'Bearer' + ' ' + this.token;
      } else {
        this.tokenResponse.lsttoken = [];
      }
    });
  }

  MrigsDataShow: boolean = false;
  candidatedetails: any = [];
  addressinfodatap: any = [];
  addressinfodata: any = [];
  addressinfodatac: any = [];
  familyinfodata: any = [];
  langinfodata: any = [];
  areainfodata: any = [];
  workexpinfodata: any = [];
  empeduinfodata: any = [];
  empcertinfodata: any = [];
  PartnerInfo: any = [];
  TrainingPartnerDetails: any = [];
  candid: any;

  ViewDetails(template: TemplateRef<any>, template2: TemplateRef<any>, candiID: any, apitype: any) {
    this.MrigsDataShow = false;
    this.candidatedetails = [];
    this.addressinfodata = [];
    this.addressinfodatac = [];
    this.familyinfodata = [];
    this.langinfodata = [];
    this.areainfodata = [];
    this.workexpinfodata = [];
    this.empcertinfodata = [];
    this.empeduinfodata = [];
    this.PartnerInfo = [];
    this.TrainingPartnerDetails = [];

    if (apitype == 'YS') {
      this.spinnerService.show();
      this.ViewYSCandidateDetail(candiID);
      this.ViewYSCandidateLanguageDetail(candiID);
      this.ViewYSCandidateAddressDetail(candiID);
      this.ViewYSCandidateFamilyDetail(candiID);
      this.ViewYSCandidateInterestDetail(candiID);
      this.ViewYSCandidateExperienceDetail(candiID);
      this.ViewYSCandidateEducationDetail(candiID);
      this.ViewMrigsCandidateEducationDetail(candiID);
      this.ViewYSCandidateCertificationetail(candiID);
      this.modalRef = this.modalService.show(template,
        Object.assign({}, { class: 'candidate-view-modal modal-lg' }
        ));
    }
    if (apitype == 'MRIGS') {
      this.MrigsDataShow = true;
      this.spinnerService.show();
      // this.ViewMrigsCandidateDetail(candiID);
      // this.ViewMrigsCandidateLanguageDetail(candiID);
      // this.ViewMrigsCandidateAddressDetail(candiID);
      // this.ViewMrigsCandidateFamilyDetail(candiID);
      // this.ViewMrigsCandidateInterestDetail(candiID);
      // this.ViewMrigsCandidateExperienceDetail(candiID);
      // this.ViewMrigsCandidateCertificateDetail(candiID);
      // this.modalRef = this.modalService.show(template,
      //   Object.assign({}, { class: 'candidate-view-modal modal-lg' }
      //   ));
      this.CandidateService.GetMrigsCandidateDetails(candiID).subscribe(res => {
        this.ProfileResponce = res
        this.spinnerService.hide();
        if (this.ProfileResponce.lstCandidateInfo != null) {
          this.candidatedetails = this.ProfileResponce.lstCandidateInfo[0];
          this.modalRef = this.modalService.show(template,
            Object.assign({}, { class: 'candidate-view-modal modal-lg' }
            ));
        } else {
          this.candidatedetails = [];
        }
      });
    }
    if (apitype == 'Rojgaar') {
      // let usr = this.UserId;
      // this.candid = candiID;
      // this.InterviewService.getToken(usr).subscribe(res => {
      //   this.tokenResponse = res
      //   if (this.tokenResponse.lsttoken != null) {
      //     this.token = this.tokenResponse.lsttoken[0].token;
      //     this.token =  'Bearer'+' '+ this.token;
      //   } else {
      //     this.tokenResponse.lsttoken = [];
      //   }

      //    });
      //this.GetAllMinEducation();
      //this.GetAllRelationdetails();
      //this.GetAllReligions_details();
      this.GetEmployeeAddress();
      this.GetFamilyDetails();
      this.GetCandidateLanguage();
      this.GetEmpAreaOfIntrest();
      this.GetEmpWorkExperience();
      this.GetEmpCertification();
      this.GetEmpEdutnQualifictin();
      this.spinnerService.show();
      this.InterviewService.mydatabaseCandidateDetail(candiID).subscribe(res => {
        this.ProfileResponce = res
        this.spinnerService.hide();
        //if (this.ProfileResponce.lstCandeSeMyDatase != null) {
        if (this.ProfileResponce.lstCandeSeMyDatase.length != 0) {
          this.candidatedetails = this.ProfileResponce.lstCandeSeMyDatase[0];
          this.modalRef = this.modalService.show(template,
            Object.assign({}, { class: 'candidate-view-modal modal-lg' }
            ));
        } else {
          this.modaldefualt = this.modalService.show(template2);
          this.candidatedetails = [];
        }
        // this.modalRef = this.modalService.show(template,
        //   Object.assign({}, { class: 'candidate-view-modal modal-lg' }
        //   ));
      });
    }
    if (apitype == '' || apitype == null) {
      this.modaldefualt = this.modalService.show(template2);
    }
  }

  ProfileResponce: any = [];
  ViewMrigsCandidateDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstCandidateInfo != null) {
        this.candidatedetails = this.ProfileResponce.lstCandidateInfo[0];
      } else {
        this.candidatedetails = [];
      }
    });
  }

  ViewMrigsCandidateLanguageDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateLanguageDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstCandidateLang != null) {
        this.langinfodata = this.ProfileResponce.lstCandidateLang;
      } else {
        this.langinfodata = [];
      }
    });
  }

  ViewMrigsCandidateAddressDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateAddressDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmployeeAddress != null) {
        this.addressinfodata = this.ProfileResponce.lstEmployeeAddress;
      } else {
        this.addressinfodata = [];
      }
    });
  }

  ViewMrigsCandidateFamilyDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateFamilyDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstGetFamilyDtl != null) {
        this.familyinfodata = this.ProfileResponce.lstGetFamilyDtl;
      } else {
        this.familyinfodata = [];
      }
    });
  }

  ViewMrigsCandidateInterestDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateInterestDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstAreaOfIntrest != null) {
        this.areainfodata = this.ProfileResponce.lstAreaOfIntrest;
      } else {
        this.areainfodata = [];
      }
    });
  }

  ViewMrigsCandidateExperienceDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateExperienceDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpWorkExperience != null) {
        this.workexpinfodata = this.ProfileResponce.lstEmpWorkExperience;
      } else {
        this.workexpinfodata = [];
      }
    });
  }

  ViewMrigsCandidateEducationDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateEducationDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpWorkExperience != null) {
        this.empeduinfodata = this.ProfileResponce.lstEmpWorkExperience;
      } else {
        this.empeduinfodata = [];
      }
    });
  }

  ViewMrigsCandidateCertificateDetail(candiID: any) {
    this.CandidateService.ViewMrigsCandidateCertificateDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpWorkExperience != null) {
        this.empcertinfodata = this.ProfileResponce.lstEmpWorkExperience;
      } else {
        this.empcertinfodata = [];
      }
    });
  }

  ////////////////////  ys detials  //////////
  ViewYSCandidateDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstCandidateDetails != null) {
        this.candidatedetails = this.ProfileResponce.lstCandidateDetails[0];
      } else {
        this.candidatedetails = [];
      }
    });
  }

  ViewYSCandidateLanguageDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateLanguageDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstCandidateLang != null) {
        this.langinfodata = this.ProfileResponce.lstCandidateLang;
      } else {
        this.langinfodata = [];
      }
    });
  }

  ViewYSCandidateAddressDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateAddressDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmployeeAddress != null) {
        this.addressinfodata = this.ProfileResponce.lstEmployeeAddress;
      } else {
        this.addressinfodata = [];
      }
    });
  }

  ViewYSCandidateFamilyDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateFamilyDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstGetFamilyDtl != null) {
        this.familyinfodata = this.ProfileResponce.lstGetFamilyDtl;
      } else {
        this.familyinfodata = [];
      }
    });
  }

  ViewYSCandidateInterestDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateInterestDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstAreaOfIntrest != null) {
        this.areainfodata = this.ProfileResponce.lstAreaOfIntrest;
      } else {
        this.areainfodata = [];
      }
    });
  }

  ViewYSCandidateExperienceDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateExperienceDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpWorkExperience != null) {
        this.workexpinfodata = this.ProfileResponce.lstEmpWorkExperience;
      } else {
        this.workexpinfodata = [];
      }
    });
  }

  ViewYSCandidateEducationDetail(candiID: any) {
    this.CandidateService.ViewYSCandidateEducationDetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpEdutnQualifictin != null) {
        this.empeduinfodata = this.ProfileResponce.lstEmpEdutnQualifictin;
      } else {
        this.empeduinfodata = [];
      }
    });
  }

  ViewYSCandidateCertificationetail(candiID: any) {
    this.CandidateService.ViewYSCandidateCertificationetail(candiID).subscribe(res => {
      this.ProfileResponce = res
      this.spinnerService.hide();
      if (this.ProfileResponce.lstEmpCertification != null) {
        this.empcertinfodata = this.ProfileResponce.lstEmpCertification;
      } else {
        this.empcertinfodata = [];
      }
    });
  }

  GetEmployeeAddress() {
    this.InterviewService.GetEmployeeAddress(this.candid, this.token).subscribe(res => {
      this.addressinfodata = res;
      if (this.addressinfodata.lstEmployeeAddress != null) {
        this.addressinfodata = this.addressinfodata.lstEmployeeAddress;
      }
      else {
        this.addressinfodata = [];
      }
    });
  }

  //////////
  addressdistirct: any;
  workexpdistics: any;
  GetAllDistrictaddress(stateid: any) {
    if (stateid) {
      this.masterService.GetAllDistrict(stateid).subscribe(res => {
        this.addressdistirct = res;
        this.addressdistirct = this.addressdistirct;
      });
    }
  }

  //////////
  cdistricaddress: any;
  GetAllcDistrictaddress(stateid: any) {
    if (stateid) {
      this.masterService.GetAllDistrict(stateid).subscribe(res => {
        this.cdistricaddress = res;
        this.cdistricaddress = this.cdistricaddress;
      });
    }
  }

  //////////
  GetFamilyDetails() {
    this.InterviewService.GetFamilyDetails(this.candid, this.token).subscribe(res => {
      this.familyinfodata = res;
      if (this.familyinfodata) {
        this.familyinfodata = this.familyinfodata.lstGetFamilyDtl;
      }
      else {
      }
    });
  }

  //////////
  GetCandidateLanguage() {
    this.InterviewService.GetCandidateLanguage(this.candid, this.token).subscribe(res => {
      this.langinfodata = res;
      if (this.langinfodata) {
        this.langinfodata = this.langinfodata.lstCandidateLang;
      }
      else {
        this.langinfodata = res;
      }
    });
  }

  //////////
  GetEmpAreaOfIntrest() {
    this.InterviewService.GetEmpAreaOfIntrest(this.candid, this.token).subscribe(res => {
      this.areainfodata = res;
      if (this.areainfodata) {
        this.areainfodata = this.areainfodata.lstAreaOfIntrest;
      }
      else {
        this.areainfodata = res;
      }
    });
  }

  //////////
  GetEmpWorkExperience() {
    this.spinnerService.show();
    this.InterviewService.GetEmpWorkExperience(this.candid, this.token).subscribe(res => {
      this.workexpinfodata = res;
      if (this.workexpinfodata) {
        this.workexpinfodata = this.workexpinfodata.lstEmpWorkExperience;
      }
      else {
        this.workexpinfodata = this.workexpinfodata.lstEmpWorkExperience[0];
      }
    });
  }

  ////////////
  GetEmpCertification() {
    this.spinnerService.show();
    this.InterviewService.GetEmpCertification(this.candid, this.token).subscribe(res => {
      this.empcertinfodata = res;
      if (this.empcertinfodata) {
        this.empcertinfodata = this.empcertinfodata.lstEmpCertification;
      }
      else {
        this.empcertinfodata = this.empcertinfodata.lstEmpCertification[0];
      }
    });
  }

  //////////
  GetEmpEdutnQualifictin() {
    this.spinnerService.show();
    this.InterviewService.GetEmpEdutnQualifictin(this.candid, this.token).subscribe(res => {
      this.empeduinfodata = res;
      if (this.empeduinfodata) {
        this.empeduinfodata = this.empeduinfodata.lstEmpEdutnQualifictin;
      }
      else {
        this.empeduinfodata = this.empeduinfodata.lstEmpEdutnQualifictin[0];
      }
    });
  }


  /////////////////// End candiate details //////////
  CandiadateDescr: any;
  viewcandidateDescription(candidDesc: any, template3: TemplateRef<any>) {
    this.CandiadateDescr = candidDesc;
    this.modalRefdesc = this.modalService.show(template3,
      Object.assign({}, { class: 'candidate-view-modal modal-sm' }
      ));
  }


  PiaContacDetials: any = []
  modaldpia: BsModalRef;
   ClickCount = 1;
  openpiaData(temppia: TemplateRef<any>, candiID: any, listjobid: any, openingid: any, apitype: any) {
    if (apitype == 'MRIGS') {
      this.CandidateService.GetPiaDetail(listjobid, openingid, candiID).subscribe(res => {
        this.ProfileResponce = res
        this.spinnerService.hide();
        if (this.ProfileResponce.lstGetPiaDetai != null) {
          this.PiaContacDetials = this.ProfileResponce.lstGetPiaDetai[0];
           if(this.ClickCount == 1){
          this.modaldpia = this.modalService.show(temppia,
            { backdrop: 'static', keyboard: false, class: 'modal-lg' });
            // ));
           }
           this.ClickCount++;
        } else {
          this.PiaContacDetials = [];
        }
      });
    }
  }
  ClosePiaDetail(){
    this.modaldpia.hide()
    this.ClickCount = 1;

  }

}
