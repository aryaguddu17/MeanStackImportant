import { Component, OnInit, HostListener, ViewChild, TemplateRef, AfterViewInit, Input, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { MasterService } from '../../Services/master.service';
import { JobpostService } from '../../Services/jobpost.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { BsModalRef, BsModalService, CarouselModule } from 'ngx-bootstrap';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
import { EventService } from '../../Services/Event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-EventsGalleryComponent',
  templateUrl: './EventsGallery.Component.html',
})
export class EventsGalleryComponent implements OnInit {

//  EventList: FormGroup;
  EventAdd: FormGroup;
  myInterval = 5000;
  activeSlideIndex = 0;
  Slider: number = 0;

  constructor(
    private EventService: EventService,
    private RojggarMelaService: RojggarMelaService
    , private toastrService: ToastrService
    , private masterService: MasterService
    , private jobpostService: JobpostService
    , private modalService: BsModalService
    , private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
    , private router: Router
    , private CarouselModule: CarouselModule,
    private datePipe: DatePipe
    , private spinnerService: Ng4LoadingSpinnerService) {
    try {

    } catch  { }
  }

  EventImageShow: any = 1;
  AddImage: number = 0;
  AddImageButton = 1;
  ngOnInit() {

    this.EventId = parseInt(atob(this.activatedRoute.snapshot.paramMap.get('EventId')));
    this.serverDateTime();

    // this.EventList = this.formBuilder.group({
    //   EventId: ['', [Validators.nullValidator,]],
    // });
    this.EventAdd = this.formBuilder.group({
      EventTitle: ['', [Validators.nullValidator]],
      eventImg  : ['', [Validators.nullValidator]],
    });
    this.item = localStorage.getItem('phpadminid');
    this.AdminId = parseInt(JSON.parse(this.item));
    this.GetEmployerList();
  }

