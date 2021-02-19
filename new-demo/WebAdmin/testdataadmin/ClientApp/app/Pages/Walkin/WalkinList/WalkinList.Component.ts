import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../../Globals/app.config';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { JobpostService } from '../../../Services/jobpost.service';
import { CompanyProfileService } from '../../../Services/companyprofile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { MasterService } from '../../../Services/master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../../Services/registration.service';
@Component({
  selector: 'app-WalkinListComponent',
  templateUrl: './WalkinList.Component.html',
})
export class WalkinListComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  UserInfo: any;
  walkindetail: any = [];
  static ID: any = '';
  dbresponse: any = {};
  DbResponce: any = {};
  pageNumber: number = 0;
  companyprofile: any = '';
  comapnyimage: any = '';
  wlakinListStatus: boolean = false;
  WalkingFilterForm: FormGroup;
  minExp: number = 0;
  maxExp: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
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
  industry = 0;
  functionalarea = 0;
  minctc: number = 0;
  maxctc: number = 0;
  minexp: number = 0;
  maxexp: number = 0;
  Responce: any = {};
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
  searchsts: number = 1;
  walkinfromdate: any = '';
  walkintodate: any = '';
  FilterJob: FormGroup;
  PageNumber: number = 0;
  companyfilterresult: any = '0';
  constructor(private appConfig: AppConfig
    , private toastrService: ToastrService
    , private walkinService: WalkinPostService
    , private spinnerService: Ng4LoadingSpinnerService
    , private modalService: BsModalService
    , private jobpostService: JobpostService
    , private companyProfileService: CompanyProfileService
    , private masterService: MasterService
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private router: Router
    , private registService: RegistrationService
  ) { this.UserInfo = appConfig.UserInfo }
  walkindetialView: boolean = false;
  viewfalse: any = '1';
  postion: any;
  processing: boolean = false;
  PNumber: number = 0;
  @HostListener('window:scroll', ['$event'])
  // scrollHandler(event) {
  //   let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  //   let max = document.documentElement.scrollHeight;
  //   if (pos >= (0.8 * max)) {
  //     if (this.delay) {
  //       return
  //     }
  //     this.delay = true;
  //     if (this.companyregisterdata.length >= 10 && this.viewfalse == '1') {
  //       this.pageNumber = this.pageNumber + 1;
  //       this.GetFilter(this.pageNumber, 'scroll', 'src');
  //     }
  //     if (this.walkindetail.length >= 10 && this.walkindetialView==true) {
  //             this.pageNumber = this.pageNumber + 1;
  //             this.GetAllWalkins(this.pageNumber, 'scroll');
  //           }
  //   }
  // }

  //pageNumber: number = 0;
  scrollHandler(event) {

    if (this.walkindetialView) {
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return;
        }
        this.delay = true;
        if (this.walkindetail.length >= 10 && this.walkindetialView == true && this.JobNoCount > this.PNumber) {
          this.PNumber = this.PNumber + 1;
          this.GetAllWalkins(this.PNumber, 'scroll');
        }
      }
    }
    if (this.viewfalse) {
      if (this.processing)
        return false;
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return;
        }
        this.delay = true;
        if (this.companyregisterdata.length >= 10 && this.viewfalse == '1') {
          this.pageNumber = this.pageNumber + 1;
          this.processing = true;
          this.GetFilter(this.pageNumber, 'scroll', 'src');
        }
      }
    }

  }
  JobNoCount: any = 0;
  GET_TOTAL_COUNT_Walkin_List() {
    this.JobNoCount = 0;
    var Adminid = parseInt(JSON.parse(localStorage.getItem('phpadminid')));

    var Companyid = this.companyId;
    var Modulename = 'WALKIN';
    var senddata = {
      "Adminid": Adminid,
      "Companyid": Companyid,
      "Modulename": Modulename
    }
    this.walkinService.GET_TOTAL_COUNT_Walkin_List(senddata).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce.lstJobRelatedData != null) {
        var totalReocds = this.DbResponce.lstJobRelatedData[0].totalwalkin;
        this.JobNoCount = Math.ceil(totalReocds);
      }
      else {
        this.JobNoCount = 0;
      }
    });
  }
  redirection: any;
  hrefurl: any = 0;;
  HideCommon: any = 0;
  ngOnInit() {
    this.serverDateTime();
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
      this.HideCommon = 2;
      this.companyId = localStorage.getItem('CompanyId');
      this.FilterJob = this.formBuilder.group({
        'logintype': ['', Validators.required],
        'JobKeyword': ['', Validators.required],
        'StateiD': ['', Validators.required],
        'DistrictID': ['', Validators.required],
        'walkinpostedstatus': ['', Validators.required],
      });
      this.onClicked(this.companyId);
    }
    else {
      this.FilterJob = this.formBuilder.group({
        'logintype': ['', Validators.required],
        'JobKeyword': ['', Validators.required],
        'StateiD': ['', Validators.required],
        'DistrictID': ['', Validators.required],
        'walkinpostedstatus': ['', Validators.required],
      });
      this.GetFilter(this.PageNumber, '', 'init');
      this.HideCommon = 1;
    }
    this.hrefurl = 1;
    window.scroll(0, 0);
    this.walkingFormInit();
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    this.GetAllState();
  }
  GetFilterSearch(pageNumber, isScrol: any, src) {
    this.pageNumber = 0;
    this.GetFilter(pageNumber, isScrol, src);
  }
  states: any = [];
  // GetAllState() {
  //   this.jobpostService.GetAllStates().subscribe(res => {
  //     this.states = res
  //     if (this.states!=null) {
  //       this.states = this.states.Data;
  //     }
  //     else{
  //       this.states=[];
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
  GetAllDistrict(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
      this.FilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if (event != '' || event != null) {
      this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();

    // this.jobpostService.GetAllDistrict(event).subscribe(res => {
    //   this.district1 = res
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
    this.companyfilterresult = '0'
    this.companyfilterresultdata = '0';
    this.companyId = [];
    this.PageNumber = 0;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'walkinpostedstatus': ['', Validators.required]
    });
    this.district1 = [];
    this.GetFilter(this.PageNumber, '', 'init');
  }
  Showpushdata: any = 0;
  item: any = [];
  logintype: any = '';
  StateiD: number = 0;
  DistrictID: any = '';
  JobKeyword: any = '';
  adminId: any;
  ShowPushData: any = {};
  senddatafilter: any = [];
  companyregisterdata: any = [];
  walkinpostedstatus: any = '';
  companyfilterresultdata: any = '0';
  GetFilter(pageNumber, isScrol: any, src) {
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdata = '1';
      this.companyfilterresultdata = '1';
      this.companyfilterresult = '1';
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
    if (this.FilterJob.value.walkinpostedstatus != '' && this.FilterJob.value.walkinpostedstatus != undefined) {
      this.walkinpostedstatus = this.FilterJob.value.walkinpostedstatus;
    }
    else {
      this.walkinpostedstatus = null;
    }
    let statedid;
    let districtid;
    statedid = this.FilterJob.value.StateiD;
    districtid = this.FilterJob.value.DistrictID;
    let statename = (this.states).filter(function (entry) {
      return entry.id == statedid;
    });
    let districtname = (this.district1).filter(function (entry) {
      return entry.id == districtid;
    });
    this.adminId = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    if (this.FilterJob.value.walkinpostedstatus == 'true') {
      var walkinpostedstatus = 'Yes';
    }
    else if (this.FilterJob.value.walkinpostedstatus == 'false') {
      var walkinpostedstatus = 'No';
    }
    else {
      var walkinpostedstatus = 'NA';
    }
    this.companyfilterresultdata = {};
    this.companyfilterresultdata = {
      "logintype": this.FilterJob.value.logintype != '' ? this.FilterJob.value.logintype : 'NA',
      "statename": statename != '' ? statename[0]['stateName'] : 'NA',
      "districtname": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "jobkeyword": this.FilterJob.value.JobKeyword != '' ? this.FilterJob.value.JobKeyword : 'NA',
      "walkinpostedstatus": walkinpostedstatus,
    };
    this.senddatafilter = {
      'Adminid': this.adminId,
      'PageNumber': pageNumber,
      'companyid': 0,
      'isjobpushed': this.walkinpostedstatus,
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
        this.processing = false;
      });
      this.delay = false;
      this.processing = false;
    }
    else {
      this.spinnerService.show();
      this.walkinService.GetFilterCompanyDataforwalkin(this.senddatafilter).subscribe(res => {
        this.companyregisterdata = res;
        this.companyregisterdata123 = this.companyregisterdata.lstCompanyDetails;
        if (this.companyregisterdata123.length > 0) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.lstCompanyDetails;
        } else {
          this.companyregisterdata = [];
          this.toastrService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
        this.from = '';
      });
      this.delay = false;
      this.processing = false;
    }
    this.from = '';
    this.delay = false;
    this.processing = false;
  }
  companyregisterdata123: any = [];
  companyId: any;
  walklistshow: any = '0'
  onClicked(companyid: string) {
    this.pageNumber = 0;
    this.viewfalse = '0';
    this.walkindetialView = true;
    localStorage.setItem('CompanyId', companyid);
    this.HideCommon = 2;
    if (companyid != '') {
      this.searchsts = 0;
      this.walklistshow = '1';
      this.companyId = companyid;
      this.GetAllWalkins(0, '');
      this.wlakinListStatus = true;
    }
  }
  onbackregist() {
    this.walklistshow = '0';
    this.wlakinListStatus = false;
  }
  goToCommon() {
    this.viewfalse = '1';
    this.pageNumber = 0;
    this.walkindetialView = false;
    this.HideCommon = 1;
    this.walklistshow = 0;
    this.searchsts = 0;
    this.wlakinListStatus = false;
    this.walkindetail = [];
    localStorage.removeItem('CompanyId');
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'walkinpostedstatus': ['', Validators.required]
    });
    this.GetFilter(this.pageNumber, '', 'init');
  }
  postWalkin(id: any, item: any) {
    this.closeWalkins = '';
    this.scrapWalkins = '';
    this.PublishJob(id, item);
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
      walkInToDate: ['', Validators.nullValidator],
      walkinvalid: ['', Validators.nullValidator],
      walkinstatus: ['', Validators.nullValidator],
      walkinsearch: ['', Validators.nullValidator]
    })
  }
  GetAllIndustryArea() {
    this.masterService.GetAllIndustryArea().subscribe(res => {
      this.Responce = res;
      if (this.Responce != null) {
        this.IndustryArea = this.Responce;
        for (var i = 0; i < this.IndustryArea.length; i++) {
          if (this.IndustryArea[i].id == this.searchWalkins.IndustryAreaId) {
            this.IndustryAreaSelected = this.IndustryArea[i].industryName;
            this.IndustryAreaSelecteds = this.IndustryArea[i].industryName;
          }
        }
      }
      else {
        this.Responce = [];
      }
    });
  }
  GetAllFunctionArea() {
    this.masterService.GetAllFunctionArea().subscribe(res => {
      this.Responce = res;
      if (this.Responce != null) {
        this.FunctionArea = this.Responce;
        for (var i = 0; i < this.FunctionArea.length; i++) {
          if (this.FunctionArea[i].id == this.searchWalkins.FunctionAreaId) {
            this.FunctionAreaSelected = this.FunctionArea[i].functionalAreaName;
            this.FunctionAreaSelecteds = this.FunctionArea[i].functionalAreaName;
          }
        }
      }
      else {
        this.Responce = [];
      }
    });
  }
  setId(item) {
    localStorage.setItem('isJobPushed', item.isJobPushed);
    localStorage.setItem('walkInId', item.walkInId);
    localStorage.setItem('isScrap', item.isScrap);
    localStorage.setItem('isClosed', item.isClosed);
    localStorage.setItem('CompanyId', this.companyId);
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.AdminId = adminid;
    let passData = {
      'AdminId': this.AdminId,
      'CompanyId': this.companyId,
      'walkInDate': item.walkInDate,
      'walkinToDate': item.walkinToDate,
      'keyword': item.keyword,
      'maxExp': item.maxExp,
      'minExp': item.minExp,
      'jobTitle': item.jobTitle,
      'companyName': item.companyName,
      'jobDescription': item.jobDescription,
      'walkinFromTime': item.walkinFromTime,
      'walkinToTime': item.walkinToTime,
      'email': item.email,
      'mobile': item.mobile,
      'venueDetail': item.venueDetail
    };
    localStorage.setItem('passData', JSON.stringify(passData));
  }
  modalRef: BsModalRef;
  AlertBox(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  RevokeTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  declineBox(): void {
    this.modalRef.hide();
  }
  scrapTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  scrapWalkinTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  repostWalkin(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  repost: any;
  RepostwalkinJob(id: any, item: any, repo: any) {
    var activeStatus = item.activeStatus;
    if (activeStatus == false) {
      this.toastrService.error('Active user to Repost the Walk-in');
      this.modalRef.hide();
      return false;
    }
    var verifyStatus = item.verifyStatus;
    if (verifyStatus == false) {
      this.toastrService.error('Approve user to Repost the Walk-in');
      this.modalRef.hide();
      return false;
    }
    //  ***************Date Restriction code(Rajeev Jha)*********************
    //var walkinToDatecheck=item.walkinToDate.toString().slice(0,10).trim();
    var walkinToDatecheck = item.walkinToDate;
    var Gettodaydate = this.gettodaydate;
    if (walkinToDatecheck <= Gettodaydate) {
      this.toastrService.error('Invalid Walk-in To Date');
      this.modalRef.hide();
      return false;
    }
    this.repost = repo;
    this.walkinId = id;
    this.spinnerService.show();
    this.walkinService.PublishJob(this.walkinId, this.UserId, this.AdminId).subscribe(res => {
      this.spinnerService.hide();
      this.DBResponce1 = res;
      if (this.DBResponce1.responseResult) {
        this.modalRef.hide();
        if (this.repost != "repost" && this.scrapWalkins != "scrapWalk" && this.closeWalkins != "closeWalk") {
          this.jobpostToYs(this.DBResponce1.id);
          this.toastrService.success('Walk-in Posted Successfully');
        } else if (this.repost == "repost") {
          this.jobpostToYs(this.DBResponce1.id);
          this.toastrService.success('Walk-in Re-Posted Successfully');
        } else if (this.scrapWalkins != "scrap" || this.closeWalkins != "close") {
          this.jobpostToYs(this.DBResponce1.id);
        }
        this.GetAllWalkins(0, '');
      } else {
        this.toastrService.error(this.DBResponce1.message);
      }
    });
  }
  //  ***********Code to get server date and time (Rajeev Jha)**************
  gettodaydate: any = [];
  comparegettodaydate: any;
  serverDate: any;
  serverDateTime() {
    this.masterService.GetServerDateTime().subscribe(res => {
      if (res) {
        this.serverDate = res;
        this.gettodaydate = this.serverDate.toString().slice(0, 10).trim();
        this.comparegettodaydate = this.gettodaydate + 'T00:00:00+00:00';
      } else {
        this.gettodaydate = [];
      }
    })
  }
  //Walkin Scrap
  scrapWalkins: any
  scrapWalkin(id: any, item: any, scrap: any) {
    this.scrapWalkins = scrap;
    this.walkinId = id;
    this.spinnerService.show();
    this.walkinService.scrapWalkin(id, this.UserId, this.AdminId).subscribe(res => {
      this.spinnerService.hide();
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.modalRef.hide();
        this.toastrService.success('Walk-in Scraped Successfully');
        this.RepostwalkinJob(this.walkinId, '', this.scrapWalkins);
        // this.GetAllWalkins(this.pageNumber, this.from);
      }
    });
  }
  walkinId: any;
  closeWalkins: any;
  // Walkin Close
  closeWalkin(id: any, item, close: any) {
    this.walkinId = id;
    this.closeWalkins = close;
    this.walkinService.closeWalkin(this.AdminId, this.walkinId, this.UserId).subscribe(res => {
      this.DbResponce = res
      if (this.DbResponce != null) {
        this.modalRef.hide();
        this.toastrService.success('Walk-in Closed Successfully');
        this.RepostwalkinJob(this.walkinId, '', this.closeWalkins);
        // this.GetAllWalkins(this.pageNumber, this.from);
      }
    });
  }
  // Walkin Post
  DBResponce1: any;
  companresponsedb: any = [];
  PublishJob(id: any, item: any) {
    var activeStatus = item.activeStatus;
    if (activeStatus == false) {
      this.toastrService.error('Active user to Post the Walk-in');
      this.modalRef.hide();
      return false;
    }
    var verifyStatus = item.verifyStatus;
    if (verifyStatus == false) {
      this.toastrService.error('Approve user to Post the Walk-in');
      this.modalRef.hide();
      return false;
    }
    //  ************Date Restriction code(Rajeev Jha)************
    var walkinToDatecheck = item.walkinToDate.toString().slice(0, 10).trim();
    var Gettodaydate = this.gettodaydate;
    if (walkinToDatecheck <= Gettodaydate) {
      this.toastrService.error('Invalid Walk-in To Date');
      this.modalRef.hide();
      return false;
    }
    var minCtc = item.minCtc;
    var shiftTime = item.shiftTime;
    if (shiftTime != 'Freelancer' && minCtc == 0.00) {
      this.toastrService.error("Min and Max ctc must be greater than or equal to 5000 to post this walk-in");
      this.modalRef.hide();
      return false;
    }
    this.spinnerService.show();
    this.walkinService.PublishJob(id, this.UserId, this.AdminId).subscribe(res => {
      this.DBResponce1 = res;
      this.spinnerService.hide();
      if (this.DBResponce1.responseResult) {
        this.modalRef.hide();
        this.jobpostToYs(this.DBResponce1.id);
        this.toastrService.success('Walk-in Posted Successfully');
      } else {
        this.toastrService.error(this.DBResponce1.message);
      }
      this.GetAllWalkins(0, '');
    });
  }
  openingResponse: any;
  htmlOpeningDetails: any;
  DBResponce: any;
  //Walkin Post to YS
  jobpostToYs(jobId: any) {
    this.walkinService.getJobHtml(jobId).subscribe(res => {
      this.openingResponse = res;
      this.spinnerService.hide();
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
  walkinstatus: any;
  walkinvalid: any;
  walkinsearch: any;
  pageno: any = '';
  from1: any = '';
  postdata: any = {};
  GetFilterWalkins() {
    this.searchWalkins = [];
    this.walkindetail = [];
    this.pageNumber = 0;
    this.from = '';
    this.searchsts = 1;
    this.wlakinListStatus = true;
    if (this.WalkingFilterForm.value.industry != '' && this.WalkingFilterForm.value.industry != null && this.WalkingFilterForm.value.industry != undefined) {
      this.industry = parseInt(this.WalkingFilterForm.value.industry);
    } else {
      this.industry = 0;
    }
    if (this.WalkingFilterForm.value.functionalarea != '' && this.WalkingFilterForm.value.functionalarea != null && this.WalkingFilterForm.value.functionalarea != undefined) {
      this.functionalarea = parseInt(this.WalkingFilterForm.value.functionalarea);
    } else {
      this.functionalarea = 0;
    }
    if (this.WalkingFilterForm.value.walkInFromDate != '' && this.WalkingFilterForm.value.walkInFromDate != null && this.WalkingFilterForm.value.walkInFromDate != undefined) {
      this.searchwalkinfromdate = this.WalkingFilterForm.value.walkInFromDate;
      this.searchwalkinfromdate = new Date(this.searchwalkinfromdate);
    } else {
      this.searchwalkinfromdate = ' ';
    }
    if (this.WalkingFilterForm.value.walkInToDate != '' && this.WalkingFilterForm.value.walkInToDate != null && this.WalkingFilterForm.value.walkInToDate != undefined) {
      this.searchwalkintodate = this.WalkingFilterForm.value.walkInToDate;
    } else {
      this.searchwalkintodate = ' ';
    }
    if (this.searchwalkinfromdate != '' && this.searchwalkintodate != '') {
      if (this.searchwalkinfromdate > this.searchwalkintodate) {
        this.toastrService.error('Please Select Valid Date');
        this.searchsts = 0;
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
    if (this.WalkingFilterForm.value.walkinstatus == "Pending") {
      this.walkinstatus = "Pending";
    }
    else if (this.WalkingFilterForm.value.walkinstatus == "Posted") {
      this.walkinstatus = "Posted";
    }
    else if (this.WalkingFilterForm.value.walkinstatus == "Scraped") {
      this.walkinstatus = "Scraped";
    }
    else if (this.WalkingFilterForm.value.walkinstatus == "Closed") {
      this.walkinstatus = "Closed";
    }
    else {
      this.walkinstatus = null;
    }
    if (this.WalkingFilterForm.value.walkinvalid == "Yes") {
      this.walkinvalid = 1;
    }
    else if (this.WalkingFilterForm.value.walkinvalid == "No") {
      this.walkinvalid = 0;
    }
    else {
      this.walkinvalid = null;
    }
    if (this.WalkingFilterForm.value.walkinsearch != '' && this.WalkingFilterForm.value.walkinsearch != null) {
      this.walkinsearch = this.WalkingFilterForm.value.walkinsearch;
    } else {
      this.walkinsearch = "";
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
    var walkinvalid1 = this.walkinvalid;
    if (walkinvalid1 == 1) {
      var walkinvalid2 = 'Yes';
    }
    else if (walkinvalid1 == 0) {
      var walkinvalid2 = 'No';
    }
    else {
      var walkinvalid2 = 'NA';
    }
    this.searchWalkins = {
      "FunctionAreaId": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "IndustryAreaId": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "minExp": this.minExp > 0 ? this.minExp : 'NA',
      "maxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "minCtc": this.minCtc > 0 ? this.minCtc : 'NA',
      "maxCtc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA',
      "walkinvalid": walkinvalid2,
      "walkinStatus": this.walkinstatus != null ? this.walkinstatus : 'NA',
      "searchKey": this.walkinsearch != '' ? this.walkinsearch : 'NA'
    };
    localStorage.setItem('searchWalkins', JSON.stringify(this.searchWalkins));
    this.GetAllWalkins(0, '');
  }
  AdminId: any;
  phpadminid: any;
  UserId: any = 0;
  GetAllWalkins(PNumber: any, from: any) {
    this.PNumber = PNumber,
      // this.walkindetail = [];
      this.spinnerService.show();
    this.GET_TOTAL_COUNT_Walkin_List();
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.AdminId = adminid;
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
        "WalkInDate": this.walkinfromdate != '' ? this.walkinfromdate : '2019-01-22T00:30:37.000Z',
        "WalkinToDate": this.walkintodate ? this.walkintodate : '2019-01-22T00:30:37.000Z',
        'PageNumber': this.PNumber,
        "searchKey": "",
        "walkinActive": null,
        "walkinStatus": null
      };
      localStorage.setItem('postData', JSON.stringify(postData))
      this.walkinService.GetFilterData(postData).subscribe(res => {
        this.spinnerService.hide();
        this.dbresponse = res;
        if (this.dbresponse != null) {
          this.walkindetail = this.walkindetail.concat(this.dbresponse.lstCandidateWalkInt);
          if (this.walkindetail.length > 0) {
            this.UserId = this.walkindetail[0].userID;
          }
        }
        this.delay = false;
      });
    }
    else {
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
        'PageNumber': this.PNumber,
        "WalkInDate": this.walkinfromdate != '' ? this.walkinfromdate : '2019-01-22T00:30:37.000Z',
        "WalkinToDate": this.walkintodate ? this.walkintodate : '2019-01-22T00:30:37.000Z',
        "searchKey": this.walkinsearch,
        "walkinActive": this.walkinvalid,
        "walkinStatus": this.walkinstatus
      };
      localStorage.removeItem('postData');
      localStorage.setItem('postData', JSON.stringify(postData));
      this.walkinService.GetFilterData(postData).subscribe(res => {
        this.spinnerService.hide();
        this.dbresponse = res;
        if (this.dbresponse.lstCandidateWalkInt != null && this.dbresponse.lstCandidateWalkInt.length != []) {
          this.walkindetail = this.dbresponse.lstCandidateWalkInt;
          // this.from = '';
          if (this.walkindetail.length > 0) {
            this.UserId = this.walkindetail[0].userID;
          }
        }
        else {
          this.walkindetail = [];
          // this.from = '';
          this.toastrService.error('No Record Found')
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }
  reset() {
    this.walkindetail = [];
    this.minExp = 0;
    this.maxExp = 0;
    this.minCtc = 0;
    this.maxCtc = 0;
    this.industry = 0;
    this.functionalarea = 0;
    this.WalkingFilterForm.reset();
    this.onClicked(this.companyId);
  }
}
