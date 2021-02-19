import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../../Globals/app.config';
import { Router } from '@angular/router';
import { JobpostService } from '../../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { WalkinPostService } from '../../../Services/walkinpost.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../Validators/custom-validator.directive';
import { MasterService } from '../../../Services/master.service';
import { Options } from 'ng5-slider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-ViewWalkInComponent',
  templateUrl: './ViewWalkIn.Component.html',
})

export class ViewWalkInComponent implements OnInit {

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  SectorForm: FormGroup;
  UserInfo: any;
  DbResponcse: any = {};
  id: any = {};
  response: any = {};
  userdetails: any = {};
  checkverifymobile: boolean = false;
  walkinid: any = {};
  DBResponce: any = {};
  dbResponse: any = {};
  dbResponse1: any = {};
  walkindetails: any = [];
  walkinopening: any = [];
  EditFormShow: any = false;
  EditOpeningFormShow: any = false;
  EditWalkinForm: FormGroup;
  EditWalkinOpeningForm: FormGroup;
  minDate: any = '';
  maxDate: any = '';
  mintoDate: any = '';
  WalingFormDisable: boolean = true;
  openingDisable: boolean = true;
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
    step: 100
  };

  city: any = [];

  constructor(private appConfig: AppConfig
    , private toastrService: ToastrService
    , private spinnerService: Ng4LoadingSpinnerService
    , private jobpostService: JobpostService
    , private walkinService: WalkinPostService
    , private formBuilder: FormBuilder
    , private masterService: MasterService
    , private WalkinPostService: WalkinPostService
    , private modalService: BsModalService
    , private router: Router
  ) {
    this.UserInfo = appConfig.UserInfo
  }

  dropdownSettings = {};
  postData: any = {};
  isJobPushed: any;
  isScrap: any;
  isClosed: any;
  AdminId: any;
  phpadminid: any;
  CompanyId: any;

  ngOnInit() {
    this.serverDateTime();
    this.GetAllFunctionArea();
    this.GetAllIndustryArea();
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
    // this.walkinid = localStorage.getItem('walkInId');
    this.isJobPushed = localStorage.getItem('isJobPushed');
    this.walkinid = localStorage.getItem('walkInId');
    this.isScrap = localStorage.getItem('isScrap');
    this.isClosed = localStorage.getItem('isClosed');
    this.CompanyId = localStorage.getItem('CompanyId');
    if (this.isJobPushed == "true" && this.isScrap == "false" && this.isClosed == "true") {
      this.isJobPushed = true;
      this.isScrap = false;
      this.isClosed = true;
    } else if (this.isJobPushed == "false" && this.isScrap == "true" && this.isClosed == "false") {
      this.isJobPushed = true;
      this.isScrap = false;
      this.isClosed = true;
    }
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.AdminId = adminid;

    this.postData = {
      'AdminId': this.AdminId,
      'CompanyId': this.CompanyId,
      'FunctionalAreaId': 0,
      'IndustryId': 0,
      'Maxctc': 0,
      'Minctc': 0,
      'MaxExp': 0,
      'MinExp': 0,
      'UserId': 0,
      "WalkInId": this.walkinid,
      'PageNumber': 0,
      "WalkInDate": '2019-01-22T00:30:37.000Z',
      "WalkinToDate": '2019-01-22T00:30:37.000Z'
    };
    this.getWalkIndetails(this.postData);

    this.EditWalkinForm = this.formBuilder.group({
      uname: ['', [Validators.required,]],
      JobTitle: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      CompanyName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      PersonName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      JobDescription: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Mobile: ['', [Validators.nullValidator, Validators.compose([CustomValidators.validMobile])]],
      Email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      EmailPublic: ['false', [Validators.nullValidator,]],
      RolesresPonsiblty: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      Keyword: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      LandlineNumber: ['', [Validators.nullValidator,]],
      MinExp: ['', [Validators.nullValidator,]],
      MaxExp: ['', [Validators.nullValidator,]],
      AgeMin: ['', [Validators.nullValidator,]],
      AgeMax: ['', [Validators.nullValidator,]],
      OtherDetail: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ISprobationtime: ['', [Validators.required,]],
      ProbationDuration: ['', Validators.nullValidator,],
      MinEducation: ['', [Validators.required,]],
      Specialization: ['', [Validators.nullValidator,]],

      ValidDate: ['', [Validators.required,]],
      VenuDetail: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      ShiftTime: ['FullTime', [Validators.nullValidator,]],
      ojtDuration: ['', [Validators.nullValidator,]],
      IsOjt: ['', [Validators.nullValidator,]],
      walkinStateVenuID: ['', [Validators.required,]],
      walkinDistrictID: ['', [Validators.required,]],
      feet: ['', [Validators.nullValidator,]],
      inch: ['', [Validators.nullValidator,]],
      Transgender: ['', [Validators.nullValidator,]],
      Female: ['', [Validators.nullValidator,]],
      Male: ['', [Validators.nullValidator,]],
      weight: ['', [Validators.nullValidator,]],
      walkintodate: ['', [Validators.required]],
      walkinfromtime: ['', [Validators.required]],
      walkintotime: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      functionalarea: ['', [Validators.required]],
    });

    this.EditWalkinOpeningForm = this.formBuilder.group({
      MinCtc: ['', [Validators.nullValidator]],
      MaxCtc: ['', [Validators.nullValidator]],
      LanguageId: ['', [Validators.nullValidator]],
      NoOfVacancy: ['', [Validators.required]],
      OpeningDistrictID: ['', ''],
      OpeningStateID: ['', [Validators.required]],
      OpeningCityID: ['', ''],
    });

    this.SectorForm = this.formBuilder.group({
      SectorID: ['', Validators.nullValidator,],
      TradeID: ['', [Validators.nullValidator,]],
    });

    this.GetAllStates();
    this.GetMinEducation();
    this.GetAllLanguage();
    this.minDate = new Date();
    this.mintoDate = new Date();
    // this.mintoDate.setDate(this.mintoDate.getDate() + 1);
  }

  MinDate(minValue: any): void {
    if (minValue != null) {
      // this.minDate = minValue;
      this.mintoDate.setDate(minValue.getDate());
    }
  }


  MaxDate(maxValue: any) {
    // debugger
    if (maxValue != null) {
      this.maxDate = maxValue;
      // this.maxDate.setDate(this.maxDate.getDate() + 1);

    }
  }
  Sector: any = [];
  GetAllSector(schemeId) {//Use to get Sector and Trade
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

  NewSectorShow: any = [];
  NewSectorData: any = [];
  NewSecterTempData: any = [];
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
    this.NewSecterTempData = [];
    this.SectorForm.controls['SectorID'].setValue("");
    this.SectorForm.controls['TradeID'].setValue("");
  }

  Trade: any = [];
  Getalltrade(trade: any) {//Use to get trade list
    if (trade != '') {
      this.SectorForm.controls[('TradeID')].setValue('');
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
    } else {
      this.Trade = [];
    }
  }

  modalRefSector: BsModalRef;
  modalRefDelSector: BsModalRef;

  deleteSector(index: any) {
    if (this.NewSectorShow[index].id > 0) {
      var DeleteList = {
        "AdminId": this.AdminId,
        "JobId": this.walkinid,
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
      this.dbresponse = res;
      if (this.dbresponse != null) {
        this.spinnerService.hide();
        this.toastrService.success(this.dbresponse.message);
        this.modalRefDelSector.hide();
        this.getWalkIndetails(this.postData);
      }
      else {
        this.toastrService.error(this.dbresponse.message);
      }
    }
    );
  }

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
    this.spinnerService.show();
    this.jobpostService.deleteSectorTrade(DeleteList).subscribe(res => {
      this.dbResponse = res
      if (this.DBResponce != null) {
        this.spinnerService.hide();
        this.toastrService.success(this.dbResponse.message);
        this.modalRef.hide();
        this.getWalkIndetails(this.postData);
      } else {
        this.toastrService.error(this.dbResponse.message);
      }
    });
  }

  PusTemplateSector(templateSector: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-sm' });
  }

  lstFunctionalArea: any = [];
  lstIndustryArea: any = [];
  respIndustryArea: any = {};
  respFunctionalArea: any = {};
  private GetAllIndustryArea() {
    try {
      this.masterService.GetAllIndustryArea().subscribe(res => {
        this.lstIndustryArea = res
        if (this.respIndustryArea != null) {
          if (this.lstIndustryArea != null) {
            this.lstIndustryArea = this.lstIndustryArea;
          }
          else {
            this.lstIndustryArea = [];
          }
        }
      });
    } catch  { }
  }

  private GetAllFunctionArea() {
    try {
      this.masterService.GetAllFunctionArea().subscribe(res => {
        this.lstFunctionalArea = res
        if (this.respFunctionalArea != null) {
          if (this.lstFunctionalArea != null) {
            this.lstFunctionalArea = this.lstFunctionalArea;
          }
          else {
            this.lstFunctionalArea = [];
          }
        }
      });
    } catch  { }
  }

  OpeningModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  walinid: any = [];
  PageNumber: number = 0;
  UserId: any;
  jobtype: any = '';
  sectorstatus: boolean = true;
  getuserid: any = '';

  getWalkIndetails(walkindata: any) {//Use to get walk-in details
    this.spinnerService.show();
    this.walkinService.GetAllWalkin(walkindata).subscribe(res => {
      this.dbResponse1 = res;
      if (this.dbResponse1 != null) {
        if (this.dbResponse1.lstCandidateWalkInt != null) {
          this.walkindetails = this.dbResponse1.lstCandidateWalkInt[0];
          this.getuserid = this.walkindetails.userID;
          var sectortrade = this.walkindetails.sectorTradeList;
          if (sectortrade.length) {
            this.sectorstatus = true;
          }
          else {
            this.sectorstatus = false;
          }
          this.jobtype = this.walkindetails.shiftTime;

          for (let i = 0; i < this.walkindetails.sectorTradeList.length; i++) {
            let obj = {
              "id": this.walkindetails.sectorTradeList[i].id,
              "sectorName": this.walkindetails.sectorTradeList[i].sectorName,
              "tradeName": this.walkindetails.sectorTradeList[i].tradeName,
              "sectorId": this.walkindetails.sectorTradeList[i].sectorId,
              "tradeId": this.walkindetails.sectorTradeList[i].tradeId,
              "isActive": this.walkindetails.sectorTradeList[i].isActive
            }
            this.NewSectorShow.push(obj);
          }
          this.UserId = this.walkindetails.userID;
          this.walkinService.getWalkinDetails(this.walkinid, this.UserId, this.AdminId).subscribe(res => {
            this.dbResponse = res;
            if (this.dbResponse != null) {
              this.walkinopening = this.dbResponse.lstWalkInOpening;
            }
            else {
              this.walkinopening = [];
            }
          });
        }
      }
      else {
        this.dbResponse1 = [];
        this.UserId = 0;
      }
    });
    if (this.walkindetails && this.walkinopening) {
      this.spinnerService.hide();
    }
  }

  setWalkinId(walkinid) {
    localStorage.setItem('walkInId', walkinid);
  }

  DeletOpeningJob(item) {
    try {
      this.spinnerService.show();
      this.walkinService.DeletWalkin(item.jobdetailsid, this.AdminId, item.userID).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce != null) {
          if (this.DBResponce.responseResult) {
            this.spinnerService.hide();
            this.toastrService.success(this.DBResponce.message);
            this.getWalkIndetails(this.postData);
            this.modalRef.hide();
          } else {
            this.toastrService.error(this.DBResponce.message);
          }
        }
        else {
          this.DBResponce = [];
        }
      });
    } catch  { }
  }

  ojt: boolean = false;
  probation: boolean = false;

  GetEditWalkin(obj: any) {
    this.NewSectorShow = [];
    this.EditFormShow = true;
    this.EditWalkinForm.controls['uname'].setValue(obj.name);
    this.EditWalkinForm.controls['JobTitle'].setValue(obj.jobTitle);
    this.EditWalkinForm.controls['CompanyName'].setValue(obj.companyName);
    this.EditWalkinForm.controls['PersonName'].setValue(obj.name);
    this.EditWalkinForm.controls['Designation'].setValue(obj.designation);
    this.EditWalkinForm.controls['JobDescription'].setValue(obj.jobDescription);
    this.EditWalkinForm.controls['Mobile'].setValue(obj.mobile);
    this.EditWalkinForm.controls['Email'].setValue(obj.email);
    this.EditWalkinForm.controls['EmailPublic'].setValue(obj.emailPublic);
    this.EditWalkinForm.controls['RolesresPonsiblty'].setValue(obj.rolesresPonsiblty);
    this.EditWalkinForm.controls['Keyword'].setValue(obj.keyword);
    this.EditWalkinForm.controls['LandlineNumber'].setValue(obj.landlineNumber);
    this.EditWalkinForm.controls['MinExp'].setValue(obj.minExp);
    this.minExp = obj.minExp;
    this.EditWalkinForm.controls['MaxExp'].setValue(obj.maxExp);
    this.maxExp = obj.maxExp;
    this.EditWalkinForm.controls['AgeMin'].setValue(obj.ageMin);
    this.minAge = obj.ageMin;
    this.EditWalkinForm.controls['AgeMax'].setValue(obj.ageMax);
    this.maxAge = obj.ageMax;
    this.EditWalkinForm.controls['OtherDetail'].setValue(obj.otherDetail);
    this.EditWalkinForm.controls['VenuDetail'].setValue(obj.venueDetail);
    this.probation = obj.iSprobationtime ? true : false;
    this.EditWalkinForm.controls['ISprobationtime'].setValue(obj.iSprobationtime ? 'true' : 'false');
    this.EditWalkinForm.controls['walkinStateVenuID'].setValue(obj.walkinStatedId);
    this.GetAllDistrictvenu(obj.walkinStatedId);
    this.EditWalkinForm.controls['walkinDistrictID'].setValue(obj.walkinDistrictId);
    this.EditWalkinForm.controls['Male'].setValue(obj.male);
    this.EditWalkinForm.controls['Female'].setValue(obj.female);
    this.EditWalkinForm.controls['Transgender'].setValue(obj.transgender);
    this.EditWalkinForm.controls['ProbationDuration'].setValue(obj.probationDuration);
    this.EditWalkinForm.controls['MinEducation'].setValue(obj.minEducation);
    this.EditWalkinForm.controls['Specialization'].setValue(obj.specialization);
    this.EditWalkinForm.controls['ValidDate'].setValue(obj.walkInDate);
    this.EditWalkinForm.controls['ojtDuration'].setValue(obj.ojtDuration);
    this.ojt = obj.isOjt ? true : false;
    this.EditWalkinForm.controls['IsOjt'].setValue(obj.isOjt ? 'true' : 'false');
    this.EditWalkinForm.controls['weight'].setValue(obj.weight);
    this.EditWalkinForm.controls['feet'].setValue(obj.heightFeet);
    this.EditWalkinForm.controls['inch'].setValue(obj.heightInch);
    this.EditWalkinForm.controls['ShiftTime'].setValue(obj.shiftTime);
    this.EditWalkinForm.controls['ValidDate'].setValue(new Date(obj.walkInDate));
    this.EditWalkinForm.controls['walkintodate'].setValue(new Date(obj.walkinToDate));
    this.EditWalkinForm.controls['walkinfromtime'].setValue(obj.walkinFromTime);
    this.EditWalkinForm.controls['walkintotime'].setValue(obj.walkinToTime);
    this.EditWalkinForm.controls["industry"].setValue(obj.industryId);
    this.EditWalkinForm.controls["functionalarea"].setValue(obj.functionalAreaId);
    this.ProbationDuration = obj.probationDuration;
    this.ojtDuration = obj.ojtDuration;

    this.sectortrade = obj.sectorTradeList;
    for (let i = 0; i < obj.sectorTradeList.length; i++) {
      let obj2 = {
        "id": this.sectortrade[i].id,
        "sectorName": this.sectortrade[i].sectorName,
        "tradeName": this.sectortrade[i].tradeName,
        "sectorId": this.sectortrade[i].sectorId,
        "tradeId": this.sectortrade[i].tradeId,
        "isActive": this.sectortrade[i].isActive
      }
      this.NewSectorShow.push(obj2);
    }
  }

  sectortrade: any = [];
  ExitWalkinDetails() {
    this.EditFormShow = false;
    this.NewSectorShow = [];
  }

  lstState: any = {};

  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res;
        if (this.lstState != null) {
          this.lstState = this.lstState;
        }
        else {
          this.lstState = [];
        }
      });
    } catch  { }
  }

  mineducations: any = {};
  private GetMinEducation() {
    try {
      this.masterService.GetAllMinEducation().subscribe(res => {
        this.mineducations = res
      });
    } catch  { }
  }

  jobFromvalid = true;
  ExpMsg = true;

  ValidateExperience(expfrom, expto) {
    if (parseInt(expfrom) > parseInt(expto)) {
      this.jobFromvalid = false;
      this.ExpMsg = false;
    } else {
      this.jobFromvalid = true;
      this.ExpMsg = true;
    }
  }

  AgeMsg = true;

  ValidateAge(Max, Min) {
    if (parseInt(Max) > parseInt(Min)) {
      this.AgeMsg = false;
      this.jobFromvalid = false;
    } else {
      this.jobFromvalid = true;
      this.AgeMsg = true;
    }
  }

  validateWeight(weight) {
  }

  ojtvalidsts = true;
  validateOjt(ojt) {
    if (ojt != '') {
      if (ojt.length > 2) {
        this.ojtvalidsts = false;
      } else {
        this.ojtvalidsts = true;
      }
    }
  }

  ojtcondition: any;
  ojtDuration: any;
  SetOjt(ojtcon: any) {
    if (ojtcon == 1) {
      this.ojt = true;
    } else {
      this.ojt = null;
      this.ojtDuration = ''
      this.EditWalkinForm.value.ojtDuration = "";
      this.ojtvalidsts = true;
    }
    this.ojtcondition = ojtcon;
  }

  probationcondition: any;
  ProbationDuration: any;
  SetProbation(probcon: any) {
    if (probcon == 1) {
      this.probation = true;
    } else {
      this.probation = null;
      this.ProbationDuration = '';
      this.EditWalkinForm.value.ProbationDuration = "";
    }
    this.probationcondition = probcon;
  }

  onChangeStateVenu(statename: any) {
    this.GetAllDistrictvenu(statename);
    this.GetAllCity(statename);
  }

  GetAllCity(id: any) {
    if (id != '') {
      this.EditWalkinOpeningForm.controls[('OpeningCityID')].setValue('');
      this.masterService.GetAllCity(id).subscribe(res => {
        this.city = res
        if (this.city != null) {
          this.city = this.city;
        }
      });
    } else {
      this.city = [];
    }
  }

  district: any = [];
  statevenu: any = [];

  GetAllDistrictvenu(id: any) {
    if (id != '') {
      this.EditWalkinForm.controls[('walkinDistrictID')].setValue('');
      try {
        this.EditWalkinOpeningForm.controls['OpeningDistrictID'].setValue('');
        this.masterService.GetAllDistrictvenu(id).subscribe(res => {
          this.statevenu = res
          if (this.statevenu != null) {
            this.statevenu = this.statevenu;
          }
        });
      } catch  { }
    } else {
      this.statevenu = [];
    }
  }

  ExitJobDetails() {
    this.EditFormShow = false;
    this.NewSectorShow = [];
    this.NewSectorData = [];
    this.NewSecterTempData = [];
  }

  Response: any = {};
  walkindetail: any = {};
  dbresponse: any = {};
  gendersts: boolean = false;
  jobdetail: any = {};
  updatewalkinbtn: boolean = true;
  updatewalkin(formvalue, walkindetails: any) {
    var walkindetails = walkindetails;
    var UserId = walkindetails.userID;
    if (this.EditWalkinForm.controls.JobTitle.value.trim() == '') {
      this.toastrService.error("Please Enter Job Title")
      return false
    }
    if (this.EditWalkinForm.controls.CompanyName.value.trim() == '') {
      this.toastrService.error("Please Enter Company Name")
      return false
    }
    if (this.EditWalkinForm.controls.JobDescription.value.trim() == '') {
      this.toastrService.error("Please Enter Job Description")
      return false
    }
    if (this.EditWalkinForm.controls.RolesresPonsiblty.value.trim() == '') {
      this.toastrService.error("Please Enter Roles and Responsiblty")
      return false
    }
    if (this.EditWalkinForm.controls.VenuDetail.value.trim() == '') {
      this.toastrService.error("Please Enter Venue Address")
      return false
    }
    if (this.EditWalkinForm.controls.PersonName.value.trim() == '') {
      this.toastrService.error("Please Enter Person Name")
      return false
    }
    if (this.EditWalkinForm.controls.Designation.value.trim() == '') {
      this.toastrService.error("Please Enter Designation")
      return false
    }
    if (this.EditWalkinForm.value.ValidDate == '') {
      this.toastrService.error('Please Select Walkin From Date');
      window.scroll(0, 0);
      return false;
    }
    if (this.EditWalkinForm.value.walkintodate == '') {
      this.toastrService.error('Please Select Walkin To Date');
      window.scroll(0, 0);
      return false;
    }
    if (this.EditWalkinForm.value.ValidDate > this.EditWalkinForm.value.walkintodate) {
      this.toastrService.error('Please Select Valid Walkin From And To Date');
      window.scroll(0, 0);
      return false;
    }
    if (this.EditWalkinForm.value.walkinfromtime == '') {
      this.toastrService.error('Please Select Walkin From Time');
      window.scroll(0, 0);
      return false;
    }
    if (this.EditWalkinForm.value.walkintotime == '') {
      this.toastrService.error('Please Select Walkin To Time');
      window.scroll(0, 0);
      return false;
    }
    let walkinfromtime = this.EditWalkinForm.value.walkinfromtime;
    let walkintotime = this.EditWalkinForm.value.walkintotime;

    if (walkintotime < walkinfromtime) {
      this.toastrService.error('Invalid Walkin To Time');
      window.scroll(0, 0);
      return false;
    }

    if (walkinfromtime < '06') {
      this.toastrService.error('Invalid Walkin From  Time');
      window.scroll(0, 0);
      return false;
    }
    if (this.probation) {
      if (this.EditWalkinForm.value.ProbationDuration == '') {
        this.toastrService.error('Please add Probation Duration');
        window.scroll(0, 0);
        return false;
      } else if (this.EditWalkinForm.value.ProbationDuration < 1) {
        this.toastrService.error('Probation Duration should be greater then 0');
        window.scroll(0, 0);
        return false;
      }
    }

    if (this.ojt) {
      if (this.EditWalkinForm.value.ojtDuration == '') {
        this.toastrService.error('Please add OJT Duration');
        window.scroll(0, 0);
        return false;
      } else if (this.EditWalkinForm.value.ojtDuration < 1) {
        this.toastrService.error('OJT Duration should be greater then 0');
        window.scroll(0, 0);
        return false;
      }
    }

    if (walkintotime > '22:00') {
      this.toastrService.error('Invalid Walkin To  Time');
      window.scroll(0, 0);
      return false;
    }
    if (this.EditWalkinForm.value.Male == true || this.EditWalkinForm.value.Male == 1 || this.EditWalkinForm.value.Female == true || this.EditWalkinForm.value.Female == 2 || this.EditWalkinForm.value.Transgender == true || this.EditWalkinForm.value.Transgender == 3) {
      this.gendersts = true;
    } else {
      this.gendersts = false;
    }
    if (this.gendersts == false) {
      this.toastrService.error('Please Select Gender');
      // this.postvalid = false;
      window.scroll(0, 0);
      return false;
    }

    var landlineget = this.EditWalkinForm.value.LandlineNumber;
    var regex = '000000000000';
    if (landlineget != '') {
      if (landlineget.length < 12 || landlineget.match(regex)) {
        this.toastrService.error("Please enter valid landline number");
        return false;
      }
      else {

      }
    }

    if (this.gendersts == true) {
      this.updatewalkinbtn = false;
      // this.walkindetail.PostedBy = this.UserInfo.loginType;
      this.walkindetail.PostedBy = '';
      this.walkindetail.JobTitle = this.EditWalkinForm.value.JobTitle;
      this.walkindetail.CompanyName = this.EditWalkinForm.value.CompanyName;
      this.walkindetail.CompanyName = this.EditWalkinForm.value.CompanyName;
      this.walkindetail.AgeMax = this.maxAge;
      this.walkindetail.AgeMin = this.minAge;
      this.walkindetail.Designation = this.EditWalkinForm.value.Designation;
      this.walkindetail.Email = this.EditWalkinForm.value.Email;
      this.walkindetail.EmailPublic = this.EditWalkinForm.value.EmailPublic;
      this.walkindetail.Female = this.EditWalkinForm.value.Female ? 2 : 0
      this.walkindetail.ISprobationtime = this.EditWalkinForm.value.ISprobationtime;
      if (this.EditWalkinForm.value.IsOjt == "true") {
        this.walkindetail.IsOjt = true;
      } else {
        this.walkindetail.IsOjt = false;
      }
      this.walkindetail.JobDescription = this.EditWalkinForm.value.JobDescription;
      this.walkindetail.Keyword = this.EditWalkinForm.value.Keyword;
      this.walkindetail.LandlineNumber = this.EditWalkinForm.value.LandlineNumber;
      this.walkindetail.Male = this.EditWalkinForm.value.Male ? 1 : 0;
      this.walkindetail.MinExp = this.minExp;
      this.walkindetail.MaxExp = this.maxExp;
      this.walkindetail.MinEducation = this.EditWalkinForm.value.MinEducation;
      this.walkindetail.Specialization = this.EditWalkinForm.value.Specialization;
      this.walkindetail.Mobile = this.EditWalkinForm.value.Mobile;
      this.walkindetail.Name = this.EditWalkinForm.value.PersonName;
      this.walkindetail.OtherDetail = this.EditWalkinForm.value.OtherDetail;
      this.walkindetail.ProbationDuration = this.EditWalkinForm.value.ProbationDuration ? this.EditWalkinForm.value.ProbationDuration : 0;
      this.walkindetail.RolesresPonsiblty = this.EditWalkinForm.value.RolesresPonsiblty;
      this.walkindetail.ShiftTime = this.EditWalkinForm.value.ShiftTime;
      this.walkindetail.Transgender = this.EditWalkinForm.value.Transgender ? 3 : 0;
      this.walkindetail.VenueDetail = this.EditWalkinForm.value.VenuDetail;
      this.walkindetail.WalkinStatedId = this.EditWalkinForm.value.walkinStateVenuID;
      this.walkindetail.WalkinDistrictId = this.EditWalkinForm.value.walkinDistrictID;
      this.walkindetail.jobId = localStorage.getItem('walkInId')
      this.walkindetail.ojtDuration = this.EditWalkinForm.value.ojtDuration != '' ? this.EditWalkinForm.value.ojtDuration : 0;
      this.walkindetail.HeightFeet = this.EditWalkinForm.value.feet ? this.EditWalkinForm.value.feet : 0;
      this.walkindetail.HeightInch = this.EditWalkinForm.value.inch ? this.EditWalkinForm.value.inch : 0;
      this.walkindetail.Weight = this.EditWalkinForm.value.weight ? this.EditWalkinForm.value.weight : 0;
      this.walkindetail.WalkInDate = this.EditWalkinForm.value.ValidDate;
      this.walkindetail.WalkinToDate = this.EditWalkinForm.value.walkintodate;
      this.walkindetail.WalkinFromTime = this.EditWalkinForm.value.walkinfromtime;
      this.walkindetail.WalkinToTime = this.EditWalkinForm.value.walkintotime;
      this.walkindetail.IndustryArea = this.EditWalkinForm.value.industry;
      this.walkindetail.FunctionalArea = this.EditWalkinForm.value.functionalarea;
      this.walkindetail.UserID = UserId;
      // this.walkindetail.sectorTradeList = this.NewSectorData;
      this.walkindetail.sectorTradeList = this.NewSectorShow;
      this.NewSectorShow = [];
      this.spinnerService.show();
      this.WalkinPostService.AddWalkinId(this.walkindetail).subscribe(res => {
        this.Response = res;
        if (this.Response.responseResult == true) {
          this.spinnerService.hide();
          this.updatewalkinbtn = true;
          this.toastrService.success(this.Response.message);
          this.EditWalkinForm.reset();
          this.EditFormShow = false;
          // this.NewSectorShow = [];
          this.NewSectorData = [];
          this.NewSecterTempData = [];
          this.getWalkIndetails(this.postData);
        }
      });
    }
    //  else {
    //   this.updatewalkinbtn=true;
    //   this.toastrService.error('Select gender');
    // }
  }

  private GetAllLanguage() {
    try {
      this.masterService.GetAllLanguage().subscribe(res => {
        this.lstAllLanguage = res;
      });
    } catch  { }
  }

  editopeningid: any = '';
  WalkInId: any = 0;
  UsernewID: any;
  OpeningId: any = 0;
  GetEditOpening(item) {
    this.WalkInId = item.walkInId;
    this.UsernewID = item.userID;
    this.OpeningId = item.jobdetailsid;
    this.EditOpeningFormShow = true;
    this.editopeningid = localStorage.getItem('openingid');
    localStorage.setItem('openingid', item.jobdetailsid);
    this.EditWalkinOpeningForm.controls['OpeningStateID'].setValue(item.stateID == null ? '' : item.stateID);
    this.GetAllDistrictvenu(item.stateID);
    var districtset = item.districtID;
    if (districtset == 0) {
      this.EditWalkinOpeningForm.controls['OpeningDistrictID'].setValue('')
    }
    else {
      this.EditWalkinOpeningForm.controls['OpeningDistrictID'].setValue(item.districtID == null ? '' : item.districtID);
    }
    this.GetAllCity(item.stateID);
    var cityset = item.cityId;
    if (cityset == 0) {
      this.EditWalkinOpeningForm.controls['OpeningCityID'].setValue('');
    }
    else {
      this.EditWalkinOpeningForm.controls['OpeningCityID'].setValue(item.cityId);
    }
    this.EditWalkinOpeningForm.controls['MinCtc'].setValue(item.minCtc);
    this.minCtc = item.minCtc;
    this.EditWalkinOpeningForm.controls['MaxCtc'].setValue(item.maxCtc);
    this.maxCtc = item.maxCtc;
    this.EditWalkinOpeningForm.controls['LanguageId'].setValue(item.languageId);
    this.EditWalkinOpeningForm.controls['NoOfVacancy'].setValue(item.noOfVacancy);
  }

  lstAllLanguage: any = [];
  LangFormArray: any = [];
  onItemSelect(item: any) {
    this.LangFormArray.push(item.name);
  }

  onItemDeSelect(item: any) {
    this.LangFormArray.splice(item.name, 1)
  }

  onSelectAll(items: any) {
    for (var i = 0; i < items.length; i++) {
      this.LangFormArray.push(items[i].name);
    }
  }

  ExitOpeningDetails() {
    this.EditOpeningFormShow = false;
    this.EditWalkinOpeningForm.reset();
    this.EditWalkinOpeningForm.controls.OpeningStateID.setValue('');
    this.EditWalkinOpeningForm.controls.OpeningDistrictID.setValue('');
  }

  openingdetail: any = {};
  response1: any = {};

  updateopening(formvalue1) {
    // var UserId =this.UsernewID;
    this.minCtc = this.EditWalkinOpeningForm.value.MinCtc!=''? parseInt(this.EditWalkinOpeningForm.value.MinCtc):0;
    this.maxCtc = this.EditWalkinOpeningForm.value.MaxCtc!=''?parseInt(this.EditWalkinOpeningForm.value.MaxCtc):0;
    var UserId = this.getuserid;
    if (this.jobtype != 'Freelancer') {
      if (this.minCtc == 0 || this.maxCtc == 0) {
        this.toastrService.error('Please Select Min CTC and max CTC');
        return false;
      }
    }

    if (this.maxCtc > 0) {
      if (this.minCtc < 5000) {
        this.toastrService.error('Please Enter Min CTC');
        return false;
      }
      if (this.maxCtc < this.minCtc) {
        this.toastrService.error("MaxCtc should not be less than Minctc.");
        return false;
      }
    }
    this.openingDisable = false;
    if (parseInt(this.EditWalkinOpeningForm.value.NoOfVacancy) > 0) {
      this.openingdetail.AdminId = this.AdminId;
      this.openingdetail.WalkInId = this.walkinid != '' ? this.walkinid : 0;
      this.openingdetail.StateID = this.EditWalkinOpeningForm.value.OpeningStateID;
      this.openingdetail.DistrictID = this.EditWalkinOpeningForm.value.OpeningDistrictID ? this.EditWalkinOpeningForm.value.OpeningDistrictID : 0;
      this.openingdetail.CityID = this.EditWalkinOpeningForm.value.OpeningCityID ? this.EditWalkinOpeningForm.value.OpeningCityID : 0;
      this.openingdetail.NoOfVacancy = this.EditWalkinOpeningForm.value.NoOfVacancy;
      this.openingdetail.MaxCtc = this.maxCtc;
      this.openingdetail.MinCtc = this.minCtc;
      // this.openingdetail.UserID = this.UsernewID;
      this.openingdetail.UserID = UserId; //commented by rj 

      this.openingdetail.jobdetailsid = this.OpeningId != '' ? this.OpeningId : 0;
      this.openingdetail.LanguageId = this.EditWalkinOpeningForm.value.LanguageId ? this.EditWalkinOpeningForm.value.LanguageId : '';
      this.openingdetail.NetSalary = '';
      this.spinnerService.show();
      this.WalkinPostService.updateWalkinListing(this.openingdetail, this.WalkInId).subscribe(res => {
        this.response1 = res;
        this.OpeningId = 0;
        this.WalingFormDisable = true;
        if (this.response1.responseResult = 'true') {
          this.spinnerService.hide();
          this.toastrService.success(this.response1.message);
          this.EditWalkinOpeningForm.reset();
          this.EditOpeningFormShow = false;
          this.openingDisable = true;
          this.getWalkIndetails(this.postData);
        }
      });
    } else {
      this.openingDisable = true;
      this.toastrService.error("Please Enter Valid No Of Vacancy ");
      this.openingDisable = true;
    }
  }
  Showform(item: any) {
    localStorage.setItem('userid', item.userID)
    this.EditWalkinOpeningForm.controls.OpeningStateID.setValue('');
    this.EditWalkinOpeningForm.controls.OpeningDistrictID.setValue('');
    this.EditOpeningFormShow = true;
    localStorage.removeItem('openingid');
    this.editopeningid = localStorage.getItem('openingid');
    this.minCtc = 0;
    this.maxCtc = 0;
    if (this.editopeningid == null) {
      this.editopeningid = '';
    } else {
    }
  }

  ctcerrmsg: boolean = true;
  ValidateCtc(ctcmin, ctcmax) {
    if (parseInt(ctcmin) >= parseInt(ctcmax) || parseInt(ctcmin) == 0 || parseInt(ctcmax) == 0) {
      this.ctcerrmsg = false;
    } else {
      this.ctcerrmsg = true;
    }
  }

  clear() {
    this.EditWalkinForm.controls['ProbationDuration'].setValue('0');
  }

  clear1() {
    this.EditWalkinForm.controls['ojtDuration'].setValue('0');
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

  modalRef: BsModalRef;

  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {

    this.modalRef.hide();
  }

  declineBoxSecor(): void {
    this.modalRefSector.hide();
  }
  goBack() {
    this.router.navigate(['/WalkinList', { Redirection: btoa('1') }]);
  }

  repost: any;
  companresponsedb: any = [];
  companyprofile: any = '';
  comapnyimage: any = '';
  DBResponce1: any = {};

  PublishJob(item: any, walkinopening: any) {
    var activeStatus = item.activeStatus;
    if (activeStatus == false) {
      this.toastrService.error('Active user to Post the Job');
      this.modalRef.hide();
      return false;
    }
    var verifyStatus = item.verifyStatus;
    if (verifyStatus == false) {
      this.toastrService.error('Approve user to Post the Job');
      this.modalRef.hide();
      return false;
    }
    var shiftTime = item.shiftTime;
    if (shiftTime != 'Freelancer') {
      for (let i = 0; i < walkinopening.length; i++) {
        var minctc = walkinopening[i].minCtc;
        if (minctc == 0) {
          this.toastrService.error("Please enter valid ctc");
          this.modalRef.hide();
          return false;
        }
      }
    }

    //  ***************Date Restriction code(Rajeev Jha)*********************
    var walkinToDatecheck = item.walkinToDate.toString().slice(0, 10).trim();
    var Gettodaydate = this.gettodaydate;
    if (walkinToDatecheck <= Gettodaydate) {
      this.toastrService.error('Invalid Walk-in To Date');
      this.modalRef.hide();
      return false;
    }
    this.spinnerService.show();
    this.walkinService.PublishJob(this.walkinid, this.UserId, this.AdminId).subscribe(res => {
      this.spinnerService.hide();
      this.DBResponce1 = res;
      if (this.DBResponce1.responseResult) {
        this.modalRef.hide();
        this.jobpostToYs(this.DBResponce1.id);
        this.spinnerService.hide();
        this.toastrService.success('Walkin Posted Successfully');
        this.getWalkIndetails(this.postData);
      } else {
        this.toastrService.error(this.DBResponce1.message);
      }
    });
  }
  //  ***********Code to get server date and time (Rajeev Jha)****************
  gettodaydate: any = [];
  serverDate: any;
  serverDateTime() {
    this.masterService.GetServerDateTime().subscribe(res => {
      if (res) {
        this.serverDate = res;
        this.gettodaydate = this.serverDate.toString().slice(0, 10).trim();
      } else {
        this.gettodaydate = [];
      }
    })
  }

  openingResponse: any;
  htmlOpeningDetails: any;
  jobpostToYs(jobId: any) {
    this.spinnerService.show();
    this.walkinService.getJobHtml(jobId).subscribe(res => {
      this.openingResponse = res;
      this.spinnerService.hide();
      // this.htmlOpeningDetails=this.openingResponse.lstAdminEmployerAgency;     
      // if(this.openingResponse){
      //   for (var i=0;i< this.htmlOpeningDetails.length;i++){                                    
      //             var jobHtml= this.htmlOpeningDetails[i].jobHtml;   
      //             var cmpImg=this.htmlOpeningDetails[i].image;
      //             var cmpName=this.htmlOpeningDetails[i].companyName
      //             if(jobHtml!=null && cmpImg){
      //               let postData={
      //                 'Content':jobHtml,
      //                 'DiaplayTo':6,
      //                 'EmployerImage': cmpImg,
      //                 'RojCompName' : cmpName
      //               };   
      //               this.walkinService.PostJobYS(postData).subscribe(res => {    
      //               this.DBResponce = res;
      //               this.spinnerService.hide();
      //               if (this.DbResponce.responseResult) {
      //                 this.toastrService.success(this.DbResponce.message);
      //                 }
      //               });
      //             }                  
      //     }       
      // } 
    });
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

  PushedPost(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  scrapWalkins: any;
  DbResponce: any = {};
  scrapWalkin(id: any, scrap: any) {
    this.scrapWalkins = scrap;
    this.spinnerService.show();
    this.walkinid = undefined;
    this.walkinService.scrapWalkin(id, this.UserId, this.AdminId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.modalRef.hide();
        this.toastrService.success('Walkin Scraped Successfully');
        this.RepostJob(id, '', this.scrapWalkins);
      }
    });
  }

  closeWalkins: any;
  closeWalkin(id: any, close: any) {
    this.closeWalkins = close;
    this.spinnerService.show();
    this.walkinService.closeWalkin(this.AdminId, id, this.UserId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.modalRef.hide();
        this.toastrService.success('Walkin Closed Successfully');
        this.RepostJob(id, '', this.closeWalkins);
      }
    });
  }

  RepostJob(id: any, item: any, repo: any) {
    var activeStatus = item.activeStatus;
    if (activeStatus == false) {
      this.toastrService.error('Active user to Repost the Job');
      this.modalRef.hide();
      return false;
    }
    var verifyStatus = item.verifyStatus;
    if (verifyStatus == false) {
      this.toastrService.error('Approve user to Repost the Job');
      this.modalRef.hide();
      return false;
    }
    //  ***************Date Restriction code(Rajeev Jha)*********************
    // var walkinToDatecheck = item.walkinToDate.toString().slice(0, 10).trim();
    var walkinToDatecheck = item.walkinToDate;
    var Gettodaydate = this.gettodaydate;
    if (walkinToDatecheck <= Gettodaydate) {
      this.toastrService.error('Invalid Walk-in To Date');
      this.modalRef.hide();
      return false;
    }

    this.repost = repo;
    this.walkinid = id;
    this.spinnerService.show();
    this.walkinService.PublishJob(this.walkinid, this.UserId, this.AdminId).subscribe(res => {
      this.DBResponce1 = res
      if (this.DBResponce1.responseResult) {
        if (this.repost != "repost" && this.scrapWalkins != "scrapWalk" && this.closeWalkins != "closeWalk") {
          this.jobpostToYs(this.DBResponce1.id);
          this.toastrService.success('Walkin Posted Successfully');
        } else if (this.repost == "repost") {
          this.jobpostToYs(this.DBResponce1.id);
          this.toastrService.success('Walkin Re-Posted Successfully');
          this.modalRef.hide();
        } else if (this.scrapWalkins != "scrap" || this.closeWalkins != "close") {
          this.jobpostToYs(this.DBResponce1.id);
        }
        this.getWalkIndetails(this.postData);
        this.spinnerService.hide();
      } else {
        this.toastrService.error(this.DBResponce1.message);
      }
    });
  }

  declineModel1(): void {
    this.modalRef.hide();
  }
}