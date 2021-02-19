import { Component, HostListener, OnInit, TemplateRef, ViewChild, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../Globals/app.config';
import { MasterService } from '../../Services/master.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { JobpostService } from '../../Services/jobpost.service';
import { CompanyProfileService } from '../../Services/companyprofile.service';
import * as $ from 'jquery';
import { BsModalService, BsModalRef, esLocale } from 'ngx-bootstrap';
import { Options } from 'ng5-slider';
import { RegistrationService } from '../../Services/registration.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
declare var jsPDF: any;

@Component({
  selector: 'app-JobListComponent',
  templateUrl: './JobList.Component.html',
})
export class JobListComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  UserInfo: any;
  CreateUserForm: FormGroup;
  createuserfomvalue: any = {};
  jobdetail: any = [];
  newAttribute: any = {};
  static ID: any = '';
  SearchResult: any = '0';
  // pageNumber          : number = 0;
  PageNumber: number = 0;
  from: any;
  DbResponce: any = {};
  element: HTMLElement;
  modalRef: BsModalRef;
  FilterJobList: FormGroup;
  Responce: any = {};
  AreaResponce: any = {};
  ShowPushData: any = {};
  minCtc: number = 0;
  maxCtc: number = 0;
  minExp: number = 0;
  maxExp: number = 0;
  industry: number = 0;
  functionalarea: number = 0;
  minctc: number = 0;
  maxctc: number = 0;
  walkinfromdate: any = '';
  walkintodate: any = '';
  minexp: number = 0;
  maxexp: number = 0;
  PushData: any = {};
  ShowJobList: any = 1;
  Showpushdata: boolean;
  item: any = '';
  postData: any = {};
  IndustryArea: any = [];
  IndustryAreaSelecteds: any = null;
  IndustryAreaSelected: string;
  closeJob: any;
  scrapJobs: any
  Industry: any = [];
  redirection: any;
  revoke: any;
  JobKeyword: any = '';
  searchsts: number = 1;
  searchwalkinfromdate: any = '';
  searchwalkintodate: any = '';
  loginType: any;
  DBResponce: any = {};
  show: any = '1';
  delay: boolean = false;
  UserId: any;
  CurrentDate: Date = new Date();
  CtcOptions: Options = {
    floor: 5000,
    ceil: 250000,
    step: 1
  };

  ExpOptions: Options = {
    floor: 0,
    ceil: 20,
    step: 1
  };
  ComapanyFilterJob: FormGroup;
  JobdetialView: boolean = false

  // delay: boolean = false;
  constructor(private appConfig: AppConfig
    , private toastrService: ToastrService
    , private masterService: MasterService
    , private jobpostService: JobpostService
    , private spinnerService: Ng4LoadingSpinnerService
    , private router: Router
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private modalService: BsModalService
    , private companyProfileService: CompanyProfileService
    , private registService: RegistrationService
  ) {
    try {
      this.UserInfo = appConfig.UserInfo;
    } catch  { }
  }

  processing: boolean = false;

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {

    // let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    // let max = document.documentElement.scrollHeight;
    // // if (pos == max) {
    //   if (pos >=(0.8 * max)) {  
    //     if (this.delay) {
    //       return;
    //     }
    //     this.delay = true;  
    //   if (this.companyregisterdata.length >= 10 && this.CompanyView==true) {
    //     this.CompanyPageNumber = this.CompanyPageNumber + 1;
    //     this.GetFilterCompany(this.CompanyPageNumber, 'scroll', 'search');      

    //   }
    //   if (this.jobdetail.length >= 10 && this.JobdetialView==true) {
    //     this.PageNumber = this.PageNumber + 1;
    //     this.GetFilterJobsList(this.PageNumber, 'scroll');
    //   }
    // }

    /////////////////////   add new code prakash singh 30-04-2019 //////////////////

    if (this.CompanyView)  ////////////// company view //////////////
    {
      //var totalReocds=45/10;
      // var norecods=Math.ceil(totalReocds);
      if (this.processing)
        return false;
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return;
        }
        this.delay = true;
        // if (this.companyregisterdata.length >= 10 && this.CompanyView==true && norecods>=this.CompanyPageNumber)  {
        if (this.companyregisterdata.length >= 10 && this.CompanyView == true) {
          this.CompanyPageNumber = this.CompanyPageNumber + 1;
          this.processing = true;
          this.GetFilterCompany(this.CompanyPageNumber, 'scroll', 'search');
        }
      }
    }
    if (this.JobdetialView)  ////////////// company view //////////////
    {
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return;
        }
        this.delay = true;
        // if (this.jobdetail.length >= 10 && this.JobdetialView == true && this.JobNoCount >= this.PageNumber) {
        if (this.jobdetail.length >= 10 && this.JobdetialView == true) {
          this.PageNumber = this.PageNumber + 1;
          this.GetAllWalkins(this.PageNumber, 'scroll');
        }
      }
    }

    ////////////////////// end code  prakash singh 30-04-2019
  }

  HideCommon: any = 1;
  redirect: any;
  ngOnInit() {
    localStorage.removeItem('compid');
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });

    this.redirection = this.route.snapshot.paramMap.get('Redirection');
    if (this.redirection != null) {
      // this.spinnerService.show();
      this.HideCommon = 2;
      this.companyId = JSON.parse(localStorage.getItem('companyid'));
      this.Showpushdatacompany = '0';
      // this.jobdetail = [];
      this.backbtn = '1';
      this.searchsts = 0;
      this.ShowJobList = 1;
      this.show = '1';

      ////////////  add new code ////////
      this.CompanyView = false;
      this.ShowCompanyFilter = '0';
      this.hrefurl = '0';
      this.CompanyList = 0;
      this.JobdetialView = true;
      //this.jobdetail = [];
      this.backbtn = '1';
      this.PageNumber = 0;
      this.GetAllWalkins(this.PageNumber, '');
      this.Showpushdata = false;
      this.joblistshow = '1';
      // window.scroll(0,0);
      // this.spinnerService.hide();
      // this.delay=false;

      /////////// end new code /////////
    }
    else {
      this.HideCommon = 1;
    }

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
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    // window.scroll(0, 0);
    //   var parentid=this.UserInfo.id;
    // this.GetFilterJobsList();

    ///  add prakash singh 18-04-2019  /////
    this.ComapanyFilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'PostType': ['', Validators.required],
    });
    this.GetFilterCompany(this.CompanyPageNumber, '', 'init');
    this.GetAllState();


    //// end code  prakash Singh   ////
  }
  ////////////////// new code added prakash singh 18-04-2019 ///////
  states: any = [];
  // GetAllState() {
  //   this.jobpostService.GetAllStates().subscribe(res => {
  //     this.states = res
  //     if (this.states != null) {
  //       this.states = this.states.Data;
  //     }
  //     else {
  //       this.states = [];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }
  GetAllState() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.states = res
        this.states = this.states;
      });
    } catch  { }
  }


  district1: any = [];
  // GetAllDistrict(event: any) {
  //   if (event == undefined || event == "") {
  //     this.district1 = [];
  //     this.ComapanyFilterJob.controls['DistrictID'].setValue('');
  //     return false;
  //   }
  //   if (event != '' || event != null) {
  //     this.ComapanyFilterJob.controls['DistrictID'].setValue('');
  //   }
  //   this.jobpostService.GetAllDistrict(event).subscribe(res => {
  //     this.district1 = res
  //     if (this.district1 != null) {
  //       this.district1 = this.district1.Data;
  //     }
  //     else {
  //       this.district1 = [];
  //     }
  //   });
  // }
  GetAllDistrict(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
      this.ComapanyFilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if (event != '' || event != null) {
      this.ComapanyFilterJob.controls['DistrictID'].setValue('');
    }
    this.masterService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res
      if (this.district1 != null) {
        this.district1 = this.district1;
      }
      else {
        this.district1 = [];
      }
    });
  }
  Showpushdatacompany: any = '0';
  logintype: number = 0;
  StateiD: number = 0;
  DistrictID: any = '';
  senddatafilter: any = [];
  companyregisterdata: any = [];
  SenddatafilterComapny: any = [];
  CompanyPageNumber: number = 0;
  CompanyView: boolean = true;
  hrefurl: any = '0';
  CompanyList: any = '0'
  JobPosType: any;
  GetFilterCompany(CompanyPageNumber, from: any, src: any) {

    this.CompanyPageNumber = CompanyPageNumber;
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdatacompany = '1';
      this.hrefurl = '1'
      this.CompanyList = '1';

    }
    else {
      this.hrefurl = '0'

    }
    this.CompanyList = '1';
    this.from = from;
    this.item = localStorage.getItem('phpadminid');
    if (this.ComapanyFilterJob.value.logintype != 'undifined' && this.ComapanyFilterJob.value.logintype != '' && this.ComapanyFilterJob.value.logintype != null) {
      this.logintype = this.ComapanyFilterJob.value.logintype;
    } else {
      this.logintype = 0;
    }
    if (this.ComapanyFilterJob.value.StateiD != 'undifined' && this.ComapanyFilterJob.value.StateiD != '' && this.ComapanyFilterJob.value.StateiD != null) {
      this.StateiD = this.ComapanyFilterJob.value.StateiD;
    } else {
      this.StateiD = 0;
    }
    if (this.ComapanyFilterJob.value.DistrictID != 'undifined' && this.ComapanyFilterJob.value.DistrictID != '' && this.ComapanyFilterJob.value.DistrictID != null) {
      this.DistrictID = this.ComapanyFilterJob.value.DistrictID;
    } else {
      this.DistrictID = 0;
    }
    if (this.ComapanyFilterJob.value.JobKeyword != 'undifined' && this.ComapanyFilterJob.value.JobKeyword != '' && this.ComapanyFilterJob.value.JobKeyword != null) {
      this.JobKeyword = this.ComapanyFilterJob.value.JobKeyword;
    } else {
      this.JobKeyword = '';
    }

    var statedid;
    var districtid;
    statedid = this.ComapanyFilterJob.value.StateiD;
    districtid = this.ComapanyFilterJob.value.DistrictID;
    var statename = (this.states).filter(function (entry) {
      return entry.id == statedid;
    });

    var districtname = (this.district1).filter(function (entry) {
      return entry.id == districtid;
    });
    var jobpostype
    this.ComapanyFilterJob.value.PostType != '' && this.ComapanyFilterJob.value.PostType != null ? this.ComapanyFilterJob.value.PostType : 'NA'
    if (this.ComapanyFilterJob.value.PostType != '' && this.ComapanyFilterJob.value.PostType != null && this.ComapanyFilterJob.value.PostType == '1') {
      jobpostype = 'Yes';
      this.JobPosType = true;
    }
    else if (this.ComapanyFilterJob.value.PostType != '' && this.ComapanyFilterJob.value.PostType != null && this.ComapanyFilterJob.value.PostType == '2') {
      jobpostype = 'No';
      this.JobPosType = false;

    }
    else {
      jobpostype = 'NA';
      this.JobPosType = null;


    }

    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.Showpushdatacompany = {};
    this.Showpushdatacompany = {
      "logintype": this.ComapanyFilterJob.value.logintype != 'undefined' && this.ComapanyFilterJob.value.logintype != '' && this.ComapanyFilterJob.value.logintype != null ? this.ComapanyFilterJob.value.logintype : 'NA',
      "StateiD": statename != 'undefined' && statename != '' && statename != null ? statename[0]['stateName'] : 'NA',
      "Districtid": districtname != 'undefined' && districtname != '' && districtname != null ? districtname[0]['districtName'] : 'NA',
      "JobKeyword": this.ComapanyFilterJob.value.JobKeyword != 'undefined' && this.ComapanyFilterJob.value.JobKeyword != '' && this.ComapanyFilterJob.value.JobKeyword != null ? this.ComapanyFilterJob.value.JobKeyword : 'NA',
      "JobPosted": jobpostype != 'undefined' && jobpostype != '' && jobpostype != null ? jobpostype : 'NA'

    };
    this.SenddatafilterComapny = {
      'isjobpushed': this.JobPosType,
      'companyid': 0,
      'logintype': this.ComapanyFilterJob.value.logintype != 'undifined' && this.ComapanyFilterJob.value.logintype != '' && this.ComapanyFilterJob.value.logintype != null ? this.ComapanyFilterJob.value.logintype : "",
      'searchkey': this.ComapanyFilterJob.value.JobKeyword != 'undifined' && this.ComapanyFilterJob.value.JobKeyword != '' && this.ComapanyFilterJob.value.JobKeyword != null ? this.ComapanyFilterJob.value.JobKeyword.trim() : "",
      'stateid': this.ComapanyFilterJob.value.StateiD != 'undifined' && this.ComapanyFilterJob.value.StateiD != '' && this.ComapanyFilterJob.value.StateiD != null ? this.ComapanyFilterJob.value.StateiD : 0,
      'districtid': this.ComapanyFilterJob.value.DistrictID != 'undifined' && this.ComapanyFilterJob.value.DistrictID != '' && this.ComapanyFilterJob.value.DistrictID != null ? this.ComapanyFilterJob.value.DistrictID : 0,
      'adminid': parseInt(this.adminId),
      'pagenumber': this.CompanyPageNumber
    };
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.registService.GetFilterCompanyData(this.SenddatafilterComapny)
        .debounceTime(5000) // wait 300ms after the last event before emitting last event
        .distinctUntilChanged()
        .subscribe(res => {
          this.DbResponce = res;
          if (this.DbResponce != null) {
            this.spinnerService.hide();
            this.companyregisterdata = this.companyregisterdata.concat(this.DbResponce.lstCompanyDetails);
            this.from = 'scroll';
          } else {
            // this.companyregisterdata = [];
            this.from = '';
          }
          this.delay = false;
          this.spinnerService.hide();
          this.processing = false;

        });
    }
    else {
      this.spinnerService.show();
      this.registService.GetFilterCompanyData(this.SenddatafilterComapny)
        .debounceTime(5000) // wait 300ms after the last event before emitting last event
        .distinctUntilChanged()
        .subscribe(res => {

          this.companyregisterdata = res;

          if (this.companyregisterdata != null) {
            // this.spinnerService.hide();
            this.companyregisterdata = this.companyregisterdata.lstCompanyDetails;
          } else {
            // this.companyregisterdata = [];
            //this.spinnerService.hide();
          }
          this.spinnerService.hide();
          this.delay = false;
          this.from = '';
          this.processing = false;
        });
    }
    this.from = '';
  }

  Comapanyreset() {
    this.ComapanyFilterJob.reset();
    this.CompanyPageNumber = 0;
    this.GetFilterCompany(this.CompanyPageNumber, '', 'init');

  }
  ShowCompanyFilter: any = '1'
  backbtn: any = '0';
  ViewCompanyData(companyid: string) {
    this.HideCommon = 2;
    localStorage.setItem('companyid', companyid);
    this.companyId = companyid;
    if (companyid != '') {
      this.Showpushdatacompany = '0';
      this.ShowCompanyFilter = '0';
      this.hrefurl = '0';
      this.CompanyList = '0';
      this.CompanyView = false;
      this.JobdetialView = true;
      this.jobdetail = [];
      this.backbtn = '1';
      this.GetAllWalkins(this.PageNumber, '');
      this.Showpushdata = false;
      this.joblistshow = '1';
      this.searchsts = 0;
      this.ShowJobList = 1;
      this.show = '1';
      window.scroll(0, 0);

    }
  }
  JobNoCount: any = 0;
  GET_TOTAL_COUNT_Job_List() {
    this.JobNoCount = 0;
    this.jobpostService.GET_TOTAL_COUNT_Job_List(this.adminId, this.companyId, 'JOB').subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce.lstJobRelatedData != null) {
        var totalReocds = this.DbResponce.lstJobRelatedData[0].totaljobs;
        this.JobNoCount = Math.ceil(totalReocds);
      }
      else {
        this.JobNoCount = 0;

      }
    });
  }
  Companyback() {

    this.Showpushdatacompany = '1';
    this.ShowCompanyFilter = '1';
    this.hrefurl = '0';
    this.CompanyList = '1';
    this.CompanyView = true;
    this.JobdetialView = false;
    this.jobdetail = [];
    this.backbtn = '0';
    this.searchsts = 0;
    this.Showpushdata1 = false;
    this.joblistshow = '0';
    this.searchsts1 = false;
    this.SearchResult = '1';
    this.ShowJobList = 0;
    this.show = '0';
    window.scroll(0, 0);
    this.HideCommon = 1;


  }
  ////////////////////// end code prakash singh 18-04-2019 ////////
  companyId: any;
  joblistshow: any = '0';
  onClicked(companyid: string) {
    this.HideCommon = 2;
    localStorage.setItem('companyid', companyid);
    this.companyId = companyid;
    if (companyid != '') {
      this.jobdetail = [];
      this.GetAllWalkins(this.PageNumber, '');
      this.Showpushdata = false;
      this.joblistshow = '1';

      this.searchsts = 0;
      this.ShowJobList = 1;
      this.show = '1';
    }
  }

  Showpushdata1: boolean;
  searchsts1: boolean;
  onbackregist() {
    this.searchsts = 0;
    this.Showpushdata1 = false;
    this.joblistshow = '0';
    this.searchsts1 = false;
    this.SearchResult = '1';
    this.ShowJobList = 0;
    this.show = '0';
  }

  AlertBox(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  RevokeTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  scrapTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {
    this.modalRef.hide();
  }



  RevokeJob(id: any, UserId: any) {
    //  localStorage.setItem('userID',UserId);
    // this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.PageNumber = 0;
    this.from = '';
    this.spinnerService.show();
    this.jobpostService.RevokeJob(id, UserId, AdminId).subscribe(res => {
      this.DbResponce = res
      this.GetFilterJobsList(this.PageNumber, this.from);
      // this.HideCommon='2';
      // this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
      //   //this.spinnerService.hide();
      //   this.JobDbresponse = res
      //   if (this.JobDbresponse.lstJobRequest != null) {
      //     this.jobdetail = []
      //     if (this.from == 'scroll') {
      //       this.jobdetail = this.jobdetail.concat(this.JobDbresponse.lstJobRequest);
      //     } else {
      //       this.jobdetail = this.JobDbresponse.lstJobRequest;
      //     }
      //   } else {
      //     //this.jobdetail = [];
      //   }
      //   this.delay = false;
      // });
      if (this.DbResponce.responseResult) {
        this.jobpostService.postToYS(this.jobid).subscribe(res => {
          this.openingResponse = res;
          // this.spinnerService.hide();          
          this.htmlOpeningDetails = this.openingResponse.lstAdminEmployerAgency;
          if (this.openingResponse) {
            for (var i = 0; i < this.htmlOpeningDetails.length; i++) {
              var jobHtml = this.htmlOpeningDetails[i].jobHtml;
              var cmpImg = this.htmlOpeningDetails[i].image;
              var cmpName = this.htmlOpeningDetails[i].companyName
              if (jobHtml != null && cmpImg) {
                let postData = {
                  'Content': jobHtml,
                  'DiaplayTo': 6,
                  'EmployerImage': cmpImg,
                  'RojCompName': cmpName
                };
                this.jobpostToYs(postData);
              }
            }
          }
        })
        this.toastrService.success(this.DbResponce.message);
        // this.jobdetail = [];
        this.modalRef.hide();
        let PushData = JSON.parse(localStorage.getItem('IsSend'));
        this.postData = {
          'FunctionalAreaId': PushData.FunctionalAreaId,
          'IndustryId': PushData.IndustryId,
          'Maxctc': PushData.Maxctc,
          'Minctc': PushData.Minctc,
          'MaxExp': PushData.MaxExp,
          'MinExp': PushData.MinExp,
          'PageNumber': 0,
          'JobId': 0,
          'UserID': 0,
          'CompanyId': this.companyId,
          'AdminId': this.adminId,
          'JobKeyword': PushData.JobKeyword,
          "JobInDate": '2018-01-22T00:30:37.000Z',
          "JobToDate": '2030-01-22T00:30:37.000Z',
        };
        this.spinnerService.show();

      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
  }

  goToCommon() {
    this.PageNumber = 0;
    this.HideCommon = 1;
    this.joblistshow = 0;
    this.searchsts = 0;
    // this.FilterJobList.reset();

    window.scroll(0, 0);
    this.Showpushdata = false;
    this.jobdetail = [];
    localStorage.removeItem('companyid');
    this.router.navigate(['/JobList']);
  }

  GetAllIndustryArea() {
    this.masterService.GetAllIndustryArea().subscribe(res => {
      this.Industry = res;
      this.IndustryArea = this.Industry;
    });
  }

  FunctionArea: any = [];
  GetAllFunctionArea() {
    this.masterService.GetAllFunctionArea().subscribe(res => {
      this.AreaResponce = res;
      this.FunctionArea = this.AreaResponce;
    });
  }

  openingResponse: any = [];
  postJob: any = {};
  htmlOpeningDetails: any[] = [];
  jobid: any;
  JobDbresponse: any = [];
  PublishJob(item: any) {
    // var items = JSON.stringify(item);

    if (!item.userActiveStatus) {
      this.toastrService.error('Active user to Post the Job');
      this.modalRef.hide();
      return false;

    }
    if (!item.userVerifyStatus) {
      this.toastrService.error('Approve user to Post the Job');
      this.modalRef.hide();
      return false;
    }
    if (item.userActiveStatus && item.userVerifyStatus) {
      var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
      this.jobid = JSON.stringify(item.jobId);
      var userID = JSON.stringify(item.userID);
      this.modalRef.hide();
      this.spinnerService.show();
      this.jobpostService.PublishJob(this.jobid, userID, AdminId).subscribe(res => {
        this.DbResponce = res
        this.GetFilterJobsList(this.PageNumber, this.from);

        // this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
        //   //this.spinnerService.hide();
        //   this.JobDbresponse = res
        //   this.HideCommon='2';
        //   this.joblistshow = '1';
        //   this.searchsts = 0;
        //   this.ShowJobList = 1;
        //   if (this.JobDbresponse.lstJobRequest != null) {
        //     this.jobdetail = []
        //     if (this.from == 'scroll') {
        //       this.jobdetail = this.jobdetail.concat(this.JobDbresponse.lstJobRequest);
        //     } else {
        //       this.jobdetail = this.JobDbresponse.lstJobRequest;
        //     }
        //   } else {
        //     //this.jobdetail = [];
        //   }
        //   this.delay = false;
        // });
        if (this.DbResponce.responseResult) {
          this.jobpostService.postToYS(this.jobid).subscribe(res => {
            this.openingResponse = res;
            //  this.spinnerService.hide();          
            this.htmlOpeningDetails = this.openingResponse.lstAdminEmployerAgency;
            if (this.openingResponse) {
              for (var i = 0; i < this.htmlOpeningDetails.length; i++) {
                var jobHtml = this.htmlOpeningDetails[i].jobHtml;
                var cmpImg = this.htmlOpeningDetails[i].image;
                var cmpName = this.htmlOpeningDetails[i].companyName
                if (jobHtml != null && cmpImg) {
                  let postData = {
                    'Content': jobHtml,
                    'DiaplayTo': 6,
                    'EmployerImage': cmpImg,
                    'RojCompName': cmpName
                  };
                  this.jobpostToYs(postData);
                }
              }
            }
          })

          // this.toastrService.success(this.DbResponce.message);
          this.toastrService.success("Job has been posted successfully");

          // this.jobdetail = [];
          this.modalRef.hide();
          let PushData = JSON.parse(localStorage.getItem('IsSend'));
          this.postData = {
            'FunctionalAreaId': PushData.FunctionalAreaId,
            'IndustryId': PushData.IndustryId,
            'Maxctc': PushData.Maxctc,
            'Minctc': PushData.Minctc,
            'MaxExp': PushData.MaxExp,
            'MinExp': PushData.MinExp,
            'PageNumber': 0,
            'JobId': 0,
            'UserID': 0,
            'CompanyId': this.companyId,
            'AdminId': this.adminId,
            'JobKeyword': PushData.JobKeyword,
            "JobInDate": '2018-01-22T00:30:37.000Z',
            "JobToDate": '2030-01-22T00:30:37.000Z',
          };
          this.spinnerService.show();

        } else {
          this.toastrService.error(this.DbResponce.message);
        }
      });
    }

  }

  DbResponces: any;
  jobpostToYs(jobId: any) {
    this.jobpostService.postToYS(this.jobid).subscribe(res => {
      this.openingResponse = res;
      // this.spinnerService.hide();          
      //   this.htmlOpeningDetails=this.openingResponse.lstAdminEmployerAgency;     
      //   if(this.openingResponse){
      //     for (var i=0;i< this.htmlOpeningDetails.length;i++){                                    
      //               var jobHtml= this.htmlOpeningDetails[i].jobHtml;   
      //               var cmpImg=this.htmlOpeningDetails[i].image;
      //               var cmpName=this.htmlOpeningDetails[i].companyName
      //               if(jobHtml!=null && cmpImg){
      //                 let postData={
      //                   'Content':jobHtml,
      //                   'DiaplayTo':6,
      //                   'EmployerImage': cmpImg,
      //                   'RojCompName' : cmpName                            
      //                 };   
      //                 this.jobpostService.PostWalkin(postData).subscribe(res => {    
      //                 this.DbResponces = res                          
      //                 this.spinnerService.hide();
      //                 if (this.DbResponce.responseResult) {   
      //                   this.toastrService.success(this.DbResponce.message);
      //                   }
      //                 });
      //               }                  
      //       }       
      //   } 
    })
  }

  companresponsedb: any = [];
  companyprofile: any = '';
  comapnyimage: any = '';
  PublishJob1(item: any) {
    localStorage.setItem('userID', item.userID);
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    var companyid = JSON.parse(localStorage.getItem('companyid'));
    var id = item.jobId;
    this.PageNumber = 0;
    this.from = '';
    this.spinnerService.show();
    let postdata: any = {};
    var validDate = item.validDate.split('T');
    var validDateTo = validDate[0].split("-").reverse().join("/");
    var jobPostDate = item.jobPushedDate.split('T');
    var postDate = jobPostDate[0].split("-").reverse().join("/");
    var minexp = 0;
    var maxexp = 0;
    if (item.minExp != '') {
      minexp = item.minExp;
    } else {
      minexp = 0;
    }
    if (item.maxExp != '') {
      maxexp = item.maxExp;
    } else {
      maxexp = 0;
    }
    var exp = '';
    if (minexp != 0 && maxexp != 0) {
      exp = minexp + '-' + maxexp;
    } else {
      exp = '0';
    }
    var keyword = '';
    if (item.keyword != '') {
      keyword = item.keyword;
    } else {
      keyword = 'NA';
    }
    // var validDateto = this.converttime(item.validDate); 
    this.companyProfileService.GetCompanyData(companyid).subscribe(res => {
      this.companresponsedb = res;
      this.companyprofile = this.companresponsedb.lstCompanyProfile[0];
      this.comapnyimage = this.companyprofile.image;
      if (this.companyprofile) {
        if (this.closeJob == 'CloseJob') {

          var str1 = '<div style="border:0px solid black; padding:5px"><h4>This job has been closed<h4><h4>' + item.jobTitle + ' ||  Post Date , ' + postDate + '</h4><p style="font-weight: bold; font-size: 15px;">' + item.companyName + '</p><TABLE class="table"><tr><td style="width: 120px"><span><i class="fa fa-briefcase" aria-hidden="true"></i></span>' + exp + 'Years' + '</td> </tr><tr><td>Job Type</td><td>' + item.shiftTime + '</td></tr><tr><td>Keyskills</td><td>' + keyword + '</td></tr><tr><td>Job Description</td><td>' + item.jobDescription + '</td></tr><tr><td>Valid to</td><td>' + validDateTo + '</td></tr><tr><td>Email</td><td>' + item.email + '</td></tr><tr><td>Mobile No</td><td>' + item.mobile + '</td></tr></TABLE></div>';
        }
        else if (this.scrapJobs == 'scrapJob') {
          var str1 = '<div style="border:0px solid black; padding:5px"><h4>This job has been scraped<h4><h4>' + item.jobTitle + ' ||  Post Date , ' + postDate + '</h4><p style="font-weight: bold; font-size: 15px;">' + item.companyName + '</p><TABLE class="table"><tr><td style="width: 120px"><span><i class="fa fa-briefcase" aria-hidden="true"></i></span>' + exp + 'Years' + '</td> </tr><tr><td>Job Type</td><td>' + item.shiftTime + '</td></tr><tr><td>Keyskills</td><td>' + keyword + '</td></tr><tr><td>Job Description</td><td>' + item.jobDescription + '</td></tr><tr><td>Valid to</td><td>' + validDateTo + '</td></tr><tr><td>Email</td><td>' + item.email + '</td></tr><tr><td>Mobile No</td><td>' + item.mobile + '</td></tr></TABLE></div>';
        }
        else {
          var str1 = '<div style="border:0px solid black; padding:5px"><h4>' + item.jobTitle + ' ||  Post Date , ' + postDate + '</h4><p style="font-weight: bold; font-size: 15px;">' + item.companyName + '</p><TABLE class="table"><tr><td style="width: 120px"><span><i class="fa fa-briefcase" aria-hidden="true"></i></span>' + exp + 'Years' + '</td> </tr><tr><td>Job Type</td><td>' + item.shiftTime + '</td></tr><tr><td>Keyskills</td><td>' + keyword + '</td></tr><tr><td>Job Description</td><td>' + item.jobDescription + '</td></tr><tr><td>Valid to</td><td>' + validDateTo + '</td></tr><tr><td>Email</td><td>' + item.email + '</td></tr><tr><td>Mobile No</td><td>' + item.mobile + '</td></tr></TABLE></div>';
        }
        // postdata={'Content':str1,'DiaplayTo':6,'lstImages':""};  
        postdata = { 'Content': str1, 'DiaplayTo': 6, 'EmployerImage': this.comapnyimage };
        this.jobpostService.PostWalkin(postdata).subscribe(res => {
          this.DbResponce = res
          this.spinnerService.show();
          if (res) {
            this.spinnerService.show();
            this.jobpostService.PublishJob(id, this.UserId, AdminId).subscribe(res => {
              this.DbResponce = res
              this.spinnerService.hide();
              if (this.DbResponce.responseResult) {
                this.toastrService.success(this.DbResponce.message);
                this.jobdetail = [];
                this.modalRef.hide();
                let PushData = JSON.parse(localStorage.getItem('IsSend'));
                this.postData = {
                  'FunctionalAreaId': PushData.FunctionalAreaId,
                  'IndustryId': PushData.IndustryId,
                  'Maxctc': PushData.Maxctc,
                  'Minctc': PushData.Minctc,
                  'MaxExp': PushData.MaxExp,
                  'MinExp': PushData.MinExp,
                  'PageNumber': 0,
                  'JobId': 0,
                  'UserID': 0,
                  'CompanyId': this.companyId,
                  'AdminId': this.adminId,
                  'JobKeyword': PushData.JobKeyword.trim(),
                  "JobInDate": '2018-01-22T00:30:37.000Z',
                  "JobToDate": '2030-01-22T00:30:37.000Z',
                };
                this.spinnerService.show();
                this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
                  this.spinnerService.hide();
                  this.DbResponce = res
                  if (this.DbResponce.lstJobRequest != null) {
                    if (this.from == 'scroll') {
                      this.jobdetail = this.jobdetail.concat(this.DbResponce.lstJobRequest);
                    } else {
                      this.jobdetail = this.DbResponce.lstJobRequest;
                    }
                  } else {
                    this.jobdetail = [];
                  }
                  this.delay = false;
                });
                // }else{
                //   this.GetFilterJobsList(this.PageNumber,this.from);
                // }
              } else {
                this.toastrService.error(this.DbResponce.message);
              }
            });
          }
        });
      }
    });
  }

  //  PublishJob(item:any)
  //   {
  //       var id=item.jobId;
  //       this.PageNumber = 0;
  //       this.from='';
  //       this.spinnerService.show();
  //       this.jobpostService.PublishJob(id).subscribe(res => {
  //       this.spinnerService.hide();
  //       this.DbResponce = res;
  //       if(this.DbResponce.responseResult)
  //       {
  //         this.toastrService.success(this.DbResponce.message);
  //         this.jobdetail = [];
  //         this.modalRef.hide();
  //         if(this.redirection!= null){
  //           let PushData      = JSON.parse(localStorage.getItem('IsSend'));
  //           this.postData      = {
  //             'FunctionalAreaId': PushData.FunctionalAreaId,
  //             'IndustryId'      : PushData.IndustryId,
  //             'Maxctc'          : PushData.Maxctc,
  //             'Minctc'          : PushData.Minctc,
  //             'MaxExp'          : PushData.MaxExp,
  //             'MinExp'          : PushData.MinExp,
  //             'PageNumber'      : 0,
  //             'JobId'           : 0,
  //             'JobKeyword'      : PushData.JobKeyword
  //           };
  //           this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
  //             this.DbResponce = res

  //             if (this.DbResponce.lstJobRequest != null) {
  //               this.jobdetail = this.DbResponce.lstJobRequest;
  //             } else {
  //               // this.jobdetail = [];
  //             }

  //           });
  //         }else{
  //           this.GetFilterJobsList(this.PageNumber,this.from);
  //         }
  //       }else
  //       {
  //         this.toastrService.error(this.DbResponce.message);
  //       }
  //     });
  //   }

  setId(id: any, Ispushed: any, companyId: any, userID: any) {

    localStorage.setItem('viewid', id);
    localStorage.setItem('Ispushed', Ispushed);
    localStorage.setItem('companyId', companyId);
    localStorage.setItem('userID', userID);
  }

  adminId: any;
  norecord: boolean = false;
  GetFilterJobsList(PageNumbers, from) {

    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));

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
        this.searchsts = 0;
        return false;
      }
    }

    if (this.FilterJobList.value.MinCtc != '' && this.FilterJobList.value.MinCtc != null) {
      this.minctc = this.FilterJobList.value.MinCtc;
    } else {
      this.minctc = 0;
    }

    if (this.FilterJobList.value.JobKeyword != '' && this.FilterJobList.value.JobKeyword != null) {
      this.JobKeyword = this.FilterJobList.value.JobKeyword;
    } else {
      this.JobKeyword = '';
    }

    if (this.FilterJobList.value.MinExp != '' && this.FilterJobList.value.MinExp != null) {
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
      return entry.id == functionalarea
    });

    this.ShowPushData = {};

    this.ShowPushData = {
      "industry": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "functionalarea": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "Maxctc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "Minctc": this.minCtc > 0 ? this.minCtc : 'NA',
      "MaxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "MinExp": this.minExp > 0 ? this.minExp : 'NA',
      "JobKeyword": this.JobKeyword != '' ? this.JobKeyword.trim() : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA'
    };

    localStorage.setItem('PushData', JSON.stringify(this.ShowPushData));
    if (from == 'scroll') {
      this.delay = false;
      this.searchsts = 0;
      this.Showpushdata = true;

      this.PushData = {
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': this.PageNumber,
        'JobId': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'UserID': 0,
        'JobKeyword': this.JobKeyword.trim(),
        "JobInDate": this.FilterJobList.value.walkInFromDate != '' ? this.FilterJobList.value.walkInFromDate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.FilterJobList.value.walkInToDate != '' ? this.FilterJobList.value.walkInToDate : '2030-01-22T00:30:37.000Z',
      };

      localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.jobpostService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res
        if (this.DbResponce.lstJobRequest != null) {
          this.jobdetail = this.jobdetail.concat(this.DbResponce.lstJobRequest);
          this.norecord = false;
        } else {

        }
        this.delay = false;
      });
    }
    else {
      this.searchsts = 0;
      this.PageNumber = 0;
      this.PushData = {
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': this.PageNumber,
        'JobId': 0,
        'UserID': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'JobKeyword': this.JobKeyword.trim(),
        "JobInDate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.searchwalkintodate != '' ? this.searchwalkintodate : '2030-01-22T00:30:37.000Z',
      };
      localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.jobpostService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce.lstJobRequest != null && this.DbResponce.lstJobRequest != '') {
          this.jobdetail = this.DbResponce.lstJobRequest;
          this.spinnerService.hide();
          this.norecord = false;
        }
        else {
          this.jobdetail = [];
          this.toastrService.error('No Record Found');
          this.norecord = true;

        }
        this.delay = false;
      });
    }
    this.Showpushdata = true;
    this.searchsts = 1;
  }
  GetAllWalkins(pageNumber: any, from: any) {
    // this.FilterJobList.controls['industry'].setValue('');
    // this.FilterJobList.controls['functionalarea'].setValue('');
    this.spinnerService.show();
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    if (from == 'scroll') {
      this.searchsts = 0;
      this.Showpushdata = true;
      this.PushData = {
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': pageNumber,
        'JobId': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'UserID': 0,
        'JobKeyword': this.JobKeyword,
        "JobInDate": (this.FilterJobList.value.walkInFromDate != '' && this.FilterJobList.value.walkInFromDate != null) ? this.FilterJobList.value.walkInFromDate : '2018-01-22T00:30:37.000Z',
        "JobToDate": (this.FilterJobList.value.walkInToDate != '' && this.FilterJobList.value.walkInToDate != null) ? this.FilterJobList.value.walkInToDate : '2030-01-22T00:30:37.000Z',
      };
      localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.jobpostService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce.lstJobRequest != null) {
          this.jobdetail = this.jobdetail.concat(this.DbResponce.lstJobRequest);
        } else {
        }
        this.delay = false;
      });
    }
    else {
      this.searchsts = 0;
      this.PageNumber = 0;
      this.PushData = {
        'FunctionalAreaId': this.functionalarea,
        'IndustryId': this.industry,
        'Maxctc': this.maxCtc,
        'Minctc': this.minCtc,
        'MaxExp': this.maxExp,
        'MinExp': this.minExp,
        'PageNumber': this.PageNumber,
        'JobId': 0,
        'UserID': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'JobKeyword': this.JobKeyword,
        "JobInDate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.searchwalkintodate != '' ? this.searchwalkintodate : '2030-01-22T00:30:37.000Z',
      };
      localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.jobpostService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce.lstJobRequest != null && this.DbResponce.lstJobRequest != '') {
          this.jobdetail = this.DbResponce.lstJobRequest;
          this.spinnerService.hide();
          this.norecord = false;
        } else {
          this.norecord = true;
        }
        this.delay = false;
      });
    }
    this.Showpushdata = true;
    this.searchsts = 1;
  }


  CloseJob(id: any, userID: any, CloseJob: any, item: any) {
    this.closeJob = CloseJob;
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'))
    this.PageNumber = 0;
    this.from = '';
    this.spinnerService.show();
    this.jobpostService.CloseJob(AdminId, id, userID).subscribe(res => {
      this.DbResponce = res
      //this.HideCommon='2';
      this.GetFilterJobsList(this.PageNumber, this.from);
      //this.spinnerService.hide();
      if (this.DbResponce.responseResult != null) {
        this.jobpostService.postToYS(id).subscribe(res => {
        })
        // this.PublishJob(item);
        this.toastrService.success(this.DbResponce.message);
        this.modalRef.hide();
        // this.jobdetail = [];
        // if (this.redirection != null) {
        //   let PushData = JSON.parse(localStorage.getItem('IsSend'));
        //   this.postData = {
        //     'FunctionalAreaId': PushData.FunctionalAreaId,
        //     'IndustryId': PushData.IndustryId,
        //     'Maxctc': PushData.Maxctc,
        //     'Minctc': PushData.Minctc,
        //     'MaxExp': PushData.MaxExp,
        //     'MinExp': PushData.MinExp,
        //     'PageNumber': 0,
        //     'JobId': 0,
        //     'JobKeyword': PushData.JobKeyword,
        //   };
        //   this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
        //     this.DbResponce = res
        //     if (this.DbResponce.lstJobRequest != null) {
        //       this.jobdetail = this.DbResponce.lstJobRequest;
        //     } else {
        //       // this.jobdetail = [];
        //     }
        //   });
        // }
        // else {
        //   this.GetFilterJobsList(this.PageNumber, this.from);
        // }
      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
  }

  scrapJob(id: any, UserID: any, item: any, scrapJob: any) {

    this.scrapJobs = scrapJob;
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'))
    this.PageNumber = 0;
    this.from = '';
    this.spinnerService.show();
    this.jobpostService.scrapJob(id, UserID, AdminId).subscribe(res => {
      this.DbResponce = res
      this.GetFilterJobsList(this.PageNumber, this.from);

      // this.jobpostService.GetAllJobs(this.postData).subscribe(res => {
      //   this.DbResponce = res
      //   if (this.DbResponce.lstJobRequest != null) {
      //     this.jobdetail = this.DbResponce.lstJobRequest;
      //   } else {
      //     // this.jobdetail = [];
      //   }
      //   this.delay = false;
      // });

      if (this.DbResponce.responseResult != null) {
        this.jobpostService.postToYS(id).subscribe(res => {
        })
        this.toastrService.success(this.DbResponce.message);
        this.modalRef.hide();
        // this.jobdetail = [];
        if (this.redirection != null) {
          let PushData = JSON.parse(localStorage.getItem('IsSend'));
          this.postData = {
            'FunctionalAreaId': PushData.FunctionalAreaId,
            'IndustryId': PushData.IndustryId,
            'Maxctc': PushData.Maxctc,
            'Minctc': PushData.Minctc,
            'MaxExp': PushData.MaxExp,
            'MinExp': PushData.MinExp,
            'PageNumber': 0,
            'JobId': 0,
            'JobKeyword': PushData.JobKeyword,
          };
        }
        else {
          this.GetFilterJobsList(this.PageNumber, this.from);
        }
      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
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

  reset() {
    this.industry = 0;
    this.functionalarea = 0;
    this.searchwalkinfromdate = '';
    this.searchwalkintodate = '';
    this.minctc = 0;
    this.JobKeyword = '';
    this.minExp = 0;
    this.maxExp = 0;
    this.PageNumber = 0;
    this.FilterJobList.reset();
    this.FilterJobList.controls['JobKeyword'].setValue('');
    //this.FilterJobList.controls['DistrictID'].setValue('');
    this.onClicked(this.companyId);
  }

  ////////////////////////////  Replicate new job prakash singh 06-04-2018 //////////////////
  repicatepostData: any;
  dbresponse: any;
  reCreateJob(item: any) {
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.jobid = JSON.stringify(item.jobId);
    var userID = JSON.stringify(item.userID);
    this.spinnerService.show();
    localStorage.removeItem('viewid');
    localStorage.removeItem('Ispushed');
    localStorage.removeItem('isScrap');
    localStorage.removeItem('isdateDisable');
    localStorage.removeItem('validNot');
    localStorage.removeItem('isRecreate');

    this.repicatepostData = {
      'Adminid': AdminId,
      'JobId': this.jobid,
      'UserId': userID,

    };
    localStorage.setItem('userID', userID);
    this.jobpostService.reCreateJob(this.repicatepostData).subscribe(res => {
      this.DbResponce = res
      if (this.DbResponce != null) {
        this.dbresponse = this.DbResponce.lstRecreateJob[0];
        this.toastrService.success("Job replicated successfully please edit valid upto date.");
        localStorage.setItem('viewid', this.dbresponse.jobId);
        localStorage.setItem('Ispushed', this.dbresponse.isJobPushed);
        localStorage.setItem('isScrap', this.dbresponse.isScrap);
        localStorage.setItem('isRecreate', 'true');
        localStorage.setItem('isdateDisable', 'true');

        this.router.navigate(['/ViewJob'])
      }
    });
  }

  itempdf: any;
  response: any = [];
  ShowData: any = [];
  htmlget: any;
  JobData: any = [];
  Download(template: TemplateRef<any>, data) {
    this.JobData = data;
    this.jobpostService.GetJobHtml(data.jobId).subscribe(res => {
      this.response = res;
      if (this.response != '') {
        this.spinnerService.hide();
        this.htmlget = this.response.lstGovJob[0].jobHTML;
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
      } else {
        this.response = [];
        this.spinnerService.hide();
      }
    })
  }

  GeneratePDF() {
    var doc = new jsPDF();
    var specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    doc.fromHTML($('#DivContant').html(), 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
    });

    doc.save(this.JobData.companyName + '-' + this.JobData.jobTitle + '-' + this.JobData.jobcode + '.pdf');
  }

  Close() {
    this.modalRef.hide();
  }

  createPDF() {
    var sTable = document.getElementById('tab').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head>');
    win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.
    win.print();    // PRINT THE CONTENTS.
  }

  createDoc() {
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header + document.getElementById("DivContant").innerHTML + footer;
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = this.JobData.companyName + '-' + this.JobData.jobTitle + '-' + this.JobData.jobcode + '.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }
  //////////////////////////// end code /////////////////////////////
}