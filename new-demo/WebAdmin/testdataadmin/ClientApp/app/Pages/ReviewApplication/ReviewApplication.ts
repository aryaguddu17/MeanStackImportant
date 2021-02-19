import { debug } from 'util';
import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
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
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { CommonViewLayoutComponent } from '../CommonModelView/CommonView-Layout.Component';
import {ExcelService} from '../../Services/excel.service';

@Component({
  selector: 'app-ReviewApplicationComponent',
  templateUrl: './ReviewApplication.html',
})
export class ReviewApplicationComponent implements OnInit {
  modalRef: BsModalRef;
  modalRefdesc: BsModalRef;
  modaldefualt: BsModalRef;
  @ViewChild(CommonViewLayoutComponent) private mymodel: CommonViewLayoutComponent;
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  FilterJobByComoany: FormGroup;
  FilterOpeningCompany: FormGroup;
  InterviewSearch: FormGroup;
  NotSuitableCandidateForm: FormGroup;
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
  CompanyList: any = 0;
  viewfalse: any = '1';
  Response: any
  ResponseResult: any
  RegisteredCompany: any = [];
  ShowPushDataCompany: any;
  FilterCompanyRegistration: FormGroup;
  CompanyListShow: any = true;
  PageNumberCmp: number = 0;
  FilterCandidateForm: FormGroup;
  AddCandidateCount = 1;
  token: any;
  tokenResponse: any = [];
  CompIdReviewApp: any;

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
    private jobpostService: JobpostService,
    private route: ActivatedRoute,
    private excelService:ExcelService,
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

