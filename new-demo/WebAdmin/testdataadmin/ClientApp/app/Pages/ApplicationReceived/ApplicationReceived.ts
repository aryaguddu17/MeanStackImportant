import { debug } from 'util';
import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../Services/jobpost.service';
import { MasterService } from '../../Services/master.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { UpdateprofileService } from '../../Services/updateprofile.service';
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { AppConfig } from '../../Globals/app.config';
import { UserInfoService } from '../../Services/userInfo.service.';
import { WalkinPostService } from '../../Services/walkinpost.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CompanyProfileService } from '../../Services/companyprofile.service';
import { interviewListService } from '../../Services/interview.service';
import { Options } from 'ng5-slider';
import { CandidateService } from '../../Services/candidate.service';

@Component({
  selector: 'app-ApplicationReceivedComponent',
  templateUrl: './ApplicationReceived.html',
})
export class ApplicationReceivedComponent implements OnInit {
  modalRef: BsModalRef;
  modalRefdesc: BsModalRef;
  modaldefualt: BsModalRef;
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  FilterJobByComoany: FormGroup;
  FilterOpeningCompany: FormGroup;
  InterviewSearch: FormGroup;
  adminId: any;
  CompanyId: any;
  JobCardShow: any = false;
  SearchResultShow: any = false;
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
  // delay: any;
  delay: boolean = false;
  PageNumber: number = 0;
  JobId: number;
  from: any;
  count: any = [];
  AppliedCandidateList: any = [];
  openinglist: any = [];
  OpeningCardShow: boolean = false;
  openings: any = [];
  candidatelisttable: boolean = false;
  jobtablelist: boolean = false;
  HideCommon: any = 1;
  searchStatus: any = false;
  FilterJob: FormGroup;
  hrefurl:any=0;
  viewfalse: any = '1';

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
    // let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    // let max = document.documentElement.scrollHeight;

    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
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
      if (this.joblist.length >= 10 && this.JobCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetJobListByComapnyId(this.PageNumber, 'scroll');
      }
      else if (this.InterviewRes.length >= 10 && this.InterviewCardShow == true) {
        this.PageNumber = this.PageNumber + 1;
        this.GetOpeningList(this.JobId, this.PageNumber, 'scroll');
      }
    }
  }

  ngOnInit() {
    localStorage.removeItem('compid');
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
        $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
        $('.filter-wrapper').slideToggle();
    });
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.FilterJobByComoany = this.formBuilder.group({
      Industry: ['', ''],
      FunctionalArea: ['', ''],
      SearchKeyJob: ['', ''],
    });
    this.FilterOpeningCompany = this.formBuilder.group({
      OpeningStateid: ['', ''],
      OpeningDistrictid: ['', ''],
      OpeningSearchKey: ['', ''],
    });
    this.hrefurl = 1;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
     // 'walkinpostedstatus':['',Validators.required],
    });

    this.GetAllStates();
    this.GetAllState();
    this.GetAllIndustryArea();
    this.GetAllFunctionArea();
    this.GetFilter(this.PageNumber, '', 'init');
  }

  onClicked(companyid: string) {
    this.HideCommon=0;
    this.JobCardShow = true;
    this.PageNumber = 0;
    this.from = '';
    this.HideCommon = 2;
    this.CompanyId = companyid;
    this.GetJobListByComapnyId(this.PageNumber, this.from);
    this.OpeningCardShow = false;
    this.searchStatus = true;
  }

  onbackregist() {
    this.joblist = [];
    this.ShowPushDatajob = [];
    this.pushdatajob = [];
    this.openings = [];
    this.candidatelist = [];
    this.companydetails = [];
    this.candidatelisttable = false;
    this.FilterJobByComoany.reset();
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
    if (statename != '') {
      this.GetAllDistrict(statename, "profile");
    }
    else {
      this.district = [];
    }
  }

  private GetAllDistrict(id: any, From: string) {
    this.FilterJobByComoany.controls['Districtid'].setValue('');
    try {
      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res;
      });
    } catch  { }
  }

  GetJobListByComapnyIdFilter(page: any, from: any) {
    this.JobCardShow = true;
    this.SearchResultShow = true;
    this.GetJobListByComapnyId(page, from);
  }
  SearchKeyJob: any;
  functionalArea: any;
  GetJobListByComapnyId(page: any, from: any) {
  this.viewfalse='0';
    this.InterviewCardShow = false;
    let functionalarea;
    let industry;
    if (this.FilterJobByComoany.value.FunctionalArea != undefined && this.FilterJobByComoany.value.FunctionalArea != null && this.FilterJobByComoany.value.FunctionalArea != '') {
      this.functionalArea = this.FilterJobByComoany.value.FunctionalArea;
    } else {
      this.functionalArea = 0;
    }

    if (this.FilterJobByComoany.value.Industry != '' && this.FilterJobByComoany.value.Industry != null && this.FilterJobByComoany.value.Industry != undefined) {
      this.Industry = this.FilterJobByComoany.value.Industry;
    } else {
      this.Industry = 0;
    }
    if (this.FilterJobByComoany.value.SearchKeyJob != null && this.FilterJobByComoany.value.SearchKeyJob != undefined) {
      this.SearchKeyJob = this.FilterJobByComoany.value.SearchKeyJob;
    } else {
      this.SearchKeyJob = "";
    }

    // functionalarea = this.FilterJobByComoany.value.FunctionalArea;
    industry = this.FilterJobByComoany.value.Industry;
    let functionalareaname = (this.FunctionArea).filter(function (entry) {
      return entry.id == functionalarea;
    });
    let industryname = (this.IndustryArea).filter(function (entry) {
      return entry.id == industry;
    });
    this.ShowPushDatajob = {
      "functional": functionalareaname != '' ? functionalareaname[0]['functionalAreaName'] : 'NA',
      "industry": industryname != '' ? industryname[0]['industryName'] : 'NA',
      "Keyword": this.FilterJobByComoany.controls.SearchKeyJob.value ? this.FilterJobByComoany.controls.SearchKeyJob.value : 'NA'
    };
    this.pushdatajob = {
      // "FunctionalAreaId": this.FilterJobByComoany.controls.FunctionalArea.value != '' ? parseInt(this.FilterJobByComoany.controls.FunctionalArea.value) : 0,
      // "IndustryId": this.FilterJobByComoany.controls.Industry.value != '' ? parseInt(this.FilterJobByComoany.controls.Industry.value) : 0,
      "FunctionalAreaId": this.functionalArea,
      "IndustryId": this.Industry,
      "PageNumber": page,
      "Keyword": this.SearchKeyJob,
      "CompanyId": this.CompanyId,
      "AdminId": this.adminId,
      "JobId": 0,
      "UserId": 0,
      "Maxctc": 0,
      "Minctc": 0,
      "MaxExp": 0,
      "MinExp": 0
    };
    if (from == 'scroll') {
      this.spinnerService.show();
      try {
        var jobid = 0;
        this.InterviewService.GetAppByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.spinnerService.hide();
          if (this.DbResponce.lstAppliedJobList != null) {
            this.joblistRes = this.DbResponce.lstAppliedJobList;
            this.joblist = this.joblist.concat(this.joblistRes);
            this.JobCardShow = true;
          } else {
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
        this.InterviewService.GetAppByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.spinnerService.hide();
          if(this.DbResponce!=null){
          this.joblistRes = this.DbResponce.lstAppliedJobList;
          }
          if(this.joblistRes.length>0){
          this.joblist = this.joblistRes;
          }
        });
      } catch  { }
    }
    this.delay = false;
  }

  GetOpeningListFilter(PageNo: any, from: any) {
    this.GetOpeningList(this.JobId, PageNo, from);

  }
  GetOpeningList(jobid: any, PageNo: any, from: any) {
    this.SearchResultShow = false;
    this.HideCommon = 0;
    this.JobId = jobid;
    this.JobCardShow = false;
    let openingstatedid;
    let openingdistrictid;
    let openingsearchkey
    this.OpeningCardShow = true;
    openingstatedid = this.FilterOpeningCompany.value.OpeningStateid;
    openingdistrictid = this.FilterOpeningCompany.value.OpeningDistrictid;
    openingsearchkey = this.FilterOpeningCompany.value.OpeningSearchKey;
    let statename = (this.lstState).filter(function (entry) {
      return entry.id == openingstatedid;
    });
    let districtname = (this.district).filter(function (entry) {
      return entry.id == openingdistrictid;
    });
    this.ShowPushDataInterview = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "Keyword": this.FilterOpeningCompany.controls.OpeningSearchKey.value
    };
    this.pushdataInterview = {
      "StateId": this.FilterOpeningCompany.controls.OpeningStateid.value != '' ? parseInt(this.FilterOpeningCompany.controls.OpeningStateid.value) : 0,
      "DistrictId": this.FilterOpeningCompany.controls.OpeningDistrictid.value != '' ? parseInt(this.FilterOpeningCompany.controls.OpeningDistrictid.value) : 0,
      "PageNumber": PageNo,
      "Keyword": this.FilterOpeningCompany.controls.OpeningSearchKey.value != '' ? this.FilterOpeningCompany.controls.OpeningSearchKey.value : '',
      "AdminId": this.adminId,
      "CompanyId": this.CompanyId,
      "JobId": jobid
    };
    if (from == 'scroll') {
      this.spinnerService.show();
      this.InterviewService.GetOpeningByJobId(this.pushdataInterview).subscribe(res => {
        this.DbResponce = res;
        this.spinnerService.hide();
        this.openinglist = this.DbResponce.lstGetOpeningDetails;
        if (this.openinglist != null) {
          this.openings = this.openinglist[0].jobOpeningList;
          if (this.openings != undefined) {
            this.openings = this.openings.concat(this.openinglist);
          }
        } else {
          this.toastrService.error('Opening not found');
          this.JobCardShow = true;
          this.OpeningCardShow = false;
        }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.InterviewService.GetOpeningByJobId(this.pushdataInterview).subscribe(res => {
        this.DbResponce = res;
        this.spinnerService.hide();
        this.openinglist = this.DbResponce.lstGetOpeningDetails;
        if (this.openinglist != null) {
          this.openings = this.openinglist[0].jobOpeningList;
          if (this.openings != undefined) {
            this.openings = this.openings;
          }
        }
        this.delay = false;
      });
    }
  }

  BackToJobList() {
    this.JobCardShow = true;
    this.OpeningCardShow = false;
  }


  openingResponse: any = [];
  joblistresponse: any = [];
  companydetails: any = [];
  candidatelist: any = [];
  jobopeningid: any = '';

  GetCandidateList(openingid) {
    this.jobopeningid = openingid;
    let candidate_post_data = {
      'companyId': this.CompanyId, "JobId": this.JobId, "jobOpeningID": openingid,
      "stateId": 0, "districtId": 0, "keyword": ''
    }
    this.InterviewService.GetOpeningCandidateList(candidate_post_data).subscribe(res => {
      this.openingResponse = res;
      if (this.openingResponse != null) {
        this.candidatelist = this.openingResponse.lstAppliedDisticWiseCandidateList;
        this.candidatelisttable = true;
        this.jobtablelist = true;
        this.OpeningCardShow = false;
        this.spinnerService.hide();
      }
    });
    let opening_data = {
      'CompanyId': this.CompanyId, "JobId": this.JobId, "PageNumber": 0, "StateId": 0, "DistrictId": 0, "Keyword": ''
    }
    this.InterviewService.GetOpeningJobList(opening_data).subscribe(res => {
      this.joblistresponse = res;
      if (this.joblistresponse != null) {
        this.companydetails = this.joblistresponse.lstInterviewJobList;
        this.spinnerService.hide();
      }
    });
  }

  BackToCompanyList() {
    this.OpeningCardShow = false;
    this.JobCardShow = false;
    this.router.navigate(['applicationreceived']);
  }

  BackToOpeningList() {
    this.OpeningCardShow = true;
    this.jobtablelist = false;
    this.candidatelisttable = false;
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
      this.GetEmployeeAddress();
      this.GetFamilyDetails();
      this.GetCandidateLanguage();
      this.GetEmpAreaOfIntrest();
      this.GetEmpWorkExperience();
      this.GetEmpCertification();
      this.GetEmpEdutnQualifictin();
      this.spinnerService.show();
      this.CandidateService.mydatabaseCandidateDetail(candiID).subscribe(res => {
        this.ProfileResponce = res
        this.spinnerService.hide();
        if (this.ProfileResponce.lstCandeSeMyDatase != null) {
          this.candidatedetails = this.ProfileResponce.lstCandeSeMyDatase[0];
        } else {
          this.candidatedetails = [];
        }
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'candidate-view-modal modal-lg' }
          ));
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
    this.CandidateService.GetEmployeeAddress(this.candid).subscribe(res => {
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
    this.CandidateService.GetFamilyDetails(this.candid).subscribe(res => {
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
    this.CandidateService.GetCandidateLanguage(this.candid).subscribe(res => {
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
    this.CandidateService.GetEmpAreaOfIntrest(this.candid).subscribe(res => {
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
    this.CandidateService.GetEmpWorkExperience(this.candid).subscribe(res => {
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
    this.CandidateService.GetEmpCertification(this.candid).subscribe(res => {
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
    this.CandidateService.GetEmpEdutnQualifictin(this.candid).subscribe(res => {
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
  openpiaData(temppia: TemplateRef<any>, candiID: any, apitype: any) {
    if (apitype == 'MRIGS') {
      this.CandidateService.GetPiaDetail(this.JobId, this.jobopeningid, candiID).subscribe(res => {
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
  compid: any;
  goToCommon() {
    this.viewfalse='1';
    this.compid = localStorage.getItem('compid');
    this.SearchResultShow = false;
    this.district = [];
    this.FilterJobByComoany.controls[('FunctionalArea')].setValue('');
    this.FilterJobByComoany.controls[('Industry')].setValue('');
    this.FilterJobByComoany.controls[('SearchKeyJob')].setValue('');
    this.HideCommon = 1;
    this.JobCardShow = false;
  }

  goBack() {
    this.OpeningCardShow = false;
    this.JobCardShow = true;
    this.HideCommon = 2;
    this.SearchResultShow = true;
    this.searchStatus = true;
  }

  goPrevious() {
    this.searchStatus = true;
    this.OpeningCardShow = true;
    this.jobtablelist = false;
    this.candidatelisttable = false;
    this.FilterOpeningCompany.controls[('OpeningStateid')].setValue('');
    this.FilterOpeningCompany.controls[('OpeningDistrictid')].setValue('');
    this.FilterOpeningCompany.controls[('OpeningSearchKey')].setValue('');
  }
  ////////////    filter reset   /////////////////
  reset() {
    this.HideCommon = 2;
    this.PageNumber = 0;
    this.from = '';
    this.SearchResultShow = false;
    this.FilterJobByComoany.reset();
    this.FilterJobByComoany.controls['Industry'].setValue('');
    this.FilterJobByComoany.controls['FunctionalArea'].setValue('');
    this.GetJobListByComapnyId(this.PageNumber, this.from);
    this.OpeningCardShow = false;
    this.searchStatus = true;
  }
  Industry: any = [];
  IndustryArea: any = [];
  GetAllIndustryArea() {
    this.masterService.GetAllIndustryArea().subscribe(res => {
      this.Industry = res;
      this.IndustryArea = this.Industry;
    });
  }

  FunctionArea: any = [];
  AreaResponce: any = [];
  GetAllFunctionArea() {
    this.masterService.GetAllFunctionArea().subscribe(res => {
      this.AreaResponce = res;
      this.FunctionArea = this.AreaResponce;
    });
  }


  // ****************Rajeev Jha -1174*******************************
  district1: any = [];
  GetAllDistrictforfilter(event: any) {
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
  states: any = [];
  GetAllState() {
    //this.spinnerService.show();
    this.JobpostService.GetAllStates().subscribe(res => {
      this.states = res
      if (this.states!=null) {
       // this.spinnerService.hide();
        this.states = this.states.Data;
      }
      else{
        this.states=[];
       // this.spinnerService.hide();
      }
    });
  }
  pageNumber:any=0;
  GetFilterSearch(pageNumber, isScrol: any, src) {
    this.pageNumber = 0;
    this.GetFilter(pageNumber, isScrol, src);

  }

  ShowPushData: any = {};
  Showpushdata:any=0;
  item: any = [];
  logintype: any ='';
  StateiD: number = 0;
  DistrictID: any = '';
  JobKeyword: any = '';
  walkinpostedstatus:any='';
  senddatafilter: any = [];
  companyregisterdata: any = [];
  companyregisterdata123:any=[];
  GetFilter(pageNumber, isScrol: any, src) {
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdata = '1';
    }
    this.from = isScrol;
    this.item = localStorage.getItem('phpadminid');
    if (this.FilterJob.value.logintype != ''&& this.FilterJob.value.logintype !=undefined && this.FilterJob.value.logintype !=null) {
      this.logintype = this.FilterJob.value.logintype;
    } else {
      this.logintype ="";
    }
    if (this.FilterJob.value.StateiD != '' && this.FilterJob.value.StateiD !=undefined && this.FilterJob.value.StateiD !=null) {
      this.StateiD = parseInt(this.FilterJob.value.StateiD);
    } else {
      this.StateiD = 0;
    }
    if (this.FilterJob.value.DistrictID != '' && this.FilterJob.value.DistrictID !=undefined && this.FilterJob.value.DistrictID !=null) {
      this.DistrictID = parseInt(this.FilterJob.value.DistrictID);
    } else {
      this.DistrictID = 0;
    }
    if (this.FilterJob.value.JobKeyword != ''&& this.FilterJob.value.JobKeyword !=undefined && this.FilterJob.value.JobKeyword !=null) {
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
    this.walkinpostedstatus=true;
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
      'adminid': this.adminId,
      'pagenumber': pageNumber,
      'companyid':0,
      'isjobpushed':this.walkinpostedstatus,
      'logintype':this.logintype ,
      'stateid':  this.StateiD ,
      'districtid':this.DistrictID ,
      'searchkey':this.JobKeyword,
    };
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.walkinService.GetFilterCompanyDataforAppReceived(this.senddatafilter).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.concat(this.DbResponce.lstCompanyReview);
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
      this.walkinService.GetFilterCompanyDataforAppReceived(this.senddatafilter).subscribe(res => {
        this.companyregisterdata = res;
       this.companyregisterdata123 = this.companyregisterdata.lstCompanyReview;
        if (this.companyregisterdata123.length>0) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.lstCompanyReview;
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
  companyId: any;
  reset1(){
    this.companyId=[];
    this.PageNumber = 0;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      //'walkinpostedstatus':['',Validators.required]
    });
    this.district1 = [];
    this.GetFilter(this.PageNumber, '', 'init');
  }
}