
import { Component, OnInit, ViewChild, TemplateRef, Output, HostListener, EventEmitter, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../Services/master.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { UpdateprofileService } from '../../Services/updateprofile.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { AppConfig } from '../../Globals/app.config';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { CompanyDetailsService } from '../../Services/companydetails.service';
import { Options } from 'ng5-slider';
import { WalkinPostService } from '../../Services/walkinpost.service';
import { JobpostService } from '../../Services/jobpost.service';
@Component({
  selector: 'app-CompanyDetails',
  templateUrl: './CompanyDetails.component.html'

})

export class CompanyDetailsComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  // For Data Table Start
  dtTrigger = null;
  dtOptions: any = {};
  // For Data Table End
  DbResponse: any;
  response: any = {};
  DbResponce: any = {};
  Responce: any = {};
  JobCard: number = 0;
  wlakinListStatus: boolean = false;
  searchsts: number = 1;
  searchstsAppliedJob: number = 0;
  SearchstsJob: number = 1;
  phpadminid: any = [];
  company: any = [];
  dbresponse: any = [];
  companydetails: any = [];
  dbresponse1: any = [];
  companyid: any = '';
  sendcomapnyid: any = '';
  verifysts: any = '';
  Pagenumber: any = 0;
  companyprofile: any = '';
  count: any = [];
  last: any = 0;
  abc: number = 0;
  searchdata: any = '';
  totalAppliedCandidate: any = 0;
  ShowPushData: any = {};
  PushData: any = {};
  jobdetail: any = [];
  ShowJobList: any = 1;
  viewid: any = {};
  jobopeningdetail: any = {};
  jobs: any = {};
  pageNumber: number = 0;
  walkindetail: any = [];
  WalkingFilterForm: FormGroup;
  FilterJobList: FormGroup;
  FilterJob: FormGroup;
  JobApplicationReceived: FormGroup;
  industry = 0;
  functionalarea = 0;
  minctc: number = 0;
  maxctc: number = 0;
  minexp: number = 0;
  maxexp: number = 0;
  IndustryArea: any = [];
  IndustryAreaSelected: string;
  IndustryAreaSelecteds: any = null;
  FunctionArea: any = [];
  FunctionAreaSelected: string;
  FunctionAreaSelecteds: any = null;
  AreaResponce: any = {};
  from: any;
  delay: boolean = false;
  searchwalkinfromdate: any = '';
  searchwalkintodate: any = '';
  walkinfromdate: any = '';
  walkintodate: any = '';
  minExp: number = 0;
  maxExp: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
  ShowData: any = '0';
  profiledata: any = [];
  viewdatashow: any = '1';
  updatadatashow: any = '0';
  editdata: any = '0';
  JobDescription: boolean = false;
  SearchResult: boolean = false;
  walklistshow: boolean = false;
  appliedlistshow: boolean = false;
  Card: boolean = false;
  Showpushdata: boolean;
  allStates: any = [];
  states: any = [];
  allDistrict: any = {};
  companyviewshow: any = '0';
  companyId: any;
  TokenNo: any;
  comapnyimage: any = '';
  walkindetails: any = [];
  walkinopening: any = [];
  walkinid: any = {};
  jobid: any = {};
  joblistshow: any = '0';
  AdminId: any;
  FilterJobByComoany: FormGroup;
  FilterOpeningCompany: FormGroup;
  ShowPushDataInterview: any = [];
  pushdataInterview: any = [];
  lstState: any = [];
  district: any = [];

  UserView: any = 0;
  companyusershow: any = [];

  ExpOptions: Options = {
    floor: 0,
    ceil: 20,
    step: 1
  };

  CtcOptions: Options = {
    floor: 0,
    ceil: 250000,
    step: 100
  };

  searchWalkins: any = {
    FunctionAreaId: 0,
    IndustryAreaId: 0,
    minExp: 0,
    maxExp: 0,
    minCtc: 0,
    maxCtc: 0,
  };

  constructor(private formBuilder: FormBuilder,
    private appConfig: AppConfig,
    private spinnerService: Ng4LoadingSpinnerService,
    private http: Http,
    private modalService: BsModalService,
    private masterService: MasterService,
    private profileservice: UpdateprofileService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private walkinService: WalkinPostService,
    private jobpostService: JobpostService,
    private CompanyDetailsService: CompanyDetailsService,
    private router: Router) { }
  @Output() clicked = new EventEmitter<string>();
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos >= (1.3 * max)) {
      if (this.walkindetail.length > 0) {
        this.pageNumber = this.pageNumber + 1;
        this.GetAllWalkins(this.pageNumber, 'scroll');
      }
      else if (this.jobdetail.length > 0) {
        this.pageNumber = this.pageNumber + 1;
        this.GetFilterJobsList(this.pageNumber, 'scroll');
      }

      else if (this.stateJobscrol) {
        if (this.getstateJobDetails.length >= 10) {
          this.pageNumber = this.pageNumber + 1;
          this.getJobByOpenings(this.jobId, this.pageNumber, 'scroll');
        }
      }
      else if (this.jobroll) {
        if (this.GetAppliedJobList.length > 0) {
          this.pageNumber = this.pageNumber + 1;
          this.GetAllAppliedJobs(this.pageNumber, 'scroll');
        }
      }

      else if (this.userCountscrol) {
        if (this.companyusershow.length >= 10) {
          this.pageNumber = this.pageNumber + 1;
          this.UserCountScroll(this.pageNumber, 'scroll');
        }
      }
      if (this.companyregisterdata.length >= 10) {
        this.pageNumber = this.pageNumber + 1;
        this.GetFilter(this.pageNumber, 'scroll', 'src');
      }


    }
  }
  SerialNumber: number = 1;
  ngOnInit() {
    localStorage.removeItem('compid');
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      // $(this).find('i').toggleClass('fa-chevron-down');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });

    this.hrefurl = 1;

    this.phpadminid = localStorage.getItem('phpadminid');
    this.AdminId = JSON.parse(this.phpadminid);
    window.scroll(0, 0);
    this.walkingFormInit();
    this.jobFormInit();
    this.JobCard = 0;
    this.CandidateListing = 0;
    this.FilterJobByComoany = this.formBuilder.group({
      Stateid: ['', ''],
      Districtid: ['', ''],
      SearchKeyJob: ['', ''],
    });
    this.FilterOpeningCompany = this.formBuilder.group({
      OpeningStateid: ['', ''],
      OpeningDistrictid: ['', ''],
      OpeningSearchKey: ['', ''],
    });
    this.JobApplicationReceived = this.formBuilder.group({

      industry: ['', Validators.nullValidator],
      functionalarea: ['', Validators.nullValidator],
      MinCtc: ['', Validators.nullValidator],
      MaxCtc: ['', Validators.nullValidator],
      MinExp: ['', Validators.nullValidator],
      MaxExp: ['', Validators.nullValidator],

    });
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'walkinpostedstatus': ['', Validators.required],
    });
    this.GetFilter(this.PageNumber, '', 'init');
    this.GetAllStateforfilter();
  }
  HideCommon: any = 1;
  onClicked(companyid: string) {
    this.HideCommon = 0;
    this.hrefurl = 0;

    this.HideCommon = 2;
    if (companyid != '') {
      // this.backbtn=1;
      this.Pagenumber = 0;
      this.pageNumber = 0;
      this.ViewJob = false;
      this.ViewState = false;
      this.JobCard = 0;
      this.CandidateListing = 0;
      this.searchstsAppliedJob = 0;
      this.appliedlistshow = false;
      // this.GetallUserProfilesdata(''); 
      this.companyviewshow = '1';
      this.Card = true;
      this.wlakinListStatus = false;
      this.companyId = companyid;
      // this.viewdata();
      this.totalRecord(this.companyId);
      // this.viewCompanyData();
      this.getCompanyId();
      this.searchsts = 0;
      this.SearchstsJob = 0;
      this.abc = 0;
      this.walklistshow = false;
    }
  }
  // backbtn:any='0';
  onbackregist() {
    // this.backbtn=0;
    this.ViewJob = false;
    this.ViewState = false;
    this.SearchstsJob = 0;
    this.searchsts = 0;
    this.JobCard = 0;
    this.CandidateListing = 0;
    this.searchstsAppliedJob = 0;
    this.appliedlistshow = false;
    this.Card = false;
    this.JobDescription = false;
    this.SearchResult = false;
    this.walklistshow = false;
    this.wlakinListStatus = false;
    this.Showpushdata = false;
    this.companyviewshow = '0';
    this.ShowJobList = '0';
    this.joblistshow = '0';
    this.abc = 0;
    this.UserView = 0;
  }

  // ***************Company Details Function Used (Rajeev Jha -1174)*******************
  Showpushdatac: any = 0;
  logintype: any = '';
  StateiD: number = 0;
  DistrictID: any = '';
  district1: any = [];
  adminId: any;
  senddatafilter: any = [];
  companyregisterdata: any = [];
  companyregisterdata123: any = [];
  PageNumber: number = 0;
  hrefurl: any = 0;

  GetFilterSearch(pageNumber, isScrol: any, src) {
    this.pageNumber = 0;
    this.GetFilter(pageNumber, isScrol, src);
  }

  GetFilter(pageNumber, isScrol: any, src) {
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdatac = '1';
    }
    this.from = isScrol;
    this.item = localStorage.getItem('phpadminid');
    if (this.FilterJob.value.logintype != '' && this.FilterJob.value.logintype != undefined && this.FilterJob.value.logintype != null) {
      this.logintype = this.FilterJob.value.logintype;
    } else {
      this.logintype = "";
    }
    if (this.FilterJob.value.StateiD != '' && this.FilterJob.value.StateiD != undefined && this.FilterJob.value.StateiD != null) {
      this.StateiD = parseInt(this.FilterJob.value.StateiD);
    } else {
      this.StateiD = 0;
    }
    if (this.FilterJob.value.DistrictID != '' && this.FilterJob.value.DistrictID != undefined && this.FilterJob.value.DistrictID != null) {
      this.DistrictID = parseInt(this.FilterJob.value.DistrictID);
    } else {
      this.DistrictID = 0;
    }
    if (this.FilterJob.value.JobKeyword != '' && this.FilterJob.value.JobKeyword != undefined && this.FilterJob.value.JobKeyword != null) {
      this.JobKeyword = this.FilterJob.value.JobKeyword;
    } else {
      this.JobKeyword = "";
    }
    // if(this.FilterJob.value.walkinpostedstatus!='' &&    this.FilterJob.value.walkinpostedstatus!=undefined){
    // this.walkinpostedstatus=this.FilterJob.value.walkinpostedstatus;
    // }
    // else{
    //   this.walkinpostedstatus=null;
    // }

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
    this.adminId = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    ////////////////Code by Rajeev-1174*********for data sending *******
    this.senddatafilter = {
      'Adminid': this.adminId,
      'PageNumber': pageNumber,
      'companyid': 0,
      // 'isjobpushed':this.FilterJob.value.walkinpostedstatus!=''?this.FilterJob.value.walkinpostedstatus:"",
      // 'isjobpushed':this.walkinpostedstatus,
      'isjobpushed': null,
      'logintype': this.logintype,
      'StateiD': this.StateiD,
      'DistrictID': this.DistrictID,
      'searchkey': this.JobKeyword,
    };
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.walkinService.GetFilterCompanyDataforwalkin(this.senddatafilter).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.concat(this.DbResponce.lstCompanyDetails);
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
      this.walkinService.GetFilterCompanyDataforwalkin(this.senddatafilter).subscribe(res => {
        this.companyregisterdata = res;
        this.companyregisterdata123 = this.companyregisterdata.lstCompanyDetails;
        if (this.companyregisterdata123.length > 0) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.lstCompanyDetails;
          // console.log(this.companyregisterdata);
        } else {
          this.companyregisterdata = [];
          this.toastrService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }

  // GetAllStateforfilter() {
  //   this.jobpostService.GetAllStates().subscribe(res => {
  //     this.states = res
  //     if (this.states != null) {
  //       this.states = this.states.Data;
  //     }
  //     else {
  //       this.states = [];
  //     }
  //   });
  // }
  GetAllStateforfilter() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.states = res
        this.states = this.states;
      });
    } catch  { }
  }


  // GetAllDistrictforfilter(event: any) {
  //   if (event == undefined || event == "") {
  //     this.district1 = [];
  //     this.FilterJob.controls['DistrictID'].setValue('');
  //     return false;
  //   }
  //   if (event != '' || event != null) {
  //     this.FilterJob.controls['DistrictID'].setValue('');
  //   }
  //   this.spinnerService.show();
  //   this.jobpostService.GetAllDistrict(event).subscribe(res => {
  //     this.district1 = res
  //     if (this.district1 != null) {
  //       this.spinnerService.hide();
  //       this.district1 = this.district1.Data;
  //     }
  //     else {
  //       this.district1 = [];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  GetAllDistrictforfilter(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
      this.FilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if (event != '' || event != null) {
      this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();

    this.masterService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res

      if (this.district1 != null) {
        this.spinnerService.hide();
        this.district1 = this.district1;
      }
      else {
        this.district1 = [];
        this.spinnerService.hide();
      }
    });
  }

  reset1() {

    this.companyId = [];
    this.PageNumber = 0;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required]
    });
    this.district1 = [];
    this.GetFilter(this.PageNumber, '', 'init');
  }
  // ***************Company Details Function End (Rajeev Jha -1174)***********************
  GetAllState() {
    this.profileservice.GetAllStates().subscribe(res => {
      this.allStates = res;
      if (this.allStates != null) {
        this.states = this.allStates.Data;
      }
      else {
        this.allStates = [];
      }
    });
  }
  GetAllDistrict(event: any) {
    this.profileservice.GetAllDistricts(event).subscribe(res => {
      this.allDistrict = res;
      if (this.allDistrict != null) {
        this.allDistrict = this.allDistrict;
      } else {
        this.allDistrict = [];
      }
    });
  }

  GetAllIndustryArea() {
    this.masterService.GetAllIndustryArea().subscribe(res => {
      this.Responce = res;
      if (this.Responce != '' && this.Responce != null) {
        this.IndustryArea = this.Responce;
      }
    });
  }

  GetAllFunctionArea() {
    this.masterService.GetAllFunctionArea().subscribe(res => {
      this.AreaResponce = res;
      if (this.AreaResponce != '' && this.AreaResponce != null) {
        this.FunctionArea = this.AreaResponce;
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

  companyidsend: any;
  companyregisterdatashow1: any = [];
  totalRecord(companyId) {
    this.item = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.item);
    // var senddata = { Companyid: this.companyId, Adminid: adminid }
    var senddata = { 'CompanyId': this.companyId }
    let sendparam = JSON.stringify(senddata);
    this.companyidsend = {
      'HSTPLRequest': {
        'data': sendparam,
        'typeFor': 'AdminGetCompanyTotalRecords'
      }
    }
    // this.CompanyDetailsService.viewdata(senddata).subscribe(res => {
    this.CompanyDetailsService.totalcount(this.companyidsend).subscribe(res => {
      this.companyregisterdatashow1 = res;
      if (this.companyregisterdatashow1.hstplResponse.data != null) {
        this.companyregisterdatashow = JSON.parse(this.companyregisterdatashow1.hstplResponse.data);
        this.companyregisterdatashow = this.companyregisterdatashow[0];
      } else {
        this.companyregisterdatashow = [];
      }
      this.RegistrationView = '1';
    });

  }

  /*******************   CARD CLICK    **************************/
  UserCount(c_id: any) {
    this.HideCommon = 0;
    this.Card = false;
    this.appliedlistshow = false;
    this.UserView = 1;
    this.UserCountScroll(0, '')

  }


  userCountscrol: boolean = false;
  senddatauser: any;
  // UserCountScroll(pageno: any, from: any) {
  //   this.item = localStorage.getItem('phpadminid');
  //   var adminid = JSON.parse(this.item);
  //   var senddata = { Companyid: this.companyId, Adminid: adminid, PageNumber: pageno }
  //   if (from == 'scroll') {
  //     this.spinnerService.show();
  //     this.CompanyDetailsService.viewusers(senddata).subscribe(res => {
  //       this.spinnerService.hide();
  //       this.dbresponse = res;
  //       this.DbResponse = this.dbresponse.Data
  //       if (this.dbresponse.Data != null) {
  //         this.companyusershow = this.companyusershow.concat(this.DbResponse);
  //         this.userCountscrol = true;
  //         // this.from = 'scroll';
  //       } else {
  //         this.companyusershow = [];
  //         this.from = '';
  //       }
  //       this.delay = false;
  //       this.RegistrationView = '1';
  //     });
  //   }
  //   else {
  //     this.CompanyDetailsService.viewusers(senddata).subscribe(res => {
  //       this.companyusershow = res;
  //       if (this.companyusershow != null) {
  //         this.companyusershow = this.companyusershow.Data;
  //         this.userCountscrol = true;
  //       } else {
  //         this.companyusershow = [];
  //       }
  //       this.RegistrationView = '1';
  //     });
  //   }
  // }
  UserCountScroll(pageno: any, from: any) {
    this.item = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.item);

    var senddata = { CompanyId: this.companyId, AdminId: adminid, pageNumber: pageno }
    let sendparam = JSON.stringify(senddata);
    this.senddatauser = {
      'HSTPLRequest': {
        'data': sendparam,
        'typeFor': 'AdminCompanyProfileDetail'
      }
    }
    if (from == 'scroll') {
      this.spinnerService.show();
      this.CompanyDetailsService.viewusers(this.senddatauser).subscribe(res => {
        this.spinnerService.hide();
        this.dbresponse = res;
        this.DbResponse = JSON.parse(this.dbresponse.hstplResponse.data);
        if (this.DbResponse != null) {
          this.companyusershow = this.companyusershow.concat(this.DbResponse);
          this.userCountscrol = true;
          // this.from = 'scroll';
        } else {
          this.companyusershow = [];
          this.from = '';
        }
        this.delay = false;
        this.RegistrationView = '1';
      });
    }
    else {
      this.CompanyDetailsService.viewusers(this.senddatauser).subscribe(res => {
        this.companyusershow = res;
        if (this.companyusershow.hstplResponse.data != null) {
          this.companyusershow = JSON.parse(this.companyusershow.hstplResponse.data);
          this.userCountscrol = true;
        } else {
          this.companyusershow = [];
        }
        this.RegistrationView = '1';
      });
    }
  }

  JobCount(companyid: string) {
    this.HideCommon = 0;
    this.walkindetail.length = 0;
    this.jobdetail.length = 0;
    this.pageNumber = 0;
    this.searchsts = 0;
    this.Card = false;
    this.SearchstsJob = 0;
    this.abc = 0;
    this.ShowJobList = 1;
    this.SearchResult = false;
    this.walklistshow = false;
    this.appliedlistshow = false;
    // this.Showpushdata = true;
    if (companyid != '') {
      this.joblistshow = '1';
      this.companyId = companyid;
      this.wlakinListStatus = true;
      this.JobDescription = false
      this.GetFilterJobsList(this.pageNumber, this.from);
      this.GetAllIndustryArea();
      this.GetAllFunctionArea();
      this.jobFormInit();
      this.Showpushdata = false;
      this.SearchstsJob = 0;
    }
  }

  AppliedJob(companyid: string) {
    this.HideCommon = 0;
    this.Card = false;
    this.searchstsAppliedJob = 0;
    this.appliedlistshow = true;
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    this.GetAllAppliedJobs2(0, this.from)
  }

  goToCommon() {
    this.HideCommon = 1;
    this.companyviewshow = 0;
    this.hrefurl = 1;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required]
    });
    this.GetFilter(this.PageNumber, '', 'init');
  }

  goBack() {
    this.GetAppliedJobList = [];
    this.HideCommon = 2;
    // this.clicked.emit(this.companyId);
    // this.onClicked(this.companyId);
    this.ViewJob = false;
    this.appliedlistshow = false;
    this.JobCard = 0;
    this.CandidateListing = 0;
    this.Card = true;
    this.JobDescription = false;
    this.abc = 0;
    this.searchsts = 0;
    this.SearchstsJob = 0;
    this.SearchResult = false;
    this.walklistshow = false;
    this.joblistshow = 0;
    this.ShowJobList = 0;
    this.searchstsAppliedJob = 0;
    this.UserView = 0;

  }

  previousJobs() {
    this.appliedlistshow = false;
    this.JobCard = 0;
    this.CandidateListing = 0;
    this.walklistshow = false;
    this.searchsts = 1;
    this.SearchResult = false;
    this.JobDescription = false;
    this.joblistshow = true;
    this.SearchstsJob = 1;
    this.Showpushdata = true;
    this.ShowJobList = 1;
    this.abc = 0;
  }
  previousWalkin() {
    this.walklistshow = true;
    this.searchsts = 1;
    this.SearchResult = true;
    this.JobDescription = false;
    this.joblistshow = false;
    this.SearchstsJob = 0;
    // this.Showpushdata=true;
    this.wlakinListStatus = true;
    this.ShowJobList = 1;
    this.abc = 0;
  }

  /*******************   WALKIN CLICK    **************************/
  Walkins(companyid: string) {
    this.HideCommon = 0;
    this.appliedlistshow = false;
    this.walkindetail.length = 0;
    this.jobdetail.length = 0;
    this.searchsts = 0;
    this.SearchstsJob = 0;
    this.Card = false;
    this.SearchResult = true;
    this.abc = 0;
    this.ShowJobList = 0;
    if (companyid != '') {
      this.joblistshow = false;
      this.walklistshow = true;
      // this.wlakinListStatus=false;
      this.companyId = companyid;
      this.wlakinListStatus = true;
      this.JobDescription = false
      this.GetFilterWalkins();
      this.GetAllIndustryArea();
      this.GetAllFunctionArea();
      this.walkingFormInit();
    }
  }

  walkingFormInit() {
    this.WalkingFilterForm = this.formBuilder.group({
      industry: ['', Validators.nullValidator],
      functionalarea: ['', Validators.nullValidator],
      MinCtc: ['', Validators.nullValidator],
      MaxCtc: ['', Validators.nullValidator],
      MinExp: ['', Validators.nullValidator],
      MaxExp: ['', Validators.nullValidator],
      walkInFromDate: ['', Validators.nullValidator],
      walkInToDate: ['', Validators.nullValidator]
    })
  }


  item: any;
  companyregisterdatashow: any = [];
  RegistrationView: any = '0';
  // viewCompanyData(){
  viewdata() {
    var senddata = { Companyid: this.companyId, Adminid: this.AdminId }
    // this.JobpostService.viewCompanyData(senddata).subscribe(res => { 
    this.CompanyDetailsService.viewdata(senddata).subscribe(res => {
      this.companyregisterdatashow = res;
      if (this.companyregisterdatashow != null) {
        this.companyregisterdatashow = this.companyregisterdatashow.Data;
      } else {
        this.companyregisterdatashow = [];
      }
      this.RegistrationView = '1';
    });
  }

  getCompanyId() {
    this.companydetails = [];
    this.CompanyDetailsService.GetCompanyDetails(this.companyId, this.AdminId).subscribe(res => {
      this.dbresponse1 = res;
      if (this.dbresponse1 != null) {
        if (this.dbresponse1.lstCompanyProfile != null) {
          this.companydetails = this.dbresponse1.lstCompanyProfile;
          this.companydetails = this.companydetails[0];
        } else {
          this.companydetails = this.dbresponse1.lstCompanyProfile1;
          this.companydetails = this.companydetails;
        }
      }
      else {
        this.dbresponse1 = [];
      }
    });
  }

  GetallUserProfilesdata(searchval) {
    if (searchval != null && searchval != undefined && searchval != '') {
      this.searchdata = searchval;
    }
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    var senddata = { "Adminid": adminid, "Pagenumber": this.Pagenumber, 'searchdata': this.searchdata }
    this.profileservice.GetUserProfileall(senddata).subscribe(res => {
      this.profiledata = res;
      if (this.profiledata != null) {
        this.profiledata = this.profiledata.Data;
        this.totalAppliedCandidate = this.profiledata[0].TOTRECDS;
        this.count = [];
        for (var i = 0; i < (Math.ceil(this.totalAppliedCandidate / 10)); i++) {
          this.count.push(i + 1);
          this.last = i + 1;
        }
      } else {
        this.profiledata = [];
      }
    });
  }

  GetFilterWalkins() {
    this.searchWalkins = [];
    this.walkindetail = [];
    this.pageNumber = 0;
    this.from = '';
    this.searchsts = 0;
    this.SearchstsJob;
    if (this.WalkingFilterForm.value.industry != '' && this.WalkingFilterForm.value.industry != null) {
      this.industry = parseInt(this.WalkingFilterForm.value.industry);
    } else {
      this.industry = 0;
    }
    if (this.WalkingFilterForm.value.functionalarea != '' && this.WalkingFilterForm.value.functionalarea != null) {
      this.functionalarea = parseInt(this.WalkingFilterForm.value.functionalarea);
    } else {
      this.functionalarea = 0;
    }
    if (this.WalkingFilterForm.value.walkInFromDate != '' && this.WalkingFilterForm.value.walkInFromDate != null) {
      this.searchwalkinfromdate = this.WalkingFilterForm.value.walkInFromDate;
      this.searchwalkinfromdate = new Date(this.searchwalkinfromdate);
    } else {
      this.searchwalkinfromdate = ' ';
    }
    if (this.WalkingFilterForm.value.walkInToDate != '' && this.WalkingFilterForm.value.walkInToDate != null) {
      this.searchwalkintodate = this.WalkingFilterForm.value.walkInToDate;
    } else {
      this.searchwalkintodate = ' ';
    }
    if (this.searchwalkinfromdate != '' && this.searchwalkinfromdate != null && this.searchwalkintodate != '' && this.searchwalkintodate != null) {
      if (this.searchwalkinfromdate > this.searchwalkintodate) {
        this.toastrService.error('Please Select Valid Date');
        this.searchsts = 0;
        // $('.filter-wrapper').slideToggle();
        return false;
      }
    }
    if (this.WalkingFilterForm.value.MinCtc != '' && this.WalkingFilterForm.value.MinCtc != null) {
      this.minctc = this.WalkingFilterForm.value.MinCtc;
    } else {
      this.minctc = 0;
    }
    if (this.WalkingFilterForm.value.MaxCtc != '' && this.WalkingFilterForm.value.MaxCtc != null) {
      this.maxctc = this.WalkingFilterForm.value.MaxCtc;
    } else {
      this.maxctc = this.maxCtc;
    }
    if (this.WalkingFilterForm.value.MinExp != '' && this.WalkingFilterForm.value.MinExp != null) {
      this.minexp = this.WalkingFilterForm.value.MinExp;
    } else {
      this.minexp = 0;
    }
    if (this.WalkingFilterForm.value.MaxExp != '' && this.WalkingFilterForm.value.MaxExp != null) {
      this.maxexp = this.WalkingFilterForm.value.MaxExp;
    } else {
      this.maxexp = 0;
    }
    let functionalarea;
    let industry;
    industry = this.WalkingFilterForm.value.industry;
    functionalarea = this.WalkingFilterForm.value.functionalarea;
    let IndustryName = (this.IndustryArea).filter(function (entry) {
      return entry.id == industry
    });
    let FunctionalAreaname = (this.FunctionArea).filter(function (entry) {
      return entry.id == functionalarea
    });
    this.searchWalkins = {
      "FunctionAreaId": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "IndustryAreaId": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "minExp": this.minExp > 0 ? this.minExp : 'NA',
      "maxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "minCtc": this.minCtc > 0 ? this.minCtc : 'NA',
      "maxCtc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA'
    };
    localStorage.setItem('searchWalkins', JSON.stringify(this.searchWalkins));
    this.GetAllWalkins(this.pageNumber, this.from);
  }

  GetFilterWalkins2() {
    this.searchWalkins = [];
    this.walkindetail = [];
    this.pageNumber = 0;
    this.JobDescription = false;
    this.from = '';
    this.searchsts = 1;
    this.wlakinListStatus = true;
    if (this.WalkingFilterForm.value.industry != '' && this.WalkingFilterForm.value.industry != null) {
      this.industry = parseInt(this.WalkingFilterForm.value.industry);
    } else {
      this.industry = 0;
    }
    if (this.WalkingFilterForm.value.functionalarea != '' && this.WalkingFilterForm.value.functionalarea != null) {

      this.functionalarea = parseInt(this.WalkingFilterForm.value.functionalarea);
    } else {
      this.functionalarea = 0;
    }
    if (this.WalkingFilterForm.value.walkInFromDate != '' && this.WalkingFilterForm.value.walkInFromDate != null) {
      this.searchwalkinfromdate = this.WalkingFilterForm.value.walkInFromDate;
      this.searchwalkinfromdate = new Date(this.searchwalkinfromdate);
    } else {
      this.searchwalkinfromdate = ' ';
    }
    if (this.WalkingFilterForm.value.walkInToDate != '' && this.WalkingFilterForm.value.walkInToDate != null) {
      this.searchwalkintodate = this.WalkingFilterForm.value.walkInToDate;
    } else {
      this.searchwalkintodate = ' ';
    }
    if (this.searchwalkinfromdate != '' && this.searchwalkintodate != '') {
      if (this.searchwalkinfromdate > this.searchwalkintodate) {
        this.toastrService.error('Please Select Valid Date');
        this.searchsts = 0;
        // $('.filter-wrapper').slideToggle();
        return false;
      }
    }
    if (this.WalkingFilterForm.value.MinCtc != '' && this.WalkingFilterForm.value.MinCtc != null) {
      this.minctc = this.WalkingFilterForm.value.MinCtc;
    } else {
      this.minctc = 0;
    }
    if (this.WalkingFilterForm.value.MaxCtc != '' && this.WalkingFilterForm.value.MaxCtc != null) {
      this.maxctc = this.WalkingFilterForm.value.MaxCtc;
    } else {
      this.maxctc = this.maxCtc;
    }
    if (this.WalkingFilterForm.value.MinExp != '' && this.WalkingFilterForm.value.MinExp != null) {
      this.minexp = this.WalkingFilterForm.value.MinExp;
    } else {
      this.minexp = 0;
    }
    if (this.WalkingFilterForm.value.MaxExp != '' && this.WalkingFilterForm.value.MaxExp != null) {
      this.maxexp = this.WalkingFilterForm.value.MaxExp;
    } else {
      this.maxexp = 0;
    }
    let functionalarea;
    let industry;
    industry = this.WalkingFilterForm.value.industry;
    functionalarea = this.WalkingFilterForm.value.functionalarea;
    let IndustryName = (this.IndustryArea).filter(function (entry) {
      return entry.id == industry
    });
    let FunctionalAreaname = (this.FunctionArea).filter(function (entry) {
      return entry.id == functionalarea
    });
    this.searchWalkins = {
      "FunctionAreaId": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "IndustryAreaId": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "minExp": this.minExp > 0 ? this.minExp : 'NA',
      "maxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "minCtc": this.minCtc > 0 ? this.minCtc : 'NA',
      "maxCtc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA'
    };
    localStorage.setItem('searchWalkins', JSON.stringify(this.searchWalkins));
    this.GetAllWalkins(this.pageNumber, this.from);
  }


  GetAllWalkins(pageNumber: any, from: any) {
    if (from == 'scroll') {
      let postData = {
        'AdminId': this.AdminId,
        'CompanyId': this.companyId,
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'UserId': 0,
        "WalkInId": 0,
        "WalkInDate": this.walkinfromdate != '' ? this.walkinfromdate : '2018-01-22T00:30:37.000Z',
        "WalkinToDate": this.walkintodate ? this.walkintodate : '2030-01-22T00:30:37.000Z',
        'PageNumber': pageNumber
      };
      localStorage.setItem('postData', JSON.stringify(postData));
      this.spinnerService.show();
      this.CompanyDetailsService.GetFilterData(postData).subscribe(res => {
        // this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.walkindetail = this.walkindetail.concat(this.DbResponce.lstCandidateWalkInt);
          this.from = 'scroll';
        } else {
          this.walkindetail = [];
          this.from = '';
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    } else {
      let postData = {
        'AdminId': this.AdminId,
        'CompanyId': this.companyId,
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'UserId': 0,
        "WalkInId": 0,
        "WalkInDate": this.walkinfromdate != '' ? this.walkinfromdate : '2018-01-22T00:30:37.000Z',
        "WalkinToDate": this.walkintodate ? this.walkintodate : '2030-01-22T00:30:37.000Z',
        'PageNumber': pageNumber,
      };
      this.spinnerService.show();
      this.CompanyDetailsService.GetFilterData(postData).subscribe(res => {
        this.dbresponse = res;
        if (this.dbresponse != null) {
          this.walkindetail = this.dbresponse.lstCandidateWalkInt;
          this.from = '';
          this.spinnerService.hide();
        }
        else {
          this.walkindetail = [];
          this.from = '';
          this.spinnerService.hide();
        }
      });
      scroll(0, 0);
    }
  }

  postData: any = {};
  company_id_walkin: any = ''
  DisplayWalkin(item) {
    this.searchsts = 0;
    this.JobDescription = true;
    this.SearchResult = false;
    this.walklistshow = false;
    this.wlakinListStatus = false;
    var CompanyId = localStorage.getItem('CompanyId');
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.walkinid = JSON.stringify(item.walkInId);
    this.company_id_walkin = JSON.stringify(item.companyId);
    this.postData = {
      // 'FunctionalAreaId': 0,
      // 'IndustryId': 0,
      // 'Maxctc': 0,
      // 'Minctc': 0,
      // 'MaxExp': 0,
      // 'MinExp': 0,
      // "WalkInId": this.walkinid,
      // 'PageNumber': 0

      'AdminId': adminid,
      'CompanyId': this.company_id_walkin,
      'FunctionalAreaId': 0,
      'IndustryId': 0,
      'Maxctc': 0,
      'Minctc': 0,
      'MaxExp': 0,
      'MinExp': 0,
      'UserId': 0,
      "WalkInId": this.walkinid,
      'PageNumber': 0,
      "WalkInDate": '2018-01-22T00:30:37.000Z',
      "WalkinToDate": '2030-01-22T00:30:37.000Z'
    };
    // alert(JSON.stringify(this.postData));
    this.getWalkIndetails(this.postData);
  }

  getWalkIndetails(walkindata: any) {
    this.spinnerService.show();
    this.searchsts = 0;
    this.CompanyDetailsService.GetAllWalkin(walkindata).subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse != null) {
        if (this.DbResponse.lstCandidateWalkInt != null) {
          this.walkindetails = this.DbResponse.lstCandidateWalkInt[0];
          this.UserId = this.walkindetails.userID;
          this.CompanyDetailsService.getWalkinDetails(this.walkinid, this.UserId, this.AdminId).subscribe(res => {
            this.dbresponse1 = res;
            if (this.dbresponse1 != null) {
              this.walkinopening = this.dbresponse1.lstWalkInOpening;
            }
            else {
              this.walkinopening = [];
            }
          });
        }
      }
      else {
        this.DbResponse = [];
        this.UserId = 0;
      }
    });
    if (this.walkindetails && this.walkinopening) {
      this.spinnerService.hide();
    }
  }

  /*******************   JOBS CLICK    **************************/
  company_id: any = ''
  DisplayJob(item) {
    this.searchsts = 0;
    this.joblistshow = 0;
    this.Showpushdata = false;
    this.ShowJobList = 0;
    this.JobDescription = false;
    this.SearchResult = false;
    this.walklistshow = false;
    this.wlakinListStatus = false;
    this.abc = 1;
    this.jobid = JSON.stringify(item.jobId);
    this.company_id = JSON.stringify(item.companyId);
    this.GetAllStates();
    // this.GetAllLanguage();
    // this.GetAllJoiningPriority();
    // this.GetMinEducation();
    this.GetAllFunctionArea();
    this.GetAllIndustryArea();
    this.GetJobDetail(this.jobid, this.company_id);
  }

  jobFormInit() {
    this.FilterJobList = this.formBuilder.group({

      industry: ['', Validators.nullValidator],
      functionalarea: ['', Validators.nullValidator],
      date: ['', Validators.nullValidator],
      ctc: ['', Validators.nullValidator],
      exp: ['', Validators.nullValidator],
      MinCtc: ['', Validators.nullValidator],
      MaxCtc: ['', Validators.nullValidator],
      MinExp: ['', Validators.nullValidator],
      MaxExp: ['', Validators.nullValidator],
      JobKeyword: ['', Validators.nullValidator],
      walkInFromDate: ['', Validators.nullValidator],
      walkInToDate: ['', Validators.nullValidator]
    });
  }

  UserId: any;



  GetJobDetail(id: any, company_id: any) {
    this.walklistshow = false;
    //var companyid = JSON.parse(localStorage.getItem('companyid')); 
    // this.UserId = JSON.parse(localStorage.getItem('userID'));
    this.UserId = 0;
    this.AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.PushData = {
      'FunctionalAreaId': 0,
      'IndustryId': 0,
      'Maxctc': 0,
      'Minctc': 0,
      'MaxExp': 0,
      'MinExp': 0,
      'PageNumber': 0,
      'JobId': id,
      'UserID': this.UserId,
      'CompanyId': company_id,
      'AdminId': this.AdminId,
      'JobKeyword': '',
      "JobInDate": '2018-01-22T00:30:37.000Z',
      "JobToDate": '2030-01-22T00:30:37.000Z',

    };
    this.spinnerService.show();
    this.CompanyDetailsService.GetAllJobs(this.PushData).subscribe(res => {
      this.spinnerService.hide();
      this.response = res;
      // this.jobdetail = this.response;

      if (this.response.lstJobRequest[0] != null) {
        this.jobs = this.response.lstJobRequest[0];
        this.CompanyDetailsService.GetJobOpeningDetail(id, this.UserId, this.AdminId).subscribe(res => {
          this.jobopeningdetail = res;
          if (this.jobopeningdetail != null) {
            this.jobopeningdetail = this.jobopeningdetail;
          }
        });
      }
    });
  }
  JobKeyword: any;
  walinid: any = [];
  GetFilterJobsList(pageNumber, from) {
    this.searchsts = 0;
    if (this.FilterJobList.value.industry != '' && this.FilterJobList.value.industry != null) {
      this.industry = this.FilterJobList.value.industry;
    } else {
      this.industry = 0;
    }
    if (this.FilterJobList.value.functionalarea != '' && this.FilterJobList.value.functionalarea != null) {
      this.functionalarea = this.FilterJobList.value.functionalarea;
    } else {
      this.functionalarea = 0;
    }
    if (this.FilterJobList.value.walkInFromDate != '' && this.FilterJobList.value.walkInFromDate != null) {
      this.searchwalkinfromdate = this.FilterJobList.value.walkInFromDate;
      this.searchwalkinfromdate = new Date(this.searchwalkinfromdate);
    } else {
      this.searchwalkinfromdate = '';
    }
    if (this.FilterJobList.value.walkInToDate != undefined) {
      this.searchwalkintodate = this.FilterJobList.value.walkInToDate;
    } else {
      this.searchwalkintodate = '';
    }
    if (this.searchwalkinfromdate != '' && this.searchwalkintodate != '') {
      if (this.searchwalkinfromdate > this.searchwalkintodate) {
        this.toastrService.error('Please Select Valid Date');
        this.SearchstsJob = 0;
        // $('.filter-wrapper').slideToggle();
        return false;
      }
    }
    if (this.FilterJobList.value.MinCtc != '' && this.FilterJobList.value.MinCtc != null) {
      this.minctc = this.FilterJobList.value.MinCtc;
    } else {
      this.minctc = 0;
    }
    if (this.FilterJobList.value.MaxCtc != '' && this.FilterJobList.value.MaxCtc != null) {
      this.maxctc = this.FilterJobList.value.MaxCtc;
    } else {
      this.maxctc = 0;
    }
    if (this.FilterJobList.value.MinExp != '' && this.FilterJobList.value.MinExp != SystemJsNgModuleLoaderConfig) {

      this.minexp = this.FilterJobList.value.MinExp;
    } else {
      this.minexp = 0;
    }
    if (this.FilterJobList.value.MaxExp != '' && this.FilterJobList.value.MaxExp != null) {
      this.maxexp = this.FilterJobList.value.MaxExp;
    } else {
      this.maxexp = 0;
    }
    let functionalarea;
    let industry;
    industry = this.FilterJobList.value.industry;
    functionalarea = this.FilterJobList.value.functionalarea;
    let IndustryName = (this.IndustryArea).filter(function (entry) {
      return entry.id == industry
    });
    let FunctionalAreaname = (this.FunctionArea).filter(function (entry) {
      return entry.id == functionalarea;
    });

    if (this.FilterJobList.value.JobKeyword != null && this.FilterJobList.value.JobKeyword != undefined) {
      this.JobKeyword = this.FilterJobList.value.JobKeyword;
    } else {
      this.JobKeyword = '';
    }
    // Show Selected Data
    this.ShowPushData = {};
    this.ShowPushData = {
      "industry": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "functionalarea": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "Maxctc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "Minctc": this.minCtc > 0 ? this.minCtc : 'NA',
      "MaxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "MinExp": this.minExp > 0 ? this.minExp : 'NA',
      "JobKeyword": this.FilterJobList.value.JobKeyword != '' ? this.FilterJobList.value.JobKeyword : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA'
    };
    if (from == 'scroll') {
      this.PushData = {
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': pageNumber,
        'JobId': 0,
        'UserID': 0,
        'CompanyId': this.companyId,
        'AdminId': this.AdminId,
        'JobKeyword': this.JobKeyword,
        "JobInDate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.searchwalkintodate != '' ? this.searchwalkintodate : '2030-01-22T00:30:37.000Z',
      };
      localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.CompanyDetailsService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce != null) {
          if (this.DbResponce.lstJobRequest != null) {
            this.jobdetail = this.jobdetail.concat(this.DbResponce.lstJobRequest);
          } else {
            // this.jobdetail = [];
          }
        }
        else {
          this.DbResponce = [];
        }
      });
    }
    else {
      this.pageNumber = 0;
      this.PushData = {

        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': 0,
        'JobId': 0,
        'UserID': 0,
        'CompanyId': this.companyId,
        'AdminId': this.AdminId,
        'JobKeyword': this.JobKeyword,
        "JobInDate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.searchwalkintodate != '' ? this.searchwalkintodate : '2030-01-22T00:30:37.000Z',
      };
      this.spinnerService.show();
      this.CompanyDetailsService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce != null) {
          if (this.DbResponce.lstJobRequest != null) {
            this.jobdetail = this.DbResponce.lstJobRequest;
          } else {
            this.jobdetail = [];
          }
        }
        else {
          this.DbResponce = [];
        }
      });
    }
    this.Showpushdata = true;
    this.SearchstsJob = 1;
  }



  /*******************    APPLIED JOBS    **************************/

  functionalareaname;
  industryname: any = '';
  postdata: any = {};
  stateJobscrol: boolean = false;
  localpostdata: any = {};
  pageno: any = '';
  ViewState: boolean = false;
  GetAppliedJobListRes: any = [];
  ViewJob: boolean = false;
  GetAppliedJobList: any = [];
  jobroll: boolean = false;

  GetAllAppliedJobs(PageNumber: number, from: any) {
    this.stateJobscrol = false;
    this.searchstsAppliedJob = 1;
    if (this.JobApplicationReceived.value.industry != '' && this.JobApplicationReceived.value.industry != null) {
      this.industry = this.JobApplicationReceived.value.industry;
      this.industryname = this.IndustryArea.find(o => o.id === this.industry);
      this.industryname = this.industryname.industryName;
    } else {
      this.industry = 0;
      this.industryname = '';
    }

    if (this.JobApplicationReceived.value.functionalarea != '' && this.JobApplicationReceived.value.functionalarea != null) {
      this.functionalarea = this.JobApplicationReceived.value.functionalarea;
      this.functionalareaname = this.FunctionArea.find(o => o.id === this.functionalarea)
      this.functionalareaname = this.functionalareaname.functionalAreaName;
    } else {
      this.functionalarea = 0;
      this.functionalareaname = '';
    }

    this.minctc = this.minCtc > 0 ? this.minCtc : 0;
    this.maxctc = this.maxCtc > 0 ? this.maxCtc : 0;
    this.minexp = this.minExp > 0 ? this.minExp : 0;
    this.maxexp = this.maxExp > 0 ? this.maxExp : 0;
    this.postdata = {
      "StateId": this.FilterJobByComoany.controls.Stateid.value != '' ? parseInt(this.FilterJobByComoany.controls.Stateid.value) : 0,
      "DistrictId": this.FilterJobByComoany.controls.Districtid.value != '' ? parseInt(this.FilterJobByComoany.controls.Districtid.value) : 0,
      "PageNumber": PageNumber,
      "Keyword": this.FilterJobByComoany.controls.SearchKeyJob.value,
      "CompanyId": this.companyId,
      "AdminId": this.AdminId,
      "JobId": 0,
      "UserId": 0,
      "FunctionalAreaId": 0,
      "IndustryId": 0,
      "Maxctc": 0,
      "Minctc": 0,
      "MaxExp": 0,
      "MinExp": 0
    };

    this.searchdata = {
      'industryid': this.industryname,
      'functionalareaid': this.functionalareaname,
      'MinExp': this.minexp,
      'MaxExp': this.maxexp,
      'Minctc': this.minctc,
      'Maxctc': this.maxctc,
      'Pagenumber': this.pageno
    };

    this.localpostdata = {
      'industryid': this.industry,
      'functionalareaid': this.functionalarea,
      'MinExp': this.minexp,
      'MaxExp': this.maxexp,
      'Minctc': this.minctc,
      'Maxctc': this.maxctc,
      'Pagenumber': 0
    };

    // localStorage.setItem('filter_application_received', JSON.stringify(this.localpostdata));
    // localStorage.setItem('search_application_receivedy', JSON.stringify(this.searchdata));
    this.ViewState = false;
    if (from == 'scroll') {
      this.spinnerService.show();
      this.CompanyDetailsService.GetAppByCompanyId(this.postdata).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        this.GetAppliedJobListRes = this.DbResponce.lstAppliedJobList;
        if (this.DbResponce.lstAppliedJobList != null) {
          this.ViewJob = true;
          this.GetAppliedJobList = this.GetAppliedJobList.concat(this.GetAppliedJobListRes);
          this.jobroll = true;
          this.from = 'scroll';
        } else {
          this.GetAppliedJobList = [];
          this.from = '';
        }
        this.delay = false;
      });
    } else {
      // this.masterService.saveUserLogs('Job/GetAppliedJobListAplictRecvd/','Application Received') ;
      this.CompanyDetailsService.GetAppByCompanyId(this.postdata).subscribe(res => {
        this.DbResponce = res;
        this.GetAppliedJobListRes = this.DbResponce.lstAppliedJobList;
        this.spinnerService.hide();
        if (this.DbResponce != null) {
          this.ViewJob = true;
          this.GetAppliedJobList = this.GetAppliedJobListRes;
          this.jobroll = true;
          this.from = '';
        } else {
          this.GetAppliedJobList = [];
          this.from = '';
        }
      });
      this.pageNumber = 0;
    }
  }

  GetAllAppliedJobs2(PageNumber: number, from: any) {
    this.stateJobscrol = false;
    this.searchstsAppliedJob = 0;
    if (this.JobApplicationReceived.value.industry != '' && this.JobApplicationReceived.value.industry != null) {
      this.industry = this.JobApplicationReceived.value.industry;
      this.industryname = this.IndustryArea.find(o => o.id === this.industry);
      this.industryname = this.industryname.industryName;
    } else {
      this.industry = 0;
      this.industryname = '';
    }

    if (this.JobApplicationReceived.value.functionalarea != '' && this.JobApplicationReceived.value.functionalarea != null) {
      this.functionalarea = this.JobApplicationReceived.value.functionalarea;
      this.functionalareaname = this.FunctionArea.find(o => o.id === this.functionalarea)
      this.functionalareaname = this.functionalareaname.functionalAreaName;
    } else {
      this.functionalarea = 0;
      this.functionalareaname = '';
    }

    this.minctc = this.minCtc > 0 ? this.minCtc : 0;
    this.maxctc = this.maxCtc > 0 ? this.maxCtc : 0;
    this.minexp = this.minExp > 0 ? this.minExp : 0;
    this.maxexp = this.maxExp > 0 ? this.maxExp : 0;
    this.postdata = {
      "StateId": this.FilterJobByComoany.controls.Stateid.value != '' ? parseInt(this.FilterJobByComoany.controls.Stateid.value) : 0,
      "DistrictId": this.FilterJobByComoany.controls.Districtid.value != '' ? parseInt(this.FilterJobByComoany.controls.Districtid.value) : 0,
      "PageNumber": 0,
      "Keyword": '',
      "CompanyId": this.companyId,
      "AdminId": this.AdminId,
      "JobId": 0,
      "UserId": 0,
      "FunctionalAreaId": 0,
      "IndustryId": 0,
      "Maxctc": 0,
      "Minctc": 0,
      "MaxExp": 0,
      "MinExp": 0
    };

    this.searchdata = {
      'industryid': this.industryname,
      'functionalareaid': this.functionalareaname,
      'MinExp': this.minexp,
      'MaxExp': this.maxexp,
      'Minctc': this.minctc,
      'Maxctc': this.maxctc,
      'Pagenumber': this.pageno
    };

    this.localpostdata = {
      'industryid': this.industry,
      'functionalareaid': this.functionalarea,
      'MinExp': this.minexp,
      'MaxExp': this.maxexp,
      'Minctc': this.minctc,
      'Maxctc': this.maxctc,
      'Pagenumber': 0
    };

    localStorage.setItem('filter_application_received', JSON.stringify(this.localpostdata));
    localStorage.setItem('search_application_receivedy', JSON.stringify(this.searchdata));
    this.spinnerService.show();
    this.ViewState = false;

    if (from == 'scroll') {
      this.CompanyDetailsService.GetAppByCompanyId(this.postdata).subscribe(res => {
        this.DbResponce = res
        this.GetAppliedJobListRes = this.DbResponce.lstAppliedJobList;
        this.spinnerService.hide();
        if (this.DbResponce != null) {
          this.ViewJob = true;
          this.GetAppliedJobList = this.GetAppliedJobList.concat(this.GetAppliedJobListRes);
          this.jobroll = true
          this.from = 'scroll';
        } else {
          this.GetAppliedJobList = [];
          this.from = '';
        }
        this.delay = false;
      });
    } else {
      this.CompanyDetailsService.GetAppByCompanyId(this.postdata).subscribe(res => {
        this.DbResponce = res;
        this.GetAppliedJobListRes = this.DbResponce.lstAppliedJobList;
        this.spinnerService.hide();
        if (this.DbResponce.lstAppliedJobList != null) {
          this.ViewJob = true;
          this.GetAppliedJobList = this.GetAppliedJobListRes;
          this.jobroll = true;
          this.from = '';
        } else {
          this.GetAppliedJobList = [];
          this.from = '';
        }
      });
    }
  }

  dbRes: any = {};
  previous: any = '0';
  jobId: any;
  getstateJobDetails: any = [];
  id: any;
  paginationjobid: number;
  CandidateListing: any = '0';
  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
      });
    } catch  { }
  }


  getJobByOpenings(jobid, pageNumber, from: any) {
    // this.ViewJob       = false;
    // this.ViewState=true;
    let statedid;
    let districtid;
    let statename = (this.lstState).filter(function (entry) {
      return entry.id == statedid;
    });

    let districtname = (this.district).filter(function (entry) {
      return entry.id == districtid;
    });
    this.appliedlistshow = false;
    this.searchstsAppliedJob = 0;
    this.ViewJob = false;
    this.ViewState = true;
    this.jobroll = false;
    this.previous = '1';
    this.ShowPushDataInterview = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "Keyword": this.FilterOpeningCompany.controls.OpeningSearchKey.value
    };
    this.pushdataInterview = {
      "StateId": this.FilterOpeningCompany.controls.OpeningStateid.value != '' ? parseInt(this.FilterOpeningCompany.controls.OpeningStateid.value) : 0,
      "DistrictId": this.FilterOpeningCompany.controls.OpeningDistrictid.value != '' ? parseInt(this.FilterOpeningCompany.controls.OpeningDistrictid.value) : 0,
      "PageNumber": 0,
      "Keyword": this.FilterOpeningCompany.controls.OpeningSearchKey.value != '' ? this.FilterOpeningCompany.controls.OpeningSearchKey.value : '',
      "AdminId": this.AdminId,
      "CompanyId": this.companyId,
      "JobId": jobid
    };
    if (from == 'scroll') {
      this.CompanyDetailsService.GetOpeningByJobId(this.pushdataInterview).subscribe(res => {
        this.spinnerService.hide();
        this.dbRes = res;
        if (this.dbRes.lstAppliedJobList != null) {
          this.jobId = this.dbRes.lstAppliedJobList[0].jobId;
          var stateJobResult = this.dbRes.lstAppliedJobList[0].jobOpeningList;
          if (stateJobResult != null) {
            this.getstateJobDetails = this.getstateJobDetails.concat(stateJobResult);
            this.from = 'scroll';
          } else {
            this.getstateJobDetails = [];
            this.from = '';
          }
          this.delay = false;
        } else {
          this.jobId = this.jobId;
        }
      })
    } else {
      this.CompanyDetailsService.GetOpeningByJobId(this.pushdataInterview).subscribe(res => {
        this.spinnerService.hide();
        this.dbRes = res;
        // this.jobId=this.dbRes.lstJobwiseOpeningList[0].jobId;     
        var stateJobResult = this.dbRes.lstGetOpeningDetails[0].jobOpeningList;
        this.id = this.paginationjobid;
        if (stateJobResult != null) {
          this.stateJobscrol = true;
          this.getstateJobDetails = stateJobResult;
        } else {
          this.getstateJobDetails = [];
        }
      })
    }
  }

  JobDetails: any;
  JobList: any = [];
  jobOpeningID: any;
  viewcandidatedetails: number = 1;
  GetAppliedcandidate: any = [];
  OpeningCandidateList: any = [];
  GetAppliedJobcandidate: any = [];

  // Candidate Listing 
  getCandidateListing(jobDetail: any) {
    if (this.dtTrigger != null)
      this.dtTrigger.unsubscribe();
    this.OpeningCandidateList = [];
    this.GetAppliedcandidate = [];
    this.dtOptions = null;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      jQueryUI: true,
      destroy: true,
      retrieve: false,
      processing: true,
      deferRender: true,
      stateSave: false,
      dom: '"<"H"lfr>t<"F"ip>',
      autoWidth: true,
      displayStart: 0,
      language: {
        emptyTable: "No data available",
        infoEmpty: "Total Record Found: 0",
        infoFiltered: "(searched in _MAX_ records)",
        loadingRecords: "Loading...",
        processing: "Processing...",
        search: "Search all columns:",
        zeroRecords: "No matching records found"
      },
    };
    this.dtTrigger = new Subject<any>();
    this.stateJobscrol = false;
    this.ViewState = false;
    this.count = [];
    var totalAppliedCandidate = jobDetail.noOfCandidate;
    for (var i = 0; i < (Math.ceil(totalAppliedCandidate / 10)); i++) {
      this.count.push(i + 1);
      this.last = i + 1;
    }
    let candidate_post_data =
    {
      'companyId': this.companyId, "jobId": jobDetail.jobId, "jobOpeningID": jobDetail.jobOpeningID,
      "stateId": 0, "districtId": 0, "keyword": ''
    }
    this.viewcandidatedetails = 0;
    // $('.filter-toggle').click(function () {
    //   $('.filter-wrapper').slideToggle();
    // });
    // localStorage.setItem('filter_jobapplication_id', jobDetail.jobId);
    // localStorage.setItem('filter_jobOpening_id', jobDetail.jobOpeningID);
    this.spinnerService.show();
    let opening_data =
      { 'CompanyId': this.companyId, "jobId": jobDetail.jobId, "PageNumber": 0, "StateId": 0, "DistrictId": 0, "Keyword": '' }
    this.CompanyDetailsService.GetOpeningJobList(opening_data).subscribe(res => {
      this.spinnerService.hide();
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.GetAppliedcandidate = this.DbResponce.lstInterviewJobList;
        this.CompanyDetailsService.GetOpeningCandidateList(candidate_post_data).subscribe(res => {
          this.spinnerService.hide();
          this.DbResponce = res;
          this.id = jobDetail.jobId;
          if (this.DbResponce != null) {
            this.OpeningCandidateList = this.DbResponce.lstAppliedDisticWiseCandidateList;
            this.OpeningCandidateList = this.OpeningCandidateList;
            this.dtTrigger.next();
          }
        });
      }
    });
    this.searchsts = 1;
    this.JobCard = 1;
    this.ViewJob = false;
    this.CandidateListing = '1';
    this.previous = '0';
    this.searchsts = 0;
  }

  previousAppliedJob() {
    this.appliedlistshow = true;
    this.ViewJob = true;
    this.searchstsAppliedJob = 1;
    this.ViewState = false;
    this.JobCard = 0;
    this.CandidateListing = 0;
  }
  previousAppliedCand() {
    // this.appliedlistshow = true;
    // this.ViewJob = true;
    this.searchstsAppliedJob = 0;
    this.ViewState = true;
    this.JobCard = 0;
    this.CandidateListing = 0;

  }

  minDate: any;
  maxDate: any;

  MinDate(minValue: any): void {
    if (minValue != null) {
      this.minDate = minValue;
    }
  }

  MaxDate(maxValue: any) {
    if (maxValue != null) {
      this.maxDate = maxValue;
    }
  }

  reset_walkin() {
    // this.JobKeyword='';
    this.minExp = 0;
    this.maxExp = 0;
    this.minCtc = 0;
    this.maxCtc = 0;
    this.WalkingFilterForm.reset();
    this.pageNumber = 0;
    this.searchsts = 0;
    this.Walkins(this.companyId);
  }
  reset_jobpost() {
    this.minExp = 0;
    this.maxExp = 0;
    this.minCtc = 0;
    this.maxCtc = 0;
    this.FilterJobList.reset();
    this.pageNumber = 0;
    this.SearchstsJob = 0;
    this.JobCount(this.companyId);
  }
  reset_appliedjob() {
    this.minExp = 0;
    this.maxExp = 0;
    this.minCtc = 0;
    this.maxCtc = 0;
    this.JobApplicationReceived.reset();
    // this.JobKeyword='';
    this.pageNumber = 0;
    this.searchstsAppliedJob = 0;
    this.AppliedJob(this.companyId);
  }

  //  jobCardDetail(JobList){
  //   this.jobcardComponent.setJobcardValue(JobList);
  // }
}
/*******************    CLICK    **************************/

