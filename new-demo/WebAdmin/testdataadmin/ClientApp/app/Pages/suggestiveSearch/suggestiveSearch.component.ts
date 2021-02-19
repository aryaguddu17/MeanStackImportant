import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuggestiveSearchService } from '../../Services/suggestiveSearch.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MasterService } from '../../Services/master.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Options } from 'ng5-slider';
import { ToastrService } from 'ngx-toastr';
// import 'rxjs/add/operator/debounceTime';
  
@Component({
  selector: 'app-suggestiveSearch',
  templateUrl: './suggestiveSearch.component.html',
  // styleUrls: ['./suggestiveSearch.component.css']
})
export class SuggestiveSearchComponent implements OnInit {
  companyregisterdata: any = [];
  DbResponce: any = [];
  Showpushdata: any = [];
  statename: any;
  districtname: any;
  Response: any;
  CompanyRegistration: FormGroup;
  item: any = [];
  listing: any = '0';
  searchsts: any = '0';
  filtering: any = '1';
  pageNumber: number = 0;
  senddatafilter: any = [];
  ShowPushData: any = {};
  RegistrationView: any = '1';
  Registrationbk: any = '1';
  states: any = [];
  district1: any = [];
  from: any;
  jobdetail: any = [];
  PageNumber: number = 0;
  FilterJobList: FormGroup;
  AreaResponce: any = {};
  minCtc: number = 0;
  maxCtc: number = 0;
  minExp: number = 0;
  maxExp: number = 0;
  industry: number = 0;
  functionalarea: number = 0;
  minctc: number = 0;
  maxctc: number = 0;
  minexp: number = 0;
  maxexp: number = 0;
  PushData: any = {};
  PiaSearch: any = {};
  ShowJobList: any = 0;
  IndustryArea: any = [];
  Industry: any = [];
  searchwalkinfromdate: any = '';
  searchwalkintodate: any = '';
  DBResponce: any = {};
  joblistshow: any = '0';
  companyId: any;
  gohome: number = 0;
  goback: number = 0;
  searchsts1: number = 0;
  pialist: number = 0;
  SectorForm: FormGroup;
  ShwoCardsStatus = false;
  showTC = false;


  ComapanyFilterJob: FormGroup;


  CtcOptions: Options = {
    floor: 0,
    ceil: 250000,
    step: 1
  };

  ExpOptions: Options = {
    floor: 0,
    ceil: 20,
    step: 1
  };

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private masterService: MasterService,
    private SuggestiveSearchService: SuggestiveSearchService,
    private toasterService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  postion: any;
  delay: boolean = false;
  pagelength: any = 1;
  scrollcompany: any = '1';
  scrollpia: any = '0';
  scrollpiasearch: boolean = false;
  scrolljob: boolean = false;
  scrollTC: any = 0;

  HideCommon: any = 1;
  onClicked(companyid: string) {
    this.HideCommon = 2;
    this.CompanyView = false;
    this.scrolljob = true;
    this.companyId = companyid;
    if (companyid != '') {
      this.jobdetail = [];
      this.viewjobs(this.companyId);
    }
  }

