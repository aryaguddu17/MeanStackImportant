import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppConfig } from '../../Globals/app.config';
import { UserInfoService } from '../../Services/userInfo.service.';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { RegistrationService } from '../../Services/registration.service';
import { MasterService } from '../../Services/master.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JobpostService } from '../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { forEach } from '@angular/router/src/utils/collection';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CompanyProfileService } from '../../Services/companyprofile.service';
import { Options } from 'ng5-slider';
import { count } from 'rxjs/operators';
import { ScreeningQuestionService } from '../../Services/screeningQuestion.service'
import *as moment from 'moment';

@Component({
  selector: 'app-ViewJobComponent',
  templateUrl: './ViewJob.Component.html',
})

export class ViewJobComponent implements OnInit {

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  CurrentDate: Date = new Date();
  UserInfo: any;
  openingformValid = true;
  jobFromvalid = true;
  AgeMsg = true;
  ExpMsg = true;
  CtcMsg = true;
  jobopeningdetail: any = [];
  editjobdetailres: any = [];
  editjobopeningres: any = [];
  editjobdetail: any = [];
  editjobopening: any = [];
  DbResponcse: any = [];
  id: any = [];
  response: any = [];
  jobs: any = [];
  jobid: any = [];
  userdetails: any = [];
  checkverifymobile: boolean = false;
  viewid: any = [];
  lstState: any = [];
  lstAllLanguage: any = [];
  joiningprioritys: any = [];
  mineducations: any = [];
  district: any = [];
  city: any = [];
  DBResponce: any = [];
  DbResponce: any = [];
  EditJobForm: FormGroup;
  EditJobOpeningForm: FormGroup;
  EditFormShow: any = false;
  EditOpeningFormShow: any = false;

  count = 1;
  dropdownList = {};
  selectedItems = {};
  dropdownSettings = {};
  PageNumber: number = 0;
  status = true;
  statusAge = true;
  IsAgencyJob: boolean = true;
  Ispush: any;
  showAgency: any = '0';
  showEmployer: any = '0';
  PushData: any = [];

  lstFunctionalArea: any = [];
  lstIndustryArea: any = [];
  respIndustryArea: any = [];
  respFunctionalArea: any = [];
  modalRef: BsModalRef;
  Redirection: any = '0';
  JobFormDesable: boolean = true;
  minExp: number = 0;
  maxExp: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
  ageOptions: Options = {
    floor: 0,
    ceil: 60,
    step: 1
  };
  ExpOptions: Options = {
    floor: 0,
    ceil: 20,
    step: 1
  };
  CtcOptions: Options = {
    // floor: 5000,
    floor: 0,
    ceil: 250000,
    step: 1
  };
  SectorForm: FormGroup;

  constructor(private appConfig: AppConfig
    , private toastrService: ToastrService
    , private masterService: MasterService
    , private formBuilder: FormBuilder
    , private router: Router
    , private spinnerService: Ng4LoadingSpinnerService
    , private jobpostService: JobpostService
    , private activatedroute: ActivatedRoute
    , private modalService: BsModalService
    , private route: ActivatedRoute
    , private companyProfileService: CompanyProfileService
    , private screeningService: ScreeningQuestionService

  ) {

    try {
      this.UserInfo = appConfig.UserInfo

    } catch  { }

  }

  isJobPushed: any;
  isReCreate: any;
  isdateDisable: any;
  isClosed: any;
  isjobowner: any;
  isvalidNot: any;
  mintoDate: any = '';
  isScrap: any;

