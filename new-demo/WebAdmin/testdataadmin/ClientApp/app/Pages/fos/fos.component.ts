import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit, HostListener, ɵConsole, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../Services/jobpost.service';
import { FosService } from './../../Services/fos.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import * as CryptoJS from 'crypto-js';
import { Parser } from '@angular/compiler';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';



@Component({
  selector: 'app-fos',
  templateUrl: './fos.component.html',
  styleUrls: ['./fos.component.css']
})
export class FosComponent implements OnInit {
  @ViewChild('popmodel') popmodel: ElementRef;
  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you sure you want to delete';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  data: any;
  Response: any = [];
  alluserdetail: any = [];
  allfosdetail: any = [];
  singleuserdetail: any = [];
  deleteuser: any = [];
  singleuserupdatedetails: any = [];
  singleusereditdetails: any = [];
  item: any;
  Usermanagementid: any;
  cardview: any = '1';
  formview: any = '1';
  singledetailsview: any = '1';
  Editview: any = '1';
  pageNumber: number = 0;
  fosForm: FormGroup;
  updatefosForm: FormGroup;
  updatepasswordForm: FormGroup;
  key: any = 'iamskillindiafriendlyemp';
  postdata: any = {};
  isReadOnly = true;
  PageNumber = 0;
  delay: boolean = false;
  postion: number = 0;
  viewfalse: any = '1';
  from: any;
  modalRef: BsModalRef;
  AgencyList: FormGroup;
  GetReportData:any;
  BackToDashboard:boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private FosService: FosService,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private registService: RegistrationService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) { }


  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      this.postion = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;

      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.paginatedata.length >= 10 && this.viewfalse == '1') {
          this.PageNumber = this.PageNumber + 1;
          this.getFosDetails(this.PageNumber, 'scroll')
        }
        if (this.paginatedata.length >= 10 && this.viewfalse2 == '1') {
          this.PageNumber = this.PageNumber + 1;
          this.getEmployerList(this.agentID, this.PageNumber, 'scroll')
        }
      }
    }
  }

  ngOnInit() {
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
    this.fosForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail, CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'password': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces
        , CustomValidators.PasswordPolicy
      ])]],
      'profile_pic': ['', [Validators.required]],
      'address': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'district': ['', [Validators.required]],
      'state': ['', [Validators.required]]
    });

    this.updatefosForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, Validators.compose([CustomValidators.vaildEmail, CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'profile_pic': ['', [Validators.nullValidator]],
      'address': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'district': ['', [Validators.required]],
      'state': ['', [Validators.required]]
    });

    this.updatepasswordForm = this.formBuilder.group({
      'new_password': ['', [Validators.required, Validators.compose([
        CustomValidators.removeSpaces, CustomValidators.PasswordPolicy
      ])
      ]
      ],
      'confirm_password': ['', [Validators.required, Validators.compose([
        CustomValidators.removeSpaces, CustomValidators.PasswordPolicy
      ])
      ]
      ],
    });
    this.AgencyList = this.formBuilder.group({
      'SearchKeyword': ['', Validators.required],
      // 'StateiD': ['', Validators.required],
      // 'DistrictID': ['', Validators.required],
    });

    this.GetReportData = this.route.snapshot.paramMap.get('postdata');
    if (this.GetReportData == 'RegisteredAgent') {
      this.BackToDashboard = true;
    } 
    this.getFosDetails(0, '');
    this.GetAllState();
    this.Editview = 1;
  }

  fosRegistration(data) {
    var text = data.password;
    var key = "BF458FE19DADAD174AD12192DC350234E6993334";
    var useHashing = true;

    if (useHashing) {
      key = CryptoJS.MD5(key).toString();
      var k1 = key.substring(0, 16);
      key = key + k1;
    }
    let options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    let textWordArray = CryptoJS.enc.Utf8.parse(text);
    let keyHex = CryptoJS.enc.Hex.parse(key);
    let encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);
    var base64String = encrypted.toString();
    this.PageNumber = 0;
    this.viewfalse = '0';
    if (data.name == '' || data.name.length == 0) {
      this.toasterService.error('Please enter name');
      return false;
    }

    if (data.email == '' || data.email.length == 0) {
      this.toasterService.error('Please enter email');
      return false;
    }

    if (data.mobile == '' || data.mobile.length == 0) {
      this.toasterService.error('Please enter mobile number');
      return false;
    }

    if (data.username == '' || data.username.length == 0) {
      this.toasterService.error('Please enter username');
      return false;
    }

    if (data.password == '' || data.password.length == 0) {
      this.toasterService.error('Please enter password');
      return false;
    }


    if (data.address.trim() == '' || data.address.length == 0) {
      this.toasterService.error('Please enter address');
      return false;
    }

    if (data.state == '' || data.state.length == 0) {
      this.toasterService.error('Please enter state');
      return false;
    }

    if (data.district == '' || data.district.length == 0) {
      this.toasterService.error('Please enter district');
      return false;
    }
    this.spinnerService.show();
    var senddata = {
      'agentname': data.name.trim(),
      'email': data.email.trim(),
      'mobileno': data.mobile.trim(),
      'username': data.username.trim(),
      'password': base64String,
      'address': data.address.trim(),
      'districtid': data.district,
      'stateid': data.state
    }
    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    var imagejson = {
      'agentsysimgn': this.imagename,
      'agentsysimgp': this.imagepath,
      'agentsysimgext': '.' + this.iamgeext
    }

    let imageserializeddata = JSON.stringify(imagejson);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': 'AgentRegister',
        'secrateKey': hashInBase64,
        'lstImage': imageserializeddata
      }
    }
    this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
      this.Response = res['hstplResponse'];
      if (this.Response.status == true) {
        this.spinnerService.hide()
        this.fosForm.reset();
        this.toasterService.success(this.Response.message);
        this.cardview = 1;
        this.formview = 1;
        this.base64textString = '';
        this.postdata = '';
        imagejson = null;
        this.viewfalse = '1';
        this.getFosDetails(this.PageNumber, '');
      } else {
        this.spinnerService.hide()
        this.toasterService.error(this.Response.message);
      }
    });
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
      this.toasterService.error("Only formats are allowed : jpg, jpeg & png");
      this.fosForm.controls['profile_pic'].setValue('');
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
      this.toasterService.error("Only formats are allowed : jpg, jpeg & png");

      this.fosForm.controls.profile_pic.setValue('');
      this.imagetypests = false;
      return false
    } else {
      var reader = new FileReader();
      this.imagetypests = true;
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toasterService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        this.fosForm.controls.profile_pic.setValue('');
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
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
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

  agnetdata: any = {};
  agentimage: any = {};
  finaldata: any = [];
  paginatedata: any = [];
  search: any = '';
  adminid: any;
  getFosDetails(pagenumber, from) {
    this.search = this.AgencyList.controls.SearchKeyword.value;
    let searchval = this.search != '' ? this.search : '';
    this.spinnerService.show();
    this.Editview = 1;
    this.item = localStorage.getItem('phpadminid');
    this.adminid = JSON.parse(this.item);
    var getsenddata = { 'LoginId': 0, 'pagenumber': pagenumber, 'search': searchval }
    let getserializeddata = JSON.stringify(getsenddata);
    var gethash = CryptoJS.HmacSHA256(getserializeddata, this.key);
    var gethashInBase64 = CryptoJS.enc.Base64.stringify(gethash);
    let getdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddata,
        'typeFor': 'GetAllAgent',
        'secrateKey': gethashInBase64
      }
    }

    this.from = from;
    if (this.from == 'scroll') {
      this.FosService.getFosDetails(getdata).subscribe(res => {
        this.allfosdetail = res
        this.paginatedata = JSON.parse(this.allfosdetail.hstplResponse.data);
        this.agnetdata = this.allfosdetail.hstplResponse.data;
        this.agentimage = this.allfosdetail.hstplResponse.lstImage;
        this.agnetdata = JSON.parse(this.agnetdata);
        this.agentimage = JSON.parse(this.agentimage);
        this.agentimage = this.agentimage.concat(this.agentimage);

        for (var i = 0; i < this.agnetdata.length; i++) {
          for (var j = 0; j < this.agentimage.length; j++) {
            if (this.agentimage[j].LoginId == this.agnetdata[i].LoginId) {
              this.agnetdata[i].image = this.agentimage[j].agentsysimgp;
              this.agnetdata[i].imagename = this.agentimage[j].agentsysimgn;
            }
          }
        }
        this.delay = false;
        this.spinnerService.hide();
        this.finaldata = this.finaldata.concat(this.agnetdata);
      });
    } else {
      this.FosService.getFosDetails(getdata).subscribe(res => {
        this.allfosdetail = res;
        this.paginatedata = JSON.parse(this.allfosdetail.hstplResponse.data);
        this.agnetdata = this.allfosdetail.hstplResponse.data;
        if (this.agnetdata != null && this.agnetdata != undefined) {
          this.agentimage = this.allfosdetail.hstplResponse.lstImage;
          this.agnetdata = JSON.parse(this.agnetdata);
          this.agentimage = JSON.parse(this.agentimage);
          for (var i = 0; i < this.agnetdata.length; i++) {
            for (var j = 0; j < this.agentimage.length; j++) {
              if (this.agentimage[j].LoginId == this.agnetdata[i].LoginId) {
                this.agnetdata[i].image = this.agentimage[j].agentsysimgp;
                this.agnetdata[i].imagename = this.agentimage[j].agentsysimgn;
              }
            }
          }
        } else {
          this.toasterService.error('No Record Found');
        }
        this.spinnerService.hide();
        this.delay = false;
        this.from = '';
        this.finaldata = this.agnetdata;
        if( this.finaldata.length==0){
          this.toasterService.error('No Record Found');
        }
      });
    }
  }

  states: any = [];
  districts: any = [];
  GetAllState() {
    this.JobpostService.GetAllStates().subscribe(res => {
      this.states = res
      if (this.states != null) {
        this.states = this.states.Data;
      }
      else {
        this.states = [];
      }
    });
  }

  GetAllDistrict(event: any) {
    this.fosForm.controls['district'].setValue('');
    this.updatefosForm.controls['district'].setValue('');
    this.districts = [];
    if (event != '') {
      this.spinnerService.show();
      this.JobpostService.GetAllDistrict(event).subscribe(res => {
        this.districts = res
        if (this.districts != null) {
          this.spinnerService.hide()
          this.districts = this.districts.Data;
        }
        else {
          this.districts = [];
        }
      });
    }
  }

  Next() {
    this.districts = [];
    this.fosForm.controls.district.setValue('');
    this.fosForm.controls.state.setValue('');
    this.viewfalse = '0';
    this.Editview = 1;
    this.cardview = 0;
    this.formview = 0;
  }

  Back() {
    this.cardview = 1;
    this.formview = 1;
    this.viewfalse = '1';
    this.fosForm.reset();
  }

  Close() {

    this.cardview = 0;
    this.formview = 1;
    this.fosForm.reset();
    this.fosForm.controls['state'].setValue('');
    this.districts = [];
    this.singledetailsview = 0;
    this.Editview = 1;
    this.viewfalse = '1';

  }

  Close1() {
    this.cardview = 1;
    this.formview = 1;
    this.fosForm.reset();
    this.fosForm.controls['state'].setValue('');
    this.districts = [];
    this.singledetailsview = 1;
    this.Editview = 1;
    this.viewfalse = 1;
    this.base64textString = [];
  }

  singleback() {
    this.cardview = '1';
    this.formview = '1';
    this.singledetailsview = '1';
    this.viewfalse = 1;
    this.viewfalse2 = 0;
  }

  updateback() {
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '0';
    this.Editview = '1';
  }

  agnetdatabyid: any = {};
  agentimagebyid: any = {};
  finaldatabyid: any = [];
  fosdetailbyid: any = [];
  LoginId: number = 0;
  statename: any = [];
  districtname: any = '';
  districtbyid: any = '';
  id: any = '';
  editimagename: any = '';
  editimageext: any = '';
  editimagepath: any = '';
  finaldatabyid1: any = [];
  getAgentDetails(loginid, data) {
    var item = {
      'stateid': data.state,
      'districtid': data.district
    }
    this.getDetailsById(loginid, item)
  }
  modalhide() {

  }
  display = 'none';
  agentstatus:any;
  getDetailsById(loginid, item) {
    this.agentstatus=item.IsActive;
   
    if (this.modalRef) {
      this.modalRef.hide();
      if (this.popmodel) {
        this.popmodel.nativeElement.click();
      }
    }
    this.agentID = loginid;
    this.id = loginid;
    this.updatefosForm.reset();
    this.viewfalse = '0';
    this.base64textString = '';
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '0';
    this.Editview = 1;
    this.finaldatabyid = [];
    this.spinnerService.show();
    this.LoginId = loginid;
    this.postdata = '';
    //this.imagepath=item.image;

    // if(item.imagename!=null){
    //     let splitimage = item.imagename.split('.');
    //     this.imagename = splitimage[0];
    //     this.iamgeext = splitimage[1];
    // } 
    // this.imagename=item.imagename;  
    //this.imagepath='';

    this.imagename = null;
    this.imagepath = null;
    this.iamgeext = '';
    let index = (this.states).filter(function (entry) {
      return entry.ID == item.stateid;
    });
    this.statename = index[0].STATENAME;
    this.JobpostService.GetAllDistrict(item.stateid).subscribe(res => {
      this.districtbyid = res
      if (this.districtbyid != null) {
        this.districtbyid = this.districtbyid.Data;
        let index1 = (this.districtbyid).filter(function (entry) {
          return entry.ID == item.districtid;
        });
        this.districtname = index1[0].DISTRICTNAME;
      } else {
        this.districtbyid = [];
      }
    });
    var getsenddatabyid = { 'LoginId': loginid }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

    let getdatabylogind = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabyid,
        'typeFor': 'GetAllAgent',
        'secrateKey': gethashInBase64byid
      }
    }

    this.FosService.getFosDetails(getdatabylogind).subscribe(res => {
      this.fosdetailbyid = res;
      this.agnetdatabyid = this.fosdetailbyid.hstplResponse.data;
      this.agentimagebyid = this.fosdetailbyid.hstplResponse.lstImage;
      this.agnetdatabyid = JSON.parse(this.agnetdatabyid);
      this.agentimagebyid = JSON.parse(this.agentimagebyid);
      for (var i = 0; i < this.agnetdatabyid.length; i++) {
        for (var j = 0; j < this.agentimagebyid.length; j++) {
          if (this.agentimagebyid[j].LoginId == this.agnetdatabyid[i].LoginId) {
            this.agnetdatabyid[i].image = this.agentimagebyid[j].agentsysimgp;
            this.agnetdatabyid[i].imagename = this.agentimagebyid[j].agentsysimgn;
          }
        }
      }
      this.finaldatabyid = this.agnetdatabyid;
      if (this.finaldatabyid.length > 0) {

        this.getEmployerList(loginid, 0, '');
      }
    });
  }

  viewfalse2: any = 0;
  agentID: any = '';
  getEmployerList(agentid, pagenumber, from) {
    this.viewfalse2 = 1;
    this.viewfalse = 0;
    this.agnetdata = null;
    this.agentimage = null;
    var getsenddata = { 'LoginId': agentid, 'Search': '', 'pagenumber': pagenumber }
    let getserializeddata = JSON.stringify(getsenddata);
    var gethash = CryptoJS.HmacSHA256(getserializeddata, this.key);
    var gethashInBase64 = CryptoJS.enc.Base64.stringify(gethash);
    let getdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddata,
        'typeFor': 'GetEmployerList',
        'secrateKey': gethashInBase64
      }
    }

    if (from == 'scroll') {
      this.FosService.getFosDetails(getdata).subscribe(res => {
        this.allfosdetail = res
        this.paginatedata = JSON.parse(this.allfosdetail.hstplResponse.data);
        this.agnetdata = this.allfosdetail.hstplResponse.data;
        this.agentimage = this.allfosdetail.hstplResponse.lstImage;
        this.agnetdata = JSON.parse(this.agnetdata);
        this.agentimage = JSON.parse(this.agentimage);
        this.agentimage = this.agentimage.concat(this.agentimage);
        if (this.agnetdata != null && this.agentimage != null) {
          for (var i = 0; i < this.agnetdata.length; i++) {
            for (var j = 0; j < this.agentimage.length; j++) {
              if (this.agentimage[j].LoginId == this.agnetdata[i].LoginId) {
                this.agnetdata[i].image = this.agentimage[j].ownerimgp;
                this.agnetdata[i].imagename = this.agentimage[j].ownerimgn;
              }
            }
          }
          this.finaldatabyid1 = this.finaldatabyid1.concat(this.agnetdata);
        } else {
          this.finaldatabyid1 = {};
        }
        this.delay = false;
        this.spinnerService.hide();
      });
    } else {
      this.PageNumber = 0;
      this.FosService.getFosDetails(getdata).subscribe(res => {
        this.allfosdetail = res;
        this.paginatedata = JSON.parse(this.allfosdetail.hstplResponse.data);
        this.agnetdata = this.allfosdetail.hstplResponse.data;
        this.agentimage = this.allfosdetail.hstplResponse.lstImage;
        this.agnetdata = JSON.parse(this.agnetdata);
        this.agentimage = JSON.parse(this.agentimage);
        if (this.agnetdata != null && this.agentimage != null) {
          for (var i = 0; i < this.agnetdata.length; i++) {
            for (var j = 0; j < this.agentimage.length; j++) {
              if (this.agentimage[j].LoginId == this.agnetdata[i].LoginId) {
                this.agnetdata[i].image = this.agentimage[j].ownerimgp;
                this.agnetdata[i].imagename = this.agentimage[j].ownerimgn;
              }
            }
          }
          this.finaldatabyid1 = this.agnetdata;
        } else {
          this.finaldatabyid1 = {};
        }
        this.finaldatabyid1 = this.agnetdata;
        this.spinnerService.hide();
      });
    }
  }

  fosdetailbyid1: any = [];
  agnetdatabyid1: any = [];
  setUserName(e) {
    this.fosForm.patchValue({ username: e.target.value });
  }

  editsetUserName(e) {
    this.updatefosForm.patchValue({ username: e.target.value });
  }

  ActiveInactiveAgent() {
    this.PageNumber = 0;
    this.spinnerService.show();
    this.PageNumber = 0;
    this.viewfalse = '0';
    var senddata = { 'LoginId': this.deleteagentid, 'AdminId': this.adminid, 'ActiveStatus': this.status }
    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': 'AgentStatus',
        'secrateKey': hashInBase64
      }
    }
    this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
      this.Response = res['hstplResponse'];
      if (this.Response.status == true) {
        this.spinnerService.hide();
        this.modalRef.hide();
        this.toasterService.success(this.Response.message);
        this.postdata = '';
        this.viewfalse = '1';
        this.getFosDetails(this.PageNumber, '')
      } else {
        this.spinnerService.hide();
        this.modalRef.hide();
        this.toasterService.error(this.Response.message);
      }
    });
  }

  PushedTemplated(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  imgSrc: any = '';
  agentid: any = '';
  loginid: any = '';
  SingleUseredit(item) {
    this.spinnerService.show();
    this.base64textString = [];
    this.imagename = '';
    this.imagepath = '';
    this.iamgeext = '';
    this.GetAllDistrict(item.stateid);
    this.temp = item.image;
    if (item.image == '' || item.image == null) {
      this.imagesizests = false;
      this.imagetypests = false;
    } else {
      this.imagesizests = true;
      this.imagetypests = true;
    }
    this.agentid = item.agentid;
    this.loginid = item.LoginId;
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '1';
    this.Editview = '0';
    this.districts = this.districtbyid
    this.updatefosForm.patchValue({
      name: item.agentname,
      email: item.email,
      mobile: item.mobileno,
      address: item.address,
      username: item.mobileno,
      state: item.stateid,
      district: item.districtid
    });
    this.imgSrc = item.image;
    this.spinnerService.hide();
    if (this.imgSrc) {
      this.temp = true;
    }
    else {
      this.temp = false;
    }
  }

  Updatepassword(formvalue, finaldatabyid) {
    var Agentstatus=this.agentstatus;
    if(Agentstatus!=true){
      this.toasterService.error("Active agent to update the password");
      this.updatepasswordForm.reset();
      $('#myModal').hide();
      $('body').removeClass('modal-open');
      $('body  .modal-backdrop.in').hide();
      return false;
    }

    this.PageNumber = 0;
    var edittext = formvalue.new_password;
    var key = "BF458FE19DADAD174AD12192DC350234E6993334";
    var edituseHashing = true;
    if (edituseHashing) {
      key = CryptoJS.MD5(key).toString();
      var k1 = key.substring(0, 16);
      key = key + k1;
    }
    let editoptions = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    let edittextWordArray = CryptoJS.enc.Utf8.parse(edittext);
    let editkeyHex = CryptoJS.enc.Hex.parse(key);
    let editencrypted = CryptoJS.TripleDES.encrypt(edittextWordArray, editkeyHex, editoptions);
    var editbase64String = editencrypted.toString();

    if (formvalue.new_password == '' || formvalue.new_password.length == 0) {
      this.toasterService.error('Please enter current password');
      return false;
    }

    if (formvalue.confirm_password == '' || formvalue.confirm_password.length == 0) {
      this.toasterService.error('Please enter confirm password');
      return false;
    }

    if (formvalue.new_password !== formvalue.confirm_password) {
      this.toasterService.error('Password and Confirm Password does not match');
      return false;
    }
    this.spinnerService.show();
    var senddata = {
      'password': editbase64String,
      'loginid': this.LoginId,
      'usertype': 'AGENT',
      'isfirstlogin': 1
    }
    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': 'ChangePassword',
        'secrateKey': hashInBase64
      }
    }
    this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
      this.Response = res['hstplResponse'];
      if (this.Response.status == true) {
        this.spinnerService.hide()
        this.fosForm.reset();
        this.toasterService.success(this.Response.message);
        this.cardview = 1;
        this.formview = 1;
        this.singledetailsview = 1;
        this.updatepasswordForm.reset();
        $('#myModal').hide();
        $('body').removeClass('modal-open');
        $('body  .modal-backdrop.in').hide();
        // this.getFosDetails(this.PageNumber, '')

        var data = JSON.stringify(finaldatabyid[0]);
        var data2 = JSON.parse(data);
        this.getDetailsById(data2.LoginId, data2);

      } else {
        this.spinnerService.hide()
        this.toasterService.error(this.Response.message);
      }
    });
  }


  UpdateAgent(data) {
    this.imagetypests = true;
    this.imagesizests = true;
    this.PageNumber = 0;
    this.viewfalse = '0';
    if (data.name == '' || data.name.length == 0) {
      this.toasterService.error('Please enter name');
      return false;
    }

    if (data.email == '' || data.email.length == 0) {
      this.toasterService.error('Please enter email');
      return false;
    }

    if (data.mobile == '' || data.mobile.length == 0) {
      this.toasterService.error('Please enter mobile number');
      return false;
    }

    if (data.username == '' || data.username.length == 0) {
      this.toasterService.error('Please enter username');
      return false;
    }


    if (data.address == '' || data.address.length == 0) {
      this.toasterService.error('Please enter address');
      return false;
    }

    if (data.state == '' || data.state.length == 0) {
      this.toasterService.error('Please enter state');
      return false;
    }

    if (data.district == '' || data.district.length == 0) {
      this.toasterService.error('Please enter district');
      return false;
    }

    this.Editview = 1;
    var imagejson = {
      'agentsysimgn': this.imagename,
      'agentsysimgp': this.imagepath,
      'agentsysimgext': this.iamgeext != '' ? '.' + this.iamgeext : null
    }
    this.spinnerService.show();
    var senddata = {
      'agentname': data.name.trim(),
      'email': data.email.trim(),
      'mobileno': data.mobile.trim(),
      'address': data.address.trim(),
      'districtid': data.district != '' ? data.district : 0,
      'stateid': data.state != '' ? data.state : 0,
      'agentid': this.agentid,
      'loginid': this.loginid
    }
    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    let imageserializeddata = JSON.stringify(imagejson);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': 'UpdateAgentDetail',
        'secrateKey': hashInBase64,
        'lstImage': imageserializeddata
      }
    }
    this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
      this.Response = res['hstplResponse'];
      if (this.Response.status == true) {
        this.spinnerService.hide()
        this.fosForm.reset();
        this.toasterService.success(this.Response.message);
        this.cardview = 1;
        this.formview = 1;
        this.viewfalse = '1';
        this.getAgentDetails(this.loginid, data);
      } else {
        this.Editview = 0;
        this.spinnerService.hide()
        this.toasterService.error(this.Response.message);
      }
    });
  }

  emailvalues = '';
  dbResponse: any;
  checkverifymail: boolean = false;
  checkret: boolean = false;
  resetupdatepasswordForm() {
    this.updatepasswordForm.reset();
  }

  checkAvail(value, src) {
    this.PageNumber = 0;
    this.PageNumber = 0;
    let senddata = {};
    let typeFor = '';
    var regemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var reg = /^[0]?[6789]\d{9}$/;
    if (src == 'mobile') {
      senddata = { 'MobileNumber': value };
      typeFor = 'CheckAgentMobile';
    }

    if (src == 'email') {
      senddata = { 'email': value };
      typeFor = 'CheckAgentEmail';
    }

    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': typeFor,
        'secrateKey': hashInBase64
      }
    }

    if (value != '' && value != null && (regemail.test(value) || reg.test(value))) {
      this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
        this.spinnerService.show();
        this.Response = res['hstplResponse'];
        if (this.Response.status == true) {
          this.spinnerService.hide();
          this.toasterService.success(this.Response.message);
          this.postdata = '';
          this.checkret = true;
        } else {
          if (src == 'email') {
            this.fosForm.controls['email'].setValue('');
          }
          if (src == 'mobile') {
            this.fosForm.controls['mobile'].setValue('');
            this.fosForm.controls['username'].setValue('');
          }
          this.spinnerService.hide()
          this.toasterService.error(this.Response.message);
        }
      });
    }
  }

  checkreturn = false;
  async checkAvail1(value, src) {
    this.PageNumber = 0;
    this.PageNumber = 0;
    let senddata = {};
    let typeFor = '';
    var reg = /^[0]?[6789]\d{9}$/;
    if (src == 'mobile') {
      senddata = { 'MobileNumber': value };
      typeFor = 'CheckAgentMobile';
    }

    if (src == 'email') {
      senddata = { 'email': value };
      typeFor = 'CheckAgentEmail';
    }
    let serializeddata = JSON.stringify(senddata);
    var hash = CryptoJS.HmacSHA256(serializeddata, this.key);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    this.postdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': serializeddata,
        'typeFor': typeFor,
        'secrateKey': hashInBase64
      }
    }

    if (value != '' && value != null && reg.test(value)) {
      this.spinnerService.show();
      this.FosService.FosRegistration(JSON.stringify(this.postdata)).subscribe(res => {
        this.Response = res['hstplResponse'];
        if (this.Response.status == true) {
          this.spinnerService.hide();
          this.toasterService.success(this.Response.message);
          this.postdata = '';
        } else {
          if (src == 'email') {
            this.updatefosForm.controls['email'].setValue('');
          }
          if (src == 'mobile') {
            this.updatefosForm.controls['mobile'].setValue('');
            this.updatefosForm.controls['username'].setValue('');
          }
          this.spinnerService.hide()
          this.toasterService.error(this.Response.message);
        }
      });
    }
  }

  deleteagentid: any = '';
  status: any = '';
  PushedTemplate(template: TemplateRef<any>, id, IsActive) {
    this.deleteagentid = id;
    if (IsActive == 0) {
      this.status = 1;
    }
    else {
      this.status = 0;
    }
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {
    this.modalRef.hide();
  }

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  agnetdatabyUserid: any = [];
  agentimagebyUserid: any = [];
  ViewUser(item) {
    this.base64textString = '';
    this.spinnerService.show();
    this.imagename = null;
    this.imagepath = null;
    this.iamgeext = '';
    var getsenddatabyid = { 'LoginId': item.LoginId }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

    let getdatabylogind = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabyid,
        'typeFor': 'AgentUserDetail',
        'secrateKey': gethashInBase64byid
      }
    }
    this.FosService.getFosDetails(getdatabylogind).subscribe(res => {
      this.fosdetailbyid = res;
      this.agnetdatabyUserid = this.fosdetailbyid.hstplResponse.data;
      this.agentimagebyUserid = this.fosdetailbyid.hstplResponse.lstImage;
      this.agnetdatabyUserid = JSON.parse(this.agnetdatabyUserid);
      this.agentimagebyUserid = JSON.parse(this.agentimagebyUserid);
      this.spinnerService.hide();
      this.agnetdatabyUserid = this.agnetdatabyUserid;
    });
  }

  ApproveDisapproveEmployer(data: any, status) {
    if (status == 'disapprove') {
      var ApprovalStatus = 0;
    } else {
      ApprovalStatus = 1;
    }
    this.base64textString = '';
    this.spinnerService.show();
    this.imagename = null;
    this.imagepath = null;
    this.iamgeext = '';
    var getsenddatabydata = {
      'LoginId': data.LoginId,
      'AgentId': data.agentId,
      'ApprovalStatus': ApprovalStatus,
      'AdminId': this.adminid
    }
    let getserializeddatabydata = JSON.stringify(getsenddatabydata);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabydata, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);
    let getdatabylogind = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabydata,
        'typeFor': 'UserStatus',
        'secrateKey': gethashInBase64byid,
      }
    }
    this.FosService.FosRegistration(getdatabylogind).subscribe(res => {
      this.fosdetailbyid = res;
      if (this.fosdetailbyid.hstplResponse.action == 1) {
        this.toasterService.success(this.fosdetailbyid.hstplResponse.message);
        this.spinnerService.hide();
      }
      else {
        this.toasterService.error(this.fosdetailbyid.hstplResponse.message);
        this.spinnerService.hide();
      }
      this.getDetailsById(this.id, data);
    });
  }

  // GetStatename(GetStatename: any) {
  //   let Statename = (this.states).filter(function (entry) {
  //     return entry.ID == GetStatename;
  //   });
  //   if (Statename.length > 0) {
  //     var statename = Statename[0].STATENAME;
  //     return statename;
  //   }
  // }

  // GetDistricName(stateid, districtid) {
  //   this.JobpostService.GetAllDistrict(stateid).subscribe(res => {
  //     this.districts = res;
  //     if (this.districts != null) {
  //       this.spinnerService.hide()
  //       this.districts = this.districts.Data;
  //     }
  //     else {
  //       this.districts = [];
  //     }
  //   });
  //   let Districtname = (this.districts).filter(function (entry) {
  //     return entry.ID == districtid;
  //   });
  //   var DistrictName = Districtname[0].DISTRICTNAME;
  //   return DistrictName;

  // }
}
