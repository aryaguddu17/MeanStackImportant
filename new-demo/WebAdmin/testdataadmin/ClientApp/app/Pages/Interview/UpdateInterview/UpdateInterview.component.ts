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
import { Options } from 'ng5-slider';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { CandidateService } from '../../../Services/candidate.service';
@Component({
  selector: 'app-UpdateInterview',
  templateUrl: './UpdateInterview.component.html'

})

export class UpdateInterviewComponent implements OnInit {
  modalRef: BsModalRef;
  modalRefdesc: BsModalRef;
  modaldpia: BsModalRef;
  modaldefualt: BsModalRef;
  modalRefReschedule: BsModalRef;

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  RescheduleInterviewForm: FormGroup;
  adminId: any;
  CompanyId: any;
  JobInterviewDetailcard: any = false;
  lstState: any = [];
  district: any = [];
  ShowPushDataInterview: any = [];
  pushdataInterview: any = [];
  DbResponce: any = [];
  joblistRes: any = [];
  joblist: any = [];
  InterviewResfinal: any = [];
  InterviewRes: any = [];
  JobDetail: any = [];
  InterviewDetail: any = [];
  PageNumber: number = 0;
  JobId: number;
  AppliedCandidateList: any = [];
  HideCommon: any = 1;
  interviewformValid = true;
  minDate = new Date();
  token:any;
  tokenResponse:any = [];

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
    private atp: AmazingTimePickerService,
    private CandidateService: CandidateService,
    private router: Router) { }


  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
    });
  }
  compid: any;
  interviewid: any;
  JobIdOfInterList: any;
  CompIdForBack: any;
  ngOnInit() {
    this.compid = localStorage.getItem('compid');
    localStorage.removeItem('compid');
    this.interviewid = localStorage.getItem('Interviewid');
    this.JobIdOfInterList = localStorage.getItem('JobId');
    this.CompIdForBack = localStorage.getItem('CompId');
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.RescheduleInterviewForm = this.formBuilder.group({
      InterviewDate: ['', [Validators.required,]],
      InterviewDateTo: ['', [Validators.required,]],
      fromtime: ['', [Validators.required,]],
      totime: ['', [Validators.required,]],
      jobid: ['', [Validators.nullValidator,]],
      candidateid: ['', [Validators.nullValidator,]],
      interviewid: ['', [Validators.nullValidator,]],
      remarks: ['', [Validators.nullValidator,]],
    });
    this.GetJobDetail(this.JobIdOfInterList, this.interviewid);
   
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

  onClicked(companyid: string) {
    this.HideCommon = 2;
    this.CompanyId = companyid;
    this.GetWorkLocation();
  }
  onbackregist() {
    this.joblist = [];
  }
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

  FilteredResult: any = [];
  UserId:any;
  GetJobDetail(jobid: any, interviewid: any) {
    this.JobInterviewDetailcard = true;

    try {
      this.InterviewService.GetAppliedJobById(this.adminId, jobid).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce != null) {
          this.JobDetail = this.DbResponce.lstAdminVerifiedUser;
          this.UserId = this.DbResponce.lstAdminVerifiedUser[0].userID
         // this.minDate = new Date(this.JobDetail[0].jobPushedDate);  
         this.GetToken(this.UserId);      
        } else {
          this.JobDetail = [];
          this.spinnerService.hide();
        }
      });
      var getInterview = {
        "Adminid": this.adminId,
        "JOBID": jobid,
        "INTERVIEWID": interviewid
      };
      this.InterviewService.getInterviewDetailById(getInterview).subscribe(res => {
        this.InterviewDetail = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.InterviewDetail = this.InterviewDetail.Data[0];
        }
        else {
          this.InterviewDetail = [];
          this.spinnerService.hide();
        }
      });
    } catch  { }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    var getcand = {
      "UserID": 0,
      "AdminId": this.adminId,
      "JobId": jobid,
      "InterviewId": interviewid,
      "SearchKey": '',
      "PageNumber": this.PageNumber
    };
    this.AppliedCandidateList = [];
    this.DbResponce = [];
    this.spinnerService.show();
    this.InterviewService.GetCommanCandidateList(this.adminId, jobid, interviewid, 0).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.AppliedCandidateList = this.DbResponce.lstCandidateInfo;
        this.FilteredResult = (this.AppliedCandidateList).filter(function (entry) {
          return entry.isscheduled == true;
          //return entry.issuitable == true;
        });
        // this.FilteredResult = (this.FilteredResult).filter(function (entry) {
        //   //return entry.isscheduled == true;
        //   return entry.issuitable == true;
        // });
        this.dtTrigger.next();
       
      }
    });
   

  }

  GetToken(user:any){
    this.InterviewService.getToken(user).subscribe(res => {
      this.tokenResponse = res
      if (this.tokenResponse.lsttoken != null) {
        this.token = this.tokenResponse.lsttoken[0].token;
        this.token =  'Bearer'+' '+ this.token;
      } else {
        this.tokenResponse.lsttoken = [];
      }
       });
  }
  ngOnDestroy(): void {

    this.dtTrigger.unsubscribe();

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
  CandidateJobOpeningId: any;
  
  startDate: any;
  EndDate: any;
  ViewRescheduleInterview(jobid: any, interviewid: any, candidateid: any, candidateopeningid: any, datefrom: any, dateto: any, timefrom: any, timeto: any, template5: TemplateRef<any>) {
    this.modalRefReschedule = this.modalService.show(template5,
      { backdrop: 'static', keyboard: false });

    this.CandidateJobOpeningId = candidateopeningid;
    this.startDate = datefrom;
    this.EndDate = dateto;
    this.startDate = new Date(datefrom);
    this.EndDate = new Date(dateto);

    //this.RescheduleInterviewForm.controls['InterviewDate'].setValue(this.startDate);
    // this.RescheduleInterviewForm.controls['InterviewDateTo'].setValue(this.EndDate);
    // this.RescheduleInterviewForm.controls['fromtime'].setValue(timefrom);
    //this.RescheduleInterviewForm.controls['totime'].setValue(timeto);
    this.RescheduleInterviewForm.controls['jobid'].setValue(jobid);
    this.RescheduleInterviewForm.controls['candidateid'].setValue(candidateid);
    this.RescheduleInterviewForm.controls['interviewid'].setValue(interviewid);
  }
  TimeMsg: any = true;
  TimeRange: any = true;
  DateMsg: any = true;
  RescheduleDetail: any = {};
  RescheduleCount = 1;
  SubmitRescheduleInterview() {

    this.startDate = this.RescheduleInterviewForm.value.InterviewDate;
    this.EndDate = this.RescheduleInterviewForm.value.InterviewDateTo;
    this.startDate = moment(this.startDate).format('MM/DD/YYYY');
    this.EndDate = moment(this.EndDate).format('MM/DD/YYYY');
    let MinTime = this.RescheduleInterviewForm.value.fromtime;
    let Maxtime = this.RescheduleInterviewForm.value.totime;
    if (this.startDate > this.EndDate) {
      this.interviewformValid = true;
      this.DateMsg = false;
      return false;
    } else {
      this.interviewformValid = false;
      this.DateMsg = true;
    }
    if (MinTime < '06.00' || Maxtime > '23.00') {
      this.TimeRange = false;
      this.toastrService.error("Please enter interview time between 6 AM to 10 PM.");
      return false;
    }
    else {
      this.TimeRange = true;
    }
    if (MinTime > Maxtime) {
      this.TimeMsg = false;
      return false;
    } else {
      this.TimeMsg = true;
    }
    this.RescheduleDetail.InterviewId = this.RescheduleInterviewForm.value.interviewid;
    this.RescheduleDetail.CandId = this.RescheduleInterviewForm.value.candidateid;
    this.RescheduleDetail.OpeningId = this.CandidateJobOpeningId;
    this.RescheduleDetail.JobId = this.RescheduleInterviewForm.value.jobid;
    this.RescheduleDetail.InterviewDateFrom = this.startDate;
    this.RescheduleDetail.InterviewDateTo = this.EndDate;
    this.RescheduleDetail.InterviewTo = this.RescheduleInterviewForm.value.totime;
    this.RescheduleDetail.InterviewFrom = this.RescheduleInterviewForm.value.fromtime;
    this.RescheduleDetail.Remarks = this.RescheduleInterviewForm.value.remarks;
    this.RescheduleDetail.AdminId = this.adminId;

    try {
      this.spinnerService.show();
      this.InterviewService.SetCandidateRescheduleDetail(this.RescheduleDetail).subscribe(res => {
        this.DbResponce = res
        if (this.DbResponce.responseResult == true) {
          this.spinnerService.hide();
          this.modalRefReschedule.hide();
          //this.toastrService.success(this.DbResponce.message);
          this.toastrService.success("Interview has been Rescheduled Successfully.");
          this.GetJobDetail(this.RescheduleInterviewForm.value.jobid, this.RescheduleInterviewForm.value.interviewid);
          this.RescheduleInterviewForm.reset();

        } else {
          this.spinnerService.hide();
          this.toastrService.error(this.DbResponce.message);
        }
      });
    } catch  { }

  }
  ResetRescheduleform() {
    this.DateMsg = true;
    this.RescheduleInterviewForm.reset();
  }
  BackToJobList() {
    this.router.navigate(['/InterviewList', { JobInterviewDetailcard: false, JobCardShow: false, InterviewCardShow: true, compid: this.CompIdForBack }]);

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
      this.InterviewService.GetEmployeeAddress(this.candid,this.token).subscribe(res => {
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
    //this.CandidateService.GetFamilyDetails(this.candid).subscribe(res => {
      this.InterviewService.GetFamilyDetails(this.candid,this.token).subscribe(res => {
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
    //this.CandidateService.GetCandidateLanguage(this.candid).subscribe(res => {
      this.InterviewService.GetCandidateLanguage(this.candid,this.token).subscribe(res => {
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
    //this.CandidateService.GetEmpAreaOfIntrest(this.candid).subscribe(res => {
      this.InterviewService.GetEmpAreaOfIntrest(this.candid,this.token).subscribe(res => {
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
    //this.CandidateService.GetEmpWorkExperience(this.candid).subscribe(res => {
      this.InterviewService.GetEmpWorkExperience(this.candid,this.token).subscribe(res => {
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
      this.InterviewService.GetEmpCertification(this.candid,this.token).subscribe(res => {
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
    //this.CandidateService.GetEmpEdutnQualifictin(this.candid).subscribe(res => {
      this.InterviewService.GetEmpEdutnQualifictin(this.candid,this.token).subscribe(res => {
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





