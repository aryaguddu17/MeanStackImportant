import { Component, OnInit, ViewChild, HostListener, TemplateRef, AfterViewInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { JobpostService } from '../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../Globals/app.config';
import { UserInfoService } from '../../Services/userInfo.service.';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Location } from '@angular/common';
// import { Options } from 'ng5-slider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
// import { ScreeningQuestionService } from '../../Services/screeningQuestion.service';
import *as moment from 'moment';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
import { EventService } from '../../Services/Event.service';
import { GeoLocationCommonComponent } from '../GeoLocationCommon/geo-location-common.component';
import { DatePipe } from '@angular/common';
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

declare var google: any;
@Component({
  selector: 'app-CreateEventComponent',
  templateUrl: './CreateEvent.Component.html',
})
export class CreateEventComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild('JobForms') JobForms: HTMLFormElement;
  @ViewChild(GeoLocationCommonComponent) GetLocation: GeoLocationCommonComponent;
  CurrentDate: Date = new Date();
  UserInfo: any;
  Responce: any = {};
  DBResponce: any = {};
  lstState: any = [];
  district: any = [];
  city: any = [];
  jobdetail: any = {};
  jobopeningdetail: any = {};
  newAttribute: any = [];
  newAttributeShow: any = [];
  EventForm: FormGroup;
  joblist: any = {};
  lstGender: any;
  status = true;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  mintoDate: any;
  minDate = new Date();
  Logintype: string = "";
  lttt: any;
  lngtt: any;
  btnsts: boolean = true;
  SectorForm: FormGroup;
  CityForMap: any;
  DistForMap: any;
  StateForMap: any;
  GMLtlgStatus: boolean = true;
  GoogleMapState: any;
  MapLatititute: any;
  MapLongitute: any;
  MapAddress: any;
  DefMapAddress: any;
  AdminId: any;
  dateToday:any;
  // google map 



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
    , private datePipe: DatePipe
    , private spinnerService: Ng4LoadingSpinnerService) {
    try {
      this.UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
      this.Logintype = this.UserInfo.loginType;
    } catch  { }
  }



  ngOnInit() {

    localStorage.removeItem("latlnggg");
    localStorage.removeItem("lattlngt");
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
    this.AdminId = JSON.parse(localStorage.getItem('phpadminid'));
    window.scroll(0, 0);
    // this.mintoDate=new Date();
    // this.mintoDate.setDate(this.mintoDate.getDate() + 1);

    this.EventForm = this.formBuilder.group({
      eventType: ['', [Validators.required,]],
      eventName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      startDate: ['', [Validators.required,]],
      endDate: ['', [Validators.required,]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      eventDescription: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      lstEventFacilitated: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      FacilitatedImage: ['', [Validators.nullValidator,]],
      PosterEventImage: ['', [Validators.nullValidator,]],
      lstEventGuest: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      stateId: ['', [Validators.required,]],
      districtId: ['', [Validators.required,]],
      lattitude: ['', [Validators.nullValidator,]],
      longitutde: ['', [Validators.nullValidator,]],

      ///////////////////  Event Co-ordinator Detail ///////////////////

      Name: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Department: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Email: ['', [Validators.nullValidator, Validators.compose([CustomValidators.vaildEmail])]],
      Mobile: ['', [Validators.nullValidator, Validators.compose([CustomValidators.validMobile])]],
      Remarks: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],






      // for contact in job opening

    });
    this.GetAllStates();
    this.EditCordinateForm();
    this.EditGuestForm();
    this.EditPosterForm();
    this.EditFacilitedForm();
    this.EditEventForm();
    this.FilterForm();
    this.serverDateTime();
    this.GetAllEventType();
    this.GetEventList(this.pagenumber, '', 'init');

  }
  /////////////////////////  Cordinate Details ///////////// 
  FilterEventForm: FormGroup;
  FilterForm() {
    this.FilterEventForm = this.formBuilder.group({
      EvenType: ['', [Validators.nullValidator,]],
      stateId: ['', [Validators.nullValidator,]],
      districtId: ['', [Validators.nullValidator,]],
      Search: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      filterstartDate: ['', [Validators.nullValidator,]],
      filterendDate: ['', [Validators.nullValidator,]],

    });
  }
  /////////////////////////  Cordinate Details ///////////// 
  CordinateEventForm: FormGroup;
  EditCordinateForm() {
    this.CordinateEventForm = this.formBuilder.group({
      eventCoordinatorId: ['', [Validators.nullValidator,]],
      Name: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Designation: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Department: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      Email: ['', [Validators.nullValidator, Validators.compose([CustomValidators.vaildEmail])]],
      Mobile: ['', [Validators.nullValidator, Validators.compose([CustomValidators.validMobile])]],
      Remarks: ['', [, Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
    });
  }
  ////////////////////////   Cordinate Details ////////////////////////
  /////////////////////////  Guest Details ///////////// 
  GuestEventForm: FormGroup;
  EditGuestForm() {
    this.GuestEventForm = this.formBuilder.group({
      eventGuestId: ['', [Validators.nullValidator,]],
      lstEventGuest: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
    });
  }
  ////////////////////////   Guest Details ////////////////////////

  ///////////////////////// Poster Image Details Section ///////////

  PosterEventForm: FormGroup;
  EditPosterForm() {
    this.PosterEventForm = this.formBuilder.group({
      facilatedById: ['', [Validators.nullValidator,]],
      PosterEventImage: ['', [, Validators.nullValidator]],
    });
  }

  //////////////////////// End Poster Image Details Section ///////////


  ////////////////////////// facilited Images Details Section //////////


  FacilitedEventForm: FormGroup;
  EditFacilitedForm() {
    this.FacilitedEventForm = this.formBuilder.group({
      eventPosterId: ['', [Validators.nullValidator,]],
      lstEventFacilitated: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      FacilitatedImage: ['', [Validators.nullValidator,]],
    });
  }



  //////////////////////// End Facilited Images Section /////////////////////
  EventEditForm: FormGroup;
  EditEventForm() {
    this.EventEditForm = this.formBuilder.group({
      eventType: ['', [Validators.required,]],
      eventName: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      startDate: ['', [Validators.required,]],
      endDate: ['', [Validators.required,]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      eventDescription: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      stateId: ['', [Validators.required,]],
      districtId: ['', [Validators.required,]],
      lattitude: ['', [Validators.nullValidator,]],
      longitutde: ['', [Validators.nullValidator,]],
    });
  }
  //////////////////////  filter section ////////////////////
  // filtersearchData()
  // {
  //   console.log(this.FilterEventForm);
  // }



  ////////////////////// End filter Section ////////////////

  //////////////////// add new code for scroll event list ////
  EventListStatus: boolean = false;
  delay: boolean = false;
  pagenumber: any = '0';
  EventList: any = [];
  Eventformshow: any = '0';
  Eventlistshow: any = '1';
  EventView: any = '0';
  EventEditformSection: any = 0;
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
        if (this.GetRegisteredEventList.length >= 10 && this.EventListStatus) {
          this.pagenumber = this.pagenumber + 1;
          this.GetEventList(this.pagenumber, 'scroll', '');
        }
      }
    }
  }
  //////////////////// add new code for show hide ////
  ApplyFilterShow = '1';
  EventDesc: any = '1';
  EListShow: any = '1';
  EDetailsShow: any = '0';
  EViewShow: any = '0';
  ViewBack: any = '0';
  EditBack: any = '0';


  showhide(Type: any) {
    if (Type == 'C') {
      this.EventForm.reset();
      if (this.EventForm.controls.eventType.value == "" || this.EventForm.controls.eventType.value == null) {
        this.EventForm.controls['eventType'].setValue("");
        this.EventForm.controls['stateId'].setValue("");
        this.EventForm.controls['districtId'].setValue("");
      }
      this.newAttributeShow=[];
      this.EventCount = 1;
      this.Eventformshow = '1';
      this.Eventlistshow = '0';
      this.EventListStatus = false;
      this.EventView = '0';
      //this.EventEditformSection=0;
      //this.EditCordinate=1;
      this.EditCordinate = '0';
      this.EditGuest = '0';
      this.EditPosterImage = '0';
      this.EditFacilitedImage = '0';
      this.EditEventFormSection = '0';
      this.ApplyFilterShow = '0';
      this.EventDesc = '0';

      /////////////////////
      this.EListShow = '0';
      this.EDetailsShow = '1';
      this.EViewShow = '0';

      this.ViewBack = '0';
      this.EditBack = '0';

      localStorage.removeItem("latlnggg");
      localStorage.removeItem("lattlngt");

      ///////////////////////

    }

    else {
      this.Eventformshow = '0';
      this.Eventlistshow = '1';
      this.EventListStatus = true;
      this.EventView = '0';
      //this.EventEditformSection=0;
      //this.EditCordinate=0;
      this.EditCordinate = '0';
      this.EditGuest = '0';
      this.EditPosterImage = '0';
      this.EditFacilitedImage = '0';
      this.EditEventFormSection = '0';
      this.ApplyFilterShow = '1';
      this.EventDesc = '1';

      /////////////////////
      this.EListShow = '1';
      this.EDetailsShow = '0';
      this.EViewShow = '0';
      this.ViewBack = '0';
      this.EditBack = '0';

      this.pagenumber = 0;
      this.GetEventList(this.pagenumber, '', 'init');
      ///////////////////////


    }
  }
  CloseView() ///////////////// view edit section //////////
  {
    this.Eventformshow = '0';
    this.Eventlistshow = '1';
    this.EventListStatus = true;
    this.EventView = '0';
    //this.EventEditformSection=0;
    //this.EditCordinate=0;
    this.EditCordinate = '0';
    this.EditGuest = '0';
    this.EditPosterImage = '0';
    this.EditFacilitedImage = '0';
    this.EditEventFormSection = '0';
    this.ApplyFilterShow = '1';
    this.EventDesc = '1';

    /////////////////
    this.ViewBack = '0';
    this.EditBack = '0';
    this.EListShow = '1';
    this.EDetailsShow = '0';
    this.EViewShow = '0';
    this.ViewBack = '0';
    this.EditBack = '0';
    this.pagenumber = 0;
    this.GetEventList(this.pagenumber, '', 'init');
    ///////////////
  }
  ResetForm() {
    this.GuestEventForm.controls['eventGuestId'].setValue("");
    this.CordinateEventForm.controls['eventCoordinatorId'].setValue("");
    this.GuestEventForm.controls['lstEventGuest'].setValue('');
    this.CordinateEventForm.controls['Name'].setValue('');
    this.CordinateEventForm.controls['Designation'].setValue('');
    this.CordinateEventForm.controls['Mobile'].setValue('');
    this.CordinateEventForm.controls['Email'].setValue('');
    this.CordinateEventForm.controls['Department'].setValue('');
    this.CordinateEventForm.controls['Remarks'].setValue('');
  }
  CloseAllEditSection() {
    this.Eventformshow = '0';
    this.Eventlistshow = '0';
    this.EventListStatus = true;
    this.EventView = '1';
    //this.EventEditformSection=0;
    //this.EditCordinate=0;
    this.EditCordinate = '0';
    this.EditGuest = '0';
    this.EditPosterImage = '0';
    this.EditFacilitedImage = '0';
    this.EditEventFormSection = '0';
    this.ApplyFilterShow = '0';
    this.ResetForm();
    this.EventDesc = 0;
    //////////////////
    this.ViewBack = '1';
    this.EditBack = '0';
    this.EventList = false;


    //////////////////////
  }
  ////////////////////////   code for view event /////
  EventViewData: any = []
  EventId: any = 0;
  guestName:any;
  ViewEvent(EventId: any) {
    this.spinnerService.show();
    this.EventListStatus = false;
    this.Eventformshow = '0';
    this.Eventlistshow = '0';
    this.EventView = '1';
    this.EventEditformSection = '0';
    this.ApplyFilterShow = '0';
    this.EventDesc = '0';
    /////////////////////

    this.EViewShow = '1';
    this.EListShow = '0';
    this.EDetailsShow = '0';
    this.ViewBack = '1';
    this.EditBack = '0';
    //////////////////////////
    this.EventService.GetEventDetailIdWise(this.Adminid, EventId).subscribe(res => {
      this.response = res;
      if (this.response.adminGetEventDetailIdWise != null) {
        this.EventViewData = this.response.adminGetEventDetailIdWise[0];
        this.EventId = this.EventViewData.eventId;
        this.guestName=this.EventViewData.lstEventGuest[0].guestName;
        this.spinnerService.hide();
      }
      else {
        this.EventViewData = [];
        this.EventId = 0;
        this.spinnerService.hide();
      }
    });

  }

  ////////////////////////  code for Edit section ////////
  EditGuest: any = 0;
  EditEventAction(Type: any) {
    this.ViewBack = '0';
    this.EditBack = '1';
    if (Type == 'CO') {
      this.CodinaterCount = 1;
      this.EventEditformSection = '1';
      this.EventView = '0';
      this.EditCordinate = '1';
      this.EditGuest = '0';
      this.EditPosterImage = '0';
      this.EditFacilitedImage = '0';
      this.EditEventFormSection = '0';
      this.EventListStatus = false;
    }
    if (Type == 'CHGT') {
      this.CountGuest = 1;
      this.EventEditformSection = '1';
      this.EventView = '0';
      this.EditCordinate = '0';
      this.EditGuest = '1';
      this.EditPosterImage = '0';
      this.EditFacilitedImage = '0';
      this.EditEventFormSection = '0';
      this.EventListStatus = false;
    }
    if (Type == 'POSTER') {
      this.PosterImageEditData = [];
      this.PosterImageEditShow = [];
      this.CountPoster = 1;
      this.EventEditformSection = '1';
      this.EventView = '0';
      this.EditCordinate = '0';
      this.EditGuest = '0';
      this.EditPosterImage = '1';
      this.EditFacilitedImage = '0';
      this.EditEventFormSection = '0';
      this.EventListStatus = false;
    }
    if (Type == 'Facilited') {
      this.EditFacilitedShow = [];
      this.EditFacilitedData = [];
      this.CountFaclited = 1;
      this.EventEditformSection = '1';
      this.EventView = '0';
      this.EditCordinate = '0';
      this.EditGuest = '0';
      this.EditPosterImage = '0';
      this.EditFacilitedImage = '1';
      this.EditEventFormSection = '0';
      this.EventListStatus = false;
    }
    // if(Type=='EventEdit')
    // {
    //   this.EventEditformSection=1;
    //   this.EventView=0;
    //   this.EditCordinate=0;
    //   this.EditGuest=0;
    //   this.EditPosterImage=0;
    //   this.EditFacilitedImage=0;
    //   this.EditEventFormSection=1;
    // }

  }



  ///////////////////////// End Code For Edit Section ///////
  EventReset() {
    this.FilterEventForm.reset();
    this.pagenumber = 0;
    this.GetEventList(this.pagenumber, '', 'init');

  }
  //////////////////////////////  
  response: any = [];
  GetRegisteredEventList: any = [];
  from: any;
  GetEventList(pagenumber: any, from: any, src: any) {
    this.pagenumber = pagenumber;
    this.spinnerService.show();
    this.from = from;
    this.spinnerService.show();
    this.from = from;
    var Data = {
      "eventFlag": this.FilterEventForm.value.EvenType != 'undifined' && this.FilterEventForm.value.EvenType != '' && this.FilterEventForm.value.EvenType != null ? this.FilterEventForm.value.EvenType : "",
      "stateId": this.FilterEventForm.value.stateId != 'undifined' && this.FilterEventForm.value.stateId != '' && this.FilterEventForm.value.stateId != null ? this.FilterEventForm.value.stateId : 0,
      "districtId": this.FilterEventForm.value.districtId != 'undifined' && this.FilterEventForm.value.districtId != '' && this.FilterEventForm.value.districtId != null ? this.FilterEventForm.value.districtId : 0,
      "eventType": this.FilterEventForm.value.EvenType != 'undifined' && this.FilterEventForm.value.EvenType != '' && this.FilterEventForm.value.EvenType != null ? this.FilterEventForm.value.EvenType : 0,
      "searchKey": this.FilterEventForm.value.Search != 'undifined' && this.FilterEventForm.value.Search != '' && this.FilterEventForm.value.Search != null ? this.FilterEventForm.value.Search : "",
      "startDate": this.FilterEventForm.value.filterstartDate != 'undifined' && this.FilterEventForm.value.filterstartDate != '' && this.FilterEventForm.value.filterstartDate != null ? this.FilterEventForm.value.filterstartDate : null,
      "endDate": this.FilterEventForm.value.filterendDate != 'undifined' && this.FilterEventForm.value.filterendDate != '' && this.FilterEventForm.value.filterendDate != null ? this.FilterEventForm.value.filterendDate : null,
      "pagenumber": this.pagenumber,
      "REGISTRATIONSTATUS": 0

    }
    if (this.from == 'scroll') {
      this.EventService.RegisteredEventList(Data).subscribe(res => {
        this.response = res;
        this.spinnerService.hide();
        if (this.response.lstRojgaarEventList != null) {
          this.GetRegisteredEventList = this.GetRegisteredEventList.concat(this.response.lstRojgaarEventList);
          this.from = 'scroll';
        } else {
          //this.batchcodeId = [];
          this.from = '';
        }
        this.delay = false;
      });
    } else {
      this.EventService.RegisteredEventList(Data).subscribe(res => {
        this.response = res;
        this.spinnerService.hide();
        if (this.response.lstRojgaarEventList != null) {
          this.GetRegisteredEventList = this.response.lstRojgaarEventList;
          this.from = '';
        }
        else {
          // this.batchcodeId=[];
          this.from = '';
        }
        this.delay = false;
        this.EventListStatus = true;
      });
    }

  }

  ///////////////////// End Scroll code for Scroll Event List
  Sector: any = [];
  gettodaydate: any;
  today: any;
  serverDate: any;
  serverDateTime() {
    this.masterService.GetServerDateTime().subscribe(res => {
      if (res) {
        this.serverDate = res;
        this.gettodaydate = this.serverDate.toString().slice(0, 10).trim();
        this.today = this.datePipe.transform(this.gettodaydate, 'dd-MM-yyyy');
        this.mintoDate = moment.utc(this.serverDate).toDate();
        this.mintoDate.setDate(this.mintoDate.getDate() + 1);
      } else {
        this.mintoDate = new Date();
        this.mintoDate.setDate(this.mintoDate.getDate() + 1);
      }
    })
  }
  EventtypeList: any;
  item: any;
  Adminid: any;
  GetAllEventType() {
    try {
      this.item = localStorage.getItem('phpadminid');
      this.Adminid = parseInt(JSON.parse(this.item));
      this.EventService.GetAllEvent(this.Adminid).subscribe(res => {
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
  private GetAllStates() {
    try {
      this.masterService.GetAllStates().subscribe(res => {
        this.lstState = res
        if (this.lstState != null) {
          this.lstState = this.lstState;
        }
        else {
          this.lstState = [];
        }
      });
    } catch  { }
  }

  onChangeState(statename: any) {
    // if (statename != null && statename!= '' && statename!=undefined) {
    this.GetAllDistrict(statename);
    this.GetAllCity(statename);
    // }
    // else{
    //   return false;
    // }
  }

  // private GetAllDistrict(id: any) {
  //   try {

  //     this.masterService.GetAllDistrict(id).subscribe(res => {
  //       this.district = res
  //       if (this.district != null && this.district.length > 0) {
  //         this.district = this.district;

  //       }
  //     });
  //   } catch  { }
  // }
  GeolocationShow: any = 0;
  GetAllDistrict(id: any) {
    try {
      if (id != null && id != '' && id != undefined) {
        this.district = [];
        this.EventEditForm.controls['districtId'].setValue(" ");
        this.GeolocationShow = 1;
        this.masterService.GetAllDistrict(id).subscribe(res => {
          this.district = res;
          if (this.district != null && this.district.length > 0) {
            this.district = this.district;

          }
          else {
            this.district = [];
            this.GeolocationShow = 0;
          }
        });
      }
      else {
        this.district = [];
        this.GeolocationShow = 0;
      }
    } catch  { }
  }

  districtValid: boolean = false;

  GetAllCity(id: any) {
    try {
      if (id != null && id != '') {
        this.masterService.GetAllCity(id).subscribe(res => {
          this.city = res;
          if (this.city != null && this.city.length > 0) {
            this.city = this.city;

          }
          else {
            this.city = [];
          }
        });
      }
      else {
        this.city = [];
      }
    } catch  { }

  }

  Back() {
    this._location.back();
  }
  indexValue: any;
  modalRef: BsModalRef;

  PushedTemplate(template: TemplateRef<any>) {
    //this.indexValue = i;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {
    this.modalRef.hide();
  }
  decimals(e) {
    if (e.keyCode === 190 || e.keyCode == 110) {
      return false;
    }
    if (e.keyCode === 189) {
      return false;
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
  ////////////////  sector section //////////
  NewSectorShow: any = [];
  NewSectorData: any = [];
  NewSecterTempData: any = [];
  modalRefSector: BsModalRef;
  modalRefPosterEvent: BsModalRef;
  modalRefFacilitedBy: BsModalRef;

  PusTemplateSector(templateSector: TemplateRef<any>) {
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-sm' });
  }
  PusFacilitedByTemplate(templateFaciltedBY: TemplateRef<any>) {
    this.modalRefFacilitedBy = this.modalService.show(templateFaciltedBY, { class: 'modal-sm' });
  }
  PusPosterEventTemplate(templatePosterEvent: TemplateRef<any>) {
    this.modalRefPosterEvent = this.modalService.show(templatePosterEvent, { class: 'modal-sm' });
  }
  deleteCoordinater(index: number) {
    this.newAttributeShow.splice(index, 1);
    this.newAttribute.splice(index, 1);
    this.modalRef.hide();
  }

  deleteFacilitedBy(index: number) {
    this.AddFacilitedShow.splice(index, 1);
    this.AddFacilitedData.splice(index, 1);
    this.modalRefFacilitedBy.hide();
  }

  deletePosterEvent(index: number) {
    this.PosterImageAddShow.splice(index, 1);
    this.PosterImageAddData.splice(index, 1);
    this.modalRefPosterEvent.hide();
  }
  declineBoxFacilted(): void {
    this.modalRefFacilitedBy.hide();
  }
  declineBoxPosterEvent(): void {
    this.modalRefPosterEvent.hide();
  }
  ////////////////////  add new code for delete pop up ////////
  ///////////////////// End Code  //////////////////////////////

  index: any = '';
  openingModelRef: BsModalRef;
  geoLocation(template: TemplateRef<any>, item: any) {
    if (this.GMLtlgStatus == true) {
      localStorage.removeItem("lattlngt");
    }
    this.openingModelRef = this.modalService.show(template, { class: 'modal-sm-md' });
  }

  latitude: any;
  longitude: any;
  lat: any;
  lng: any;
  codeAddres(address: any, src: any) {
    if (address != '') {
      this.GMLtlgStatus = false;
    } else {
      this.GMLtlgStatus = true;
    }
    var mapAddress;
    if (src == 'ST') {
      var state = address;
      var statename = (this.lstState).filter(function (entry) {
        return entry.id == state;
      });
    } else if (src == 'DT') {
      var dist = address;
      var distname = (this.district).filter(function (entry) {
        return entry.id == dist;
      });
    }
    if (statename) {
      this.StateForMap = statename[0]['stateName'];
    } else if (distname) {
      this.DistForMap = distname[0]['districtName'];
    }

    if (this.StateForMap && this.DistForMap) {
      var concAddress = this.DistForMap + ',' + this.StateForMap;
      mapAddress = concAddress;
    } else if (this.StateForMap) {
      this.GMLtlgStatus = false;
      mapAddress = this.StateForMap;
    }
    this.DefMapAddress = mapAddress;
    this.GetLocation.callMethod(mapAddress);
  }

  //////////////// Add Event Coordinator Detail   ////////////////
  coordinatordetail: any = {};
  AddEventCoordinatorDetail() {
    if (this.EventForm.value.Name == '' || this.EventForm.value.Name == null || this.EventForm.value.Name == undefined) {
      this.toastrService.error("Please enter name");
      return false
    }
    // else if (this.EventForm.value.Designation == '') {
    //   this.toastrService.error("please add designation");
    //   return false
    // } 
    // else if (this.EventForm.value.Department == '') {
    //   this.toastrService.error("please add department");
    //   return false
    // }
    else if (this.EventForm.value.Email == '' || this.EventForm.value.Email == null || this.EventForm.value.Email == undefined) {
      this.toastrService.error("Please enter email");
      return false
    }
    else if (this.EventForm.value.Mobile == '' || this.EventForm.value.Mobile == null || this.EventForm.value.Mobile == undefined) {
      this.toastrService.error("Please enter mobile number");
      return false
    }

    // else if (this.EventForm.value.Remarks == '') {
    //   this.toastrService.error("please add remarks");
    //   return false
    // }

    // if (!this.EventForm.value.Name && !this.EventForm.value.Designation && !this.EventForm.value.Mobile && !this.EventForm.value.Department && !this.EventForm.value.Remarks && !this.EventForm.value.Email) {
    //   this.toastrService.error("please add at least one field");
    // } 

    else {

      this.coordinatordetail.Name = this.EventForm.value.Name;
      this.coordinatordetail.Designation = this.EventForm.value.Designation;
      this.coordinatordetail.Mobile = this.EventForm.value.Mobile;
      this.coordinatordetail.Email = this.EventForm.value.Email;
      this.coordinatordetail.Department = this.EventForm.value.Department;
      this.coordinatordetail.Remarks = this.EventForm.value.Remarks;

      this.newAttributeShow.push({
        "Name": this.EventForm.value.Name,
        "Designation": this.EventForm.value.Designation,
        "Mobile": this.EventForm.value.Mobile,
        "Email": this.EventForm.value.Email,
        "Department": this.EventForm.value.Department,
        "Remarks": this.EventForm.value.Remarks,
      });

      this.newAttribute.push(this.coordinatordetail);
      this.coordinatordetail = {};
      this.EventForm.controls['Name'].setValue("");
      this.EventForm.controls['Designation'].setValue("");
      this.EventForm.controls['Mobile'].setValue("");
      this.EventForm.controls['Email'].setValue("");
      this.EventForm.controls['Department'].setValue("");
      this.EventForm.controls['Remarks'].setValue("");
    }

  }


  /////////// Save Event data   //////////////////////////
  SaveGoogleMapAddress: any = {};
  EventGuest: any = []
  senddata: any = {};
  savedata(data) {
    if (this.newAttribute.length > 0) {
      if (data.startDate == '') {
        this.toastrService.error('Please select event start date');
        return false;
      }
      if (data.startTime == '') {
        this.toastrService.error('Please select event start time');
        return false;
      }
      if (data.endDate == '') {
        this.toastrService.error('Please select event end date');
        return false;
      }
      let eventstarttime = data.startTime;
      let eventendtime = data.endTime;
      // if (eventstarttime < '06') {
      //   this.toastrService.error('Events timing must be between 6 am to 10 pm');
      //   return false;
      // }
      if (data.endTime == '') {
        this.toastrService.error('Please Select event end time');
        return false;
      }

      // if (eventendtime > '22:00') {
      //   this.toastrService.error('Events timing must be between 6 am to 10 pm');
      //   return false;
      // }
      if (data.startDate > data.endDate) {

        this.toastrService.error('Start date cannot be greater than end date.');
        return false;
      }

      // if (eventendtime < eventstarttime) {
      //   this.toastrService.error('Invalid event to time');
      //   return false;
      // }

      this.spinnerService.show();
      this.EventGuest = [{
        guestName: data.lstEventGuest
      }];

      var ltlg = localStorage.getItem("latlnggg");
      var GoogleMapAdd = localStorage.getItem("GoogleMapAdd");
      var MapDetailsArr = ltlg.split(',');
      if (MapDetailsArr != null) {
        this.SaveGoogleMapAddress.Latitude = MapDetailsArr[0];
        this.SaveGoogleMapAddress.Longtitute = MapDetailsArr[1];
        this.SaveGoogleMapAddress.Locationmapaddress = GoogleMapAdd;
      }
      //var mystartDate = moment(data.startDate).format('DD/MM/YYYY')  
      // var myendDate = moment(data.endDate).format('DD/MM/YYYY')

      this.senddata = {
        // eventId: data.eventId,
        eventName: data.eventName.trim(),
        adminId: this.AdminId,
        eventType: data.eventType,
        startDate: data.startDate,
        // startDate: mystartDate,
        startTime: data.startTime,
        endDate: data.endDate,
        // endDate: myendDate,
        endTime: data.endTime,
        address: data.address.trim(),
        stateId: data.stateId,
        districtId: data.districtId,
        lattitude: this.SaveGoogleMapAddress.Latitude,
        longitutde: this.SaveGoogleMapAddress.Longtitute,
        googleMapAdd: this.SaveGoogleMapAddress.Locationmapaddress,
        eventDescription: data.eventDescription,
        lstEventFacilitated: this.AddFacilitedData,
        lstEventPoster: this.PosterImageAddData,
        lstEventGuest: this.EventGuest,
        lstEventCoordinateDetail: this.newAttribute,
        source: 'Admin',
        sourceId: this.AdminId,
        eventId: 0,
        userName: ''
      }
      if (this.EventCount == 1) {
        this.EventService.SaveEvent(this.senddata).subscribe(res => {
          this.Responce = res;
          if (this.Responce.responseResult) {
            // Perform next action
            this.toastrService.success(this.Responce.message);
            this.Eventformshow = 0;
            this.Eventlistshow = 1;
            this.EventListStatus = true;
            this.senddata = [];
            this.AddFacilitedData = [];
            this.EventGuest = [];
            this.PosterImageAddData = [];
            this.EventForm.reset();
            this.AddFacilitedShow = [];
            this.PosterImageAddShow = [];
            this.newAttributeShow = [];
            window.scroll(0, 0);
            this.GetEventList(this.pagenumber, this.from, '');
          }
          else {
            this.toastrService.error(this.Responce.message);
          }
          this.spinnerService.hide();

        });
      }
      this.EventCount++;
      this.ApplyFilterShow = '1';
      this.EListShow = '1';
      this.EDetailsShow = '0';
      this.EViewShow = '0';
      this.ViewBack = '0';
      this.EditBack = '0';

    } else {
      this.toastrService.error("Please add opening details");
    }
  }

  //////////////////////////////////////  Add  Facilitated By
  AddFacilited: any = {};
  AddFacilitedShow: any = [];
  AddFacilitedData: any = [];
  AddFacilated() {
    if (this.EventForm.value.lstEventFacilitated == '' || this.EventForm.value.lstEventFacilitated == null || this.EventForm.value.lstEventFacilitated == undefined) {
      // this.toastrService.error("please add  facilated by");
      this.toastrService.error("Please Enter Facilitated by Name");
      return false
    }

    if (this.EventForm.value.FacilitatedImage == '' || this.EventForm.value.FacilitatedImage == null || this.EventForm.value.FacilitatedImage == undefined) {
      // this.toastrService.error("please add  facilated by");
      this.toastrService.error("Please select Facilitated by Image");
      return false
    }
    // else if (this.EventForm.value.FacilitatedImage == '') {
    //   this.toastrService.error("please add logo");
    //   return false
    // } 
    // if(!this.EventForm.value.Name && !this.EventForm.value.FacilitatedImage) {
    //   this.toastrService.error("please add at least one field");
    // } 
    else {

      this.AddFacilited.facilatedBy = this.EventForm.value.lstEventFacilitated;
      this.AddFacilited.imageName = this.FacilityImage != '' ? this.FacilityImage : '';
      this.AddFacilited.imagePath = this.base64textStringFCI != '' ? this.base64textStringFCI : '';
      //this.AddFacilited.imagePath = 'base64textStringFCI';
      this.AddFacilited.imageext = '.' + this.Facilityimageext;
      this.AddFacilitedShow.push({
        "facilatedBy": this.EventForm.value.lstEventFacilitated.trim(),
        "imageName": this.imagenameFci,
      });

      this.AddFacilitedData.push(this.AddFacilited);
      this.AddFacilited = {};
      this.base64textStringFCI = [];
      this.imagenameFci = '';
      this.EventForm.controls['lstEventFacilitated'].setValue("");
      this.EventForm.controls['FacilitatedImage'].setValue("");
    }

  }

  ///////////////////  image upload ////////////
  /////////////////////  End Facilitated By ///////////////////////////

  /////////////////////  add new code for Upload Event Document ///////////////
  PosterImageAdd: any = {};
  PosterImageAddShow: any = [];
  PosterImageAddData: any = [];

  AddEventImage() {
    if (this.EventForm.value.PosterEventImage == '' || this.EventForm.value.PosterEventImage == null || this.EventForm.value.PosterEventImage == undefined) {
      // this.toastrService.error("please add event document");
      this.toastrService.error("Please select banner");
      return false
    }
    else {
      //this.PosterImageAdd.facilatedBy = this.EventForm.value.PosterEventImage;
      this.PosterImageAdd.posterImageName = this.PosterEventImage != '' ? this.PosterEventImage : '';
      this.PosterImageAdd.posterImagePath = this.base64textStringPosterImageEvent != '' ? this.base64textStringPosterImageEvent : '';
      //this.PosterImageAdd.posterImagePath = 'base64textStringPosterImageEvent';
      this.PosterImageAdd.posterImageext = '.' + this.PosterEventimageext;
      this.PosterImageAddShow.push({
        "imageNameposter": this.imagenamePoster,
      });
      this.PosterImageAddData.push(this.PosterImageAdd);
      this.PosterImageAdd = {};
      this.base64textStringPosterImageEvent = [];
      this.imagenamePoster = '';
      this.EventForm.controls['PosterEventImage'].setValue("");
    }
  }

  /////////////////////////  End Upload Event Document  ///////////////////////

  ///////////////////  image upload  //////////////////////////////////////////
  FacilityImage: any;
  FacilityimagePath: any;
  Facilityimageext: any;
  PosterEventImage: any;
  PosterEventimagePath: any;
  PosterEventimageext: any;
  currentFile1: any;
  currentFile: any;
  base64textString: any = [];
  img: any;
  ValidImageTypes: any;
  onUploadChangePic(evt: any, sf: any) {
    this.img = sf;
    this.base64textString = [];
    this.base64textStringFCI = [];
    this.base64textStringFCIShow = [];
    this.base64textStringPosterImageEventshow = [];
    this.base64textStringPosterImageEvent = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      if (this.img == 'FCI') {
        this.EventForm.controls.FacilitatedImage.setValue('');
        this.FacilitedEventForm.controls['FacilitatedImage'].setValue("");
        $("#upload1").val('');
        $("#upload3").val('');
        $("#upload4").val('');
      } if (this.img == 'PosterImageEvent') {
        this.EventForm.controls.PosterEventImage.setValue('');
        this.PosterEventForm.controls['PosterEventImage'].setValue("");
        $("#upload2").val('');
        $("#upload3").val('');
        $("#upload4").val('');


      }
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      //this.updateEmployerForm.controls['agent_pic'].setValue('');
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
    }
    if (this.img == 'FCI') {

      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else if (this.img == 'PosterImageEvent') {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    }
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
      // $("#fileProfile").val('');
      if (this.img == 'FCI') {
        this.EventForm.controls.FacilitatedImage.setValue('');
        this.FacilitedEventForm.controls['FacilitatedImage'].setValue("");
        $("#upload1").val('');
        $("#upload3").val('');
        $("#upload4").val('');

      } else if (this.img == 'PosterImageEvent') {
        this.EventForm.controls.PosterEventImage.setValue('');
        this.PosterEventForm.controls['PosterEventImage'].setValue("");
        $("#upload2").val('');
        $("#upload3").val('');
        $("#upload4").val('');
      } else {
        // this.updateEmployerForm.controls.agent_pic.setValue('');
      }
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        if (this.img == 'FCI') {
          this.EventForm.controls.FacilitatedImage.setValue('');
          this.FacilitedEventForm.controls['FacilitatedImage'].setValue("");
          $("#upload1").val('');
          $("#upload3").val('');
          $("#upload4").val('');

        } else if (this.img == 'PosterImageEvent') {
          this.EventForm.controls.PosterEventImage.setValue('');
          this.PosterEventForm.controls['PosterEventImage'].setValue("");
          $("#upload2").val('');
          $("#upload3").val('');
          $("#upload4").val('');

        } else {
          //this.updateEmployerForm.controls.agent_pic.setValue('');
        }
        return false;
      }
      reader.onloadend = this.handleReaderLoaded.bind(this);
      var data = reader.readAsBinaryString(this.currentFile);
    }
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

  imagenameFci: string = '';
  imagenamePoster: string = '';
  base64textStringFCI: any = [];
  base64textStringFCIShow: any = [];

  base64textStringPosterImageEvent: any = [];
  base64textStringPosterImageEventshow: any = [];

  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    if (this.img == 'FCI') {
      var imn2 = imn.split('.');
      // this.imgGstName = imn;
      this.Facilityimageext = imn2[1];
      this.FacilityImage = imn2[0];
      this.base64textStringFCIShow.push('data:image/png;base64,' + btoa(e.target.result));;
      //this.base64textStringFCI = btoa(e.target.result);
      // this.showMagGst = true;
      // this.gstGetImg = false;
      // this.base64textStringShop = "data:image/jpeg;base64,"+this.ShopImgBase64;
      //this.base64textStringFCI.push('data:image/png;base64,' + btoa(e.target.result));
      this.base64textStringFCI = 'data:image/png;base64,' + btoa(e.target.result);

      for (var i = 0; i < this.base64textStringFCIShow.length; i++) {
        this.imagenameFci = '';
        this.imagenameFci = this.base64textStringFCIShow[i]
      }
      //  this.base64textStringFCI='data:image/png;base64,' + btoa(e.target.result);
    } else if (this.img == 'PosterImageEvent') {
      var imn3 = imn.split('.');
      this.PosterEventimageext = imn3[1];
      this.PosterEventImage = imn3[0];
      //this.base64textStringPosterImageEvent = btoa(e.target.result);

      //this.base64textStringPosterImageEvent.push('data:image/png;base64,' + btoa(e.target.result));
      this.base64textStringPosterImageEvent = 'data:image/png;base64,' + btoa(e.target.result);
      this.base64textStringPosterImageEventshow.push('data:image/png;base64,' + btoa(e.target.result));;


      for (var i = 0; i < this.base64textStringPosterImageEventshow.length; i++) {
        this.imagenamePoster = '';
        this.imagenamePoster = this.base64textStringPosterImageEventshow[i]
      }
      // this.base64textStringPosterImageEvent='data:image/png;base64,' + btoa(e.target.result);

    }
  }
  //////////////////////////////////////////////////////////////////////////////////////

  //////////////////////   cordinate edit fuction ///////////
  EditCoordinatordetail: any = [];
  EditCordinate: any = 0;
  CodinaterCount: number = 1;
  UpdateEventCoordinatorDetail() {
    if (this.CordinateEventForm.value.Name == '') {
      this.toastrService.error("please add  name");
      return false
    }
    // else if (this.CordinateEventForm.value.Designation == '') {
    //   this.toastrService.error("please add designation");
    //   return false
    // } 
    // else if (this.CordinateEventForm.value.Department == '') {
    //   this.toastrService.error("please add department");
    //   return false
    // }
    else if (this.CordinateEventForm.value.Email == '') {
      this.toastrService.error("please add email id");
      return false
    }
    else if (this.CordinateEventForm.value.Mobile == '') {
      this.toastrService.error("please add mobile number");
      return false
    }
    // else if (this.CordinateEventForm.value.Remarks == '') {
    //   this.toastrService.error("please add remarks");
    //   return false
    // }

    // if (!this.CordinateEventForm.value.Name && !this.CordinateEventForm.value.Designation && !this.CordinateEventForm.value.Mobile && !this.CordinateEventForm.value.Department && !this.CordinateEventForm.value.Remarks && !this.CordinateEventForm.value.Email) {
    //   this.toastrService.error("please add at least one field");
    // } 

    else {
      this.spinnerService.show();
      // this.EditCoordinatordetail.name = this.CordinateEventForm.value.Name;
      // this.EditCoordinatordetail.designation = this.CordinateEventForm.value.Designation;
      // this.EditCoordinatordetail.mobile = this.CordinateEventForm.value.Mobile;
      // this.EditCoordinatordetail.email = this.CordinateEventForm.value.Email;
      // this.EditCoordinatordetail.department = this.CordinateEventForm.value.Department;
      // this.EditCoordinatordetail.remarks = this.CordinateEventForm.value.Remarks;
      // this.EditCoordinatordetail.adminId = this.AdminId;
      // this.EditCoordinatordetail.eventId = this.EventId;
      // this.EditCoordinatordetail.eventCoordinatorId=this.CordinateEventForm.value.eventCoordinatorId!=''?this.CordinateEventForm.value.eventCoordinatorId:0;
      this.EditCoordinatordetail = [{
        "name": this.CordinateEventForm.value.Name,
        "designation": this.CordinateEventForm.value.Designation,
        "mobile": this.CordinateEventForm.value.Mobile,
        "email": this.CordinateEventForm.value.Email,
        "department": this.CordinateEventForm.value.Department,
        "remarks": this.CordinateEventForm.value.Remarks,
        "adminId": this.AdminId,
        "eventId": this.EventId,
        "eventCoordinatorId": this.CordinateEventForm.value.eventCoordinatorId != '' ? this.CordinateEventForm.value.eventCoordinatorId : 0,
      }]


      // this.newAttributeShow.push({
      //   "Name": this.EventForm.value.Name,
      //   "Designation": this.EventForm.value.Designation,
      //   "Mobile": this.EventForm.value.Mobile,
      //   "Email": this.EventForm.value.Email,
      //   "Department": this.EventForm.value.Department,
      //   "Remarks": this.EventForm.value.Remarks,
      // });

      ///   this.newAttribute.push(this.coordinatordetail);
      if (this.CodinaterCount == 1) {
        this.EventService.UpdateCordinaterEventData(this.EditCoordinatordetail).subscribe(res => {
          this.response = res;
          if (this.response != null) {
            this.toastrService.success(this.response.message);
            this.EditCoordinatordetail = [];
            this.CordinateEventForm.controls['eventCoordinatorId'].setValue("");
            this.CordinateEventForm.controls['Name'].setValue("");
            this.CordinateEventForm.controls['Designation'].setValue("");
            this.CordinateEventForm.controls['Mobile'].setValue("");
            this.CordinateEventForm.controls['Email'].setValue("");
            this.CordinateEventForm.controls['Department'].setValue("");
            this.CordinateEventForm.controls['Remarks'].setValue("");
            this.ViewEvent(this.EventId);
            this.EventView = 1;
            this.EventEditformSection = 0;
            this.EditCordinate = 0;
            this.EditPosterImage = 0;
            this.EditGuest = 0;


          }
          else {
            this.toastrService.error(this.response.message);
          }
          //this.spinnerService.hide();
        });
        this.ViewBack = 1;
        this.EditBack = 0;
        this.EventList = false;

      }
    }
    this.CodinaterCount++;

  }

  EditCordinaterDetails(CordinateData: any) {
    this.CodinaterCount = 1;
    this.ViewBack = 0;
    this.EditBack = 1;
    this.EventList = false;

    this.EventView = 0;
    this.EventEditformSection = 1;
    this.EditCordinate = 1;
    this.CordinateEventForm.controls['eventCoordinatorId'].setValue(CordinateData.eventCoordinatorId);
    this.CordinateEventForm.controls['Name'].setValue(CordinateData.name);
    this.CordinateEventForm.controls['Designation'].setValue(CordinateData.designation);
    this.CordinateEventForm.controls['Mobile'].setValue(CordinateData.mobile);
    this.CordinateEventForm.controls['Email'].setValue(CordinateData.email);
    this.CordinateEventForm.controls['Department'].setValue(CordinateData.department);
    this.CordinateEventForm.controls['Remarks'].setValue(CordinateData.remarks);


  }
  modalRefCordEdit: BsModalRef;
  DelCordinatID: any;
  CordinateTemplate(templateEditCodinater: TemplateRef<any>, CordinaterID) {
    this.DelCordinatID = CordinaterID;
    this.CodinaterCount = 1;
    this.modalRefCordEdit = this.modalService.show(templateEditCodinater, { class: 'modal-sm' });
  }
  declineCordinaterBox() {
    this.modalRefCordEdit.hide();
  }
  deleteEditSectionCoordinater(CodinaterData: any) {
    if (CodinaterData.length <= 1) {
      //this.toastrService.error(" To preform this action plaase add more than one event co-drdinator details");
      this.toastrService.error(" Minimum One Event Co-Ordinator details is Required");
      this.modalRefCordEdit.hide();
      return false;
    }
    var delarray = {
      "adminId": this.Adminid,
      "eventId": this.EventId,
      "eventCoordinatorId": this.DelCordinatID,
      "status": false
    }
    this.spinnerService.show()
    if (this.CodinaterCount == 1) {
      this.EventService.DeleteCordinaterEventData(delarray).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.DelCordinatID = 0;
          this.ViewEvent(this.EventId);
        }
        else {
          this.toastrService.error(this.response.message);

        }
        this.spinnerService.hide()
        this.modalRefCordEdit.hide();

      });
    }
    this.CodinaterCount++;
  }
  ///////////////////// End Edit Section ////////////////////////

  /////////////////////// Edit Guest Section ///////////////////

  EditGuestDetails(GuestData: any) {
    this.CountGuest = 1;
    this.ViewBack = 0;
    this.EditBack = 1;
    this.EventList = false;

    this.EventView = 0;
    this.EventEditformSection = 1;
    this.EditCordinate = 0;
    this.EditGuest = 1;
    this.GuestEventForm.controls['eventGuestId'].setValue(GuestData.eventGuestId);
    this.GuestEventForm.controls['lstEventGuest'].setValue(GuestData.guestName);
  }
  CountGuest: number = 1;
  UpdateGuestDetail() {
    if (this.GuestEventForm.value.lstEventGuest == '') {
      this.toastrService.error('Please add chief guest');
      return false;
    }
    this.spinnerService.show();
    var GuestData = [{
      "adminId": this.Adminid,
      "eventId": this.EventId,
      "guestName": this.GuestEventForm.value.lstEventGuest,
      "eventGuestId": this.GuestEventForm.value.eventGuestId != '' ? this.GuestEventForm.value.eventGuestId : 0
    }]
    if (this.CountGuest == 1) {
      this.EventService.UpdateGuestEventData(GuestData).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.GuestEventForm.controls['eventGuestId'].setValue("");
          this.GuestEventForm.controls['lstEventGuest'].setValue("");
          this.ViewEvent(this.EventId);
          this.EventView = 1;
          this.EventEditformSection = 0;
          this.EditCordinate = 0;
          this.EditGuest = 0;
          this.EditPosterImage = 0;
          this.EditFacilitedImage = 0;
          this.EditEventFormSection = 0;
        }
        else {
          this.toastrService.error(this.response.message);
        }
        this.spinnerService.hide();
      });
    }
    this.CountGuest++;
    this.ViewBack = 1;
    this.EditBack = 0;
    this.EventList = false;
  }
  ///////////////////////  del functionality ////////////////
  modalRefGuestEdit: BsModalRef;
  DelGuestID: any;
  GuestTemplate(templateEditGuest: TemplateRef<any>, GuestID) {
    this.DelGuestID = GuestID;
    this.CountGuest = 1;
    this.modalRefGuestEdit = this.modalService.show(templateEditGuest, { class: 'modal-sm' });
  }
  declineGuestBox() {
    this.modalRefGuestEdit.hide();
  }
  deleteEditSectionGuest() {
    var delarray = {
      "adminId": this.Adminid,
      "eventId": this.EventId,
      "eventGuestId": this.DelGuestID,
      "status": false
    }
    this.spinnerService.show()
    if (this.CountGuest == 1) {
      this.EventService.DeleteGuestEventData(delarray).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.DelGuestID = 0;
          this.ViewEvent(this.EventId);
        }
        else {
          this.toastrService.error(this.response.message);

        }
        this.spinnerService.hide()
        this.modalRefGuestEdit.hide();

      });
    }

    this.CountGuest++;
  }
  ///////////////////// End Guest Section ////////////////////

  ///////////////////////// poster Image Edit Section /////////////
  EditPosterImage: any = 0
  PosterImageEdit: any = {};
  PosterImageEditShow: any = [];
  PosterImageEditData: any = [];
  EditEventImage() {
    this.CountPoster = 1;
    if (this.PosterEventForm.value.PosterEventImage == '') {
      // this.toastrService.error("please add event document");
      this.toastrService.error("Please select banner");
      return false
    }
    else {
      this.PosterImageEdit.posterImageName = this.PosterEventImage;
      this.PosterImageEdit.posterImagePath = this.base64textStringPosterImageEvent;
      this.PosterImageEdit.posterImageext = '.' + this.PosterEventimageext;
      this.PosterImageEdit.eventPosterId = 0;
      this.PosterImageEdit.eventId = this.EventId;
      this.PosterImageEdit.adminId = this.Adminid;


      this.PosterImageEditShow.push({
        "imageNameposter": this.imagenamePoster,
      });
      this.PosterImageEditData.push(this.PosterImageEdit);
      this.PosterImageEdit = {};
      this.base64textStringPosterImageEvent = [];
      this.PosterEventForm.controls['PosterEventImage'].setValue("");
    }
  }
  CountPoster: number = 1;
  UpdatePosterDetail() {
    this.spinnerService.show()
    if (this.CountPoster == 1) {
      this.EventService.UpdatePosterEvent(this.PosterImageEditData).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          // this.toastrService.success(this.response.message);
          this.toastrService.success("Event banner has been saved successfully.");
          //this.PosterImageEdit=[];
          this.PosterImageEditData = [];
          this.PosterImageEditShow = [];
          this.ViewEvent(this.EventId);
          this.EventView = 1;
          this.EventEditformSection = 0;
          this.EditCordinate = 0;
          this.EditGuest = 0;
          this.EditPosterImage = 0;
          this.EditFacilitedImage = 0;
          this.EditEventFormSection = 0;

        }
        else {
          this.toastrService.error(this.response.message);
        }
        this.spinnerService.hide();
      });
    }
    this.CountPoster++;
    this.ViewBack = 1;
    this.EditBack = 0;
    this.EventList = false;
  }
  modalRefPosterEventTepmData: BsModalRef;
  PusPosterEventTemplateTepmData(templatePosterEventTepmData: TemplateRef<any>) {
    this.modalRefPosterEventTepmData = this.modalService.show(templatePosterEventTepmData, { class: 'modal-sm' });
  }
  deletePosterEventTepmData(index: number) {
    this.PosterImageEditShow.splice(index, 1);
    this.PosterImageEditData.splice(index, 1);
    this.modalRefPosterEventTepmData.hide();
  }
  declineBoxPosterEventTepmData(): void {
    this.modalRefPosterEventTepmData.hide();
  }

  ///////////////////////  del functionality ////////////////
  modalRefPosterEdit: BsModalRef;
  DelPosterID: any;
  PosterTemplate(templateEditPoster: TemplateRef<any>, PosterID) {
    this.DelPosterID = PosterID;
    this.CountPoster = 1;
    this.modalRefPosterEdit = this.modalService.show(templateEditPoster, { class: 'modal-sm' });
  }
  declinePosterBox() {
    this.modalRefPosterEdit.hide();
  }
  deleteEditSectionPoster() {
    var delarray = {
      "adminId": this.Adminid,
      "eventId": this.EventId,
      "eventPosterId": this.DelPosterID,
      "status": false
    }
    this.spinnerService.show()
    if (this.CountPoster == 1) {
      this.EventService.DeletePosterEventData(delarray).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          //this.toastrService.success(this.response.message);
          this.toastrService.success("Event banner  has been deleted successfully."
          );
          this.DelPosterID = 0;
          this.ViewEvent(this.EventId);
        }
        else {
          this.toastrService.error(this.response.message);

        }
        this.spinnerService.hide()
        this.modalRefPosterEdit.hide();

      });
    }
    this.CountPoster++;
  }

  /////////////////////// End Poster Image Edit Section /////////////

  //////////////////////// Facilited Images Edit Section ////////////
  EditFacilitedImage: any = 0;
  EditFacilited: any = {};
  EditFacilitedShow: any = [];
  EditFacilitedData: any = [];
  EditFacilated() {

    this.CountFaclited = 1;
    if (this.FacilitedEventForm.value.lstEventFacilitated == '') {
      // this.toastrService.error("please add  facilitated by");
      this.toastrService.error("Please Enter Facilitated by Name");
      return false
    }
    // else if (this.FacilitedEventForm.value.FacilitatedImage == '') {
    //   this.toastrService.error("please add logo");
    //   return false
    // } 
    // if(!this.FacilitedEventForm.value.Name && !this.FacilitedEventForm.value.FacilitatedImage) {
    //   this.toastrService.error("please add at least one field");
    // } 

    else {

      this.EditFacilited.facilatedBy = this.FacilitedEventForm.value.lstEventFacilitated;
      this.EditFacilited.imageName = this.FacilityImage != '' ? this.FacilityImage : '';
      this.EditFacilited.imagePath = this.base64textStringFCI != '' ? this.base64textStringFCI : '';
      this.EditFacilited.imageext = '.' + this.Facilityimageext;
      this.EditFacilited.facilatedById = 0;
      this.EditFacilited.eventId = this.EventId;
      this.EditFacilited.adminId = this.Adminid;

      this.EditFacilitedShow.push({
        "facilatedBy": this.FacilitedEventForm.value.lstEventFacilitated,
        "imageName": this.imagenameFci,
      });

      this.EditFacilitedData.push(this.EditFacilited);
      this.EditFacilited = {};
      this.FacilitedEventForm.reset();
      this.imagenameFci = '';
      this.base64textStringFCI = [];
      this.FacilitedEventForm.controls['lstEventFacilitated'].setValue("");
      this.FacilitedEventForm.controls['FacilitatedImage'].setValue("");
    }

  }

  modalRefFaciltedEventTepmData: BsModalRef;
  PusFaciltedEventTemplateTepmData(templateFaciltedEventTepmData: TemplateRef<any>) {
    this.modalRefFaciltedEventTepmData = this.modalService.show(templateFaciltedEventTepmData, { class: 'modal-sm' });
  }


  deleteFaciltedEventTepmData(index: number) {
    this.EditFacilitedData.splice(index, 1);
    this.EditFacilitedShow.splice(index, 1);
    this.modalRefFaciltedEventTepmData.hide();
  }

  declineBoxFaciltedEventTepmData(): void {
    this.modalRefFaciltedEventTepmData.hide();
  }
  CountFaclited: number = 1;
  UpdateFacilitedDetail() {
    this.spinnerService.show()
    if (this.CountFaclited == 1) {
      this.EventService.UpdateFacilitedEvent(this.EditFacilitedData).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.EditFacilitedData = [];
          this.EditFacilitedShow = [];
          this.ViewEvent(this.EventId);
          this.EventView = 1;
          this.EventEditformSection = 0;
          this.EditCordinate = 0;
          this.EditGuest = 0;
          this.EditPosterImage = 0;
          this.EditFacilitedImage = 0;
          this.EditEventFormSection = 0;
        }
        else {
          this.toastrService.error(this.response.message);
        }
        this.spinnerService.hide();
      });

    }
    this.CountFaclited++;
    this.ViewBack = 1;
    this.EditBack = 0;
    this.EventList = false;
  }


  ///////////////////////  del functionality ////////////////
  modalRefFacilitedEdit: BsModalRef;
  DelFacilitedID: any;
  FacilitedTemplate(templateEditFacilited: TemplateRef<any>, FacilitedID) {
    this.DelFacilitedID = FacilitedID;
    this.CountFaclited = 1;
    this.modalRefFacilitedEdit = this.modalService.show(templateEditFacilited, { class: 'modal-sm' });
  }
  declineFacilitedBox() {
    this.modalRefFacilitedEdit.hide();
  }
  deleteEditSectionFacilited() {
    var delarray = {
      "adminId": this.Adminid,
      "eventId": this.EventId,
      "facilatedById": this.DelFacilitedID,
      "status": false
    }
    this.spinnerService.show()
    if (this.CountFaclited == 1) {
      this.EventService.DeleteFacilitedEventData(delarray).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.DelFacilitedID = 0;
          this.ViewEvent(this.EventId);
        }
        else {
          this.toastrService.error(this.response.message);

        }
        this.spinnerService.hide()
        this.modalRefFacilitedEdit.hide();

      });
    }
    this.CountFaclited++;
  }

  ////////////////////// End Facilited Images Edit Section ////////////


  //////////////////////// Edit section of Events form //////////////
  EditEventFormSection: any = 0;
  EditEventData(EventData: any) {
    this.EventCount = 1;
    this.ViewBack = 0;
    this.EditBack = 1;
    this.EventList = false;
    localStorage.removeItem("latlnggg")
    this.EventEditformSection = 1;
    this.EventView = 0;
    this.EditCordinate = 0;
    this.EditGuest = 0;
    this.EditPosterImage = 0;
    this.EditFacilitedImage = 0;
    this.EditEventFormSection = 1;
    //this.StartDate= EventData.startDate;
    // this.EndDate=EventData.endDate;
    this.EventEditForm.controls['eventType'].setValue(EventData.eventTypeId);
    this.EventEditForm.controls['eventName'].setValue(EventData.eventName);
    this.EventEditForm.controls['startDate'].setValue(EventData.startDate);
    //this.EventEditForm.controls['startDate'].setValue(this.StartDate);
    this.EventEditForm.controls['endDate'].setValue(EventData.endDate);
    // this.EventEditForm.controls['endDate'].setValue(this.EndDate);
    this.EventEditForm.controls['startTime'].setValue(EventData.startTime);
    this.EventEditForm.controls['endTime'].setValue(EventData.endTime);
    this.EventEditForm.controls['address'].setValue(EventData.address);
    this.EventEditForm.controls['eventDescription'].setValue(EventData.eventDescription);
    this.EventEditForm.controls['stateId'].setValue(EventData.stateId);
    this.GetAllDistrict(EventData.stateId);
    this.EventEditForm.controls['districtId'].setValue(EventData.districtId);
    this.EventEditForm.controls['lattitude'].setValue(EventData.lattitude);
    this.EventEditForm.controls['longitutde'].setValue(EventData.longitutde);
    localStorage.removeItem("lattlngt");
    if(EventData.lattitude || EventData.longitutde){
      var lattlngt = EventData.lattitude + ',' + EventData.longitutde;
      localStorage.setItem("lattlngt", lattlngt);
    }

  }

  closeViewModal() {
    this.openingModelRef.hide();
  }

  UpdateGoogleMapAddress: any = {};
  updatesenddata: any = {};
  StartDate: Date;
  EndDate: Date;
  EventCount: number = 1;
  UpdateEventdata(data) {
    if (data.districtId != " " && data.districtId != undefined && data.districtId != null) {
      var districtId = data.districtId;
    }
    else {
      this.toastrService.error('Please select District');
      return false;
    }
    this.StartDate = moment(data.startDate, "DD-MM-YYYY").toDate();
    this.StartDate.setHours(5, 31, 0);
    this.EndDate = moment(data.endDate, "DD-MM-YYYY").toDate();
    this.EndDate.setHours(28, 59, 60);
    let startdate = this.StartDate;
    let enddate = this.EndDate;
    if (data.startDate == '') {
      this.toastrService.error('Please select event start date');
      return false;
    }
    if (data.startTime == '') {
      this.toastrService.error('Please select event start time');
      return false;
    }
    if (data.endDate == '') {
      this.toastrService.error('Please select event end date');
      return false;
    }

    // if (eventstarttime < '06') {
    //   this.toastrService.error('Events timing must be between 6 am to 10 pm');
    //   return false;
    // }
    if (data.endTime == '') {
      this.toastrService.error('Please select event end time');
      return false;
    }

    // if (eventendtime > '22:00') {
    //   this.toastrService.error('Events timing must be between 6 am to 10 pm');
    //   return false;
    // }
    if (startdate > enddate) {

      this.toastrService.error('Start date cannot be greater than end date.');
      return false;
    }

    this.spinnerService.show();
    var ltlg = localStorage.getItem("latlnggg");
    var GoogleMapAdd = localStorage.getItem("GoogleMapAdd");
    var MapDetailsArr = ltlg.split(',');
    if (MapDetailsArr != null) {
      this.UpdateGoogleMapAddress.Latitude = MapDetailsArr[0];
      this.UpdateGoogleMapAddress.Longtitute = MapDetailsArr[1];
      this.UpdateGoogleMapAddress.Locationmapaddress = GoogleMapAdd;
    }
    else {
      this.UpdateGoogleMapAddress.Latitude = '';
      this.UpdateGoogleMapAddress.Longtitute = '';
      this.UpdateGoogleMapAddress.Locationmapaddress = '';
    }

    if (this.UpdateGoogleMapAddress.Latitude !== undefined && this.UpdateGoogleMapAddress.Latitude != '') {
      this.UpdateGoogleMapAddress.Latitude = this.UpdateGoogleMapAddress.Latitude;
    }
    else {
      this.UpdateGoogleMapAddress.Latitude = data.lattitude;

    } if (this.UpdateGoogleMapAddress.Longtitute !== undefined && this.UpdateGoogleMapAddress.Longtitute != '') {
      this.UpdateGoogleMapAddress.Longtitute = this.UpdateGoogleMapAddress.Longtitute;
    }
    else {
      this.UpdateGoogleMapAddress.Longtitute = data.lattitude;

    }
    if (this.UpdateGoogleMapAddress.Locationmapaddress !== undefined && this.UpdateGoogleMapAddress.Locationmapaddress != '') {
      this.UpdateGoogleMapAddress.Locationmapaddress = this.UpdateGoogleMapAddress.Locationmapaddress;
    }
    else {
      this.UpdateGoogleMapAddress.Locationmapaddress = data.googleMapAdd;;

    }
    // var mystartDate = moment(data.startDate).format('DD/MM/YYYY')  
    // var myendDate = moment(data.endDate).format('DD/MM/YYYY')
    // var mystartDate = moment(data.startDate,'YYYY/MM/DD')  
    // var myendDate = moment(data.endDate,'YYYY/MM/DD')
    //var mydate = moment('15/11/2000', 'DD/MM/YYYY'); 
    //this.StartDate = moment.utc(data.startDate).format('YYYY/MM/DD');
    //this.EndDate = moment.utc(data.endDate).format('YYYY/MM/DD');


    ///////////////////////////

    // moment(data.startDate,'dd/mm/yyyy').toISOString();
    // "2019-05-31T18:44:00.000Z"
    // moment(data.startDate,'dd/mm/yyyy').toISOString("YYYY-MM-DD");
    // "2019-05-31T18:44:00.000Z"

    ///////////////////////////////////////////////////
    this.StartDate = moment(data.startDate, "DD-MM-YYYY").toDate();
    this.StartDate.setHours(5, 31, 0);
    this.EndDate = moment(data.endDate, "DD-MM-YYYY").toDate();
    this.EndDate.setHours(5, 31, 0);
    this.updatesenddata = {
      // eventId: data.eventId,
      eventName: data.eventName.trim(),
      adminId: this.AdminId,
      eventType: data.eventType,
      // startDate: data.startDate,
      startDate: this.StartDate,
      startTime: data.startTime,
      // endDate: data.endDate,
      endDate: this.EndDate,
      endTime: data.endTime,
      address: data.address.trim(),
      stateId: data.stateId,
      districtId: data.districtId,
      lattitude: this.UpdateGoogleMapAddress.Latitude,
      longitutde: this.UpdateGoogleMapAddress.Longtitute,
      googleMapAdd: this.UpdateGoogleMapAddress.Locationmapaddress,
      eventDescription: data.eventDescription!=null && data.eventDescription!=undefined?data.eventDescription.trim():null,
      source: 'Admin',
      sourceId: this.AdminId,
      eventId: this.EventId != '' ? this.EventId : 0,
      userName: ''
    }

    if (this.EventCount == 1) {
      this.EventService.UpdateEvent(this.updatesenddata).subscribe(res => {
        this.response = res;
        if (this.response != null) {
          this.toastrService.success(this.response.message);
          this.updatesenddata = [];
          this.ViewEvent(this.EventId);
          this.EventView = 1;
          this.EventEditformSection = 0;
          this.EditCordinate = 0;
          this.EditGuest = 0;
          this.EditPosterImage = 0;
          this.EditFacilitedImage = 0;
          this.EditEventFormSection = 0;
        }
        else {
          this.toastrService.error(this.response.message);
        }
        this.spinnerService.hide();
        this.spinnerService.hide();

      });
    }

    this.ViewBack = 1;
    this.EditBack = 0;
    this.EventList = false;
    this.EventCount++;
    localStorage.removeItem("lattlngt");
    localStorage.removeItem("latlnggg");
  }

  nospace(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 32) {
      return false;
    }
    return true;
  }

  minDates: any;
  maxDates: any;
  startminDate: any=new Date();;
  MinDate(minValue: any): void {
    if (minValue != null) {
      this.minDates = minValue;
    }
  }

  MaxDate(maxValue: any) {
    if (maxValue != null) {
      this.maxDates = maxValue;
    }
  }


  EventsGallery(eventId) {
    // this.router.navigate(['/EventsGallery'], { queryParams:  eventId, skipLocationChange: true}); 

    this.router.navigate(['/EventsGallery', { EventId: btoa(eventId) }]);

  }

  /////////////////////// End Edit Events Section Form ///////////////
}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
//End Here Google map Area