  activeSlider(templatePosterEvent: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatePosterEvent, { class: 'col-md' });
  }

  gettodaydate: any = [];
  today: any;
  serverDate: any;
  serverDateTime() {
    this.masterService.GetServerDateTime().subscribe(res => {
      if (res) {
        this.serverDate = res;
        this.gettodaydate = this.serverDate.toString().slice(0, 10).trim();
        this.today = this.datePipe.transform(this.gettodaydate, 'dd-MM-yyyy');
        // this.today=this.gettodaydate+'T00:00:00+00:00';
      } else {
        this.gettodaydate = [];
      }
    });
  }

  EventImageForm() {
    this.GellaryEventList=false;
    this.AddImage = 1;
    this.AddImageButton = 0
    this.EventImageShow = 0;
  }

  // onChangeEvent(eventid) {
  //   this.EventId = parseInt(eventid);
  //   this.GetEmployerList();
  // }
  GellaryEventList:boolean=false;
  DbResponse: any = [];
  ShowEvent: any = [];
  ImageData: any = [];
  PageNumber: number = 0;
  GetEmployerList() {
    var SendData = {
      'eventFlag': "OLD",
      'stateId': 0,
      'districtId': 0,
      'eventType': 0,
      'searchKey': '',
      'startDate': null,
      'endDate': null,
      'pagenumber': 0,
      'REGISTRATIONSTATUS': 0
    }
    var getdata = {
      'Adminid': this.AdminId,
      'eventId': this.EventId,
      'Page': this.PageNumber
    }
    // this.RojggarMelaService.GetEventsForEmployer(SendData).subscribe(res => {
    //   this.DbResponse = res;
    //   if (this.DbResponse.lstRojgaarEventList.length != 0) {
    //     this.ShowEvent = this.DbResponse.lstRojgaarEventList;
    //     this.EventList.controls['EventId'].setValue(this.EventId);

        this.RojggarMelaService.GetEventImage(getdata).subscribe(res => {
          this.DbResponse = res;
          if (this.DbResponse.lstRojgaarEventList.length != 0) {
            this.GellaryEventList=false;
            this.ImageData = this.DbResponse.lstRojgaarEventList;
            this.spinnerService.hide();
          }else {
            this.GellaryEventList=true;
            this.ImageData=[];
          }
        });
    //   }
    // });
  }

  eventgallaryimagecount:number=1;
  UploadEventImages() {//Use to submit the image
    if(this.eventgallaryimagecount==1){
    this.spinnerService.show();
    this.RojggarMelaService.AddEventImage(this.PosterImageAddData).subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse.responseResult == true) {
        this.toastrService.success(this.DbResponse.message);
        this.PosterImageAddData = [];
        this.PosterImageAddShow = [];
        this.EventImageShow = 1;
        this.AddImageButton = 1;
        this.AddImage = 0;
        this.GetEmployerList();
      }
      else {
        this.toastrService.error(this.DbResponse.message);
      }
    });
  }
  this.eventgallaryimagecount++;
  }


  modalRef: BsModalRef;
  PusPosterEventTemplate(templatePosterEvent: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templatePosterEvent, { class: 'modal-sm' });
  }

  deletePosterEvent(index: number) {
    this.PosterImageAddShow.splice(index, 1);
    this.PosterImageAddData.splice(index, 1);
    this.EventAdd.controls['eventImg'].setValue('');
    this.modalRef.hide();
  }


  BackToEventImage() {
    this.PosterImageAddShow=[];
    this.AddImage = 0;
    this.AddImageButton = 1;
    this.EventImageShow = 1;
    this.GetEmployerList();
  }

  BackToEvent() {
    this.router.navigate(['/CreateEvents']);
    // this.router.navigate(['/JobList', { Redirection: btoa('1') }]);
  }

  EventId: any = '';
  AdminId: any;
  PosterImageAdd: any = {};
  PosterImageAddShow: any = [];
  PosterImageAddData: any = [];
  AddEventImage() {//Use to add the image before submit
     this.eventgallaryimagecount=1;
    if (this.ImgName == '' || this.ImgName == undefined) {
      this.toastrService.error("please add event Image");
      return false
    }
    else {
      this.PosterImageAdd.ImageName = this.ImgName != '' ? this.ImgName : '';
      this.PosterImageAdd.ImagePath = this.ImgBase64 != '' ? this.ImgBase64 : '';
      this.PosterImageAdd.eventId = this.EventId;
      this.PosterImageAdd.Adminid = this.AdminId;
      this.PosterImageAdd.Gallerytype = "EVENT";
      this.PosterImageAdd.Title = this.EventAdd.controls.EventTitle.value;
      this.PosterImageAdd.imageext = '.' + this.ImgExtention;
      this.EventAdd.controls.EventTitle.setValue("");
      this.PosterImageAddShow.push({
        "imageNameposter": this.imagenamePoster,
        "imgtitle":this.PosterImageAdd.Title
      });
      this.PosterImageAddData.push(this.PosterImageAdd);
      this.PosterImageAdd = {};
      this.ImgBase64 = [];
      this.imagenamePoster = '';
      this.ImgName = '';
      this.EventAdd.controls['eventImg'].setValue('');
    }
  }

  ImageId: any;
  DeleteGalleryImage(GalleryImageDelete: TemplateRef<any>, id) {
    this.ImageId = id;
    this.modalRef = this.modalService.show(GalleryImageDelete, { class: 'modal-sm' });
  }

  deleteImage() {//Use to delete the image
    var DataSend = {
      'Adminid': this.AdminId,
      'Imagestatus': 0,
      'ID': this.ImageId
    }
    this.spinnerService.show();
    this.RojggarMelaService.DeleteImage(DataSend).subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse.responseResult == true) {
        this.toastrService.success(this.DbResponse.message);
        // redirect to homepage
        this.GetEmployerList();
        this.modalRef.hide();
        //this.GetEmployerList();
      }
      else {
        this.toastrService.error(this.DbResponse.message);
        this.modalRef.hide();
      }
    });
  }

  declineBox() {
    this.modalRef.hide();
  }


  item: any;
  base64textString: any = [];
  currentFile1: any;
  currentFile: any;
  ValidImageTypes: any;
  onUploadChangePic(evt: any) {
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
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

  base64textStringShop: any = [];
  base64textStringPanGst: any = [];
  base64textStringAgent: any = [];
  imgName: any;
  ImgExtention: any;
  ImgName: any;
  ImgBase64: any;
  imagenamePoster: any = '';
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    var imn4 = imn.split('.');
    this.imgName = imn;
    this.ImgExtention = imn4[1];
    this.ImgName = imn4[0];
    this.ImgBase64 = 'data:image/png;base64,' + btoa(e.target.result);
    this.base64textStringAgent.push('data:image/png;base64,' + btoa(e.target.result));
    for (var i = 0; i < this.base64textStringAgent.length; i++) {
      this.imagenamePoster = '';
      this.imagenamePoster = this.base64textStringAgent[i]
    }
  }
}
