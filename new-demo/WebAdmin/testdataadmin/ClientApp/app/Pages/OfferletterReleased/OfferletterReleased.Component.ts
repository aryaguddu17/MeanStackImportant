import { Component, OnInit, HostListener, ViewChild, TemplateRef, AfterViewInit, Input, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { JobpostService } from '../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, CarouselModule } from 'ngx-bootstrap';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
import { EventService } from '../../Services/Event.service';
import { DatePipe } from '@angular/common';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { HeaderColumnGroup } from 'primeng/components/common/shared';
import { forEach } from '@angular/router/src/utils/collection';
import { OfferletterReleasedService } from '../../Services/OfferletterReleased.service';
import { CommonViewLayoutComponent } from '../CommonModelView/CommonView-Layout.Component';

@Component({
  selector: 'app-OfferletterReleasedComponent',
  templateUrl: './OfferletterReleased.Component.html',
})
export class OfferletterReleasedComponent implements OnInit {
  @ViewChild(CommonViewLayoutComponent) private mymodel: CommonViewLayoutComponent;

  constructor(
    private EventService: EventService
    , private RojggarMelaService: RojggarMelaService
    , private toastrService: ToastrService
    , private masterService: MasterService
    , private jobpostService: JobpostService
    , private modalService: BsModalService
    , private formBuilder: FormBuilder
    , private activatedRoute: ActivatedRoute
    , private router: Router
    , private CarouselModule: CarouselModule,
    private datePipe: DatePipe
    , private spinnerService: Ng4LoadingSpinnerService,
    private OfferletterReleasedService: OfferletterReleasedService) {
    try {

    } catch  { }
  }

  ApplyFilterShow = 1;
  EListShow: any = 1;
  EDetailsShow: any = 0;
  ViewBack: any = 0;
  EditBack: any = 0;
  response: any = [];
  GetRegisteredEventList: any = [];
  from: any;
  pagenumber: number = 0;
  delay: boolean = false;
  EventListStatus: boolean = false;
  Eventlistshow: any = 1;
  item: any;
  Adminid: any;
  EventView: any = 0;
  ngOnInit() {
    this.item = localStorage.getItem('phpadminid');
    this.Adminid = parseInt(JSON.parse(this.item));
    this.FilterForm();
    this.GetAllStates();
    this.GetAllEventType();
    this.GetEventList(0, '');
  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if (this.EventListStatus) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if ($(window).scrollTop() == ($(document).height() - $(window).height())) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.GetRegisteredEventList.length >= 10 && this.EventListStatus) {
          this.pagenumber = this.pagenumber + 1;
          this.GetEventList(this.pagenumber, 'scroll');
        }
      }
    }
  }

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

  BackToEventList() {
    this.getcandidatereslist = [];
    this.getcandidatereslistimage = [];
    this.EventDetail = 0;
    this.showCandidateTable = 0;
    this.ApplyFilterShow = 1;
    this.Eventlistshow = 1;
    this.GetEventList(0, '');
  }

  GetEventList(pagenumber: any, from: any) {
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
          this.from = '';
        }
        this.delay = false;
        this.EventListStatus = true;
      });
    }

  }

  EventtypeList: any;
  DBResponce: any = [];
  lstState: any = [];
  district: any = [];
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

  GetAllStates() {
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
    this.GetAllDistrict(statename);
  }

  GeolocationShow: any = 0;
  GetAllDistrict(id: any) {
    try {
      if (id != null && id != '' && id != undefined) {
        this.district = [];
        this.FilterEventForm.controls['districtId'].setValue("");
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


  EventReset() {
    this.FilterEventForm.reset();
    this.pagenumber = 0;
    this.GetEventList(this.pagenumber, '');

  }

  /////// For View More button Toggle ////////
  toggle: boolean = false;
  texttoggle: any = 'View More';
  DbResponse: any = [];
  ShowEvent: any = [];
  ImageData: any = [];
  PageNumber: number = 0;
  togglediv() {
    this.toggle = !this.toggle;
    if (this.texttoggle == 'View More') {
      this.texttoggle = 'View Less';
    }
    else {
      this.texttoggle = 'View More';
    }
  }

  EventViewData: any = []
  EventId: any = 0;
  EventDetail: number = 0;
  employerDetail: any = [];
  showCandidateTable: number = 0;
  getcandidateres: any = [];
  getcandidatereslist: any = [];
  getcandidatereslistimage: any = [];
  finalcanddata: any = [];
  ViewEvent(EventId: any) {//Use to get evnet list,candidate list,employer list
    this.spinnerService.show();
    this.EventListStatus = false;
    this.EListShow = 0;
    this.EDetailsShow = 0;
    this.ApplyFilterShow = 0;
    this.Eventlistshow = 0;
    this.EventDetail = 1;
    this.showCandidateTable = 1;
    this.EventView = 1;
    this.ViewBack = 1;
    this.EditBack = 0;
    var EventId = EventId;
    this.Adminid = parseInt(JSON.parse(this.item));
    this.EventService.GetEventDetailIdWise(this.Adminid, EventId).subscribe(res => {
      this.response = res;
      if (this.response.adminGetEventDetailIdWise != null) {
        this.EventViewData = this.response.adminGetEventDetailIdWise[0];
        this.EventId = this.EventViewData.eventId;

        var senddata = {
          // 'eventId': this.EventId,
          'eventId': EventId,
          'stateId': 0,
          'districtId': 0,
          'search': ''
        }
        this.RojggarMelaService.EmployerEventList(senddata).subscribe(res => {
          this.DbResponse = res;
          if (this.DbResponse.lstGetEventEmployerList.length > 0) {
            this.employerDetail = this.DbResponse.lstGetEventEmployerList;
            // var getsenddatabyid = {

            //   'Eventid': EventId
            // }
            // let getserializeddatabyid = JSON.stringify(getsenddatabyid);

            // let getdatabylogind = {
            //   'HSTPLRequest': {
            //     'data': getserializeddatabyid,
            //     'typeFor': 'EventOfferedStatus',
            //   }
            // }
            // this.RojggarMelaService.GetData(getdatabylogind).subscribe(res => {
            //   this.getcandidateres = res;
            //   if (this.getcandidateres.hstplResponse.status == true) {
            //     this.getcandidatereslist = JSON.parse(this.getcandidateres.hstplResponse.data);

            //     this.getcandidatereslistimage = JSON.parse(this.getcandidateres.hstplResponse.lstImage);
            //   }
            //   else {
            //     this.getcandidatereslist = [];
            //   }
            // })

            this.spinnerService.hide();
          }
          else {
            this.employerDetail = [];
            this.spinnerService.hide();
          }
        });

        var getsenddatabyid = {
          'eventId': EventId,
          'userId': 0
        }
        let getserializeddatabyid = JSON.stringify(getsenddatabyid);

        let getdatabylogind = {
          'HSTPLRequest': {
            'data': getserializeddatabyid,
            'typeFor': 'AdminGetEventOfferLetter',
          }
        }
        this.OfferletterReleasedService.GetDataCandidateoffered(getdatabylogind).subscribe(res => {
          this.getcandidateres = res;
          if (this.getcandidateres.hstplResponse.status == true) {
            this.getcandidatereslist = JSON.parse(this.getcandidateres.hstplResponse.data);

            this.getcandidatereslistimage = JSON.parse(this.getcandidateres.hstplResponse.lstImage);
          }
          else {
            this.getcandidatereslist = [];
          }
        });

        this.spinnerService.hide();
      }
      else {
        this.EventViewData = [];
        this.EventId = 0;
        this.spinnerService.hide();
      }
    });
  }

  Getcandidatelist() {

  }
  EmployerId: any = '';
  CompanyId: any;

  GetEmployerId(id, EventViewData: any) {
    this.CompanyId = id;
    // alert(this.CompanyId);
    if (this.CompanyId == '' || this.CompanyId == null || this.CompanyId == undefined) {
      this.getcandidatereslist = [];
      this.getcandidatereslistimage = [];
      return false;
    }
    var Eventid = EventViewData.eventId;
    // alert(Eventid);
    var getsenddatabyid = {
      'eventId': Eventid,
      'userId': this.CompanyId
    }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);

    let getdatabylogind = {
      'HSTPLRequest': {
        'data': getserializeddatabyid,
        'typeFor': 'AdminGetEventOfferLetter',
      }
    }
    this.OfferletterReleasedService.GetDataCandidateoffered(getdatabylogind).subscribe(res => {
      this.getcandidateres = res;
      if (this.getcandidateres.hstplResponse.status == true) {
        this.getcandidatereslist = JSON.parse(this.getcandidateres.hstplResponse.data);

        this.getcandidatereslistimage = JSON.parse(this.getcandidateres.hstplResponse.lstImage);
      }
      else {
        this.getcandidatereslist = [];
      }
    });

  }

  base64textString: any = [];
  img: any;
  imgGstName: any;
  imgPanName: any;
  panImage: any;
  currentFile1: any;
  currentFile: any;
  ValidImageTypes: any;
  onUploadChange(evt: any, sf: any) {
    this.img = sf;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      // this.CompanyProfileForm.controls['ImgName'].setValue('');
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
    }
    if (this.img == 'gstImg') {

      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else if (this.img == 'panImg') {
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
      $("#fileProfile").val('');

      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
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

  imagename: string = '';
  imageext: any = '';
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;

    var imn2 = imn.split('.');
    this.imagename = imn2[0];
    this.imageext = '.' + imn2[1];
    this.base64textString = 'data:image/png;base64,' + btoa(e.target.result);
  }

  hem: any = '';
  ListIndex: any;
  data: any = [];
  addCandidate(item, hem) {//Use to add the offer letter of candidate

    if (this.CompanyId == "" || this.CompanyId == undefined || this.CompanyId == 0) {
      this.toastrService.error("Please select Employer");
      return false;
    }

    if ($("#" + "OfferDate" + hem).val() != "") {
      var OfferDate = $("#" + "OfferDate" + hem).val() + "T00:00:00.000Z";
    } else {
      this.toastrService.error("Please add Offer Date");
      return false;
    }


    if ($("#" + "JoiningDate" + hem).val() != "") {
      var JoiningDate = $("#" + "JoiningDate" + hem).val() + "T00:00:00.000Z";

    } else {
      JoiningDate = "";
    }

    var Designation = $("#" + "Designation" + hem).val();
    var imagename = this.imagename;
    var imagepath = this.base64textString;
    if (imagepath == '' || imagepath == null) {
      this.toastrService.error("Please select offer letter");
      return false;
    }

    var imageext = this.imageext;
    var getsenddatabyid = {
      'companyId': this.CompanyId, 'candId': item.candId, 'designation': Designation, 'offerLetterDate': OfferDate, 'joiningDate': JoiningDate, 'adminId': this.Adminid, 'eventId': this.EventId,
    }
    var lstImage1 = {
      'OfferletterImageName': imagename, 'OfferletterImageExt': imageext, 'OfferletterImagePath': imagepath
    }
    var lstImage = JSON.stringify(lstImage1);

    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    let getdatabylogind = {
      'HSTPLRequest': {
        'data': getserializeddatabyid,
        'typeFor': 'AdminSetEventOfferReleased',
        'lstImage': lstImage,
      }
    }
    this.RojggarMelaService.SetData(getdatabylogind).subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse.hstplResponse.status == true) {
        this.toastrService.success(this.DbResponse.hstplResponse.message);
        this.spinnerService.show();
        this.ViewEvent(this.EventId);
      } else {
        this.toastrService.error(this.DbResponse.hstplResponse.message);
      }
    });
  }
  OfferletterDetail: any = [];
  offerletimg1: any = [];
  offerletimg: any = [];
  path: any = "";
  modalRefForOffer: BsModalRef;
  GetOfferLetterDetail(item, index, template6, GetOfferLetterDetail: TemplateRef<any>) {
    this.OfferletterDetail = item;
    this.offerletimg1 = GetOfferLetterDetail;
    for (let i = 0; i < this.offerletimg1.length; i++) {
      this.offerletimg = this.offerletimg1[i];
      if (this.offerletimg.ID == this.OfferletterDetail.candId) {
        this.path = this.offerletimg.OfferletterImagepath
      }
    }

    this.modalRefForOffer = this.modalService.show(template6,
      { backdrop: 'static', keyboard: false });
  }
  CloseOfferLetter() {
    this.modalRefForOffer.hide()
  }

  openOfferLetter(candidateId: any) {
    var imageurl = this.getcandidatereslistimage.find(item => item.ID === candidateId);
    var offerletterUrl = imageurl.OfferletterImagepath;
    window.open(offerletterUrl, '_blank');
  }


  viewcandidateProfile(candiID: any, apitype: any) {
    this.mymodel.callMethod(candiID, apitype);
  }
}