  goToCommon() {
    this.CompanyView = true;
    this.scrolljob = false;
    this.PageNumber = 0;
    this.HideCommon = 1;
    this.searchsts1 = 0;
    this.joblistshow = 0;
    if (this.src == 'search') {
      this.hrefurl = 1;
    } else {
      this.hrefurl = 0;
    }
    this.ShowJobList = 0;
    window.scroll(0, 0);
    this.Showpushdata = false;
    this.jobdetail = [];
    this.minCtc = 0;
    this.maxCtc = 0;
    this.minExp = 0;
    this.maxExp = 0;
    this.FilterJobList.reset();
    this.FilterJobList.controls['industry'].setValue('');
    this.FilterJobList.controls['functionalarea'].setValue('');
    this.router.navigate(['/suggestivesearch']);
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler($event) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      if (this.CompanyView)  ////////////// company view //////////////
      {
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos >= (0.8 * max)) {
          if (this.delay) {
            return;
          }
          this.delay = true;
          if (this.companyregisterdata.length >= 10 && this.CompanyView == true) {
            this.CompanyPageNumber = this.CompanyPageNumber + 1;
            this.GetFilterCompany(this.CompanyPageNumber, 'scroll', this.src);
          }
        }
      }
      if (this.scrolljob) {
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos >= (0.8 * max)) {
          if (this.delay) {
            return
          }
          this.delay = true;
          if (this.jobdetail.length >= 10 && this.scrolljob == true) {
            this.pageNumber = this.pageNumber + 1;
            this.GetFilterJobsList(this.pageNumber, 'scroll');
          }
        }
      }
    }
    if (this.scrollpiasearch) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.GetData.length >= 10 && this.scrollpiasearch == true) {
          this.pageNumber = this.pageNumber + 1;
          this.getPiaData(this.pageNumber, 'scroll');
        }
      }
    }
  }

  ngOnInit() {
    localStorage.removeItem('compid');
    this.item = localStorage.getItem('phpadminid');
    var data = {
      'logintype': '',
      'JobKeyword': '',
      'StateiD': '',
      'DistrictID': '',
      'Adminid': this.item,
    };
    var pageno = 0;
    this.CompanyRegistration = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
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
    })
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    this.GetAllState();
    this.SectorForm = this.formBuilder.group({
      industry: ['', Validators.nullValidator],
      functionalarea: ['', Validators.nullValidator],
      StateiD: ['', [Validators.nullValidator,]],
      DistrictID: ['', [Validators.nullValidator,]],
      SectorID: ['', Validators.nullValidator,],
      TradeID: ['', [Validators.nullValidator,]],
    });

    this.ComapanyFilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    this.GetFilterCompany(this.CompanyPageNumber, '', 'init');
    this.GetAllState();
  }
  Comapanyreset() {
    this.ComapanyFilterJob.reset();
    this.CompanyPageNumber = 0;
    this.GetFilterCompany(this.CompanyPageNumber, '', 'init');

  }





  Showpushdatacompany: any = '0';
  logintype: number = 0;
  // StateiD: number = 0;
  // DistrictID: any = '';
  SenddatafilterComapny: any = [];
  CompanyPageNumber: number = 0;
  CompanyView: boolean = true;
  hrefurl: any = '0';
  CompanyList: any = '0'
  JobPosType: any;
  JobKeyword: any = '';

  src: any = '';
  ShowCompanyFilter: any = '1';
  GetFilterCompany(CompanyPageNumber, from: any, src: any) {
    this.src = src;
    this.CompanyPageNumber = CompanyPageNumber;
    // localStorage.removeItem('this.companyregisterdata');
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
      return entry.ID == statedid;
    });

    var districtname = (this.district1).filter(function (entry) {
      return entry.ID == districtid;
    });
    this.JobPosType = null;
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.Showpushdatacompany = {};
    this.Showpushdatacompany = {
      "logintype": this.ComapanyFilterJob.value.logintype != 'undefined' && this.ComapanyFilterJob.value.logintype != '' && this.ComapanyFilterJob.value.logintype != null ? this.ComapanyFilterJob.value.logintype : 'NA',
      "StateiD": statename != 'undefined' && statename != '' && statename != null ? statename[0]['STATENAME'] : 'NA',
      "Districtid": districtname != 'undefined' && districtname != '' && districtname != null ? districtname[0]['DISTRICTNAME'] : 'NA',
      "JobKeyword": this.ComapanyFilterJob.value.JobKeyword != 'undefined' && this.ComapanyFilterJob.value.JobKeyword != '' && this.ComapanyFilterJob.value.JobKeyword != null ? this.ComapanyFilterJob.value.JobKeyword : 'NA'

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
      this.SuggestiveSearchService.GetFilterCompanyData(this.SenddatafilterComapny)
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

        });
    }
    else {
      this.spinnerService.show();
      this.SuggestiveSearchService.GetFilterCompanyData(this.SenddatafilterComapny)
        .debounceTime(5000) // wait 300ms after the last event before emitting last event
        .distinctUntilChanged()
        .subscribe(res => {
          this.companyregisterdata = res;
          if (this.companyregisterdata != null) {
            this.companyregisterdata = this.companyregisterdata.lstCompanyDetails;
          } else {
          }
          this.spinnerService.hide();
          this.delay = false;
          this.from = '';

        });
    }
    this.from = '';
  }

  Logintype: any;
  Jobkeyword: any;
  GetAllState() {
    this.SuggestiveSearchService.GetAllStates().subscribe(res => {
      this.states = res
      if (this.states != null) {
        this.states = this.states.Data;
      }
      else {
        this.states = [];
      }
    });
  }

  GetAllDistrict(event: any) {
    this.SuggestiveSearchService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res
      if (this.district1 != null) {
        this.district1 = this.district1.Data;
      }
      else {
        this.district1 = [];
      }
    });
  }

  viewjobs(companyid: any) {
    this.scrollcompany = 0;
    this.pageNumber = 0;
    if (companyid != '') {
      this.jobdetail = [];
      this.companyId = companyid;
      this.GetFilterJobsList(this.pageNumber, this.from);
      this.Showpushdata = true;
      this.joblistshow = '1';
      this.filtering = 0;
      this.listing = 0;
      this.goback = 1;
      this.searchsts = 0;
      this.searchsts1 = 0;
      // this.ShowJobList=1;
      // this.show='1';
    }
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

  adminId: any;
  GetFilterJobsList(page, from) {
    this.scrolljob = true;
    this.ShowJobList = 0;
    this.pageNumber = page;
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
    if (this.FilterJobList.value.walkInFromDate != '' && this.FilterJobList.value.walkInFromDate != undefined) {
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
        this.toasterService.error('Please Select Valid Date');
        this.searchsts = 0;
        this.toasterService.clear();
        // $('.filter-wrapper').slideToggle();
        return false;
      }
    }
    if (this.FilterJobList.value.MinCtc != '') {
      this.minctc = this.FilterJobList.value.MinCtc;
    } else {
      this.minctc = 0;
    }
    // console.log(this.FilterJobList.value.MaxCtc)
    if (this.FilterJobList.value.MaxCtc != '') {
      this.maxctc = this.FilterJobList.value.MaxCtc;
    } else {
      this.maxctc = 0;
    }
    if (this.FilterJobList.value.MinExp != '') {
      this.minexp = this.FilterJobList.value.MinExp;
    } else {
      this.minexp = 0;
    }
    if (this.FilterJobList.value.MaxExp != '') {
      this.maxexp = this.FilterJobList.value.MaxExp;
    } else {
      this.maxexp = 0;
    }
    if (this.FilterJobList.value.JobKeyword != '' && this.FilterJobList.value.JobKeyword != null) {
      this.Jobkeyword = this.FilterJobList.value.JobKeyword;
    } else {
      this.Jobkeyword = '';
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
    // Show Selected Data
    this.ShowPushData = {};

    this.ShowPushData = {
      "industry": IndustryName != '' ? IndustryName[0]['industryName'] : 'NA',
      "functionalarea": FunctionalAreaname != '' ? FunctionalAreaname[0]['functionalAreaName'] : 'NA',
      "Maxctc": this.maxCtc > 0 ? this.maxCtc : 'NA',
      "Minctc": this.minCtc > 0 ? this.minCtc : 'NA',
      "MaxExp": this.maxExp > 0 ? this.maxExp : 'NA',
      "MinExp": this.minExp > 0 ? this.minExp : 'NA',
      "JobKeyword": this.Jobkeyword != '' ? this.Jobkeyword : 'NA',
      "searchwalkinfromdate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : 'NA',
      "searchwalkintodate": this.searchwalkintodate != '' ? this.searchwalkintodate : 'NA'
    };
    // localStorage.setItem('PushData', JSON.stringify(this.ShowPushData));
    //this.spinnerService.hide();
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
        'PageNumber': this.pageNumber,
        'JobId': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'UserID': 0,
        'JobKeyword': this.Jobkeyword,
        "JobInDate": this.FilterJobList.value.walkInFromDate != '' && this.FilterJobList.value.walkInFromDate != null ? this.FilterJobList.value.walkInFromDate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.FilterJobList.value.walkInToDate != '' && this.FilterJobList.value.walkInToDate != null ? this.FilterJobList.value.walkInToDate : '2030-01-22T00:30:37.000Z',
      };
      // localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.SuggestiveSearchService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce.lstJobRequest != null) {
          this.jobdetail = this.jobdetail.concat(this.DbResponce.lstJobRequest);
        } else {
          // this.jobdetail = [];
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
        'PageNumber': 0,
        'JobId': 0,
        'UserID': 0,
        'CompanyId': this.companyId,
        'AdminId': this.adminId,
        'JobKeyword': this.Jobkeyword,
        "JobInDate": this.searchwalkinfromdate != '' ? this.searchwalkinfromdate : '2018-01-22T00:30:37.000Z',
        "JobToDate": this.searchwalkintodate != '' ? this.searchwalkintodate : '2030-01-22T00:30:37.000Z',
      };
      // localStorage.setItem('IsSend', JSON.stringify(this.PushData));
      this.spinnerService.show();
      this.SuggestiveSearchService.GetAllJobs(this.PushData).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponce = res;
        if (this.DbResponce.lstJobRequest != null) {
          this.jobdetail = this.DbResponce.lstJobRequest;
        } else {
        }
        this.delay = false;
      });
    }
    this.Showpushdata = true;
    this.searchsts = 1;
    this.gohome = 1;
    this.ShowJobList = 1;
    this.searchsts1 = 1;
    this.pialist = 0;
  }

  goHome() {
    this.ShowJobList = 0;
    this.pageNumber = 0;
    this.joblistshow = 0;
    this.gohome = 0;
    this.searchsts1 = 0;
    this.scrolljob = false;
    this.pialist = 0;
    window.scroll(0, 0);
  }

  goBack() {
    this.HideCommon = 2;
    this.ShwoCardsStatus = false;
    this.pialist = 0;
    this.ShowJobList = 1;
    this.joblistshow = 1;
    this.searchsts1 = 1;
    this.scrolljob = true;
    this.pageNumber = 0;
    this.searchsts2 = 0
    this.scrollpiasearch = false;
    var backdata = this.ShowPushData;
    if (backdata.industry == 'NA') {
      this.FilterJobList.controls['industry'].setValue('');
    }
    if (backdata.functionalarea == 'NA') {
      this.FilterJobList.controls['functionalarea'].setValue('');
    }
    this.SectorForm.controls.StateiD.setValue('');
    this.SectorForm.controls.DistrictID.setValue('');
    this.SectorForm.controls.SectorID.setValue('');
    this.SectorForm.controls.TradeID.setValue('');
  }

  goPrevious() {
    this.ShwoCardsStatus = true;
    this.showTC = false;
    this.searchsts = 1;
    this.pialist = 1;
  }

  viewPia(item) {
    this.HideCommon = 0;
    // this.SectorForm.controls['industry'].setValue('');
    this.SectorForm.controls['StateiD'].setValue('');
    this.SectorForm.controls['DistrictID'].setValue('');
    // this.SectorForm.controls['SectorID'].setValue(item.industryAreaId);
    // this.SectorForm.controls['TradeID'].setValue(item.industryAreaId);
    // this.SectorForm.controls['functionalarea'].setValue('');
    this.pialist = 1;
    this.ShowJobList = 0;
    this.filtering = 0;
    this.joblistshow = 0;
    this.searchsts1 = 0;
    this.scrolljob = false;
    this.GetAllSector();
    this.getPiaDataReset(0, '');
  }

  Sector: any = [];
  GetAllSector() {
    try {
      this.masterService.GetAllMrigsSector(0).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce.lstSector != null) {
          this.Sector = this.DBResponce.lstSector;
        }
        else {
          this.Sector = [];
        }
      });
    } catch  { }
  }

  Trade: any = [];
  Getalltrade(trade: any) {
    try {
      this.masterService.GetAllMrigsTrade(0, trade).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce.lstTrade != null) {
          this.Trade = this.DBResponce.lstTrade;
        }
        else {
          this.Trade = [];
        }
      });
    } catch  { }
  }

  StateiD: any;
  DistrictID: any;
  SectorID: any;
  TradeID: any;
  GetData: any = [];
  searchsts2: any = 0;
  getPiaData(Pageno, from) {
    this.showTC = false;
    this.searchsts2 = 1;
    this.scrollpiasearch = true;
    this.ShwoCardsStatus = true;
    this.pageNumber = Pageno;
    let industry;
    let functionalarea;
    let StateiD;
    let DistrictID;
    let SectorID;
    let TradeID;
    if (this.SectorForm.value.industry != '') {
      industry = this.SectorForm.value.industry;
    } else {
      industry = 0;
    }
    if (this.SectorForm.value.functionalarea != '') {
      functionalarea = this.SectorForm.value.functionalarea;
    } else {
      functionalarea = 0;
    }
    if (this.SectorForm.value.StateiD != '') {
      StateiD = this.SectorForm.value.StateiD;
    } else {
      StateiD = 0;
    }
    if (this.SectorForm.value.DistrictID != '') {
      DistrictID = this.SectorForm.value.DistrictID;
    } else {
      DistrictID = 0;
    }
    if (this.SectorForm.value.SectorID != '') {
      SectorID = this.SectorForm.value.SectorID;
    } else {
      SectorID = 0;
    }
    if (this.SectorForm.value.TradeID != '') {
      TradeID = this.SectorForm.value.TradeID;
    } else {
      TradeID = 0;
    }

    // Value set On Search result
    if (StateiD != '' && StateiD != null) {
      this.statename = (this.states).filter(function (entry) {
        return entry.ID == StateiD;
      });
      this.statename = this.statename[0].STATENAME;
    }
    else {
      this.statename = '';
    }
    if (DistrictID != '' && DistrictID != null && StateiD != '' && StateiD != null) {
      this.districtname = (this.district1).filter(function (entry) {
        return entry.ID == DistrictID;
      });
      this.districtname = this.districtname[0].DISTRICTNAME;
    }
    else {
      this.districtname = '';
    }
    let IndustryName;
    if (industry != '' && industry != null) {
      IndustryName = (this.IndustryArea).filter(function (entry) {
        return entry.id == industry
      });
      IndustryName = IndustryName[0]['industryName'];
    }
    else {
      IndustryName = '';
    }
    let FunctionalAreaname;
    if (functionalarea != '' && functionalarea != null) {
      FunctionalAreaname = (this.FunctionArea).filter(function (entry) {
        return entry.id == functionalarea
      });
      FunctionalAreaname = FunctionalAreaname[0]['functionalAreaName'];
    }
    else {
      FunctionalAreaname = '';
    }
    let sector;
    if (SectorID != '' && SectorID != null) {
      sector = (this.Sector).filter(function (entry) {
        return entry.ID == SectorID;
      });
      sector = this.Sector[0].name;
    }
    else {
      sector = '';
    }
    let trade;
    if (TradeID != '' && TradeID != null) {
      trade = (this.Trade).filter(function (entry) {
        return entry.ID == TradeID;
      });
      trade = this.Trade[0].name;
    }
    else {
      trade = '';
    }

    this.PiaSearch = {
      "industry": IndustryName != '' ? IndustryName : 'NA',
      "functionalarea": FunctionalAreaname != '' ? FunctionalAreaname : 'NA',
      'StateiD': this.statename != '' ? this.statename : 'NA',
      'DistrictID': this.districtname != '' ? this.districtname : 'NA',
      'SectorID': sector != '' ? sector : 'NA',
      'TradeID': trade != '' ? trade : 'NA',
    };
    if (from == 'scroll') {
      this.spinnerService.show();
      this.SuggestiveSearchService.GetFilterPia(StateiD, DistrictID, SectorID, TradeID, this.pageNumber).subscribe(res => {
        this.spinnerService.hide();
        this.DBResponce = res;
        // this.GetData = this.GetData.lstTC;
        if (this.DBResponce.lstTC != null) {
          this.GetData = this.GetData.concat(this.DBResponce.lstTC);
        } else {
          // this.GetData = [];
        }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.SuggestiveSearchService.GetFilterPia(StateiD, DistrictID, SectorID, TradeID, this.pageNumber).subscribe(res => {
        this.spinnerService.hide();
        this.DBResponce = res;
        if (this.DBResponce.lstTC != null) {
          this.GetData = this.DBResponce.lstTC;
        } else {
          // this.GetData = [];
        }
        this.delay = false;
      });
    }
  }


  getPiaDataReset(Pageno, from) {
    this.showTC = false;
    // this.searchsts2 = 1;
    this.scrollpia = 1;
    this.ShwoCardsStatus = true;
    this.pageNumber = Pageno;
    let industry;
    let functionalarea;
    let StateiD;
    let DistrictID;
    let SectorID;
    let TradeID;
    if (this.SectorForm.value.industry != '') {
      industry = this.SectorForm.value.industry;
    } else {
      industry = 0;
    }
    if (this.SectorForm.value.functionalarea != '') {
      functionalarea = this.SectorForm.value.functionalarea;
    } else {
      functionalarea = 0;
    }
    if (this.SectorForm.value.StateiD != '') {
      StateiD = this.SectorForm.value.StateiD;
    } else {
      StateiD = 0;
    }
    if (this.SectorForm.value.DistrictID != '') {
      DistrictID = this.SectorForm.value.DistrictID;
    } else {
      DistrictID = 0;
    }
    if (this.SectorForm.value.SectorID != '') {
      SectorID = this.SectorForm.value.SectorID;
    } else {
      SectorID = 0;
    }
    if (this.SectorForm.value.TradeID != '') {
      TradeID = this.SectorForm.value.TradeID;
    } else {
      TradeID = 0;
    }

    // Value set On Search result
    if (StateiD != '' && StateiD != null) {
      this.statename = (this.states).filter(function (entry) {
        return entry.ID == StateiD;
      });
      this.statename = this.statename[0].STATENAME;
    }
    else {
      this.statename = '';
    }
    if (DistrictID != '' && DistrictID != null && StateiD != '' && StateiD != null) {
      this.districtname = (this.district1).filter(function (entry) {
        return entry.ID == DistrictID;
      });
      this.districtname = this.districtname[0].DISTRICTNAME;
    }
    else {
      this.districtname = '';
    }
    let IndustryName;
    if (industry != '' && industry != null) {
      IndustryName = (this.IndustryArea).filter(function (entry) {
        return entry.id == industry
      });
      IndustryName = IndustryName[0]['industryName'];
    }
    else {
      IndustryName = '';
    }
    let FunctionalAreaname;
    if (functionalarea != '' && functionalarea != null) {
      FunctionalAreaname = (this.FunctionArea).filter(function (entry) {
        return entry.id == functionalarea
      });
      FunctionalAreaname = FunctionalAreaname[0]['functionalAreaName'];
    }
    else {
      FunctionalAreaname = '';
    }
    let sector;
    if (SectorID != '' && SectorID != null) {
      sector = (this.Sector).filter(function (entry) {
        return entry.ID == SectorID;
      });
      sector = this.Sector[0].name;
    }
    else {
      sector = '';
    }
    let trade;
    if (TradeID != '' && TradeID != null) {
      trade = (this.Trade).filter(function (entry) {
        return entry.ID == TradeID;
      });
      trade = this.Trade[0].name;
    }
    else {
      trade = '';
    }

    this.PiaSearch = {
      "industry": IndustryName != '' ? IndustryName : 'NA',
      "functionalarea": FunctionalAreaname != '' ? FunctionalAreaname : 'NA',
      'StateiD': this.statename != '' ? this.statename : 'NA',
      'DistrictID': this.districtname != '' ? this.districtname : 'NA',
      'SectorID': sector != '' ? sector : 'NA',
      'TradeID': trade != '' ? trade : 'NA',
    };
    if (from == 'scroll') {
      this.spinnerService.show();
      this.SuggestiveSearchService.GetFilterPia(StateiD, DistrictID, SectorID, TradeID, this.pageNumber).subscribe(res => {
        this.spinnerService.hide();
        this.DBResponce = res;
        // this.GetData = this.GetData.lstTC;
        if (this.DBResponce.lstTC != null) {
          this.GetData = this.GetData.concat(this.DBResponce.lstTC);
        } else {
          // this.GetData = [];
        }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.SuggestiveSearchService.GetFilterPia(StateiD, DistrictID, SectorID, TradeID, this.pageNumber).subscribe(res => {
        this.spinnerService.hide();
        this.DBResponce = res;
        if (this.DBResponce.lstTC != null) {
          this.GetData = this.DBResponce.lstTC;
        } else {
          // this.GetData = [];
        }
        this.delay = false;
      });
    }
  }


  GetTCData: any = [];
  tcdetails(piaId) {
    // console.log(this.PiaSearch.StateiD)
    this.scrollpia = 0;
    this.scrollpiasearch = false;
    this.ShwoCardsStatus = false;
    this.showTC = true;
    this.pialist = 0;
    this.PushData = {
      'piaId': piaId,
      'StateID': 0,
      'DISTRICT': 0,
      'SECTORID': 0,
      'TradeId': 0,
      'pageNumber': 0,

      // 'StateID': this.PiaSearch.StateiD,
      // 'DISTRICT': this.PiaSearch.DistrictID,
      // 'SECTORID': this.PiaSearch.SectorID,
      // 'TradeId' : this.PiaSearch.TradeID,
      // 'pageNumber': 0,

      // 'pageSize': 0,
      //   'TCNAME': "",
      //   'PIAID': piaId,
    };
    this.spinnerService.show();
    this.SuggestiveSearchService.GetFilterTC(this.PushData).subscribe(res => {
      this.spinnerService.hide();
      this.GetTCData = res;
      this.GetTCData = this.GetTCData.lstTrainingCentre;
      if (this.GetTCData != null) {
        this.GetTCData = this.GetTCData;
      } else {
        this.GetTCData = [];
      }
    });
  }

  reset_job() {
    this.minCtc = 0;
    this.maxCtc = 0;
    this.minExp = 0;
    this.maxExp = 0;
    this.FilterJobList.reset();
    this.FilterJobList.controls['industry'].setValue('');
    this.FilterJobList.controls['functionalarea'].setValue('');
    this.FilterJobList.controls['JobKeyword'].setValue('');
    this.FilterJobList.controls['walkInFromDate'].setValue('2018-01-22T00:30:37.000Z');
    this.FilterJobList.controls['walkInToDate'].setValue('2030-01-22T00:30:37.000Z');
    this.searchsts1 = 0;
    this.viewjobs(this.companyId);
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

  reset_pia() {
    // this.SectorForm.value.StateiD;
    // this.FilterJobList.controls.StateiD.setValue('');
    // this.FilterJobList.controls.DistrictID.setValue('');
    // this.FilterJobList.controls.SectorID.setValue('');
    this.searchsts2 = 0;
    this.SectorForm.value.StateiD = '';
    this.SectorForm.value.DistrictID = '';
    this.SectorForm.value.SectorID = '';
    this.SectorForm.value.TradeID = '';
    this.getPiaDataReset(0, '');
  }


}