import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { JobpostService } from '../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../Globals/app.config';
import { UserInfoService } from '../../Services/userInfo.service.';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Location } from '@angular/common';
import { Options } from 'ng5-slider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ScreeningQuestionService } from '../../Services/screeningQuestion.service';

@Component({
  selector: 'app-CreateJobComponent',
  templateUrl: './CreateJob.Component.html',
})
export class CreateJobComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild('JobForms') JobForms: HTMLFormElement;
  CurrentDate: Date = new Date();
  AgeMsg = true;
  ExpMsg = true;
  CtcMsg = true;
  NetSalaryMsg = true;
  openingformValid = true;
  jobFromvalid = true;
  UserInfo: any;
  Responce: any = {};
  DBResponce: any = {};
  lstState: any = [];
  lstAllLanguage: any = [];
  joiningpriority: any = [];
  mineducation: any = [];
  district: any = [];
  city: any = [];
  openingdetail: any = {};
  jobdetail: any = {};
  jobopeningdetail: any = {};
  newAttribute: any = [];
  newAttributeShow: any = [];
  lstFunctionalArea: any = [];
  lstIndustryArea: any = [];
  respIndustryArea: any = {};
  respFunctionalArea: any = {};
  JobForm: FormGroup;
  joblist: any = {};
  lstGender: any;
  status = true;
  statusAge = true;
  showAgency: any = '0';
  showEmployer: any = '0';
  companytype: any;
  UserID: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  minDate = new Date();
  JobFormDesable: boolean = true;
  minExp: number = 0;
  maxExp: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
  minNetSalary: number = 0;
  maxNetSalary: number = 0;
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

  btnsts: boolean = true;
  SectorForm: FormGroup;


  constructor(private screeningService: ScreeningQuestionService
    , private appConfig: AppConfig
    , private toastrService: ToastrService
    , private userinfoservice: UserInfoService
    , private masterService: MasterService
    , private jobpostService: JobpostService
    , private modalService: BsModalService
    , private formBuilder: FormBuilder
    , private _location: Location,
    private activatedRoute: ActivatedRoute
    , private router: Router
    , private spinnerService: Ng4LoadingSpinnerService) {

    try {
      this.UserInfo = appConfig.UserInfo
    } catch  { }

  }

  companyid: any;
  phpadminid: any = [];
  company: any = [];
  dbresponse: any = [];
  companydetails: any = [];
  dbresponse1: any = [];
  ngOnInit() {

    this.CurrentDate.setDate(this.CurrentDate.getDate() + 1);
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.companyid = params['companyid'];
      this.companydetails = [];
      this.phpadminid = localStorage.getItem('phpadminid');
      var adminid = JSON.parse(this.phpadminid);
      this.jobpostService.GetCompanyDetails(this.companyid, adminid).subscribe(res => {
        this.dbresponse1 = res
        if (this.dbresponse1.lstCompanyProfile != null) {
          this.companydetails = this.dbresponse1.lstCompanyProfile;
          this.companydetails = this.companydetails[0];
          this.GetJobPostData();
        } else {
          this.companydetails = this.dbresponse1.lstCompanyProfile1;
          this.companydetails = this.companydetails;
        }
      });
    });

    window.scroll(0, 0);
    this.GetAllJoiningPriority();
    this.GetAllFunctionArea();
    this.GetMinEducation();
    this.GetAllStates();
    this.GetAllLanguage();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    this.JobForm = this.formBuilder.group({
      JobTitle: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      CompanyName: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      Specialization: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      ShiftTime: ['FullTime', [Validators.nullValidator,]],
      ojtDuration: ['', [Validators.nullValidator,]],
      IsOjt: ['false', [Validators.nullValidator,]],
      Agency: ['', [Validators.nullValidator,]],
      Employeer: ['', [Validators.nullValidator,]],
      AgencyName: ['', [Validators.nullValidator,]],
      EmployerName: ['', [Validators.nullValidator,]],
      Weight: ['', [Validators.nullValidator,]],
      heightFeet: ['', [Validators.nullValidator,]],
      heightInch: ['', [Validators.nullValidator,]],
      JoiningPriorityId: ['', [Validators.required,]],
      Name: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      JobDescription: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      Mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      Email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      EmailPublic: ['false', [Validators.nullValidator,]],
      RolesresPonsiblty: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      Keyword: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      LandlineNumber: ['', [Validators.nullValidator,]],
      MinExp: ['', [Validators.nullValidator,]],
      MaxExp: ['', [Validators.nullValidator,]],
      AgeMin: ['', [Validators.nullValidator,]],
      AgeMax: ['', [Validators.nullValidator,]],
      OtherDetail: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ISprobationtime: ['false', [Validators.nullValidator,]],

      Transgender: ['', [Validators.nullValidator,]],
      Female: ['', [Validators.nullValidator,]],
      Male: ['', [Validators.nullValidator,]],
      ProbationDuration: ['', Validators.nullValidator,],
      MinEducation: ['', [Validators.required,]],
      ValidDate: ['', [Validators.required,]],

      JobId: ['', [Validators.nullValidator,]],
      StateID: ['', [Validators.nullValidator,]],
      DistrictID: ['', [Validators.nullValidator,]],
      CityID: ['', [Validators.nullValidator,]],
      NoOfVacancy: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      LanguageId: ['', [Validators.nullValidator,]],
      NetSalary: ['', [Validators.nullValidator,]],
      MaxCtc: ['', [Validators.nullValidator,]],
      MinCtc: ['', [Validators.nullValidator,]],
      IndustryArea: ['', [Validators.required]],
      FunctionalArea: ['', [Validators.required]],
      User: ['', [Validators.required]],
      Isscreening: ['', [Validators.nullValidator,]],
      screening: ['', [Validators.nullValidator,]],
      question: ['', [Validators.compose([CustomValidators.removeSpaces])]],


      ContactName: ['', [, Validators.compose([CustomValidators.removeSpaces])]],
      ContactDesignation: ['', [Validators.compose([CustomValidators.removeSpaces])]],
      ContactMobile: ['', [Validators.compose([CustomValidators.validMobile])]],
      ContactEmail: ['', [Validators.compose([CustomValidators.vaildEmail])]],
      ContactEmailPublic: ['false', [Validators.nullValidator,]],
      ContactLandlineNumber: ['', [Validators.nullValidator,]],
      Allowance: ['', [Validators.nullValidator,]],
      minNetSalary: ['', [Validators.nullValidator,]],
      maxNetSalary: ['', [Validators.nullValidator,]],

      Scheme: ['', [Validators.nullValidator,]],


    });
    this.SectorForm = this.formBuilder.group({
      SectorID: ['', Validators.nullValidator,],
      TradeID: ['', [Validators.nullValidator,]],
    });
    this.GetAllIndustryArea();
    this.filldefault()
    this.GetAllJoiningPriority();
    this.getUser();
    this.GetAllSector(0);
    this.GetSalaryComponent();
    this.Getallscheme();
  }

  companyId: any;
  jobpostviewshow: any;
  DbResponce: any = [];
  onClicked(companyid: string) {
    if (companyid != '') {
      this.jobpostviewshow = '1';
      this.companyId = companyid;
    }
  }
  onbackregist() {
    this.jobpostviewshow = '0';
  }

  Genderformarray: any = [];
  onchangeGender(Gender: string, ischecked: boolean) {
    if (ischecked) {
      this.Genderformarray.push(Gender);
    } else {
      let index = this.Genderformarray.indexOf(Gender);
      this.Genderformarray.splice(index, 1);
    }
  }

  LangFormArray: any = [];
  onItemSelect(item: any) {
    this.LangFormArray.push(item.name);
  }

  onItemDeSelect(item: any) {
    let index = this.LangFormArray.indexOf(item.name);
    this.LangFormArray.splice(index, 1);
  }

  onSelectAll(items: any) {
    this.LangFormArray = [];
    for (var i = 0; i < items.length; i++) {
      this.LangFormArray.push(items[i].name);
    }
  }

  onDeSelectAll(items: any) {
    this.LangFormArray = [];
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

  addFieldValue() {//Used to add openings
    this.minNetSalary = parseInt(this.JobForm.value.minNetSalary);
    this.maxNetSalary = parseInt(this.JobForm.value.maxNetSalary);

    this.minCtc = this.JobForm.value.MinCtc != '' ? parseInt(this.JobForm.value.MinCtc) : 0;
    this.maxCtc = this.JobForm.value.MaxCtc != '' ? parseInt(this.JobForm.value.MaxCtc) : 0;

    if (this.JobForm.value.ShiftTime != "Freelancer") {
      if (this.minCtc == 0 && this.maxCtc == 0) {
        this.toastrService.error("Add ctc min and max option");
        return false;
      }
      if (this.minCtc < 5000) {
        this.toastrService.error("Please select minimum CTC 5000.");
        return false;
      }
      if (this.maxCtc < this.minCtc) {
        this.toastrService.error("MaxCtc should not be less than Minctc.");
        return false;
      }
      if (this.JobForm.value.NetSalary > this.maxCtc) {
        this.toastrService.error("Net salary must be less than or equal to max ctc");
        return false;
      }
    }
    if ((this.JobForm.value.minNetSalary != '' && this.JobForm.value.maxNetSalary == '') || (this.JobForm.value.minNetSalary == '' && this.JobForm.value.maxNetSalary != '')) {
      this.toastrService.error("Please enter min and max in hand salary");
      return false;
    }
    else {
      if ((this.minNetSalary > this.maxNetSalary)) {
        this.toastrService.error("Minimum in hand salary should not be greater than maximum in hand salary");
        return false;
      }
      if (this.JobForm.value.minNetSalary != "") {
        if ((this.minNetSalary > this.minCtc)) {
          // this.toastrService.error("Minimum in hand salary should not be less than minimum ctc");
          // this.toastrService.error("In Hand salary must be less than or equal to max ctc");
          this.toastrService.error("Minimum in hand salary should not be greater than minimum ctc");
          return false;
        }
      }
      if (this.JobForm.value.maxNetSalary != "") {
        if ((this.maxNetSalary > this.maxCtc)) {
          this.toastrService.error("Maximum in hand salary should not be greater than maximum ctc");
          return false;
        }
      }
    }

    if (this.maxCtc > 0 || this.minCtc >= 5000) {
      this.status = true;
    }
    if (this.status == false || (this.maxCtc > 0 && this.minCtc == 0)) {
      this.toastrService.error("Min ctc must be greater than or equal to 5000");
      return false;
    }

    if (this.ValidatePubilcReg()) {
      this.openingdetail.StateId = this.JobForm.value.StateID;
      this.openingdetail.DistrictId = this.JobForm.value.DistrictID == '' ? 0 : this.JobForm.value.DistrictID;
      this.openingdetail.CityId = this.JobForm.value.CityID == '' ? 0 : this.JobForm.value.CityID;
      this.openingdetail.NoOfVacancy = this.JobForm.value.NoOfVacancy;
      this.openingdetail.LanguageId = this.JobForm.value.LanguageId;
      this.openingdetail.MinCtc = this.minCtc;
      this.openingdetail.MaxCtc = this.maxCtc;
      this.openingdetail.NetSalary = this.minNetSalary;
      this.openingdetail.MaxNetSalary = this.maxNetSalary;
      //this.openingdetail.NetSalary = this.JobForm.value.NetSalary == '' ? 0 : this.JobForm.value.NetSalary;

      // for contact person for opening
      this.openingdetail.ContactName = this.JobForm.value.ContactName;
      this.openingdetail.ContactDesignation = this.JobForm.value.ContactDesignation;
      this.openingdetail.ContactMobile = this.JobForm.value.ContactMobile;
      this.openingdetail.ContactLandlineNumber = this.JobForm.value.ContactLandlineNumber;
      this.openingdetail.ContactEmail = this.JobForm.value.ContactEmail;
      this.openingdetail.isContactSharedPublic = this.JobForm.value.ContactEmailPublic ? this.JobForm.value.ContactEmailPublic : false;
      this.openingdetail.Contactid = 0;
      // end  
      let statedid;
      let districtid;
      let cityid;
      let languageid;
      statedid = this.JobForm.value.StateID;
      districtid = this.JobForm.value.DistrictID;
      cityid = this.JobForm.value.CityID;
      languageid = this.JobForm.value.LanguageId;

      let statename = (this.lstState).filter(function (entry) {
        return entry.id == statedid;
      });
      let districtname = (this.district).filter(function (entry) {
        return entry.id == districtid;
      });
      let cityname = (this.city).filter(function (entry) {
        return entry.id == cityid;
      });
      this.showAddButton = true;
      this.showviewButton = false;
      var sharejob
      if (this.JobForm.value.ContactEmailPublic == true) {
        sharejob = 'Yes';
      }
      else {
        sharejob = 'No';
      }
      this.newAttributeShow.push({
        "statename": statename[0]['stateName'] = '' ? '' : statename[0]['stateName'],
        "districtname": districtname == '' ? '' : districtname[0]['districtName'],
        "cityname": cityname == '' ? '' : cityname[0]['cityname'],
        "languageanme": this.LangFormArray,
        "vacancycount": this.JobForm.value.NoOfVacancy,
        "MaxCtc": this.maxCtc,
        "MinCtc": this.minCtc,
        "MaxNetSalary": this.maxNetSalary ? this.maxNetSalary : 0,
        "MinNetSalary": this.minNetSalary ? this.minNetSalary : 0,
        //"NetSalary": this.JobForm.value.NetSalary,

        // for contact person for opening
        "ContactName": this.JobForm.value.ContactName,
        "ContactDesignation": this.JobForm.value.ContactDesignation,
        "ContactMobile": this.JobForm.value.ContactMobile,
        "ContactLandlineNumber": this.JobForm.value.ContactLandlineNumber,
        "ContactEmail": this.JobForm.value.ContactEmail,
        "isContactSharedPublic": sharejob

      });

      this.newAttribute.push(this.openingdetail);
      this.openingdetail = {};
      this.district = [];
      this.city = [];
      this.JobForm.controls['StateID'].setValue("");
      this.JobForm.controls['DistrictID'].setValue("");
      this.JobForm.controls['CityID'].setValue("");
      this.JobForm.controls['NoOfVacancy'].setValue("");
      this.JobForm.controls['LanguageId'].setValue("");
      this.LangFormArray = [];
      // this.JobForm.controls['NetSalary'].setValue("");
      this.JobForm.controls['minNetSalary'].setValue("");
      this.JobForm.controls['maxNetSalary'].setValue("");
      this.minCtc = 0;
      this.maxCtc = 0;
      this.CtcOptions = {
        floor: 0,
        ceil: 250000,
        step: 1
      };
      this.JobForm.controls['MaxCtc'].setValue("");
      this.JobForm.controls['MinCtc'].setValue("");

      // for contact person for opening
      this.JobForm.controls['ContactName'].setValue("");
      this.JobForm.controls['ContactDesignation'].setValue("");
      this.JobForm.controls['ContactMobile'].setValue("");
      this.JobForm.controls['ContactEmail'].setValue("");
      this.JobForm.controls['ContactLandlineNumber'].setValue("");
      this.JobForm.controls['ContactEmailPublic'].setValue("");

    }
  }
  filldefault() {


  }



  Schemevalue: any;
  Schemelist: any;
  schemelist: any = [];
  // Getchangetradesector(event:any){
  //   this.Schemevalue=event;
  //   alert(this.Schemevalue);

  // }

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
        this.joiningpriority = res
        if (this.joiningpriority != null && this.joiningpriority.length > 0) {
          this.joiningpriority = this.joiningpriority;
        }
      });
    } catch  { }
  }

  private GetMinEducation() {
    try {
      this.masterService.GetAllMinEducation().subscribe(res => {
        this.mineducation = res

        if (this.mineducation != null && this.mineducation.length > 0) {
          this.mineducation = this.mineducation;
        }
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    if (statename != '') {
      this.JobForm.controls[('DistrictID')].setValue('');
      this.JobForm.controls[('CityID')].setValue('');
      this.GetAllDistrict(statename);
      this.GetAllCity(statename);
    } else {
      this.district = [];
      this.city = [];
    }
  }
  private GetAllDistrict(id: any) {
    try {
      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res
        if (this.district != null && this.district.length > 0) {
          this.district = this.district;
        }
      });
    } catch  { }
  }

  districtValid: boolean = false;

  GetAllCity(id: any) {
    this.masterService.GetAllCity(id).subscribe(res => {
      this.city = res
      if (this.city != null && this.city.length > 0) {
        this.city = this.city;
      }
    });
  }

  ValidateExperience(expfrom, expto) {
    let experiencefrom = expfrom;
    let experienceto = expto;
    if (this.minExp > this.maxExp) {
      this.jobFromvalid = false;
      this.ExpMsg = false;
    } else {
      this.jobFromvalid = true;
      this.ExpMsg = true;
    }
  }

  ValidateAge(Max, Min) {
    if (this.maxAge < this.minAge) {
      this.AgeMsg = false;
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
      this.AgeMsg = true;
    }
  }

  ValidateCtc(minctc, maxctc) {
    if (this.minCtc > this.maxCtc) {
      this.openingformValid = false;
      this.CtcMsg = false;
    } else {
      this.openingformValid = true;
      this.CtcMsg = true;
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
      this.JobForm.controls['ProbationDuration'].setValue("");
    }
    this.probationcondition = probcon;
  }

  ojt: boolean = false;
  SetOjt(probcon: any) {

    if (probcon == 1) {
      this.ojt = true;
      this.jobFromvalid = false;
    } else {
      this.ojt = null;
      this.jobFromvalid = true;
      this.JobForm.controls['ojtDuration'].setValue("");
    }
  }

  Back() {
    this.router.navigate(['/JobList', { Redirection: btoa('1') }]);
  }

  GetGender() {
    this.masterService.GetGender().subscribe(res => {
      this.lstGender = res;
    });
  }

  // blockHindi(evt) {
  //   // evt = (evt) ? evt : window.event;
  //   var charCode = (evt.which) ? evt.which : evt.keyCode;
  //   // var charCode = evt
  //   if (charCode > 0900 && charCode< 0977 ) {
  //     alert("OK")
  //     return false;
  //   }
  //   return false
  //   // return true;
  // }


  newJobId: any;
  adminId: any;
  postjob() { //Use to submit the form data
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    if (this.maxAge > 0 || this.minAge >= 15) {
      this.statusAge = true;
    }
    if (this.statusAge == false || (this.maxAge > 0 && this.minAge == 0)) {
      this.toastrService.error("Minimum age must be greater than or equal to 15");
      return false;
    }

    if (this.JobForm.controls.JobDescription.value.trim() == '' || this.JobForm.controls.RolesresPonsiblty.value.trim() == '' || this.JobForm.controls.Name.value.trim() == '' || this.JobForm.controls.Designation.value.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false;
    }

    // if(this.JobForm.controls.JobDescription.value!=''){
    //   this.blockHindi(this.JobForm.controls.JobDescription.value);
    //   // return false;
    // }
    this.JobFormDesable = false;
    if (this.newAttribute.length > 0 && this.jobFromvalid) {
      this.jobdetail.JobTitle = this.JobForm.value.JobTitle;
      this.jobdetail.CompanyName = this.JobForm.value.CompanyName;
      this.jobdetail.Name = this.JobForm.value.Name;
      this.jobdetail.Designation = this.JobForm.value.Designation;
      this.jobdetail.JobDescription = this.JobForm.value.JobDescription;
      this.jobdetail.Mobile = this.JobForm.value.Mobile;
      this.jobdetail.Email = this.JobForm.value.Email;
      this.jobdetail.EmailPublic = this.JobForm.value.EmailPublic;
      this.jobdetail.RolesresPonsiblty = this.JobForm.value.RolesresPonsiblty;
      this.jobdetail.Keyword = this.JobForm.value.Keyword;
      this.jobdetail.LandlineNumber = this.JobForm.value.LandlineNumber;
      this.jobdetail.Specialization = this.JobForm.value.Specialization;
      this.jobdetail.MinExp = this.minExp;
      this.jobdetail.MaxExp = this.maxExp;
      this.jobdetail.AgeMin = this.minAge;
      this.jobdetail.AgeMax = this.maxAge;
      this.jobdetail.jobId = this.JobForm.value.jobId;
      this.jobdetail.OtherDetail = this.JobForm.value.OtherDetail;
      this.jobdetail.Male = this.JobForm.value.Male ? 1 : 0;
      this.jobdetail.Female = this.JobForm.value.Female ? 2 : 0
      this.jobdetail.Transgender = this.JobForm.value.Transgender ? 3 : 0
      this.jobdetail.ProbationDuration = this.JobForm.value.ProbationDuration != '' ? this.JobForm.value.ProbationDuration : 0;
      this.jobdetail.MinEducation = this.JobForm.value.MinEducation;
      this.jobdetail.ValidDate = this.JobForm.value.ValidDate;
      this.jobdetail.ISprobationtime = this.JobForm.value.ISprobationtime;
      this.jobdetail.ojtDuration = this.JobForm.value.ojtDuration != '' ? this.JobForm.value.ojtDuration : 0;
      this.jobdetail.IsOjt = this.JobForm.value.IsOjt;
      this.jobdetail.Agency = this.JobForm.value.Agency;
      this.jobdetail.Employeer = this.JobForm.value.Employeer;
      this.jobdetail.Weight = this.JobForm.value.Weight == '' ? '0' : this.JobForm.value.Weight;
      this.jobdetail.heightFeet = this.JobForm.value.heightFeet == '' ? '0' : this.JobForm.value.heightFeet;
      this.jobdetail.heightInch = this.JobForm.value.heightInch == '' ? '0' : this.JobForm.value.heightInch;
      this.jobdetail.ShiftTime = this.JobForm.value.ShiftTime;
      this.jobdetail.JoiningPriorityId = this.JobForm.value.JoiningPriorityId;
      this.jobdetail.FunctionalArea = this.JobForm.value.FunctionalArea;

      this.jobdetail.schemeId = this.JobForm.value.Scheme;

      this.jobdetail.IndustryArea = this.JobForm.value.IndustryArea;
      this.jobdetail.UserID = this.JobForm.value.User;
      this.jobdetail.AdminId = this.adminId;
      this.jobdetail.sectorTradeList = this.NewSectorShow;
      this.jobdetail.Isscreening = this.JobForm.value.screening == "true" ? 1 : 0;
      this.jobdetail.Allowance = this.FinalAllowance;
      if (this.companydetails.loginType != null) {
        this.jobdetail.POSTEDBY = this.companydetails.loginType;
      } else {
        this.jobdetail.POSTEDBY = '';
      }
      this.spinnerService.show();
      this.btnsts = false;
      this.jobpostService.CreateJob(this.jobdetail).subscribe(res => {
        this.Responce = res;

        if (this.Responce.responseResult != true) {
          this.spinnerService.hide();
          this.toastrService.error(this.Responce.message);
          this.btnsts = true;
        } else {
          this.jobopeningdetail = this.newAttribute;
          this.newJobId = this.Responce.id;
          this.jobpostService.GetJobOpening(this.jobopeningdetail, this.Responce.id, this.adminId, this.jobdetail.UserID).subscribe(res => {
            this.Responce = res;
            if (this.Responce.responseResult != true) {
              this.JobFormDesable = true;
              this.spinnerService.hide();
              this.toastrService.error(this.Responce.message);
            } else {
              this.btnsts = false;
              this.spinnerService.hide();
              if (this.isChecked) {
                this.saveQuestion(this.newJobId);
              }
              this.toastrService.success(this.Responce.message);
              this.JobForm.reset();
              this.newAttributeShow = [];
              this.router.navigate(['/JobList', { Redirection: btoa('1') }]);

            }
          });
        }
      });

    } else {
      this.toastrService.error("Please add opening details");
    }
  }

  jobListRedirection() {
    this.router.navigate(['/JobList']);
  }

  private ValidatePubilcReg() {
    var IsValid = true;
    var errorMsg = "";
    var regEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (IsValid) {
      if (this.JobForm.value.StateID == "") {
        errorMsg += "Please Select State. <br/>";
        IsValid = false;
      }
      if (this.JobForm.value.NoOfVacancy == "" || parseInt(this.JobForm.value.NoOfVacancy) < 1) {
        errorMsg += "Please Enter Valid no of vacancy . <br/>";
        IsValid = false;
      }
      if (this.minCtc > this.maxCtc) {
        errorMsg += "Please Enter CTC Details . <br/>";
        IsValid = false;
      }
    }

    if (!IsValid)
      this.toastrService.error(errorMsg, null, { enableHtml: true });
    return IsValid;
  }

  ValidOjt() {
    if (this.JobForm.value.ojtDuration == '') {
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
    }
  }

  ValidProbation() {
    if (this.JobForm.value.ProbationDuration == '') {
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
    }
  }

  onClickMe() {
    if (this.minAge < 14) {
      this.toastrService.error("Minimum age must be greater than or equal to 15");
      this.statusAge = false;
    } else {
      this.statusAge = true;
    }
  }

  ctcClick() {
    if (this.JobForm.controls['NetSalary'].value > this.maxCtc) {
      this.checkNetSalary();
    } else {
      if (this.minCtc < 4999) {
        this.toastrService.error("Min ctc must be greater than or equal to 5000");
        this.status = false;
      } else {
        this.status = true;
      }
    }
  }

  checkNetSalary() {
    if (this.JobForm.value.ShiftTime != 'Freelancer')
      if (this.JobForm.controls['NetSalary'].value > this.maxCtc) {
        this.toastrService.error("Max ctc must be greter than or equal to net salary");
      }
  }


  _currentValues: any;
  onSliderChange(selectedValues: number[]) {
    this._currentValues = selectedValues;
  }
  //// Code for the allowance component added by Arti Ahirwar on 7 July 2019 //////
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

  GenderInvalid: boolean = false;
  FinalAllowance: string;
  scroll(el) { //Use to submit the form data
    this.FinalAllowance = this.AllowanceArray.toString();
    if (this.JobForm.value.ISprobationtime == 'true') {
      if (this.JobForm.value.ProbationDuration <= 0) {
        this.toastrService.error('Please enter probation duration');
        el.scrollIntoView();
        return false;
      }
    }
    if (this.isChecked && this.finalSubmitQuestion.length < 1) {
      this.isChecked = false;
      this.isViewButtonshow = false;
      this.toastrService.error('please add at least one screening question');
      el.scrollIntoView();
      return false;
    }
    if (this.JobForm.value.IsOjt == 'true') {
      if (this.JobForm.value.ojtDuration <= 0) {
        this.toastrService.error('Please enter ojt duration');
        el.scrollIntoView();
        return false;
      }
    }
    if (this.newAttribute.length > 0) {
      if (!this.JobForm.value.Male && !this.JobForm.value.Female && !this.JobForm.value.Transgender) {
        el.scrollIntoView();
        this.toastrService.error("Please select gender");
      }

      else {
        this.jobFromvalid = true;
        if (this.newAttribute.length > 0) {
          this.postjob();
        } else {
          this.toastrService.error("Please add opening detailss");
        }
      }
    } else {
      this.toastrService.error("Please add opening details");
    }
  }

  private GetAllIndustryArea() {
    try {
      this.masterService.GetAllIndustryArea().subscribe(res => {
        this.lstIndustryArea = res
        if (this.lstIndustryArea != null && this.lstIndustryArea.length > 0) {
          this.lstIndustryArea = this.lstIndustryArea;
        }
      });
    } catch  { }
  }

  private GetAllFunctionArea() {
    try {
      this.masterService.GetAllFunctionArea().subscribe(res => {
        this.lstFunctionalArea = res
        if (this.lstFunctionalArea != null && this.lstFunctionalArea.length > 0) {
          this.lstFunctionalArea = this.lstFunctionalArea;
        }
      });
    } catch  { }
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


  NewSectorShow: any = [];
  NewSectorData: any = [];
  NewSecterTempData: any = [];

  AddSectorValue() {
    if (this.SectorForm.value.SectorID == '') {
      this.toastrService.error('Please select training sector');
      return false;
    }
    if (this.SectorForm.controls.TradeID.value == '') {
      this.toastrService.error('Please select training trade');
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



  GetJobPostData() {
    this.JobForm.controls['CompanyName'].setValue(this.companydetails.companyName);
  }

  allusers: any = [];
  getUser() {
    const compid: string = this.activatedRoute.snapshot.queryParamMap.get('companyid');
    let companyId = parseInt(compid);
    this.masterService.GetAllUser(companyId).subscribe(res => {
      let userresponse = res;
      this.allusers = userresponse['lstAdminVerifiedUser'];
    });
  }

  UserDetail: any = [];
  GetUserData(e) { //Use to get the user data by username
    var UserId = e.target.value;
    this.questionList = [];
    this.addedQuestion = [];
    this.selectedQuestion = [];
    this.finalSubmitQuestion = [];
    this.isViewButtonshow = false;
    this.isChecked = false
    if (UserId != '' && UserId != null) {
      this.jobpostService.GetUserDetail(UserId).subscribe(res => {
        this.UserDetail = res;
        if (this.UserDetail.lstGetUserDetail != '') {
          this.UserDetail = this.UserDetail.lstGetUserDetail;
          this.JobForm.controls[('Name')].setValue(this.UserDetail[0].name);
          this.JobForm.controls[('Mobile')].setValue(this.UserDetail[0].mobile);
          this.JobForm.controls[('Email')].setValue(this.UserDetail[0].email);
          this.JobForm.controls[('Designation')].setValue(this.UserDetail[0].designation);
        }
      });
    } else {
      this.jobTitleCode = [];
    }

  }

  /////////////// create question section /////////

  showquestion: boolean = false;
  createQuest: boolean = false;
  questionList: any = [];
  selectedQuestion: any = [];
  isChecked: boolean = false;
  jobTitleCode: any = [];
  showJobDetail: boolean = false;
  jobDetails: any;
  finalSubmitQuestion: any = [];
  selectedQuestion1: any = [];
  jobids: any;
  checkedQ: boolean = false;
  addedQuestion: any = [];
  addedquestStatus: boolean = false;
  isViewButtonshow: boolean = false;

  createQuestion(templateSector: TemplateRef<any>) {//Use to pop up model for screening question
    this.isChecked = true;
    this.showEditForm = false;
    if (this.isChecked && !this.isSubmit) {
      this.modalRefSector = this.modalService.show(templateSector, { backdrop: 'static', keyboard: false, class: 'modal-md' });
    } else {
      this.modalRefSector = this.modalService.show(templateSector, { backdrop: 'static', keyboard: false, class: 'modal-md' });
      // this.isViewButtonshow = true;
    }
  }

  // get job title and job code based on user id
  UserId: any;
  getJobTitleList(UserID: any) {//Use to get the groupname list on isscreening
    if (UserID != '' && UserID != null) {
      this.UserID = UserID;
      this.spinnerService.show();
      this.screeningService.getGrouponlyHaveQuestionlist(UserID, this.adminId).subscribe(res => {
        this.dbresponse = res;
        if (this.dbresponse.lstGroupName != null) {
          this.jobTitleCode = this.dbresponse.lstGroupName;
        }
        else {
          this.jobTitleCode = [];
        }
        this.spinnerService.hide();
      })
    }

  }

  response: any;
  groupId: any;
  getJobDetails(event: any) { //Use to get the question list on selcet of groupid
    let groupId = event.target.value;
    let groupName = this.jobTitleCode.filter(function (entry) {
      return entry.groupid == groupId;
    });
    this.groupId = groupId;
    if (this.groupId != null && this.groupId != '') {
      this.spinnerService.show();

      this.screeningService.GetActivequestionlist(this.UserID, this.adminId, this.groupId).subscribe(res => {
        this.response = res;
        if (this.response.getquestiongroup != null) {
          this.showquestion = true;
          this.questionList = this.response.getquestiongroup;
          // this.UpdatedQues=[];
        }
      })
    }
    else {
      this.showquestion = false;
      this.questionList = [];
    }
    this.spinnerService.hide();
  }
  /////////////// Code changes by Hem Tiwari  20 August 2019 Start///////////////////////////////
  // add own question
  UpdatedQues: any = [];
  addQuestion() {
    // this.finalSubmitQuestion = [];
    if (this.JobForm.value.question) {
      this.createQuest = false;
      this.addedquestStatus = true;
      this.checkedQ = true;
      this.showEditForm = false;
      let question = this.JobForm.value.question;
      if (this.index !== '' && this.editType == 'old') {
        this.questionList[this.index].questions = question;
        this.UpdatedQues = this.questionList;
      }
      this.JobForm.controls['question'].setValue('');
      this.index = '';

    } else {
      this.toastrService.error('Please add question');
    }
  }
  count: number;
  quesionListCheck: boolean = false;
  SelectquestIndexArr: any = [];
  selectQuestion(e, item, i) {
    var check = this.finalSubmitQuestion.filter(function (entry) {
      return entry.groupquestionid == item.groupquestionid;
    })
    if (check.length > 0 && e.target.checked) {
      $("#" + "screening" + i).prop('checked', false);
      this.toastrService.error("Question is alerady added");
      return false;
    }


    // let question = item.questions;
    // if (e.target.checked) {
    //   if (this.selectedQuestion.length) {
    //     var newArrObj = this.selectedQuestion.filter(function (entry) {
    //       return entry.groupquestionid == item.groupquestionid;
    //     })
    //     if (newArrObj.length) {
    //       if (newArrObj[0].groupquestionid == item.groupquestionid && newArrObj[0].Quesons == item.questions) {
    //         this.toastrService.error('Question is already added');
    //         $("#" + "screening" + i).prop('checked', false);
    //         return false;
    //       } else {
    //         this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //         this.selectedQuestion1.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //         this.SelectquestIndexArr.push(item.groupquestionid);
    //       }
    //     } else {
    //       this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //       this.selectedQuestion1.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //       this.SelectquestIndexArr.push(item.groupquestionid);
    //     }
    //   } else {

    //     this.selectedQuestion.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //     this.selectedQuestion1.push({ "groupid": item.groupid, "ismandatory": item.mandotary, "groupquestionid": item.groupquestionid, "questionid": 0, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });

    //     this.SelectquestIndexArr.push(item.groupquestionid);
    //   }
    // } else {
    //   let index1 = this.SelectquestIndexArr.indexOf(item.groupquestionid);
    //   this.selectedQuestion.splice(index1, 1);
    //   this.SelectquestIndexArr.splice(index1, 1);
    //   this.selectedQuestion1.splice(index1, 1);
    //   // this.finalSubmitQuestion.splice(index1, 1);
    //   // let index = this.selectedQuestion.indexOf({ "groupid": item.groupid, "ismandatory": item.mandotary, "questionid": 0, "groupquestionid": item.groupquestionid, "Quesons": question, "isActive": item.isactive, "Expectanswer": item.expectanswer, "Preference": item.preference });
    //   // this.selectedQuestion.splice(index, 1);
    //   if (this.selectedQuestion.length == 0) {
    //     this.selectedQuestion = [];
    //   }
    // }


  }

  index: any = '';
  editType: any;
  // edit question
  showEditForm: any;
  editQuestion(i, question: any, data: any) {
    this.editType = data;
    this.index = i;
    this.showEditForm = true
    this.JobForm.controls['question'].setValue(question);
  }

  //close button function

  declinequestion() {
    if (this.finalSubmitQuestion.length <= 0) {
      this.addedQuestion = [];
      this.isViewButtonshow = false;
      this.isChecked = false;
      // this.isSubmit = false;
      this.finalSubmitQuestion = [];
      this.isNotScreeming();
      // this.JobForm.controls['screening'].setValue('');
    }
    this.selectedQuestion1 = [];
    this.showEditForm = false;
    if (this.isSubmit) {
      this.isChecked = true;
      this.JobForm.controls['question'].setValue('');
      if (this.addedQuestion.length > 0) {
        this.isViewButtonshow = true;
      }
    } else {
      this.JobForm.controls['question'].setValue('');
      this.isChecked = false;
      this.questionList = [];
      this.finalSubmitQuestion = [];
      this.selectedQuestion = [];
      this.SelectquestIndexArr = [];
    }
    this.showJobDetail = false;
    this.showquestion = false;
    this.createQuest = false;
    this.addedquestStatus = false;
    this.modalRefSector.hide();
  }

  //submit question after select and create question.
  isSubmit: boolean = false;

  submitQuestion() {
    // var CheckedQues:boolean = false;
    var ques: any = [];
    var formvalue: any;
    this.finalSubmitQuestion = [];
    this.isViewButtonshow = true;
    $('.questionclass').each(function (entry, elem) {
      var checked = $(this).is(':checked');
      if (checked) {
        // CheckedQues=true;
        formvalue = $(elem).val();
        ques.push(formvalue);
      }
    });
    var newArrObja = {};
    var j = 0;
    for (var i = 0; i < ques.length; i++) {
      if (this.UpdatedQues.length > 0) {
        newArrObja = this.UpdatedQues.filter(function (entry) {
          return entry.groupquestionid == ques[i];
        })
        if (newArrObja == '') {
          newArrObja = this.questionList.filter(function (entry) {
            return entry.groupquestionid == ques[i];
          })
        }
      } else {
        newArrObja = this.questionList.filter(function (entry) {
          return entry.groupquestionid == ques[i];
        })
      }
      if (newArrObja[0] != undefined) {
        var data = {
          groupid: newArrObja[j].groupid,
          ismandatory: newArrObja[j].mandotary,
          groupquestionid: newArrObja[j].groupquestionid,
          questionid: 0,
          Quesons: newArrObja[j].questions,
          isActive: newArrObja[j].isactive,
          Expectanswer: newArrObja[j].expectanswer,
          Preference: newArrObja[j].preference
        }
        this.finalSubmitQuestion.push(data);
        for (let item of this.finalSubmitQuestion) {
          this.addedQuestion.push(item);
        }
      } else {
        newArrObja = this.addedQuestion.filter(function (entry) {
          return entry.groupquestionid == ques[i];
        })
        this.finalSubmitQuestion.push(newArrObja[j]);
        for (let item of this.finalSubmitQuestion) {
          this.addedQuestion.push(item);
        }
      }
    }

    if (this.finalSubmitQuestion.length <= 0) {
      // this.toastrService.error("Please add a question");
      this.isViewButtonshow = false;
      this.addedQuestion = [];
      // this.questionList = [];
      this.toastrService.error("Please add Question");
      return false;
      // return false;
    } else {
      // if (CheckedQues) {
      this.toastrService.success("Question added successfully");
      // CheckedQues=false;
      // }
    }
    this.isChecked = true;
    this.isSubmit = true;

    this.modalRefSector.hide();
    this.addedQuestion;

    //  console.log(this.finalSubmitQuestion);
    // console.log($("#" + "hem").prop('checked', false));
    // if (this.selectedQuestion.length > 0) {
    //   this.isChecked = true;
    //   this.isSubmit = true;
    //   this.isViewButtonshow = true;
    //   // this.finalSubmitQuestion = this.selectedQuestion;
    //   this.finalSubmitQuestion = this.finalSubmitQuestion.concat(this.selectedQuestion1);
    //   this.selectedQuestion1 = [];
    //   this.modalRefSector.hide();
    // } else {
    //   this.toastrService.error('Please add question');
    // }
  }

  // view added question

  viewQuestion(templateSector: TemplateRef<any>, item) {
    this.showEditForm = false;
    this.isChecked = true;
    // this.finalSubmitQuestion
    if (this.finalSubmitQuestion.length > 0) {
      this.addedQuestion = [];
      this.questionList = [];
      this.addedquestStatus = true;
      this.showJobDetail = false;
      this.showquestion = false;
      for (let item of this.finalSubmitQuestion) {
        this.checkedQ = true;
        // this.addedQuestion.push(item.Quesons);
        this.addedQuestion.push(item);
      }
    } else {
      this.addedQuestion = [];
    }
    this.modalRefSector = this.modalService.show(templateSector, { backdrop: 'static', keyboard: false, class: 'modal-md ' });
  }
  /////////////// Code changes by Hem Tiwari  20 August 2019 End///////////////////////////////
  // save question after job created successfully

  saveQuestion(jobId: any) {
    let postData = {
      "jobid": jobId,
      "Quesons": this.finalSubmitQuestion,
    }

    this.jobpostService.saveQuestion(this.UserID, this.adminId, postData).subscribe(res => {
      if (res) {

      }
    })
  }

  isNotScreeming() {
    // this.finalSubmitQuestion = [];
    // this.selectedQuestion = [];
    this.isViewButtonshow = false;
    this.isChecked = false;
  }


  openingModelRef: BsModalRef;

  addContactForOpening(template: TemplateRef<any>, item: any) {
    this.openingModelRef = this.modalService.show(template, { class: 'modal-sm-md', backdrop: 'static' });
    if (item == "add") {
      this.JobForm.controls['ContactEmailPublic'].setValue("");
      this.close();
    }
  }

  showAddButton: boolean = true;
  showviewButton: boolean = false;

  contactEmailValue: any;
  contactMobileValue: any;
  contactDesignation: any;
  contactName: any;
  contactLandlineNumber: any;
  contactEmailPublic: any;


  addContactInopening() {
    var str = this.JobForm.value.ContactLandlineNumber;
    var reg = '000000000000';
    if (this.JobForm.value.ContactName == '') {
      this.toastrService.error("Please add contact person name");
      return false;
    } else if (this.JobForm.value.ContactDesignation == '') {
      this.toastrService.error("Please add designation");
      return false;
    } else if (this.JobForm.value.ContactMobile == '') {
      this.toastrService.error("Please add mobile number");
      return false;
    } else if (this.JobForm.value.ContactEmail == '') {
      this.toastrService.error("Please add email id");
      return false;
    }
    else if (this.JobForm.value.ContactLandlineNumber != '' && str.match(reg)) {
      this.toastrService.error("Please enter valid landline no");
      return false;
    }

    if (!this.JobForm.value.ContactName && !this.JobForm.value.ContactEmail && !this.JobForm.value.ContactMobile && !this.JobForm.value.ContactLandlineNumber && !this.JobForm.value.ContactDesignation && !this.JobForm.value.ContactEmailPublic) {
      this.toastrService.error("Please add at least one field");
    } else {
      this.showAddButton = false;
      this.showviewButton = true;
      this.openingModelRef.hide();
      /////Rajeev//////
      this.contactEmailValue = this.JobForm.value.ContactEmail;
      this.contactMobileValue = this.JobForm.value.ContactMobile;
      this.contactDesignation = this.JobForm.value.ContactDesignation;
      this.contactName = this.JobForm.value.ContactName;
      this.contactLandlineNumber = this.JobForm.value.ContactLandlineNumber;
      this.contactEmailPublic = this.JobForm.value.ContactEmailPublic;
      //////////Rajeev///////////
    }
  }

  closeContactModal() {
    this.openingModelRef.hide();
    this.close();
  }
  close() {
    this.JobForm.controls['ContactName'].setValue("");
    this.JobForm.controls['ContactDesignation'].setValue("");
    this.JobForm.controls['ContactMobile'].setValue("");
    this.JobForm.controls['ContactLandlineNumber'].setValue("");
    this.JobForm.controls['ContactEmail'].setValue("");
    this.JobForm.controls['ContactEmailPublic'].setValue("");
  }
  closeViewModal() {
    this.close();
    this.openingModelRef.hide();
    if (this.JobForm.value.ContactName == '') {
      this.JobForm.controls['ContactName'].setValue(this.contactName);
    } if (this.JobForm.value.ContactEmail == '') {
      this.JobForm.controls['ContactEmail'].setValue(this.contactEmailValue);
    } if (this.JobForm.value.ContactMobile == '') {
      this.JobForm.controls['ContactMobile'].setValue(this.contactMobileValue);
    } if (this.JobForm.value.ContactDesignation == '') {
      this.JobForm.controls['ContactDesignation'].setValue(this.contactDesignation);
    } if (this.JobForm.value.ContactLandlineNumber == '') {//by rajeev jha
      this.JobForm.controls['ContactLandlineNumber'].setValue(this.contactLandlineNumber);
    } if (this.JobForm.value.ContactEmailPublic == '') {//by rajeev jha
      this.JobForm.controls['ContactEmailPublic'].setValue(this.contactEmailPublic);
    }
  }
}
