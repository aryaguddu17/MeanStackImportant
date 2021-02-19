import { Component, OnInit, HostListener, ɵConsole } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FosService } from './../../Services/fos.service';
import * as CryptoJS from 'crypto-js';
import * as $ from 'jquery';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-fosemployer',
  templateUrl: './fosemployer.component.html',
  styleUrls: ['./fosemployer.component.css']
})
export class FosemployerComponent implements OnInit {

  FilterFeedbackview: FormGroup;
  filtershow: any = '0';
  viewfalse2: any = 0;
  result: any = '1';
  from: any;
  pageNumber: number = 0;
  copydata: any = '';
  delay: boolean = false;
  key: any = 'iamskillindiafriendlyemp';
  allfosdetail: any = [];
  agnetdatabyid: any = {};
  agentimagebyid: any = {};
  finaldatabyid: any = [];
  fosdetailbyid: any = [];
  LoginId: number = 0;
  agnetdata: any = [];
  agentimage: any = {};
  finaldata: any = [];
  employerata: any = [];
  searchsts: boolean = false;
  listview: boolean = false;
  finalemployerdata: any = [];
  PageNumber: number = 0;
  // agentID:number=0;
  agentID: any = '';
  paginatedata: any = [];
  agency: any = '';

  AgencyList: FormGroup;
  viewfalse: any = '1';
  Editview: any = '1';
  cardview: any = '1';
  employerlist: any = 0;
  singledetailsview: any = 0;
  updateEmployerForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private FosService: FosService,
    private router: Router) { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;

        if (this.paginatedata.length >= 10 && this.viewfalse2 == 1) {
          this.PageNumber = this.PageNumber + 1;
          this.getEmployerData(this.agentID, this.PageNumber, 'scroll')
        }
        if (this.paginatedata.length >= 10 && this.viewfalse == '1') {
          this.PageNumber = this.PageNumber + 1;
          this.getFosDetails1(this.PageNumber, 'scroll')
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
    this.agency = 'Select Agency'
    // this.getFosDetails();
    // this.getEmployerData(0, 0, '');
    this.AgencyList = this.formBuilder.group({
      'SearchKeyword': ['', Validators.required],
      // 'StateiD': ['', Validators.required],
      // 'DistrictID': ['', Validators.required],
    });
    this.getFosDetails1(0, '');
    this.GetAllState();
    this.Editview = 1;

    this.updateEmployerForm = this.formBuilder.group({
      'natureofbusinness': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'establishmentname': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'ownername': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.nullValidator, Validators.compose([CustomValidators.vaildEmail, CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      ' ': ['', [Validators.nullValidator]],
      'address': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'district': ['', [Validators.required]],
      'state': ['', [Validators.required]],
      'nearby': ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      'gst': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.pangstformat]), Validators.compose([CustomValidators.removeSpaces])]],
      pangst_pic: ['', ''],
      shop_pic: ['', ''],
      agent_pic: ['', '']
    });

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

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /////////////////// Get All Agency List start here  \\\\\\\\\\\\\\\\\\\\\\\
  search: any = '';
  adminid: any;
  item: any;
  getFosDetails1(pagenumber, from) {
    this.search = this.AgencyList.controls.SearchKeyword.value;
    let searchval = this.search != '' ? this.search : '';
    this.spinnerService.show();
    //this.delay = true;
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
          //  let  index = this.agentimage.findIndex(x => x.LoginId ===this.agentimage[i].LoginId);
          //  this.agnetdata[i].imagename=this.agentimage[index].agentsysimgn;
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
          this.toastrService.error('No Record Found');
        }
        this.spinnerService.hide();
        this.delay = false;
        this.from = '';
        this.finaldata = this.agnetdata;
      });
    }
  }
  /////////////////// Get All Agency List Ends here  \\\\\\\\\\\\\\\\\\\\\\\

  /////////////////// Get All Employer List start here  \\\\\\\\\\\\\\\\\\\\\\\
  agnetdatalist: any = [];
  getFosDetails() {
    this.spinnerService.show();
    var getsenddata = { 'LoginId': 0, 'pagenumber': 0 }
    let getserializeddata = JSON.stringify(getsenddata);
    var gethash = CryptoJS.HmacSHA256(getserializeddata, this.key);
    var gethashInBase64 = CryptoJS.enc.Base64.stringify(gethash);
    let getdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddata,
        'typeFor': 'GetAgent',
        'secrateKey': gethashInBase64
      }
    }

    this.FosService.getFosDetails(getdata).subscribe(res => {
      this.allfosdetail = res
      this.agnetdatalist = JSON.parse(this.allfosdetail.hstplResponse.data);
      this.spinnerService.hide();
    });
  }


  getEmployerData(agentid, pagenumber, from) {
    this.paginatedata = [];
    this.filtershow = 1;
    this.employerlist = 1;
    this.cardview = 0;
    this.hide1 = 1;
    this.viewfalse2 = 1;
    if (agentid != "Select Agency") {
      this.agentID = agentid;
    }
    else {
      this.agentID = 0;
    }
    this.agency = agentid;
    this.agnetdata = null;
    this.agentimage = null;
    this.spinnerService.show();
    var getsenddata = { 'LoginId': this.agentID, 'Search': '', 'pagenumber': pagenumber }
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
        this.agnetdata = this.agnetdata.concat(this.agnetdata)
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
          this.listview = true;

          this.employerata = this.employerata.concat(this.agnetdata);
        } else {
          this.toastrService.error('Record not found');
          this.listview = false;
          this.employerata = {};
        }
        this.delay = false;
        this.spinnerService.hide();
      });
    } else {
      this.spinnerService.show();
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
          this.listview = true;
          this.employerata = this.agnetdata;
        } else {
          this.toastrService.error('Record not found');
          this.listview = false;
          this.employerata = {};
        }
        this.spinnerService.hide();
      });
    }
  }

  show1: any = '1';
  hide1: any = 0;
  previous() {
    this.filtershow = 0;
    this.show1 = 0;
    this.hide1 = 0;
    this.cardview = 1;
    this.viewfalse2 = 1;
    this.viewfalse = 0;
    this.listview = false;
  }

  /////////////////// Get All Employer List Ends here  \\\\\\\\\\\\\\\\\\\\\\\

  /////////////////// Get Employer Details Start here  \\\\\\\\\\\\\\\\\\\\\\\
  employerdata: any = [];
  agentimagebyUserid: any = [];
  jobdetails: any = [];
  employerJobDetails: any = [];
  empjobdetail: any = [];
  viewemployer(item) {
    this.employerJobDetails = [];
    // this.base64textString = '';
    this.spinnerService.show();
    this.singledetailsview = 1;
    this.listview = false;
    this.paginatedata = [];
    this.filtershow = 0;
    this.employerlist = 0;
    this.hide1 = 0;
    this.viewfalse2 = 0;
    // this.imagename = null;
    // this.imagepath = null;
    // this.iamgeext = '';
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
      this.employerdata = this.fosdetailbyid.hstplResponse.data;
      this.agentimagebyUserid = JSON.parse(this.fosdetailbyid.hstplResponse.lstImage);
      this.employerdata = JSON.parse(this.employerdata);
      if (this.fosdetailbyid.hstplResponse.status) {
        var getsenddatabyid1 = { 'LoginId': item.LoginId, 'AgentId': item.agentid, 'pagenumber': 0, 'search': '' }
        let getserializeddatabyid1 = JSON.stringify(getsenddatabyid1);
        var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid1, this.key);
        var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

        let getdatabylogind1 = {
          'HSTPLRequest': {
            'clientKey': 'ROJGAAR_ANDROID',
            'data': getserializeddatabyid1,
            'typeFor': 'GetAgentUserJob',
            'secrateKey': gethashInBase64byid
          }
        }
        this.FosService.getFosDetails(getdatabylogind1).subscribe(res => {
          this.jobdetails = res;
          this.empjobdetail = this.jobdetails.hstplResponse.data;
          if (this.empjobdetail.length > 0) {
            this.empjobdetail = JSON.parse(this.empjobdetail);
            this.employerJobDetails = this.empjobdetail;
          }
          this.spinnerService.hide();
        });
      }
    });

  }

  singleback() {
    this.filtershow = 1;
    this.singledetailsview = 0;
    this.listview = true;
    this.hide1 = 1;
  }

  /////////////////// Get Employer Details Start here  \\\\\\\\\\\\\\\\\\\\\\\
  EmployerLoginId: any = '';
  EditEmployer: any = 0;
  emloyerDataUpdate: any = [];
  employerimg: any = [];
  editEmployer(item) {
    this.ShopImgBase64 = "";
    this.ShopImgName = "";
    this.ShopImgExtention = "";
    this.AgentImgBase64 = "";
    this.AgentImgName = "";
    this.AgentImgExtention = "";
    this.PanGstImgBase64 = "";
    this.PanGstImgName = "";
    this.PanGstImgExtention = "";
    this.base64textStringAgent = [];
    this.base64textStringShop = [];
    this.base64textStringPanGst = [];
    this.viewfalse2 = 0;
    this.updateEmployerForm.reset();
    this.filtershow = 0;
    this.listview = false;
    this.EditEmployer = 1;
    this.spinnerService.show();
    this.JobpostService.GetAllDistrict(item.stateid).subscribe(res => {
      this.districts = res
      if (this.districts != null) {
        this.spinnerService.hide()
        this.districts = this.districts.Data;
      }
      else {
        this.districts = [];
      }
    });
    var getsenddatabyid = { 'LoginId': item.LoginId }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

    let getdatabylogind = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabyid,
        'typeFor': 'UserDetail',
        'secrateKey': gethashInBase64byid
      }
    }

    this.FosService.getFosDetails(getdatabylogind).subscribe(res => {
      this.fosdetailbyid = res;

      var employerdata = this.fosdetailbyid.hstplResponse.data;
      this.employerimg = JSON.parse(this.fosdetailbyid.hstplResponse.lstImage);

      employerdata = JSON.parse(employerdata);
      this.emloyerDataUpdate = employerdata;
      this.EmployerLoginId = employerdata.LoginId;
      this.updateEmployerForm.patchValue({
        natureofbusinness: employerdata.businessnature,
        email: employerdata.email,
        mobile: employerdata.mobileno,
        address: employerdata.address,
        username: employerdata.mobileno,
        state: employerdata.stateid,
        district: employerdata.districtid,
        establishmentname: employerdata.establishmentname,
        ownername: employerdata.ownername,
        nearby: employerdata.nearby,
        gst: employerdata.pangst
      });
    });
  }

  UpdateEmployer(formdata) {
    if (formdata.establishmentname.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }
    if (formdata.natureofbusinness.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }
    if (formdata.ownername.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }
    if (formdata.mobile.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }
    // if (formdata.email.trim() == '') {
    //   this.toastrService.error("The fields with * are mandatory")
    //   return false
    // }
    if (formdata.address.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }
    if (formdata.nearby.trim() == '') {
      this.toastrService.error("The fields with * are mandatory")
      return false
    }

    var pangst = formdata.gst.toUpperCase();
    if(pangst!='' ||pangst!=null||pangst!=undefined){
      if(pangst.length<10){
        this.toastrService.error("Please enter valid pan number");
         return false;
      }
    }

    var Clattitude = this.emloyerDataUpdate.Clattitude;
    var Clongitude = this.emloyerDataUpdate.Clongitude;
    var Mlongitude = this.emloyerDataUpdate.Mlongitude;
    var Mlattitude = this.emloyerDataUpdate.Mlattitude;

    var getsenddatabyid = { 'LoginId': this.EmployerLoginId, establishmentname: formdata.establishmentname, ownername: formdata.ownername, mobileno: formdata.mobile, email: formdata.email, businessnature: formdata.natureofbusinness, address: formdata.address, nearby: formdata.nearby, pangst: pangst, stateid: formdata.state, districtid: formdata.district, Clattitude: Clattitude, Clongitude: Clongitude, Mlattitude: Mlattitude, Mlongitude: Mlongitude }
    // var lstImage = null;

    var lstImage1 = {
      'shopimgp': this.ShopImgBase64,
      'ownerimgp': this.AgentImgBase64,
      'ownerimgn': this.AgentImgName,
      'shopimgn': this.ShopImgName,
      'pangstimgp': this.PanGstImgBase64,
      'pangstimgn': this.PanGstImgName,
      'ownerimgext': this.AgentImgExtention,
      'pangstimgpext': this.PanGstImgExtention,
      'shopimgext': this.ShopImgExtention
    }
    var lstImage = JSON.stringify(lstImage1);
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

    let getdatabylogind = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabyid,
        'typeFor': 'UpdateProfile',
        'secrateKey': gethashInBase64byid,
        'lstImage': lstImage
      }
    }
    this.spinnerService.show();
    this.FosService.FosRegistration(getdatabylogind).subscribe(res => {
      this.jobdetails = res;

      this.empjobdetail = this.jobdetails.hstplResponse;
      if (this.empjobdetail.status == true) {
        this.ShopImgBase64 = "";
        this.ShopImgName = "";
        this.ShopImgExtention = "";
        this.AgentImgBase64 = "";
        this.AgentImgName = "";
        this.AgentImgExtention = "";
        this.PanGstImgBase64 = "";
        this.PanGstImgName = "";
        this.PanGstImgExtention = "";
        this.EditEmployer = 0;
        this.viewfalse2 = 1;
        this.toastrService.success("Employer Updated Successfully");
        this.getEmployerData(this.agentID, 0, '');
      }
      this.spinnerService.hide();
    });
  }

  Close() {
    this.EditEmployer = 0;
    this.filtershow = 1;
    this.listview = true;
    this.viewfalse2 = 1;
  }

  GetAllDistrict(event: any) {
    // this.fosForm.controls['district'].setValue('');
    this.updateEmployerForm.controls['district'].setValue('');
    this.districts = [];
    if (event != '') {
      this.spinnerService.show();
      this.JobpostService.GetAllDistrict(event).subscribe(res => {
        this.districts = res
        if (this.districts != null) {
          this.spinnerService.hide();
          this.districts = this.districts.Data;
        }
        else {
          this.districts = [];
        }
      });
    }
  }



  ///////////////////// Update  Start Here ////////////////////////

  showMagGst: boolean = false;
  showMagPan: boolean = false;
  gstGetImg: boolean = false;
  panGetImg: boolean = false;
  PanExtention: any;
  panImage1: any;
  imagename: string = '';
  base64textString: any = [];
  img: any;
  imgGstName: any;
  imgPanName: any;
  panImage: any;
  currentFile1: any;
  currentFile: any;
  ValidImageTypes: any;

  ShopImgBase64: any = "";
  ShopImgExtention: any = "";
  ShopImgName: any = "";

  PanGstImgExtention: any = "";
  PanGstImgName: any = "";
  PanGstImgBase64: any = "";

  AgentImgExtention: any = "";
  AgentImgName: any = "";
  AgentImgBase64: any = "";


  onUploadChange(evt: any, sf: any) {
    this.img = sf;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg", "pdf"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      //   this.updateEmployerForm.controls['ImgName'].setValue('');
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
    }
    if (this.img == 'ShopImg') {

      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    } else if (this.img == 'PanGstImg') {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    } else {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    }
    var mimetypereader = new FileReader();
    mimetypereader.onloadend = this.CheckMimeType.bind(this);
    const Eblob = file.slice(0, 4);
    var data = mimetypereader.readAsArrayBuffer(Eblob);
  }


  onUploadChangeAgentPic(evt: any, sf: any) {
    this.img = sf;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      this.updateEmployerForm.controls['agent_pic'].setValue('');
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
    }
    if (this.img == 'ShopImg') {

      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    } else if (this.img == 'PanGstImg') {
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
      if (this.img == 'ShopImg') {
        this.updateEmployerForm.controls.shop_pic.setValue('');
      } else if (this.img == 'PanGstImg') {
        this.updateEmployerForm.controls.pangst_pic.setValue('');
      } else {
        this.updateEmployerForm.controls.agent_pic.setValue('');
      }
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        if (this.img == 'ShopImg') {
          this.updateEmployerForm.controls.shop_pic.setValue('');
        } else if (this.img == 'PanGstImg') {
          this.updateEmployerForm.controls.pangst_pic.setValue('');
        } else {
          this.updateEmployerForm.controls.agent_pic.setValue('');
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


  base64textStringShop: any = [];
  base64textStringPanGst: any = [];
  base64textStringAgent: any = [];
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    if (this.img == 'ShopImg') {
      var imn2 = imn.split('.');
      this.imgGstName = imn;
      this.ShopImgExtention = imn2[1];
      this.ShopImgName = imn2[0];
      this.ShopImgBase64 = btoa(e.target.result);
      this.showMagGst = true;
      this.gstGetImg = false;
      // this.base64textStringShop = "data:image/jpeg;base64,"+this.ShopImgBase64;
      this.base64textStringShop.push('data:image/png;base64,' + btoa(e.target.result));
    } else if (this.img == 'PanGstImg') {

      var imn3 = imn.split('.');
      this.imgPanName = imn;
      this.PanGstImgExtention = imn3[1];
      this.PanGstImgName = imn3[0];
      this.PanGstImgBase64 = btoa(e.target.result);
      this.showMagPan = true;
      this.panGetImg = false;
      this.base64textStringPanGst.push('data:image/png;base64,' + btoa(e.target.result));
    } else {
      var imn4 = imn.split('.');
      this.imgPanName = imn;
      this.AgentImgExtention = imn4[1];
      this.AgentImgName = imn4[0];
      this.AgentImgBase64 = btoa(e.target.result);
      this.showMagPan = true;
      this.panGetImg = false;
      this.base64textStringAgent.push('data:image/png;base64,' + btoa(e.target.result));
    }
  }

  ///////////////////// Update  End Here ////////////////////////

}
