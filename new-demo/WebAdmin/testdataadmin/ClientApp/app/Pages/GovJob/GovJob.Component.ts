import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { JobpostService } from '../../Services/jobpost.service';
import { MasterService } from '../../Services/master.service';
import { GovJobService } from '../../Services/GovJob.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-GovJobComponent',
  templateUrl: './GovJob.Component.html',
  styleUrls: ['./GovJob.component.css']
})
export class GovJobComponent implements OnInit {
  public Editor = ClassicEditor;
  UserInfo: any;
  GOVFORM: FormGroup;
  Filtergovform: FormGroup;
  UpdateGOVFORM: FormGroup;
  constructor(
    private formBuilder: FormBuilder
    , private jobpostService: JobpostService
    , private masterService: MasterService
    , private GovService: GovJobService
    , private toastrService: ToastrService
    , private modalService: BsModalService
    , private spinnerService: Ng4LoadingSpinnerService
  ) {
    try {

    } catch  { }
  }

  ADMINID: any;
  cardview: any = 1;
  formview: any = 1;
  Viewjob: any = 1;
  startminDate: any = '';
  companyregisterdata: any = [];
  UpdateFeeFORM: FormGroup;
  updatefeedetailform: any = 1;
  dropdownSettings: any = {}
  ngOnInit() {
    this.updatefeedetailform = 0;
    this.Viewjob = 0;
    this.updategovform = 0;
    this.companyregisterdata = [];
    this.ADMINID = JSON.parse(localStorage.getItem('phpadminid'));
    this.cardview = 1;
    this.formview = 1;
    this.GOVFORM = this.formBuilder.group({
      'COMPANYNAME': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBPOSITION': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      'STATE': ['', [Validators.nullValidator]],
      'DISTRICT': ['', [Validators.nullValidator]],
      'STARTDATE': ['', [Validators.nullValidator]],
      'ENDDATE': ['', [Validators.nullValidator]],
      'INDUSTRYAREA': ['', [Validators.nullValidator]],
      'QUALIFICATION': ['', [Validators.nullValidator]],
      'EXP': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'SALARY': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'AGE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBTYPE': ['', [Validators.nullValidator]],
      'DESCRIPTION': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBUNDER': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'FEE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'VACANCY': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'MINISTRYNAME': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'EMAIL': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'PHONE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'APPLYURL': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADVERTISEMENTURL': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADVERTISEMENTNUMBER': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADDRESS': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'PINCODE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'CASTE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      MALE: ['', [Validators.nullValidator,]],
      FEMALE: ['', [Validators.nullValidator,]],
      TRANSGENDER: ['', [Validators.nullValidator,]],
      FILE: ['', [Validators.required]],
      DEPARTMENT: ['', [Validators.nullValidator,]],
    });
    this.UpdateGOVFORM = this.formBuilder.group({
      'COMPANYNAME': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBPOSITION': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      'STATE': ['', [Validators.nullValidator]],
      'DISTRICT': ['', [Validators.nullValidator]],
      'STARTDATE': ['', [Validators.nullValidator]],
      'ENDDATE': ['', [Validators.nullValidator]],
      'INDUSTRYAREA': ['', [Validators.nullValidator]],
      'QUALIFICATION': ['', [Validators.nullValidator]],
      'EXP': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'SALARY': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBTYPE': ['', [Validators.nullValidator]],
      'DESCRIPTION': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'JOBUNDER': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'MINISTRYNAME': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'EMAIL': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'PHONE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'APPLYURL': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADVERTISEMENTURL': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADVERTISEMENTNUMBER': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'ADDRESS': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      'PINCODE': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      MALE: ['', [Validators.nullValidator,]],
      FEMALE: ['', [Validators.nullValidator,]],
      TRANSGENDER: ['', [Validators.nullValidator,]],
      FILE: ['', [Validators.nullValidator]],
      DEPARTMENT: ['', [Validators.nullValidator,]],
    });
    this.Filtergovform = this.formBuilder.group({
      SEARCH: ['', [Validators.nullValidator,]],
    });
    this.UpdateFeeFORM = this.formBuilder.group({
      'FEE': ['', [Validators.nullValidator]],
      'VACANCY': ['', [Validators.nullValidator]],
      'AGE': ['', [Validators.nullValidator]],
      'CASTE': ['', [Validators.nullValidator]],
    })
    this.GetAllStates();
    this.startminDate = new Date();
    this.GetGovJob(this.ADMINID);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
  }

  lstState: any = [];
  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
        this.lstState = this.lstState;
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    if (statename != '') {
      this.GetAllDistrict(statename);
    } else {
      this.district = [];
    }
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

