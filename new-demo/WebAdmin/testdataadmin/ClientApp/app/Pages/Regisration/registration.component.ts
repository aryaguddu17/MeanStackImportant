import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../Services/jobpost.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { empty } from 'rxjs/observable/empty';
import { Alert } from 'selenium-webdriver';
import { HammerGesturesPlugin } from '@angular/platform-browser/src/dom/events/hammer_gestures';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CompanyProfileService } from '../../Services/companyprofile.service';
import { MasterService } from '../../Services/master.service';
import { debug } from 'util';
import { UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})

export class RegistrationComponent implements OnInit {

  modalRef: BsModalRef;
  data: any;
  Response: any;
  changepasswordForm: FormGroup;
  res: any;
  rForm: FormGroup;
  rFormupdate: FormGroup;
  UserRegistrationForm: FormGroup;
  FilterCompanyRegistration: FormGroup;
  msg: any = "";
  item: any = [];
  listing: any = '0';
  searchsts: any = '0';
  filtering: any = '1';
  backbtn: any = '1';
  CompanyRegister: any = '1';
  pageNumber: number = 0;
  redirection: any;
  postData: any = [];
  getpushdata: any = [];
  SendData: any = [];
  senddatafilter: any = [];
  GetShowData: any;
  viewfalse: any = '1';
  ShowPushData: any = {};
  RegistrationView: any = '1';
  UpdateRegisterform: any = '1';
  EditButton: any = '1';
  Registrationbk: any = '1';
  from: any;
  delay: boolean = false;
  companyregisterdata: any = [];
  DbResponce: any = [];
  Showpushdata: any = [];
  statename: any;
  districtname: any;
  cutpanvaluefromgst = '';
  Responsetoken: any;
  isGst: boolean = false;
  isPan: boolean = false;
  Dbresponse: any = [];
  companydata: any = [];
  COMPANYID: any = '';
  district1: any = [];
  states: any = [];
  disapprovecompanystatus: any = [];
  User_id: any = ''
  approvecompanystatus: any = [];
  item1: any = [];
  companyid: any = '';
  companyregisterdatashow: any = [];
  Companyid: any = '';
  mobilevalues = '';
  checkveriymobile: boolean = false;
  panvalue1: any = '';
  panvalues = '';
  checkveriypan: boolean = false;
  isname: boolean = false;
  dis: boolean = false;
  gstvalues = '';
  panvalue: any = '';
  checkverifygst: boolean = false;
  usernamevalues = '';
  checkverifyusername: boolean = false;
  emailvalues: any = '';
  dbResponse: any;
  checkverifymail: boolean = false;
  user_id: any = '';
  cutpanfromgst = '';
  cutpanvalue: any = '';

  companyfilter: any = 1;
  AdminId: any;
  CompanyProfileForm: FormGroup;
  sectorskils: FormGroup;
  sectortradeskils: FormGroup;
  editid: boolean = false;
  showMagGst: boolean = false;
  showMagPan: boolean = false;
  imagename: string = '';
  panImage1: any;
  gstGetImage: any;
  gstGetImg: boolean = false;
  panGetImg: boolean = false;
  panGetImage: any;
  companytype: any = [];
  district: any;
  companyprofileshow: any = 0;
  Exitprofile: any = 0;
  CompanyData: any = [];
  industialrea: any = [];
  gstImage: any;
  GstnExtention: any;
  PanExtention: any;
  companyTypeO: any;
  ShowCompanyWorkLocation: any = 0;
  showSectorskillForm: any = 0;
  ShowUsers: any = 0;
  hidecompanyprofile: any = 0;
  postion: any;
  GetReportData: any;
  BackToDashboard: boolean = false;

  dropdownSettings: {};

