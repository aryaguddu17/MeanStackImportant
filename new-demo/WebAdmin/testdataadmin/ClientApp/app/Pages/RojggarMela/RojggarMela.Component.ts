import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, Input, NgZone } from '@angular/core';
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
import { Options } from 'ng5-slider';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
//import { RojggarMelaService } from '../../Services/RojggarMela.service';
import *as moment from 'moment';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

declare var google: any;
@Component({
  selector: 'app-RojggarMelaComponent',
  templateUrl: './RojggarMela.Component.html',
})
export class RojggarMelaComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  @ViewChild('JobForms') JobForms: HTMLFormElement;
  CurrentDate: Date = new Date();

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
  RojgaarMelaForm: FormGroup;
  status = true;
  mintoDate: any;
  minDate = new Date();

  Logintype: string = "";
  JobFormDesable: boolean = true;


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
  // google map 



  constructor(private RojggarMelaService: RojggarMelaService
    , private appConfig: AppConfig
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
      this.UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
      this.Logintype = this.UserInfo.loginType;
    } catch  { }
  }




  ngOnInit() {
    window.scroll(0, 0);


    // this.mintoDate=new Date();
    // this.mintoDate.setDate(this.mintoDate.getDate() + 1);

    this.RojgaarMelaForm = this.formBuilder.group({
      FareType: ['', [Validators.required,]],
      EventName: ['', [Validators.required,]],
      Venue: ['', [Validators.required,]],
      Description: ['', [Validators.required,]],
      FacilatedBy: ['', [Validators.required,]],
      ChiefGuest: ['', [Validators.required,]],
      ValidDateTo: ['', [Validators.required,]],
      ValidDateFrom: ['', [Validators.required,]],
      StateID: ['', [Validators.nullValidator,]],
      DistrictID: ['', [Validators.nullValidator,]],
      CityID: ['', [Validators.nullValidator,]],
      melafromtime: ['', [Validators.required]],
      melatotime: ['', [Validators.required]],

      // for contact in job opening

    });


    this.GetAllEvent();
    this.GetAllStates();
    this.serverDateTime();
  }

  Sector: any = [];

  serverDate: any;
  serverDateTime() {
    this.masterService.GetServerDateTime().subscribe(res => {
      if (res) {
        this.serverDate = res;
        this.mintoDate = moment.utc(this.serverDate).toDate();
        this.mintoDate.setDate(this.mintoDate.getDate() + 1);
      } else {
        this.mintoDate = new Date();
        this.mintoDate.setDate(this.mintoDate.getDate() + 1);
      }
    })
  }
  item: any;
  Adminid: any;
  EventList: any;
  GetAllEvent() {
    try {
      this.item = localStorage.getItem('phpadminid');
      this.Adminid = parseInt(JSON.parse(this.item));
      this.RojggarMelaService.GetAllEvent(this.Adminid).subscribe(res => {
        this.DBResponce = res;
        if (this.DBResponce.lstGetEventType != null) {
          this.EventList = this.DBResponce.lstGetEventType;
        }
        else {
          this.EventList = [];
        }
      });
    } catch  { }
  }
  Trade: any = [];
  Getalltrade(trade: any) {
    try {
      if (trade != null && trade != '') {
        this.masterService.GetAllMrigsTrade(0, trade).subscribe(res => {
          this.DBResponce = res;
          if (this.DBResponce.lstTrade != null) {
            this.Trade = this.DBResponce.lstTrade;
          }
          else {
            this.Trade = [];
          }
        });
      }
      else {
        this.Trade = [];
      }
    } catch  { }
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
  validateWeight(weight) {

  }


  private GetAllJoiningPriority() {
    try {
      this.masterService.GetJoiningPrority().subscribe(res => {
        this.joiningpriority = res

        if (this.DBResponce != null && this.DBResponce.length > 0) {
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

    this.GetAllDistrict(statename);
    this.GetAllCity(statename);
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

  GetAllDistrict(id: any) {
    try {
      if (id != null && id != '') {
        this.masterService.GetAllDistrict(id).subscribe(res => {
          this.district = res;
          if (this.district != null && this.district.length > 0) {
            this.district = this.district;

          }
          else {
            this.district = [];
          }
        });
      }
      else {
        this.district = [];
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



  addFieldValue() {

  }



  Back() {
    this._location.back();
  }

  GenderInvalid: boolean = false;

  EventData: any = {};
  submitevent() {
    this.EventData.adminId = this.Adminid
    this.EventData.eventType = this.RojgaarMelaForm.value.FareType;
    this.EventData.eventName = this.RojgaarMelaForm.value.EventName
    this.EventData.startDate = this.RojgaarMelaForm.value.ValidDateTo;
    this.EventData.endDate = this.RojgaarMelaForm.value.ValidDateFrom;
    this.EventData.startTime = this.RojgaarMelaForm.value.melafromtime;
    this.EventData.endTime = this.RojgaarMelaForm.value.melatotime;
    this.EventData.address = this.RojgaarMelaForm.value.Venue;
    this.EventData.stateId = this.RojgaarMelaForm.value.StateID;
    this.EventData.districtId = this.RojgaarMelaForm.value.DistrictID;
    this.EventData.lattitude = '';
    this.EventData.longitutde = '';
    this.EventData.eventDescription = this.RojgaarMelaForm.value.Description;
    this.RojggarMelaService.SaveEvent(this.EventData).subscribe(res => {
      this.DBResponce = res;
      if (this.DBResponce != null) {
        this.toastrService.success(this.DBResponce.message);
        this.RojgaarMelaForm.reset();
      }
      else {
        this.toastrService.error(this.DBResponce.message);
      }
    });
  }

  openingModelRef: BsModalRef;


  geoLocation(template: TemplateRef<any>, item: any) {
    if (this.GMLtlgStatus == true) {
      localStorage.removeItem("lattlngt");
    }
    this.openingModelRef = this.modalService.show(template, { class: 'modal-sm-md' });
  }

  showAddButton: boolean = true;
  showviewButton: boolean = false;
  contactEmailValue: any;
  contactMobileValue: any;
  contactDesignation: any;
  contactName: any;


  closeContactModal() {
    this.openingModelRef.hide();
  }




  //Google Map Area

  latitude: any;
  longitude: any;
  lat: any;
  lng: any;


  getLatLang(LtLg) {


  }

  addGeoLocation() {
    var MpAddress = localStorage.getItem("address");
    var LatitLangt = localStorage.getItem("latlnggg");
    var GoogleMapAdd = localStorage.getItem("GoogleMapAdd");

    var SpliteLatLng = LatitLangt.split(',');
    this.MapLatititute = SpliteLatLng[0];
    this.MapLongitute = SpliteLatLng[1];
    this.MapAddress = GoogleMapAdd;

    var spliteAdddress = MpAddress.split(',');
    if (spliteAdddress.length > 1) {
      var trimState = spliteAdddress[1].trim();
      var stateData = trimState.split(' ');
      for (var i = stateData.length; i >= stateData.length; i--) {
        if (i == 5) {
          var stateAdd = stateData[i - 5] + ' ' + stateData[i - 4] + ' ' + stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 4) {
          var stateAdd = stateData[i - 4] + ' ' + stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 3) {
          var stateAdd = stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 2) {
          var stateAdd = stateData[i - 2];
        }
        this.GoogleMapState = stateAdd.toUpperCase();
      }

      if (this.GoogleMapState && this.GoogleMapState != '') {
        var mapState = this.GoogleMapState;
        var statename = (this.lstState).filter(function (entry) {
          return entry.stateName == mapState;
        });
        if (statename && statename != '') {
          this.RojgaarMelaForm.controls['StateID'].setValue(statename[0]['id']);
        }
      }

      if (spliteAdddress[0] && spliteAdddress[0] != '') {
        var mapDistUpper = spliteAdddress[0].trim();
        var mapDist = mapDistUpper.toUpperCase();
        var mapDistName = (this.district).filter(function (entry) {
          return entry.districtName == mapDist;
        });
        if (mapDistName && mapDistName != '') {
          this.RojgaarMelaForm.controls['DistrictID'].setValue(mapDistName[0]['id']);
        }
      }

    } else if (spliteAdddress.length == 1) {
      var trimState = spliteAdddress[0].trim();
      var stateData = trimState.split(' ');
      for (var i = stateData.length; i >= stateData.length; i--) {
        if (i == 5) {
          var stateAdd = stateData[i - 5] + ' ' + stateData[i - 4] + ' ' + stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 4) {
          var stateAdd = stateData[i - 4] + ' ' + stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 3) {
          var stateAdd = stateData[i - 3] + ' ' + stateData[i - 2];
        } else if (i == 2) {
          var stateAdd = stateData[i - 2];
        }
        this.GoogleMapState = stateAdd.toUpperCase();
      }

      if (this.GoogleMapState && this.GoogleMapState != '') {
        var mapState = this.GoogleMapState;
        var statename = (this.lstState).filter(function (entry) {
          return entry.stateName == mapState;
        });
        if (statename && statename != '') {
          this.RojgaarMelaForm.controls['StateID'].setValue(statename[0]['id']);
        }
      }
    }
    this.openingModelRef.hide();
  }

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
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': mapAddress
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latt = results[0].geometry.location.lat();
        var lngt = results[0].geometry.location.lng();
        var latlng = latt + ',' + lngt;
        localStorage.setItem("lattlngt", latlng);
      }
    });
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
//End Here Google map Area