  district: any = []
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

  lstIndustryArea: any = []
  mineducation: any = [];
  COMPANYNAME: any;
  JOBPOSITION: any;
  STATE: any;
  DISTRICT: any;
  STARTDATE: any;
  ENDDATE: any;
  AGE: any;
  EXP: any;
  SALARY: any;
  QUALIFICATION: any;
  MALE: any;
  FEMALE: any;
  TRANSGENDER: any;
  JOBTYPE: any;
  CASTE: any;
  JOBUNDER: any;
  INDUSTRYAREA: any;
  FEE: any;
  VACANCY: any;
  MINISTRYNAME: any;
  DESCRIPTION: any;
  EMAIL: any;
  PHONE: any;
  APPLYURL: any;
  ADVERTISEMENTURL: any;
  ADVERTISEMENTNUMBER: any;
  PINCODE: any;
  ADDRESS: any;
  DEPARTMENT: any;
  Response: any = [];
  GenderDetails: any = [];

  Gender(gender: any) {
    let existing = (this.GenderDetails).filter(function (entry) {
      return entry == gender;
    });
    if (existing.length > 0) {
      let index = this.GenderDetails.indexOf(gender);
      this.GenderDetails.splice(index, 1);
    } else {
      this.GenderDetails.push(gender);
    }
    existing = [];
  }