  public popoverTitle: string = 'Are You sure?';
  public popoverMessage: string = 'Are you really sure you want to approve this?';
  public popoverMessage1: string = 'Are you really sure you want to change status?';
  confirmText: any = 'Yes';
  cancelText: any = 'No';

  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private registService: RegistrationService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private CompanyProfileService: CompanyProfileService,
    private MasterService: MasterService,
    private router: Router) {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      // this.postion = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      if (pos >= (0.8 * max)) {
        if (this.delay) {
          return
        }
        this.delay = true;
        if (this.companyregisterdata.length >= 10 && this.viewfalse == '1') {
          this.pageNumber = this.pageNumber + 1;
          this.allcarddata(this.pageNumber, 'scroll', this.copydata);
        }
        if (this.companyregisterdata.length >= 10 && this.scrollinit == true) {
          this.pageNumber = this.pageNumber + 1;
          this.allcarddata1(this.pageNumber, 'scroll', this.copydata);
        }
      }
    }
  }
  getdata: any;
  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'hiringName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.item = localStorage.getItem('phpadminid');
    this.AdminId = parseInt(JSON.parse(this.item));
    this.GetAllState();
    this.rForm = this.formBuilder.group({
      'cname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'logintype': ['', Validators.required],
      'firstname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      // 'lastname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, , Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'password': ['', [Validators.required, , Validators.compose([CustomValidators.PasswordPolicy])]],
      'pancard': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces]), Validators.compose([CustomValidators.validpanformate])]],
      'Designation': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      gst: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.validgdteenformate]), Validators.compose([CustomValidators.removeSpaces])]],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });

    this.UserRegistrationForm = this.formBuilder.group({
      'cname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'logintype': ['', Validators.required],
      'firstname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      // 'lastname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, , Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'password': ['', [Validators.required, , Validators.compose([CustomValidators.PasswordPolicy])]],
      'pancard': ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces]), Validators.compose([CustomValidators.validpanformate])]],
      'Designation': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      gst: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.validgdteenformate]), Validators.compose([CustomValidators.removeSpaces])]],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });

    this.rFormupdate = this.formBuilder.group({
      'cname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'logintype': ['', Validators.required],
      'firstname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      // 'lastname': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'email': ['', [Validators.required, , Validators.compose([CustomValidators.vaildEmail]), , Validators.compose([CustomValidators.removeSpaces])]],
      'mobile': ['', [Validators.required, , Validators.compose([CustomValidators.validMobile])]],
      'username': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'pancard': ['', [Validators.nullValidator, Validators.compose([CustomValidators.validpanformate]), Validators.compose([CustomValidators.removeSpaces])]],
      'Designation': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'gst': ['', [Validators.nullValidator, , Validators.compose([CustomValidators.validgdteenformate]), Validators.compose([CustomValidators.removeSpaces])]],
      'StateiD': ['', Validators.required], 'DistrictID': ['', Validators.required],
    });
    this.item = localStorage.getItem('phpadminid');
    this.FilterCompanyRegistration = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'CompanyStatus': ['', Validators.required],
      'UserStatus': ['', Validators.required],
      'DocumentsApprove': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });

    this.changepasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, , Validators.compose([CustomValidators.PasswordPolicy])]],
      'cnfpassword': ['', [Validators.required]],
    });

    this.CompanyProfileForm = this.formBuilder.group({
      CompanyName: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      logintype: ['', Validators.required],
      ShortCode: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      ImgName: ['', [Validators.nullValidator]],
      TagLine: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.removeSpaces])]],
      email: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces, CustomValidators.vaildEmail])]],

      gstn: ['', [Validators.nullValidator, , Validators.compose([CustomValidators.validgdteenformate]), Validators.compose([CustomValidators.removeSpaces])]],
      PAN: ['', [Validators.required, Validators.compose([CustomValidators.validpanformate, CustomValidators.removeSpaces])]],
      IndustryType: ['', Validators.required],
      Description: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      StateiD: ['', Validators.required],
      DistrictID: ['', Validators.required],
      OfficeAddress: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      panImg: ['', ''],
      gstImg: ['', ''],
      GstinImgName: ['', ''],
      PanImgName: ['', ''],
      ImgNames: ['', [Validators.nullValidator]],
      mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
      website: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces]), Validators.compose([CustomValidators.websiteaddress])]],
      aboutCompany: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
      landline: ['', Validators.nullValidator],
    });
    this.sectorskils = this.formBuilder.group({
      Userid: ['', [Validators.required]],
      StateiD: ['', [Validators.required]],
      DistrictID: ['', [Validators.required]],
      Caddress: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      CtypeName: ['', [Validators.required]],
      CompanyTypeOther: ['', Validators.compose([CustomValidators.removeSpaces])]
    });


    this.sectortradeskils = this.formBuilder.group({
      industries: ['', [Validators.required]],
      functionalareas: ['', [Validators.required]],
      levelsihirefor: ['', [Validators.required]],
      clientihirefor: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      skillsroles: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      ID: ['',],
      STATUS: ['',]

    });
    this.sectortradeskils.controls['ID'].setValue('0');
    this.sectortradeskils.controls['STATUS'].setValue('I');

    this.GetReportData = this.route.snapshot.paramMap.get('postdata');
    if (this.GetReportData == 'RegisteredCompany') {
      this.BackToDashboard = true;
    }


    this.allcarddata1(this.pageNumber, this.from, this.FilterCompanyRegistration);
  }

  retval: boolean = false;
  newVar: any;
  count: any = 1;
  emailvalues1: any = ''
  Registration(data) {
    this.pageNumber = 0;
    this.from = '';
    this.viewfalse = 0;
    this.scrollinit = false;
    if (this.rForm.controls.cname.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rForm.controls.firstname.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    // if (this.rForm.controls.lastname.value.trim() == '') {
    //   this.toasterService.error("The fields with * are mandatory")
    //   return false;
    // }
    if (this.rForm.controls.Designation.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rForm.controls.username.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rForm.controls.username.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rForm.controls.DistrictID.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }

    if (this.rForm.valid) {
      if (this.count == 1) {
        this.item = localStorage.getItem('phpadminid');
        var adminid = parseInt(JSON.parse(this.item));
        var cname = data.cname.trim();
        var firstname = data.firstname.trim();
        // var lastname = data.lastname;
        var lastname = "";
        var email = data.email.trim();
        var mobile = parseInt(data.mobile.trim());
        var username = data.username.trim();
        var password = Md5.init(data.password.trim());
        var logintype = data.logintype;
        // if (data.pancard != '') {
        if (data.pancard != '' && data.pancard != undefined && data.pancard != null && data.pancard != "") {
          var pancard = data.pancard.toUpperCase().trim();
        }
        // if (data.gst != '') {
        if (data.gst != '' && data.gst != undefined && data.gst != null && data.gst != "") {
          var gst = data.gst.toUpperCase().trim();
        }
        if (gst != undefined) {
          this.cutpanvaluefromgst = gst.substr(2, 10).trim();
        } else {
          this.cutpanvaluefromgst = '';
        }
        var Designation = data.Designation.trim();
        var StateiD = parseInt(data.StateiD);
        var DistrictID = parseInt(data.DistrictID);
        var senddata1 = { "Username": username, "Password": password }
        var senddata = {
          'Adminid': adminid, 'CompanyName': cname, 'Firstname': firstname, 'lastname': lastname,
          'Email': email, 'PhoneNo': mobile, 'Username': username, 'Password': password,
          'Logintype': logintype, 'Pan_Number': pancard, 'Gstn': gst, 'Designation': Designation, 'stateid': StateiD, 'districtid': DistrictID
        }
        if ((pancard != null || gst != null) && (pancard != '' || gst != '')) {
          if ((pancard != null && pancard.length == 10) && (gst != null && gst.length == 15)) {
            if (this.cutpanvaluefromgst == pancard && (gst != '' || pancard != '')) {
              this.spinnerService.show();
              this.registService.CheckMobile(mobile).subscribe(res => {
                this.Response = res;
                if (this.Response.responseResult == false) {
                  this.toasterService.error(this.Response.message);
                  this.rForm.controls['mobile'].setValue('');
                  this.spinnerService.hide();
                  this.count = 1;
                  return false;
                } else {
                  this.Response = [];
                  this.registService.CheckEmail(email).subscribe(res => {
                    this.Response = res;
                    if (this.Response.responseResult == false) {
                      this.toasterService.error(this.Response.message);
                      this.rForm.controls['email'].setValue('');
                      this.spinnerService.hide();
                      this.count = 1;
                      return false;
                    } else {
                      this.Response = [];
                      this.registService.username_verification(username).subscribe(res => {
                        this.Response = res;
                        if (this.Response.responseResult == false) {
                          this.toasterService.error(this.Response.message);
                          this.rForm.controls['username'].setValue('');
                          this.spinnerService.hide();
                          this.count = 1;
                          return false;
                        } else {
                          this.registService.CompanyRegistration(senddata).subscribe(res => {
                            this.Response = res;
                            this.dbResponse = this.Response.responseResult;
                            if (this.dbResponse == true) {
                              this.JobpostService.RegistrationTokengeneration(senddata1).subscribe(res => {
                                this.Responsetoken = res;
                                if (this.Responsetoken != null) {
                                  this.rForm.reset();
                                  this.listing = '0';
                                  this.CompanyRegister = '1';
                                  this.backbtn = '1';
                                  this.searchsts = '0';
                                  this.GetAllState();
                                  $('.page-filters').slideToggle();
                                  this.toasterService.success("Company has been registered successfully.");
                                  this.count = 1;
                                  window.scroll(0, 0);
                                  this.allcarddata1(this.pageNumber, '', this.FilterCompanyRegistration);
                                  this.spinnerService.hide();
                                } else {
                                  this.Responsetoken = [];
                                  this.spinnerService.hide();
                                }
                              });
                            } else {
                              this.count = 0;
                              this.toasterService.error(this.Response.message);
                              this.spinnerService.hide();
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              this.count = 0;
              this.toasterService.error("PAN must be a part of GSTIN");
              this.spinnerService.hide();
            }
          } else {
            this.spinnerService.show();
            this.registService.CheckMobile(mobile).subscribe(res => {
              this.Response = res;
              if (this.Response.responseResult == false) {
                this.toasterService.error(this.Response.message);
                this.rForm.controls['mobile'].setValue('');
                this.spinnerService.hide();
                this.count = 1;
                return false;
              } else {
                this.Response = [];
                this.registService.CheckEmail(email).subscribe(res => {
                  this.Response = res;
                  if (this.Response.responseResult == false) {
                    this.toasterService.error(this.Response.message);
                    this.rForm.controls['email'].setValue('');
                    this.spinnerService.hide();
                    this.count = 1;
                    return false;
                  } else {
                    this.Response = [];
                    this.registService.username_verification(username).subscribe(res => {
                      this.Response = res;
                      if (this.Response.responseResult == false) {
                        this.toasterService.error(this.Response.message);
                        this.rForm.controls['username'].setValue('');
                        this.spinnerService.hide();
                        this.count = 1;
                        return false;
                      } else {
                        this.registService.CompanyRegistration(senddata).subscribe(res => {
                          this.Response = res;
                          this.dbResponse = this.Response.responseResult;
                          if (this.dbResponse == true) {
                            this.JobpostService.RegistrationTokengeneration(senddata1).subscribe(res => {
                              this.Responsetoken = res;
                              if (this.Responsetoken != null) {
                                this.rForm.reset();
                                this.listing = '0';
                                this.CompanyRegister = '1';
                                this.backbtn = '1';
                                this.searchsts = '0';
                                this.GetAllState();
                                $('.page-filters').slideToggle();
                                this.toasterService.success("Company has been registered successfully.");
                                this.count = 1;
                                window.scroll(0, 0);
                                this.allcarddata1(this.pageNumber, '', this.FilterCompanyRegistration);
                                this.spinnerService.hide();
                              } else {
                                this.Responsetoken = [];
                                this.spinnerService.hide();
                              }
                            });
                          } else {
                            this.count = 0;
                            this.toasterService.error(this.Response.message);
                            this.spinnerService.hide();
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
            // this.registService.CompanyRegistration(senddata).subscribe(res => {
            //   this.Response = res;
            //   this.dbResponse = this.Response.responseResult;
            //   if (this.dbResponse == true) {
            //     this.JobpostService.RegistrationTokengeneration(senddata1).subscribe(res => {
            //       this.Responsetoken = res;
            //       if (this.Responsetoken != null) {
            //         this.spinnerService.hide();
            //         this.rForm.reset();
            //         this.listing = '0';
            //         this.CompanyRegister = '1';
            //         this.backbtn = '1';
            //         this.searchsts = '0';
            //         this.GetAllState();
            //         $('.page-filters').slideToggle();
            //         this.toasterService.success("Company has been registered successfully.");
            //         this.count = 1;
            //         this.allcarddata1(this.pageNumber, '', this.FilterCompanyRegistration);
            //       }
            //       else {
            //         this.Responsetoken = [];
            //         this.spinnerService.hide();
            //       }
            //     });
            //   } else {
            //     this.count = 0;
            //     this.toasterService.error(this.Response.message);
            //     this.spinnerService.hide();
            //   }
            // });
          }
        } else {
          this.toasterService.error("Please enter GSTIN OR PAN");
          this.count = 0;
          this.spinnerService.hide();
        }
      }
    } else {
      this.toasterService.error("The fields with * are mandatory");
      this.spinnerService.hide();
    }
    this.count++;
  }

  HireArray: any = [];
  onItemSelect(item: any) {
    // this.HireArray=[];
    this.HireArray.push(item.hiringName);
  }

  onItemDeSelect(item: any) {
    // this.HireArray=[];
    this.HireArray.splice(item.hiringName, 1);
    // this.HireArray.pop(item.hiringName);
  }

  onSelectAll(items: any) {
    this.HireArray = [];
    for (var i = 0; i < items.length; i++) {
      this.HireArray.push(items[i].hiringName);
    }
  }

  EditCompanyRegis(userid: any) {
    this.districtsuer = [];
    this.User_id = parseInt(userid);
    localStorage.setItem('user_id', JSON.stringify(this.User_id));
    this.item1 = localStorage.getItem('companyid');
    this.COMPANYID = JSON.parse(this.item1);
    this.item = localStorage.getItem('phpadminid');
    var adminid = parseInt(JSON.parse(this.item));
    this.UpdateRegisterform = '0';
    this.RegistrationView = '0';

    var senddata = { 'COMPANYID': this.COMPANYID, 'AdminId': adminid, 'userId': this.User_id ,'pageNumber':0}

    this.spinnerService.show();

    this.JobpostService.editdata(senddata).subscribe(res => {
      this.Dbresponse = res;
      

      if (this.Dbresponse != null) {
        this.companydata = this.Dbresponse.lstetMultiusersCompanyProfile[0];
        
        this.spinnerService.hide();
      } else {
        this.companydata = [];
        this.spinnerService.hide();
      }
      if (this.companydata.stateid != '' && this.companydata.stateid != null) {
        // this.GetAllDistrictForUser(this.companydata[0].STATEID);

        // this.JobpostService.GetAllDistrict(this.companydata[0].STATEID).subscribe(res => {
          this.MasterService.GetAllDistrict(this.companydata.stateid).subscribe(res => {
          this.districtsuer = res;
          if (this.districtsuer != null) {
            this.districtsuer = this.districtsuer;
            this.spinnerService.hide();
          }
          else {
            this.districtsuer = [];
          }
        });
      }
      if (this.companydata.companyname) {
        this.rFormupdate.controls['cname'].setValue(this.companydata.companyname);
        this.isname = true;
      }
      else {
        this.isname = false;
      }
      if (this.companydata.logintype) {
        this.rFormupdate.controls['logintype'].setValue(this.companydata.logintype);
        this.isname = true;
      }
      else {
        this.isname = false;
      }

      this.rFormupdate.controls['firstname'].setValue(this.companydata.firstname);
      // this.rFormupdate.controls['lastname'].setValue(this.companydata[0].LASTNAME);
      this.rFormupdate.controls['mobile'].setValue(this.companydata.phoneno);
      this.rFormupdate.controls['email'].setValue(this.companydata.email);
      this.rFormupdate.controls['Designation'].setValue(this.companydata.designation);
      this.rFormupdate.controls['username'].setValue(this.companydata.username);
      // this.rFormupdate.controls['StateiD'].setValue(this.companydata[0].STATEID);

      if (this.companydata.stateid != null && this.companydata.stateid != '') {
        this.rFormupdate.controls['StateiD'].setValue(this.companydata.stateid);
      } else {
        this.rFormupdate.controls['StateiD'].setValue('');
      }
      if (this.companydata.districtid != null && this.companydata.districtid != '') {
        this.rFormupdate.controls['DistrictID'].setValue(this.companydata.districtid);
      } else {
        this.rFormupdate.controls['DistrictID'].setValue('');
      }

      // this.rFormupdate.controls['DistrictID'].setValue(this.companydata[0].DISTRICTID);
      if (this.companydata.pancard) {
        this.rFormupdate.controls['pancard'].setValue(this.companydata.pancard);
        this.isPan = true;
      } else {
        this.isPan = false;
      }
      if (this.companydata.gstno) {
        this.rFormupdate.controls['gst'].setValue(this.companydata.gstno);
        this.isGst = true;
      } else {
        this.isGst = false;
      }
    });
  }

  Registrationupdate(data) {
    this.searchsts = '0';
    $('.page-filters').hide();
    if (this.rFormupdate.controls.firstname.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rFormupdate.controls.username.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }

    // if (this.rFormupdate.controls.lastname.value.trim() == '') {
    //   this.toasterService.error("The fields with * are mandatory")
    //   return false;
    // }

    if (this.rFormupdate.controls.Designation.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.rFormupdate.valid) {
      this.user_id = localStorage.getItem('user_id');
      this.user_id = JSON.parse(this.user_id);
      this.item = localStorage.getItem('phpadminid');
      var adminid = parseInt(JSON.parse(this.item));
      var cname = data.cname;
      var firstname = data.firstname;
      // var lastname = data.lastname;
      var lastname = "";
      var email = data.email;
      var mobile = parseInt(data.mobile);
      var username = data.username;
      var logintype = data.logintype;
      // if (data.pancard != '') {
      if (data.pancard != '' && data.pancard != undefined && data.pancard != null && data.pancard != "") {
        var pancard = data.pancard.toUpperCase();
      }
      // if (data.gst) {
      if (data.gst != '' && data.gst != undefined && data.gst != null && data.gst != "") {
        var gst = data.gst.toUpperCase();
      }

      if (gst != undefined && gst.length == 15) {
        this.cutpanfromgst = gst.substr(2, 10);
      }
      else if (gst == '') {
        gst = undefined;
        this.cutpanfromgst = '';
      }
      else {
        this.cutpanfromgst = '';
      }
      var Designation = data.Designation;
      var StateiD = parseInt(data.StateiD);
      var DistrictID = parseInt(data.DistrictID);
      this.companyid = localStorage.getItem('companyid');
      var companyid = JSON.parse(this.companyid);
      var senddata = {
        'adminid': adminid,
        'CompanyID': companyid,
        'UserId': this.user_id,
        'CompanyName': cname,
        'FirstName': firstname,
        'LastName': lastname,
        'Email': email,
        'PhoneNo': mobile,
        'UserName': username,
        'LoginType': logintype,
        'Pan_Number': pancard,
        'Gstn': gst?gst:'',
        'Designation': Designation,
        'stateid': StateiD,
        'districtid': DistrictID
      }
      if (this.cutpanfromgst == pancard || gst == undefined || pancard == undefined) {
        this.spinnerService.show();
        this.JobpostService.Registrationupdate(senddata).subscribe(res => {
          this.Response = res;
          if (this.Response != null && this.Response.responseResult != false ) {
            this.viewdata(this.Companyid);
            this.district1 = [];
            this.spinnerService.hide();
            this.rForm.reset();
            // this.toasterService.success("User has been updated successfully.");
            this.toasterService.success(this.Response.message);
            this.RegistrationView = '1';
            this.EditButton = '1';
           this.UpdateRegisterform = '1';
          }
          else {
            this.spinnerService.hide();
            this.toasterService.error(this.Response.message);
            this.Response = [];
            return false;
          }
        });
        // this.rForm.reset();
        // this.toasterService.success("User has been updated successfully.");
        // this.RegistrationView = '1';
        // this.EditButton = '1';
        // this.UpdateRegisterform = '1';
      } else {
        this.toasterService.error("PAN must be a part of GSTIN");
      }
    }
    else {
      this.toasterService.error("The fields with * are mandatory");
    }
  }

  updateBack() {
    // this.rFormupdate.controls['StateiD'].setValue('');
    // this.rFormupdate.controls['DistrictID'].setValue('');
    // this.districtsuer=[];
    this.rFormupdate.controls['StateiD'].reset('');
    this.rFormupdate.controls['DistrictID'].reset();

    this.RegistrationView = '1';
    this.UpdateRegisterform = '1';
  }

  email_check_response: any = [];
  emailcheck() {
    this.emailvalues = this.rForm.controls.email.value;
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)) {
      var emailsend = this.emailvalues;
      this.spinnerService.show();
      this.registService.CheckEmail(emailsend).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.email_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.email_check_response = this.Response;
        if (this.Response.responseResult == false) {
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);
          this.spinnerService.hide();
          this.rForm.controls['email'].setValue('');
          return false;
        }
      });
    }
  }

  // emailcheckupdatecase(event: any) {
  //   this.emailvalues = event.target.value;
  //   var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  //   if (this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)) {
  //     var emailsend = this.emailvalues;
  //     this.registService.CheckEmail(emailsend).subscribe(res => {
  //       this.Response = res;
  //       this.dbResponse = this.Response;
  //       if (this.dbResponse != null) {
  //         if (this.dbResponse.responseResult) {
  //           this.checkverifymail = true;
  //         }
  //         else {
  //           this.toasterService.clear();
  //           this.toasterService.error(this.dbResponse.message);
  //           this.checkverifymail = false;
  //           this.rFormupdate.controls['email'].setValue('');
  //         }
  //       } else {
  //         this.toasterService.error(this.Response.message);
  //         this.checkverifymail = false;
  //         this.rFormupdate.controls['email'].setValue('');
  //       }
  //     });
  //   }
  // }


  username_check_response: any = [];
  usernamecheck() {
    this.usernamevalues = this.rForm.controls.username.value;
    if (this.usernamevalues.length > 0) {
      this.spinnerService.show();
      this.registService.username_verification(this.usernamevalues).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.username_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.username_check_response = this.Response;
        if (this.Response.responseResult == false) {
          this.spinnerService.hide();
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);

          this.rForm.controls['username'].setValue('');
          return false;
        }
      });
    }
  }


  gstncheck(event: any) {
    this.gstvalues = event.target.value;
    var gstvalues = this.gstvalues;
    this.panvalue = this.gstvalues.substr(2, 10);
    this.rForm.controls['pancard'].setValue(this.panvalue);
    var reggstin = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
    var senddata = { 'PANGSTN': gstvalues }
    if (this.gstvalues.length == 15 && reggstin.test(this.gstvalues)) {
      this.spinnerService.show();
      this.JobpostService.CheckGstn(senddata).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.lstAdmLoginDetail[0];
        this.dis = true;
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          this.rForm.controls['cname'].setValue(this.dbResponse.companyname);
          this.rForm.controls['logintype'].setValue(this.dbResponse.loginType);
          this.isname = true;
          this.isPan = true;
        }
        else {
          this.spinnerService.hide();
          this.isname = false;
          this.isPan = false;
        }
      })
    }
    else if (this.gstvalues.length == 0 || this.gstvalues.length != 15) {
      this.isname = false;
      this.dis = false;
      this.isPan = false;
    }
  }

  gstncheckupdatecase(event: any) {
    this.gstvalues = event.target.value;
    var gstvalues = this.gstvalues;
    var reggstin = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
    if (this.gstvalues.length == 15 && reggstin.test(this.gstvalues)) {
      this.spinnerService.show();
      this.registService.CheckGstn(gstvalues).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response;
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          if (this.dbResponse.responseResult) {
            this.checkverifygst = true;
          }
          else {
            this.toasterService.error('GSTIN already exist');
            this.checkverifygst = false;
            this.rFormupdate.controls['gst'].setValue('');
          }
        } else {
          this.spinnerService.hide();
          this.toasterService.error(this.Response.message);
          this.checkverifygst = false;
          this.rFormupdate.controls['gst'].setValue('');
        }
      });
    }
  }

  pancheck(event: any) {
    this.panvalues = event.target.value;
    var panvalues = this.panvalues;
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    var senddata = { 'PANGSTN': panvalues }
    if (this.panvalues.length == 10 && regpan.test(this.panvalues)) {
      this.spinnerService.show();
      this.JobpostService.CheckPanCard(senddata).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response.lstAdmLoginDetail[0];
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          this.rForm.controls['cname'].setValue(this.dbResponse.companyname);
          this.rForm.controls['logintype'].setValue(this.dbResponse.loginType);
          this.isname = true;
        }
        else {
          this.isname = false;
          this.spinnerService.hide();
        }
      })
    }
    else if (this.panvalues.length == 0 || this.panvalues.length != 10) {
      this.isname = false;
    }
  }

  pancheckupdatecase(event: any) {
    this.panvalues = event.target.value;
    var panvalues = this.panvalues;
    this.panvalue1 = event.target.value;
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (this.panvalues.length == 10 && regpan.test(this.panvalues)) {
      this.spinnerService.show();
      this.registService.CheckPanCard(panvalues).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response;
        if (this.dbResponse != null) {
          this.spinnerService.hide();
          if (this.dbResponse.responseResult) {
            this.checkveriypan = true;
          }
          else {
            this.toasterService.error(this.dbResponse.message);
            this.checkveriypan = false;
            this.rFormupdate.controls['pancard'].setValue('');
          }
        } else {
          this.spinnerService.hide();
          this.toasterService.error(this.Response.message);
          this.checkveriypan = false;
          this.rFormupdate.controls['pancard'].setValue('');
        }
      });
    }
  }
  mobile_check_response: any = []
  mobilecheck() {
    this.mobilevalues = this.rForm.controls.mobile.value;
    var IndNum = /^[0]?[6789]\d{9}$/;
    if (this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)) {
      this.spinnerService.show();
      this.registService.CheckMobile(this.mobilevalues).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.dbResponse = this.Response;
          this.mobile_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.dbResponse = this.Response;
        this.mobile_check_response = this.Response;

        if (this.Response.responseResult == false) {
          this.spinnerService.hide();
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);

          this.rForm.controls['mobile'].setValue('');
          return false;
        }
      });
    }
  }

  mobilecheckupdatecase(event: any) {
    this.mobilevalues = event.target.value;
    var mobilevalues = this.mobilevalues;
    var IndNum = /^[0]?[6789]\d{9}$/;
    if (this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)) {
      this.registService.CheckMobile(mobilevalues).subscribe(res => {
        this.Response = res;
        this.dbResponse = this.Response;
        if (this.dbResponse != null) {
          if (this.dbResponse.responseResult) {
            this.checkveriymobile = true;
          }
          else {
            this.toasterService.clear();
            this.toasterService.error(this.dbResponse.message);
            this.checkveriymobile = false;
            this.rFormupdate.controls['mobile'].setValue('');
          }
        } else {
          this.toasterService.error(this.Response.message);
          this.checkveriymobile = false;
          this.rFormupdate.controls['mobile'].setValue('');
        }
      });
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

  RestrictSpace(event) {
    if (event.keyCode == 32) {
      return false;
    }
  }

  previous() {
    //this.BackToDashboard = false;
    this.viewfalse = 0;
    this.scrollinit = false;
    this.rForm.controls['logintype'].setValue('');
    this.rForm.controls['DistrictID'].setValue('');
    this.viewfalse = '0';
    this.listing = '0';
    this.CompanyRegister = '0';
    this.backbtn = '0';
    this.searchsts = '0';
    this.GetAllState();
    $('.page-filters').slideToggle();
    this.isname = false;
    this.district1 = [];
  }

  userScroll: any = false;
  companydetails: any = [];
  viewdata(id: any) {
    this.hidecompanyprofile = 0; 
    //     this.ViewSectorTrade == 0;
    // this.SectorAndSkillForm == 0;
    this.userScroll = true;
    this.companyfilter = 0;
    this.AddUserPage = 0;
    this.ShowUsers = 1;
    this.scrollinit = false;
    this.ShowCompanyWorkLocation = 1;
    // this.searchsts = '0';
    $('.page-filters').hide();
    this.viewfalse = '0';
    this.Companyid = parseInt(id);
    this.filtering = '0';
    this.backbtn = '0';
    this.CompanyRegister = '1'
    this.listing = '0';
    this.RegistrationView = '1';
    localStorage.setItem('companyid', id);
    this.item = localStorage.getItem('phpadminid');
    var adminid = parseInt(JSON.parse(this.item));

    var senddata = { CompanyId: this.Companyid, AdminId: adminid, pageNumber: 0 };
    let getserializeddatabyid = JSON.stringify(senddata);
    let getuserdata = {
      'HSTPLRequest': {
        'data': getserializeddatabyid,
        'typeFor': 'AdminCompanyProfileDetail',
      }
    }
    this.spinnerService.show();

    this.companydetails = [];
    this.spinnerService.show();
    // this.JobpostService.GetCompanyDetails(this.Companyid, adminid).subscribe(res => {
    this.CompanyProfileService.GetCompanyData(this.Companyid).subscribe(res => {
      this.Dbresponse = res;
      if (this.Dbresponse.lstCompanyProfile != null) {
        this.companydetails = this.Dbresponse.lstCompanyProfile;
        this.CompanyData = this.companydetails[0];
        this.JobpostService.viewdata(getuserdata).subscribe(res => {
          this.companyregisterdatashow = res;
          // this.companyregisterdatashow=JSON.parse(this.companyregisterdatashow.hstplResponse.data);


          if (this.companyregisterdatashow != null) {
            this.spinnerService.hide();
            // this.companyregisterdatashow = this.companyregisterdatashow.Data;
            this.companyregisterdatashow = JSON.parse(this.companyregisterdatashow.hstplResponse.data);

          } else {
            this.companyregisterdatashow = [];
            this.spinnerService.hide();
          }
        });
      } else {
        this.spinnerService.hide();
        this.CompanyData = this.Dbresponse.lstCompanyProfile;
        this.companydetails = this.companydetails;
      }
    });
    // this.GetCompanydata(this.Companyid);
  }

  singleback() {
    this.WorkLocationshow = [];
    this.WorkLocation = [];
    this.scrollinit = true;
    this.companyfilter = 1;
    this.showSectorskillForm = 0;
    this.hidecompanyprofile = 0;
    this.showlist = 0;
    $('.page-filters').slideToggle();
    this.viewfalse = 1;
    this.RegistrationView = '0';
    this.filtering = '1';
    this.listing = '1';
    this.backbtn = '1';
    this.UpdateRegisterform = '1';
    this.ViewSectorTrade = 0;
    this.SectorAndSkillForm = 0;
    this.allcarddata(0, '', this.copydata);
  }

  ApproveDisapproveUser(userid, status) {
    this.User_id = parseInt(userid);
    let sts;
    if (status == true) {
      sts = false;
    }
    if (status == false) {
      sts = true;
    }
    var senddata = {
      'Userid': this.User_id, 'verifiedBy': this.AdminId, 'adminid': this.AdminId, 'Isverified': sts
    }
    this.searchsts = '0';
    $('.page-filters').hide();
    this.spinnerService.show();
    this.registService.ApproveDisapproveUser(senddata).subscribe(res => {
      this.approvecompanystatus = res;
      if (this.approvecompanystatus.responseResult == true) {
        // this.approvecompanystatus = this.approvecompanystatus.Data;
        this.toasterService.success("User has been Updated suceessfully");
        this.spinnerService.hide();
        this.modalRef.hide();
        this.viewdata(this.Companyid);
      } else {
        this.approvecompanystatus = [];
        this.spinnerService.hide();
      }
    });
  }
  // ApproveCompany(userid: any) {
  //   this.searchsts = '0';
  //   $('.page-filters').hide();
  //   this.User_id = parseInt(userid);
  //   this.item = localStorage.getItem('phpadminid');
  //   var phpadminid = parseInt(JSON.parse(this.item));
  //   this.item1 = localStorage.getItem('companyid');
  //   var companyid = parseInt(JSON.parse(this.item1));
  //   var senddata = { phpadminid: phpadminid, companyid: companyid, user_id: this.User_id }
  //   this.spinnerService.show();
  //   this.JobpostService.ApproveCompany(senddata).subscribe(res => {
  //     this.approvecompanystatus = res;
  //     if (this.approvecompanystatus != null) {
  //       this.spinnerService.hide();
  //       this.modalRef.hide();
  //       this.approvecompanystatus = this.approvecompanystatus.Data;
  //       this.toasterService.success("User has been approved suceessfully.");
  //       this.viewdata(this.Companyid);
  //     } else {
  //       this.approvecompanystatus = [];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  // DisapproveCompany(userid: any) {
  //   this.searchsts = '0';
  //   $('.page-filters').hide();
  //   this.User_id = parseInt(userid);
  //   this.item = localStorage.getItem('phpadminid');
  //   var phpadminid = parseInt(JSON.parse(this.item));
  //   this.item1 = localStorage.getItem('companyid');
  //   var companyid = parseInt(JSON.parse(this.item1));
  //   var senddata = { phpadminid: phpadminid, companyid: companyid, user_id: this.User_id }
  //   this.spinnerService.show();
  //   this.JobpostService.DisapproveCompany(senddata).subscribe(res => {
  //     this.disapprovecompanystatus = res;
  //     if (this.disapprovecompanystatus != null) {
  //       this.modalRef.hide();
  //       this.spinnerService.hide();
  //       this.disapprovecompanystatus = this.disapprovecompanystatus.Data;
  //       if (this.disapprovecompanystatus[0]['ACTION'] == 2) {
  //         this.toasterService.success("User has been disapproved successfully.");
  //       }
  //       else {
  //         this.toasterService.error("User is Inactive");
  //       }

  //       this.viewdata(this.Companyid);
  //     } else {
  //       this.disapprovecompanystatus = [];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  Back() {
    // if (this.GetReportData == 'RegisteredCompany') {
    //   this.BackToDashboard = true;
    // } 
    this.scrollinit = false;
    this.viewfalse = '1';
    this.rForm.reset();
    this.listing = '1';
    this.CompanyRegister = '1';
    this.backbtn = '1';
    // this.searchsts = '1';
    this.filtering = '1';
    this.companyfilter = 1;
    this.UpdateRegisterform = '1';
    $('.page-filters').slideToggle();
  }


  // GetAllState() {
  //   this.spinnerService.show();
  //   this.JobpostService.GetAllStates().subscribe(res => {
  //     this.states = res
  //     if (this.states != null) {
  //       this.spinnerService.hide();
  //       this.states = this.states.Data;

  //     }
  //     else {
  //       this.states = [];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  GetAllState() {
    try {
      this.MasterService.GetAllStates().subscribe(res => {
        this.states = res
        this.states = this.states;
      });
    } catch  { }
  }

  // GetAllDistrict(event: any) {
  //   this.UserRegistrationForm.controls['DistrictID'].setValue('');
  //   this.rForm.controls['DistrictID'].setValue('');
  //   if (event == undefined || event == "") {
  //     this.district1 = [];
  //     this.FilterCompanyRegistration.controls['DistrictID'].setValue('');
  //     return false;
  //   }
  //   this.spinnerService.show();
  //   this.JobpostService.GetAllDistrict(event).subscribe(res => {
  //     this.district1 = res
  //     if (this.district1 != null) {
  //       this.district1 = this.district1.Data;
  //       this.spinnerService.hide();
  //     }
  //     else {
  //       this.district1 = [];
  //     }
  //   });
  // }

  GetAllDistrict(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
     // this.FilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if (event != '' || event != null) {
      //this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();

    // this.jobpostService.GetAllDistrict(event).subscribe(res => {
    //   this.district1 = res
    this.MasterService.GetAllDistrict(event).subscribe(res => {
      this.district1 = res
      if (this.district1 != null) {
        this.spinnerService.hide();
        this.district1 = this.district1;
      }
      else {
        this.district1 = [];
        this.spinnerService.hide();
      }
    });
  }

  districtcompany: any = [];
  GetAllDistrictForCompany(event: any) {
    this.CompanyProfileForm.controls['DistrictID'].setValue('');
    this.toasterService.error('please select district');
    // this.rForm.controls['DistrictID'].setValue('');
    if (event == undefined || event == "") {
      this.districtcompany = [];
      // this.FilterCompanyRegistration.controls['DistrictID'].setValue('');
      return false;
    }
    this.spinnerService.show();
    this.MasterService.GetAllDistrict(event).subscribe(res => {
      this.districtcompany = res;
      if (this.districtcompany != null) {
        this.districtcompany = this.districtcompany;
        this.spinnerService.hide();
      }
      else {
        this.districtcompany = [];
      }
    });
  }


  districtsuer: any = [];
  GetAllDistrictForUser(event: any) {
    this.rFormupdate.controls['DistrictID'].setValue('');
    if (event == undefined || event == "") {
      this.districtsuer = [];
      return false;
    }
    this.spinnerService.show();
    // this.JobpostService.GetAllDistrict(event).subscribe(res => {
      this.MasterService.GetAllDistrict(event).subscribe(res => {
      this.districtsuer = res;
      if (this.districtsuer != null) {
        this.districtsuer = this.districtsuer;
        this.spinnerService.hide();
      }
      else {
        this.districtsuer = [];
      }
    });
  }


  districtworklocation: any = [];
  GetAllDistrictForWorkLocation(stateid: any) {
    this.sectorskils.controls['DistrictID'].setValue('');
    if (stateid == undefined || stateid == "") {
      this.districtworklocation = [];
      return false;
    }
    this.spinnerService.show();
    // this.JobpostService.GetAllDistrict(stateid).subscribe(res => {
      this.MasterService.GetAllDistrict(stateid).subscribe(res => {
      this.districtworklocation = res;
      if (this.districtworklocation != null) {
        this.districtworklocation = this.districtworklocation;
        this.spinnerService.hide();
      }
      else {
        this.districtworklocation = [];
      }
    });
  }



  copydata: any = '';
  search: any = '';
  logintype: any = '';
  StateiD: any = '';
  DistrictID: any = '';
  CompanyStatus: any = '';
  UserStatus: any = '';
  DocumentsApprove: any = '';
  allcarddata(pageNumber: any, from: any, data) {
    this.scrollinit = false;
    this.Companyid = 0;
    this.viewfalse = '1';
    this.Registrationbk = '0';
    this.RegistrationView = '0';
    this.filtering = '1';
    this.listing = '1';
    this.copydata = data;
    var adminid = JSON.parse(this.item);
    if (data == '') {
      var datasend = {
        'Adminid': adminid, 'companyid': 0, 'logintype': "", 'StateiD': 0, 'DistrictID': 0, 'JobKeyword': "", 'PageNumber': pageNumber, 'compActive': '', DocumentsApprove: ''
      }
      this.from = from;
      if (this.from == 'scroll') {
        this.spinnerService.show();
        this.registService.GetFilterCompanyRegistrationCompany(datasend).subscribe(res => {
          this.Response = res;
          if (this.Response.lstCompanyProfile.length > 0) {
            this.companyregisterdata = this.companyregisterdata.concat(this.Response.lstCompanyProfile);
            this.spinnerService.hide();
            this.from = 'scroll';
          } else {
            this.Response = [];
            this.from = '';
            if (pageNumber == 0) {
              this.toasterService.error("No Record Found");
            }
            this.spinnerService.hide();
          }
          this.delay = false;
        });
      } else {
        this.spinnerService.show();
        this.registService.GetFilterCompanyRegistrationCompany(datasend).subscribe(res => {
          this.DbResponce = res;
          if (this.DbResponce.lstCompanyProfile.length > 0) {
            this.spinnerService.hide();
            this.companyregisterdata = this.DbResponce.lstCompanyProfile;
          } else {
            this.companyregisterdata = [];
            this.toasterService.error("No Record Found");
            this.spinnerService.hide();
          }
          this.delay = false;
          this.from = '';
        });
      }
    }

    else {
      if (this.copydata.JobKeyword == null) {
        this.searchsts = '1';
      }
      if (this.copydata.JobKeyword != undefined || this.copydata.logintype != undefined || this.copydata.StateiD != undefined || this.copydata.DistrictID != undefined) {
        this.searchsts = '1';
      }
      if (data.JobKeyword != undefined) {
        this.search = data.JobKeyword;
      } else {
        this.search = '';
      }
      if (data.logintype != undefined) {
        this.logintype = data.logintype;
      } else {
        this.logintype = '';
      }

      if (data.DocumentsApprove != undefined) {
        if (data.DocumentsApprove == 'Yes') {
          this.DocumentsApprove = 1;
        }
        else if (data.DocumentsApprove == 'No') {
          this.DocumentsApprove = 0;
        }
      } else {
        this.DocumentsApprove = '';
      }
      if (data.CompanyStatus != undefined) {
        if (data.CompanyStatus == 'Active') {
          this.CompanyStatus = 1;
        }
        else if (data.CompanyStatus == 'Inactive') {
          this.CompanyStatus = 0;
        }
        else {
          this.CompanyStatus = '';
        }

      } else {
        this.CompanyStatus = '';
      }

      // if (data.UserStatus != undefined) {
      //   if (data.UserStatus == 'AllApproveUser') {
      //     this.UserStatus = 1;
      //   }
      //   else if (data.UserStatus == 'AllDisapproveUser') {
      //     this.UserStatus = 2;
      //   }

      //   else if (data.UserStatus == 'PartialApproveUser') {
      //     this.UserStatus = 3;
      //   }

      //   else if (data.UserStatus == 'PendingUser') {
      //     this.UserStatus = 4;
      //   }
      // } else {
      //   this.UserStatus = '';
      // }

      if (data.StateiD != undefined && data.StateiD != "") {
        this.StateiD = parseInt(data.StateiD);
      } else {
        this.StateiD = 0;
      }
      if (data.DistrictID != undefined && data.DistrictID != "") {
        this.DistrictID = parseInt(data.DistrictID);
      } else {
        this.DistrictID = 0;
      }
      if (pageNumber == 0) {
        this.pageNumber = 0;
      } else {
        this.pageNumber = pageNumber;
      }

      let statedid;
      let districtid;
      statedid = this.FilterCompanyRegistration.value.StateiD;
      districtid = this.FilterCompanyRegistration.value.DistrictID;
      let statename = (this.states).filter(function (entry) {
        return entry.ID == statedid;
      });
      let districtname = (this.district1).filter(function (entry) {
        return entry.ID == districtid;
      });
      var company_id = 0;
      this.ShowPushData = {};
      this.ShowPushData = {
        "logintype": this.FilterCompanyRegistration.value.logintype != '' && this.FilterCompanyRegistration.value.logintype != null ? this.FilterCompanyRegistration.value.logintype : 'NA',
        "StateiD": statename != '' ? statename[0]['STATENAME'] : 'NA',
        "DistrictID": districtname != '' ? districtname[0]['DISTRICTNAME'] : 'NA',
        "JobKeyword": this.FilterCompanyRegistration.value.JobKeyword != '' && this.FilterCompanyRegistration.value.JobKeyword != null ? this.FilterCompanyRegistration.value.JobKeyword : 'NA',
        "CompanyStatus": this.FilterCompanyRegistration.value.CompanyStatus != '' && this.FilterCompanyRegistration.value.CompanyStatus != null ? this.FilterCompanyRegistration.value.CompanyStatus : 'NA',
        // "UserStatus": this.FilterCompanyRegistration.value.UserStatus != '' && this.FilterCompanyRegistration.value.UserStatus != null ? this.FilterCompanyRegistration.value.UserStatus : 'NA',
        "DocumentsApprove": this.FilterCompanyRegistration.value.DocumentsApprove != '' && this.FilterCompanyRegistration.value.DocumentsApprove != null ? this.FilterCompanyRegistration.value.DocumentsApprove : 'NA'
      };
      var senddata = { 'Adminid': adminid, 'companyid': company_id, 'logintype': this.logintype, 'StateiD': this.StateiD, 'DistrictID': this.DistrictID, 'JobKeyword': this.search, 'PageNumber': this.pageNumber, 'compActive': this.CompanyStatus, 'DocumentsApprove': this.DocumentsApprove }
      this.from = from;
      if (this.from == 'scroll') {
        this.spinnerService.show();
        this.registService.GetFilterCompanyRegistrationCompany(senddata).subscribe(res => {
          this.Response = res;
          if (this.Response.lstCompanyProfile.length > 0) {
            this.companyregisterdata = this.companyregisterdata.concat(this.Response.lstCompanyProfile);
            this.spinnerService.hide();
            this.from = 'scroll';
          } else {
            this.Response = [];
            this.from = '';
            if (pageNumber == 0) {
              this.toasterService.error("No Record Found");
            }
            this.spinnerService.hide();
          }
          this.delay = false;
        });
      } else {
        this.spinnerService.show();
        this.registService.GetFilterCompanyRegistrationCompany(senddata).subscribe(res => {
          this.companyregisterdata = res;
          if (this.companyregisterdata.lstCompanyProfile.length > 0) {
            this.spinnerService.hide();
            this.companyregisterdata = this.companyregisterdata.lstCompanyProfile;
          } else {
            this.companyregisterdata = [];
            this.toasterService.error("No Record Found");
            this.spinnerService.hide();
          }
          this.delay = false;
          this.from = '';
        });
      }
      this.from = '';
    }
  }
  scrollinit: boolean = false;
  allcarddata1(pageNumber: any, from: any, data) {
    if (this.route.snapshot.paramMap.get('postdata') == 'Registered') {
      this.getdata = this.route.snapshot.paramMap.get('postdata');
    } else {
      this.getdata = '';
    }
    this.scrollinit = true;
    this.viewfalse = '0';
    this.Registrationbk = '0';
    this.RegistrationView = '0';
    this.filtering = '1';
    this.listing = '1';

    if (data.JobKeyword != undefined) {
      this.search = data.JobKeyword;
    } else {
      this.search = '';
    }
    if (data.logintype != undefined) {
      this.logintype = data.logintype;
    } else {
      this.logintype = '';
    }

    if (data.DocumentsApprove != undefined) {
      if (data.DocumentsApprove == 'Yes') {
        this.DocumentsApprove = 1;
      }
      else if (data.DocumentsApprove == 'No') {
        this.DocumentsApprove = 0;
      }
    } else {
      this.DocumentsApprove = '';
    }

    if (data.CompanyStatus != undefined) {
      if (data.CompanyStatus == 'Active') {
        this.CompanyStatus = 1;
      }
      else if (data.CompanyStatus == 'Inactive') {
        this.CompanyStatus = 0;
      }
    } else {
      this.CompanyStatus = '';
    }

    // if (data.UserStatus != undefined) {
    //   if (data.UserStatus == 'AllApproveUser') {
    //     this.UserStatus = 1;
    //   }
    //   else if (data.UserStatus == 'AllDisapproveUser') {
    //     this.UserStatus = 2;
    //   }

    //   else if (data.UserStatus == 'PartialApproveUser') {
    //     this.UserStatus = 3;
    //   }

    //   else if (data.UserStatus == 'PendingUser') {
    //     this.UserStatus = 4;
    //   }

    // } else {
    //   this.UserStatus = 1;
    // }

    if (data.StateiD != undefined && data.StateiD != "") {
      this.StateiD = parseInt(data.StateiD);
    } else {
      this.StateiD = 0;
    }
    if (data.DistrictID != undefined && data.DistrictID != "") {
      this.DistrictID = parseInt(data.DistrictID);
    } else {
      this.DistrictID = 0;
    }
    if (pageNumber == 0) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = pageNumber;
    }
    var adminid = JSON.parse(this.item);
    let statedid;
    let districtid;
    statedid = this.FilterCompanyRegistration.value.StateiD;
    districtid = this.FilterCompanyRegistration.value.DistrictID;
    let statename = (this.states).filter(function (entry) {
      return entry.ID == statedid;
    });
    let districtname = (this.district1).filter(function (entry) {
      return entry.ID == districtid;
    });
    var company_id = 0;
    var senddata = { 'Adminid': adminid, 'companyid': company_id, 'logintype': this.logintype, 'StateiD': this.StateiD, 'DistrictID': this.DistrictID, 'JobKeyword': this.search, 'PageNumber': this.pageNumber, 'compActive': this.CompanyStatus, 'DocumentsApprove': this.DocumentsApprove }
    this.from = from;
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.registService.GetFilterCompanyRegistrationCompany(senddata).subscribe(res => {
        this.Response = res;
        if (this.Response.lstCompanyProfile.length > 0) {
          this.companyregisterdata = this.companyregisterdata.concat(this.Response.lstCompanyProfile);
          this.spinnerService.hide();
          this.from = 'scroll';
        } else {
          this.Response = [];
          this.from = '';
          if (pageNumber == 0) {
            this.toasterService.error("No Record Found");
          }
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    } else {
      this.spinnerService.show();
      this.registService.GetFilterCompanyRegistrationCompany(senddata).subscribe(res => {
        this.companyregisterdata = res;
        if (this.companyregisterdata.lstCompanyProfile.length > 0) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.lstCompanyProfile;
        } else {
          this.companyregisterdata = [];
          this.toasterService.error("No Record Found");
          this.spinnerService.hide();
        }
        this.delay = false;
        // this.from = '';
      });
    }
    // this.from = '';
  }


  allcarddatareset() {
    this.Companyid = 0;
    this.pageNumber = 0;
    this.searchsts = '0';
    this.FilterCompanyRegistration.controls['JobKeyword'].setValue("");
    this.FilterCompanyRegistration.controls['DistrictID'].setValue("");
    this.FilterCompanyRegistration.controls['StateiD'].setValue("");
    this.FilterCompanyRegistration.controls['logintype'].setValue("");
    this.allcarddata1(this.pageNumber, '', '');
    this.district1 = [];
  }
  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  PushedTemplatedApproval(template: TemplateRef<any>, ApprovalStatus: any) {
    if (ApprovalStatus == 1) {
      this.toasterService.error("Firstly give the owner permission to other user then inactive the owner");
      return false;
    } else {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }

  PushedTemplated(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  declineBox(): void {
    this.modalRef.hide();
  }

  updpassword: any = '0';
  update_company_id: any = ''
  updatePasswordId(id) {
    this.update_company_id = id;
    this.resetform();
    this.updpassword = '1';
  }

  resetform() {
    this.password = '';
    this.cnfpassword = '';
    // this.companydetails=[];
    this.changepasswordForm.reset();
  }

  password_response: any = {};
  password: any = '';
  cnfpassword: any = '';
  updatadatashow: any = '0';
  changepassword(data) {
    var password = data.password;
    var cnfpassword = data.cnfpassword;
    if (password == '' || password == null) {
      this.toasterService.error('Please enter password');
      return false;
    }
    else if (!this.changepasswordForm.valid) {
      this.toasterService.error('Password policy not match');
      return false;
    } else if (cnfpassword == '' || cnfpassword == null) {
      this.toasterService.error('Please enter  confirm password');
      return false;
    } else if (password != cnfpassword) {
      this.toasterService.error('Password and confirm password did not match');
      return false;
    } else {
      var newPass = (password);
      this.password = Md5.init(newPass);
      var confirmPass = Md5.init(cnfpassword);
      this.cnfpassword = confirmPass;
      let data = { 'UserId': this.update_company_id, 'UserPassword': this.password };
      this.spinnerService.show();
      this.JobpostService.updatePassword(data).subscribe(res => {
        this.password_response = res;
        if (this.password_response != null) {
          if (this.password_response.responseResult == true) {
            this.toasterService.success('Company password  has been updated successfully.');
            this.spinnerService.hide();
            $('#companydetails').hide();
            $('body').removeClass('modal-open');
            $('body  .modal-backdrop.in').hide();
            this.password = '';
            this.cnfpassword = '';
            this.updatadatashow = 0;
            this.updpassword = '0';
            this.resetform();
          }
        }
        else {
          this.password_response = [];
          this.spinnerService.hide();
        }
      });
    }
  }

  ///////////////////// Update Company Profile Start Here ////////////////////////
  UpdateCompany(CompanyId) {
    // if(this.CompanyProfileForm.controls.IndustryType.value==""){
    //  this.CompanyProfileForm.controls['IndustryType'].setValue("");
    // }
    //this.CompanyProfileForm.controls['IndustryType'].setValue("");
   

    this.WorkLocationshow = [];
    this.WorkLocation = [];
    this.RegistrationView = 0;
    this.companyprofileshow = 1;
    this.Exitprofile = 1;
    this.ShowCompanyWorkLocation = 0;
    this.showSectorskillForm = 0;
    this.GetCompanyEditdata();
    
    // this.imagename='';
    this.companylogo='';
    this.gstImage='';
    this.GstnExtention='';
    this.panImage1='' ;
    this.PanExtention='';
   
   
    this.showlist = '0';
  }

  exitCompanyprofile() {
    this.ViewSectorTrade = 0;
    this.Showsectorbutton = '0';
    this.SectorAndSkillForm = 0;
    this.base64textString = '';
    this.CompanyProfileForm.reset();
    this.hidecompanyprofile = 0;
    this.ShowUsers = 1;
    this.RegistrationView = 1;
    this.companyprofileshow = 0;
    this.Exitprofile = 0;
    this.ShowCompanyWorkLocation = 1;
    this.showSectorskillForm = 0;
  }

  GetCompanyEditdata() {
    this.districtcompany = [];
    if (this.CompanyData.stateiD != '') {
      // this.JobpostService.GetAllDistrict(this.CompanyData.stateiD).subscribe(res => {
        this.MasterService.GetAllDistrict(this.CompanyData.stateiD).subscribe(res => {
        this.districtcompany = res;
        if (this.districtcompany != null) {
          this.districtcompany = this.districtcompany;
          this.spinnerService.hide();
        }
        else {
          this.districtcompany = [];
        }
      });

    }
    this.count = 1;
    this.editid = true;
    this.showMagGst = false;
    this.showMagPan = false;
    this.CompanyProfileForm.controls['CompanyName'].setValue(this.CompanyData.companyName);
    this.CompanyProfileForm.controls['gstn'].setValue(this.CompanyData.gstn);
    this.CompanyProfileForm.controls['Description'].setValue(this.CompanyData.description);
    this.CompanyProfileForm.controls['StateiD'].setValue(this.CompanyData.stateiD != '' ? this.CompanyData.stateiD : '');
    this.CompanyProfileForm.controls['DistrictID'].setValue(this.CompanyData.districtID != '' ? this.CompanyData.districtID : '');
    this.imagename = this.CompanyData.image;
    if (this.CompanyData.panImage) {
      this.panImage1 = this.CompanyData.panImage;
      this.showMagPan = true;
    }
    if (this.CompanyData.gstinImage) {
      this.gstGetImage = this.CompanyData.gstinImage;
      this.gstGetImg = true;
      this.showMagGst = false;
    }
    if (this.CompanyData.panImage) {
      this.panGetImage = this.CompanyData.panImage;
      this.panGetImg = true;
      this.showMagPan = false;
    }

    this.CompanyProfileForm.controls['PAN'].setValue(this.CompanyData.pan);
    this.CompanyProfileForm.controls['email'].setValue(this.CompanyData.email);
    // this.CompanyProfileForm.controls['IndustryType'].setValue(this.CompanyData.industryID);
    this.CompanyProfileForm.controls['IndustryType'].setValue(this.CompanyData.industryID != 0 && this.CompanyData.industryID != '' && this.CompanyData.industryID != null ? this.CompanyData.industryID : '');
    this.CompanyProfileForm.controls['TagLine'].setValue(this.CompanyData.tagLine);
    this.CompanyProfileForm.controls['OfficeAddress'].setValue(this.CompanyData.officeAddress);
    this.CompanyProfileForm.controls['ImgNames'].setValue(this.CompanyData.imgName);
    this.CompanyProfileForm.controls['PanImgName'].setValue(this.CompanyData.PanImgName);
    this.CompanyProfileForm.controls['GstinImgName'].setValue(this.CompanyData.GstinImgName);
    this.CompanyProfileForm.controls['logintype'].setValue(this.CompanyData.loginType);
    this.CompanyProfileForm.controls['ShortCode'].setValue(this.CompanyData.companyShortName);
    this.CompanyProfileForm.controls['mobile'].setValue(this.CompanyData.mobile);
    this.CompanyProfileForm.controls['website'].setValue(this.CompanyData.website);
    this.CompanyProfileForm.controls['aboutCompany'].setValue(this.CompanyData.aboutCompany);
    this.CompanyProfileForm.controls['landline'].setValue(this.CompanyData.landLineNo);
    this.CompanyProfileService.GetCompanyTypeData().subscribe(res => {
      this.companytype = res;
      this.spinnerService.hide();
    });
    this.hidecompanyprofile = 0;
    this.GetCompanydata(this.Companyid);
  }

  GetCompanydata(companyId) {
    this.spinnerService.show();
    this.CompanyProfileService.GetCompanyData(companyId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.CompanyData = this.DbResponce.lstCompanyProfile[0];
        if (this.CompanyData.panImage) {
          this.panGetImage = this.CompanyData.panImage;
          this.panGetImg = true;
          this.showMagPan = false;
        }
        if (this.CompanyData.gstinImage) {
          this.gstGetImage = this.CompanyData.gstinImage;
          this.gstGetImg = true;
          this.showMagGst = false;
        }
      }
      else {
        this.DbResponce = [];
        this.spinnerService.hide();
      }
      this.spinnerService.show();
      this.MasterService.GetAllIndustryArea().subscribe(res => {
        this.industialrea = res
        if (this.industialrea != null) {
          this.spinnerService.hide();
          this.industialrea = this.industialrea;
        }
        else {
          this.industialrea = [];
          this.spinnerService.hide();
        }
      });
      this.spinnerService.show();
    });
  }


  UpdateCompanyProfile() {
    var str = this.CompanyProfileForm.controls.landline.value;
    var reg = '000000000000';

    var webaddress = this.CompanyProfileForm.controls.website.value;

    // var webaddressreg = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

    var webaddressreg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; 

    if (this.CompanyProfileForm.controls.ShortCode.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false
    }
    // if (this.CompanyProfileForm.controls.TagLine.value.trim() == '') {
    //   this.toasterService.error("The fields with * are mandatory")
    //   return false
    // }
    if (this.CompanyProfileForm.controls.OfficeAddress.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false
    }
    if (this.CompanyProfileForm.controls.email.value.trim() == '') {
      this.toasterService.error("Please enter your email.")
      return false
    }
    if (this.CompanyProfileForm.controls.IndustryType.value == 0) {
      this.toasterService.error("Please select industry.")
      return false
    }
    this.sectorskils.controls['StateiD'].setValue('');
    this.sectorskils.controls['DistrictID'].setValue('');
    if (this.companyTypeO == "5") {
      if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls['CtypeName'].value == '') {
        if (this.sectorskils.controls['CompanyTypeOther'].value == '') {
          this.toasterService.error("Please enter the other value.");
          return false;
        }
      }
    }

    if (str != "" && str != null && str != undefined) {
      if (str.match(reg)) {
        this.toasterService.error("Please enter valid landline number");
        return false
      }

    }

    if (this.CompanyProfileForm.controls.website.value != "" && this.CompanyProfileForm.controls.website.value != null && this.CompanyProfileForm.controls.website.value != undefined) {
      if (!webaddress.match(webaddressreg)) {
        this.toasterService.error("Please enter valid website address");
        return false
      }
    }
    
    if (this.count == 1) {

      var companyName = this.CompanyProfileForm.value.CompanyName;
      var TagLine = this.CompanyProfileForm.value.TagLine;
      var logintype = this.CompanyProfileForm.value.logintype;
      var email = this.CompanyProfileForm.value.email;
      if (this.CompanyProfileForm.value.gstn != '' && this.CompanyProfileForm.value.gstn != undefined && this.CompanyProfileForm.value.gstn != null) {
        var gstn = this.CompanyProfileForm.value.gstn.toUpperCase();
      } 
      if (this.CompanyProfileForm.value.PAN != '' && this.CompanyProfileForm.value.PAN != undefined && this.CompanyProfileForm.value.PAN != null) {
        var PAN = this.CompanyProfileForm.value.PAN.toUpperCase();
      }
      var IndustryType = parseInt(this.CompanyProfileForm.value.IndustryType);
      var Description = this.CompanyProfileForm.value.Description ? this.CompanyProfileForm.value.Description : '';
      var StateiD = this.CompanyProfileForm.value.StateiD;
      var DistrictID = this.CompanyProfileForm.value.DistrictID;
      var OfficeAddress = this.CompanyProfileForm.value.OfficeAddress;
      var companyid = this.CompanyData.companyId;
      var companyshortname = this.CompanyProfileForm.value.ShortCode;
      var mobile = this.CompanyProfileForm.value.mobile;
      var website = this.CompanyProfileForm.value.website ? this.CompanyProfileForm.value.website : '';
      var aboutCompany = this.CompanyProfileForm.value.aboutCompany ? this.CompanyProfileForm.value.aboutCompany : '';
      var landline = this.CompanyProfileForm.value.landline ? this.CompanyProfileForm.value.landline : '';
      

      var ImgNames = this.CompanyProfileForm.value.ImgNames ? this.CompanyProfileForm.value.ImgNames : '';
     // var ImgNames = this.companylogo ? this.companylogo : '';
      // var ImagePath = this.imagename ? this.imagename : null;
      var ImagePath = this.companylogo ? this.companylogo : null;
      
    
      var GstinDocName = "GSTN";
      //var GstinImgName = this.imgGstName?this.imgGstName:'';
      var GstinImgName = this.CompanyProfileForm.value.GstinImgName?this.CompanyProfileForm.value.GstinImgName:'';
      var GstinImage = this.gstImage?this.gstImage:null;
      var GstnExtention = this.GstnExtention;
     
     
      var PanDocName = "PAN";
     // var PanImgName =  this.imgPanName? this.imgPanName:'';
     var PanImgName = this.CompanyProfileForm.value.PanImgName?this.CompanyProfileForm.value.PanImgName:'';
     
      var PanImage = this.panImage1?this.panImage1:null;
      var PanExtention = this.PanExtention;

      if (gstn != undefined && gstn.length == 15) {
        this.cutpanfromgst = gstn.substr(2, 10);
      }
      else if (gstn == '') {
        gstn = undefined;
        this.cutpanfromgst = '';
      }
      else {
        this.cutpanfromgst = '';
      }
      var senddata = {
        'adminid': this.AdminId,
        'CompanyName': companyName,
        'Description': Description,
        'StateiD': StateiD,
        'DistrictID': DistrictID,
        'IndustryType': IndustryType,
        'PAN': PAN,
        'OfficeAddress': OfficeAddress,
        'ImgName': ImgNames,
        'Image': ImagePath,
        'TagLine': TagLine,
        'companyid': companyid,
        'gstn': gstn,
        'companyshortname': companyshortname,
        'Email': email,
        'Mobile': mobile,
        'AboutCompany': aboutCompany,
        'Website': website,
        'LandLineNo': landline,
        'GstinImage': GstinImage,
        'PanImage': PanImage,
        'PanImgName': PanImgName,
        'GstinImgName': GstinImgName,
        'GstinDocName': GstinDocName,
        'PanDocName': PanDocName,
        'GstnExtention': GstnExtention,
        'PanExtention': PanExtention,
      };

      if (this.cutpanfromgst == PAN || gstn == undefined || PAN == undefined) {
        this.spinnerService.show();
        this.CompanyProfileService.SaveCompanyProfile(senddata).subscribe(res => {
          this.DbResponce = res;
          if (this.DbResponce.responseResult != false) {
            this.viewdata(this.Companyid);
            this.toasterService.success(this.DbResponce.message);
            this.ViewSectorTrade = 0;
            this.Showsectorbutton = '0';
            this.SectorAndSkillForm = 0;
            this.CompanyProfileForm.reset();
          }
          else {
            this.toasterService.error(this.DbResponce.message);
            this.DbResponce = [];
            this.CompanyProfileForm.controls['ImgName'].setValue('');
            this.imagename = '';
            this.base64textString = [];
            this.spinnerService.hide();
            this.companyprofileshow = '1';
            this.count = 1;
          }
        });
        this.companyprofileshow = 0;
        this.hidecompanyprofile = 0;
        this.ShowCompanyWorkLocation = 1;
      }
      else {
        this.companyprofileshow = '1';
        this.toasterService.error("PAN must be a part of GSTIN");
        this.count = 0;
      }
    }
    this.count++;
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
    let ValidImageExt = ["jpeg", "png", "jpg", "pdf"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toasterService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      this.CompanyProfileForm.controls['ImgName'].setValue('');
      return false;
    }
    else {
      this.currentFile = this.currentFile1;
    }
    if (this.img == 'gstImg') {

      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    } else if (this.img == 'panImg') {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    } else {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    }
    var mimetypereader = new FileReader();
    mimetypereader.onloadend = this.CheckMimeType.bind(this);
    const Eblob = file.slice(0, 4);
    var data = mimetypereader.readAsArrayBuffer(Eblob);
  }


  onUploadChangeCompanyLogo(evt: any, sf: any) {
    this.img = sf;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile1 = file;
    var imn1 = this.currentFile1.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    if ($.inArray(imn1[1], ValidImageExt) < 0) {
      this.toasterService.error("Only formats are allowed : jpg, jpeg & png");
      this.currentFile = '';
      this.CompanyProfileForm.controls['ImgName'].setValue('');
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
      this.toasterService.error("Only formats are allowed :pdf, jpg, jpeg & png");
      $("#fileProfile").val('');
      if (this.img == 'gstImg') {
        this.CompanyProfileForm.controls.gstImg.setValue('');
      } else if (this.img == 'panImg') {
        this.CompanyProfileForm.controls.panImg.setValue('');
      } else {
        this.CompanyProfileForm.controls.ImgName.setValue('');
      }
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toasterService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        if (this.img == 'gstImg') {
          this.CompanyProfileForm.controls.gstImg.setValue('');
        } else if (this.img == 'panImg') {
          this.CompanyProfileForm.controls.panImg.setValue('');
        } else {
          this.CompanyProfileForm.controls.ImgName.setValue('');
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
  companylogo:any;
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    if (this.img == 'gstImg') {
      var imn2 = imn.split('.');
      this.imgGstName = imn;
      this.GstnExtention = imn2[1];
      this.gstImage = 'data:image/png;base64,' + btoa(e.target.result);
      this.showMagGst = true;
      this.gstGetImg = false;
      this.CompanyProfileForm.controls['GstinImgName'].setValue("");
    } else if (this.img == 'panImg') {

      var imn3 = imn.split('.');
      this.imgPanName = imn;
      this.PanExtention = imn3[1];
      this.panImage1 = 'data:image/png;base64,' + btoa(e.target.result);
      this.showMagPan = true;
      this.panGetImg = false;
      this.CompanyProfileForm.controls['PanImgName'].setValue("");
    } else {

      this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
      for (var i = 0; i < this.base64textString.length; i++) {
        this.imagename = '';
        this.imagename = this.base64textString[i];
        this.companylogo=this.base64textString[i];
      }
      this.CompanyProfileForm.controls['ImgNames'].setValue('');
    }
  }
  ///////////////////// Update Company Profile End Here ////////////////////////

  //////////////////// Add Work Location Start Here  ////////////
  Showsectorbutton: any = '0';
  Addsectorbutton() {

    this.ViewSectorTrade = 0;
    this.SectorAndSkillForm = 0;
    this.ShowUsers = 0;
    this.Registrationbk = 0;
    this.count = '1';
    this.Showsectorbutton = '1';
    this.editid = false;
    this.showSectorskillForm = '1';
    this.hidecompanyprofile = 0;
    this.sectorskils.reset();
    this.GetUserData(this.Companyid);
    this.GetCompanyType();
    this.sectorskils.controls['StateiD'].setValue("");
    this.sectorskils.controls['DistrictID'].setValue("");
    this.sectorskils.controls['CtypeName'].setValue("");
    this.sectorskils.controls['CompanyTypeOther'].setValue("");
  }

  users: any = [];
  GetUserData(companyId) {
    this.sectorskils.controls['Userid'].setValue('');
    this.spinnerService.show();
    this.MasterService.GetAllUser(companyId).subscribe(res => {
      this.dbResponse = res;
      if (this.dbResponse != null) {
        this.spinnerService.hide();
        this.users = this.dbResponse.lstAdminVerifiedUser;
      }
      else {
        this.users = [];
        this.spinnerService.hide();
      }
    });
  }

  WorkLocation: any = [];
  WorkLocationshow: any = [];
  exitHireForm() {
    this.ShowUsers = 1;
    this.showSectorskillForm = '0';
    this.hidecompanyprofile = 0;
    this.WorkLocation = [];
    this.WorkLocationshow = [];
  }

  ctype: any;
  displaytextBox: any = [];
  ShowTextBox(event: any) {
    this.ctype = event.target.value;
    this.companyTypeO = this.ctype;
    if (this.ctype == 5) {
      this.displaytextBox = 1;
    }
    else {
      this.displaytextBox = 0;
      this.sectorskils.controls['CompanyTypeOther'].setValue('');
    }
  }

  GetCompanyType() {
    this.spinnerService.show();
    this.CompanyProfileService.GetCompanyTypeData().subscribe(res => {
      setTimeout(() => this.spinnerService.hide(), 500)
      this.companytype = res;
    });
  }
 
  showlist: any = 0;
  CompanyWorkLocation() {
    if (this.sectorskils.controls.Caddress.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false
    }
    if (this.companyTypeO == "5") {
      if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls.CompanyTypeOther.value.trim() == '') {
        this.toasterService.error("Please enter the other value.");
        return false;
      }
    }
    let statedid;
    let districtid;
    let typeid;
    let Userid;
    Userid = this.sectorskils.value.Userid;
    statedid = this.sectorskils.value.StateiD;
    districtid = this.sectorskils.value.DistrictID;
    typeid = this.sectorskils.value.CtypeName;
    let username = (this.users).filter(function (entry) {
      return entry.userId == Userid;
    });
    let statename = (this.states).filter(function (entry) {
      return entry.id == statedid;
    });
    let districtname = (this.districtworklocation).filter(function (entry) {
      return entry.id == districtid;
    });
    let typename = (this.companytype).filter(function (entry) {
      return entry.id == typeid;
    });
    var pushdata = {
      "Cwlid": this.AdminId,
      "companyId": this.Companyid,
      "Address": this.sectorskils.controls.Caddress.value,
      "CompanyType": this.sectorskils.controls.CtypeName.value,
      "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
      "StateId": this.sectorskils.controls.StateiD.value,
      "DistrictId": this.sectorskils.controls.DistrictID.value,
      "Userid": this.sectorskils.controls.Userid.value,
      "workLocationId": 0,
    };
    this.WorkLocation.push(pushdata);
    this.WorkLocationshow.push({
      // "Username": this.users[0].userName,
      "Username": username[0].userName,
      "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
      "Caddress": this.sectorskils.controls.Caddress.value,
      "CtypeName": typename[0]['companyType'],
      "Stateid": statename[0]['stateName'],
      "Districtid": districtname[0]['districtName'],
    });
    this.showlist = '1';
    this.displaytextBox = 0;
    this.sectorskils.reset();
    this.sectorskils.controls['Userid'].setValue('');
    this.sectorskils.controls['StateiD'].setValue('');
    this.sectorskils.controls['DistrictID'].setValue('');
    this.sectorskils.controls['CtypeName'].setValue('');
    this.sectorskils.controls['CompanyTypeOther'].setValue('');
    this.sectorskils.controls['Caddress'].setValue('');
  }
  stopper: any = 0;
  SaveCompanyProfileData() {
    this.stopper = 1;
    this.spinnerService.show();
    if (this.count == 1) {
      this.CompanyProfileService.SaveMultidata(this.WorkLocation).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce.responseResult == true) {
          this.spinnerService.hide();
          this.WorkLocationshow = [];
          this.WorkLocation = [];
          this.sectorskils.reset();
          this.getallprofilecompany(this.Companyid);
          this.toasterService.success(this.DbResponce.message);
          this.hidecompanyprofile = '1';
          this.showSectorskillForm = '0';
          this.showlist = 0;
          this.sectorskils.reset();
        }
        else {
          this.hidecompanyprofile = '1';
          this.showSectorskillForm = '0';
          this.showlist = 0;
          this.DbResponce = [];
          this.spinnerService.hide();
        }
      });
    }
    this.count++;
    //console.log(this.count);
    this.stopper = 0;
  }

  onItemDeleted(itemNo: number) {
    this.modalRef.hide();
    var index = this.WorkLocationshow.findIndex(function (o, index) {
      return index === itemNo;
    })
    if (index !== -1) {
      this.WorkLocationshow.splice(index, 1);
      this.WorkLocation.splice(index, 1);
    }
    if (this.WorkLocationshow.length === 0) {
      this.showlist = 0;
      this.WorkLocationshow = [];
      this.WorkLocation = [];
    }
  }

  ShowCompanyData: any = [];
  getallprofilecompany(companyId: any) {
    this.viewdata(companyId);
    this.hidecompanyprofile = 1;
    this.ViewSectorTrade = 0;
    this.Showsectorbutton = '0';
    this.SectorAndSkillForm = 0;
    this.ShowUsers = 0;
    this.spinnerService.show();
    this.CompanyProfileService.GetCompanyLocationdata(companyId, this.AdminId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.ShowCompanyData = this.DbResponce.lstCompanyWorkLocation;
        this.showSectorskillForm = '0';
      }
      else {
        this.ShowCompanyData = [];
        this.spinnerService.hide();
      }
    });
  }
  //////////////////// Add Work Location End Here  ////////////

  ///////////////////// Delete Work location Start here  /////////////////////////
  deletecompanydetail(UserID: any, workLocationId: any) {
    this.modalRef.hide();
    this.spinnerService.show();
    this.CompanyProfileService.DeleteCompanyProfile(UserID, workLocationId, this.AdminId).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.hidecompanyprofile = '1';
        this.toasterService.success(this.DbResponce.message);
        this.getallprofilecompany(this.Companyid);
      }
      else {
        this.spinnerService.hide();
        this.DbResponce = [];
      }
    });
  }
  ///////////////////// Delete Work location End here  /////////////////////////

  ////////////////// Update Work Location  Start here /////////////////
  currentTime: any;
  endTime: any;
  finalCountdown: any;
  finalCountdown1: any;
  sid: any;
  profilesubmit: any = [];
  editcompanydetails(username: any, createdby: any, id: any, address: any, stateId: any, districtId: any, companyTypeOther: any, companyId: any, workLocationId: any, other: any) {
    this.spinnerService.show();
    // this.JobpostService.GetAllDistrict(stateId).subscribe(res => {
      this.MasterService.GetAllDistrict(stateId).subscribe(res => {
      this.districtworklocation = res;

      if (this.districtworklocation != null) {
        this.districtworklocation = this.districtworklocation;
        this.spinnerService.hide();
      }
      else {
        this.districtworklocation = [];
      }
    });
    this.profilesubmit = [];
    this.editid = true;
    this.showSectorskillForm = '1';
    this.hidecompanyprofile = '0';
    this.GetUserData(this.Companyid);
    this.sectorskils.controls['StateiD'].setValue(stateId);
    this.sectorskils.controls['DistrictID'].setValue(districtId);
    // this.rFormupdate.controls['DistrictID'].setValue(this.companydata[0].DISTRICTID);
    this.sectorskils.controls['Userid'].setValue(createdby);
    // this.GetAllDistrict(stateId);
    this.sectorskils.controls['Caddress'].setValue(address);
    this.GetCompanyType();
    this.sectorskils.controls['CtypeName'].setValue(companyTypeOther);
    this.companyid = companyId;
    this.sid = id;
    if (companyTypeOther == "5") {
      this.displaytextBox = "1";
      this.sectorskils.controls['CompanyTypeOther'].setValue(other);
    }
    else {
      this.displaytextBox = "0";
    }



  }

  UpdateWorkLocation(id: any) {
    if (this.sectorskils.controls.Caddress.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false
    }
    // if (this.companyTypeO == "5") {
    //   if (this.sectorskils.controls['CompanyTypeOther'].value.trim() == '' || this.sectorskils.controls['CtypeName'].value.trim() == '') {
    //     if (this.sectorskils.controls['CompanyTypeOther'].value.trim() == '') {
    //       this.toasterService.error("Please enter the other value.");
    //       return false;
    //     }
    //   }
    // }
    if(this.sectorskils.controls.CtypeName.value==5 &&(this.sectorskils.controls.CompanyTypeOther.value=='' ||this.sectorskils.controls.CompanyTypeOther.value==null ||this.sectorskils.controls.CompanyTypeOther.value==undefined)){
      this.toasterService.error("Please enter the other value.");
      return false;
    }
    var pushdata = {
      "Cwlid": this.AdminId,
      "companyId": this.companyid,
      "Address": this.sectorskils.controls.Caddress.value,
      "CompanyType": this.sectorskils.controls.CtypeName.value,
      "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
      "StateId": this.sectorskils.controls.StateiD.value,
      "DistrictId": this.sectorskils.controls.DistrictID.value,
      "userId": this.sectorskils.controls.Userid.value,
      "workLocationId": this.sid,
    };
    this.profilesubmit.push(pushdata);
    this.spinnerService.show();
    this.CompanyProfileService.SaveMultidata(this.profilesubmit).subscribe(res => {
      this.DbResponce = res;
      if (this.DbResponce != null) {
        this.spinnerService.hide();
        this.ShowCompanyData = [];
        this.profilesubmit = [];
        this.Showsectorbutton = '0'
        this.editid = true;
        this.showSectorskillForm = '0';
        this.toasterService.success(this.DbResponce.message);
        this.getallprofilecompany(this.Companyid);
      }
      else {
        this.DbResponce = [];
        this.spinnerService.hide();
      }
    });
    this.hidecompanyprofile = '1';
    this.showSectorskillForm = '0';
  }
  ///////////////// Work Location Update end here  ///////////////

  ///////////////// Add User Start Here  ///////////////
  AddUserPage: any = 0;
  AddUser(companyId) {
    this.count = 1;
    this.UserRegistrationForm.reset();
    this.UserRegistrationForm.controls['StateiD'].setValue('');
    this.UserRegistrationForm.controls['DistrictID'].setValue('');
    this.Companyid = companyId
    this.RegistrationView = 0;
    this.showSectorskillForm = 0;
    this.hidecompanyprofile = 0;
    this.companyprofileshow = 0;
    this.AddUserPage = 1;
    this.UserRegistrationForm.controls['cname'].setValue(this.CompanyData.companyName);
    this.UserRegistrationForm.controls['logintype'].setValue(this.CompanyData.loginType);
    this.UserRegistrationForm.controls['pancard'].setValue(this.CompanyData.pan);
    this.UserRegistrationForm.controls['gst'].setValue(this.CompanyData.gstn);
    this.district1 = [];
  }

  UserRegistration(data) {
    if (this.UserRegistrationForm.controls.cname.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.UserRegistrationForm.controls.firstname.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    // if (this.UserRegistrationForm.controls.lastname.value.trim() == '') {
    //   this.toasterService.error("The fields with * are mandatory")
    //   return false;
    // }
    if (this.UserRegistrationForm.controls.Designation.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.UserRegistrationForm.controls.username.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.UserRegistrationForm.controls.username.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }
    if (this.UserRegistrationForm.controls.DistrictID.value.trim() == '') {
      this.toasterService.error("The fields with * are mandatory")
      return false;
    }

    if (this.UserRegistrationForm.valid) {

      // if(this.UserRegistrationForm.controls.email.value!='' && this.UserRegistrationForm.controls.email.value!=null){
      //   this.useremailcheck();
      // } else if(this.UserRegistrationForm.controls.mobile.value!='' && this.UserRegistrationForm.controls.mobile.value!=null){
      //   this.usermobilecheck();
      // } else if(this.UserRegistrationForm.controls.username.value!='' && this.UserRegistrationForm.controls.username.value!=null){
      //   this.usernamecheckAddUser();
      // }
      // else if (this.count == 1) {

      if (this.count == 1) {
        this.spinnerService.show();
        this.item = localStorage.getItem('phpadminid');
        var adminid = parseInt(JSON.parse(this.item));
        var cname = data.cname;
        var firstname = data.firstname;
        // var lastname = data.lastname;
        var lastname = "";
        var email = data.email;
        var mobile = parseInt(data.mobile);
        var username = data.username;
        var password = Md5.init(data.password);
        var logintype = data.logintype;
        // if (data.pancard != '') {
        if (data.pancard != '' && data.pancard != undefined && data.pancard != null && data.pancard != "") {
          var pancard = data.pancard.toUpperCase();
        }
        // if (data.gst != '') {
        if (data.gst != '' && data.gst != undefined && data.gst != null && data.gst != "") {
          var gst = data.gst.toUpperCase();
        }
        if (gst != undefined) {
          this.cutpanvaluefromgst = gst.substr(2, 10);
        }
        else {
          this.cutpanvaluefromgst = '';
        }
        var Designation = data.Designation;
        var StateiD = parseInt(data.StateiD);
        var DistrictID = parseInt(data.DistrictID);
        var senddata1 = { "Username": username, "Password": password }
        var senddata = {
          'Adminid': adminid, 'CompanyName': cname, 'Firstname': firstname, 'lastname': lastname,
          'Email': email, 'PhoneNo': mobile, 'Username': username, 'Password': password,
          'Logintype': logintype, 'Pan_Number': pancard, 'Gstn': gst, 'Designation': Designation,
          'stateid': StateiD, 'districtid': DistrictID
        }
        if ((pancard != null || gst != null) && (pancard != '' || gst != '')) {
          if ((pancard != null && pancard.length == 10) && (gst != null && gst.length == 15)) {
            if (this.cutpanvaluefromgst == pancard && (gst != '' || pancard != '')) {
              this.registService.CheckMobile(mobile).subscribe(res => {
                this.Response = res;
                if (this.Response.responseResult == false) {
                  this.toasterService.error(this.Response.message);
                  this.UserRegistrationForm.controls['mobile'].setValue('');
                  this.spinnerService.hide();
                  this.count = 1;
                  return false;
                } else {
                  this.Response = [];
                  this.registService.CheckEmail(email).subscribe(res => {
                    this.Response = res;
                    if (this.Response.responseResult == false) {
                      this.toasterService.error(this.Response.message);
                      this.UserRegistrationForm.controls['email'].setValue('');
                      this.spinnerService.hide();
                      this.count = 1;
                      return false;
                    } else {
                      this.Response = [];
                      this.registService.username_verification(username).subscribe(res => {
                        this.Response = res;
                        if (this.Response.responseResult == false) {
                          this.toasterService.error(this.Response.message);
                          this.UserRegistrationForm.controls['username'].setValue('');
                          this.spinnerService.hide();
                          this.count = 1;
                          return false;
                        } else {
                          this.registService.CompanyRegistration(senddata).subscribe(res => {
                            this.Response = res;
                            this.dbResponse = this.Response.responseResult;
                            if (this.dbResponse == true) {
                              this.JobpostService.RegistrationTokengeneration(senddata1).subscribe(res => {
                                this.Responsetoken = res;
                                if (this.Responsetoken.result == true) {
                                  this.listing = '0';
                                  this.CompanyRegister = '1';
                                  this.backbtn = '1';
                                  this.searchsts = '0';
                                  this.GetAllState();
                                  $('.page-filters').slideToggle();
                                  this.count = 0;
                                  this.toasterService.success("User has been registered successfully.");
                                  this.viewdata(this.Companyid);
                                  this.UserRegistrationForm.reset();
                                }
                              });
                            }
                            this.count = 1;
                            this.UserRegistrationForm.controls['StateiD'].setValue('');
                            this.UserRegistrationForm.controls['DistrictID'].setValue('');
                          });
                        }
                      });
                    }
                  });
                }
              });
            } else {
              this.toasterService.error("PAN must be a part of GSTIN");
              this.count = 0;
              this.spinnerService.hide();
            }
          }
          else {
            this.spinnerService.show();


            this.registService.CheckMobile(mobile).subscribe(res => {
              this.Response = res;
              if (this.Response.responseResult == false) {
                this.toasterService.error(this.Response.message);
                this.UserRegistrationForm.controls['mobile'].setValue('');
                this.spinnerService.hide();
                this.count = 1;
                return false;
              } else {
                this.Response = [];
                this.registService.CheckEmail(email).subscribe(res => {
                  this.Response = res;
                  if (this.Response.responseResult == false) {
                    this.toasterService.error(this.Response.message);
                    this.UserRegistrationForm.controls['email'].setValue('');
                    this.spinnerService.hide();
                    this.count = 1;
                    return false;
                  } else {
                    this.Response = [];
                    this.registService.username_verification(username).subscribe(res => {
                      this.Response = res;
                      if (this.Response.responseResult == false) {
                        this.toasterService.error(this.Response.message);
                        this.UserRegistrationForm.controls['username'].setValue('');
                        this.spinnerService.hide();
                        this.count = 1;
                        return false;
                      } else {
                        this.registService.CompanyRegistration(senddata).subscribe(res => {
                          this.Response = res;
                          this.dbResponse = this.Response.responseResult;
                          if (this.dbResponse == true) {
                            this.JobpostService.RegistrationTokengeneration(senddata1).subscribe(res => {
                              this.Responsetoken = res;
                              if (this.Responsetoken != null) {
                                this.spinnerService.hide();
                                this.UserRegistrationForm.controls['StateiD'].setValue('');
                                this.UserRegistrationForm.controls['DistrictID'].setValue('');
                                this.UserRegistrationForm.reset();
                                this.listing = '0';
                                this.CompanyRegister = '1';
                                this.backbtn = '1';
                                this.searchsts = '0';
                                this.GetAllState();
                                $('.page-filters').slideToggle();
                                this.count = 0;
                                this.toasterService.success("User has been registered successfully.");
                                this.viewdata(this.Companyid);
                              }
                              else {
                                this.Responsetoken = [];
                                this.spinnerService.hide();
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        } else {
          this.toasterService.error("Please enter GSTIN OR PAN");
          this.count = 0;
          this.spinnerService.hide();
        }
      }
    } else {
      this.toasterService.error("The fields with * are mandatory");
      this.spinnerService.hide();
    }
    this.count++;
  }

  // UserValidation(){
  //   this.useremailcheck();
  //   this.usermobilecheck();
  //   this.usernamecheckAddUser();
  // }

  useremailcheck() {
    this.emailvalues = this.UserRegistrationForm.controls.email.value;
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)) {
      var emailsend = this.emailvalues;
      this.spinnerService.show();
      this.registService.CheckEmail(emailsend).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.email_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.email_check_response = this.Response;
        if (this.Response.responseResult == false) {
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);
          this.spinnerService.hide();
          this.UserRegistrationForm.controls['email'].setValue('');
          return false;
        }
      });
    }
  }

  usermobilecheck() {
    this.mobilevalues = this.UserRegistrationForm.controls.mobile.value;
    var IndNum = /^[0]?[6789]\d{9}$/;
    if (this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)) {
      this.spinnerService.show();
      this.registService.CheckMobile(this.mobilevalues).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.dbResponse = this.Response;
          this.mobile_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.dbResponse = this.Response;
        this.mobile_check_response = this.Response;

        if (this.Response.responseResult == false) {
          this.spinnerService.hide();
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);

          this.UserRegistrationForm.controls['mobile'].setValue('');
          return false;
        }
      });
    }
  }

  usernamecheckAddUser() {
    this.usernamevalues = this.UserRegistrationForm.controls.username.value;
    if (this.usernamevalues.length > 0) {
      this.spinnerService.show();
      this.registService.username_verification(this.usernamevalues).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.username_check_response = this.Response;
          this.spinnerService.hide();
        }
        else {
          this.Response = [];
          this.spinnerService.hide();
        }
        this.username_check_response = this.Response;
        if (this.Response.responseResult == false) {
          this.spinnerService.hide();
          this.toasterService.clear();
          this.toasterService.error(this.Response.message);

          this.UserRegistrationForm.controls['username'].setValue('');
          return false;
        }
      });
    }
  }


  locksts: any = {};
  active: any;

  ActiveInactiveCompany(companyid, status) {
    let sts;
    if (status == true) {
      sts = false;
    }
    if (status == false) {
      sts = true;
    }
    let data = { 'Adminid': this.AdminId, 'Companyid': companyid, 'IsActive': sts };
    this.spinnerService.show();
    this.registService.ActiveInactiveCompany(data).subscribe(res => {
      this.locksts = res;
      if (this.locksts != null) {
        this.exitSectorForm();
        if (this.locksts.responseResult == true) {
          this.spinnerService.hide();
          this.toasterService.success('Company Status Updated');
          this.viewdata(companyid);
        }
      }
      else {
        this.spinnerService.hide();
        this.locksts = [];
      }
    });
    this.modalRef.hide();
  }

  VerifyCompany(companyid, status) {
    let sts;
    if (status == true) {
      sts = 0;
    }
    if (status == false) {
      sts = 1;
    }
    var panid = 0;
    var gstnid = 0;
    var userid = 0;
    let data = { 'panid': panid, 'gstnid': gstnid, 'comapnyid': companyid, 'userid': userid, 'isverifiedby': this.AdminId, 'isverified': sts, 'adminid': this.AdminId };
    this.registService.VerifyCompany(data).subscribe(res => {
      this.locksts = res;
      if (this.locksts != null) {
        if (this.locksts.responseResult == true) {
          this.toasterService.success('Company Status Updated');
          this.viewdata(companyid);
        }
      }
      else {
        this.locksts = [];
      }
    });
    this.modalRef.hide();
  }

  ActiveInactiveUser(userid, userstatus) {
    let sts;
    if (userstatus == 1) {
      sts = false;
    }
    if (userstatus == 0) {
      sts = true;
    }
    let data = { 'Adminid': this.AdminId, 'Userid': userid, 'IsActive': sts };
    this.registService.ActiveInactiveUser(data).subscribe(res => {
      this.locksts = res;
      if (this.locksts != null) {
        if (this.locksts.responseResult == true) {
          if (userstatus == 1) {
            this.toasterService.success('User has been Inactive Successfully');
          } else {
            this.toasterService.success('User has been Active Successfully');
          }
          this.viewdata(this.Companyid);
        }
      }
      else {
        this.locksts = [];
      }
    });
    this.modalRef.hide();
  }

  PANstatus: any = '';
  GSTINstatus: any = '';
  PushedTemplatedDocumentApprove(template: TemplateRef<any>, CompanyData: any) {
    // let companyid = CompanyID;
    this.GSTINstatus = CompanyData.isgstnverified;
    this.PANstatus = CompanyData.ispanverified;
    this.modalRef = this.modalService.show(template, { class: 'modal-md', backdrop: 'static' });
    this.companydetails = [];
    this.pansts = false;
    this.gstinsts = false;
    this.JobpostService.GetCompanyDetails(CompanyData.companyId, this.AdminId).subscribe(res => {
      this.dbresponse1 = res;
      if (this.dbresponse1 != null) {
        if (this.dbresponse1.lstCompanyProfile != null) {
          this.companydetails = this.dbresponse1.lstCompanyProfile;
          this.companydetails = this.companydetails[0];
        } else {
          this.companydetails = this.dbresponse1.lstCompanyProfile1;
          this.companydetails = this.companydetails;
        }
      }
      else {
        this.dbresponse1 = [];
      }
    });
  }



  dbresponse: any = [];
  dbresponse1: any = [];
  // // PANstatus: any = '';
  // // GSTINstatus: any = '';
  // getCompanyId(id, PanStatus, GstnStatus) {
  //   // this.PANstatus = PanStatus;
  //   // this.GSTINstatus = GstnStatus;
  //   let companyid = id;
  //   this.companydetails = [];
  //   this.pansts = false;
  //   this.gstinsts = false;
  //   this.JobpostService.GetCompanyDetails(companyid, this.AdminId).subscribe(res => {
  //     this.dbresponse1 = res;
  //     if (this.dbresponse1 != null) {
  //       if (this.dbresponse1.lstCompanyProfile != null) {
  //         this.companydetails = this.dbresponse1.lstCompanyProfile;
  //         this.companydetails = this.companydetails[0];
  //         
  //       } else {
  //         this.companydetails = this.dbresponse1.lstCompanyProfile1;
  //         this.companydetails = this.companydetails;
  //       }
  //     }
  //     else {
  //       this.dbresponse1 = [];
  //     }
  //   });
  // }

  cancelClicked() {
  }

  pansts: any = '';
  gstinsts: any = '';
  getGstValue(e) {
    this.gstinsts = e.target.checked ? true : false;
  }

  getPanValue(e) {
    this.pansts = e.target.checked ? true : false;
  }

  confirmClicked(companyid) {
    this.ViewSectorTrade = 0;
    this.approveComapny(companyid, false);
    this.modalRef.hide();
  }

  close() {
    this.modalRef.hide();
  }
  approveComapny(companyid, value) {
    var isverified = 1;
    let userid = 0;
    if (this.pansts == true && this.gstinsts == true) {
      var panid = 2;
      var gstnid = 1;

    } else if (this.pansts == true) {
      var panid = 2;
    } else if (this.gstinsts == true) {
      var gstnid = 1;
    }
    else {
      this.toasterService.error('Please select documents to verify');
      return false;
    }
    let data = { 'panid': panid, 'gstnid': gstnid, 'comapnyid': companyid, 'userid': userid, 'isverifiedby': this.AdminId, 'isverified': isverified, 'adminid': this.AdminId };
    this.registService.VerifyCompany(data).subscribe(res => {
      this.dbresponse1 = res;
      if (this.dbresponse1 != null) {
        if (this.dbresponse1.responseResult == true) {
          this.pansts = false;
          this.gstinsts = false;
          this.toasterService.success('Document Verified successfully');
          $('#verifydocs').hide();
          $('body').removeClass('modal-open');
          $('body  .modal-backdrop.in').hide();
          this.viewdata(companyid);
        } else {
          this.toasterService.error('Unable to verify document.');
        }
      }
      else {
        this.dbresponse1 = [];
      }
    });
  }

  ///////////////// Make Is Owner any user Start here ///////////////////////
  DefaultUser(companyid, userid, status, isowner, isverified) {
    companyid = JSON.parse(companyid);
    userid = JSON.parse(userid);
    status = JSON.parse(status);
    if (isverified == 0) {
      this.toasterService.error("User is not Approved yet");
      this.modalRef.hide();
      return false;
    }
    let sts;
    if (isowner == 1) {
      sts = 0;
    }
    if (isowner == 0) {
      sts = 1;
    }
    let data = { 'adminid': this.AdminId, 'companyid': companyid, 'userid': userid, 'isactive': status, 'isowner': sts };
    this.registService.MakeDefaultCompany(data).subscribe(res => {
      this.locksts = res;
      if (this.locksts != null) {
        if (this.locksts.responseResult == true) {
          this.toasterService.success('Marked as Owner Successfully');
          this.viewdata(companyid);
        }
      }
      else {
        this.locksts = [];
      }
    });
    this.modalRef.hide();
  }
  ///////////////// Make Is Owner any user End here ///////////////////////


  /////////////// Add sector & Trade For a company Start here  \\\\\\\\\\\\\\\\\
  exitSectorForm() {
    this.hidecompanyprofile = 0;
    this.ShowUsers = 1;
    this.ViewSectorTrade = 0;
    this.ShowEdit = true;
    this.SectorAndSkillForm = '0';
    this.sectorclose = '0';
    this.skilsshow = [];
    this.skilssubmit = [];
  }

  addsector: any = 0;
  SectorAndSkillForm: any = 0;
  addsectortrade() {
    this.hidecompanyprofile = 0;
    this.addsector = 0;
    this.reset_sector_form();
    this.ViewSectorTrade = 0;
    this.Showsectorbutton = '1';
    this.addsector == 0;
    this.SectorAndSkillForm = 1;
    this.ShowUsers = 0;
  }

  reset_sector_form() {
    this.count = '1';
    this.sectortradeskils.reset();
    this.sectortradeskils.controls['ID'].setValue('0');
    this.sectortradeskils.controls['STATUS'].setValue('');
    this.sectortradeskils.controls['industries'].setValue('');
    this.sectortradeskils.controls['functionalareas'].setValue('');
    this.sectortradeskils.controls['levelsihirefor'].setValue('');
    this.GetAllFunctionalArea();
    this.GetAllIndustryArea();
    this.GetHiringLevel();
  }

  GetAllDistrictslected(event: any) {
    this.MasterService.GetAllDistrict(event).subscribe(res => {
      this.district = res
      if (this.district != null && this.district.length > 0) {
        this.district = this.district;
      }
    });
  }

  GetAllIndustryArea() {
    this.MasterService.GetAllIndustryArea().subscribe(res => {
      this.industialrea = res;
      if (this.industialrea != null && this.industialrea.length > 0) {
        this.industialrea = this.industialrea;
      }
    });
  }

  functionalarea: any = [];
  GetAllFunctionalArea() {
    this.MasterService.GetAllFunctionArea().subscribe(res => {
      this.functionalarea = res;
      if (this.functionalarea != null && this.functionalarea.length > 0) {
        this.functionalarea = this.functionalarea;
      }
    });
  }

  gethiringlevel: any = [];
  GetHiringLevel() {
    this.registService.GetHiringLevel().subscribe(res => {
      this.gethiringlevel = res;
      if (this.gethiringlevel != null && this.gethiringlevel.length > 0) {
        this.gethiringlevel = this.gethiringlevel;
      }
    });
  }
  skillid: any = '';
  DbResponse: any = [];
  skilsdetails: any = [];
  ViewSectorTrade: any = 0;
  Viewsectortrade(companyid) {
    this.viewdata(companyid);
    // this.spinnerService.show();
    // this.CompanyProfileService.GetCompanyLocationdata(companyId, this.AdminId).subscribe(res => {
    //   this.DbResponce = res;
    //   if (this.DbResponce != null) {
    //     this.spinnerService.hide();
    //     this.ShowCompanyData = this.DbResponce.lstCompanyWorkLocation;
    //     this.showSectorskillForm = '0';
    //   }
    //   else {
    //     this.ShowCompanyData = [];
    //     this.spinnerService.hide();
    //   }
    // });
    this.Showsectorbutton = '0';
    this.hidecompanyprofile = 0;
    this.SectorAndSkillForm = 0;
    this.ViewSectorTrade = 1;
    this.ShowUsers = 0;
    this.spinnerService.show();
    this.registService.GetUserSkillDetails(companyid, this.AdminId).subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse) {
        this.skilsdetails = this.DbResponse.lstCompanyProfileSkill;
        if (this.skilsdetails.length > 0) {
          this.addsector = 1;
        } else {
          this.addsector = 0;
        }
        this.spinnerService.hide();
      }
    });
  }

  skilssubmit: any = [];
  skilsshow: any = [];
  sectorclose: any = 0;
  agency_save() {
    if (this.sectortradeskils.controls.skillsroles.value.trim() == '' || this.sectortradeskils.controls.clientihirefor.value.trim() == '') {
      this.toasterService.error("Please enter correct data.")
      return false;
    }
    let indid;
    let functid;
    let hireid;
    let hirefor;
    let skillsroles;
    indid = this.sectortradeskils.value.industries;
    functid = this.sectortradeskils.value.functionalareas;
    hireid = this.sectortradeskils.value.levelsihirefor;
    hirefor = this.sectortradeskils.value.clientihirefor;
    skillsroles = this.sectortradeskils.value.skillsroles;
    var skillId = this.sectortradeskils.value.ID;
    var status = this.sectortradeskils.value.STATUS;
    var industryId = this.sectortradeskils.value.industries;
    var functionaAreaId = this.sectortradeskils.value.functionalareas;
    var levelOfHiringId = this.sectortradeskils.value.levelsihirefor;
    var clientiHireFor = this.sectortradeskils.value.clientihirefor;
    var skillsHireFor = this.sectortradeskils.value.skillsroles;
    var adminId = this.AdminId;
    var companyId = this.Companyid;
    this.skilssubmit = {
      'skillId': skillId, 'status': status, 'industryId': industryId, 'functionaAreaId': functionaAreaId, 'levelOfHiringId': levelOfHiringId, 'clientiHireFor': clientiHireFor, 'skillsHireFor': skillsHireFor, 'adminId': adminId, 'companyId': companyId
    }
    this.datad.push(this.sectortradeskils.value);
    let resultindid = (this.industialrea).filter(function (entry) {
      return entry.id === indid;
    });
    let resultfuncid = (this.functionalarea).filter(function (entry) {
      return entry.id === functid;
    });
    let resulthireid = (this.gethiringlevel).filter(function (entry) {
      return entry.id == hireid;
    });
    this.skilsshow.push({
      "industries": resultindid[0]['industryName'],
      "functionalareas": resultfuncid[0]['functionalAreaName'],
      "clientihirefor": resulthireid[0]['hiringName'],
      "levelsihirefor": hirefor,
      "skillsroles": skillsroles
    });
    this.sectortradeskils.value.reset;
    this.reset_sector_form();
    this.sectorclose = '1';
  }

  empskilssubmit: any = [];
  empLevelData: any = {};
  empHireData: any = [];
  empHirePushData: any = [];
  employer_save() {
    this.spinnerService.show();
    if (this.sectortradeskils.controls.skillsroles.value.trim() == '' || this.sectortradeskils.controls.clientihirefor.value.trim() == '') {
      this.toasterService.error("Please enter correct data.")
      return false;
    }

    var leveldata = this.sectortradeskils.value.levelsihirefor;
    var arraypush;
    for (var j = 0; j < leveldata.length; j++) {
      this.empHireData = leveldata[j]['id'];
      arraypush = {
        'levelsihireforid': this.empHireData
      }
      this.empHirePushData.push(arraypush);
    }
    this.empLevelData.adminId = this.AdminId;
    this.empLevelData.companyId = this.Companyid;
    this.empLevelData.status = this.sectortradeskils.value.STATUS;
    this.empLevelData.skillId = this.sectortradeskils.value.ID;
    this.empLevelData.clientihirefor = this.sectortradeskils.value.clientihirefor;
    this.empLevelData.functionaAreaId = this.sectortradeskils.value.functionalareas;
    this.empLevelData.industryId = this.sectortradeskils.value.industries;
    this.empLevelData.levelsihirefor = this.empHirePushData;
    this.empLevelData.skillsHireFor = this.sectortradeskils.value.skillsroles;
    if (this.count == 1) {
      if (this.sectortradeskils.valid) {
        this.empskilssubmit.push(this.empLevelData);
        this.registService.SaveMultipleSkill(this.empskilssubmit).subscribe(res => {
          this.Responce = res;
          if (this.Responce.responseResult) {
            this.toasterService.success(this.Responce.message);
            this.skilsshow = [];
            this.empskilssubmit = [];
            this.sectortradeskils.value.reset;
            this.editid = false;
            this.reset_sector_form();
            this.SectorAndSkillForm = 0;
            arraypush = {};
            this.empskilssubmit.pop(this.empLevelData);
            this.empHirePushData = [];
            this.Viewsectortrade(this.Companyid);
          } else {
            this.count = 0;
            this.spinnerService.hide();
            this.toasterService.error(this.Responce.message);
          }
        });
      }
      else {
        this.count = 0;
        this.toasterService.error(this.Responce.message);
      }
    }
    else {
    }
    this.ShowEdit = true;
    this.count++;
  }

  OnRemoveSector(itemNo: number) {
    this.modalRef.hide();
    var index = this.skilsshow.findIndex(function (o, index) {
      return index === itemNo;
    });
    if (index !== -1) {
      this.skilsshow.splice(index, 1);
      this.skilssubmit.splice(index, 1);
    }
    if (this.skilsshow.length === 0) {
      this.showlist = 0;
      this.skilsshow = [];
      this.skilssubmit = [];
    }

    this.modalRef.hide();
    this.skilsshow.splice(index, 1);
    this.skilssubmit.splice(index, 1);
  }


  datad: any = [];
  ShowEdit: any = false;
  Responce: any = [];
  sectortradesave() {
    // var status = this.skilssubmit.STATUS;
    // var industryId = this.skilssubmit.industries;
    // var functionaAreaId = this.skilssubmit.functionalareas;
    // var levelOfHiringId = this.skilssubmit.levelsihirefor;
    // var clientiHireFor = this.skilssubmit.clientihirefor;
    // var skillsHireFor = this.skilssubmit.skillsroles;
    // var adminId = this.AdminId;
    // var companyId = this.Companyid;

    // this.datad={
    //   'status':status,'industryId':industryId,'functionaAreaId':functionaAreaId,'levelOfHiringId':levelOfHiringId,'clientiHireFor':clientiHireFor,'skillsHireFor':skillsHireFor,'adminId':adminId,'companyId':companyId
    // }
    this.ShowEdit = true;
    if (this.count == 1) {

      this.registService.SaveMultipleSkill(this.skilssubmit).subscribe(res => {
        this.Responce = res;
        if (this.Responce.responseResult) {
          this.toasterService.success(this.Responce.message);
          this.skilssubmit = [];
          this.skilsshow = [];
          this.sectorskils.value.reset;
          this.reset_sector_form();
          this.editid = false;
          this.Viewsectortrade(this.Companyid);
        } else {
          this.toasterService.error(this.Responce.message);
        }
      });
    }
    else {

    }
    this.count++;
  }
  /////////////// Add sector & Trade For a company End here  \\\\\\\\\\\\\\\\\

  levelhireid: any = [];
  levelhirename: any = [];
  editsectordetails(index: any, indust: any, farea: any, leveid: any, clienthire: any, skillrole: any) {
    this.levelhirename = [];
    var array;
    for (var j = 0; j < leveid.length; j++) {
      this.levelhireid = leveid[j]['levelsihireforid'];
      var hirename = leveid[j]['hiringName']
      array = {
        'id': this.levelhireid,
        'hiringName': hirename
      }
      this.levelhirename.push(array);
    }
    this.GetAllFunctionalArea();
    this.GetAllIndustryArea();
    this.GetHiringLevel();
    this.sectortradeskils.reset();
    this.sectortradeskils.controls['ID'].setValue(index);
    this.sectortradeskils.controls['STATUS'].setValue('U');
    this.sectortradeskils.controls['industries'].setValue(indust);
    this.sectortradeskils.controls['functionalareas'].setValue(farea);
    this.sectortradeskils.controls['levelsihirefor'].setValue(this.levelhirename);
    this.sectortradeskils.controls['clientihirefor'].setValue(clienthire);
    this.sectortradeskils.controls['skillsroles'].setValue(skillrole);
    // this.count = '1';
    this.SectorAndSkillForm = 1;
    this.ViewSectorTrade = 0;
    // this.showProfileForm = '0';
    // this.Showsectorbutton = '1'
  }

  DelSecorrID: any;
  confirmBox(confirm: TemplateRef<any>, DelSectorID: any) {
    this.DelSecorrID = DelSectorID;
    this.modalRef = this.modalService.show(confirm, { class: 'modal-sm' });
  }

  secortorid: any;
  deleteCount: any = 0
  deletesectordetails() {
    this.deleteCount++
    this.spinnerService.show();
    this.secortorid = this.DelSecorrID;
    var data = {
      'adminId': this.AdminId, 'skillId': this.secortorid
    }
    if (this.deleteCount == 1) {
      this.registService.DeleteUserSkill(data).subscribe(res => {
        this.Responce = res;
        this.modalRef.hide();
        this.spinnerService.hide();
        if (this.Responce.responseResult) {
          this.deleteCount = 0;
          this.toasterService.success(this.Responce.message);
          this.editid = false;
          this.Viewsectortrade(this.Companyid);
          this.showSectorskillForm = '0';
        } else {
          this.deleteCount = 0;
          this.toasterService.error(this.Responce.message);
        }
      });
    }
  }
}