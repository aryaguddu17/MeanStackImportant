import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RegistrationService } from '../../../Services/registration.service';
import { AuthenticationService } from '../../../Services/authenticate.service';
import { MasterService } from '../../../Services/master.service';
import { JobpostService } from '../../../Services/jobpost.service';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../../Globals/app.config';
import { UserInfoService } from '../../../Services/userInfo.service.';
import { CustomValidators } from '../../../Validators/custom-validator.directive';
import { literalArr, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { Options } from 'ng5-slider';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-CreateWalkinComponent',
  templateUrl: './CreateWalkin.Component.html',
})

export class CreateWalkinComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild('WalkinForms') WalkinForms: HTMLFormElement;
  AgeMsg = true;
  UserInfo: any;
  Responce: any = {};
  DBResponce: any = {};
  lstState: any = [];
  lstAllLanguage: any = [];
  jobFromvalid = true;
  ExpMsg = true;
  joiningpriority: any = [];
  mineducation: any = [];
  district: any = [];
  city: any = [];
  statevenu: any = [];
  openingdetail: any = {};
  walkindetail: any = {};
  jobopeningdetail: any = {};
  newAttribute: any = [];
  newAttributeShow: any = [];
  WalkinForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  joblist: any = {};
  walkinid: any = '';
  startminDate: any = '';
  ctcerrmsg: boolean = true;
  weightvalidsts: boolean = true;
  companyname: any = {};
  gendersts: boolean = false;
  submitbtnsts = true;
  logintype: any = '';
  isreadonly: boolean = false;
  mintoDate: any = '';

  JobFormDesable: boolean = true;

  minExp: number = 0;
  maxExp: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
  ageOptions: Options = {
    floor: 15,
    ceil: 60,
    step: 1
  };
  ExpOptions: Options = {
    floor: 0,
    ceil: 20,
    step: 1
  };
  CtcOptions: Options = {
    floor: 5000,
    ceil: 250000,
    step: 1
  };

  mytime: Date = new Date();
  SectorForm: FormGroup;


  constructor(private appConfig: AppConfig
    , private toastrService: ToastrService
    , private userinfoservice: UserInfoService
    , private masterService: MasterService
    , private WalkinPostService: WalkinPostService
    , private formBuilder: FormBuilder
    , private _location: Location
    , private router: Router
    , private jobpostService: JobpostService
    , private activatedRoute: ActivatedRoute
    , private modalService: BsModalService
    , private spinnerService: Ng4LoadingSpinnerService) {
    // this.UserInfo = appConfig.UserInfo;
    // this.logintype=this.UserInfo.loginType;
    // this.logintype='Employer';
    // if(this.logintype=='Employer'){
    //   this.isreadonly=true;
    // }else{
    //   this.isreadonly=false;
    // }


  }


  LangFormArray: any = [];
  onItemSelect(item: any) {
    this.LangFormArray.push(item.name);
  }

  onDeSelectAll(items: any) {
    this.LangFormArray = [];
  }

  onItemDeSelect(item: any) {
    // this.openingdetail.LanguageId.splice(item.id, 1)
    // this.LangFormArray.splice(item.name, 1)
    let index = this.LangFormArray.indexOf(item.name);
    this.LangFormArray.splice(index, 1);
  }

  onSelectAll(items: any) {
    this.LangFormArray = [];
    for (var i = 0; i < items.length; i++) {
      this.LangFormArray.push(items[i].name);
    }

  }
  langsts: boolean = false;
  noofvacancystssts: boolean = true;
  stateValid: boolean = true;
  addFieldValue() {
    debugger
    this.minCtc = this.WalkinForm.value.MinCtc? parseInt(this.WalkinForm.value.MinCtc) : 0;
    this.maxCtc = this.WalkinForm.value.MaxCtc? parseInt(this.WalkinForm.value.MaxCtc) : 0;
    if (this.WalkinForm.value.ShiftTime != "Freelancer") {
      if (this.minCtc == 0 && this.maxCtc == 0) {
        this.toastrService.error("Add CTC min and max option");
        return false;
      }
        // Changes made by Arti Ahirwar on date 20 Aug 2019
    if (this.minCtc == 0 || this.maxCtc == 0)  {
      this.toastrService.error("Add CTC min and max option");
      return false;
      //this.ctcerrmsg = false;
    } 
   
    if (this.minCtc<5000 ) {
      this.toastrService.error("Minimum CTC can not be less than 5000");
      return false;
      //this.ctcerrmsg = false;
    }
   
    if (this.minCtc > this.maxCtc) {
      this.toastrService.error("Maximum CTC must be be greater than minimum CTC");
      return false;
      //this.ctcerrmsg = false;
    } 
    }
    let NoOfVacancy = this.WalkinForm.value.NoOfVacancy;

    if (this.WalkinForm.value.StateID == '') {

      this.stateValid = false;
    } else {
      this.stateValid = true;
    }
  
   
    if (parseInt(NoOfVacancy) == 0 || NoOfVacancy == '' || NoOfVacancy == null) {
      this.noofvacancystssts = false;
    } else {
      this.noofvacancystssts = true;
    }

    if (this.stateValid == true && this.noofvacancystssts == true) {
      this.phpadminid = localStorage.getItem('phpadminid');
      var adminid = JSON.parse(this.phpadminid);
      this.ComapanyId = this.companyid;
      this.AdminId = adminid;
      this.UserId = this.WalkinForm.value.Comapany_User;
      if (this.WalkinForm.value.StateID != '') {
        this.openingdetail.StateId = this.WalkinForm.value.StateID;
        this.openingdetail.DistrictId = this.WalkinForm.value.DistrictID == '' ? 0 : this.WalkinForm.value.DistrictID;
        this.openingdetail.CityId = this.WalkinForm.value.CityID == '' ? 0 : this.WalkinForm.value.CityID;
        this.openingdetail.NoOfVacancy = this.WalkinForm.value.NoOfVacancy ? this.WalkinForm.value.NoOfVacancy : 0;
        this.openingdetail.LanguageId = this.WalkinForm.value.LanguageId;
        this.openingdetail.MinCtc = this.minCtc;
        this.openingdetail.MaxCtc = this.maxCtc;
        // this.openingdetail.UserID = this.UserId;
        // this.openingdetail.AdminId = this.AdminId;
        // this.openingdetail.CompanyId =this.ComapanyId;;


        let statedid;
        let districtid;
        let cityid;
        let languageid;

        statedid = this.WalkinForm.value.StateID;
        districtid = this.WalkinForm.value.DistrictID;
        cityid = this.WalkinForm.value.CityID;
        languageid = this.WalkinForm.value.LanguageId;

        let statename = (this.lstState).filter(function (entry) {
          return entry.id == statedid;
        });
        let districtname = (this.district).filter(function (entry) {
          return entry.id == districtid;
        });
        let cityname = (this.city).filter(function (entry) {
          return entry.id == cityid;
        });
        let languagename = (this.lstAllLanguage).filter(function (entry) {
          return entry.id == languageid;
        });

      
        this.newAttributeShow.push({
          "statename": statename[0]['stateName'],
          "districtname": districtname == '' ? '' : districtname[0]['districtName'],
          "cityname": cityname == '' ? '' : cityname[0]['cityname'],
          "languageanme": this.LangFormArray,
          "vacancycount": this.WalkinForm.value.NoOfVacancy,
          "MinCtc": this.minCtc,
          "MaxCtc": this.maxCtc
        });

        this.newAttribute.push(this.openingdetail);
        this.openingdetail = {};

        this.WalkinForm.controls['StateID'].setValue("");
        this.WalkinForm.controls['DistrictID'].setValue('');
        this.WalkinForm.controls['CityID'].setValue("");
        this.WalkinForm.controls['NoOfVacancy'].reset();;
        this.LangFormArray = [];
        this.WalkinForm.controls['MaxCtc'].setValue(0);
        this.WalkinForm.controls['MinCtc'].setValue(0)
        this.WalkinForm.controls['LanguageId'].setValue('');
        this.stateValid = true;
        this.maxCtc = 0;
        this.minCtc = 0;

      } else {
        this.stateValid = false;
      }
    }
    this.district = [];
    this.city = [];
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


  companyid: any;
  phpadminid: any = [];
  company: any = [];
  dbresponse: any = [];
  companydetails: any = [];
  dbresponse1: any = [];
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.companyid = params['companyid'];
      this.companydetails = [];
      this.phpadminid = localStorage.getItem('phpadminid');
      var adminid = JSON.parse(this.phpadminid);

      this.jobpostService.GetCompanyDetails(this.companyid, adminid).subscribe(res => {
        this.dbresponse1 = res;
        if (this.dbresponse1 != null) {
          if (this.dbresponse1.lstCompanyProfile != null) {
            this.companydetails = this.dbresponse1.lstCompanyProfile;
            this.companydetails = this.companydetails[0];
            this.GetJobPostData();

          } else {
            this.companydetails = this.dbresponse1.lstCompanyProfile1;
            this.companydetails = this.companydetails;
          }
        }
        else {
          this.dbresponse1 = [];
        }
      });
    });
    this.WalkinForm = this.formBuilder.group({
      Comapany_User: ['', [Validators.required,]],
      JobTitle: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      CompanyName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      PersonName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      JobDescription: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Mobile: ['', [Validators.nullValidator, Validators.compose([CustomValidators.validMobile])]],
      Email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      EmailPublic: ['', [Validators.nullValidator,]],
      RolesresPonsiblty: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Keyword: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      LandlineNumber: ['', [Validators.nullValidator,]],
      MinExp: ['', [Validators.nullValidator,]],
      MaxExp: ['', [Validators.nullValidator,]],
      AgeMin: ['', [Validators.nullValidator,]],
      AgeMax: ['', [Validators.nullValidator,]],
      OtherDetail: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ISprobationtime: ['false', [Validators.nullValidator,]],
      ProbationDuration: ['', Validators.nullValidator,],
      MinEducation: ['', [Validators.required,]],

      Specialization: ['', [Validators.nullValidator,]],

      ValidDate: ['', [Validators.required,]],
      VenuDetail: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      ShiftTime: ['FullTime', [Validators.nullValidator,]],
      ojtDuration: ['', [Validators.nullValidator,]],
      IsOjt: ['false', [Validators.nullValidator,]],
      StateID: ['', [Validators.nullValidator,]],
      walkinStateVenuID: ['', [Validators.required,]],
      walkinDistrictID: ['', [Validators.required,]],
      DistrictID: ['', [Validators.nullValidator,]],
      CityID: ['', [Validators.nullValidator,]],
      NoOfVacancy: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      LanguageId: ['', [Validators.nullValidator,]],
      MaxCtc: ['', [Validators.nullValidator,]],
      MinCtc: ['', [Validators.nullValidator,]],
      feet: ['', [Validators.nullValidator,]],
      inch: ['', [Validators.nullValidator,]],
      weight: ['', [Validators.nullValidator,]],
      Transgender: ['', [Validators.nullValidator,]],
      Female: ['', [Validators.nullValidator,]],
      Male: ['', [Validators.nullValidator,]],
      industry: ['', [Validators.required]],
      functionalarea: ['', [Validators.required]],
      walkintodate: ['', [Validators.required]],
      walkinfromtime: ['', [Validators.required]],
      walkintotime: ['', [Validators.required]]

    });


    // this.WalkinForm.controls['CompanyName'].setValue(this.UserInfo.companyName);

    this.GetAllStates();
    this.GetAllLanguage();
    this.GetAllJoiningPriority();
    this.GetMinEducation();
    this.GetIndustry();
    this.GetFunctionalArea();
    this.filldefault();
    this.GetAllUser();
    this.GetAllSector(0);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.minDate = new Date();
    this.startminDate = new Date();
    this.mintoDate = new Date();
    this.mintoDate.setDate(this.mintoDate.getDate() + 1);
    localStorage.removeItem('walkInId');
    this.filldefault();
    this.SectorForm = this.formBuilder.group({
      SectorID: ['', Validators.nullValidator,],
      TradeID: ['', [Validators.nullValidator,]],
    });
  }

  Sector: any = [];
  GetAllSector(schemeId) {
    try {
      this.masterService.GetAllMrigsSector(schemeId).subscribe(res => {
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
    if (trade != '') {
      this.SectorForm.controls[('TradeID')].setValue('');
      try {
        this.masterService.GetAllMrigsTrade(0,trade).subscribe(res => {
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

  companyuser: any = [];
  GetAllUser() {
    try {
      this.masterService.GetAllUser(this.companyid).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce != null) {
          this.companyuser = this.DBResponce.lstAdminVerifiedUser;
        }
        else {
          this.companyuser = [];
        }
      });
    }
    catch { }
  }


  GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce != null) {
          this.lstState = this.DBResponce;
        }
        else {
          this.lstState = [];
        }
      });
    } catch  { }
  }

  GetAllLanguage() {
    try {
      this.masterService.GetAllLanguage().subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce != null) {
          this.lstAllLanguage = this.DBResponce;
        }
        else {
          this.lstAllLanguage = [];
        }
      });
    } catch  { }
  }


  GetAllJoiningPriority() {
    try {
      this.masterService.GetJoiningPrority().subscribe(res => {
        this.DBResponce = res
        if (this.DBResponce != null) {
          this.joiningpriority = this.DBResponce;
        }
        else {
          this.joiningpriority = [];
        }
      });
    } catch  { }
  }

  GetMinEducation() {
    try {
      this.masterService.GetAllMinEducation().subscribe(res => {
        this.DBResponce = res
        if (this.DBResponce != null) {
          this.mineducation = this.DBResponce;
        }
        else {
          this.mineducation = [];
        }
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    if (statename != '') {
      this.WalkinForm.controls[('DistrictID')].setValue('');
      this.WalkinForm.controls[('CityID')].setValue('');
      this.GetAllDistrict(statename);
      this.GetAllCity(statename);
      this.stateValid = true;
    } else {
      this.district = [];
      this.city = [];
    }
  }

  GetAllCity(id: any) {
    this.masterService.GetAllCity(id).subscribe(res => {

      this.city = res
      if (this.city != null && this.city.length > 0) {
        this.city = this.city;
      }
    });
  }

  GetAllDistrict(id: any) {
    try {

      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res
        if (this.district != null && this.district.length > 0) {
          this.district = this.district;
        }
      });
    } catch  { }

  }

  onChangeStateVenu(statenamevenu: any) {

    this.GetAllDistrictvenu(statenamevenu);
  }

  GetAllDistrictvenu(id: any) {
    if (id != '') {
      this.WalkinForm.controls[('walkinDistrictID')].setValue('');
      try {

        this.masterService.GetAllDistrictvenu(id).subscribe(res => {
          this.statevenu = res
          if (this.statevenu != null && this.statevenu.length > 0) {
            this.statevenu = this.statevenu;
          }

        });
      } catch  { }
    } else {
      this.statevenu = [];
    }
  }

  ValidateExperience(expfrom, expto) {
    if (this.maxExp >= this.minExp) {
      this.jobFromvalid = false;
      this.ExpMsg = false;
    } else {
      this.jobFromvalid = true;
      this.ExpMsg = true;
    }
  }
  ValidateAge(Max, Min) {

    if (this.maxAge >= this.minAge) {

      this.AgeMsg = false;
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
      this.AgeMsg = true;
    }

  }

  ValidateCtc(ctcmin, ctcmax) {
    if (this.minCtc >= this.maxCtc || parseInt(ctcmin) == 0 || parseInt(ctcmax) == 0) {
      this.ctcerrmsg = false;
    } else {
      this.ctcerrmsg = true;
    }
  }

  probation: boolean = false;
  probationcondition: any;
  ProbationDuration: any;
  SetProbation(probcon: any) {
    if (probcon == 1) {
      this.probation = true;
    } else {
      this.probation = null;
      this.ProbationDuration = ''
      this.WalkinForm.value.ProbationDuration = "";
    }
    this.probationcondition = probcon;
  }

  ojt: boolean = false;
  ojtcondition: any;
  ojtDuration: any;

  SetOjt(ojtcon: any) {
    if (ojtcon == 1) {
      this.ojt = true;
    } else {
      this.ojt = null;
      this.ojtDuration = ''
      this.WalkinForm.value.ojtDuration = "";
      this.ojtvalidsts = true;
    }
    this.ojtcondition = ojtcon;
  }


  Back() {
    // this._location.back();
    this.router.navigate(['/WalkinList', { Redirection: btoa('1') }]);
  }

  errmsg: any = '';
  postvalid: boolean = true;

  mandatorySign: boolean = true;
  onChangeJobType(jobType: any) {
    if (jobType != "Freelancer") {
      this.mandatorySign = true;
    }
    else {
      this.mandatorySign = false;
    }
  }
  comapanid: any;
  adminid: any;
  userid: any;
  ComapanyId: any;
  AdminId: any;
  UserId: any;
  postwalkin(formvalue) {
    var email_ptrn = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (this.WalkinForm.value.Comapany_User == '') {
      this.toastrService.error('Please Select User');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.JobTitle == '') {
      this.toastrService.error('Please Enter JobTitle');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.CompanyName == '') {
      this.toastrService.error('Please Enter Company Name');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.industry == '') {
      this.toastrService.error('Please Select Industry');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.functionalarea == '') {
      this.toastrService.error('Please Select Functional Area');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.JobDescription == '') {
      this.toastrService.error('Please Enter Job Description');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.RolesresPonsiblty == '') {
      this.toastrService.error('Please Enter Roles and Responsiblty');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.ValidDate == '') {
      this.toastrService.error('Please Select Walkin From Date');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.walkintodate == '') {
      this.toastrService.error('Please Select Walkin To Date');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.ValidDate > this.WalkinForm.value.walkintodate) {

      this.toastrService.error('Please Select Valid Walkin From And To Date');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.walkinfromtime == '') {
      this.toastrService.error('Please Select Walkin From Time');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.walkintotime == '') {
      this.toastrService.error('Please Select Walkin To Time');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    let walkinfromtime = this.WalkinForm.value.walkinfromtime;
    let walkintotime = this.WalkinForm.value.walkintotime;
    if (walkintotime < walkinfromtime) {
      this.toastrService.error('Invalid Walkin To Time');
      window.scroll(0, 0);
      return false;
    }
    if (this.probation) {
      if (this.WalkinForm.value.ProbationDuration == '') {
        this.toastrService.error('Please add Probation Duration');
        this.postvalid = false;
        window.scroll(0, 0);
        return false;
      } else if (this.WalkinForm.value.ProbationDuration == undefined) {
        this.toastrService.error('Please add Probation Duration');
        this.postvalid = false;
        window.scroll(0, 0);
        return false;
      }
      else if (this.WalkinForm.value.ProbationDuration < 1) {
        this.toastrService.error('Probation Duration should be greater then 0');
        window.scroll(0, 0);
        return false;
      }
    }
    if (this.ojt) {
      if (this.WalkinForm.value.ojtDuration == '') {
        this.toastrService.error('Please add OJT Duration');
        this.postvalid = false;
        window.scroll(0, 0);
        return false;
      } else if (this.WalkinForm.value.ojtDuration == undefined) {
        this.toastrService.error('Please add OJT Duration');
        this.postvalid = false;
        window.scroll(0, 0);
        return false;
      } else if (this.WalkinForm.value.ojtDuration < 1) {
        this.toastrService.error('OJT Duration should be greater then 0');
        window.scroll(0, 0);
        return false;
      }
    }
    if (walkinfromtime < '06') {
      this.toastrService.error('Walkin Timing Must Be Between 6 Am To 10 PM');
      window.scroll(0, 0);
      return false;
    }
    if (walkintotime > '22:00') {
      this.toastrService.error('Walkin Timing Must Be Between 6 Am To 10 PM');
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.walkinStateVenuID == '') {
      this.toastrService.error('Please Select Walkin State');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.walkinDistrictID == '') {
      this.toastrService.error('Please Select Walkin District');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.VenuDetail == '') {
      this.toastrService.error('Please Enter Venue Address');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.PersonName == '') {
      this.toastrService.error('Please Enter Person Name');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.Designation == '') {
      this.toastrService.error('Please Enter Designation');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.Email == '') {
      this.toastrService.error('Please Enter Email');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (!email_ptrn.test(this.WalkinForm.value.Email)) {
      this.toastrService.error('PleaseShiftTime Enter valid Email');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.MinEducation == '') {
      this.toastrService.error('Please Select Minimum   Education');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.WalkinForm.value.Male == true || this.WalkinForm.value.Female == true || this.WalkinForm.value.Transgender == true) {
      this.gendersts = true;
    } else {
      this.gendersts = false;
    }
    if (this.gendersts == false) {
      this.toastrService.error('Please Select Gender');
      this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }
    if (this.maxAge > 0) {
      if (this.minAge == 0) {
        this.toastrService.error('Please Select Min Age');
        this.postvalid = false;
        window.scroll(0, 0);
        return false;
      }
    }
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.submitbtnsts = false;
    //this.ComapanyId=this.companyid;
    this.AdminId = adminid;

    var str = this.WalkinForm.value.LandlineNumber;
    var reg = '000000000000';
    if (str != "" && str != null && str != undefined) {
      if (str.match(reg)) {
        this.toastrService.error("Please enter valid landline number");
        return false
      }
    }

    // this.UserId=this.WalkinForm.value.Comapany_User;

    // this.walkindetail.PostedBy = this.UserInfo.loginType;
    //this.walkindetail.PostedBy = this.companydetails.loginType;
    this.walkindetail.PostedBy = '';
    this.walkindetail.UserID = this.WalkinForm.value.Comapany_User;
    this.walkindetail.AdminId = this.AdminId;
    this.walkindetail.JobTitle = this.WalkinForm.value.JobTitle;
    this.walkindetail.CompanyName = this.WalkinForm.value.CompanyName;
    this.walkindetail.JobDescription = this.WalkinForm.value.JobDescription;
    this.walkindetail.RolesresPonsiblty = this.WalkinForm.value.RolesresPonsiblty;
    this.walkindetail.Keyword = this.WalkinForm.value.Keyword;
    this.walkindetail.Name = this.WalkinForm.value.PersonName;
    this.walkindetail.Designation = this.WalkinForm.value.Designation;
    this.walkindetail.Mobile = this.WalkinForm.value.Mobile;
    this.walkindetail.LandlineNumber = this.WalkinForm.value.LandlineNumber;
    this.walkindetail.Email = this.WalkinForm.value.Email;
    this.walkindetail.MinEducation = this.WalkinForm.value.MinEducation;
    this.walkindetail.Specialization = this.WalkinForm.value.Specialization;
    this.walkindetail.MinExp = this.minExp;
    this.walkindetail.MaxExp = this.maxExp;
    this.walkindetail.ISprobationtime = this.WalkinForm.value.ISprobationtime;
    this.walkindetail.ProbationDuration = this.WalkinForm.value.ProbationDuration ? this.WalkinForm.value.ProbationDuration : '0';
    this.walkindetail.AgeMin = this.minAge;
    this.walkindetail.AgeMax = this.maxAge;
    this.walkindetail.OtherDetail = this.WalkinForm.value.OtherDetail;
    if (this.WalkinForm.value.EmailPublic == true) {
      this.walkindetail.EmailPublic = true;
    } else {
      this.walkindetail.EmailPublic = false;
    }
    this.walkindetail.walkinid = 0;
    this.walkindetail.VenueDetail = this.WalkinForm.value.VenuDetail;
    this.walkindetail.WalkInDate = this.WalkinForm.value.WalkInDate;
    this.walkindetail.WalkinStatedId = this.WalkinForm.value.walkinStateVenuID;
    this.walkindetail.WalkinDistrictId = this.WalkinForm.value.walkinDistrictID;
    this.walkindetail.HeightFeet = this.WalkinForm.value.feet ? this.WalkinForm.value.feet : 0;
    this.walkindetail.HeightInch = this.WalkinForm.value.inch ? this.WalkinForm.value.inch : 0;
    this.walkindetail.Weight = this.WalkinForm.value.weight ? this.WalkinForm.value.weight : 0;
    this.walkindetail.IsOjt = this.WalkinForm.value.IsOjt;
    this.walkindetail.ojtDuration = this.WalkinForm.value.ojtDuration ? this.WalkinForm.value.ojtDuration : '0';
    this.walkindetail.ShiftTime = this.WalkinForm.value.ShiftTime;
    this.walkindetail.Male = this.WalkinForm.value.Male ? 1 : 0;
    this.walkindetail.Female = this.WalkinForm.value.Female ? 2 : 0
    this.walkindetail.Transgender = this.WalkinForm.value.Transgender ? 3 : 0
    this.walkindetail.IndustryArea = this.WalkinForm.value.industry;
    this.walkindetail.FunctionalArea = this.WalkinForm.value.functionalarea;
    this.walkindetail.WalkInDate = this.WalkinForm.value.ValidDate;
    this.walkindetail.WalkinToDate = this.WalkinForm.value.walkintodate;
    this.walkindetail.WalkinFromTime = this.WalkinForm.value.walkinfromtime;
    this.walkindetail.WalkinToTime = this.WalkinForm.value.walkintotime;
    this.walkindetail.sectorTradeList = this.NewSectorShow;
    this.JobFormDesable = false;
    this.spinnerService.show();
    this.WalkinPostService.AddWalkinId(this.walkindetail).subscribe(res => {
      this.Responce = res;
      if (this.Responce != null) {
        if (this.Responce.responseResult == true) {
          this.JobFormDesable = false;
          this.WalkinPostService.addWalkinListing(this.newAttribute, this.Responce.id, this.AdminId, this.UserId).subscribe(res => {
            if (res) {
              this.spinnerService.hide();
              this.toastrService.success(this.Responce.message);
              // this.router.navigate(['/WalkinList']);
              this.router.navigate(['/WalkinList', { Redirection: btoa('1') }]);
            }
          });

        } else {
          this.JobFormDesable = true;
          this.spinnerService.hide();
          this.toastrService.error(this.Responce.message);
        }
      }
      else {
        this.JobFormDesable = true;
        this.Responce = [];
      }
    });
  }

  WalkinListRedirection() {
    this.router.navigate(['/WalkinList']);
  }

  ValidatePubilcReg() {
    var IsValid = true;
    var errorMsg = "";
    var regEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (IsValid) {

      if (this.WalkinForm.value.State) {
        errorMsg += "Please Select State. <br/>";
        IsValid = false;
      }
      if (this.WalkinForm.value.districtname) {
        errorMsg += "Please Select district . <br/>";
        IsValid = false;
      }
      if (this.WalkinForm.value.vacancycount) {
        errorMsg += "Please Select no of vacancycount . <br/>";
        IsValid = false;
      }
      if (this.WalkinForm.value.language) {
        errorMsg += "Please Select no of language . <br/>";
        IsValid = false;
      }
    }
    if (!IsValid)
      this.toastrService.error(errorMsg, null, { enableHtml: true });
    return IsValid;
  }

  validateWeight(weight) {
  }

  ojtvalidsts = true;
  validateOjt(ojt) {
    if (ojt != '') {
      if (ojt.length > 5) {
        this.ojtvalidsts = false;
      } else {
        this.ojtvalidsts = true;
      }
    }
  }

  industries: any = [];

  GetIndustry() {
    this.masterService.GetAllIndustryArea().subscribe(res => {
      this.industries = res;
    });
  }

  functionalareas: any = [];
  GetFunctionalArea() {
    this.masterService.GetAllFunctionArea().subscribe(res => {
      this.functionalareas = res;
    });

  }

  filldefault() {
    // this.WalkinForm.controls['CompanyName'].setValue(this.UserInfo.companyName);
    // this.WalkinForm.controls['Mobile'].setValue(this.UserInfo.mobile);
    // this.WalkinForm.controls['PersonName'].setValue(this.UserInfo.fullName);
    // this.WalkinForm.controls['Email'].setValue(this.UserInfo.email);
    // this.WalkinForm.controls['Designation'].setValue(this.UserInfo.designation);
  }

  clear() {
    this.noofvacancystssts = true;
  }

  checkAge() {
    var max = this.maxAge;
    var min = this.minAge;
    if (max > 0) {
      if (min == 0) {
        this.toastrService.error('Please Select Minimum age 15');
      }
    }
  }

  deleteWalkin(index: number) {
    this.newAttributeShow.splice(index, 1);
    this.newAttribute.splice(index, 1);
    this.modalRef.hide();
  }

  modalRef: BsModalRef;

  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {
    this.modalRef.hide();
  }
  GetJobPostData() {
    this.WalkinForm.controls['CompanyName'].setValue(this.companydetails.companyName);
  }

  Userdetails: any = [];
  GetUserDetails(userId: any) {
    this.WalkinPostService.GetUserDetails(userId).subscribe(res => {
      this.dbresponse = res;
      if (this.dbresponse != null) {
        this.Userdetails = this.dbresponse.lstGetUserDetail[0];
        this.WalkinForm.controls['Mobile'].setValue(this.Userdetails.mobile);
        this.WalkinForm.controls['PersonName'].setValue(this.Userdetails.name);
        this.WalkinForm.controls['Email'].setValue(this.Userdetails.email);
        this.WalkinForm.controls['Designation'].setValue(this.Userdetails.designation)


      }
      else {
        this.Userdetails = [];

      }
    });

  }

  ////////////////  sector section //////////
  NewSectorShow: any = [];
  NewSectorData: any = [];
  NewSecterTempData: any = [];

  // AddSectorValue()
  // {
  //        if(this.SectorForm.value.SectorID=='')
  //        {
  //          this.toastrService.error('Please Select Training Sector');
  //         return false;
  //        }
  //        if(this.SectorForm.value.TradeID=='')
  //        {
  //         this.toastrService.error('Please Select Training Trade');
  //         return false;
  //        }
  //        let sectorid;
  //         let tradeid;
  //         sectorid=this.SectorForm.value.SectorID;
  //         tradeid = this.SectorForm.value.TradeID;

  //         let sectorname = (this.Sector).filter(function (entry) {
  //           return entry.id == sectorid;
  //         });
  //         let tradename = (this.Trade).filter(function (entry) {
  //           return entry.id == tradeid;
  //         });
  // this.NewSectorShow.push({
  //   "SectorID": sectorname!=''?sectorname[0].name:'N/A',
  //   "TradeID":tradename!=''?tradename[0].name:'N/A',

  // });
  // this.NewSecterTempData.push({
  //   "SectorID": this.SectorForm.value.SectorID,
  //   "TradeID":this.SectorForm.value.TradeID,
  // });
  // //this.NewSectorData.push(this.SectorForm.value);
  // this.NewSectorData.push(
  //   {
  //   "sectorId": this.SectorForm.value.SectorID,
  //   "sectorName":sectorname[0].name,
  //   "tradeId": this.SectorForm.value.SectorID,
  //   "tradeName":tradename[0].name, 
  //   "isActive":1,
  //   }
  //   );

  // this.NewSecterTempData = [];
  // this.SectorForm.controls['SectorID'].setValue("");
  // this.SectorForm.controls['TradeID'].setValue("");

  // }
  AddSectorValue() {
    if (this.SectorForm.value.SectorID == '') {
      this.toastrService.error('Please Select Training Sector');
      return false;
    }
    if (this.SectorForm.value.TradeID == '') {
      this.toastrService.error('Please Select Training Trade');
      return false;
    }
    let sectorid;
    let tradeid;
    sectorid = this.SectorForm.value.SectorID;
    tradeid = this.SectorForm.value.TradeID;
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
    //  HEM 4 MARCH 2019
    this.NewSecterTempData = [];
    this.Trade = [];
    this.SectorForm.controls['SectorID'].setValue("");
    this.SectorForm.controls['TradeID'].setValue("");
  }
  modalRefSector: BsModalRef;
  deleteSector(index: number) {
    this.NewSectorShow.splice(index, 1);
    this.NewSectorData.splice(index, 1);
    this.modalRefSector.hide();
  }
  declineBoxSecor(): void {
    this.modalRefSector.hide();
  }
  PusTemplateSector(templateSector: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-sm' });
  }
  ////////////////  End Sector Section //////////////


}