  AdminSetGovJob() {
    this.COMPANYNAME = this.GOVFORM.controls.COMPANYNAME.value;
    this.JOBPOSITION = this.GOVFORM.controls.JOBPOSITION.value;
    this.STATE = this.GOVFORM.controls.STATE.value;
    this.DISTRICT = this.GOVFORM.controls.DISTRICT.value;
    this.STARTDATE = this.GOVFORM.controls.STARTDATE.value;
    this.ENDDATE = this.GOVFORM.controls.ENDDATE.value;
    this.AGE = this.GOVFORM.controls.AGE.value;
    this.EXP = this.GOVFORM.controls.EXP.value;
    this.SALARY = this.GOVFORM.controls.SALARY.value;
    this.QUALIFICATION = this.GOVFORM.controls.QUALIFICATION.value;
    this.JOBTYPE = this.GOVFORM.controls.JOBTYPE.value;
    this.CASTE = this.GOVFORM.controls.CASTE.value;
    this.JOBUNDER = this.GOVFORM.controls.JOBUNDER.value;
    this.INDUSTRYAREA = this.GOVFORM.controls.INDUSTRYAREA.value;
    this.FEE = this.GOVFORM.controls.FEE.value;
    this.VACANCY = this.GOVFORM.controls.VACANCY.value;
    this.MINISTRYNAME = this.GOVFORM.controls.MINISTRYNAME.value;
    this.DESCRIPTION = this.GOVFORM.controls.DESCRIPTION.value;
    this.EMAIL = this.GOVFORM.controls.EMAIL.value;
    this.PHONE = this.GOVFORM.controls.PHONE.value;
    this.APPLYURL = this.GOVFORM.controls.APPLYURL.value;
    this.ADVERTISEMENTURL = this.GOVFORM.controls.ADVERTISEMENTURL.value;
    this.ADVERTISEMENTNUMBER = this.GOVFORM.controls.ADVERTISEMENTNUMBER.value;
    this.PINCODE = this.GOVFORM.controls.PINCODE.value;
    this.ADDRESS = this.GOVFORM.controls.ADDRESS.value;
    this.DEPARTMENT = this.GOVFORM.controls.DEPARTMENT.value;

    var SENDGOVFORMDATA = {
      'lnAdminId': this.ADMINID,
      'strCompanyName': this.COMPANYNAME,
      'strJobPosition': this.JOBPOSITION,
      'lnStateId': this.STATE,
      'lnDistrictId': this.DISTRICT,
      'dtStartDate': this.STARTDATE,
      'dtEndDate': this.ENDDATE,
      'strExperience': this.EXP,
      'strSalary': this.SALARY,
      'lstQualification': this.QUALIFICATION ? this.QUALIFICATION : [],
      'strGender': this.GenderDetails.toString(),
      'strJobType': this.JOBTYPE,
      'strJobUnder': this.JOBUNDER,
      'lstIndustry': this.INDUSTRYAREA ? this.INDUSTRYAREA : [],
      'lnID': 0,
      'strMinistryName': this.MINISTRYNAME,
      'strSkill': this.DESCRIPTION,
      'strEmail': this.EMAIL,
      'strPhone': this.PHONE,
      'strApplyUrl': this.APPLYURL,
      'strAdvertisementUrl': this.ADVERTISEMENTURL,
      'strAdvertisementNo': this.ADVERTISEMENTNUMBER,
      'strPinCode': this.PINCODE,
      'strAddress': this.ADDRESS,
      'lstDepartment': this.DEPARTMENT ? this.DEPARTMENT : [],
      'strDocName': this.imagenameshow,
      'strDocExt': this.ImgExtention,
      'strDocPath': this.ImgPath,
      'lstJobDetails': this.Catsevalue
    }
    this.spinnerService.show();
    this.GovService.AdminSetGovJob(SENDGOVFORMDATA).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.spinnerService.hide();
        this.Response = this.Response.message;
        this.GOVFORM.reset();
        this.toastrService.success(this.Response);
        this.cardview = 1;
        this.formview = 1;
        this.GetGovJob(this.ADMINID);
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  Showgovform() {
    this.GenderDetails = []; //used to blank gender list
    this.GetQualification();
    this.GetGovDepartment();
    this.GetGovIndustryArea();
    this.cardview = 0;
    this.formview = 0;
    this.Catsevalue = [];
    this.GOVFORM.reset();
    this.GOVFORM.controls['STATE'].setValue('');
    this.GOVFORM.controls['DISTRICT'].setValue('');
    this.GOVFORM.controls['JOBTYPE'].setValue('');
    this.GOVFORM.controls['JOBUNDER'].setValue('');
    this.GOVFORM.controls['CASTE'].setValue('');
  }

  Closegovform() {
    this.cardview = 1;
    this.formview = 1;
  }

  Resetfilter() {
    this.GOVFORM.reset();
  }

  pageNumber: number = 0;
  from: any;
  data: any;
  GetGovJobdata: any = [];
  GetGovJob(Formvalue: any) {
    var Adminid = this.ADMINID;
    // var senddata = { 'AdminId': Adminid };
    this.spinnerService.show();
    this.GovService.GetGovJob(this.ADMINID).subscribe(res => {
      this.Response = res;
      if (this.Response != '') {
        this.GetGovJobdata = this.Response.lstGovJob;
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  img: any;
  base64textString: any = [];
  imgtype: any;
  currentFile: any;
  ValidImageTypes: any;
  imagename: any;
  onUploadChange(evt: any, selectFile: any) {
    this.img = selectFile;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile = file;
    var imagetype = this.currentFile.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    this.imgtype = imagetype[1];
    if ($.inArray(imagetype[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg, png");
      this.GOVFORM.controls['FILE'].setValue('');
      return false;
    }
    this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    var mimetypereader = new FileReader();
    mimetypereader.onloadend = this.CheckMimeType.bind(this);
    const Eblob = file.slice(0, 4);
    var data = mimetypereader.readAsArrayBuffer(Eblob);
  }

  CheckMimeType(e) {
    var res = e.target.result;
    let bytes = [];
    const uint = new Uint8Array(res);
    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    })
    const hex = bytes.join('').toUpperCase();
    var fileType = this.getMimetype(hex);
    if ($.inArray(fileType, this.ValidImageTypes) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      $("#fileProfile").val('');
      this.GOVFORM.controls.FILE.setValue('');
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        this.GOVFORM.controls.FILE.setValue('');
        return false;
      }
      reader.onloadend = this.handleReaderLoaded.bind(this);
      var data = reader.readAsBinaryString(this.currentFile);
    }
  }

  imagenameshow: any;
  ImgExtention: any = '';
  ImgName: any = '';
  ImgPath: any = "";
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    this.imagenameshow = this.currentFile.name;//image name with extension
    var imn2 = imn.split('.');
    this.ImgExtention = '.' + imn2[1];//image extension only
    this.ImgName = imn2[0];
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));//used to get image on select image form
    this.ImgPath = '';
    this.ImgPath = 'data:image/png;base64,' + btoa(e.target.result);//image path
  }

  getMimetype(signature) {
    switch (signature) {
      case '89504E47':
        return 'image/png'
      case '47494638':
        return 'image/gif'
      case '25504446':
        return 'application/pdf'
      case 'FFD8FFDB':
      case 'FFD8FFE0':
        return 'image/jpeg'
      case '504B0304':
        return 'application/zip'
      default:
        return 'Unknown filetype'
    }
  }

  Catsevalue: any = [];
  AddCastevalue() {
    if (this.GOVFORM.controls.CASTE.value == '' || this.GOVFORM.controls.CASTE.value == null || this.GOVFORM.controls.CASTE.value == undefined) {
      this.toastrService.clear();
      this.toastrService.error('Please enter Caste');
      return false;
    }
    this.Catsevalue.push(
      {
        strCaste: this.GOVFORM.controls.CASTE.value,
        intVacancy: this.GOVFORM.controls.VACANCY.value,
        strApplicationFee: this.GOVFORM.controls.FEE.value,
        strAge: this.GOVFORM.controls.AGE.value,
        bIsactive: 1
      }
    );
    this.GOVFORM.controls['CASTE'].setValue("");
    this.GOVFORM.controls['VACANCY'].setValue("");
    this.GOVFORM.controls['FEE'].setValue("");
    this.GOVFORM.controls['AGE'].setValue("");
  }

  QualificationDetail: any = [];
  QualificationDetailbind: any = [];

  GetQualification() {
    var inputvalue = '';
    var senddata = {
      'key': inputvalue
    }
    this.GovService.GetQualification(senddata).subscribe(res => {
      this.QualificationDetail = res;
      if (this.QualificationDetail != '') {
        this.QualificationDetailbind = this.QualificationDetail;
      }
    });
  }

  DepartmentDetail: any = [];
  GetGovDepartment() {
    var inputvalue = '';
    var senddata = {
      'key': inputvalue
    }
    this.GovService.GetGovDepartment(senddata).subscribe(res => {
      this.DepartmentDetail = res;
      if (this.DepartmentDetail != '') {
        this.DepartmentDetail = this.DepartmentDetail;
      }
    });
  }

  IndustryDetail: any = [];
  GetGovIndustryArea() {
    var inputvalue = '';
    var senddata = {
      'key': inputvalue
    }
    this.GovService.GetGovIndustryArea(senddata).subscribe(res => {
      this.IndustryDetail = res;
      if (this.IndustryDetail != '') {
        this.IndustryDetail = this.IndustryDetail;
      }
    });
  }

  NewSectorShow: any = [];
  NewSectorData: any = [];
  SendCatsevalue: any = [];
  modalRefSector: BsModalRef;
  modalRefSector1: BsModalRef;
  deleteSector(index: number) {
    this.Catsevalue.splice(index, 1);
    this.NewSectorData.splice(index, 1);
    this.modalRefSector.hide();
  }

  DeleteFeeDetail(index: number, Item) {
    let existing = (this.FeeId).filter(function (entry) {
      return entry == Item.lnGovJobId;
    });

    if (existing.length > 0) {
      for (var i = 0; i < this.Catsevalue.length; i++) {
        if (this.Catsevalue[i].lnGovJobId == Item.lnGovJobId) {
          this.Catsevalue.splice(i, 1);
          let data = {
            lnGovJobId: Item.lnGovJobId,
            bIsactive: 0,
            strCaste: Item.strCaste,
            intVacancy: Item.intVacancy,
            strApplicationFee: Item.strApplicationFee,
            strAge: Item.strAge,
            lnAdminId: 0
          }
          this.Catsevalue.push(data);
          // this.TempCastValue = this.Catsevalue;
        }
      }
    } else {
      this.Catsevalue.splice(index, 1);
      // this.TempCastValue.splice(index, 1);
      // this.Catsevalue = this.TempCastValue;
    }
    this.modalRefSector.hide();
  }

  declineBoxSecor(): void {
    this.modalRefSector.hide();
  }

  PusTemplateSector(templateSector: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-sm' });
  }

  DeleteFeeDetails(templatedeletefee: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templatedeletefee, { class: 'modal-sm' });
  }

