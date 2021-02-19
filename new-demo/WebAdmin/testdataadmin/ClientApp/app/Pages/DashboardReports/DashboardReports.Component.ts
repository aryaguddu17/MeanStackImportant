import { Component, OnInit, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../../Services/authenticate.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService, } from 'ngx-toastr';
import { MasterService } from '../../Services/master.service';
import { CommonViewLayoutComponent } from '../CommonModelView/CommonView-Layout.Component';
import { AppConfig } from '../../Globals/app.config';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ExcelService } from '../../Services/excel.service';
import { JobpostService } from '../../Services/jobpost.service';
import { DashboardReportsService } from '../../Services/dashboardReports.service';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'DashboardReportsComponent',
  templateUrl: './DashboardReports.Component.html',
})

export class DashboardReportsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  DbResponse: any = [];
  UserInfo: any;
  OfferletterDetail: any = [];

  logintype: any;
  @ViewChild(CommonViewLayoutComponent) private mymodel: CommonViewLayoutComponent;
  @Output() clicked = new EventEmitter<string>();

  constructor(
    private http: Http,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private authenticationService: AuthenticationService,
    private dashboardReportsService: DashboardReportsService,
    private toastrService: ToastrService,
    private forgotPasswordBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private updatePasswordBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    public appConfig: AppConfig,
    private config: AppConfig,
    private modalService: BsModalService,
    private masterService: MasterService,
    private excelService: ExcelService,
    private route: ActivatedRoute,
    private JobpostService: JobpostService

  ) {
    try {
      this.UserInfo = appConfig.UserInfo;
      this.logintype = this.UserInfo.loginType;
    } catch  { }
  }
  postdata: any;
  ngOnInit() {
    this.postdata = this.route.snapshot.paramMap.get('postdata');
    if (this.postdata == 'JobPost') {
      this.GetDashboardJobpostDetail();
    } else if (this.postdata == 'applicantReciept') {
      this.GetDashboardApplicationsRecieved();
    } else if (this.postdata == 'registeredcandidate') {
      this.GetDashboardRegistrationReceived();
    } else if (this.postdata == 'activejobs') {
      this.GetDashboardActiveJobs();
    } else if (this.postdata == 'closedjobs') {
      this.GetDashboardClosedJobs();
    }
  }

  Back() {
    this.router.navigate(['/Dashboard']);
  }

  /*********************************************
     List of placed candidate by neeraj Singh
   ********************************************/
  PlacedCandidate: any = [];
  GetPlacedCandidate() {

  }

  /***********************************************************
  View placed candidate using CommonModelView by neeraj Singh
  ************************************************************/
  viewcandidateProfile(candiID: any, apitype: any) {
    this.mymodel.callMethod(candiID, apitype);
  }


  /************************
   close offer letter modal
  *************************/




  PlacedCandidateForExport: any = [];
  ExcelExport() {
    var exportCanDetail;
    for (let j = 0; j < this.PlacedCandidate.length; j++) {
      exportCanDetail = {
        'jobtitle': this.PlacedCandidate[j]['jobtitle'],
        'candname': this.PlacedCandidate[j]['candname'],
        'offerletterdate': this.PlacedCandidate[j]['offerletterdate'],
        'joiningdate': this.PlacedCandidate[j]['joiningdate'],
        'source': this.PlacedCandidate[j]['source'],
        'age': this.PlacedCandidate[j]['age'],
        'mobile': this.PlacedCandidate[j]['mobile'],
        'gender': this.PlacedCandidate[j]['gender'],
        'statename': this.PlacedCandidate[j]['statename'],
        'districtname': this.PlacedCandidate[j]['districtname']
      }
    }
    this.PlacedCandidateForExport.push(exportCanDetail);
    for (let i = 0; i < this.PlacedCandidate.length; i++) {
      delete this.PlacedCandidate[i]['stateid'];
    }
    this.excelService.exportAsExcelFile(this.PlacedCandidateForExport, 'StatewiseReports');
  }

  /************************
   JobPost Detail
  *************************/
  JobpostDetaillist: any = [];
  GetDashboardJobpostDetail() {
    this.spinnerService.show();
    this.dashboardReportsService.jobPosted().subscribe(res => {
      this.DbResponse = res;
      if (this.DbResponse != null) {
        this.spinnerService.hide();
        this.JobpostDetaillist = this.DbResponse.lstGetDashboardJobpostDetaillist;
      }
    });
  }

  // excel download for Get Dashboard Job post Detail
  jobPostForExport: any = [];
  ExcelExportJobPost() {
    var exportCanDetail;
    for (let j = 0; j < this.JobpostDetaillist.length; j++) {
      exportCanDetail = {
        'Job Code': this.JobpostDetaillist[j]['jobcode'],
        'Job Title': this.JobpostDetaillist[j]['jobtitle'],
        'Job Type': this.JobpostDetaillist[j]['jobType'],
        'Functional Area': this.JobpostDetaillist[j]['functionarea'],
        'Industry Name': this.JobpostDetaillist[j]['industryname'],
        'No. of Vacancy': this.JobpostDetaillist[j]['noOfVacancy'],
        'Valid Upto': this.JobpostDetaillist[j]['validupto'],
      }
      this.jobPostForExport.push(exportCanDetail);
    }
    this.excelService.exportAsExcelFile(this.jobPostForExport, 'Job Post Detail');
    this.jobPostForExport=[];
  }

  //  GetDashboardApplicationsRecieved By Pankaj Joshi 
  applicationsRecieved: any = []
  GetDashboardApplicationsRecieved() {
    this.dashboardReportsService.applicationReceived().subscribe(res => {
      this.DbResponse = res

      if (this.DbResponse.lstAdminGetDashboardApplicationsRecieved != null) {
        this.applicationsRecieved = this.DbResponse.lstAdminGetDashboardApplicationsRecieved;
      }
    });
  }
  // excel download for scheduled interview candidate list
  applicationsRecievedForExport: any = [];
  ExcelExportapplicationsRecieved() {
    var exportCanDetail;
    for (let j = 0; j < this.applicationsRecieved.length; j++) {
      exportCanDetail = {
        'Company Name': this.applicationsRecieved[j]['companyName'],
        'Job Code': this.applicationsRecieved[j]['jobCode'],
        'Job Title': this.applicationsRecieved[j]['jobTitle'],
        'Candidate Name': this.applicationsRecieved[j]['candName'],
        'Mobile': this.applicationsRecieved[j]['mobile'],
        'Email': this.applicationsRecieved[j]['email'],
        'Gender': this.applicationsRecieved[j]['gender'],
        'DOB': this.applicationsRecieved[j]['dob'],
        'Applied Date': this.applicationsRecieved[j]['appliedDate'],

        // 'interviewDateTo': this.applicationsRecieved[j]['interviewDateFrom'],
        // 'interviewTo': this.applicationsRecieved[j]['interviewDateFrom'],
      }
      this.applicationsRecievedForExport.push(exportCanDetail);
    }
    this.excelService.exportAsExcelFile(this.applicationsRecievedForExport, 'Applications Recieved');
    this.applicationsRecievedForExport = [];
  }

  //  GetDashboardApplicationsRecieved By Pankaj Joshi 
  registrationReceived: any = []
  GetDashboardRegistrationReceived() {
    this.DbResponse = ''
    this.dashboardReportsService.registeredCandidate().subscribe(res => {
      this.DbResponse = res
      if (this.DbResponse.lstGetDashboardRegistrationReceived != null) {
        this.registrationReceived = this.DbResponse.lstGetDashboardRegistrationReceived;
      }
    });
  }

  // excel download for scheduled interview candidate list
  registrationReceivedForExport: any = [];
  ExcelExportRegistrationReceived() {
    var exportCanDetail;
    for (let j = 0; j < this.registrationReceived.length; j++) {
      exportCanDetail = {
        'Company Name':this.registrationReceived[j]['companyName'],
        'Candidate Name': this.registrationReceived[j]['candName'],
        'Mobile': this.registrationReceived[j]['mobile'],
        'Email': this.registrationReceived[j]['email'],
        'Gender': this.registrationReceived[j]['gender'],
        'DOB': this.registrationReceived[j]['dob'],
      }
      this.registrationReceivedForExport.push(exportCanDetail);
    }
    this.excelService.exportAsExcelFile(this.registrationReceivedForExport, 'Registration Recieved');
    this.registrationReceivedForExport =[];

  }

  //  GetDashboardActive jobs 
  activeJobs: any = []
  GetDashboardActiveJobs() {
    this.dashboardReportsService.activeJobs().subscribe(res => {
      this.DbResponse = res
      if (this.DbResponse.lstAdminTotalActiveJob != null) {
        this.activeJobs = this.DbResponse.lstAdminTotalActiveJob;
      }
    });
  }
  // excel download for active jobs
  activeJobsForExport: any = [];
  ExcelExportActiveJobs() {
    var exportActiveJobs;
    for (let j = 0; j < this.activeJobs.length; j++) {
      exportActiveJobs = {
        'jobcode': this.activeJobs[j]['jobcode'],
        'jobtitle': this.activeJobs[j]['jobtitle'],
        'functionarea': this.activeJobs[j]['functionarea'],
        'industryname': this.activeJobs[j]['industryname'],
        'noOfVacancy': this.activeJobs[j]['noOfVacancy'],
        'validupto': this.activeJobs[j]['validupto'],
      }
      this.activeJobsForExport.push(exportActiveJobs);
    }
    this.excelService.exportAsExcelFile(this.activeJobsForExport, 'Active Jobs Detail');
    this.activeJobsForExport = [];
  }
  //  GetDashboardClosed jobs 
  closedJobs: any = []
  GetDashboardClosedJobs() {
    this.dashboardReportsService.closedJobs().subscribe(res => {
      this.DbResponse = res
      if (this.DbResponse.lstAdminTotalClosedJob != null) {
        this.closedJobs = this.DbResponse.lstAdminTotalClosedJob;
      }
    });
  }
  // excel download for closed jobs
  closedJobsForExport: any = [];
  ExcelExportClosedJobs() {
    var exportClosedJobs;
    for (let j = 0; j < this.closedJobs.length; j++) {
      exportClosedJobs = {
        'jobcode': this.closedJobs[j]['jobcode'],
        'jobtitle': this.closedJobs[j]['jobtitle'],
        'functionarea': this.closedJobs[j]['functionarea'],
        'industryname': this.closedJobs[j]['industryname'],
        'noOfVacancy': this.closedJobs[j]['noOfVacancy'],
        'validupto': this.closedJobs[j]['validupto'],
      }
      this.closedJobsForExport.push(exportClosedJobs);
    }
    this.excelService.exportAsExcelFile(this.closedJobsForExport, 'Closed Job Detail');
    this.closedJobsForExport  = [];
  }

  sortF: any;
  changeSort(event) {
    if (!event.order) {
      this.sortF = 'year';
    } else {
      this.sortF = event.field;
    }
  }

}
