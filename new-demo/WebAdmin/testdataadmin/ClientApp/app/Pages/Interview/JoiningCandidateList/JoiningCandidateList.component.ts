// import { Component, OnInit, HostListener } from '@angular/core';
import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../../Services/jobpost.service';
import { MasterService } from '../../../Services/master.service';
import { CustomValidators } from '../../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { UpdateprofileService } from '../../../Services/updateprofile.service';
import { RegistrationService } from '../../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { AppConfig } from '../../../Globals/app.config';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CompanyProfileService } from '../../../Services/companyprofile.service';
import { interviewListService } from '../../../Services/interview.service';
import { Options } from 'ng5-slider';
//import { timingSafeEqual } from 'crypto';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { CandidateService } from '../../../Services/candidate.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';
@Component({
  selector: 'app-JoiningCandidateList',
  templateUrl: './JoiningCandidateList.component.html'

})

export class JoiningCandidateListComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  modalRef: BsModalRef;
  modalRefdesc: BsModalRef;
  modaldefualt: BsModalRef;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  FilterCompanyRegistration: FormGroup;
  FilterJobByComoany: FormGroup;
  InterviewSearch: FormGroup;
  adminId: any;
  CompanyId: any;
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
  delay: any;
  PageNumber: number = 0;
  from: any;
  JobId: number;
  HideCommon: any = 1;
  token: any;
  tokenResponse: any = [];
  CompanyListShow: any = true;
  PageNumberCmp: number = 0;
  JobType: any;
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
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private CandidateService: CandidateService,
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
      else if (this.joblist.length >= 10 && this.JobCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetJobListByComapnyId(this.PageNumber, 'scroll');
      }
      else if (this.InterviewRes.length >= 10 && this.InterviewCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetInterviewList(this.JobId, this.PageNumber, 'scroll', this.UserStatus,this.JobType,this.EventId);
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

    localStorage.removeItem('compid');
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));


    this.FilterCompanyRegistration = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'CandidatePlaced': ['', Validators.required],
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
    this.GetCompanyData(0, '');
    this.GetAllStates();
  }




  ComSearch: boolean = false
  GetCompanyDataFilter() {
    this.GetCompanyData(0, '');
    this.ComSearch = true;
  }
  Response: any
  ResponseResult: any
  RegisteredCompany: any = [];
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
      'companyid': 0,
      'logintype': this.FilterCompanyRegistration.value.logintype ? this.FilterCompanyRegistration.value.logintype : "",
      'StateiD': this.FilterCompanyRegistration.value.StateiD ? this.FilterCompanyRegistration.value.StateiD : 0,
      'DistrictID': this.FilterCompanyRegistration.value.DistrictID ? this.FilterCompanyRegistration.value.DistrictID : 0,
      'SearchKey': this.FilterCompanyRegistration.value.JobKeyword ? this.FilterCompanyRegistration.value.JobKeyword : "",
      'Page': this.PageNumberCmp,
      'isJoined': this.FilterCompanyRegistration.value.CandidatePlaced ? this.FilterCompanyRegistration.value.CandidatePlaced : null,
    };


    this.ShowPushDataCompany = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "JobKeyword": this.FilterCompanyRegistration.value.JobKeyword ? this.FilterCompanyRegistration.value.JobKeyword : 'NA',
      "logintype": this.FilterCompanyRegistration.value.logintype ? this.FilterCompanyRegistration.value.logintype : 'NA',
      'isJoined': this.FilterCompanyRegistration.value.CandidatePlaced ? this.FilterCompanyRegistration.value.CandidatePlaced : 'NA',
    };

    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.InterviewService.GetFilterCompanyJoiningConfirmation(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstGetCompanyListOfferLetter;
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
      this.InterviewService.GetFilterCompanyJoiningConfirmation(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstGetCompanyListOfferLetter;
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
    this.PageNumber = 0;
    this.FilterJobByComoany.controls['Stateid'].setValue('');
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
    this.FilterJobByComoany.controls['JobType'].setValue('');
    this.GetJobListByComapnyId(this.PageNumber, this.from);
  }

  BackToCompanyList() {
    this.JobCardShow = false;
    this.CompanyListShow = true;
    this.joblist = [];
    this.SearchResultJob = false;
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
    this.GetCompanyData(this.PageNumber, '');
    this.district = [];
  }

  workLocation: any = [];
  GetWorkLocation() {
    var parentid = 0;
    this.InterviewService.GetCompanyWorkLocation(this.CompanyId, this.adminId).subscribe(res => {
      this.DbResponce = res;

      if (this.DbResponce != null) {
        this.workLocation = this.DbResponce.lstCompanyWorkLocation
      }
    });
  }

  // onClicked(companyid: string) {
  //   this.HideCommon = 2;
  //   this.CompanyId = companyid;
  //   this.GetWorkLocation();
  //   this.GetJobListByComapnyId(this.PageNumber, this.from);
  // }

  // onbackregist() {
  //   this.joblist = [];
  //   this.ShowPushDatajob = [];
  //   this.pushdatajob = [];
  //   this.FilterJobByComoany.reset();
  //   this.FilterJobByComoany.controls['Stateid'].setValue(0);
  //   this.FilterJobByComoany.controls['Districtid'].setValue(0);
  //   this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
  // }

  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
      });
    } catch  { }
  }

  onChangeState(statename: any) {
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
  joblistResFilter: any = [];
  GetJobListByComapnyId(page: any, from: any) {
    this.JobCardShow = true;
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
      "JobType": this.FilterJobByComoany.controls.JobType.value ? this.FilterJobByComoany.controls.JobType.value : 'All',
    };
    this.pushdatajob = {
      "StateId": this.FilterJobByComoany.controls.Stateid.value != '' ? parseInt(this.FilterJobByComoany.controls.Stateid.value) : 0,
      "DistrictId": this.FilterJobByComoany.controls.Districtid.value != '' ? parseInt(this.FilterJobByComoany.controls.Districtid.value) : 0,
      "PageNumber": this.PageNumber != 0 ? this.PageNumber : 0,
      "Search": this.FilterJobByComoany.controls.SearchKeyJob.value,
      "JobType": this.FilterJobByComoany.controls.JobType.value ? this.FilterJobByComoany.controls.JobType.value : 'ALL',
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
          // this.joblistResFilter = (this.DbResponce.lstJobListByCompanyId).filter(function (entry) {
          //   return entry.totalScheduleInterview != 0;
          // });
          this.joblistResFilter = this.DbResponce.lstJobListByCompanyId;
          if (this.joblistResFilter != null) {
            //this.joblistRes = this.joblistResFilter;
            this.joblistRes = this.joblistResFilter;
            this.joblist = this.joblist.concat(this.joblistRes);
          } else {
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
          // this.joblistResFilter = (this.DbResponce.lstJobListByCompanyId).filter(function (entry) {
          //   return entry.totalScheduleInterview != 0;
          // });
          this.joblistResFilter = this.DbResponce.lstJobListByCompanyId;
          if (this.joblistResFilter != null) {
            //this.joblistRes = this.joblistResFilter;
            this.joblistRes = this.joblistResFilter;
            this.joblist = this.joblistRes;
          } else {
            this.joblist = [];
            this.spinnerService.hide();
          }
          this.delay = false;
        });
      } catch  { }
    }
  }
  UserStatus: boolean = true;
  EventId: any = 0;
  GetInterviewListFilter(PageNo: any, from: any) {
    this.GetInterviewList(this.JobId, PageNo, from, this.UserStatus,this.JobType,this.EventId);
  }
  InterviewFilterResult: any = [];
  GetInterviewList(jobid: any, PageNo: any, from: any, userstatus: any, jobtype: any, eventid: any) {
    //this.UserStatus = userstatus;
    this.UserStatus = userstatus;
    this.JobType = jobtype;
    this.EventId = eventid;
    if (this.JobType == "WalkIn") {
      this.GetWalkinDetail(jobid, 0);

    } else if (this.JobType == "EVENT") {
      this.GetEventDetail(jobid, 0);

    }
    else {
      if (this.UserStatus) {
        this.HideCommon = 0;
        this.JobId = jobid;
        this.JobCardShow = false;
        this.InterviewCardShow = true;
        this.JobInterviewDetailcard = false;
        this.SearchResultJob = false;
        let statedid;
        let districtid;
        let worklocationid;

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
        this.pushdataInterview = {
          "StateId": this.InterviewSearch.controls.Stateid.value != '' ? parseInt(this.InterviewSearch.controls.Stateid.value) : 0,
          "DistrictId": this.InterviewSearch.controls.Districtid.value != '' ? parseInt(this.InterviewSearch.controls.Districtid.value) : 0,
          "pageNumber": PageNo,
          "jobid": this.JobId,
          // "InterviewDateTo": this.InterviewSearch.controls.DateTo.value!= '' ? this.InterviewSearch.controls.DateTo.value : '',
          // "InterviewDateFrom":this.InterviewSearch.controls.DateFrom.value!= '' ? this.InterviewSearch.controls.DateFrom.value : '',
          // "Workloc": this.InterviewSearch.controls.LocationFilter.value != '' ? parseInt(this.InterviewSearch.controls.LocationFilter.value) : 0,
          "SearchKey": this.InterviewSearch.controls.SearchKeyInterview.value
        };
        if (from == 'scroll') {
          this.spinnerService.show();
          this.InterviewService.getAdminInterviewlistByJobId(this.pushdataInterview).subscribe(res => {
            this.DbResponce = res;
            this.InterviewFilterResult = (this.DbResponce.lstAdminInterviewListByJobId).filter(function (entry) {
              return entry.totofferltrgertd != 0;
            });
            this.InterviewResfinal = this.InterviewFilterResult;
            //this.InterviewResfinal = this.DbResponce.lstAdminInterviewListByJobId;
            if (this.InterviewResfinal != null) {
              this.spinnerService.hide();
              this.InterviewRes = this.InterviewRes.concat(this.InterviewResfinal);
            } else {
              this.InterviewRes = [];
              this.spinnerService.hide();
            }
            this.delay = false;
          });
        }
        else {
          this.spinnerService.show();
          this.InterviewService.getAdminInterviewlistByJobId(this.pushdataInterview).subscribe(res => {
            this.DbResponce = res;
            this.InterviewFilterResult = (this.DbResponce.lstAdminInterviewListByJobId).filter(function (entry) {
              return entry.totofferltrgertd != 0;
            });
            this.InterviewResfinal = this.InterviewFilterResult;
            //this.InterviewResfinal = this.DbResponce.lstAdminInterviewListByJobId;
            if (this.InterviewResfinal != null) {
              this.spinnerService.hide();
              this.InterviewRes = this.InterviewResfinal;
            } else {
              this.InterviewRes = [];
              this.spinnerService.hide();
            }
            this.delay = false;
          });
        }
      }
      else {
        this.toastrService.error('Inactive user can not generate offer letter to the candidate.')

      }
    }
  }

  BackToJobList() {
    this.HideCommon = 2;
    this.PageNumber = 0;
    this.JobType = '';
    this.JobCardShow = true;
    this.WalkInDetail = false;
    this.EventDetail = false;
    this.JoiningConfirmation = [];
    this.SearchResultJob = false;
    this.JobCardShow = true;
    this.InterviewCardShow = false;
    this.JobInterviewDetailcard = false;
    this.InterviewSearch.controls['Stateid'].setValue('');
    this.InterviewSearch.controls['Districtid'].setValue('');
    this.InterviewSearch.controls['DateFrom'].setValue('');
    this.InterviewSearch.controls['DateTo'].setValue('');
    this.InterviewSearch.controls['LocationFilter'].setValue('');
    this.InterviewSearch.controls['SearchKeyInterview'].setValue('');
  }
  JoinedCandidateList: any = [];
  FilteredResult: any = [];
  UserId: any;
  GetJobDetail(jobid: any, interviewid: any) {
    this.SubmitCount = 1;
    this.JobInterviewDetailcard = true;
    this.InterviewCardShow = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    try {
      this.spinnerService.show();
      this.InterviewService.GetAppliedJobById(this.adminId, jobid).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce != null) {
          this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
          this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID;
          this.GetToken(this.UserId);
        }
        else {
          this.JobDetail = [];
          this.spinnerService.hide();
        }
        var getInterview = {
          "Adminid": this.adminId,
          "JOBID": jobid,
          "INTERVIEWID": interviewid
        };
        this.spinnerService.show();
        this.InterviewService.getInterviewDetailById(getInterview).subscribe(res => {
          this.InterviewDetail = res;

          if (this.DbResponce != null) {
            this.InterviewDetail = this.InterviewDetail.Data[0];
          } else {
            this.InterviewDetail = [];
            this.spinnerService.hide();
          }
        });
        this.InterviewService.GetCommanCandidateList(this.adminId, jobid, interviewid, 0).subscribe(res => {
          this.DbResponce = res;
          if (this.DbResponce != null) {
            this.spinnerService.hide();
            this.JoinedCandidateList = this.DbResponce.lstCandidateInfo;
            this.dtTrigger.next();
            this.FilteredResult = (this.JoinedCandidateList).filter(function (entry) {
              return entry.offerletterstatus == 1;
            });
          }
        });
      });
    } catch  { }
  }

  WalkInDetail: boolean = false;
  GetWalkinDetail(jobid: any, interviewid: any) {
    this.SubmitCount = 1;
    this.JobCardShow = false;
    this.WalkInDetail = true;
    this.InterviewCardShow = false;
    //this.SearchResultInterview = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    try {
      this.spinnerService.show();
      this.InterviewService.GetAppliedJobById(this.adminId, jobid).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
          this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID;
          this.GetToken(this.UserId);
        }
        this.InterviewService.CandidateListForWalkin(this.adminId, jobid, interviewid, this.UserId).subscribe(res => {
          this.DbResponce = res;
          if (this.DbResponce != null) {
            this.JoinedCandidateList = this.DbResponce.lstCandidateInfo;
            this.dtTrigger.next();
            //this.FilteredResult = this.JoinedCandidateList;
            this.FilteredResult = (this.JoinedCandidateList).filter(function (entry) {
              return entry.offerletterstatus == 1;
            });
            // this.FilteredResult = (this.FilteredResult).filter(function (entry) {
            //   return entry.issuitable == 1;
            // });


          }
        });
      });
    } catch  { }
  }
  EventDetail: boolean = false;
  EventRes:any=[];
  GetEventDetail(jobid: any, interviewid: any) {
    this.SubmitCount = 1;
    this.JobCardShow = false;
    this.EventDetail = true;
    this.InterviewCardShow = false;
    //this.SearchResultInterview = false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();


    this.spinnerService.show();
    this.InterviewService.GetEmployerJobDetails(jobid,this.CompanyId, this.EventId).subscribe(res => {
      this.EventRes = res;
      if (this.EventRes.lstGetEventEmployerJobList.length > 0) {
        this.EventRes = this.EventRes.lstGetEventEmployerJobList;
        this.spinnerService.hide();
      }
      else {
        this.EventRes = [];
        this.spinnerService.hide();
      }
    });
    let SendData = {
      'Adminid':this.adminId,
      'Jobid':jobid,
      'Eventid':this.EventId,
      'Userid':0,
      'page':0,

    }
    this.InterviewService.CandidateListForEvent(SendData).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.JoinedCandidateList = this.DbResponce.lstCandidateEvent;
        //this.FilteredResult =  this.JoinedCandidateList;
        this.FilteredResult = (this.JoinedCandidateList).filter(function (entry) {
          return entry.offerletterstatus == 1;
        });
        this.dtTrigger.next();
      }
    });
    try {

     // this.spinnerService.show();
      // this.InterviewService.GetAppliedJobById(this.adminId, jobid).subscribe(res => {
      //   this.DbResponce = res

      //   if (this.DbResponce != null) {
      //     this.spinnerService.hide();
      //     this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
      //     //this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID;
      //     //this.GetToken(this.UserId);
      //   }

       
      // });
    } catch  { }
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
    this.PageNumber = 0;
    this.SubmitCount = 1;
    this.JoiningConfirmation = [];
    this.JobInterviewDetailcard = false;
    this.InterviewCardShow = true;
  }

  goToCommon() {
    this.HideCommon = 1;
    this.JoiningConfirmation = [];
    this.JobCardShow = false;
    this.InterviewCardShow = false;
    this.JobInterviewDetailcard = false;
    this.SearchResultJob = false;
    this.FilterJobByComoany.controls['Stateid'].setValue('');
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
  }
  ResetFilterResultforjob() {
    this.PageNumber = 0;
    this.SearchResultJob = false;
    this.FilterJobByComoany.controls['Stateid'].setValue('');
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    this.FilterJobByComoany.controls['SearchKeyJob'].setValue('');
    this.FilterJobByComoany.controls['JobType'].setValue('');
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
    this.GetInterviewList(this.JobId, this.PageNumber, '', this.UserStatus,this.JobType,this.EventId);
    this.district = [];
  }
  OfferletterDetail: any = [];
  modalRefForOffer: BsModalRef;
  GetOfferLetterDetail(jobId: any, interviewId: any, CandId: any, template6: TemplateRef<any>) {
    this.modalRefForOffer = this.modalService.show(template6,
      { backdrop: 'static', keyboard: false });
    try {
      this.InterviewService.getCandidateOfferLetterDetail(this.adminId, this.UserId, jobId, interviewId, CandId).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce != null) {
          this.OfferletterDetail = this.DbResponce.lstCandidateOfferLette[0];
        }
      });
    } catch  { }
  }
  CloseOfferLetter() {
    this.modalRefForOffer.hide()
  }
  SelectCandidateStatus: boolean = false;
  JoiningConfirmation: any = [];
  JoinedCandidate(jobid: any, interviewid: any, candidateid: any, candopeningid: any, OfferLetterId: any) {
    this.JobId = jobid;
    this.SelectCandidateStatus = true;
    this.JoiningConfirmation.push({
      // 'Jobtype': this.JobType,
      // 'Eventid': this.EventId,
      'AdminId': this.adminId,
      'UserId': this.UserId,
      'offerletterid': OfferLetterId,
      'candidateid': candidateid,
      'OpeningId': candopeningid,
      'jobid': jobid,
      'interviewid': interviewid,
      'Isjoiningstatus': 1,
    });
  }
  SubmitCount:any = 1;
  SubmitStatusOfCandidate() {
    if (this.SubmitCount == 1) {
    try {
      this.spinnerService.show();
      this.InterviewService.SetJoinedCandidateList(JSON.stringify(this.JoiningConfirmation)).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce.responseResult == true) {
          this.spinnerService.hide();
          this.toastrService.success(this.DbResponce.message);
          this.JoiningConfirmation = [];
          this.InterviewCardShow = false;
          this.JobCardShow = true;
          this.JobInterviewDetailcard = false;
          this.WalkInDetail = false;
          this.EventDetail = false;
          this.JobType = '';
          this.SelectCandidateStatus = false;
        } else {
          this.spinnerService.hide();
          this.SelectCandidateStatus = true;
        }
      });
    } catch  { }
  }
  this.SubmitCount++;
  }
  CloseStatusOfCandidate() {
    this.JoiningConfirmation = [];
    this.InterviewCardShow = false;
    this.JobCardShow = true;
    this.JobInterviewDetailcard = false;
    this.SelectCandidateStatus = false;
    this.SubmitCount = 1;
  }


  selectedRow: Number;
  setClickedRow(index) {
    this.selectedRow = index;
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
      this.candid = candiID;
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
        // if (this.ProfileResponce.lstCandeSeMyDatase != null) {
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
    //this.CandidateService.GetEmployeeAddress(this.candid).subscribe(res => {
    this.InterviewService.GetEmployeeAddress(this.candid, this.token).subscribe(res => {
      this.addressinfodata = res;
      if (this.addressinfodata.lstEmployeeAddress != null && this.addressinfodata.lstEmployeeAddress.length != 0
      ) {
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
    // this.CandidateService.GetFamilyDetails(this.candid).subscribe(res => {
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
    // this.CandidateService.GetCandidateLanguage(this.candid).subscribe(res => {
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
    // this.CandidateService.GetEmpAreaOfIntrest(this.candid).subscribe(res => {
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
    // this.CandidateService.GetEmpWorkExperience(this.candid).subscribe(res => {
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
    // this.CandidateService.GetEmpCertification(this.candid).subscribe(res => {
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
    // this.CandidateService.GetEmpEdutnQualifictin(this.candid).subscribe(res => {
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
  //jobopeningid:any;
  openpiaData(temppia: TemplateRef<any>, candiID: any, listjobid: any, openingid: any, apitype: any) {
    if (apitype == 'MRIGS') {
      this.CandidateService.GetPiaDetail(listjobid, openingid, candiID).subscribe(res => {
        this.ProfileResponce = res
        this.spinnerService.hide();
        if (this.ProfileResponce.lstGetPiaDetai != null) {
          this.PiaContacDetials = this.ProfileResponce.lstGetPiaDetai[0];
          this.modaldpia = this.modalService.show(temppia,
            Object.assign({}, { class: 'candidate-view-modal modal-lg' }
            ));
        } else {
          this.PiaContacDetials = [];
        }
      });
    }
  }
}