  ngOnInit() {
    ////////////////////  add code prakash singh //////////
    //this.viewid = localStorage.getItem('jobid');
    this.isReCreate = localStorage.getItem('isRecreate');
    this.isvalidNot = localStorage.getItem('validNot');
    this.mintoDate = new Date();
    //this.UserId = JSON.parse(localStorage.getItem('userID'));
    this.mintoDate.setDate(this.mintoDate.getDate() + 1);
    // this.CurrentDate.setFullYear(new Date().getFullYear() , new Date().getMonth() + 1,0);

    // if(this.viewid)
    // {
    //   this.GetJobDetail(this.viewid);
    // }
    if (this.isReCreate) {
      this.EditFormShow = true;
      this.isJobPushed = true;
      this.isScrap = true;
      this.isClosed = true;
      this.isjobowner = true;
      this.isdateDisable = localStorage.getItem('isdateDisable');

    }
    else {
      localStorage.removeItem('isdateDisable');
    }
    /////////////////////  end code  ////////////////////
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    var data = this.route.snapshot.paramMap.get('Showpushdata');
    // if(data){

    //   this.getbackData(data);
    //   this.EditOpeningFormShow=true
    //   this.EditFormShow=true
    // }else{}
    // window.scroll(0, 0);
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'id',
    //   textField: 'name',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 6,
    //   allowSearchFilter: true
    // };
    // this.GetGender();

    this.EditJobForm = this.formBuilder.group({
      uname: ['', [Validators.required,]],
      JobTitle: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      CompanyName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Specialization: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ShiftTime: ['', [Validators.nullValidator,]],
      ojtDuration: ['', [Validators.nullValidator,]],
      IsOjt: ['', [Validators.nullValidator,]],
      Weight: ['', [Validators.nullValidator,]],
      heightFeet: ['', [Validators.nullValidator,]],
      heightInch: ['', [Validators.nullValidator,]],
      JoiningPriorityId: ['', [Validators.required,]],
      Scheme: ['', [Validators.nullValidator,]],
      SchemeID: ['', [Validators.nullValidator]],
      Name: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      JobDescription: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      Email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      EmailPublic: ['', [Validators.required,]],
      RolesresPonsiblty: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Keyword: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      LandlineNumber: ['', [Validators.nullValidator,]],
      MinExp: ['', [Validators.required,]],
      MaxExp: ['', [Validators.required,]],
      AgeMin: ['', [Validators.nullValidator,]],
      AgeMax: ['', [Validators.nullValidator,]],
      OtherDetail: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ISprobationtime: ['', [Validators.nullValidator,]],
      Male: ['', [Validators.nullValidator,]],
      Female: ['', [Validators.nullValidator,]],
      Transgender: ['', [Validators.nullValidator,]],
      ProbationDuration: ['', [Validators.nullValidator,]],
      MinEducation: ['', [Validators.required,]],
      ValidDate: ['', [Validators.required,]],
      jobId: ['', [Validators.required,]],
      IndustryArea: ['', [Validators.required]],
      FunctionalArea: ['', [Validators.required]],

      ///////////////////////////// add code prakash singh 24-04-2019 ////////
      isScreeming: ['', [Validators.nullValidator,]],
      screening: ['', [Validators.nullValidator,]],
      question: ['', [Validators.compose([CustomValidators.removeSpaces])]],
      Allowance: ['', [Validators.nullValidator,]],
      ////////////////////////// end code  ///////////////////////////////////
    });

    this.EditJobOpeningForm = this.formBuilder.group({
      jobdetailsid: ['', [Validators.nullValidator,]],
      jobId: ['', [Validators.nullValidator,]],
      StateID: ['', [Validators.required,]],
      DistrictID: ['', [Validators.nullValidator,]],
      CityID: ['', [Validators.nullValidator,]],
      NoOfVacancy: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      NetSalary: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      minNetSalary: ['', [Validators.nullValidator,]],
      maxNetSalary: ['', [Validators.nullValidator,]],
      LanguageId: ['', [Validators.nullValidator,]],
      MaxCtc: ['', [Validators.required,]],
      MinCtc: ['', [Validators.required,]],

      // for contact in job opening

      ContactName: ['', [, Validators.compose([CustomValidators.removeSpaces])]],
      ContactDesignation: ['', [Validators.compose([CustomValidators.removeSpaces])]],
      ContactMobile: ['', [Validators.compose([CustomValidators.validMobile])]],
      ContactEmail: ['', [Validators.compose([CustomValidators.vaildEmail])]],
      ContactEmailPublic: ['false', [Validators.nullValidator,]],
      ContactLandlineNumber: ['', [Validators.nullValidator,]],
      Contactid: [''],

    });
    // this.viewid = localStorage.getItem('jobid');
    // this.IsAgencyJob=true;
    if (this.viewid) {
      this.viewid = localStorage.getItem('viewid');
      this.Ispush = localStorage.getItem('Ispushed');
      this.IsAgencyJob = false;
    }
    this.GetSalaryComponent();
    this.GetJobDetail(this.viewid);
    this.GetAllStates();
    this.GetAllLanguage();
    this.GetAllJoiningPriority();
    this.GetMinEducation();
    this.GetAllFunctionArea();
    this.GetAllIndustryArea();
    // this.GetAllSector(0);
    localStorage.removeItem('jobid');
    localStorage.removeItem('viewid');
    localStorage.removeItem('Ispushed');
    localStorage.removeItem('isRecreate');
    this.SectorForm = this.formBuilder.group({
      SectorID: ['', Validators.nullValidator,],
      TradeID: ['', [Validators.nullValidator,]],
    });
  }
  OpeningModel(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
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

  declineModel(): void {
    this.modalRef.hide();
  }

  Schemevalue: any;
  Schemelist: any;
  schemelist: any = [];
  Getallscheme() {
    this.Schemelist = {
      'HSTPLRequest': {
        "clientKey": "ROJGAAR_ANDROID",
        'data': '',
        'typeFor': 'GetAllScheme',
      }
    }
    this.spinnerService.show();
    this.masterService.Getallscheme(this.Schemelist).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce != null) {
        this.schemelist = JSON.parse(this.DBResponce.hstplResponse.data);
      }
      else {
        this.schemelist = [];
      }
    })
  }

  RevokeJob(id: any, UserId: any) {
    localStorage.setItem('userID', UserId);
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.spinnerService.show();
    this.jobpostService.RevokeJob(id, this.UserId, AdminId).subscribe(res => {
      this.DbResponce = res
      this.spinnerService.hide();
      if (this.DbResponce.responseResult) {
        this.toastrService.success(this.DbResponce.message);
        this.modalRef.hide();
        // this.jobdetail = [];
      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
  }

  scrapJobs: any
  scrapJob(id: any, UserID: any, item: any, scrapJob: any) {
    this.scrapJobs = scrapJob;
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'))
    this.PageNumber = 0;
    this.spinnerService.show();
    this.jobpostService.scrapJob(id, this.UserId, AdminId).subscribe(res => {
      this.DbResponce = res
      this.spinnerService.hide();
      if (this.DbResponce.responseResult != null) {
        this.jobpostService.postToYS(id).subscribe(res => {
        })
        this.toastrService.success(this.DbResponce.message);
        this.modalRef.hide();
        this.GetJobDetail(item.jobId);
        // this.jobdetail = [];
      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
  }

  closeJob: any;
  CloseJob(id: any, userID: any, CloseJob: any, item: any) {
    this.closeJob = CloseJob;
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'))
    this.spinnerService.show();
    this.jobpostService.CloseJob(AdminId, id, userID).subscribe(res => {
      this.DbResponce = res
      this.spinnerService.hide();
      if (this.DbResponce.responseResult != null) {
        this.jobpostService.postToYS(id).subscribe(res => {
        })
        this.toastrService.success(this.DbResponce.message);
        this.modalRef.hide();
        this.GetJobDetail(item.jobId);
        // this.jobdetail = [];
      } else {
        this.toastrService.error(this.DbResponce.message);
      }
    });
  }

  // Genderformarray: any = [];
  // onchangeGender(Gender: string, ischecked: boolean) {
  //   if (ischecked) {
  //     this.Genderformarray.push(Gender);

  //   } else {
  //     let index = this.Genderformarray.indexOf(Gender);
  //     this.Genderformarray.splice(index, 1);
  //   }
  // }
  LangFormArray: any = [];
  onItemSelect(item: any) {
    this.LangFormArray.push(item.name);
  }
  onItemDeSelect(item: any) {
    // this.openingdetail.LanguageId.splice(item.id, 1)
    //this.LangFormArray.splice(item.name, 1);
    let index = this.LangFormArray.indexOf(item.name);
    this.LangFormArray.splice(index, 1);
  }
  // onItemSelect(item: any) {
  //   this.LangFormArray.push(item.name);
  // }

  // onItemDeSelect(item: any) {
  //   this.LangFormArray.splice(item.name, 1)
  // }
  onDeSelectAll(items: any) {
    this.LangFormArray = [];
  }
  onSelectAll(items: any) {
    for (var i = 0; i < items.length; i++) {
      this.LangFormArray.push(items[i].name);
    }
  }

  probation: boolean = false;
  probationcondition: any;
  SetProbation(probcon: any) {
    if (probcon == 1) {
      this.probation = true;
      this.jobFromvalid = false;
    } else {
      this.probation = null;
      this.jobFromvalid = true;
      this.EditJobForm.controls['ProbationDuration'].reset();
    }
    this.probationcondition = probcon;
  }

  //// Code for the allowance component added by Arti Ahirwar on 10 July 2019 //////
  SalaryBenifitRes: any = []
  GetSalaryComponent() {
    var postDataSalary = {
      'HSTPLRequest': {
        'data': '',
        'typeFor': 'GetBenefitDetails'
      }
    }
    try {
      this.spinnerService.show();
      this.masterService.GetBenifitDetail(postDataSalary).subscribe(res => {
        this.DBResponce = res;
        this.spinnerService.hide();
        if (this.DBResponce != null) {
          this.SalaryBenifitRes = JSON.parse(this.DBResponce.hstplResponse.data);
        }
        else {
          this.SalaryBenifitRes = [];
        }
      });
    } catch  { }
  }

  AllowanceArray: any = [];
  ComponentId: number;
  OnChangeAllowance(isChecked: boolean, id: any, i: any) {
    if (isChecked) {
      //let checked =  $("#" + "Allowance" + i).val();
      this.AllowanceArray.push(id)
    } else {
      let index = this.AllowanceArray.indexOf(id);
      this.AllowanceArray.splice(index, 1);
    }
  }
  CompanyType: any;
  isvalidDate: boolean = false;
  isViewButtonshow: boolean = false;
  serverDate: any;
  AllowanceId: any = [];
  GetEditJob(obj: any) {
    this.spinnerService.show();
    this.Getallscheme();
    if (obj.posteDby == 'Agency') {
      this.CompanyType = 1;
    }
    else {
      this.CompanyType = 0;
    }
    this.count = 1;
    this.updatejobbtn = true;
    this.EditFormShow = true;
    this.NewSectorShow = [];
    this.EditJobForm.controls['uname'].setValue(obj.userName);
    this.EditJobForm.controls['JobTitle'].setValue(obj.jobTitle);
    this.EditJobForm.controls['CompanyName'].setValue(obj.companyName);
    this.EditJobForm.controls['Name'].setValue(obj.name);
    this.EditJobForm.controls['Designation'].setValue(obj.designation);
    this.EditJobForm.controls['JobDescription'].setValue(obj.jobDescription);
    this.EditJobForm.controls['Mobile'].setValue(obj.mobile);
    this.EditJobForm.controls['Email'].setValue(obj.email);
    this.EditJobForm.controls['EmailPublic'].setValue(obj.emailPublic);
    this.EditJobForm.controls['RolesresPonsiblty'].setValue(obj.rolesresPonsiblty);
    this.EditJobForm.controls['Keyword'].setValue(obj.keyword);
    this.EditJobForm.controls['LandlineNumber'].setValue(obj.landlineNumber);
    this.EditJobForm.controls['Specialization'].setValue(obj.specialization);
    this.EditJobForm.controls['MinExp'].setValue(obj.minExp);
    this.minExp = obj.minExp;
    this.EditJobForm.controls['MaxExp'].setValue(obj.maxExp);
    this.maxExp = obj.maxExp;
    this.EditJobForm.controls['AgeMin'].setValue(obj.ageMin);
    this.minAge = obj.ageMin;
    this.maxAge = obj.ageMax;
    this.EditJobForm.controls['AgeMax'].setValue(this.maxAge);
    this.EditJobForm.controls['OtherDetail'].setValue(obj.otherDetail);
    this.probation = obj.iSprobationtime ? true : false;
    this.EditJobForm.controls['ISprobationtime'].setValue(obj.iSprobationtime ? 'true' : 'false');
    this.EditJobForm.controls['Male'].setValue(obj.male);
    this.EditJobForm.controls['Female'].setValue(obj.female);
    this.EditJobForm.controls['Transgender'].setValue(obj.transgender);
    this.EditJobForm.controls['ProbationDuration'].setValue(obj.probationDuration);
    this.EditJobForm.controls['MinEducation'].setValue(obj.minEducation);
    this.EditJobForm.controls['jobId'].setValue(obj.jobId);
    ////////////////  code edit prakash singh ///////////////
    //this.EditJobForm.controls['ValidDate'].setValue(new Date(obj.validDate));
    this.CurrentDate.setDate(this.CurrentDate.getDate() + 1);
    //this.EditJobForm.controls['ValidDate'].setValue(new Date(obj.validDate));
    //////////////// end code 08-04-2018 ///////////////////////

    this.EditJobForm.controls['ojtDuration'].setValue(obj.ojtDuration);
    this.ojt = obj.isOjt ? true : false;
    this.EditJobForm.controls['IsOjt'].setValue(obj.isOjt ? 'true' : 'false');
    this.EditJobForm.controls['Weight'].setValue(obj.weight);
    this.EditJobForm.controls['heightFeet'].setValue(obj.heightFeet);
    this.EditJobForm.controls['heightInch'].setValue(obj.heightInch);
    this.EditJobForm.controls['ShiftTime'].setValue(obj.shiftTime);
    this.EditJobForm.controls['JoiningPriorityId'].setValue(obj.joiningPriorityId);
    this.EditJobForm.controls["IndustryArea"].setValue(obj.industryAreaId);
    this.EditJobForm.controls["FunctionalArea"].setValue(obj.functionalAreaId);
    if (obj.schemeId != null) {
      this.EditJobForm.controls["Scheme"].setValue(obj.schemeId);
      this.GetAllSector(obj.schemeId);
      this.SchemeId = obj.schemeId;
      this.EditJobForm.controls["SchemeID"].setValue(obj.schemeId);
    } else {
      this.GetAllSector(0);
      this.SchemeId = 0;
    }

    //////////Changes made by arti 10-07-2019 -> To show and edit allowance ///////////////
    if (obj.otherBenifitsId != "") {
      this.AllowanceId = obj.otherBenifitsId.split(",");
      if (this.AllowanceId != '' || this.AllowanceId != null) {
        for (var j = 0; j < this.AllowanceId.length; j++) {
          this.AllowanceArray.push(parseInt(this.AllowanceId[j]));
          var b = this.AllowanceId[j];
          // let CheckData = (this.SalaryBenifitRes).filter(function (entry) {
          //   return entry.ID == b;
          // });
          // if (this.AllowanceId[j] == CheckData[0].ID) {
          //   $("#Allowance" + j).prop("checked", true);
          // }
        }
      }
    }

    //////// End here ///////////


    this.sectortrade = obj.sectorTradeList;
    this.spinnerService.hide();

    ////////////////////////////  add  code prakash singh 24-04-2019 screening view /////////


    ///////////////////Changes made by HEM 06-09-2019 -> Changes in replicate job to set screening  ///////////////
    if (this.isReCreate) {
      // obj.isscreening = false;
      this.isScreening = obj.isscreening;
      if (this.isScreening == true) {
        this.isViewButtonshow = true;
        this.isChecked = true;
      }
      //this.isChecked = false;
      //this.EditJobForm.controls['isScreeming'].setValue(this.isScreening);
    } else {
      ///////////Ends Here/////////
      if (obj.isscreening) {
        this.isScreening = obj.isscreening;
        this.EditJobForm.controls['isScreeming'].setValue(obj.isscreening);
      } else {
        this.isScreening = false;
      }
      if (this.isScreening) {
        this.isChecked = true;
        this.viewQuestion();
      } else {
        this.isChecked = false;
        this.isViewButtonshow = false;
      }
    }
    var isRecreatedJob = obj.isreCreatedJob;
    if (this.isdateDisable) {
      // this.isChecked = false;
      this.isvalidDate = false;
      this.masterService.GetServerDateTime().subscribe(res => {
        if (res) {
          this.serverDate = res;
          this.mintoDate = moment.utc(this.serverDate).toDate();
          let validToDate = this.mintoDate.setDate(this.mintoDate.getDate() + 1);
          this.EditJobForm.controls['ValidDate'].setValue(new Date(validToDate));
        } else {
          this.mintoDate = new Date();
          let validToDate = this.mintoDate.setDate(this.mintoDate.getDate() + 1);
          this.EditJobForm.controls['ValidDate'].setValue(new Date(validToDate));
        }
      })
    } else {
      this.isvalidDate = true;
      this.EditJobForm.controls['ValidDate'].setValue(new Date(obj.validDate));
      // this.EditJobForm.controls['ValidDate'].setValue(new Date(this.CurrentDate));
    }

    /////////////////////////// end screening view ////////////////////////////////////////

    for (var i = 0; i < this.sectortrade.length; i++) {
      let obj = {
        "id": this.sectortrade[i].id,
        "sectorName": this.sectortrade[i].sectorName,
        "tradeName": this.sectortrade[i].tradeName,
        "sectorId": this.sectortrade[i].sectorId,
        "tradeId": this.sectortrade[i].tradeId,
        "isActive": this.sectortrade[i].isActive
      }
      this.NewSectorShow.push(obj);
    }
    this.SectorForm.controls['SectorID'].setValue("");
    this.SectorForm.controls['TradeID'].setValue("");

  }

  ojt: boolean = false;
  sectortrade: any = [];
  SetOjt(probcon: any) {
    if (probcon == 1) {
      this.ojt = true;
      this.jobFromvalid = false;
    } else {
      this.ojt = null;
      this.jobFromvalid = true;
      this.EditJobForm.controls['ojtDuration'].setValue("");
    }
  }

  ValidOjt() {
    if (this.EditJobForm.value.ojtDuration == '') {
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
    }
  }

  ValidProbation() {
    if (this.EditJobForm.value.ProbationDuration == '') {
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
    }
  }
  OpeningData: any = [];
  NetSalaryMsg = true;
  getJobOpeningId(data: any) {
    this.OpeningData = [];
    this.OpeningData = data;
    this.count = 1;
    this.EditOpeningFormShow = true;
    this.EditJobOpeningForm.controls['jobdetailsid'].setValue(data.jobdetailsid);
    this.EditJobOpeningForm.controls['StateID'].setValue(data.stateID);
    this.GetAllDistrict(data.stateID, "");
    if (data.districtID == 0) {
      this.EditJobOpeningForm.controls[('DistrictID')].setValue('');
    }
    else {
      this.EditJobOpeningForm.controls['DistrictID'].setValue(data.districtID);
    }
    this.GetAllCity(data.stateID, "");
    this.EditJobOpeningForm.controls['NoOfVacancy'].setValue(data.noOfVacancy);
    if (data.cityId == 0) {

      this.EditJobOpeningForm.controls[('CityID')].setValue('');
    }
    else {
      this.EditJobOpeningForm.controls['CityID'].setValue(data.cityId);
    }
    this.LangFormArray = data.languageId;
    this.selectedItems = this.LangFormArray;
    this.EditJobOpeningForm.controls['LanguageId'].setValue(this.LangFormArray);
    this.EditJobOpeningForm.controls['MaxCtc'].setValue(data.maxCtc);
    // this.maxCtc = data.maxCtc;
    this.EditJobOpeningForm.controls['MinCtc'].setValue(data.minCtc);
    // this.minCtc = data.minCtc;
    //this.EditJobOpeningForm.controls['NetSalary'].setValue(data.netSalary);
    this.EditJobOpeningForm.controls['minNetSalary'].setValue(data.netSalary);
    this.EditJobOpeningForm.controls['maxNetSalary'].setValue(data.maxNetSalary);
    this.EditJobOpeningForm.controls['jobId'].setValue(data.jobId);

    //////////////////////// add new code prakash Singh  ////////////////////////////////////////////
    this.EditJobOpeningForm.controls['ContactName'].setValue(data.contactName);
    this.EditJobOpeningForm.controls['ContactDesignation'].setValue(data.contactDesignation);
    this.EditJobOpeningForm.controls['ContactMobile'].setValue(data.contactMobile);
    this.EditJobOpeningForm.controls['ContactEmail'].setValue(data.contactEmail);
    this.EditJobOpeningForm.controls['ContactLandlineNumber'].setValue(data.contactLandlineNumber);
    this.EditJobOpeningForm.controls['ContactEmailPublic'].setValue(data.isContactSharedPublic);
    this.EditJobOpeningForm.controls['Contactid'].setValue(data.contactid);

    //////////////////////  end code prakash Singh /////////////////////////////////////////////////    

  }

  // lstGender: any;

  // GetGender() {
  //   this.masterService.GetGender().subscribe(res => {
  //     this.lstGender = res

  //   });
  // }


  ValidateExperience(expfrom, expto) {
    let experiencefrom = expfrom;
    let experienceto = expto;
    if (parseInt(experiencefrom) > parseInt(experienceto)) {
      this.jobFromvalid = false;
      this.ExpMsg = false;
    } else {
      this.jobFromvalid = true;
      this.ExpMsg = true;
    }
  }

  ValidateAge(Max, Min) {
    let max = Max;
    let min = Min;
    if (parseInt(max) > parseInt(min)) {
      this.AgeMsg = false;
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
      this.AgeMsg = true;
    }
  }

  ValidateCtc(minctc, maxctc) {
    let Minctc = minctc;
    let Maxctc = maxctc;
    if (parseInt(Minctc) > parseInt(Maxctc)) {
      this.openingformValid = false;
      this.CtcMsg = false;
    } else {
      this.openingformValid = true;
      this.CtcMsg = true;
    }

  }

  mandatorySign: boolean = true;
  onChangeJobType(jobType: any) {
    if (jobType != "Freelancer") {
      this.mandatorySign = true;
    }
    else {
      this.mandatorySign = false;
    }
  }

  SchemeId: number = 0;
  SchemeChange(schemeId) {
    if (schemeId != null && schemeId != '') {
      this.NewSectorShow = [];
      this.NewSecterTempData = [];
      this.SchemeId = schemeId;
    } else {
      this.SchemeId = 0;
    }
    this.NewSectorShow = [];
    this.NewSecterTempData = [];
    this.Sector = [];
    this.Trade = [];
    this.SectorForm.controls['SectorID'].setValue("");
    this.SectorForm.controls['TradeID'].setValue("");
    this.GetAllSector(this.SchemeId);
  }

  Sector: any = [];
  GetAllSector(SchemeId) {
    try {
      this.masterService.GetAllMrigsSector(SchemeId).subscribe(res => {
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
    if (trade != -'') {
      this.SectorForm.controls[('TradeID')].setValue('');
      try {
        this.masterService.GetAllMrigsTrade(this.SchemeId, trade).subscribe(res => {
          this.DBResponce = res;
          if (this.DBResponce.lstTrade != null) {
            this.Trade = this.DBResponce.lstTrade;
          }
          else {
            this.Trade = [];
          }
        });
      } catch  { }
    } else {
      this.Trade = [];
    }
  }

  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
        this.EditJobOpeningForm.controls.DistrictID.setValue('');
        this.lstState = this.lstState;
      });
    } catch  { }
  }

  private GetAllLanguage() {
    try {
      this.masterService.GetAllLanguage().subscribe(res => {
        this.lstAllLanguage = res;
      });
    } catch  { }
  }

  private GetAllJoiningPriority() {
    try {
      this.masterService.GetJoiningPrority().subscribe(res => {
        this.joiningprioritys = res
      });
    } catch  { }
  }

  private GetMinEducation() {
    try {
      this.masterService.GetAllMinEducation().subscribe(res => {
        this.mineducations = res
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    this.EditJobOpeningForm.controls['DistrictID'].setValue('');
    this.GetAllDistrict(statename, "profile");
    this.GetAllCity(statename, "profile");
  }
  private GetAllDistrict(id: any, From: string) {
    if (id != '') {
      this.EditJobOpeningForm.controls[('DistrictID')].setValue('');
      try {
        this.masterService.GetAllDistrict(id).subscribe(res => {
          this.district = res;
        });
      } catch  { }
    } else {
      this.district = [];
    }
  }

  GetAllCity(id: any, From: string) {
    if (id != '') {
      this.EditJobOpeningForm.controls[('CityID')].setValue('');
      this.masterService.GetAllCity(id).subscribe(res => {
        this.city = res
        if (this.city != null && this.city.length > 0) {
          this.city = this.city;
        }
      });
    } else {
      this.city = [];
    }
  }

  adminId: any;
  UserId: any;
  companyid: any;
  // userID
  sectorTradeList: any = [];
  sectorstatus: boolean = true;
  JobType: any;
  GetJobDetail(id: any) {
    this.FinalAllowance = '';
    this.AllowanceArray = [];
    this.spinnerService.show()
    var companyid = JSON.parse(localStorage.getItem('companyid'));
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
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
      'CompanyId': companyid,
      'AdminId': this.adminId,
      'JobKeyword': '',
      "JobInDate": '2018-01-22T00:30:37.000Z',
      "JobToDate": '2030-01-22T00:30:37.000Z',
    };
    this.jobpostService.GetAllJobs(this.PushData).subscribe(res => {
      this.response = res;
      if (this.response != null) {
        // this.jobs = this.response;
        this.jobs = this.response.lstJobRequest[0];
        var sectortrade = this.jobs.sectorTradeList;
        if (sectortrade.length) {
          this.sectorstatus = true;
        }
        else {
          this.sectorstatus = false;
        }
        this.JobType = this.response.lstJobRequest[0]['shiftTime'];
      }
      if (this.isReCreate) {
        this.GetEditJob(this.jobs);
      }
      this.spinnerService.hide();
      // this.sectorTradeList = this.jobs.lstJobRequest.sectorTradeList;
      this.jobpostService.GetJobOpeningDetail(this.viewid, this.UserId, this.adminId).subscribe(res => {
        this.jobopeningdetail = res;
      });
    });
  }

  jobdetail: any = {};
  updatejobbtn: boolean = true;
  FinalAllowance: string;
  Updatejob() {
    
    // var landlineNumber = this.EditJobForm.value.LandlineNumber;
    // var landlineregex = '000000000000';
    // if (this.EditJobForm.value.LandlineNumber != '' && landlineNumber.match(landlineregex)) {
    //   this.toastrService.error("Please enter valid landline no");
    //   return false
    // }
    //   TRIM Functionality 
    if (this.EditJobForm.controls.uname.value.trim() == '') {
      this.toastrService.error("Please enter user name")
      return false
    }
    if (this.EditJobForm.controls.JobTitle.value.trim() == '') {
      this.toastrService.error("Please enter job title")
      return false
    }
    if (this.EditJobForm.controls.CompanyName.value.trim() == '') {
      this.toastrService.error("Please enter company name")
      return false
    }
    // if (this.EditJobForm.controls.ValidDate.value) {
    //   if(this.EditJobForm.controls.ValidDate.value <= this.CurrentDate){
    //   this.toastrService.error("Valid up to date must be greater than current date.")
    //   return false
    // }
    // }
    if (this.EditJobForm.controls.JobDescription.value.trim() == '') {
      this.toastrService.error("Please enter job description")
      return false
    }
    if (this.EditJobForm.controls.RolesresPonsiblty.value.trim() == '') {
      this.toastrService.error("Please enter roles and responsibilities")
      return false
    }
    if (this.EditJobForm.controls.Name.value.trim() == '') {
      this.toastrService.error("Please enter contact person name ")
      return false
    }
    if (this.EditJobForm.controls.Designation.value.trim() == '') {
      this.toastrService.error("Please Enter Contact Person Designation")
      return false
    }
    //   TRIM Functionality End here

    if (this.EditJobForm.value.ISprobationtime == 'true') {
      if (this.EditJobForm.value.ProbationDuration <= 0) {
        this.toastrService.error('Please enter probation duration');
        return false;
      }
    }
    if (this.EditJobForm.value.IsOjt == 'true') {
      if (this.EditJobForm.value.ojtDuration <= 0) {
        this.toastrService.error('Please enter OJT duration');
        return false;
      }
    }
    if (this.maxAge > 0 || this.minAge >= 15) {
      this.statusAge = true;
    }
    if (this.statusAge == false || (this.maxAge > 15 && this.minAge == 0)) {
      this.toastrService.error("Please select minimum age 15.");
      return false;
    }


    if (this.minAge > 0 || this.maxAge > 0) {
      if (this.minAge < 15) {
        this.toastrService.error('Please select minimum age 15.');
        return false;
      }
    }

    if (this.isChecked && this.editQuestionList < 1 && this.finalSubmitQuestion.length < 1) {
      this.isChecked = false;
      this.toastrService.error("Please add atleast one screening question.");
      window.scroll(0, 0);
      return false;
    }

    // else  if (this.EditJobForm.controls.Female.value != 2) {
    //   this.toastrService.error("Please enter Gender ")
    //   return false
    // } else  if (this.EditJobForm.controls.Transgender.value != 3) {
    //   this.toastrService.error("Please enter Gender ")
    //   return false
    // }



    this.FinalAllowance = this.AllowanceArray.toString();
    if (this.count == 1) {
      this.isdateDisable = localStorage.removeItem('isdateDisable');
      this.spinnerService.show();
      this.updatejobbtn = false;
      this.jobdetail.PosteDby = "";
      this.jobdetail.JobId = this.viewid;
      // this.jobdetail.PostedBy = this.EditJobForm.value.Agency;
      // this.jobdetail.uname = this.EditJobForm.value.uname;    
      this.jobdetail.JobTitle = this.EditJobForm.value.JobTitle;
      this.jobdetail.CompanyName = this.EditJobForm.value.CompanyName;
      this.jobdetail.Name = this.EditJobForm.value.Name;
      this.jobdetail.Designation = this.EditJobForm.value.Designation;
      this.jobdetail.JobDescription = this.EditJobForm.value.JobDescription;
      this.jobdetail.specialization = this.EditJobForm.value.Specialization;
      this.jobdetail.Mobile = this.EditJobForm.value.Mobile;
      this.jobdetail.Email = this.EditJobForm.value.Email;

      this.jobdetail.schemeId = this.EditJobForm.value.Scheme;
      this.jobdetail.EmailPublic = this.EditJobForm.value.EmailPublic;
      this.jobdetail.RolesresPonsiblty = this.EditJobForm.value.RolesresPonsiblty;
      this.jobdetail.Keyword = this.EditJobForm.value.Keyword;
      this.jobdetail.LandlineNumber = this.EditJobForm.value.LandlineNumber;
      this.jobdetail.MinExp = this.minExp;
      this.jobdetail.MaxExp = this.maxExp;
      this.jobdetail.AgeMin = this.minAge;
      this.jobdetail.AgeMax = this.maxAge;
      this.jobdetail.OtherDetail = this.EditJobForm.value.OtherDetail;
      this.jobdetail.Male = this.EditJobForm.value.Male == true ? 1 : this.EditJobForm.value.Male == '1' ? 1 : 0;
      this.jobdetail.Female = this.EditJobForm.value.Female == true ? 2 : this.EditJobForm.value.Female == '2' ? 2 : 0;
      this.jobdetail.Transgender = this.EditJobForm.value.Transgender == true ? 3 : this.EditJobForm.value.Transgender == '3' ? 3 : 0;
      this.jobdetail.ProbationDuration = this.EditJobForm.value.ProbationDuration;
      this.jobdetail.MinEducation = this.EditJobForm.value.MinEducation;
      this.jobdetail.ValidDate = this.EditJobForm.value.ValidDate;
      this.jobdetail.ISprobationtime = this.EditJobForm.value.ISprobationtime;
      // this.jobdetail.ojtDuration = this.EditJobForm.value.ojtDuration;
      this.jobdetail.ojtDuration = this.EditJobForm.value.ojtDuration != '' && this.EditJobForm.value.ojtDuration != null ? this.EditJobForm.value.ojtDuration : 0;
      this.jobdetail.IsOjt = this.EditJobForm.value.IsOjt;
      this.jobdetail.Weight = this.EditJobForm.value.Weight == '' ? '0' : this.EditJobForm.value.Weight;
      this.jobdetail.heightFeet = this.EditJobForm.value.heightFeet == '' ? '0' : this.EditJobForm.value.heightFeet;
      this.jobdetail.heightInch = this.EditJobForm.value.heightInch == '' ? '0' : this.EditJobForm.value.heightInch;
      this.jobdetail.ShiftTime = this.EditJobForm.value.ShiftTime;
      this.jobdetail.JoiningPriorityId = this.EditJobForm.value.JoiningPriorityId;
      this.jobdetail.FunctionalArea = this.EditJobForm.value.FunctionalArea;
      this.jobdetail.IndustryArea = this.EditJobForm.value.IndustryArea;
      this.jobdetail.sectorTradeList = this.jobs.sectorTradeList;
      this.jobdetail.sectorTradeList = this.NewSectorShow;
      this.jobdetail.Allowance = this.FinalAllowance;
      if (this.isChecked) {
        this.jobdetail.Isscreening = true;
      } else {
        this.jobdetail.Isscreening = false;
      }
      this.NewSectorShow = [];
      this.NewSectorData = [];
      this.jobpostService.UpdateJob(this.jobdetail).subscribe(res => {
        this.DbResponcse = res;
        if (this.DbResponcse.responseResult == true) {
          this.EditFormShow = false;
          //this.updatejobbtn = true;
          this.spinnerService.hide();
          this.toastrService.success(this.DbResponcse.message);
          this.isReCreate = false;
          this.CurrentDate = new Date();
          this.GetJobDetail(this.DbResponcse.id);
        } else {
          this.updatejobbtn = true;
          this.toastrService.error(this.DbResponcse.message);
          this.count = 1;
        }
        //  this.GetJobDetail(this.DbResponcse.id);
      });
    } else {
      // this.updatejobbtn = true;
      this.count = 0;
    }
    this.count++;
  }

  jopostingdata: any = {};
  minNetSalary: number = 0;
  maxNetSalary: number = 0;
  UpdateJobOpeningDetails(data: any, jobId: any) {//Use to update the location wise opening Details.
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var adminid = JSON.parse(localStorage.getItem('phpadminid'));
    this.minNetSalary = parseInt(this.EditJobOpeningForm.value.minNetSalary);
    this.maxNetSalary = parseInt(this.EditJobOpeningForm.value.maxNetSalary);
    this.minCtc = this.EditJobOpeningForm.value.MinCtc != '' ? parseInt(this.EditJobOpeningForm.value.MinCtc) : 0;
    this.maxCtc = this.EditJobOpeningForm.value.MaxCtc != '' ? parseInt(this.EditJobOpeningForm.value.MaxCtc) : 0;

    if (this.JobType != "Freelancer") {
      if (this.minCtc == 0 && this.maxCtc == 0) {
        this.toastrService.error("Add CTC Min and Max Option");
        return false;
      }

      if (this.EditJobOpeningForm.value.NetSalary > this.maxCtc) {
        this.toastrService.error("In Hand Salary Must be Less Than or Equal to Max CTC");
        return false;
      }
    }
    if ((this.EditJobOpeningForm.value.minNetSalary != '' && this.EditJobOpeningForm.value.maxNetSalary == '') || (this.EditJobOpeningForm.value.minNetSalary == '' && this.EditJobOpeningForm.value.maxNetSalary != '')) {
      this.toastrService.error("Please enter min and max in hand salary");
      return false;
    }
    else {
      if ((this.minNetSalary > this.maxNetSalary)) {
        this.toastrService.error("Minimum in hand salary should not be greater than maximum in hand salary");
        return false;
      }
      if (this.EditJobOpeningForm.value.minNetSalary != "") {
        if ((this.minNetSalary > this.minCtc)) {
          this.toastrService.error("Minimum in hand salary should not be greater than minimum ctc");
          return false;
        }
      }
      if (this.EditJobOpeningForm.value.maxNetSalary != "") {
        if ((this.maxNetSalary > this.maxCtc)) {
          this.toastrService.error("Maximum in hand salary should not be greater than maximum ctc");
          return false;
        }
      }
    }

    if (this.EditJobOpeningForm.controls['NetSalary'].value > this.maxCtc) {
      this.checkNetSalary();
    } else {
      if (this.minCtc < 4999) {
        this.toastrService.error("Minimum CTC Must be Greater Than Or Equal to 5000");
        this.status = false;
        return false;
      } else {
        this.status = true;
      }
    }

    if (this.minCtc > this.maxCtc) {
      this.toastrService.error("Max CTC Must be Greater Than Min CTC");
      return false;
    }


    if (this.maxCtc > 0 || this.minCtc >= 5000) {
      this.status = true;
    }

    if (this.status == false || (this.maxCtc > 0 && this.minCtc == 0)) {
      this.toastrService.error("Min CTC Must be Greater Than or Equal to 5000");
      return false;
    }

    if (this.EditJobOpeningForm.value.NetSalary > this.maxCtc) {//rajeev 
      // this.toastrService.error("Max CTC must be greter than or equal to Net Salary");
      return false;
    }
    // var landline = this.EditJobOpeningForm.value.ContactLandlineNumber;
    // var regex = "000000000000"
    // if (landline != null && landline.length != '' && landline.length != undefined) {
    //   if (landline.length < 12 || landline.match(regex)) {
    //     this.toastrService.error("Please enter valid landline no.");
    //     return false;
    //   }
    // }
    var mobile = this.EditJobOpeningForm.value.ContactMobile
    if (mobile != null && mobile.length != '' && mobile.length != undefined) {
      if (this.EditJobOpeningForm.value.ContactName == '' || this.EditJobOpeningForm.value.ContactName == null || this.EditJobOpeningForm.value.ContactName == undefined) {
        this.toastrService.error("Please enter contact person name");
        return false;
      }
      if (this.EditJobOpeningForm.value.ContactDesignation == '' || this.EditJobOpeningForm.value.ContactDesignation == null || this.EditJobOpeningForm.value.ContactDesignation == undefined) {
        this.toastrService.error("Please enter contact person designation");
        return false;
      }
    }

    if (this.count == 1) {
      if (this.ValidatePubilcReg()) {
        this.spinnerService.show();
        this.JobFormDesable = false;
        this.jopostingdata.jobdetailsid = this.EditJobOpeningForm.value.jobdetailsid == null ? 0 : this.EditJobOpeningForm.value.jobdetailsid;
        this.jopostingdata.StateID = this.EditJobOpeningForm.value.StateID;
        // this.GetAllDistrict(this.EditJobOpeningForm.value.StateID, "");
        this.jopostingdata.DistrictID = this.EditJobOpeningForm.value.DistrictID == '' ? 0 : this.EditJobOpeningForm.value.DistrictID;
        // this.GetAllCity(this.EditJobOpeningForm.value.CityID, "");
        this.jopostingdata.CityID = this.EditJobOpeningForm.value.CityID == '' ? 0 : this.EditJobOpeningForm.value.CityID;
        this.jopostingdata.NoOfVacancy = this.EditJobOpeningForm.value.NoOfVacancy;
        this.jopostingdata.LanguageId = this.EditJobOpeningForm.value.LanguageId;

        this.jopostingdata.MaxCtc = this.EditJobOpeningForm.value.MaxCtc;
        this.jopostingdata.MinCtc = this.EditJobOpeningForm.value.MinCtc;


        // this.jopostingdata.MaxCtc = this.maxCtc;
        // this.jopostingdata.MinCtc = this.minCtc;
        // this.jopostingdata.NetSalary = this.EditJobOpeningForm.value.NetSalary == null || this.EditJobOpeningForm.value.NetSalary == '' ? 0 : this.EditJobOpeningForm.value.NetSalary;
        this.jopostingdata.NetSalary = this.EditJobOpeningForm.value.minNetSalary == null || this.EditJobOpeningForm.value.minNetSalary == '' ? 0 : this.EditJobOpeningForm.value.minNetSalary;
        this.jopostingdata.MaxNetSalary = this.EditJobOpeningForm.value.maxNetSalary == null || this.EditJobOpeningForm.value.maxNetSalary == '' ? 0 : this.EditJobOpeningForm.value.maxNetSalary;
        this.jopostingdata.jobId = this.EditJobOpeningForm.value.jobId == null ? this.viewid : this.EditJobOpeningForm.value.jobId;
        this.jopostingdata.AdminId = adminid;
        this.jopostingdata.UserID = this.UserId;
        // this.EditJobOpeningForm.value.maxCtc = 0;
        // this.EditJobOpeningForm.value.minCtc = 0;
        ///////////////////// add new code prakash singh ////////

        this.jopostingdata.ContactName = this.EditJobOpeningForm.value.ContactName != null ? this.EditJobOpeningForm.value.ContactName : '';
        this.jopostingdata.ContactDesignation = this.EditJobOpeningForm.value.ContactDesignation != null ? this.EditJobOpeningForm.value.ContactDesignation : '';
        this.jopostingdata.ContactMobile = this.EditJobOpeningForm.value.ContactMobile != null ? this.EditJobOpeningForm.value.ContactMobile : '';
        this.jopostingdata.ContactLandlineNumber = this.EditJobOpeningForm.value.ContactLandlineNumber != null ? this.EditJobOpeningForm.value.ContactLandlineNumber : '';
        this.jopostingdata.ContactEmail = this.EditJobOpeningForm.value.ContactEmail != null ? this.EditJobOpeningForm.value.ContactEmail : '';
        this.jopostingdata.isContactSharedPublic = this.EditJobOpeningForm.value.ContactEmailPublic ? this.EditJobOpeningForm.value.ContactEmailPublic : false;
        this.jopostingdata.Contactid = this.EditJobOpeningForm.value.Contactid ? this.EditJobOpeningForm.value.Contactid : 0;


        /////////////////////// end code prakash singh ///////////////
        // if (this.EditJobOpeningForm.valid) {
        // var OpeningData =
        this.jobpostService.SetJobOpening(this.jopostingdata).subscribe(res => {
          this.DbResponcse = res;

          this.EditOpeningFormShow = false;
          if (this.DbResponcse.responseResult) {
            this.toastrService.success(this.DbResponcse.message);
            this.count = 0;
            this.spinnerService.hide();

            this.GetJobDetail(this.viewid);
          } else {
            this.toastrService.error(this.DbResponcse.message);
          }
        });
        this.EditJobOpeningForm.reset();
        // }
        // else {
        //   this.spinnerService.hide();
        //   this.toastrService.error("Please enter valid data in the form")
        // }
      }
      this.JobFormDesable = true;
    } else {
    }
    // this.count++;
  }

  openingResponse: any = [];
  postJob: any = {};
  htmlOpeningDetails: any[] = [];
  PublishJob(item: any) {
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
    var shiftTime = item.shiftTime;
    var minctc = item.minctc;
    if (shiftTime != 'Freelancer' && minctc == "0.00") {
      this.toastrService.error('Enter ctc to post the Job');
      this.modalRef.hide();
      return false;
    }

    if (item.userActiveStatus && item.userVerifyStatus) {
      localStorage.setItem('userID', item.userID);
      this.UserId = JSON.parse(localStorage.getItem('userID'));
      var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
      var companyid = JSON.parse(localStorage.getItem('companyid'));
      var id = JSON.stringify(item.jobId);
      this.modalRef.hide();
      this.spinnerService.show();
      this.jobpostService.PublishJob(id, this.UserId, AdminId).subscribe(res => {
        this.DbResponce = res
        this.spinnerService.hide();
        if (this.DbResponce.responseResult) {
          this.jobpostService.postToYS(id).subscribe(res => {
            let ys = res;
            if (ys != null) {
              this.toastrService.success('Job posted successfully');
            }
            // this.openingResponse=res
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
            //                 this.jobpostToYs(postData);
            //               }                  
            //       }       
            //   }


          })
          this.GetJobDetail(item.jobId);
        }
      })
    }

  }

  DbResponces: any;
  jobpostToYs(jobId: any) {
    this.jobpostService.postToYS(this.jobid).subscribe(res => {
      this.openingResponse = res;
    });
  }

  companresponsedb: any = [];
  companyprofile: any = '';
  comapnyimage: any = '';
  postData: any;
  PublishJob1(item: any) {
    localStorage.setItem('userID', item.userID);
    this.UserId = JSON.parse(localStorage.getItem('userID'));
    var AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    var companyid = JSON.parse(localStorage.getItem('companyid'));
    var id = item.jobId;
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
                var companyid = JSON.parse(localStorage.getItem('companyid'));
                this.postData = {
                  'FunctionalAreaId': 0,
                  'IndustryId': 0,
                  'Maxctc': 0,
                  'Minctc': 0,
                  'MaxExp': 0,
                  'MinExp': 0,
                  'PageNumber': 0,
                  'JobId': item.jobId,
                  'UserID': item.userID,
                  'CompanyId': companyid,
                  'AdminId': AdminId,
                  'JobKeyword': '',
                  "JobInDate": '2018-01-22T00:30:37.000Z',
                  "JobToDate": '2030-01-22T00:30:37.000Z',
                };
                this.GetJobDetail(item.jobId);

              } else {
                this.toastrService.error(this.DbResponce.message);
              }
            });
          }
        });
      }
    });
  }

  jobListRedirection() {
    // this.router.navigate(['/JobList']);
    this.router.navigate(['/JobList', { Redirection: btoa('1') }]);
  }

  ListRedirection() {
    this.router.navigate(['/AgencyJobList', { Redirection: btoa('1') }]);
  }

  ExitJobDetails() {
    this.EditFormShow = false;
    this.EditFormShow = false;
    this.CurrentDate = new Date();
  }

  ExitJobOpening() {
    this.EditOpeningFormShow = false;
    this.EditFormShow = false;
    this.EditJobOpeningForm.reset();
  }

  DeletOpeningJob(item) {
    this.maxCtc = 0;
    try {
      this.UserId = JSON.parse(localStorage.getItem('userID'));
      this.adminId = JSON.parse(localStorage.getItem('phpadminid'));

      this.jobpostService.DeletOpeningJob(item.jobdetailsid, this.UserId, this.adminId).subscribe(res => {
        this.DBResponce = res
        if (this.DBResponce.responseResult) {
          this.toastrService.success(this.DBResponce.message);
          this.GetJobDetail(this.viewid);
          this.modalRef.hide();
        } else {
          this.toastrService.error(this.DBResponce.message);
        }
      });
    } catch  { }
  }

  Showform() {
    this.count = 1;
    this.EditOpeningFormShow = true;
    this.EditJobOpeningForm.controls['jobdetailsid'].setValue(0);
    this.EditJobOpeningForm.controls['jobId'].setValue(this.viewid);
    this.EditJobOpeningForm.controls['StateID'].setValue('');
    this.EditJobOpeningForm.controls['DistrictID'].setValue('');
    this.EditJobOpeningForm.controls['CityID'].setValue('');
    this.EditJobOpeningForm.controls['NoOfVacancy'].setValue('');
    this.EditJobOpeningForm.controls['LanguageId'].setValue('');
    this.EditJobOpeningForm.controls['MaxCtc'].setValue('');
    this.EditJobOpeningForm.controls['MinCtc'].setValue('');
    this.EditJobOpeningForm.controls['NetSalary'].setValue('');
    // this.maxCtc = 0;
    // this.minCtc = 0;
    /////////// code for cantact person ////////////
    // for contact person for opening
    this.EditJobOpeningForm.controls['ContactName'].setValue("");
    this.EditJobOpeningForm.controls['ContactDesignation'].setValue("");
    this.EditJobOpeningForm.controls['ContactMobile'].setValue("");
    this.EditJobOpeningForm.controls['ContactEmail'].setValue("");
    this.EditJobOpeningForm.controls['ContactLandlineNumber'].setValue("");
    this.EditJobOpeningForm.controls['ContactEmailPublic'].setValue("");

    ////////////// end code for contact person ///////
  }

  private ValidatePubilcReg() {
    var IsValid = true;
    var errorMsg = "";
    var regEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (IsValid) {
      if (this.EditJobOpeningForm.value.StateID == "") {
        errorMsg += "Please Select State. <br/>";
        IsValid = false;
      }
      if (this.EditJobOpeningForm.value.NoOfVacancy == "" || parseInt(this.EditJobOpeningForm.value.NoOfVacancy) < 1) {
        errorMsg += "Please Enter Valid no of vacancy . <br/>";
        IsValid = false;
      }
    }
    if (!IsValid)
      this.toastrService.error(errorMsg, null, { enableHtml: true });
    return IsValid;
  }

  onClickMe() {
    if (this.minAge < 14) {
      this.toastrService.error("Please select minimum age 15.");
      this.statusAge = false;
      return false;
    } else {
      this.statusAge = true;
    }
  }

  ctcClick() {
    if (this.EditJobOpeningForm.controls['NetSalary'].value > this.maxCtc) {
      this.checkNetSalary();
    } else {
      if (this.minCtc < 4999) {
        this.toastrService.error("Minimum CTC Must be Greater Than Or Equal to 5000");
        this.status = false;
      } else {
        this.status = true;
      }
    }
  }

  checkNetSalary() {
    if (this.EditJobOpeningForm.controls['NetSalary'].value > this.maxCtc) {
      this.toastrService.error("Max CTC must be greter than or equal to In Hand Salary");
    }
  }

  private GetAllIndustryArea() {
    try {
      this.masterService.GetAllIndustryArea().subscribe(res => {
        this.lstIndustryArea = res

        if (this.respIndustryArea != null && this.respIndustryArea.length > 0) {
          this.lstIndustryArea = this.lstIndustryArea;
        }
      });
    } catch  { }
  }

  private GetAllFunctionArea() {
    try {
      this.masterService.GetAllFunctionArea().subscribe(res => {
        this.lstFunctionalArea = res

        if (this.respFunctionalArea != null && this.respFunctionalArea.length > 0) {
          this.lstFunctionalArea = this.lstFunctionalArea;
        }
      });
    } catch  { }
  }

  getbackData(Redirection: any) {
    this.Redirection = '1';
  }

  type: any
  dbResponse: any;
  getAgency: any = [];
  getAgencyName(type: any) {
    this.type = type;
    if (type == 'Agency') {
      this.showAgency = '1';
      this.showEmployer = '0'
    } else {
      this.showAgency = '0';
      this.showEmployer = '1'
    }
    this.jobpostService.GetAllAgency(this.type).subscribe(res => {
      this.dbResponse = res;
      var response = this.dbResponse.lstAdminEmployerAgency;
      if (response.length) {
        this.getAgency = response;
      }
    });
  }

  getEmployeerName() {
    this.showEmployer = '1';
    this.showAgency = '0';
  }

  Agencyname(e: any) {
    var name = e.target.value;
    var index = this.getAgency.findIndex(x => x.id == name);
    this.EditJobForm.controls['CompanyName'].setValue(this.getAgency[index]['name']);
  }

  Employeryname(e: any) {
    var Emp_name = e.target.value;
    var index = this.getAgency.findIndex(x => x.id == Emp_name);
    this.EditJobForm.controls['CompanyName'].setValue(this.getAgency[index]['name']);
  }

  ////////////////  sector section //////////
  NewSectorShow: any = [];
  NewSectorData: any = [];
  NewSecterTempData: any = [];

  //   AddSectorValue() {
  //     if (this.SectorForm.value.SectorID == '') {
  //       this.toastrService.error('Please Select Training Sector');
  //       return false;
  //     }
  //     if (this.SectorForm.value.TradeID == '') {
  //       this.toastrService.error('Please Select Training Trade');
  //       return false;
  //     }
  //     let sectorid;
  //     let tradeid;
  //     sectorid = this.SectorForm.value.SectorID;
  //     tradeid = this.SectorForm.value.TradeID;
  //     let sectorname = (this.Sector).filter(function (entry) {
  //       return entry.id == sectorid;
  //     });
  //     let tradename = (this.Trade).filter(function (entry) {
  //       return entry.id == tradeid;
  //     });
  //     var hasMatch =false;
  //     for (var index = 0; index < this.jobs.sectorTradeList.length; ++index) {
  //      var sector = this.jobs.sectorTradeList[index];
  //         if((sector.sectorName == sectorname[0].name) && (sector.tradeName == tradename[0].name)){
  //         hasMatch = true;
  //         break;
  //       }
  //     }
  //     if(!hasMatch)
  //     {
  //     this.jobs.sectorTradeList.push({
  //       "sectorId": this.SectorForm.value.SectorID,
  //       "sectorName": sectorname != '' ? sectorname[0].name : 'N/A',
  //       "tradeId": this.SectorForm.value.TradeID,
  //       "tradeName": tradename != '' ? tradename[0].name : 'N/A',
  //       "isActive":1
  //     });
  //     this.NewSecterTempData.push({
  //       "SectorID": this.SectorForm.value.SectorID,
  //       "TradeID": this.SectorForm.value.TradeID,
  //     });
  //   } else{
  //     this.toastrService.error('Training Sector and Trade are already exist');
  //     return false;
  // }
  //     this.NewSecterTempData = [];
  //     this.SectorForm.controls['SectorID'].setValue("");
  //     this.SectorForm.controls['TradeID'].setValue("");
  //   }
  AddSectorValue() {
    if (this.SectorForm.value.SectorID == '') {
      this.toastrService.error('Please Select Training Sector');
      return false;
    }
    if (this.SectorForm.value.TradeID == '') {
      this.toastrService.error('Please Select Training Trade');
      return false;
    }
    let sectorid = this.SectorForm.value.SectorID;
    let tradeid = this.SectorForm.value.TradeID;

    let sectorname = (this.Sector).filter(function (entry) {
      return entry.id == sectorid;
    });

    let tradename = (this.Trade).filter(function (entry) {
      return entry.id == tradeid;
    });
    var hasMatch = false;
    for (var index = 0; index < this.NewSectorShow.length; ++index) {
      var sector = this.NewSectorShow[index];
      if ((sector.sectorId == sectorname[0].id) && (sector.tradeId == tradename[0].id)) {
        hasMatch = true;
        break;
      }
    }
    if (!hasMatch) {
      this.Trade = [];
      this.NewSectorShow.push(
        {
          id: 0,
          sectorId: this.SectorForm.value.SectorID,
          sectorName: sectorname[0].name,
          tradeId: this.SectorForm.value.TradeID,
          tradeName: tradename[0].name,
          isActive: 1,
        }
      );
    } else {
      this.toastrService.error('Training sector and trade are already exist');
      return false;
    }
    this.NewSecterTempData.push({
      "SectorID": this.SectorForm.value.SectorID,
      "TradeID": this.SectorForm.value.TradeID,
    });
    this.NewSecterTempData = [];
    this.SectorForm.controls['SectorID'].setValue("");
    this.SectorForm.controls['TradeID'].setValue("");
  }

  modalRefSector: BsModalRef;
  modalRefDelSector: BsModalRef;
  deleteSector(index: any) {
    var adminid = JSON.parse(localStorage.getItem('phpadminid'));
    if (this.NewSectorShow[index].id > 0) {
      var DeleteList = {
        "AdminId": this.adminId,
        "JobId": index.jobId,
        "SectorId": this.NewSectorShow[index].sectorId,
        "TradeId": this.NewSectorShow[index].tradeId,
        "UserId": index.userID,
        "Id": this.NewSectorShow[index].id,
      };
      this.DeletSector(DeleteList);
    }
    this.NewSectorShow.splice(index, 1);
    this.modalRefSector.hide();
  }

  DeletSector(DeleteList: any) {
    this.spinnerService.show();
    this.jobpostService.deleteSectorTrade(DeleteList).subscribe(res => {
      this.spinnerService.hide();
      this.dbResponse = res;
      if (this.dbResponse != null) {
        this.toastrService.success(this.dbResponse.message);
        this.modalRefDelSector.hide();
        this.GetJobDetail(DeleteList.jobId);
      }
      else {
        this.toastrService.error(this.dbResponse.message);
      }
    }
    );
  }

  declineBoxSecor(): void {
    this.modalRefSector.hide();
  }

  PusTemplateSector(templateSector: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-sm' });
  }

  ////////////////  End Sector Section //////////////
  DeleteList: any = [];
  DeleteTradeList(TradeList: any, userid: any) {
    this.modalRef.hide();
    var adminid = JSON.parse(localStorage.getItem('phpadminid'));
    var DeleteList = {
      "AdminId": adminid,
      "JobId": userid.jobId,
      "SectorId": TradeList.sectorId,
      "TradeId": TradeList.tradeId,
      "UserId": userid.userID,
      "Id": TradeList.id,
    };
    this.jobpostService.deleteSectorTrade(DeleteList).subscribe(res => {
      this.dbResponse = res;
      if (this.DBResponce != null) {
        this.toastrService.success(this.dbResponse.message);
        this.modalRef.hide();
        this.GetJobDetail(userid.jobId);
      } else {
        this.toastrService.error(this.dbResponse.message);
      }
    });
  }

  DeleteTradeList2(TradeList: any, userid: any) {
    this.modalRef.hide();
    var adminid = JSON.parse(localStorage.getItem('phpadminid'));
    var DeleteList = {
      "AdminId": adminid,
      "JobId": userid.jobId,
      "SectorId": TradeList.sectorId,
      "TradeId": TradeList.tradeId,
      "UserId": userid.userID,
      "Id": TradeList.id,
    };
    this.jobpostService.deleteSectorTrade(DeleteList).subscribe(res => {
      this.dbResponse = res
      if (this.DBResponce != null) {
        this.toastrService.success(this.dbResponse.message);
        this.modalRef.hide();
        this.GetJobDetail(userid.jobId);
      } else {
        this.toastrService.error(this.dbResponse.message);
      }
    });
  }

  declineModel1(): void {
    this.modalRef.hide();
  }

  repicatepostData: any = [];
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
    this.jobpostService.reCreateJob(this.repicatepostData).subscribe(res => {
      this.DbResponce = res
      if (this.DbResponce != null) {
        this.dbresponse = this.DbResponce.lstRecreateJob[0];
        this.toastrService.success("Job Replicated Successfully Please Edit Valid Upto Date");
        localStorage.setItem('viewid', this.dbresponse.jobId);
        localStorage.setItem('Ispushed', this.dbresponse.isJobPushed);
        localStorage.setItem('isScrap', this.dbresponse.isScrap);
        localStorage.setItem('isRecreate', 'true');
        // this.router.navigate(['/ViewJob']);
        this.ngOnInit();
      }
    });
  }

  ////////////////  Edit screening question section /////////////

  showquestion: boolean = false;
  createQuest: boolean = false;
  questionList: any = [];
  selectedQuestion: any = [];
  isChecked: boolean = false;
  jobTitleCode: any = [];
  showJobDetail: boolean = false;
  jobDetails: any;
  finalSubmitQuestion: any = [];
  jobids: any;
  checkedQ: boolean = false;
  addedQuestion: any = [];
  addedquestStatus: boolean = false;
  item: any;
  isScreening: any;


  createQuestion(templateSector: TemplateRef<any>, item: any) {
    this.item = item;
    if (this.item == 'view') {
      this.questionList = [];
      this.selectedQuestion = [];
      this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-md ', backdrop: 'static', keyboard: false });
      this.viewQuestion();
      this.getJobTitleList();
    } else {
      this.isChecked = true;
      if (this.isChecked && !this.isViewButtonshow) {
        this.viewQuestion();
        this.getJobTitleList();
        this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-md ', backdrop: 'static', keyboard: false });
      } else {
        this.declinequestion();
      }
    }

  }

  // get job title and job code based on user id
  // getJobTitleList(){
  //  this.jobpostService.getJobTitleList().subscribe(res=>{
  //    if(res){     
  //      this.jobTitleCode=res;
  //    }
  //  })
  // }

  // get job title and job code based on user id
  getJobTitleList() {
    this.screeningService.getGrouponlyHaveQuestionlist(this.UserId, this.adminId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce.lstGroupName) {
        this.jobTitleCode = this.DbResponce.lstGroupName;
      }
      else {
        this.jobTitleCode = [];
      }
    })
  }


  // get job detail based on job id

  // getJobDetails(jobid:any){    
  //   this.jobids=jobid;
  //   this.jobpostService.getJobDetails(jobid).subscribe(res=>{
  //     if(res[0]!=null){
  //       this.questionList=[];
  //       this.showJobDetail=true;
  //       this.showquestion=false;
  //       this.createQuest=false;     
  //       this.jobDetails=res[0];
  //      }
  //   })
  // }

  results: any;
  groupId: any
  getJobDetails(event: any) {
    this.questionList = [];
    this.showEditForm = false;
    let groupId = event.target.value;
    let groupName = this.jobTitleCode.filter(function (entry) {
      return entry.groupid == groupId;
    });
    this.groupId = groupId;
    this.screeningService.GetActivequestionlist(this.UserId, this.adminId, this.groupId).subscribe(res => {
      this.results = res;
      if (this.results.getquestiongroup) {
        this.showquestion = true;
        this.questionList = this.results.getquestiongroup;
      }

    })
  }


  // get previous question list based on job id

  getPreviousQuestion(jobid: any) {
    this.spinnerService.show();
    this.jobpostService.getPreviousQuestionList(jobid, this.adminId, this.UserId).subscribe(res => {
      this.spinnerService.hide();
      if (res) {
        this.showquestion = true;
        this.questionList = res;
      }
    })
  }

  // add own question
  oldQuestion: boolean = false;

  addQuestion() {

    this.finalSubmitQuestion = [];
    if (this.EditJobForm.value.question) {
      this.createQuest = false;
      this.addedquestStatus = true;
      this.checkedQ = true;
      let question = this.EditJobForm.value.question;
      if (this.questionId) {
        var questId = this.questionId
      }
      if (this.index !== '' && this.editType == 'old') {
        this.questionList[this.index].questions = question;
      } else if ((this.index !== '' && this.editType == 'new')) {
        this.addedQuestion[this.index] = question;
      } else if ((this.index !== '' && this.editType == 'editOld')) {
        this.editQuestionList[this.index] = {
          id: this.questionId, jobid: this.viewid, companyid: this.companyid, jobtitle: null, posteddate: null,
          questions: question
        };
        this.selectedQuestion.push({ "questionid": questId ? questId : 0, "Quesons": question, "isActive": true })
      }
      else {
        this.addedQuestion.push(question);
        //    console.log("this.addedQuestion = = "+this.addedQuestion);
      }
      this.EditJobForm.controls['question'].setValue('');
      this.index = '';

      this.showEditForm = false;


      this.questionId = 0;
      this.companyid = 0
    } else {
      this.toastrService.error('Please add question');
    }
  }


  // select question form previous posted job 
  isactive: boolean = true;
  // newArrObj1: any = [];
  selectQuestion(e, item, type, i) {
    // this.editQuestionList;
    if (e.target.checked) {
      if (this.editQuestionList.length) {
        var CheckDuplicate;
        var newArrObj1 = [];
        this.questionId = '';
        if (type == 'edit' || type == 'old') {
          var question = item.questions;
          this.companyid = item.companyid
        } else if (type == "new") {
          var question = item;
        }

        for (var j = 0; j < this.editQuestionList.length; j++) {
          this.isactive = true;
          var newArrObj = this.editQuestionList[j].quesList.filter(function (obj) {
            // if (obj.groupquestionid == item.groupquestionid) {
            //   return CheckDuplicate = true;
            // }
            return obj.groupquestionid == item.groupquestionid;
          })
          // if (CheckDuplicate == true) {
          //   newArrObj1 = newArrObj;
          //   CheckDuplicate = false;
          // }
        }
        if (newArrObj.length) {
          // for (var indx = 0; indx < newArrObj1.length; indx++) {
          if (newArrObj[0].groupquestionid == item.groupquestionid) {
            this.toastrService.error('Question is already added');
            $("#" + "screening" + i).prop('checked', false);
            CheckDuplicate = false;
            return false;
          } else {
            CheckDuplicate = false;
            this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "questionid": item.questionid, "groupquestionid": item.groupquestionid, "Quesons": question, "Expectanswer": item.expectanswer, "Preference": item.preference, "isActive": item.isactive });
            // return false;
          }
          // }
        } else {
          this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "questionid": item.questionid, "groupquestionid": item.groupquestionid, "Quesons": question, "Expectanswer": item.expectanswer, "Preference": item.preference, "isActive": item.isactive });
        }
      } else {
        this.questionId = '';
        if (type == 'edit' || type == 'old') {
          var question = item.questions;
          this.companyid = item.companyid
        } else if (type == "new") {
          var question = item;
        }
        this.isactive = true;
        this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "questionid": item.questionid, "groupquestionid": item.groupquestionid, "Quesons": question, "Expectanswer": item.expectanswer, "Preference": item.preference, "isActive": item.isactive });
      }
    } else {
      if (type == 'edit') {
        var question = item.questions;
        this.questionId = item.id;
        this.companyid = item.companyid;
        this.isactive = false;
        for (var j = 0; j < this.editQuestionList.length; j++) {
          var index = this.editQuestionList[j].quesList.findIndex(function (o, index) {
            return index === i;
          })
          if (index !== -1) {
            this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": item.questionid, "Quesons": question, "Expectanswer": item.expectanswer, "Preference": item.preference, "isActive": this.isactive });
          }
        }
      } else {
        // var index = this.selectedQuestion.findIndex(function (o, index) {
        //   return index === i;
        // })
        // if (index !== -1) {
        //   this.selectedQuestion.splice(index, 1);
        // }
        for (var a = 0; a < this.selectedQuestion.length; a++) {
          if (this.selectedQuestion[a].groupquestionid == item.groupquestionid) {
            this.selectedQuestion.splice(a, 1);
          }
        }
      }
    }
  }

  index: any = '';
  editType: any;
  questionId: any;
  // edit questionsaveQuestion
  showEditForm: any;
  editItem: any;
  editQuestion(i, item: any, data: any) {
    if (data == 'new') {
      var question = item;
    } else {
      this.editItem = item;
      this.showEditForm = true;
      if (item.questions) {
        var question = item.questions;
      } else {
        var question = item;
      }
      this.questionId = item.questionid;
      this.companyid = item.companyid
    }
    this.editType = data;
    this.index = i;
    this.EditJobForm.controls['question'].setValue(question);
  }

  //close button function

  declinequestion() {
    this.EditJobForm.controls['screening'].setValue('');
    this.showEditForm = false;
    this.showJobDetail = false;
    this.showquestion = false;
    this.createQuest = false;
    this.addedquestStatus = false;
    this.addedQuestion = [];
    this.questionList = [];
    this.selectedQuestion = [];
    this.finalSubmitQuestion = [];
    this.modalRefSector.hide();
    if (this.item != 'view') {
      if (!this.isclosestatus) {
        this.isChecked = false;
      }
    } else {
      // this.isChecked=false;
    }
  }

  //submit question after select and create question.
  isSubmit: boolean = false;
  submitQuestion() {
    this.finalSubmitQuestion = [];
    this.isSubmit = true;
    if (this.selectedQuestion.length > 0) {
      this.EditJobForm.controls['question'].setValue('');
      this.finalSubmitQuestion = this.selectedQuestion;
      this.selectedQuestion = [];
      this.addedQuestion = [];
      this.modalRefSector.hide();
      this.saveQuestion(this.viewid);
    } else if (this.editQuestionList.length > 0) {
      this.modalRefSector.hide();
      this.saveQuestion(this.viewid);
    } else {
      this.toastrService.error('Please add question');
    }
  }
  // save question after job created successfully

  saveQuestion(jobId: any) {
    let postData = {
      "jobid": jobId,
      "Quesons": this.finalSubmitQuestion,
    }
    this.jobpostService.saveQuestion(this.UserId, this.adminId, postData).subscribe(res => {
      if (res) {
        this.editQuestionList = [];
        this.isChecked = true;
        this.toastrService.success('question saved successfully');
        this.isViewButtonshow = true;
        this.viewQuestion();
      }
    })
  }

  editQuestionList: any = [];
  isclosestatus: boolean = false;
  showEditQuestion: boolean = false;
  TotalQuestionList: any = [];
  editQuestionList1: any = [];
  viewQuestion() {
    var jobId = this.viewid;
    var j = 0;
    this.TotalQuestionList = [];
    this.spinnerService.show();
    this.jobpostService.getPreviousQuestionList(jobId, this.adminId, this.UserId).subscribe(res => {
      this.spinnerService.hide();
      this.dbResponse = res;
      if (this.dbResponse.lstadmJobScreeningquestion) {
        let response = this.dbResponse.lstadmJobScreeningquestion;
        this.showEditQuestion = true;
        this.checkedQ = true;
        this.editQuestionList = this.dbResponse.lstadmJobScreeningquestion[0].groupList1;
        // this.TotalQuestionList = this.editQuestionList
        // for (var i = 0; i < this.editQuestionList.length; i++) {
        //   var data = {
        //     answer: null,
        //     createdby: this.editQuestionList[i].createdby,
        //     createdbytype: null,
        //     createddate: this.editQuestionList[i].createddate,
        //     expectanswer: this.editQuestionList[i].expectanswer,
        //     groupid: this.editQuestionList[i].groupid,
        //     groupname: this.editQuestionList[i].groupname,
        //     groupquestionid: this.editQuestionList[i].groupquestionid,
        //     isactive: this.editQuestionList[i].isactive,
        //     mandotary: this.editQuestionList[i].ismandatory,
        //     preference: this.editQuestionList[i].preference,
        //     questions: this.editQuestionList[i].questions,
        //     userName: null
        //   }
        //   this.TotalQuestionList.push(data);
        // }
        this.finalSubmitQuestion = this.editQuestionList;
        if (this.editQuestionList.length > 0 && this.isSubmit) {
          this.isViewButtonshow = true;
        } else {
          this.isChecked = true;
          if (this.isChecked && this.editQuestionList.length) {
            this.isclosestatus = true;
            this.isViewButtonshow = true;
          } else {
            this.isViewButtonshow = false;
          }
        }
        //this.selectedQuestion=res;     
      } else {
      }
    })
  }

  //////////////////////////End screening question section///////////////////////
  screenList: any = [];
  modalRefScrenning: BsModalRef;
  displayQuestionList(templateScrenning: TemplateRef<any>) {
    var jobId = this.viewid;
    this.spinnerService.show();
    this.jobpostService.getPreviousQuestionList(jobId, this.adminId, this.UserId).subscribe(res => {
      this.spinnerService.hide();
      this.dbResponse = res;
      if (this.dbResponse.lstadmJobScreeningquestion) {
        this.modalRefScrenning = this.modalService.show(templateScrenning, { class: 'modal-md ' });
        this.screenList = this.dbResponse.lstadmJobScreeningquestion[0].groupList1;
      } else {
        this.toastrService.error('server error');
      }
    });
  }

  closeQuestionList() {
    this.screenList = [];
    this.modalRefScrenning.hide();
  }

  isNotScreeming() {
    this.isChecked = false;
    this.isViewButtonshow = false;
  }

  openingModelRef: BsModalRef;
  addContactForOpening(template: TemplateRef<any>, item: any) {
    this.openingModelRef = this.modalService.show(template, { class: 'modal-sm-md', backdrop: 'static', keyboard: false });
  }

  closeContactModal() {
    this.openingModelRef.hide();
    this.close()
  }

  ResetContactDetails() {
    this.EditJobOpeningForm.controls['ContactName'].setValue("");
    this.EditJobOpeningForm.controls['ContactDesignation'].setValue("");
    this.EditJobOpeningForm.controls['ContactMobile'].setValue("");
    this.EditJobOpeningForm.controls['ContactEmail'].setValue("");
    this.EditJobOpeningForm.controls['ContactLandlineNumber'].setValue("");
    this.EditJobOpeningForm.controls['ContactEmailPublic'].setValue("");
    this.EditJobOpeningForm.controls['Contactid'].setValue(this.OpeningData.contactid);

    this.OpeningData.contactName = '';
    this.OpeningData.contactDesignation = '';
    this.OpeningData.contactMobile = '';
    this.OpeningData.contactEmail = '';
    this.OpeningData.contactLandlineNumber = '';
    this.OpeningData.isContactSharedPublic = '';
    // this.EditJobOpeningForm.controls['Contactid'].setValue(this.OpeningData.contactid);


  }

  Validationforlandline(event: any) {
    var phoneno = event;
    if (phoneno) {
      var myregex = /^\(?([0-9]{1})\)?[-. ]?([1-9]{1})[-. ]?([0-9]{4})[-. ]?([0-9]{4,6})$/;
      if (!myregex.test(phoneno)) {
        this.toastrService.error("Landline Number Is Not Valid");
        this.EditJobForm.controls.LandlineNumber.setValue('');
        return false;
      }
    }
  }

  ValidationforMobile(event: any) {
    var phoneno = event;
    if (phoneno) {
      var myregex = /^\(?([5-9]{1})\)?[-. ]?([1-9]{1})[-. ]?([0-9]{4})[-. ]?([0-9]{4,6})$/;
      if (!myregex.test(phoneno)) {
        this.toastrService.error("Mobile Number Is Not Valid");
        this.EditJobOpeningForm.controls.ContactMobile.setValue('');
        return false;
      }
    }
  }

  ValidationforEmail(event: any) {
    var phoneno = event;
    if (phoneno) {
      var regemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regemail.test(phoneno)) {
        this.toastrService.error("Email Is Not Valid");
        this.EditJobOpeningForm.controls.ContactEmail.setValue('');
        return false;
      }
    }
  }

  addContactInopening() {
    if (this.EditJobOpeningForm.value.ContactName == '') {
      this.toastrService.error("Please add contact person name");
      return false
    } else if (this.EditJobOpeningForm.value.ContactDesignation == '') {
      this.toastrService.error("Please add designation");
      return false
    } else if (this.EditJobOpeningForm.value.ContactMobile == '') {
      this.toastrService.error("Please add mobile number");
      return false
    } else if (this.EditJobOpeningForm.value.ContactEmail == '') {
      this.toastrService.error("Please add emailID");
      return false
    } else {
      var landline = this.EditJobOpeningForm.value.ContactLandlineNumber;
      var regex = "000000000000"
      if (landline != null && landline.length != '' && landline.length != undefined) {
        if (landline.length < 12 || landline.match(regex)) {
          this.toastrService.error("Please enter valid landline no.");
          return false;
        }
      }
    }
    if (!this.EditJobOpeningForm.value.ContactName && !this.EditJobOpeningForm.value.ContactEmail && !this.EditJobOpeningForm.value.ContactMobile && !this.EditJobOpeningForm.value.ContactLandlineNumber && !this.EditJobOpeningForm.value.ContactDesignation && !this.EditJobOpeningForm.value.ContactEmailPublic) {
      this.toastrService.error("Please add at least one field");
    } else {
      this.toastrService.success("Contact person added");
      this.openingModelRef.hide();

      this.OpeningData.contactEmail = this.EditJobOpeningForm.value.ContactEmail;
      this.OpeningData.contactMobile = this.EditJobOpeningForm.value.ContactMobile;
      this.OpeningData.contactDesignation = this.EditJobOpeningForm.value.ContactDesignation;
      this.OpeningData.contactName = this.EditJobOpeningForm.value.ContactName;
      this.OpeningData.contactLandlineNumber = this.EditJobOpeningForm.value.ContactLandlineNumber;
      this.OpeningData.ContactEmailPublic = this.EditJobOpeningForm.value.ContactEmailPublic;
    }
  }

  close() {
    this.EditJobOpeningForm.controls['ContactName'].setValue(this.OpeningData.contactName);
    this.EditJobOpeningForm.controls['ContactDesignation'].setValue(this.OpeningData.contactDesignation);
    this.EditJobOpeningForm.controls['ContactMobile'].setValue(this.OpeningData.contactMobile);
    this.EditJobOpeningForm.controls['ContactEmail'].setValue(this.OpeningData.contactEmail);
    this.EditJobOpeningForm.controls['ContactLandlineNumber'].setValue(this.OpeningData.contactLandlineNumber);
    this.EditJobOpeningForm.controls['ContactEmailPublic'].setValue(this.OpeningData.isContactSharedPublic);
    this.EditJobOpeningForm.controls['Contactid'].setValue(this.OpeningData.contactid);
  }
}