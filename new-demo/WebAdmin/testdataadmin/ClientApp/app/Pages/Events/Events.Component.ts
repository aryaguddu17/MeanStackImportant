import { Component, OnInit, HostListener, ViewChild, TemplateRef, AfterViewInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
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
// import { ScreeningQuestionService } from '../../Services/screeningQuestion.service';
import *as moment from 'moment';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
import { EventService } from '../../Services/Event.service';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
  
@Component({
  selector: 'app-EventsComponent',
  templateUrl: './Events.Component.html',
})
export class EventsComponent implements OnInit {
  // @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  // @ViewChild('JobForms') JobForms: HTMLFormElement;
  modalRef: BsModalRef;
  AdminId: any;
  EmployerRegister: any = 0;
  ListOfEvent: any = 1;
  EmployerRegistrationForm: FormGroup;
  UserForm: FormGroup;
  ContactPersonForm: FormGroup;
  JobUpdateForm: FormGroup;
  OpeningForm: FormGroup;
  FilterEventEmployerForm: FormGroup;
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

  delay: boolean = false;
  EventListStatus: boolean = false;


  public popoverTitle: string = 'Are You sure?';
  confirmText: any = 'Yes';
  cancelText: any = 'No';
  constructor(
    private EventService: EventService,
    private RojggarMelaService: RojggarMelaService,
    private appConfig: AppConfig
    , private toastrService: ToastrService
    , private userinfoservice: UserInfoService
    , private masterService: MasterService
    , private jobpostService: JobpostService
    , private modalService: BsModalService
    , private formBuilder: FormBuilder
    , private _location: Location
    , private router: Router
    , private spinnerService: Ng4LoadingSpinnerService) {
    try {

    } catch  { }
  }

  ngOnInit() {
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
    this.GetMinEducation();
    this.UserForm = this.formBuilder.group({
      name: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      designation: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
    });

    this.ContactPersonForm = this.formBuilder.group({
      empEventContactId: ['', [Validators.nullValidator,]],
      contacPersionName: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      email: ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail])]],
      mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      designation: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
    });

    this.EmployerRegistrationForm = this.formBuilder.group({
      EmployerList: ['', [Validators.required,]],
      ContactDetail: ['', [Validators.nullValidator,]],
      JobTitle: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      age: ['', [Validators.nullValidator,]],
      MinQualification: ['', [Validators.nullValidator,]],
      minSalaryPerMonth: ['', [Validators.nullValidator,]],
      maxSalaryPerMonth: ['', [Validators.nullValidator,]],
      Opening: ['', [Validators.nullValidator,]],
      states: ['', [Validators.nullValidator,]],
      District: ['', [Validators.nullValidator,]],
      profile_pic: ['', [Validators.nullValidator,]],
      MaxCtc: ['', [Validators.nullValidator,]],
      MinCtc: ['', [Validators.nullValidator,]],
      heightFeet: ['', [Validators.nullValidator,]],
      heightInch: ['', [Validators.nullValidator,]],
      Weight: ['', [Validators.nullValidator,]],
    });

    this.OpeningForm = this.formBuilder.group({
      eventJobOpngId: ['', [Validators.nullValidator,]],
      MaxCtc: ['', [Validators.nullValidator,]],
      MinCtc: ['', [Validators.nullValidator,]],
      minSalaryPerMonth: ['', [Validators.nullValidator,]],
      maxSalaryPerMonth: ['', [Validators.nullValidator,]],
      Opening: ['', [Validators.nullValidator,]],
      states: ['', [Validators.nullValidator,]],
      District: ['', [Validators.nullValidator,]],

    });

    this.JobUpdateForm = this.formBuilder.group({
      JobTitle: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      MinQualification: ['', [Validators.required,]],
      Weight: ['', [Validators.nullValidator,]],
      heightFeet: ['', [Validators.nullValidator,]],
      heightInch: ['', [Validators.nullValidator,]],
      age: ['', [Validators.required,]]
    });

    this.FilterEventForm = this.formBuilder.group({
      EvenType: ['', [Validators.nullValidator,]],
      stateId: ['', [Validators.nullValidator,]],
      districtId: ['', [Validators.nullValidator,]],
      Search: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      filterstartDate: ['', [Validators.nullValidator,]],
      filterendDate: ['', [Validators.nullValidator,]],
      EventRS: ['', [Validators.nullValidator,]],
    });

    this.FilterEventEmployerForm = this.formBuilder.group({
      stateId: ['', [Validators.nullValidator,]],
      districtId: ['', [Validators.nullValidator,]],
      Search: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
    });

    this.EventsList(this.FilterEventForm, 0, '');
    this.GetAllEventType();
    this.GETALLSTATE();
    this.GetAllStates();
  }
  //////// For View More button  ////////
  toggle: boolean = false;
  texttoggle: any = 'View More';
  togglediv() {
    this.toggle = !this.toggle;
    if (this.texttoggle == 'View More') {
      this.texttoggle = 'View Less';
    }
    else {
      this.texttoggle = 'View More';
    }
  }

  ApplyFilterShow = 1;
  EventtypeList: any;
  item: any;
  Adminid: any;
  GetAllEventType() {//Use to get all event type dropdown
    try {
      this.item = localStorage.getItem('phpadminid');
      this.Adminid = parseInt(JSON.parse(this.item));
      this.RojggarMelaService.GetAllEvent(this.Adminid).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce.lstGetEventType != null) {
          this.EventtypeList = this.DBResponce.lstGetEventType;
        }
        else {
          this.EventtypeList = [];
        }
      });
    } catch  { }
  }

  FilterEventForm: FormGroup;
  // FilterForm() {
  //   this.FilterEventForm = this.formBuilder.group({
  //     EvenType: ['', [Validators.nullValidator,]],
  //     stateId: ['', [Validators.nullValidator,]],
  //     districtId: ['', [Validators.nullValidator,]],
  //     Search: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
  //     filterstartDate: ['', [Validators.nullValidator,]],
  //     filterendDate: ['', [Validators.nullValidator,]],
  //   });
  // }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (this.EventListStatus) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      // if (pos >= (0.8 * max)) {
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.EventList.length >= 10 && this.EventListStatus) {
          this.pagenumber = this.pagenumber + 1;
          this.EventsList(this.FilterEventForm, this.pagenumber, 'scroll');
        }
      }
    }
  }

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  AddUserDetails(template: TemplateRef<any>) {
    this.UserForm.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  close() {
    this.modalRef.hide();
  }


  deleteContact(index: number) {
    this.userdata.splice(index, 1);
    // this.newAttribute.splice(index, 1);
    this.modalRef.hide();
  }

  removeOpening(index: number) {
    this.newAttributeShow.splice(index, 1);
    this.lstEventJobDetails.splice(index, 1);
    this.modalRef.hide();
  }

  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {
    this.modalRef.hide();
  }

  States: any = [];
  district: any = [];
  GetAllStates() {
    this.spinnerService.show();
    this.jobpostService.GetAllStates().subscribe(res => {
      this.States = res
      if (this.States != null) {
        this.spinnerService.hide();
        this.States = this.States.Data;
      }
      else {
        this.States = [];
        this.spinnerService.hide();
      }
    });
  }

  lstState: any = [];
  private GETALLSTATE() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res;
        this.lstState = this.lstState;
      });
    } catch  { }
  }

  GetAllDistrict(event: any) {
    this.FilterEventEmployerForm.controls['districtId'].setValue('');
    this.EmployerRegistrationForm.controls['District'].setValue('');
    this.OpeningForm.controls['District'].setValue('');
    if (event == undefined || event == "") {
      this.district = [];
      // this.EmployerRegistrationForm.controls['DistrictID'].setValue('');
      return false;
    }
    this.spinnerService.show();
    this.jobpostService.GetAllDistrict(event).subscribe(res => {
      this.district = res
      if (this.district != null) {
        this.district = this.district.Data;
        this.spinnerService.hide();
      }
      else {
        this.district = [];
      }
    });
  }

  minExp: number = 0;
  maxExp: number = 0;
  minAge: number = 0;
  maxAge: number = 0;
  minCtc: number = 0;
  maxCtc: number = 0;
  status = true;
  statusAge = true;
  allusers: any = [];
  // CompanyResponse: any = [];
  Dbresponse: any = [];
  companydetails: any = [];
  CompanyData: any = [];
  companyid: any;
  getUser(companyId) {//old
    this.companyid = companyId;
    this.RojggarMelaService.GetCompanyData(companyId).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.lstCompanyProfile != null) {
        this.companydetails = this.Dbresponse.lstCompanyProfile;
        this.CompanyData = this.companydetails[0];
        this.allusers = [];
        this.RojggarMelaService.GetAllUser(this.AdminId, companyId).subscribe(res => {
          let userresponse = res;
          this.allusers = userresponse['lstAdminCompanyWiseActiveUserList'];
        });
      } else {
        this.spinnerService.hide();
        this.CompanyData = this.Dbresponse.lstCompanyProfile;
        this.companydetails = this.companydetails;
      }
    });
  }

  // getUser(companyId) {//new
  //   this.companyid = companyId;
  //   this.RojggarMelaService.GetCompanyData(companyId).subscribe(res => {
  //     this.Dbresponse = res;
  //     if (this.Dbresponse.lstCompanyProfile != null) {
  //       this.companydetails = this.Dbresponse.lstCompanyProfile;
  //       this.CompanyData = this.companydetails[0];
  //       this.allusers = [];
  //       this.RojggarMelaService.GetAllUser(companyId,this.EventId).subscribe(res => {
  //         let userresponse = res;
  //         this.allusers = userresponse['lstAdminEventdContactDetailList'];
  //       });
  //     } else {
  //       this.spinnerService.hide();
  //       this.CompanyData = this.Dbresponse.lstCompanyProfile;
  //       this.companydetails = this.companydetails;
  //     }
  //   });
  // }


  AddUser(userdata) {//Used to add Contact Details
    if (userdata.name == "") {
      this.toastrService.error("Please add Contact Person Name");
      return false;
    }
    var array = {
      'empEventContactId': 0,
      'contacPersionName': userdata.name,
      'email': userdata.email,
      'mobile': userdata.mobile,
      'designation': userdata.designation
    }
    this.userdata.push(array);
    this.UserForm.reset();
    this.ShowuserDetail = 1;
    this.modalRef.hide();
  }

  USERDATA: any = [];
  userdata: any = [];
  ShowuserDetail: any = 0;
  data: any = [];
  getUserDetail(userid) {
    this.RojggarMelaService.GetUserData(userid).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce.lstGetUserDetail != null) {
        this.ShowuserDetail = 1;
        this.USERDATA = {
          'empEventContactId': 0,
          'contacPersionName': this.DBResponce.lstGetUserDetail[0].name,
          'email': this.DBResponce.lstGetUserDetail[0].email,
          'mobile': this.DBResponce.lstGetUserDetail[0].mobile,
          'designation': this.DBResponce.lstGetUserDetail[0].designation,
        }
        this.userdata.push(this.USERDATA);
      }
      else {
        this.userdata = [];
      }
    });
  }

  onChangeState(statename: any) {
    this.GetAllDistrict(statename);
  }

  ResetEventsList() {
    this.FilterEventForm.reset();
    this.EventsList(this.FilterEventForm, 0, '');
  }

  DBResponce: any = [];
  EventList: any = [];
  pagenumber: any = 0;
  from: any = '';
  EventRS: any;
  BackData: any;
  EventsList(formvalue, pagenumber, from) {
    //var eventFlag = 'CURRENT';
    this.BackData = formvalue;
    var eventFlag = 'ALL';
    if (formvalue.stateId != undefined && formvalue.stateId) {
      var stateId = formvalue.stateId;
    } else {
      stateId = 0;
    }
    if (formvalue.districtId != undefined && formvalue.districtId) {
      var districtId = formvalue.districtId;
    } else {
      districtId = 0;
    }
    if (formvalue.EvenType != undefined && formvalue.EvenType) {
      var EvenType = formvalue.EvenType;
    } else {
      EvenType = 0;
    }
    if (formvalue.Search != undefined && formvalue.Search) {
      var Search = formvalue.Search;
    } else {
      Search = '';
    }
    if (formvalue.filterstartDate != undefined && formvalue.filterstartDate) {
      var filterstartDate = formvalue.filterstartDate;
    } else {
      filterstartDate = null;
    }
    if (formvalue.filterendDate != undefined && formvalue.filterendDate) {
      var filterendDate = formvalue.filterendDate;
    } else {
      filterendDate = null;
    }
    this.pagenumber = pagenumber;

    //  Rajeev
    if (formvalue.EventRS != undefined && formvalue.EventRS == "All") {
      this.EventRS = 0;
    }
    else if (formvalue.EventRS != undefined && formvalue.EventRS == "Registered") {
      this.EventRS = 1;
    }
    else if (formvalue.EventRS != undefined && formvalue.EventRS == "Pending") {
      this.EventRS = 2;
    }
    else {
      this.EventRS = 0;
    }
    // Rajeev
    var sendata = {
      'eventFlag': eventFlag,
      // 'stateId': stateId,
      // 'districtId': districtId,
      // 'eventType': EvenType,
      // 'searchKey': Search,
      // 'startDate': filterstartDate,
      // 'endDate': filterendDate,
      // 'pagenumber': this.pagenumber,
      // 'REGISTRATIONSTATUS': this.EventRS

      // "eventFlag":this.FilterEventForm.value.EvenType != 'undifined'&& this.FilterEventForm.value.EvenType != ''&& this.FilterEventForm.value.EvenType !=null ? this.FilterEventForm.value.EvenType : "",
      "stateId": this.FilterEventForm.value.stateId != 'undifined' && this.FilterEventForm.value.stateId != '' && this.FilterEventForm.value.stateId != null ? this.FilterEventForm.value.stateId : 0,
      "districtId": this.FilterEventForm.value.districtId != 'undifined' && this.FilterEventForm.value.districtId != '' && this.FilterEventForm.value.districtId != null ? this.FilterEventForm.value.districtId : 0,
      "eventType": this.FilterEventForm.value.EvenType != 'undifined' && this.FilterEventForm.value.EvenType != '' && this.FilterEventForm.value.EvenType != null ? this.FilterEventForm.value.EvenType : 0,
      "searchKey": this.FilterEventForm.value.Search != 'undifined' && this.FilterEventForm.value.Search != '' && this.FilterEventForm.value.Search != null ? this.FilterEventForm.value.Search : "",
      "startDate": this.FilterEventForm.value.filterstartDate != 'undifined' && this.FilterEventForm.value.filterstartDate != '' && this.FilterEventForm.value.filterstartDate != null ? this.FilterEventForm.value.filterstartDate : null,
      "endDate": this.FilterEventForm.value.filterendDate != 'undifined' && this.FilterEventForm.value.filterendDate != '' && this.FilterEventForm.value.filterendDate != null ? this.FilterEventForm.value.filterendDate : null,
      "pagenumber": this.pagenumber,
      "REGISTRATIONSTATUS": 0
    }
    this.AdminId = localStorage.getItem('phpadminid');
    this.AdminId = parseInt(JSON.parse(this.AdminId));
    this.spinnerService.show();
    this.from = from;
    if (this.from == 'scroll') {
      this.RojggarMelaService.GetEventsForEmployer(sendata).subscribe(res => {
        this.DBResponce = res;
        this.spinnerService.hide();
        if (this.DBResponce.lstRojgaarEventList != null) {
          this.EventList = this.EventList.concat(this.DBResponce.lstRojgaarEventList);
          this.from = 'scroll';
        } else {
          this.from = '';
        }
        this.delay = false;
      });
    } else {
      this.RojggarMelaService.GetEventsForEmployer(sendata).subscribe(res => {
        this.DBResponce = res;
        this.spinnerService.hide();
        if (this.DBResponce.lstRojgaarEventList != null) {
          this.EventList = this.DBResponce.lstRojgaarEventList;
          this.from = '';
        }
        else {
          this.from = '';
        }
        this.delay = false;
        this.EventListStatus = true;
      });
    }
  }

  EventDetails: any = 0;
  EventViewData: any = [];
  EventId: any;
  employerevent: any = [];
  norecord: boolean = false;
  gGetEventDetail(eventid, eventdata) {
    if (eventdata != 'Filter') {
      if (eventdata.stateId != "" && eventdata.stateId != null) {
        var stateId = eventdata.stateId;
      } else {
        stateId = 0;
      }
      if (eventdata.districtId != "" && eventdata.districtId != null) {
        var districtId = eventdata.districtId;
      } else {
        districtId = 0;
      }
      var senddata = {
        'eventId': eventid,
        'stateId': stateId,
        'districtId': districtId,
        'search': eventdata.Search
      }
    }

    else {
      senddata = {
        'eventId': eventid,
        'stateId': 0,
        'districtId': 0,
        'search': ''
      }
    }

    this.ApplyFilterShow = 1;
    this.EventListStatus = false;
    this.EventId = eventid;
    this.EventDetails = 1;
    this.ListOfEvent = 0;
    this.EmployerRegister = 0;
    this.EmployerRegistrationForm.reset();
    this.userdata = [];
    this.CompanyData = [];
    this.newAttributeShow = [];
    this.allusers = [];
    this.district = [];
    this.array = [];
    this.array2 = [];

    this.userdata = [];
    this.lstEventJob = [];
    this.DataSend = [];
    this.lstEventJobDetails = [];
    this.FilterEventEmployerForm.controls['stateId'].setValue('');
    this.spinnerService.show();
    this.EventService.GetEventDetailIdWise(this.AdminId, eventid).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.adminGetEventDetailIdWise.length > 0) {
        this.EventViewData = this.Dbresponse.adminGetEventDetailIdWise[0];
        this.RojggarMelaService.EmployerEventList(senddata).subscribe(res => {
          this.DBResponce = res;
          if (this.DBResponce.lstGetEventEmployerList.length > 0) {
            this.norecord = false;
            this.employerevent = this.DBResponce.lstGetEventEmployerList;
            this.spinnerService.hide();
          }
          else {
            if (stateId || districtId || eventdata.Search) {
              this.norecord = true;
            }

            this.employerevent = [];
            this.spinnerService.hide();
          }
        });
      }
      else {
        this.spinnerService.hide();
        this.EventViewData = [];
      }
    });
  }
  ResetEmployee(eventid) {
    this.FilterEventEmployerForm.controls['stateId'].setValue('');
    this.FilterEventEmployerForm.controls['districtId'].setValue('');
    this.FilterEventEmployerForm.controls['Search'].setValue('');
    this.gGetEventDetail(eventid, 0);
  }

  BackToEventList() {
    this.EventListStatus = true;
    this.EventDetails = 0;
    this.ListOfEvent = 1;
    this.ApplyFilterShow = 1;
    this.EventsList(this.BackData, 0, '');
  }

  age: any = [];
  employerlist: any = [];
  EmployerRegistration(eventid, EventViewData) {
    this.imagepath = '';
    this.Image = '';
    this.imageext = '';
    this.base64textString = [];
    this.GetAllStates();
    this.GetMinEducation();
    // ContactDetail
    this.EmployerRegistrationForm.controls["ContactDetail"].setValue("");
    this.EmployerRegistrationForm.controls["age"].setValue("");
    this.EmployerRegistrationForm.controls["states"].setValue("");
    this.EmployerRegistrationForm.controls["District"].setValue("");
    this.EmployerRegistrationForm.controls["EmployerList"].setValue("");
    var j = 0;
    var h = 16;
    for (h; h <= 50; h++) {
      this.age[j] = h;
      j++;
    }
    this.RojggarMelaService.GetEmployerList(this.AdminId).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce.lstGetActiveCompanyList != null) {
        this.employerlist = this.DBResponce.lstGetActiveCompanyList;
      }
      else {
        this.employerlist = [];
      }
    });
    this.ListOfEvent = 0;
    this.EventDetails = 0;
    this.EmployerRegister = 1;
  }

  mineducation: any = [];
  private GetMinEducation() {
    try {
      this.masterService.GetAllMinEducation().subscribe(res => {
        this.mineducation = res;

        if (this.mineducation != null && this.mineducation.length > 0) {
          this.mineducation = this.mineducation;
        }
      });
    } catch  { }
  }

  SalaryDetail: any = 0;
  BackToEvent() {
    this.EmployerRegister = 0;
    this.EventDetails = 1;
    this.JobDetails = 0;
    this.district = [];
    // this.mineducation=[];
    this.allusers = [];
    this.ShowuserDetail = 0;
    this.CompanyData = [];
    this.userdata = [];
    this.array = [];
    this.DataSend = [];
    this.lstEventJobDetails = [];
    this.SalaryDetail = 0;
    this.EmployerRegistrationForm.reset();
  }


  ////////////////// Add Job Detail   //////////
  lstEventJobDetails: any = [];
  lstEventJob: any = [];
  array: any = [];
  array2: any = [];
  newAttributeShow: any = [];
  AddOpenings(data) {
    if (data.JobTitle == "" || data.JobTitle == null || data.JobTitle == undefined) {
      this.toastrService.error('Please add job title');
      return false;
    }

    if (data.MinCtc == 0 || data.MinCtc == null || data.MinCtc == "") {
      this.toastrService.error('Please Select Min CTC');
      return false;
    }
    if (data.MaxCtc == 0 || data.MaxCtc == null || data.MaxCtc == "") {
      this.toastrService.error('Please Select Max CTC');
      return false;
    }
    if (data.minSalaryPerMonth == 0 || data.minSalaryPerMonth == null || data.minSalaryPerMonth == "") {
      this.toastrService.error('Please Select min Salary');
      return false;
    }
    if (data.maxSalaryPerMonth == 0 || data.maxSalaryPerMonth == null || data.maxSalaryPerMonth == "") {
      this.toastrService.error('Please Select max Salary');
      return false;
    }
    if (data.Opening == 0 || data.Opening == null || data.Opening == "") {
      this.toastrService.error('Please Select No. of Opening');
      return false;
    }
    if (data.states == '') {
      this.toastrService.error('Please Select State');
      return false;
    }
    if (data.District == '') {
      this.toastrService.error('Please Select District');
      return false;
    }
    if (parseInt(data.MinCtc) > parseInt(data.MaxCtc)) {
      this.toastrService.error('Min CTC must be less than Max CTC');
      return false;
    }
    if (parseInt(data.MinCtc) < parseInt(data.minSalaryPerMonth)) {
      this.toastrService.error('Min In Hand Salary is not be greater than Min CTC');
      return false;
    }
    if (parseInt(data.maxSalaryPerMonth) > parseInt(data.MaxCtc)) {
      this.toastrService.error('Max In Hand Salary is not be greater than Max CTC');
      return false;
    }
    if (parseInt(data.maxSalaryPerMonth) < parseInt(data.minSalaryPerMonth)) {
      this.toastrService.error('Max In Hand Salary Per Month must be greter than Min In Hand Salary Per Month');
      return false;
    }



    // this.array = {
    //   'adminId': this.AdminId,
    //   'eventId': this.EventId,
    //   'employerId': this.companyid,
    //   'jobTitle': data.JobTitle,
    //   'jobDescription': "",
    //   'minExp': "",
    //   'maxExp': "",
    //   'ageMin': data.age,
    //   'ageMax': 0,
    //   'otherDetail': "",
    //   'createdBy': this.AdminId,
    //   'minEducation': data.MinQualification,
    //   'sourceId': this.AdminId,
    //   'source': "Admin",
    //   'heightFeet': data.heightFeet,
    //   'heightInch': data.heightInch,
    //   'weight': data.Weight,
    //   'eduSpecialization': "",
    //   'minCtcMonth': data.MinCtc,
    //   'maxCtcMonth': data.MaxCtc,
    //   'handsonSalary': data.minSalaryPerMonth,
    //   'maxhandsonSalary': data.maxSalaryPerMonth,
    //   'noOfVacancy': data.Opening,
    //   'stateId': data.states,
    //   'districtId': data.District
    // }

    this.array2 = {
      'eventId': this.EventId,
      'employerId': this.companyid,
      'stateId': data.states,
      'districtId': data.District,
      'noOfVacancy': data.Opening,
      'minCtcMonth': data.MinCtc,
      'maxCtcMonth': data.MaxCtc,
      'otherDetail': "",
      // 'createdBy': this.AdminId,
      'handsonSalary': data.minSalaryPerMonth,
      'maxhandsonSalary': data.maxSalaryPerMonth,
      'eventJobOpngId': 0,
    }

    let statedid;
    let districtid;
    statedid = this.EmployerRegistrationForm.value.states;
    districtid = this.EmployerRegistrationForm.value.District;
    let statename = (this.States).filter(function (entry) {
      return entry.ID == statedid;
    });
    let districtname = (this.district).filter(function (entry) {
      return entry.ID == districtid;
    });
    this.newAttributeShow.push({
      "statename": statename[0]['STATENAME'] = '' ? '' : statename[0]['STATENAME'],
      "districtname": districtname == '' ? '' : districtname[0]['DISTRICTNAME'],
      "noOfVacancy": data.Opening,
      "minCtcMonth": data.MinCtc,
      'maxCtcMonth': data.MaxCtc,
      'minCtcInHand': data.minSalaryPerMonth,
      'maxCtcInHand': data.maxSalaryPerMonth
    });

    this.lstEventJobDetails.push(this.array2);
    this.EmployerRegistrationForm.controls["MinCtc"].setValue("");
    this.EmployerRegistrationForm.controls.MaxCtc.setValue("");
    this.EmployerRegistrationForm.controls.minSalaryPerMonth.setValue("");
    this.EmployerRegistrationForm.controls.maxSalaryPerMonth.setValue("");
    this.EmployerRegistrationForm.controls.Opening.setValue('');
    this.EmployerRegistrationForm.controls.states.setValue('');
    this.EmployerRegistrationForm.controls.District.setValue('');
    this.CtcOptions = {
      floor: 0,
      ceil: 250000,
      step: 1
    };
    this.district = [];
    this.SalaryDetail = 1;
  }

  DataSend: any = [];
  ////////////////////// For data save  //////////////
  CountRegistrationEmployer: number = 1;
  RegistrationEmployer(data: any) {
    if (data.Opening != null && data.Opening != '' && data.Opening != undefined) {
      if (data.JobTitle == null || data.JobTitle == '' || data.JobTitle == undefined) {
        this.toastrService.error("Please enter job title");
        return false;
      }

      if (data.MinCtc == null || data.MinCtc == '' || data.MinCtc == undefined) {
        this.toastrService.error('Please enter min ctc');
        return false;
      }
      if (data.MaxCtc == null || data.MaxCtc == '' || data.MaxCtc == undefined) {
        this.toastrService.error('Please enter max ctc');
        return false;
      }

      if (data.minSalaryPerMonth == null || data.minSalaryPerMonth == '' || data.minSalaryPerMonth == undefined) {
        this.toastrService.error('Please enter min salary');
        return false;
      }
      if (data.maxSalaryPerMonth == null || data.maxSalaryPerMonth == '' || data.maxSalaryPerMonth == undefined) {
        this.toastrService.error('Please enter max salary');
        return false;
      }

      if (data.states == null || data.states == '' || data.states == undefined) {
        this.toastrService.error('Please select state');
        return false;
      }

      if (data.District == null || data.District == '' || data.District == undefined) {
        this.toastrService.error('Please select district');
        return false;
      }
      if (this.lstEventJob.length == 0) {
        this.toastrService.error("Please click on add openings button");
        return false;
      }




    }


    this.CountRegistrationEmployer = 1;
    // if (data.JobTitle == '') {
    //   this.toastrService.error("Please Add Job Title");
    //   return false;
    // }
    this.spinnerService.show();
    for (let i = 0; i < this.lstEventJobDetails.length; i++) {
      this.DataSend[i] = this.lstEventJobDetails[i];
    }
    // this.array = {
    //   'adminId': this.AdminId,
    //   'eventId': this.EventId,
    //   'employerId': this.companyid,
    //   'jobTitle': data.JobTitle,
    //   'jobDescription': "",
    //   'minExp': "",
    //   'maxExp': "",
    //   'ageMin': data.age,
    //   'ageMax': 0,
    //   'otherDetail': "",
    //   'createdBy': this.AdminId,
    //   'minEducation': data.MinQualification,
    //   'sourceId': this.AdminId,
    //   'source': "Admin",
    //   'heightFeet': data.heightFeet,
    //   'heightInch': data.heightInch,
    //   'weight': data.Weight,
    //   'eduSpecialization': "",
    //   'minCtcMonth': data.MinCtc,
    //   'maxCtcMonth': data.MaxCtc,
    //   'handsonSalary': data.minSalaryPerMonth,
    //   'maxhandsonSalary': data.maxSalaryPerMonth,
    //   'noOfVacancy': data.Opening,
    //   'stateId': data.states,
    //   'districtId': data.District
    // }
    this.array = {
      // 'adminId': data.JobTitle!="" && data.JobTitle!=null && data.JobTitle!=undefined? this.AdminId:0,
      // 'eventId': data.JobTitle!="" && data.JobTitle!=null && data.JobTitle!=undefined?this.EventId:0,
      // 'employerId': data.JobTitle!="" && data.JobTitle!=null && data.JobTitle!=undefined?this.companyid:0,

      'jobTitle': data.JobTitle != "" && data.JobTitle != null && data.JobTitle != undefined ? data.JobTitle : "",
      'jobDescription': "",
      'minExp': "",
      'maxExp': "",
      'ageMin': data.age != "" && data.age != null && data.age != undefined ? data.age : "",
      'ageMax': "0",
      'otherDetail': "",
      'minEducation': data.MinQualification != "" && data.MinQualification != null && data.MinQualification != undefined ? data.MinQualification : 0,
      'sourceId': data.JobTitle != "" && data.JobTitle != null && data.JobTitle != undefined ? this.AdminId : 0,
      'source': data.JobTitle != "" && data.JobTitle != null && data.JobTitle != undefined ? "Admin" : "",
      'heightFeet': data.heightFeet != "" && data.heightFeet != null && data.heightFeet != undefined ? data.heightFeet : 0,
      'heightInch': data.heightInch != "" && data.heightInch != null && data.heightInch != undefined ? data.heightInch : 0,
      'weight': data.Weight != "" && data.Weight != null && data.Weight != undefined ? data.Weight : 0,
      'eduSpecialization': "",

      'createdBy': data.JobTitle != "" && data.JobTitle != null && data.JobTitle != undefined ? this.AdminId : 0,

      'eventJobId': 0
      // 'minCtcMonth': data.MinCtc,
      // 'maxCtcMonth': data.MaxCtc,
      // 'handsonSalary': data.minSalaryPerMonth,
      // 'maxhandsonSalary': data.maxSalaryPerMonth,
      // 'noOfVacancy': data.Opening,
      // 'stateId': data.states,
      // 'districtId': data.District
    }
    this.lstEventJob.push(this.array);
    var senddata = {
      'eventId': this.EventId,
      'employerId': parseInt(data.EmployerList),
      'createdBy': this.AdminId,
      'eventImagePath': this.imagepath,
      'eventImageName': this.Image,
      'eventImageext': this.imageext,
      'lstEventContactDetail': this.userdata,
      'lstEventJob': this.lstEventJob,
      'lstEventJobDetails': this.DataSend
    }
    if (this.CountRegistrationEmployer == 1) {
      this.spinnerService.show();
      this.RojggarMelaService.SetEmployerData(senddata).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce != null) {
          //this.spinnerService.hide();
          this.toastrService.success("Employer has been Registerd successfully")
        }
        else {
          this.DBResponce = [];
          this.spinnerService.hide();
        }
        this.gGetEventDetail(this.EventId, 0);
        // if (this.DBResponce.lstGetActiveCompanyList != null) {
        //   this.employerlist = this.DBResponce.lstGetActiveCompanyList;

        //   // array blank
        //   // this.userdata = [];
        //   // this.lstEventJob = [];
        //   // this.DataSend = [];
        //   // this.lstEventJobDetails = [];
        //   this.spinnerService.hide();
        // }
        // else {
        //   this.employerlist = [];
        //   this.spinnerService.hide();
        // }
      });
    }
    this.CountRegistrationEmployer++;
  }

  img: any;
  imgGstName: any;
  imgPanName: any;
  currentFile: any;
  base64textString: any = [];
  ValidImageTypes: any;
  imagename: string = '';
  imagepath: string = '';
  iamgeext: string = '';
  imagetypests: boolean = false;
  imagesizests: boolean = false;
  temp: boolean = false;
  imgSrc: any = '';
  onUploadChange(evt: any) {
    this.imgSrc = '';
    this.base64textString = [];
    this.imagetypests = false;
    this.imagesizests = false;
    var file: File = evt.target.files[0];
    var filedetails = file.name.split('.')
    this.imagename = filedetails[0];
    this.iamgeext = filedetails[1];
    this.currentFile = file;
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(this.iamgeext, ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.EmployerRegistrationForm.controls['profile_pic'].setValue('');
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
    });
    const hex = bytes.join('').toUpperCase();
    var fileType = this.getMimetype(hex);

    if ($.inArray(fileType, this.ValidImageTypes) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");

      this.EmployerRegistrationForm.controls.profile_pic.setValue('');
      this.imagetypests = false;
      return false
    } else {
      var reader = new FileReader();
      this.imagetypests = true;
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        this.EmployerRegistrationForm.controls.profile_pic.setValue('');
        this.imagesizests = false;
        return false;
      } else {
        this.imagesizests = true;
      }
      reader.onloadend = this.handleReaderLoaded.bind(this);
      var data = reader.readAsBinaryString(this.currentFile);
    }
  }

  mimeimage: any;
  imageext: any;
  Image: any;
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    var imn2 = imn.split('.');
    this.imageext = '.' + imn2[1];
    this.Image = imn2[0];
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    for (var i = 0; i < this.base64textString.length; i++) {
      this.imagepath = '';
      this.imagepath = this.base64textString[i];
      this.temp = true;
    }
  }

  getMimetype(signature) {
    switch (signature) {
      case '89504E47':
        return 'image/png'
      case 'FFD8FFE0':
        return 'image/jpeg'
      default:
        return 'Unknown filetype'
    }
  }
  ////////////// Employer registration end here     //////////////




  ////////////  Job Detail Start here  ////////////
  JobDetails: any = 0;
  joblist: any = [];
  employerdata: any = [];
  employerid: any;
  contactdetaillist: any = [];
  GetEmployerJobList(eventId, employerId, data) {
    var companyId = data.employerId;
    this.employerid = employerId;
    this.employerdata = data;
    this.JobDetails = 1;
    this.EventDetails = 0;
    this.spinnerService.show();
    this.RojggarMelaService.GetEmployerJobList(eventId, employerId).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce.lstGetEventEmployerJobList.length > 0) {
        this.joblist = this.DBResponce.lstGetEventEmployerJobList;
        //new add for contact details list card

        // this.RojggarMelaService.Getcontactdetaillist(companyId,this.EventId).subscribe(res => {
        //           let userresponse1 = res;
        //           this.contactdetaillist = userresponse1['lstAdminEventdContactDetailList'];
        //         });
        //new add for contact details list card
        this.spinnerService.hide();
      }
      else {
        this.joblist = [];
        this.spinnerService.hide();
      }
    });
    //new add for contact details list card

    this.RojggarMelaService.Getcontactdetaillist(companyId, this.EventId).subscribe(res => {
      let userresponse1 = res;
      this.contactdetaillist = userresponse1['lstAdminEventdContactDetailList'];
    });
    //new add for contact details list card
  }

  jobdetail: any = [];
  EmployerJobDetail: any = 0;
  jobid: any;
  GetEmployerJobDetail(jobid, item) {
    this.jobid = jobid;
    this.EmployerJobDetail = 1;
    this.JobDetails = 0;
    this.spinnerService.show();
    this.RojggarMelaService.GetEmployerJobDetails(jobid, this.employerid, this.EventId).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce.lstGetEventEmployerJobList.length > 0) {
        this.jobdetail = this.DBResponce.lstGetEventEmployerJobList;
        this.spinnerService.hide();
      }
      else {
        this.jobdetail = [];
        this.spinnerService.hide();
      }
    });
  }

  BackToJobList() {
    this.JobDetails = 1;
    this.EmployerJobDetail = 0;
  }

  modalRefForCompny: BsModalRef;
  CompanyDataPopUp: any = [];
  DbResponceByCompId: any = [];
  companydetailsPopUp: any = [];
  CountGetCompanyDetail: number = 1;
  GetCompanyDetail(companyDetail: TemplateRef<any>) {
    this.CountGetCompanyDetail = 1;
    if (this.CountGetCompanyDetail == 1) {
      this.spinnerService.show();
      this.RojggarMelaService.GetCompanyData(this.employerid).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponceByCompId = res;
        if (this.DbResponceByCompId.lstCompanyProfile != null) {
          this.companydetailsPopUp = this.DbResponceByCompId.lstCompanyProfile;
          this.CompanyDataPopUp = this.companydetailsPopUp[0];
          this.modalRefForCompny = this.modalService.show(companyDetail,
            { backdrop: 'static', keyboard: false, class: 'modal-lg' });
        } else {
          this.spinnerService.hide();
          this.CompanyDataPopUp = [];
          this.companydetailsPopUp = [];
        }
      });
    }
    this.CountGetCompanyDetail++;
  }

  EventDetailPopUp: any = [];
  EventDataPopUp: any = [];
  modalRefForEvent: BsModalRef;
  CountViewEventDetail: number = 1;
  ViewEventDetail(EventDetail: TemplateRef<any>) {
    // this.CountViewEventDetail = 1;
    if (this.CountViewEventDetail == 1) {
      this.spinnerService.show();
      this.RojggarMelaService.GetEventDetail(this.AdminId, this.EventId).subscribe(res => {
        this.spinnerService.hide();
        this.DbResponceByCompId = res;
        if (this.DbResponceByCompId.adminGetEventDetailIdWise.length > 0) {
          this.EventDetailPopUp = this.DbResponceByCompId.adminGetEventDetailIdWise;
          this.EventDataPopUp = this.EventDetailPopUp[0];
          this.modalRefForEvent = this.modalService.show(EventDetail,
            { backdrop: 'static', keyboard: false, class: 'modal-lg' });
        } else {
          this.spinnerService.hide();
          this.EventDataPopUp = [];
          this.EventDetailPopUp = [];
        }
      });
    }
    this.CountViewEventDetail++;
  }

  countreset() {
    this.modalRefForEvent.hide();
    this.CountViewEventDetail = 1;
  }

  OpeningModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm', backdrop: 'static' });
  }

  declineModel(): void {
    this.modalRef.hide();
  }

  JobData: any;
  EditJobs(template: TemplateRef<any>, jobs) {
    var j = 0;
    var h = 16;
    for (h; h <= 50; h++) {
      this.age[j] = h;
      j++;
    }
    this.JobData = jobs;
    let Mineducationid;
    Mineducationid = jobs.minEducation;
    let mineducation = (this.mineducation).filter(function (entry) {
      return entry.id == Mineducationid;
    });
    this.JobUpdateForm.controls['JobTitle'].setValue(jobs.jobTitle);
    // this.JobUpdateForm.controls['MinQualification'].setValue(mineducation[0]['id']);
    if (jobs.minEducation != 0) {
      this.JobUpdateForm.controls['MinQualification'].setValue(mineducation[0]['id']);
    }
    this.JobUpdateForm.controls['Weight'].setValue(jobs.weight);
    this.JobUpdateForm.controls['heightFeet'].setValue(jobs.heightFeet);
    this.JobUpdateForm.controls['heightInch'].setValue(jobs.heightInch);
    this.JobUpdateForm.controls['age'].setValue(jobs.ageMin);

    this.modalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static' });
  }

  UpdateJob(data) {
    if (data.JobTitle == "") {
      this.toastrService.error("Please enter job title");
      return false;
    }
    var dataupdate = {
      'adminId': this.AdminId,
      'eventId': this.EventId,
      'employerId': this.employerid,
      'eventJobId': this.JobData.eventJobId,
      'jobTitle': data.JobTitle,
      'jobDescription': '',
      'minExp': '',
      'maxExp': '',
      'ageMin': data.age,
      'ageMax': 0,
      'otherDetail': '',
      'createdBy': this.AdminId,
      'minEducation': data.MinQualification,
      'sourceId': this.AdminId,
      'source': 'Admin',
      'heightFeet': data.heightFeet,
      'heightInch': data.heightInch,
      'weight': data.Weight,
      'eduSpecialization': '',
      'minCtcMonth': 0,
      'maxCtcMonth': 0,
      'handsonSalary': 0,
      'maxhandsonSalary': 0,
      'noOfVacancy': 0,
      'stateId': 0,
      'districtId': 0
    }

    this.spinnerService.show();
    this.RojggarMelaService.UpdateJob(dataupdate).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.responseResult == true) {
        this.toastrService.success(this.Dbresponse.message);
        this.GetEmployerJobDetail(this.jobid, '');
        this.modalRef.hide();
      }
      else {
        this.toastrService.error(this.Dbresponse.message);
        this.spinnerService.hide();
        this.modalRef.hide();
      }
    });
  }

  AddContactPerson(template: TemplateRef<any>, jobs) {
    this.ContactPersonForm.reset();
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  UpdateContactPerson(template: TemplateRef<any>, data) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.ContactPersonForm.controls['empEventContactId'].setValue(data.contactId);
    this.ContactPersonForm.controls['contacPersionName'].setValue(data.contacPersionName);
    this.ContactPersonForm.controls['email'].setValue(data.email);
    this.ContactPersonForm.controls['mobile'].setValue(data.mobile);
    this.ContactPersonForm.controls['designation'].setValue(data.designation);
  }

  AddOpeningForJob(template: TemplateRef<any>, data) {
    this.CountSaveOpenings = 1;
    this.OpeningForm.reset();
    this.OpeningForm.controls.states.setValue("");
    this.OpeningForm.controls.District.setValue("");
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  EditOpeningForJob(template: TemplateRef<any>, data) {
    this.CountSaveOpenings = 1;
    this.GetAllDistrict(data.stateId);
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.OpeningForm.controls.eventJobOpngId.setValue(data.eventJobOpngId);
    this.OpeningForm.controls.Opening.setValue(data.noOfVacancy);
    this.OpeningForm.controls.MinCtc.setValue(data.minCtcMonth);
    this.OpeningForm.controls.MaxCtc.setValue(data.maxCtcMonth);
    this.OpeningForm.controls.minSalaryPerMonth.setValue(data.handsonSalary);
    this.OpeningForm.controls.maxSalaryPerMonth.setValue(data.maxhandsonSalary);
    this.OpeningForm.controls.states.setValue(data.stateId);
    this.OpeningForm.controls.District.setValue(data.districtId);
  }

  DeletOpeningJob(data) {
    var senddata = {
      'adminId': this.AdminId,
      'eventJobOpngId': data.eventJobOpngId,
      'eventId': this.EventId
    }
    this.spinnerService.show();
    this.RojggarMelaService.DeleteOpenings(senddata).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.responseResult == true) {
        this.toastrService.success(this.Dbresponse.message);
        this.GetEmployerJobDetail(this.jobid, '');
        this.modalRef.hide();
      }
      else {
        this.toastrService.error(this.Dbresponse.message);
        this.spinnerService.hide();
        this.modalRef.hide();
      }
    });
  }

  DeleteContactPerson(data, totalData) {
    var senddata = {
      'adminId': this.AdminId,
      'contactId': data.contactId,
      'eventId': this.EventId
    }
    if (totalData.length <= 1) {
      this.toastrService.error(" Minimum One Contact Person Details is Required");
      this.modalRef.hide();
      return false;
    }
    this.spinnerService.show();
    this.RojggarMelaService.DeleteContactPerson(senddata).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.responseResult == true) {
        this.toastrService.success(this.Dbresponse.message);
        this.GetEmployerJobDetail(this.jobid, '');
        this.modalRef.hide();
      }
      else {
        this.toastrService.error(this.Dbresponse.message);
        this.spinnerService.hide();
        this.modalRef.hide();
      }
    });
  }

  ////////////////// Job Detail  End Here ///////////////

  eventidvc: any;
  EventDetailsvc: any = 0;
  getcandidateres: any = [];
  getcandidatereslist: any = [];
  GetEventDetail(eventidvc, eventdata) {//Use to  get event Details of Registred Candidate (Rajeev Jha-1174)
    this.eventidvc = eventidvc;
    this.EventDetailsvc = 1;
    this.ListOfEvent = 0;
    this.showCandidateTable = true;
    this.spinnerService.show();
    this.RojggarMelaService.GetEventDetail(this.AdminId, eventidvc).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.adminGetEventDetailIdWise != null) {
        this.EventViewData = this.Dbresponse.adminGetEventDetailIdWise[0];
      }
      else {
        this.EventViewData = [];
      }
      this.RojggarMelaService.GetCandidateDetail(eventidvc).subscribe(res => {
        this.getcandidateres = res;
        if (this.getcandidateres.lstGetEventRegistrationCandidate != null) {
          this.getcandidatereslist = this.getcandidateres.lstGetEventRegistrationCandidate;
        }
        else {
          this.EventViewData = [];
        }
      })
      this.spinnerService.hide();
    });
  }

  BackToEventListvc() {
    this.EventDetailsvc = 0;
    this.ListOfEvent = 1;
  }

  showCandidateTable: boolean = false;
  canddetail: any = [];
  viewcandidatedetailpopup(template: TemplateRef<any>, item: any) {
    this.canddetail = item;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  CountSaveContactPerson: number = 1;

  SaveContactPerson(data) {
    this.CountSaveContactPerson = 1;
    if (data.contacPersionName == '') {
      this.toastrService.error("Please add Contact Person Name");
      return false;
    }
    var senddata = {
      'adminId': this.AdminId,
      'eventId': this.EventId,
      'employerId': this.employerid,
      'createdBy': this.AdminId,
      'empEventRegId': 0,
      'jobId': this.jobid,
      'empEventContactId': data.empEventContactId != null ? data.empEventContactId : 0,
      'contacPersionName': data.contacPersionName,
      'designation': data.designation,
      'email': data.email,
      'mobile': data.mobile,
    }
    var pushsenddata = [];
    pushsenddata.push(senddata);
    if (this.CountSaveContactPerson == 1) {
      this.spinnerService.show();
      this.RojggarMelaService.AddUpdateContactPerson(pushsenddata).subscribe(res => {
        this.Dbresponse = res;
        if (this.Dbresponse.responseResult == true) {
          this.toastrService.success(this.Dbresponse.message);
          this.GetEmployerJobDetail(this.jobid, '');
          this.modalRef.hide();
        }
        else {
          this.toastrService.error(this.Dbresponse.message);
          this.spinnerService.hide();
          this.modalRef.hide();
        }
      });
    }
    this.CountSaveContactPerson++;
  }

  CountSaveOpenings: number = 1;

  SaveOpenings(formvalue) {
    //this.CountSaveOpenings = 1;
    if (formvalue.MinCtc == 0 || formvalue.MinCtc == null || formvalue.MinCtc == "") {
      this.toastrService.error('Please enter min ctc');
      return false;
    }
    if (formvalue.MaxCtc == 0 || formvalue.MaxCtc == null || formvalue.MaxCtc == "") {
      this.toastrService.error('Please select max ctc');
      return false;
    }
    if (formvalue.minSalaryPerMonth == 0 || formvalue.minSalaryPerMonth == null || formvalue.minSalaryPerMonth == "") {
      this.toastrService.error('Please select min salary');
      return false;
    }
    if (formvalue.maxSalaryPerMonth == 0 || formvalue.maxSalaryPerMonth == null || formvalue.maxSalaryPerMonth == "") {
      this.toastrService.error('Please select max salary');
      return false;
    }
    if (formvalue.Opening == 0 || formvalue.Opening == null || formvalue.Opening == "") {
      this.toastrService.error('Please select no. of opening');
      return false;
    }
    if (formvalue.states == 0 || formvalue.states == null || formvalue.states == "") {
      this.toastrService.error('Please select state');
      return false;
    }
    if (formvalue.District == 0 || formvalue.District == null || formvalue.District == "") {
      this.toastrService.error('Please select district');
      return false;
    }
    if (parseInt(formvalue.MinCtc) > parseInt(formvalue.MaxCtc)) {
      this.toastrService.error('Min ctc must be less than max ctc');
      return false;
    }
    if (parseInt(formvalue.MinCtc) < parseInt(formvalue.minSalaryPerMonth)) {
      this.toastrService.error('Min In Hand Salary is not be greater than Min CTC');
      return false;
    }
    if (parseInt(formvalue.maxSalaryPerMonth) > parseInt(formvalue.MaxCtc)) {
      this.toastrService.error('Max In Hand Salary is not be greater than Max CTC');
      return false;
    }
    if (parseInt(formvalue.maxSalaryPerMonth) < parseInt(formvalue.minSalaryPerMonth)) {
      this.toastrService.error('Max In Hand Salary Per Month must be greter than Min In Hand Salary Per Month');
      return false;
    }
    var senddata = {
      'adminId': this.AdminId,
      'eventId': this.EventId,
      'employerId': this.employerid,
      'eventJobId': this.jobid,
      'stateId': formvalue.states,
      'districtId': formvalue.District,
      'noOfVacancy': formvalue.Opening,
      'minCtcMonth': formvalue.MinCtc,
      'maxCtcMonth': formvalue.MaxCtc,
      'otherDetail': "",
      'createdBy': this.AdminId,
      'handsonSalary': formvalue.minSalaryPerMonth,
      'maxhandsonSalary': formvalue.maxSalaryPerMonth,
      'eventJobOpngId': formvalue.eventJobOpngId != null ? formvalue.eventJobOpngId : 0,
    }
    var pushsenddata = [];
    pushsenddata.push(senddata);
    if (this.CountSaveOpenings == 1) {
      this.spinnerService.show();
      this.RojggarMelaService.AddUpdateOpening(pushsenddata).subscribe(res => {
        this.Dbresponse = res;
        if (this.Dbresponse.responseResult == true) {
          this.toastrService.success(this.Dbresponse.message);
          this.GetEmployerJobDetail(this.jobid, '');
          this.modalRef.hide();
        }
        else {
          this.toastrService.error(this.Dbresponse.message);
          this.spinnerService.hide();
          this.modalRef.hide();
        }
      });
    }
    this.CountSaveOpenings++;
  }
}