  Jobid: any;
  GetGovJobPostByIddata: any = [];
  ViewgovJob(Jobid: any) {
    this.Jobid = Jobid;
    this.Viewjob = 1;
    this.formview = 1;
    this.cardview = 0;
    this.spinnerService.show();
    this.GovService.GetGovJobPostById(this.Jobid).subscribe(res => {
      this.Response = res;
      if (this.Response != '') {
        this.GetGovJobPostByIddata = this.Response.lstGovJob[0];
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  ClosegovDetails() {
    this.Viewjob = 0;
    this.formview = 1;
    this.cardview = 1;
  }

  updategovform: any = 1;
  FeeId: any = [];
  EditgovJob(Jobid: any) {
    this.minDate='';
    this.GetGovJobPostByIddata = [];
    this.base64textString = [];
    this.ImgPath = '';
    this.ImgExtention = '';
    this.imagenameshow = '';
    this.GenderDetails = [];
    // this.GetQualification();
    // this.GetGovIndustryArea();
    // this.GetGovDepartment();
    var Jobid = Jobid;
    this.updategovform = 1;
    this.cardview = 0;
    this.spinnerService.show();
    this.GovService.GetGovJobPostById(Jobid).subscribe(res => {
      this.Response = res;
      if (this.Response != '') {
        this.FeeId = [];
        if (this.Response.lstGovJob[0].lstJobDetails != null) {
          for (let arr of this.Response.lstGovJob[0].lstJobDetails) {
            this.FeeId.push(arr.lnGovJobId);
          }
          this.Catsevalue = this.Response.lstGovJob[0].lstJobDetails;
          // this.TempCastValue = this.Catsevalue;
        }
        this.GetGovJobPostByIddata = this.Response.lstGovJob[0];
        this.UpdateGOVFORM.controls['COMPANYNAME'].setValue(this.GetGovJobPostByIddata.strCompanyName);
        this.UpdateGOVFORM.controls['JOBPOSITION'].setValue(this.GetGovJobPostByIddata.strJobPosition);
        this.UpdateGOVFORM.controls['STATE'].setValue(this.GetGovJobPostByIddata.lnStateId);
        this.GetAllDistrict(this.GetGovJobPostByIddata.lnStateId);
        this.UpdateGOVFORM.controls['DISTRICT'].setValue(this.GetGovJobPostByIddata.lnDistrictId);
        this.UpdateGOVFORM.controls['STARTDATE'].setValue(new Date(this.GetGovJobPostByIddata.dtStartDate));
        this.UpdateGOVFORM.controls['ENDDATE'].setValue(new Date(this.GetGovJobPostByIddata.dtEndDate));
        this.UpdateGOVFORM.controls['EXP'].setValue(this.GetGovJobPostByIddata.strExperience);
        this.UpdateGOVFORM.controls['SALARY'].setValue(this.GetGovJobPostByIddata.strSalary);
        this.UpdateGOVFORM.controls['MINISTRYNAME'].setValue(this.GetGovJobPostByIddata.strMinistryName);
        this.UpdateGOVFORM.controls['QUALIFICATION'].setValue('');
        this.UpdateGOVFORM.controls['INDUSTRYAREA'].setValue('');
        this.UpdateGOVFORM.controls['DEPARTMENT'].setValue('');

        var Gender = this.GetGovJobPostByIddata.strGender;
        var male = Gender.match(/Male/);
        if (male != '' && male != undefined && male != null) {
          this.GenderDetails.push("Male");
          this.UpdateGOVFORM.controls['MALE'].setValue(male);
        }
        var female = Gender.match(/Female/);
        if (female != '' && female != undefined && female != null) {
          this.GenderDetails.push("Female");
          this.UpdateGOVFORM.controls['FEMALE'].setValue(female);
        }

        var transgender = Gender.match(/Transgender/);
        if (transgender != '' && transgender != undefined && transgender != null) {
          this.GenderDetails.push("Transgender");
          this.UpdateGOVFORM.controls['TRANSGENDER'].setValue(transgender);
        }
        this.UpdateGOVFORM.controls['JOBTYPE'].setValue(this.GetGovJobPostByIddata.strJobType);
        this.UpdateGOVFORM.controls['JOBUNDER'].setValue(this.GetGovJobPostByIddata.strJobUnder);
        this.UpdateGOVFORM.controls['QUALIFICATION'].setValue(this.GetGovJobPostByIddata.lstQualification);
        this.UpdateGOVFORM.controls['INDUSTRYAREA'].setValue(this.GetGovJobPostByIddata.lstIndustry);
        this.UpdateGOVFORM.controls['DEPARTMENT'].setValue(this.GetGovJobPostByIddata.lstDepartment);
        this.UpdateGOVFORM.controls['DESCRIPTION'].setValue(this.GetGovJobPostByIddata.strSkill);
        this.UpdateGOVFORM.controls['EMAIL'].setValue(this.GetGovJobPostByIddata.strEmail);
        this.UpdateGOVFORM.controls['PHONE'].setValue(this.GetGovJobPostByIddata.strPhone);
        this.UpdateGOVFORM.controls['APPLYURL'].setValue(this.GetGovJobPostByIddata.strApplyUrl);
        this.UpdateGOVFORM.controls['ADVERTISEMENTURL'].setValue(this.GetGovJobPostByIddata.strAdvertisementUrl);
        this.UpdateGOVFORM.controls['ADVERTISEMENTNUMBER'].setValue(this.GetGovJobPostByIddata.strAdvertisementNo);
        this.UpdateGOVFORM.controls['PINCODE'].setValue(this.GetGovJobPostByIddata.strPinCode);
        this.UpdateGOVFORM.controls['ADDRESS'].setValue(this.GetGovJobPostByIddata.strAddress);
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
      this.GetQualification();
      this.GetGovIndustryArea();
      this.GetGovDepartment();
    });
  }

  Closeupdategovform() {
    this.updategovform = 0;
    this.cardview = 1;
    this.UpdateGOVFORM.controls['QUALIFICATION'].setValue('');
    this.UpdateGOVFORM.controls['INDUSTRYAREA'].setValue('');
    this.UpdateGOVFORM.controls['DEPARTMENT'].setValue('');
  }

  AdminUpdateGovJob(GetGovJobPostByIddata: any) {
    var Jobid = GetGovJobPostByIddata.lnID;
    var genderget = GetGovJobPostByIddata.strGender;
    this.COMPANYNAME = this.UpdateGOVFORM.controls.COMPANYNAME.value;
    this.JOBPOSITION = this.UpdateGOVFORM.controls.JOBPOSITION.value;
    this.STATE = this.UpdateGOVFORM.controls.STATE.value;
    if(this.STATE!=''){
    this.DISTRICT = this.UpdateGOVFORM.controls.DISTRICT.value;
    }
    else{
      this.DISTRICT='';
    }
    this.STARTDATE = this.UpdateGOVFORM.controls.STARTDATE.value;
    this.ENDDATE = this.UpdateGOVFORM.controls.ENDDATE.value;
    this.EXP = this.UpdateGOVFORM.controls.EXP.value;
    this.SALARY = this.UpdateGOVFORM.controls.SALARY.value;
    this.QUALIFICATION = this.UpdateGOVFORM.controls.QUALIFICATION.value;

    this.MALE = this.UpdateGOVFORM.controls.MALE.value;
    this.FEMALE = this.UpdateGOVFORM.controls.FEMALE.value;
    this.TRANSGENDER = this.UpdateGOVFORM.controls.TRANSGENDER.value;

    this.JOBTYPE = this.UpdateGOVFORM.controls.JOBTYPE.value;
    this.JOBUNDER = this.UpdateGOVFORM.controls.JOBUNDER.value;
    this.INDUSTRYAREA = this.UpdateGOVFORM.controls.INDUSTRYAREA.value;
    this.MINISTRYNAME = this.UpdateGOVFORM.controls.MINISTRYNAME.value;
    this.DESCRIPTION = this.UpdateGOVFORM.controls.DESCRIPTION.value;
    this.EMAIL = this.UpdateGOVFORM.controls.EMAIL.value;
    this.PHONE = this.UpdateGOVFORM.controls.PHONE.value;
    this.APPLYURL = this.UpdateGOVFORM.controls.APPLYURL.value;
    this.ADVERTISEMENTURL = this.UpdateGOVFORM.controls.ADVERTISEMENTURL.value;
    this.ADVERTISEMENTNUMBER = this.UpdateGOVFORM.controls.ADVERTISEMENTNUMBER.value;
    this.PINCODE = this.UpdateGOVFORM.controls.PINCODE.value;
    this.ADDRESS = this.UpdateGOVFORM.controls.ADDRESS.value;
    this.DEPARTMENT = this.UpdateGOVFORM.controls.DEPARTMENT.value;

    // this.Catsevalue.push(
    //   {
    //     strCaste: '',
    //     intVacancy: '',
    //     strApplicationFee: '',
    //     strAge: '',
    //   }
    // );
    var SENDGOVFORMDATA = {
      'lnAdminId': this.ADMINID,
      'strCompanyName': this.COMPANYNAME,
      'strJobPosition': this.JOBPOSITION,
      'lnStateId': this.STATE,
      'lnDistrictId': this.DISTRICT,
      'dtStartDate': this.STARTDATE,
      'dtEndDate': this.ENDDATE,
      'strExperience': this.EXP,
      'strSalary': this.SALARY,
      'lstQualification': this.QUALIFICATION ? this.QUALIFICATION : [],
      'strGender': this.GenderDetails.toString() ? this.GenderDetails.toString() : genderget,
      'strJobType': this.JOBTYPE,
      'strJobUnder': this.JOBUNDER,
      'lstIndustry': this.INDUSTRYAREA ? this.INDUSTRYAREA : [],
      'lnID': Jobid,
      'strMinistryName': this.MINISTRYNAME,
      'strSkill': this.DESCRIPTION,
      'strEmail': this.EMAIL,
      'strPhone': this.PHONE,
      'strApplyUrl': this.APPLYURL,
      'strAdvertisementUrl': this.ADVERTISEMENTURL,
      'strAdvertisementNo': this.ADVERTISEMENTNUMBER,
      'strPinCode': this.PINCODE,
      'strAddress': this.ADDRESS,
      'lstDepartment': this.DEPARTMENT ? this.DEPARTMENT : [],
      'strDocName': this.imagenameshow,
      'strDocExt': this.ImgExtention,
      'strDocPath': this.ImgPath,
      // 'lstJobDetails': []
      'lstJobDetails': this.Catsevalue,
    }
    this.spinnerService.show();
    this.GovService.AdminSetGovJob(SENDGOVFORMDATA).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.Response = this.Response.message;
        this.GOVFORM.reset();
        this.toastrService.success(this.Response);
        this.cardview = 1;
        this.formview = 1;
        this.updategovform = 0;
        this.GetGovJob(this.ADMINID);
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  lnGovJobId: any;
  bIsactive: any;
  openfeedetailseditform(item) {
    var item = item;
    this.updatefeedetailform = 1;
    this.Viewjob = 0;
    this.updategovform = 0;
    this.UpdateFeeFORM.controls['CASTE'].setValue(item.strCaste);
    this.UpdateFeeFORM.controls['VACANCY'].setValue(item.intVacancy);
    this.UpdateFeeFORM.controls['AGE'].setValue(item.strAge);
    this.UpdateFeeFORM.controls['FEE'].setValue(item.strApplicationFee);
    this.lnGovJobId = item.lnGovJobId;
    this.bIsactive = item.bIsactive;
  }

  Closefeedeatilupdateform() {
    this.updatefeedetailform = 0;
    this.Viewjob = 0;
    this.updategovform = 1;
  }

  AdminUpdateGovFeeDetails(GetGovJobPostByIddata: any) {
    var ii = 0;
    var Catse = this.UpdateFeeFORM.controls.CASTE.value;
    var Vacancy = this.UpdateFeeFORM.controls.VACANCY.value;
    var Fee = this.UpdateFeeFORM.controls.FEE.value;
    var Age = this.UpdateFeeFORM.controls.AGE.value;
    var IDD = this.lnGovJobId;
    let existing = (this.FeeId).filter(function (entry) {
      return entry == IDD;
    });
    if (existing.length > 0) {
      for (ii = 0; ii < this.Catsevalue.length; ii++) {
        if (this.Catsevalue[ii].lnGovJobId == IDD) {

          this.Catsevalue[ii].lnGovJobId = IDD;
          this.Catsevalue[ii].bIsactive = 1;
          this.Catsevalue[ii].strCaste = Catse;
          this.Catsevalue[ii].intVacancy = Vacancy;
          this.Catsevalue[ii].strApplicationFee = Fee;
          this.Catsevalue[ii].strAge = Age;
          this.Catsevalue[ii].lnAdminId = 0;

          // this.Catsevalue.splice(ii, 1);
          // let data = {
          //   lnGovJobId: IDD,
          //   bIsactive: 1,
          //   strCaste: Catse,
          //   intVacancy: Vacancy,
          //   strApplicationFee: Fee,
          //   strAge: Age,
          //   lnAdminId: 0
          // }
          // this.Catsevalue.push(data);
        }
      }
    }
    this.Viewjob = 0;
    this.cardview = 0;
    this.updatefeedetailform = 0;
    this.updategovform = 1;
    this.toastrService.success('Fee Details Updated Successfully');
  }

  LangFormArray: any = [];
  onItemDeSelect(item: any) {
    let index = this.LangFormArray.indexOf(item.name);
    this.LangFormArray.splice(index, 1);
  }

  onDeSelectAll(items: any) {
    this.LangFormArray = [];
  }

  onItemSelect(item: any) {
    this.LangFormArray.push(item.name);
  }

  onSelectAll(items: any) {
    this.LangFormArray = [];
    for (var i = 0; i < items.length; i++) {
      this.LangFormArray.push(items[i].name);
    }
  }

  PostGovConfimation(templatePostGovConfimation: TemplateRef<any>) {
    this.modalRefSector1 = this.modalService.show(templatePostGovConfimation, { class: 'modal-sm' });
  }
  declineBoxSecor1(){
    this.modalRefSector1.hide();
  }
  PostgovJob(Jobid: any) {
    var Jobid = Jobid;

    this.spinnerService.show();
    //return false;
    this.GovService.PostGovJobToYs(Jobid).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.spinnerService.hide();
        this.modalRefSector1.hide();
        this.Response = this.Response.message;
        this.modalRefSector.hide();
        this.GOVFORM.reset();
        this.toastrService.success(this.Response);
        this.cardview = 1;
        this.formview = 1;
        this.GetGovJob(this.ADMINID);
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  AddQualification(templatequalification: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templatequalification, { class: 'modal-md ', backdrop: 'static', keyboard: false });
  }

  SubmitQUALIFICATION(Qualification) {
    if (Qualification == '' || Qualification == null || Qualification == undefined) {
      this.toastrService.error('Please enter qualification');
      return false;
    }
    var Qualification = Qualification;
    var Sendata = {
      'strQualification': Qualification,
      'strIndustryName': '',
      'strDepartmentName': ''
    }
    this.spinnerService.show();
    this.GovService.SetGovIndustryDepartmentQualification(Sendata).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.spinnerService.hide();
        this.Response = this.Response.message;
        this.toastrService.success(this.Response);
        this.modalRefSector.hide();
        this.GetQualification();
        this.GetGovDepartment();
        this.GetGovIndustryArea();
      } else {
        this.Response = this.Response.message;
        this.toastrService.clear();
        this.toastrService.error(this.Response);
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  // TempCastValue: any = [];
  Submitnewfeedetails(caste, vacancy, applicationfee, age) {
    var caste = caste;
    if (caste == '' || caste == null || caste == undefined) {
      this.toastrService.error("Please select caste");
      return false;
    }
    var vacancy = vacancy;
    var applicationfee = applicationfee;
    var age = age;
    let data = {
      // lnGovJobId: IDD,
      bIsactive: 1,
      strCaste: caste,
      intVacancy: vacancy,
      strApplicationFee: applicationfee,
      strAge: age,
      // lnAdminId: 0
    }
    this.Catsevalue.push(data);
    // this.TempCastValue = this.Catsevalue;
    this.modalRefSector.hide();
  }

  AddFeedetails(FeedetailUpdateTemplate: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(FeedetailUpdateTemplate, { class: 'modal-md ', backdrop: 'static', keyboard: false });
  }

  AddIndustryArea(IndustryAreaTemplate: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(IndustryAreaTemplate, { class: 'modal-md ', backdrop: 'static', keyboard: false });
  }

  SubmitIndustryArea(IndustryArea) {
    if (IndustryArea == '' || IndustryArea == null || IndustryArea == undefined) {
      this.toastrService.error('Please enter Industry Area');
      return false;
    }
    var IndustryArea = IndustryArea;
    var Sendata = {
      'strQualification': '',
      'strIndustryName': IndustryArea,
      'strDepartmentName': ''
    }
    this.spinnerService.show();
    this.GovService.SetGovIndustryDepartmentQualification(Sendata).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.spinnerService.hide();
        this.Response = this.Response.message;
        this.toastrService.success(this.Response);
        this.modalRefSector.hide();
        this.GetQualification();
        this.GetGovDepartment();
        this.GetGovIndustryArea();
      } else {
        this.Response = this.Response.message;
        this.toastrService.clear();
        this.toastrService.error(this.Response);
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  AddDepartment(DepartmentTemplate: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(DepartmentTemplate, { class: 'modal-md ', backdrop: 'static', keyboard: false });
  }

  SubmitDepartment(Department) {
    if (Department == '' || Department == null || Department == undefined) {
      this.toastrService.error('Please enter Department');
      return false;
    }
    var Department = Department;
    var Sendata = {
      'strQualification': '',
      'strIndustryName': '',
      'strDepartmentName': Department
    }
    this.spinnerService.show();
    this.GovService.SetGovIndustryDepartmentQualification(Sendata).subscribe(res => {
      this.Response = res;
      if (this.Response.responseResult != false) {
        this.spinnerService.hide();
        this.Response = this.Response.message;
        this.toastrService.success(this.Response);
        this.modalRefSector.hide();
        this.GetQualification();
        this.GetGovDepartment();
        this.GetGovIndustryArea();
      } else {
        this.Response = this.Response.message;
        this.toastrService.error(this.Response);
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  CloseQID() {
    this.modalRefSector.hide();
  }

  htmlget: any;
  ViewpostedgovJob(Jobid: any, viewPostedjobtemplate: TemplateRef<any>) {
    var Jobid = Jobid;
    this.spinnerService.show();
    this.GovService.GetGovJobPostHtml(Jobid).subscribe(res => {
      this.Response = res;
      if (this.Response != '') {
        this.htmlget = this.Response.lstGovJob[0].jobHTML;
        this.modalRefSector = this.modalService.show(viewPostedjobtemplate, { class: 'modal-lg' });
        this.spinnerService.hide();
      } else {
        this.Response = [];
        this.spinnerService.hide();
      }
    });
  }

  CloseReviewDetails() {
    this.modalRefSector.hide();
  }
}