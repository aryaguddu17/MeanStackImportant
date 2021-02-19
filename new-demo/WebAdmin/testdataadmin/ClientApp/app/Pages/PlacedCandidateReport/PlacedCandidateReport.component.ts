import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { Subject } from 'rxjs';
// import { timingSafeEqual } from 'crypto-js';
import { ExcelService } from '../../Services/excel.service';
import { MasterService } from '../../Services/master.service';
import * as CryptoJS from 'crypto-js';
import { placedcandidateService } from '../../Services/placedcandidate.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { CandidateService } from '../../Services/candidate.service';
import { TestimonialsService } from '../../Services/Testimonials.service';
import { AppConfig } from '../../Globals/app.config';
import { RojggarMelaService } from '../../Services/RojggarMela.service';
import { CommonViewLayoutComponent } from '../CommonModelView/CommonView-Layout.Component';
import { interviewListService } from '../../Services/interview.service';

@Component({
  selector: 'app-PlacedCandidateReport',
  templateUrl: './PlacedCandidateReport.component.html',

})
export class PlacedCandidateReportComponent implements OnInit {
  @ViewChild(CommonViewLayoutComponent) private mymodel: CommonViewLayoutComponent;

  dtOptions: DataTables.Settings = {};
  // dtTrigger = new Subject<any>();
  dbResponse: any = [];
  PlaceCandidateDetails: any = [];
  key: any = 'iamskillindiafriendlyemp';
  CandidateRegistration: FormGroup;
  currentFile: any;
  ValidImageTypes: any = [];
  base64textString: any = [];
  img: any;
  imgGstName: any;
  imgPanName: any;
  PanExtention: any;
  GstnExtention: any;
  imn1: any
  UserInfo: any;
  ShowJobDetails: boolean = true;
  ShowEventDetails: boolean = false;
  ShowEmployerList: boolean = true;
  candidatelist: any = true;
  JobList: any;
  companyId: any;
  candcompanyId: any;

  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private appConfig: AppConfig,
    private JobpostService: JobpostService,
    private RojggarMelaService: RojggarMelaService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private excelService: ExcelService,
    private masterService: MasterService,
    private PlacedcandidateService: placedcandidateService,
    private candidateService: CandidateService,
    private TestimonialsService: TestimonialsService,
    private InterviewService: interviewListService,
  ) {
    try {
      this.UserInfo = appConfig.UserInfo;
    } catch  { }

  }
  getdata: any;
  ngOnInit() {
    if (this.route.snapshot.paramMap.get('postdata')) {
      this.getdata = this.route.snapshot.paramMap.get('postdata');
    } else {
      this.getdata = '';
    }

    this.GetAgentWiseDetail();
    this.GetAllReligions_details();
    this.GetAllStates();
    this.CandidateRegistration = this.formBuilder.group({
      Candidatename: ['', [Validators.required, Validators.compose([CustomValidators.removeSpaces])]],
      DOB: ['', [Validators.nullValidator,]],
      jobtype: ['', [Validators.nullValidator,]],
      EventList: ['', [Validators.nullValidator,]],
      employername: ['', [Validators.nullValidator,]],
      emailid: ['', [Validators.nullValidator,]],
      mobile: ['', [Validators.nullValidator,]],
      jobId: ['', [Validators.nullValidator,]],
      OpeningList: ['', [Validators.nullValidator,]],
      candidatename: ['', [Validators.nullValidator,]],
      // Male: ['', [Validators.nullValidator,]],
      Gender: ['', [Validators.nullValidator,]],
      religion: ['', [Validators.nullValidator,]],
      Countryofbirth: ['', [Validators.nullValidator,]],
      birthstate: ['', [Validators.nullValidator,]],
      birthdistrict: ['', [Validators.nullValidator,]],
      aboutme: ['', [Validators.nullValidator,]],
      ImgName: ['', [Validators.nullValidator,]],
      PARTNERNAME: ['', [Validators.nullValidator,]],
      TRAININGSCHEME: ['', [Validators.nullValidator,]],
      TRANINGTRADE: ['', [Validators.nullValidator,]],
      ENROLMENTNO: ['', [Validators.nullValidator,]],
      INQUIRYNO: ['', [Validators.nullValidator,]],
      SCHEME: ['', [Validators.nullValidator,]],
      COMPANYNAME: ['', [Validators.nullValidator,]],
      LOCATION: ['', [Validators.nullValidator,]],
      OFFERLETTERDATE: ['', [Validators.nullValidator,]],
      CTC: ['', [Validators.nullValidator,]],
      OFFERLETTERIMAGENAME: ['', [Validators.nullValidator,]],
      REMARKS: ['', [Validators.nullValidator,]],
      DESIGNATION: ['', [Validators.nullValidator,]],
      JOININGDATE: ['', [Validators.nullValidator,]],
    });
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

  district: any = [];
  private GetAllDistrict(id: any) {
    if (id) {
      this.masterService.GetAllDistrict(id).subscribe(res => {
        this.district = res
        if (this.district != null && this.district.length > 0) {
          this.district = this.district;
        }
      });
    } else {
      this.district = [];
    }
  }

  religions: any = [];
  GetAllReligions_details() {
    this.candidateService.GetAllReligions().subscribe(res => { this.religions = res; });
  }

  modalRefSector: BsModalRef;
  RegisterCandidate(templateSector: TemplateRef<any>) {
    this.CandidateRegistration.controls['jobtype'].setValue('');
    this.CandidateRegistration.controls['EventList'].setValue('');
    this.CandidateRegistration.controls['employername'].setValue('');
    // this.GetCompanyName();
    // this.GetAllEventList();
    this.GetEmployerDetail();
    this.ShowJobDetails = false;
    this.candidatelist = false;
    this.modalRefSector = this.modalService.show(templateSector, { class: 'modal-lg ' });
  }

  close() {
    this.modalRefSector.hide();
    this.CandidateRegistration.reset();
  }

  Companywiselist: any = '1';
  CompanyExelData: any = [];
  item: any;
  Adminid: any;
  GetAgentWiseDetail() {
    this.item = localStorage.getItem('phpadminid');
    this.Adminid = parseInt(JSON.parse(this.item));
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    // this.dtTrigger = new Subject<any>();
    this.PlacedcandidateService.GetPlacedcandidateReports(this.Adminid).subscribe(res => {
      this.dbResponse = res
      if (this.dbResponse.lstReportPlacedCandidate != null) {
        this.PlaceCandidateDetails = this.dbResponse.lstReportPlacedCandidate;
        // this.dtTrigger.next();
        this.spinnerService.hide();
      }
    })
  }

  ShowAllexcelExport(item: any) {
    var data = [];
    this.CompanyExelData = item;
    this.CompanyExelData.forEach(function (item, index) {
      var obj = {
        'S. No': index + 1,
        'Candidate Name': item.candName,
        'Email': item.email,
        'Mobile No.': item.mobile,
        'Gender': item.gender,
        'Address': item.candidateDomicile,
        'Job Title': item.jobTitle,
        'Scheme': item.scheme,
        'PIA/TP': item.tpname,
        'Employer Name': item.employername,
        'Joining Location': item.joininglocation,
        'Designation Offered': item.designationoffered,
        'Salary CTC Per Month': item.salaryctcpermonth,
        'Salary In Hand Per Month': item.salaryinhandpermonth,
        'Joining Date': item.joiningDate,
        'Offer Letter Date': item.offerLetterDate,
        'Joining Letter': item.joiningletter,
        'Source': item.source,

      }
      data.push(obj);
    })
    this.CompanyExelData = data;
    this.excelService.exportAsExcelFile(this.CompanyExelData, 'PlacedCandidateReports');
    this.CompanyExelData = [];
  }

  /////////////////////////////////// add new code ////////////////////////////////
  setdata: any = [];
  appliedcandidatedetail: any = '0';
  appliedcandidatedetail1: any = [];
  appliedcandidatedetail2: any = [];
  Exceldata: any = [];
  alldetail: any;
  excelexport: any = [];
  Appliedcandidatedetail(item: any, Status: any) { //uSetDatased to get the list of applied candidate using jobid
    var data = [];
    this.setdata = item;
    this.Companywiselist = '0';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };

    var getsenddatabyid = {
      "AgentId": item.ID,
      "Status": Status
    }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);
    let getdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddatabyid,
        'typeFor': 'EmployerReport',
        'secrateKey': gethashInBase64byid
      }
    }
    // this.dtTrigger = new Subject<any>();
    this.appliedcandidatedetail = '1';
    this.alldetail = '0';
    this.spinnerService.show();
    this.JobpostService.GetEmployerWiseReports(getdata).subscribe(res => {
      this.appliedcandidatedetail1 = res
      if (this.appliedcandidatedetail1.hstplResponse != null) {
        this.spinnerService.hide();
        this.appliedcandidatedetail2 = JSON.parse(this.appliedcandidatedetail1.hstplResponse.data);
        // this.dtTrigger.next();
        this.Exceldata = this.appliedcandidatedetail2;
        this.Exceldata.forEach(function (item, index) {
          var obj = {
            "S.No.": index + 1,
            "Owner Name": item.ownername ? item.ownername : 'NA',
            "Establishment Name": item.establishmentname ? item.establishmentname : 'NA',
            "Mobile No.": item.mobileno ? item.mobileno : 'NA',
            "Email": item.email ? item.email : 'NA',
            "Businessnature": item.businessnature ? item.businessnature : 'NA',
            "Address": item.address ? item.address : 'NA',
            "Nearby": item.nearby ? item.nearby : 'NA',
            "State Name": item.statename ? item.statename : 'NA',
            "District Name": item.districtname ? item.districtname : 'NA',
            "Total Jobs": item.totaljobs ? item.totaljobs : 'NA'
          }
          data.push(obj);
        })
        this.excelexport = data;
      }
      else {
        this.appliedcandidatedetail1 = [];
        this.appliedcandidatedetail2 = [];
        this.spinnerService.hide();
      }
    });

  }
  ///////////////////  back ///////////////
  BackToDashboard() {
    this.router.navigate(['/Dashboard']);
  }

  singleback() {
    this.Companywiselist = '1';
    this.appliedcandidatedetail = '0';
    this.GetAgentWiseDetail();

  }

  excelExport() {
    this.excelService.exportAsExcelFile(this.excelexport, 'EmployerList');
  }

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  imagetype: any;
  onUploadChange(evt: any, selectFile: any) {
    this.img = selectFile;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile = file;
    this.imagetype = this.currentFile.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg", "pdf"];
    if ($.inArray(this.imagetype[1], ValidImageExt) < 0) {
      this.toastrService.error("Only formats are allowed : jpg, jpeg, png & pdf");
      this.CandidateRegistration.controls['ImgName'].setValue('');
      return false;
    }
    if (this.img == 'offerlatterimage') {
      this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
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
      if (this.img == 'offerlatterimage') {
        this.CandidateRegistration.controls.OFFERLETTERIMAGENAME.setValue('');
      } else {
        this.CandidateRegistration.controls.ImgName.setValue('');
      }
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toastrService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        if (this.img == 'offerlatterimage') {
          this.CandidateRegistration.controls.OFFERLETTERIMAGENAME.setValue('');
        } else {
          this.CandidateRegistration.controls.ImgName.setValue('');
        }
        return false;
      }
      reader.onloadend = this.handleReaderLoaded.bind(this);
      var data = reader.readAsBinaryString(this.currentFile);
    }
  }
  imagename: string = '';
  offerlatterimgname: any = '';
  offerlatterExtention: any = '';
  latterimg: any = '';
  candImageExtention: any = '';
  candImagename: any = '';
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    if (this.img == 'offerlatterimage') {
      var imn2 = imn.split('.');
      this.offerlatterimgname = imn;
      this.offerlatterExtention = imn2[1];
      this.latterimg = 'data:image/png;base64,' + btoa(e.target.result);
      this.CandidateRegistration.controls['OFFERLETTERIMAGENAME'].setValue("");
    } else {
      var imn2 = imn.split('.');
      this.candImagename = imn;
      this.candImageExtention = imn2[1];
      this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
      for (var i = 0; i < this.base64textString.length; i++) {
        this.imagename = '';
        this.imagename = this.base64textString[i]
      }
      this.CandidateRegistration.controls['ImgName'].setValue("");
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

  jobtype: any;
  companyList: any = [];
  GetJobType(event) {
    // this.CandidateRegistration.reset();
    // this.CandidateRegistration.controls['jobtype'].setValue('');
    // this.CandidateRegistration.controls['COMPANYNAME'].setValue('');
    // this.CandidateRegistration.controls['jobId'].setValue('');
    // this.CandidateRegistration.controls['OpeningList'].setValue('');
    // this.CandidateRegistration.controls['candidatename'].setValue('');
    // this.CandidateRegistration.controls['birthstate'].setValue('');
    // this.CandidateRegistration.controls['birthdistrict'].setValue('');
    // this.CandidateRegistration.controls['EventList'].setValue('');
    // this.CandidateRegistration.controls['employername'].setValue('');
    this.jobtype = event;
    if (event != '') {
      this.ShowEmployerList = false;

      if (this.jobtype == 'Job/Walkin') {
        this.ShowJobDetails = true;
        this.ShowEventDetails = false;
        this.candidatelist = true;
        this.postdata = {
          'HSTPLRequest': {
            'data': "",
            'typeFor': 'AdminGetCompanyWithJob',
          }
        }
        this.TestimonialsService.GetData(this.postdata).subscribe(res => {
          this.dbResponse = res
          if (this.dbResponse.hstplResponse.status == true) {
            this.companyList = JSON.parse(this.dbResponse.hstplResponse.data);
          }
        })
      } else {
        this.ShowJobDetails = false;
        this.ShowEventDetails = true;
        this.candidatelist = true;
        this.GetAllEventList();
      }
    } else {
      this.ShowEmployerList = true;
      this.ShowJobDetails = false;
      this.candidatelist = false;
      this.ShowEventDetails = false;

    }


  }



  /*************************************************
    *****Get All Event List By Neeraj SIngh****** 
  *************************************************/
  DBResponce: any = [];
  EventList: any;
  GetAllEventList() {

    try {
      this.RojggarMelaService.AdminGetEventListWithEmployer().subscribe(res => {
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
  EmployerList: any = [];
  EventId: any;
  postdata1: any = {};
  evntId: any;
  GetEmployerList(eventid) {
    this.CandidateRegistration.controls['candidatename'].setValue('');
    this.evntId = eventid
    // {"HSTPLRequest":{"data":"{\"eventId\":127}","typeFor":"AdminGetEmployerByEventId"}}
    if (eventid) {
      this.EventId = { "eventId": parseInt(eventid) };
      this.postdata = {
        'HSTPLRequest': {
          'data': JSON.stringify(this.EventId),
          'typeFor': 'AdminGetEmployerByEventId'
        }
      }
      this.TestimonialsService.GetData(this.postdata).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.hstplResponse.status == true) {
          this.EmployerList = JSON.parse(this.dbResponse.hstplResponse.data);
        }
      })

      this.EventId = { "jobOpeningId": 0, "eventId": parseInt(eventid) };
      this.postdata1 = {
        'HSTPLRequest': {
          'data': JSON.stringify(this.EventId),
          'typeFor': 'AdminCandidateDetailByJobopeningId'
        }
      }

      this.TestimonialsService.GetData(this.postdata1).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.hstplResponse.status == true) {
          this.CandidateList = JSON.parse(this.dbResponse.hstplResponse.data);
        }
      })

    } else {
      this.EmployerList = [];
    }


  }



  /*******************************************************
    *****Get Job/Walkin Company List By Neeraj SIngh*****
  ********************************************************/


  GetCompanyJobList(companyId) {
    this.candcompanyId = companyId;
    if (companyId) {
      this.companyId = { "companyId": parseInt(companyId) };
      this.postdata = {
        'HSTPLRequest': {
          'data': JSON.stringify(this.companyId),
          'typeFor': 'AdminGetAllJobCodeTitle',
        }
      }
      this.TestimonialsService.GetData(this.postdata).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.hstplResponse.status == true) {
          this.JobList = JSON.parse(this.dbResponse.hstplResponse.data);
        }
      })
    } else {
      this.JobList = [];
    }
  }

  /*************************************************
    *****Get Job Opening List By Neeraj SIngh****** 
  *************************************************/
  OpeningList: any = [];
  jobid: any;
  GetOpeningList(jobid) {
    if (jobid) {
      this.jobid = { "JobId": parseInt(jobid) };
      this.postdata = {
        'HSTPLRequest': {
          'data': JSON.stringify(this.jobid),
          'typeFor': 'AdminGetJobLocationByJobId',
        }
      }
      this.TestimonialsService.GetData(this.postdata).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.hstplResponse.status == true) {
          this.OpeningList = JSON.parse(this.dbResponse.hstplResponse.data);
        }
      })
    } else {
      this.OpeningList = [];
    }
  }

  /*************************************************
  *****Get Candidate List By Neeraj SIngh****** 
  ************************************************/
  CandidateList: any = [];
  jobOpeningId: any;
  jobOpening: any;
  GetCandidateList(jobOpeningId) {
    this.jobOpening = jobOpeningId
    if (jobOpeningId) {
      this.jobOpeningId = { "eventId": 0, "jobOpeningId": parseInt(jobOpeningId) };
      this.postdata = {
        'HSTPLRequest': {
          'data': JSON.stringify(this.jobOpeningId),
          'typeFor': 'AdminCandidateDetailByJobopeningId',
        }
      }
      this.TestimonialsService.GetData(this.postdata).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.hstplResponse.status == true) {
          this.CandidateList = JSON.parse(this.dbResponse.hstplResponse.data);
        }
      })
    } else {
      this.CandidateList = [];
    }
  }
  candidateId: any;
  candidateDetail: any = [];
  SetstateId: any;
  SetdistrictId: any;
  GetCandidateDetail(candidateId) {

    if (candidateId) {
      try {
        this.candidateId = candidateId
        this.evntId = this.evntId ? this.evntId : 0;
        this.jobOpening = this.jobOpening ? this.jobOpening : 0;
        this.candcompanyId = this.candcompanyId ? this.candcompanyId : 0;
        this.RojggarMelaService.AdminGetCandidateDetailById(this.candidateId, this.jobOpening, this.evntId, this.candcompanyId).subscribe(res => {
          this.DBResponce = res;
          if (this.DBResponce.lstGetCandidateDetailById != null) {
            this.candidateDetail = this.DBResponce.lstGetCandidateDetailById;
            this.SetstateId = this.DBResponce.lstGetCandidateDetailById[0].stateId;
            this.SetdistrictId = this.DBResponce.lstGetCandidateDetailById[0].districtId;
            this.SetCandidateData();
          }
          else {
            this.candidateDetail = [];
          }
        });
      } catch  { }
    }

  }

  SetCandidateData() {

    this.CandidateRegistration.controls['Candidatename'].setValue(this.candidateDetail[0].candName);
    this.CandidateRegistration.controls['DOB'].setValue(this.candidateDetail[0].dob);
    this.CandidateRegistration.controls['emailid'].setValue(this.candidateDetail[0].email);
    this.CandidateRegistration.controls['mobile'].setValue(this.candidateDetail[0].mobile);
    this.CandidateRegistration.controls['Gender'].setValue(this.candidateDetail[0].gender);
    this.CandidateRegistration.controls['religion'].setValue(this.candidateDetail[0].religion);
    this.GetAllReligions_details();
    this.CandidateRegistration.controls['birthstate'].setValue(this.SetstateId);
    this.CandidateRegistration.controls['birthdistrict'].setValue(this.SetdistrictId);
    this.CandidateRegistration.controls['aboutme'].setValue(this.candidateDetail[0].aboutMe);
    this.CandidateRegistration.controls['ImgName'].setValue(this.candidateDetail[0].imageName);
    this.CandidateRegistration.controls['OFFERLETTERIMAGENAME'].setValue(this.candidateDetail[0].offerLetterImageName);
    this.CandidateRegistration.controls['PARTNERNAME'].setValue(this.candidateDetail[0].partnerName);
    this.CandidateRegistration.controls['TRAININGSCHEME'].setValue(this.candidateDetail[0].trainingScheme);
    this.CandidateRegistration.controls['ENROLMENTNO'].setValue(this.candidateDetail[0].enrolmentNo);
    this.CandidateRegistration.controls['INQUIRYNO'].setValue(this.candidateDetail[0].inquiryNo);
    this.CandidateRegistration.controls['SCHEME'].setValue(this.candidateDetail[0].scheme);
    this.CandidateRegistration.controls['LOCATION'].setValue(this.candidateDetail[0].location);
    // this.CandidateRegistration.controls['OFFERLETTERDATE'].setValue(this.candidateDetail[0].partnerName)
    this.CandidateRegistration.controls['CTC'].setValue(this.candidateDetail[0].ctc);
    this.CandidateRegistration.controls['REMARKS'].setValue(this.candidateDetail[0].remarks);
    this.CandidateRegistration.controls['DESIGNATION'].setValue(this.candidateDetail[0].designation);
    this.CandidateRegistration.controls['JOININGDATE'].setValue(this.candidateDetail[0].candidateJoiningDate);

    this.masterService.GetAllDistrict(this.SetstateId).subscribe(res => {
      this.district = res
      if (this.district != null && this.district.length > 0 && this.district != "") {
        this.district = this.district;
      }
    });

  }
  GetEmployer: any = [];
  GetEmployerDetail() {

    this.PlacedcandidateService.GetEmployerDetail().subscribe(res => {
      this.dbResponse = res
      if (this.dbResponse.lstAdminGetEmployerDdl) {
        this.GetEmployer = this.dbResponse.lstAdminGetEmployerDdl;
      }
    });
  }

  worklocation: any = [];
  GetWorkLocation(companyId) {
    if (companyId) {
      this.PlacedcandidateService.GetWorkLocation(companyId).subscribe(res => {
        this.dbResponse = res
        if (this.dbResponse.lstGetEmployerWorkLocationDdl != '') {
          this.worklocation = this.dbResponse.lstGetEmployerWorkLocationDdl;
        }
      });
    }

  }


  /*************************************************
    *****Add placed Candidate By Neeraj SIngh****** 
  *************************************************/
  CandidateDetails: any = {}
  CandidateImage: any = {};
  postdata: any = {};
  Response: any = [];
  Addcandidate() {
    // this.candidateId,this.jobOpening,this.evntId,this.candcompanyId



    this.CandidateDetails.jobType = this.jobtype;
    this.CandidateDetails.candId = parseInt(this.candidateId) ? parseInt(this.candidateId) : 0;
    this.CandidateDetails.eventId = parseInt(this.evntId) ? parseInt(this.evntId) : 0;
    this.CandidateDetails.jobOpeningId = parseInt(this.jobOpening) ? parseInt(this.jobOpening) : 0;
    this.CandidateDetails.candName = this.CandidateRegistration.value.Candidatename;
    this.CandidateDetails.dob = this.CandidateRegistration.value.DOB;
    this.CandidateDetails.email = this.CandidateRegistration.value.emailid;
    this.CandidateDetails.mobile = this.CandidateRegistration.value.mobile;
    this.CandidateDetails.gender = this.CandidateRegistration.value.Gender
    this.CandidateDetails.religion = parseInt(this.CandidateRegistration.value.religion) ? parseInt(this.CandidateRegistration.value.religion) : 0;
    this.CandidateDetails.stateId = parseInt(this.CandidateRegistration.value.birthstate) ? parseInt(this.CandidateRegistration.value.birthstate) : 0;
    this.CandidateDetails.districtId = parseInt(this.CandidateRegistration.value.birthdistrict) ? parseInt(this.CandidateRegistration.value.birthdistrict) : 0;
    this.CandidateDetails.aboutMe = this.CandidateRegistration.value.aboutme;
    this.CandidateDetails.registrationFrom = '';
    this.CandidateDetails.userId = 0;
    this.CandidateDetails.applicationType = '';
    this.CandidateDetails.partnerName = this.CandidateRegistration.value.PARTNERNAME;
    this.CandidateDetails.trainingScheme = this.CandidateRegistration.value.TRAININGSCHEME;
    this.CandidateDetails.traningTrade = '';
    this.CandidateDetails.enrolmentNo = parseInt(this.CandidateRegistration.value.ENROLMENTNO) ? parseInt(this.CandidateRegistration.value.ENROLMENTNO) : 0;
    this.CandidateDetails.inquiryNo = this.CandidateRegistration.value.INQUIRYNO;
    this.CandidateDetails.inqId = 0;
    this.CandidateDetails.prn = '';
    this.CandidateDetails.profileApi = '';
    this.CandidateDetails.ysId = 0;
    this.CandidateDetails.tpCode = 0;
    this.CandidateDetails.tcCode = 0;
    this.CandidateDetails.scheme = this.CandidateRegistration.value.SCHEME;
    this.CandidateDetails.tpName = '';
    this.CandidateDetails.tcName = '';
    this.CandidateDetails.sector = '';

    if (this.jobtype == 'Job/Walkin') {
      var companyid = this.candcompanyId;
      let companyname = (this.companyList).filter(function (entry) {
        return entry.companyId == companyid;
      });
      this.CandidateDetails.companyName = companyname[0].companyName ? companyname[0].companyName : '';
    } else {
      this.CandidateDetails.companyName = '';
    }

    this.CandidateDetails.employerId = parseInt(this.CandidateRegistration.value.employername ? this.CandidateRegistration.value.employername : 0);
    this.CandidateDetails.location = parseInt(this.CandidateRegistration.value.LOCATION);
    this.CandidateDetails.offerLetterDate = this.CandidateRegistration.value.OFFERLETTERDATE;
    this.CandidateDetails.ctc = parseInt(this.CandidateRegistration.value.CTC) ? parseInt(this.CandidateRegistration.value.CTC) : 0;
    this.CandidateDetails.remarks = this.CandidateRegistration.value.REMARKS;
    this.CandidateDetails.designation = this.CandidateRegistration.value.DESIGNATION;
    this.CandidateDetails.adminId = 0;
    this.CandidateDetails.jobId = parseInt(this.CandidateRegistration.value.jobId) ? parseInt(this.CandidateRegistration.value.jobId) : 0;
    this.CandidateDetails.interviewId = 0;
    this.CandidateDetails.joiningDate = this.CandidateRegistration.value.JOININGDATE;

    this.CandidateImage.CandidateImagePaths = this.imagename;
    this.CandidateImage.CandidateImageName = this.candImagename;
    this.CandidateImage.OfferletterImageName = this.offerlatterimgname;
    this.CandidateImage.OfferletterImagePath = this.latterimg;
    this.CandidateImage.CandidateImageExt = this.candImageExtention;
    this.CandidateImage.OfferletterImageExt = this.offerlatterExtention;
    // console.log(JSON.stringify(this.CandidateDetails));
    this.postdata = {
      'HSTPLRequest': {
        'data': JSON.stringify(this.CandidateDetails),
        'typeFor': 'AdminSetCandidateOfferLeterJoiningDetail',
        'lstImage': JSON.stringify(this.CandidateImage)
      }
    }
    //console.log(JSON.stringify(this.postdata));
    this.spinnerService.show();
    this.TestimonialsService.SetData(this.postdata).subscribe(res => {
      this.dbResponse = res
      this.spinnerService.hide();
      if (this.dbResponse.hstplResponse.status == true) {
        this.Response = this.dbResponse.hstplResponse
        this.toastrService.success(this.Response.message);
        this.CandidateRegistration.reset();
        this.CandidateRegistration.controls['jobtype'].setValue('');
        this.CandidateRegistration.controls['COMPANYNAME'].setValue('');
        this.CandidateRegistration.controls['jobId'].setValue('');
        this.CandidateRegistration.controls['OpeningList'].setValue('');
        this.CandidateRegistration.controls['candidatename'].setValue('');
        this.CandidateRegistration.controls['birthstate'].setValue('');
        this.CandidateRegistration.controls['birthdistrict'].setValue('');
        this.CandidateRegistration.controls['EventList'].setValue('');
        this.CandidateRegistration.controls['employername'].setValue('');
        this.CandidateRegistration.controls['LOCATION'].setValue('');
      } else {
        this.Response = this.dbResponse.hstplResponse
        this.toastrService.error(this.Response.message);
      }
    });
    this.modalRefSector.hide();
  }

  openModal(candiID: any, apitype: any) {
    this.mymodel.callMethod(candiID, apitype);
  }
    /**********************************
   View offer letter by Arti Ahirwar
  ***********************************/
 modalRefForOffer: BsModalRef;
 DbResponceOffer:any;
 OfferletterDetail:any;
 adminId:any;
 UserId:any;

 GetOfferLetterDetail(jobId: any, interviewId: any, CandId: any, template6: TemplateRef<any>) {
  this.modalRefForOffer = this.modalService.show(template6,
    { backdrop: 'static', keyboard: false });
  try {
    this.spinnerService.show();
    this.InterviewService.getCandidateOfferLetterDetail(this.adminId, this.UserId, jobId, interviewId, CandId).subscribe(res => {
      this.DbResponceOffer = res
      this.spinnerService.hide();
      if (this.DbResponceOffer != null) {
        this.OfferletterDetail = this.DbResponceOffer.lstCandidateOfferLette[0];
      }
    });
  } catch  { }
}
CloseOfferLetter() {
  this.modalRefForOffer.hide()
}
}