    this.FilterCompanyRegistration = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
      'ApplicationRcvd': ['', Validators.nullValidator],
    });

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
    this.CompanyList = 1;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.FilterCandidateForm = this.formBuilder.group({
      QuesCatNego: ['', ''],
      QuesPreference: ['', ''],
      expectedAnswer: ['', ''],
    });
    this.NotSuitableCandidateForm = this.formBuilder.group({
      remarkforNotsuitable: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
    });
    var id = parseInt(this.route.snapshot.paramMap.get('jid'));//InterView Shedule
    this.CompIdReviewApp = parseInt(this.route.snapshot.paramMap.get('cmpid'));//InterView Shedule
    var usrid = parseInt(this.route.snapshot.paramMap.get('UserId'));
    var usrstatus = this.route.snapshot.paramMap.get('userStatus');
    var scrstatus = this.route.snapshot.paramMap.get('scrstatus');
    if (id && usrid && usrstatus && scrstatus) {
      this.GetScreeningPage(id, usrid, usrstatus, scrstatus);
    }
    else {
    }
    this.GetAllStates();
    this.GetAllIndustryArea();
    this.GetAllFunctionAreas();
    this.GetCompanyData(0, '');
  }

  jid: any;
  userid: any;
  userstatus: any;
  scrstatus: any;
  BackfromInterview: boolean = false;
  GetScreeningPage(jobid: any, userid: any, userstatus: any, scrstatus: any) {
    this.jid = jobid;
    this.userid = userid;
    this.userstatus = userstatus;
    this.scrstatus = scrstatus;
    this.CompanyListShow = false;
    this.BackfromInterview = true;
    this.GetOpeningScreeningPage(jobid, userstatus, userid, scrstatus);
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

  ComSearch: boolean = false
  GetCompanyDataFilter() {
    this.GetCompanyData(0, '');
    this.ComSearch = true;
  }
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
      'AppliedCandidate': this.FilterCompanyRegistration.value.ApplicationRcvd ? this.FilterCompanyRegistration.value.ApplicationRcvd : null,
    };

    this.ShowPushDataCompany = {
      "state": statename != '' ? statename[0]['stateName'] : 'NA',
      "district": districtname != '' ? districtname[0]['districtName'] : 'NA',
      "JobKeyword": this.FilterCompanyRegistration.value.JobKeyword ? this.FilterCompanyRegistration.value.JobKeyword : 'NA',
      "logintype": this.FilterCompanyRegistration.value.logintype ? this.FilterCompanyRegistration.value.logintype : 'NA',
      "ApplicationRcvd": this.FilterCompanyRegistration.value.ApplicationRcvd ? this.FilterCompanyRegistration.value.ApplicationRcvd : 'NA',
    };
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.InterviewService.GetFilterCompanyRegistrationCompany(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstAdmCompanyapplicationRecieved;
        if (this.ResponseResult != null) {
          this.RegisteredCompany = this.RegisteredCompany.concat(this.ResponseResult);
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.RegisteredCompany = [];

          this.spinnerService.hide();
        }
        this.delay = false;
      });
    } else {
      this.spinnerService.show();
      this.InterviewService.GetFilterCompanyRegistrationCompany(datasend).subscribe(res => {
        this.Response = res;
        this.ResponseResult = this.Response.lstAdmCompanyapplicationRecieved;
        if (this.ResponseResult != null) {
          this.spinnerService.hide();
          this.RegisteredCompany = this.ResponseResult;
        }
        else {
          this.Response = [];
          this.RegisteredCompany = [];
          this.toastrService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    }
  }


  onCompanyClicked(companyid: string) {
    this.CompanyListShow = false;
    this.RegisteredCompany = [];
    this.CompanyId = companyid;
    this.from = '';
    this.GetJobListByComapnyId(this.PageNumber, this.from);
  }

  BackToCompanyList() {
    this.SearchResultShow = false;
    this.JobCardShow = false;
    this.CompanyListShow = true;
    this.joblist = [];
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

  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
      });
    } catch  { }
  }


  onChangeState(statename: any) {
    if (statename != '') {
      this.GetAllDistrict(statename);
    }
    else {
      this.district = [];
    }
  }

  private GetAllDistrict(id: any) {
    this.FilterCompanyRegistration.controls['DistrictID'].setValue('');
    try {
      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res;
        if (this.district != null && this.district.length > 0) {
          this.district = this.district;
        }
      });
    } catch  { }
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

  openModal(candiID: any, apitype: any) {
    this.mymodel.callMethod(candiID, apitype);
  }

  ////////////// Code by Hem Tiwari on 1-08-2019 End  //////////////

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
      if (this.addressinfodata.lstEmployeeAddress != null && this.addressinfodata.lstEmployeeAddress.length != 0
      ) {
        this.addressinfodata = this.addressinfodata.lstEmployeeAddress;
      }
      else {
        this.addressinfodata = [];
      }
    });
  }

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

  cdistricaddress: any;
  GetAllcDistrictaddress(stateid: any) {
    if (stateid) {
      this.masterService.GetAllDistrict(stateid).subscribe(res => {
        this.cdistricaddress = res;
        this.cdistricaddress = this.cdistricaddress;
      });
    }
  }

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
    //this.CandidateService.GetEmpCertification(this.candid).subscribe(res => {
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
  openpiaData(temppia: TemplateRef<any>, candiID: any, opening: any, apitype: any) {
    if (apitype == 'MRIGS') {
      this.CandidateService.GetPiaDetail(this.JobId, opening, candiID).subscribe(res => {
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
  GetAllFunctionAreas() {
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
    if (event != '' || event != null) {
      this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();
    this.JobpostService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res
      if (this.district1 != null) {
        this.spinnerService.hide();
        this.district1 = this.district1.Data;
      }
      else {
        this.district1 = [];
        this.spinnerService.hide();
      }
    });
  }
  states: any = [];
  
  /**Code for opening with screening by arti on 9 may 2019 */

  GetJobListByComapnyIdFilter(page: any, from: any) {
    this.JobCardShow = true;
    this.SearchResultShow = true;
    this.GetJobListByComapnyId(page, from);
  }
  SearchKeyJob: any;
  functionalArea: any;
  FilteredJobList: any = [];
  GetJobListByComapnyId(page: any, from: any) {
    this.JobCardShow = true;
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
      "FunctionalAreaId": this.functionalArea,
      "IndustryId": this.Industry,
      "PageNumber": page,
      "Keyword": this.SearchKeyJob,
      "CompanyId": this.CompanyId ? this.CompanyId : this.CompIdReviewApp,
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
        this.InterviewService.GetAppByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.FilteredJobList = this.DbResponce.lstAppliedJobList;
          this.spinnerService.hide();
          if (this.FilteredJobList != null) {
            this.joblistRes = this.FilteredJobList;
            this.joblist = this.joblist.concat(this.joblistRes);
            this.JobCardShow = true;
          } else {
          }
        });
      } catch  { }
    }
    else {
      this.spinnerService.show();
      this.PageNumber = 0;
      try {
        this.InterviewService.GetAppByCompanyId(this.pushdatajob).subscribe(res => {
          this.DbResponce = res
          this.FilteredJobList = this.DbResponce.lstAppliedJobList;
          this.spinnerService.hide();
          if (this.FilteredJobList != null) {
            this.joblistRes = this.FilteredJobList;
          }
          if (this.joblistRes.length > 0) {
            this.joblist = this.joblistRes;
          }
        });
      } catch  { }
    }
    this.delay = false;
  }


  PrefResponse: any = [];
  GetPreferenceList() {
    try {
      this.InterviewService.GetPreference().subscribe(res => {
        this.PrefResponse = res
        this.PrefResponse = this.PrefResponse.lstPreference
      });
    } catch  { }
  }


  pushdataOpening: any;
  GetOpeningDropDownList() {

    this.spinnerService.show();
    this.InterviewService.GetOpeningListByJobId(this.adminId, this.JobId).subscribe(res => {
      this.DbResponce = res;
      this.spinnerService.hide();

      if (this.openinglist != null) {

        this.openinglist = this.DbResponce.lstJobAppreviwOpngAddressList;
      }
    });
  }

  ScreeningDetail: boolean = false;
  UserStatus: any;
  UserId: any;
  ScreeningStatus: any;
  ScrQuesCount: boolean = false;
  GetOpeningScreeningPage(jobid: any, userstatus: any, userid: any, scrstatus: any) {
    this.UserId = userid;
    this.JobId = jobid;
    this.UserStatus = userstatus;
    this.ScreeningStatus = scrstatus;
    if (this.ScreeningStatus == true || this.ScreeningStatus == "true") {
      this.ScrQuesCount = true;
    }

    this.JobCardShow = false;
    this.SearchResultShow = false;
    this.ScreeningDetail = true;
    this.CompanyList = 0;
    this.CandRes = null;
    this.CandList = null;
    this.EnableFilter = true;
    this.GetOpeningDropDownList();
    this.GetPreferenceList();
    this.GetScreeningCounts();
    this.GetToken(this.UserId);
    this.GetCandidateList();
  }
  CountRes: any = [];
  GetScreeningCounts() {
    try {
      this.spinnerService.show();
      this.InterviewService.GetJobScreeningCounts(this.JobId, this.adminId).subscribe(res => {
        this.CountRes = res
        if (this.CountRes != null) {
          this.CountRes = this.CountRes.lstAppRevwScreeningCounts[0];
          this.spinnerService.hide();
        } else {
          this.CountRes = [];
          this.spinnerService.hide();
        }
      });

    } catch{

    }

  }
  modalRefForJob: BsModalRef;
  jobopeningdetail: any = [];
  GetJobDetail(templateJobDetail: TemplateRef<any>) {
    this.modalRefForJob = this.modalService.show(templateJobDetail,
      { backdrop: 'static', keyboard: false, class: 'modal-lg' });
    try {
      this.spinnerService.show();
      this.InterviewService.GetAppliedJobById(this.adminId, this.JobId).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce != null) {
          this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
          this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID
          this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID
          this.jobpostService.GetJobOpeningDetail(this.JobId, this.UserId, this.adminId).subscribe(res => {
            this.jobopeningdetail = res;
            this.spinnerService.hide();
          });
        } else {
          this.JobDetail = [];
          this.spinnerService.hide();
        }
      });

    } catch{

    }
  }
  CloseJobDetail() {

    this.modalRefForJob.hide();

  }
  modalRefForScr: BsModalRef;
  ScrResponse: any = [];
  screenList: any = [];
  countscreeningquestion:any=1;
  GetJobScreeningquestionList(displayQuestion: TemplateRef<any>) {
    this.spinnerService.show();
    if(this.countscreeningquestion==1){
    this.InterviewService.GetJobScreeningquestion(this.JobId, this.adminId).subscribe(res => {
      this.spinnerService.hide();
      this.ScrResponse = res;
      if (this.ScrResponse.lstGetRevwAppExpctAnswer) {
        this.modalRefForScr = this.modalService.show(displayQuestion,
          { backdrop: 'static', keyboard: false, class: 'modal-lg' });
        this.screenList = this.ScrResponse.lstGetRevwAppExpctAnswer;
      } else {
        this.toastrService.error('server error');
      }
    });
  }
    this.countscreeningquestion++;
  }
  PrefrenceOption: boolean = true;
  OnQuestCatChange(Catvalue: any) {
    if (Catvalue == '1') {
      this.PrefrenceOption = false;
    } else {
      this.PrefrenceOption = true;
    }


  }
  closeQuestionList() {
    this.countscreeningquestion=1;
    this.screenList = [];
    this.modalRefForScr.hide();
  }
  BackToJobList() {
    this.PrefrenceOption = true;
    this.CandRes = [];
    this.CandList = [];
    this.FilterCandidateForm.controls['QuesCatNego'].setValue("");
    this.FilterCandidateForm.controls['QuesPreference'].setValue("");
    this.FilterCandidateForm.controls['expectedAnswer'].setValue("");
    this.ScrQuesCount = false;
    this.EnableFilter = false;
    this.ShowCandList = false;
    this.JobCardShow = true;
    this.ScreeningDetail = false;
    this.OpeningSearchResult = false;
    this.CompanyList = 1;
    this.GetJobListByComapnyId(0, '');

  }
  BackToJobListFromInterview() {
    this.CandRes = [];
    this.CandList = [];
    this.BackfromInterview = false;
    this.ScrQuesCount = false;
    this.EnableFilter = false;
    this.ShowCandList = false;
    this.JobCardShow = true;
    this.ScreeningDetail = false;
    this.OpeningSearchResult = false;
    this.CompanyList = 1;
    this.CompanyId = localStorage.getItem('companyid');
    this.GetJobListByComapnyId(0, '');
  }
  ShowCandFilter: boolean = false;
  GetFilter() {
    this.ShowCandFilter = true;
  }

  EnableFilter: boolean = false;
  OnLocationChange(event) {
    this.CandRes = [];
    this.CandList = [];
    this.AddCandidateCount = 1;
    this.EnableFilter = true;
    this.jobopeningid = event;
    this.GetCandidateList();
  }

  openingResponse: any = [];
  joblistresponse: any = [];
  companydetails: any = [];
  candidatelist: any = [];
  jobopeningid: any = '';
  CandRes: any = [];
  CandList: any = [];
  OpeningSearchResult: boolean = false;
  GetCandidateListDirectly() {
    this.GetCandidateList();
    this.OpeningSearchResult = true;

  }
  ShowCandList: boolean = false;
  ShowCandFilterData: any = [];
  GetCandidateList() {
    this.ShowCandList = true;

    this.CandRes = null;
    this.CandList = null;

    if (this.FilterCandidateForm.controls.QuesCatNego.value != '' || this.FilterCandidateForm.controls.QuesCatNego.value != '' || this.FilterCandidateForm.controls.QuesCatNego.value != '') {
      var QuesCatNego = this.FilterCandidateForm.controls.QuesCatNego.value;
      var QuesPreference = this.FilterCandidateForm.controls.QuesPreference.value;
      var expectedAnswer = this.FilterCandidateForm.controls.expectedAnswer.value;
    }
    else {
      QuesCatNego = null;
      QuesPreference = null;
      expectedAnswer = null;
    }

    let candidate_post_data = {
      "AdminId": this.adminId,
      "JobId": this.JobId,
      "jobOpeningID": this.jobopeningid ? this.jobopeningid : 0,
      "QuestionCatgory": QuesCatNego,
      "PreferenceN": QuesPreference,
      "Expectedstaus": expectedAnswer,
      "Pagenumber": 0
    };
    this.ShowCandFilterData = {
      "QuestionCatgory": this.FilterCandidateForm.controls.QuesCatNego.value ? this.FilterCandidateForm.controls.QuesCatNego.value : 'NA',
      "PreferenceN": this.FilterCandidateForm.controls.QuesCatNego.value ? this.FilterCandidateForm.controls.QuesCatNego.value : 'NA',
      "Expectedstaus": this.FilterCandidateForm.controls.QuesCatNego.value ? this.FilterCandidateForm.controls.QuesCatNego.value : 'NA',
    };
    this.CandRes = [];
    this.CandList = [];
    this.spinnerService.show();
    this.InterviewService.GetFilteredCandidateList(candidate_post_data).subscribe(res => {
      this.CandRes = res;
      if (this.CandRes.lstGetAppRevwCandDetails != null) {
        this.CandList = this.CandRes.lstGetAppRevwCandDetails;
        this.spinnerService.hide();
        this.jobopeningid = 0;
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.dtTrigger != null)
      this.dtTrigger.next();
  }
  rerender(): void {
    if (this.dtTrigger != null)
      this.dtTrigger.next();
    if (this.dtTrigger != null)
      this.dtTrigger.unsubscribe();
  }

  ngOnDestroy(): void {
    if (this.dtTrigger != null)
      this.dtTrigger.unsubscribe();
  }

  /***  function call while change the suitable / not suitable drop down    *****/
  NotSuitableRemark: any;
  issuitable: number;
  suitabilityStatus: any = [];
  ExistingCandidate: any = [];
  pusharray: any = [];
  idFormArray: any = [];
  idFormArrayOpening: any = [];
  PreviousStatusArray: any = [];
  jobidfornotsuitable: any;
  candidfornotsuitable: any;
  openingidfornotsuitable: any;
  sourcetypefornotsuitable: any;
  sourceidfornotsuitable: any;
  NotSuitable: boolean = false;
  interviewId: any;
  CandName: any;
  ListIndex: any;
  modalsuitable: BsModalRef;
  JobSuitability(templatefornotsuitable: TemplateRef<any>, status: number, candid: any, candname: any, jobid: any, openingid: any, sourcetype: any, sourceid: any, listindex: any) {
    this.CandName = candname;
    this.ListIndex = listindex;
    this.ExistingCandidate = [];
    if (status == 2) {
      this.issuitable = null;

    } else {
      this.issuitable = status;
    }
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
      if (this.issuitable == null || status == 1) {
        let indexofsuitablearray = this.pusharray.indexOf(candid);
        this.suitabilityStatus.splice(indexofsuitablearray, 1);
        this.pusharray.splice(indexofsuitablearray, 1);

        this.pusharray.push(candid);
        this.suitabilityStatus.push({
          'Candid': candid,
          "issuitable": this.issuitable,
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
      //if candidate does not exist in the array existing array lenth is zero
    }
    else {
      if (this.issuitable == null || status == 1) {
        this.pusharray.push(candid);
        this.suitabilityStatus.push({
          'Candid': candid,
          "issuitable": this.issuitable,
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
    else
      if (this.PreviousStatusArray.length == 0) {
        this.PreviousStatusArray = [];
        this.PreviousStatusArray = (this.CandList).filter(function (entry) {
          return entry.candId == candIdStatus;
        });

        var beforeChecked = this.PreviousStatusArray[0].isSuitable;
        var final = beforeChecked == null ? 2 : beforeChecked
        $("#" + "myDropDown" + this.ListIndex).val(final);

      }
      else {
        var SuitableStatusNull = 2;
        $("#" + "myDropDown" + this.ListIndex).val(SuitableStatusNull);
      }

  }
  /**** function that is called when not suitable remark is submitted    *****/
  SubmitNotSuitableRemark() {
    if (this.NotSuitableCandidateForm.value.remarkofrejection == '') {
      this.NotSuitableCandidateForm.controls['remarkofrejection'].setValue('');
      return false;
    }
    if (this.ExistingCandidate.length == 0) {
    
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

    //To splice already suitable candidate from array
    else if (this.ExistingCandidate.length != 0) {
      let indexofsuitablearray = this.pusharray.indexOf(this.candidfornotsuitable);
      this.suitabilityStatus.splice(indexofsuitablearray, 1);
      this.pusharray.splice(indexofsuitablearray, 1);
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
  SuitableCandidate: any = [];
  FilteredResult: any = [];
  SubmitSuitabilityRemarks() {

    for (var i = 0; i < this.suitabilityStatus.length; i++) {
      this.SuitableCandidate.push({
        "candId": this.suitabilityStatus[i].Candid,
        "jobId": this.suitabilityStatus[i].jobid,
        "jobOpeningId": this.suitabilityStatus[i].openingid,
        "isSuitable": this.suitabilityStatus[i].issuitable!= null ? parseInt(this.suitabilityStatus[i].issuitable) : this.suitabilityStatus[i].issuitable,
        "Sourceid": this.suitabilityStatus[i].Sourceid,
        "SourceType": this.suitabilityStatus[i].SourceType,
        "Remarks": this.suitabilityStatus[i].Remarks,
        "AdminId": this.adminId,
        "UserId": this.UserId
      });
    }
    if (this.SuitableCandidate.length != 0) {
      this.FilteredResult = (this.SuitableCandidate).filter(function (entry) {
        return entry.isSuitable != null;
      });
      if (this.FilteredResult.length != 0) {
        this.InterviewService.UpdateSuitabilityStatusOfAppliedCandidate(this.FilteredResult).subscribe(res => {
          this.DbResponce = res
          this.toastrService.success('Candidate status has been saved successfully.');
        });
        this.idFormArray = [];
        this.FilteredResult = [];
        this.idFormArrayOpening = [];
        this.SuitableCandidate = [];
        this.suitabilityStatus = [];
        this.ExistingCandidate = [];
        this.PreviousStatusArray = [];
        this.pusharray = [];
      } else {
        this.FilteredResult = [];
        this.toastrService.error('Please select atleast one suitable or not suitable candidate.');
        return false;
      };
    }
    else {
      this.FilteredResult = [];
      this.toastrService.error('Please changes status of atleast one candidate.');
      return false;
    };
  }
  screeningAnswer: any = [];
  modalScreening: BsModalRef;
  appliedCandidate: any;
  index: any;
  result: any;
  ScrStatus: any;
  CandStatus: any;
  openscreeningModal(templateSector: TemplateRef<any>, CandListDetail: any, i) {

    this.appliedCandidate = CandListDetail;
    this.ScrStatus = CandListDetail.issuitable;
    this.index = i;
    this.CandStatus = CandListDetail.candStatus;
    let postScrData = {
      'Jobid': CandListDetail.jobId,
      'Jobopeningid': CandListDetail.jobOpeningId,
      'candidateid': CandListDetail.candId,
      'adminid': this.adminId,
      'userid': this.UserId
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
        this.toastrService.error(this.result.message)
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
    this.JobSuitability(templatefornotsuitable, value, this.CandDetail.candId, this.CandDetail.candName, this.CandDetail.jobId, this.CandDetail.jobOpeningId, this.CandDetail.apiType, this.CandDetail.sourceId, i);
  }
  modalRefForCompny: BsModalRef;
  CompanyData: any = [];
  DbResponceByCompId: any = [];
  CountGetCompanyDetail:any=1;
  GetCompanyDetail(companyDetail: TemplateRef<any>) {
    if(this.CountGetCompanyDetail==1){
      this.spinnerService.show();
    this.InterviewService.GetCompanyData((this.CompanyId || this.CompIdReviewApp)).subscribe(res => {
      this.spinnerService.hide();
      this.DbResponceByCompId = res;
      if (this.DbResponceByCompId.lstCompanyProfile != null) {
        this.companydetails = this.DbResponceByCompId.lstCompanyProfile;
        this.CompanyData = this.companydetails[0];
        this.modalRefForCompny = this.modalService.show(companyDetail,
          { backdrop: 'static', keyboard: false, class: 'modal-lg' });
      } else {
        this.spinnerService.hide();
        this.CompanyData = [];
        this.companydetails = [];
      }
    });
  }
  this.CountGetCompanyDetail++

  }
  Closecompanydetailsmodel(){
    this.CountGetCompanyDetail=1
    this.modalRefForCompny.hide();
  }


  // Code to redirect interview schedule page
  jobId: any = {};
  BackButton: boolean;
  InterviewSchedule() {
    this.ScreeningStatus;
    this.UserStatus;
    if (this.UserStatus) {
      this.jobId = this.JobId;
      var cmpid = this.CompanyId ? this.CompanyId : this.CompIdReviewApp
      localStorage.setItem('companyid', this.CompanyId);
      this.router.navigate(['/InterviewList', { cmpid: parseInt(cmpid), jid: parseInt(this.jobId), UserId: parseInt(this.UserId), userStatus: this.UserStatus, scrStatus: this.ScreeningStatus }]);
    } else {
      this.toastrService.error('Inactive user not allowed to schedule the interview.');
    }
  }
  sortF: any;
  changeSort(event) {
    if (!event.order) {
      this.sortF = 'year';
    } else {
      this.sortF = event.field;
    }
  }

  CandidateExelData:any=[];
  ShowAllexcelExport(item:any)
{
  var data=[];
  this.CandidateExelData=item;
  this.CandidateExelData.forEach(function(item,index){
    var obj={ 
      'S.No':index+1,
      'Candidate Name' : item.candName,
      'Opening Code':item.openingJobdCode,
      'Mobile Number':item.mobile,
      'Age':item.age,
      'Email':item.email,
      'Gender':item.gender,
      'State':item.stateName,
      'District':item.districtName,
      'Source':item.apiType,
      'Job Opening Location':item.openingStateName,
      'Training Center':item.partnerName,
      'Training Trade':item.traningTrade,
      'Training Scheme':item.trainingScheme,
      'Candidate Status':item.candStatus,

    }
  
    data.push(obj);
  })
this.CandidateExelData=data; 
this.excelService.exportAsExcelFile(this.CandidateExelData, 'CandidateReports');
}
ResetFilter(){
  this.PrefrenceOption = true
}
}