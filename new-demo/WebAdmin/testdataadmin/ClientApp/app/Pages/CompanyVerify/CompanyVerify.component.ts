import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { UpdateprofileService } from '../../Services/updateprofile.service';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Subject } from 'rxjs';
import {ExcelService} from '../../Services/excel.service';

@Component({
  selector: 'app-CompanyVerifyComponent',
  templateUrl: './CompanyVerify.component.html',
})
export class CompanyVerifyComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  DbResponse: any;
  profile: any;
  View: FormGroup;
  data: any;
  Response: any;
  candiIiD: any;
  updpassword: any = '0';
  designation: any;
  changepasswordForm: FormGroup;
  c_id: any;
  ShowData: any = '0';
  docverify: FormGroup;
  update_company_profile: FormGroup;
  profiledata: any = [];
  pangst: any = [];
  pangstsend: any = [];
  PAN: any;
  cv: any = {};
  cid: any;
  ProfileResponce: any = [];
  viewProfile: boolean = false;
  viewProfiledata: any = {};
  hem: any = {};
  documents: any;
  viewdatashow: any = '1';
  updatadatashow: any = '0';
  editdata: any = '0';
  editProfileResponce: any = {};
  editProfiledata: any = {};
  allStates: any = [];
  states: any = [];
  allDistrict: any = {};
  p: number = 1;
  SerialNumber: number = 1;
  companyDetails: any = '';
  companyviewshow: any = '1';
  public popoverTitle: string = 'Are You sure?';
  public popoverMessage: string = 'Are you really sure you want to approve this?';
  public popoverMessage1: string = 'Are you really sure you want to change status?';
  confirmText: any = 'Yes';
  cancelText: any = 'No';
  updatepassword2: FormGroup;
  companyId: any;
  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private profileservice: UpdateprofileService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private excelService:ExcelService,
    private router: Router) { }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.GetallUserProfilesdata();
    this.docverify = this.formBuilder.group({
      'cid': ['', Validators.nullValidator],
      'remark': ['', Validators.nullValidator]
    });
    this.View = this.formBuilder.group({
      'firstName': [null, Validators.required],
    });
    this.update_company_profile = this.formBuilder.group({
      'name': ['', Validators.nullValidator],
      'shortname': ['', Validators.nullValidator],
      'tagline': ['', Validators.nullValidator],
      'pan': ['', Validators.nullValidator],
      'gstin': ['', Validators.nullValidator],
      'industry': ['', Validators.nullValidator],
      'description': ['', Validators.nullValidator],
      'state': ['', Validators.nullValidator],
      'distirct': ['', Validators.nullValidator],
      'office_address': ['', Validators.nullValidator]
    });
    this.updatepassword2 = this.formBuilder.group({
      'passsword': ['', Validators.nullValidator],
      'cnfpassword': ['', Validators.nullValidator]
    });
    this.changepasswordForm = this.formBuilder.group({
      'password': ['', [Validators.required, , Validators.compose([CustomValidators.PasswordPolicy])]],
      'cnfpassword': ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  
  }
  

  //  User Password Update
  changepassword(data) {
    var password = data.password;
    var cnfpassword = data.cnfpassword;
    if (password == '' || password == null) {
      this.toastrService.error('Please enter password');
      return false;
    }
    else if (!this.changepasswordForm.valid) {
      this.toastrService.error('Password Policy Not Match');
      return false;
    } else if (cnfpassword == '' || cnfpassword == null) {
      this.toastrService.error('Please enter  confirm password');
      return false;
    } else if (password != cnfpassword) {
      this.toastrService.error('Password and confirm password did not match');
      return false;
    } else {
      var newPass = (password);
      this.password = Md5.init(newPass);
      var confirmPass = Md5.init(cnfpassword);
      this.cnfpassword = confirmPass;
      let data = { 'UserId': this.update_company_id, 'UserPassword': this.password };
      this.JobpostService.updatePassword(data).subscribe(res => {
        this.password_response = res;
        if (this.password_response != null) {
          if (this.password_response.responseResult == true) {
            this.toastrService.success('Password Updated');
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
        }
      });
    }
  }

  phpadminid: any = [];
  Pagenumber: any = 0;
  count: any = [];
  last: any = 0;
  searchdata: any = '';
  totalAppliedCandidate: any = 0;
  senddata: any = {};
  GetallUserProfilesdata() {
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.senddata = { "Adminid": adminid, "Pagenumber": this.Pagenumber, 'searchdata': this.searchdata }
    this.profileservice.CompanyProfileStatusReport().subscribe(res => {
      this.ProfileResponce = res;
      if (this.ProfileResponce != null) {
        this.profiledata = this.ProfileResponce.lstCompanyStatusReport;
        this.dtTrigger.next();
      } else {
        this.profiledata = [];
      }
    });
  }

  no: any = 0;

  editCompanyProfiles(candiIiD) {
    this.viewdatashow = '0';
    this.editdata = '0';
    this.updatadatashow = '1';
    var admin_id = 1;
    this.viewProfiledata = (
      {
        "admin_id": admin_id,
        "candidate": candiIiD,
      });
    this.profileservice.GetProfileDetailsForAdmin(this.viewProfiledata).subscribe(res => {
      this.ProfileResponce = res;
      if (this.ProfileResponce != null) {
        this.companyDetails = this.ProfileResponce[0];
      }
    });
    this.profileservice.getGSTPAN(this.viewProfiledata).subscribe(res => {
      this.pangst = res;
      if (this.pangst != null) {
        this.pangst = this.pangst;
      } else {
        this.pangst = [];
      }
    });
  }

  Back() {
    this.viewdatashow = '1';
    this.updatadatashow = '0';
    this.editdata = '0';
  }

  editBack() {
    this.viewdatashow = '0';
    this.updatadatashow = '1';
    this.editdata = '0';
  }

  
  EditProfile(data) {
    this.viewdatashow = '0';
    this.updatadatashow = '0';
    this.editdata = '1';
    this.update_company_profile.controls['name'].setValue(data.COMPANYNAME);
    this.update_company_profile.controls['shortname'].setValue(data.COMPANYSHORTNAME);
    this.update_company_profile.controls['tagline'].setValue(data.TAGLINE);
    this.update_company_profile.controls['pan'].setValue(data.PAN);
    this.update_company_profile.controls['gstin'].setValue(data.GSTN);
    this.update_company_profile.controls['industry'].setValue(data.INDUSTRYNAME);
    this.update_company_profile.controls['description'].setValue(data.DESCRIPTION);
  }

  updateprofiledata() {
    this.profileservice.UpdateProfile(this.update_company_profile.value).subscribe(res => {
      this.pangstsend = res;
    });
  }

  GetAllState() {
    this.profileservice.GetAllStates().subscribe(res => {
      this.allStates = res;
      if (this.allStates != null) {
        this.states = this.allStates.Data;
      }
      else {
        this.allStates = [];
      }
    });
  }

  GetAllDistrict(event: any) {
    this.profileservice.GetAllDistricts(event).subscribe(res => {
      this.allDistrict = res;
      if (this.allDistrict != null) {
        this.allDistrict = this.allDistrict;
      } else {
        this.allDistrict = [];
      }
    });
  }

  docs: any = [];
  getDocValue(e) {
    if (e.target.checked) {
      let obj = { 'name': e.target.value, 'value': true };
      this.docs.push(obj);
    } else {
      var index = this.docs.indexOf(e.target.value);
      this.docs.splice(index, 1);
    }
  }

  approveGSTPAN(data: any) {
    this.profileservice.sendPANGST({ 'docs': this.docs }).subscribe(res => {
      this.pangstsend = res;
      if (this.pangstsend != null) {
        var hem = this.pangstsend;
      }
      else {
        this.pangstsend = [];
      }
    });
  }

  pageChanged(event) { }
  company: any = [];
  dbresponse: any = [];
  companydetails: any = [];
  dbresponse1: any = [];
  searchsts: boolean = false;
  companyid: any = '';
  sendcomapnyid: any = '';
  verifysts: any = '';

  getCompanyId(id, verify) {
    this.verifysts = verify;
    let companyid = id;
    this.sendcomapnyid = id;
    this.companydetails = [];
    this.phpadminid = localStorage.getItem('phpadminid');
    var adminid = JSON.parse(this.phpadminid);
    this.JobpostService.GetCompanyDetails(companyid, adminid).subscribe(res => {
      this.dbresponse1 = res;
      if (this.dbresponse1 != null) {
        if (this.dbresponse1.lstCompanyProfile != null) {
          this.companydetails = this.dbresponse1.lstCompanyProfile;
          this.companydetails = this.companydetails[0];
          // console.log(this.companydetails)
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

  pansts: any = '';
  gstinsts: any = '';
  logosts: any = '';
  confirmyes: any;
  cancelyes: any;

  getPanValue(e) {
    this.pansts = e.target.checked ? true : false;
  }

  getGstValue(e) {
    this.gstinsts = e.target.checked ? true : false;
  }

  isverified: any = '';
  poupsts: any = 1;
  confirmClicked(companyid) {
    this.approveComapny(companyid);
  }

  cancelClicked() {
    // this.resetform()
  }

  confirmClicked1(id, isactive) {
    this.EnableDisable(id, isactive);
  }

  cancelClicked1() {
  }

  approveComapny(companyid) {
    let Adminid = localStorage.getItem('phpadminid');
    let userid1 = 0;
    let ADMINID = Adminid.replace(/"/g, "");
    if (this.pansts == true && this.gstinsts == true) {
      this.isverified = true;
    } else {
      this.toastrService.error('Please select all documents to verify');
      return false;
    }
    let postdata = { "Companyid": companyid, "Userid": userid1, "Isverified": this.isverified, 'AdminId': ADMINID };
    this.JobpostService.approveCompanyDetails(postdata).subscribe(res => {
      this.dbresponse1 = res;
      if (this.dbresponse1 != null) {
        if (this.dbresponse1.responseResult == true) {
          this.toastrService.success('Document Verified successfully');
          $('#companydetails').hide();
          $('body').removeClass('modal-open');
          $('body  .modal-backdrop.in').hide();
          this.router.navigateByUrl('Register?', { skipLocationChange: true }).then(() =>
          this.router.navigate(['CompanyVerify']));
          // this.GetallUserProfilesdata();
        } else {
          this.toastrService.error('Unable to verify document.');
          this.poupsts = 1;
        }
      }
      else {
        this.dbresponse1 = [];
      }
    });
  }

 
  locksts: any = {};
  active:any;
  EnableDisable(id, isactive) {
    let sts;
    if (isactive == true) {
      sts = false;
    }
    if (isactive == false) {
      sts = true;
    }
    this.phpadminid = localStorage.getItem('phpadminid');
    var userid = JSON.parse(this.phpadminid)
    let data = { 'Companyid': id, 'IsActive': sts, 'Adminid': userid };
    this.JobpostService.EnableDisable(data).subscribe(res => {
      this.locksts = res;
      if (this.locksts != null) {
        if (this.locksts.responseResult == true) {
        
          this.toastrService.success('User Status Updated');
          //this.dtTrigger.next();  
          this.router.navigateByUrl('Register?', { skipLocationChange: true }).then(() =>
          this.router.navigate(['CompanyVerify']));        
          // this.GetallUserProfilesdata();
        
          this.updatadatashow = 0;
          this.viewdatashow = 1;
        }
      }
      else {
        this.locksts = [];
      }
    });
  }

  update_company_id: any = ''
  updatePasswordId(id) {
    this.update_company_id = id;
    this.resetform();
    this.updpassword = '1';
  }

  password: any = '';
  cnfpassword: any = '';
  password_response: any = {};
  resetform() {
    this.password = '';
    this.cnfpassword = '';
    // this.companydetails=[];
    this.changepasswordForm.reset();
  }

  ///////////////////   
  CompanyExelData:any=[];
  ShowAllexcelExport(item:any)
  {
    var data=[];
    this.CompanyExelData=item;
    this.CompanyExelData.forEach(function(item){
      var obj={
        'Company Name' : item.companyName,
        'Login Type':item.loginType,
        'Contact Name':item.firstName+' '+item.lastName,
        'Email':item.email,
        'Mobile No':item.phoneNo?item.phoneNo:'',
        'Designation':item.designation?item.designation:'',
        'State':item.stateName?item.stateName:'',
        'District':item.districtName?item.districtName:'',
        'Total User':item.totalUser?item.totalUser:'0',
        'Status':item.isActivE==true?'Approved':'Pending',
  
  
      }
      data.push(obj);
    })
  this.CompanyExelData=data; 
  this.excelService.exportAsExcelFile(this.CompanyExelData, 'CompanyStatusReports');
  }



  //////////////////

  keyGen(keyLength: any) {
    var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (i = 0; i < keyLength; i++) {
      key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
    }
    return key;
  }

} 