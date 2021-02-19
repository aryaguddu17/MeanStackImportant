import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AppConfig } from '../../Globals/app.config';
import { UserInfoService } from '../../Services/userInfo.service.';
import { Pipe, PipeTransform } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from '../../Services/excel.service';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-DashBoardComponent',
  templateUrl: './DashBoard.Component.html',
})
export class DashBoardComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  likeByMe: boolean = false;
  constructor(private appConfig: AppConfig
    , public router: Router
    , private toastrService: ToastrService
    , private userinfoservice: UserInfoService
    , private masterService: MasterService
    , private formBuilder: FormBuilder
    , private modalService: BsModalService
    , private excelService: ExcelService
    , private spinnerService: Ng4LoadingSpinnerService

  ) {
  }

  dbResponse: any = [];
  totalNumber: any;
  public pieChartLabels: any = ['Total Vacancy', 'Total Open Vacancy', 'Total Closed Jobs', 'Total Revoked Jobs', 'Total Scraped Jobs'];
  public pieChartType = 'pie';
  public pieChartData = [120, 150, 180, 90];

  public barChartLabels = ['Total Vacancy', 'Total Open Vacancy', 'Total Closed Jobs', 'Total Revoked Jobs', 'Total Scraped Jobs'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [28, 48, 40, 19], label: '' }
  ];
  ngOnInit() {
    // this.GetOpeningDetails();
    this.GetrecentOpeningDetails();
    // this.Recentlyappliedcandidate();
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  openingDetails: any = [];
  vals = [];
  keys = [];
  param: any = 0;

  chart: any;
  openingDetails1: any = [];
  // GetOpeningDetails(){ 
  //   var chartData = new Array();
  //   var Adminid = JSON.parse(localStorage.getItem('phpadminid'));
  //   this.spinnerService.show();
  //   this.masterService.GetOpeningDetails(Adminid).subscribe(res => {
  //     this.dbResponse = res
  //     if(this.dbResponse!=null){
  //       this.spinnerService.hide();
  //       this.openingDetails = JSON.stringify(this.dbResponse[0]);   
  //       this.openingDetails1 = JSON.parse(this.openingDetails);

  //       for(let key in this.dbResponse[0]) {
  //        this.keys.push(JSON.parse(this.dbResponse[0][key]));
  //       }
  //       this.pieChartData=this.keys ;
  //       this.barChartData=this.keys ;

  //     }
  //     else{
  //       this.dbResponse=[];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  alldetail: any = '0';
  dashboardview: any = '1';

  getrecentOpeningDetails1: any = [];
  getrecentOpeningDetails2: any = [];
  GetrecentOpeningDetails() {
    //used to get the recently posted job
    var Adminid = JSON.parse(localStorage.getItem('phpadminid'));
    var OrderbyType = "JOBPOST";
    var displaymode = "LIMITMODE";
    this.spinnerService.show();
    this.masterService.GetrecentOpeningDetails(Adminid, OrderbyType, displaymode).subscribe(res => {
      this.getrecentOpeningDetails1 = res
      if (this.getrecentOpeningDetails1 != null) {
        this.getrecentOpeningDetails2 = this.getrecentOpeningDetails1;
        // this.spinnerService.hide();  
      }

      else {
        this.getrecentOpeningDetails1 = [];
        this.spinnerService.hide();
      }
    });
    var Adminid = JSON.parse(localStorage.getItem('phpadminid'));
    var OrderbyType = "APPLYCAND";
    var displaymode = "LIMITMODE";
    // this.spinnerService.show();
    this.masterService.Recentlyappliedcandidate(Adminid, OrderbyType, displaymode).subscribe(res => {
      this.recentlyappliedcandidate1 = res
      if (this.recentlyappliedcandidate1 != null) {
        this.recentlyappliedcandidate2 = this.recentlyappliedcandidate1;
        //this.spinnerService.hide();  
      }
      else {
        this.recentlyappliedcandidate1 = [];
        this.spinnerService.hide();
      }
    });
    var chartData = new Array();
    var Adminid = JSON.parse(localStorage.getItem('phpadminid'));
    //this.spinnerService.show();
    this.masterService.GetOpeningDetails(Adminid).subscribe(res => {
      this.dbResponse = res
      if (this.dbResponse != null) {
        this.spinnerService.hide();
        this.openingDetails = JSON.stringify(this.dbResponse[0]);
        this.openingDetails1 = JSON.parse(this.openingDetails);

        for (let key in this.dbResponse[0]) {
          this.keys.push(JSON.parse(this.dbResponse[0][key]));
        }
        this.pieChartData = this.keys;
        this.barChartData = this.keys;

      }
      else {
        this.dbResponse = [];
        this.spinnerService.hide();
      }
    });

    // if(this.getrecentOpeningDetails1!=null && this.recentlyappliedcandidate1!=null && this.dbResponse!=null){
    //  this.spinnerService.hide();
    // }
  }

  totaljoblist: any = 0;
  Exceldata: any = [];
  Jobid: any = '';
  jobcount1: any = [];
  jobcount2: any = [];
  JobCount(Jobid: any, param) {   //used to get all(single) the details of posted job using jobid
    var data = [];
    this.param = param;
    var Adminid = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    this.alldetail = '1';
    this.dashboardview = '0';
    this.totaljoblistshow = '0';
    this.totalcandidateshow = '0';
    this.Jobid = Jobid;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    this.spinnerService.show();
    this.masterService.JobCount(Adminid, this.Jobid).subscribe(res => {
      this.jobcount1 = res;
      if (this.jobcount1 != null) {
        this.spinnerService.hide();
        this.jobcount2 = this.jobcount1;
        this.totaljoblist = this.jobcount2[0].TOTRECDS;
        this.dtTrigger.next();
        this.Exceldata = this.jobcount2;
        this.Exceldata.forEach(function (item) {
          var obj = {
            'Company Name': item.comapnyname,
            'Job Title': item.jobtitle,
            'State': item.statename,
            'District': item.districtname,
            'Total Vacancy': item.totvancancy,
            'No. of Applicants': item.noofappliedcandidate,
          }
          data.push(obj);
        })
        this.excelexport = data;
      }
      else {
        this.jobcount1 = [];
        this.spinnerService.hide();
      }
    });
  }

  excelExport() {
    if (this.Exceldata.length != 0 && this.excelexport.length != 0) {
      for (var i = 0; i < this.Exceldata.length; i++) {
        delete this.Exceldata[i]['ID'];
        delete this.Exceldata[i]['TOTRECDS'];
      }
      this.excelService.exportAsExcelFile(this.excelexport, 'Reports');
    }
    else {
      this.toastrService.error("Blank data can not to be export");
    }
  }

  setdata: any = [];
  appliedcandidatedetail: any = '0';
  appliedcandidatedetail1: any = [];
  appliedcandidatedetail2: any = [];

  Appliedcandidatedetail(item: any) { //used to get the list of applied candidate using jobid
    var data = [];
    this.Exceldata = [];
    this.excelexport = [];
    var Companyname = item.comapnyname;
    var Statename = item.statename;
    var Districtname = item.districtname;
    var Jobtitle = item.jobtitle;
    var Totalvacancy = item.totvancancy;
    var setdata1 = { 'Companyname': Companyname, 'Statename': Statename, 'Districtname': Districtname, 'Jobtitle': Jobtitle, 'Totalvacancy': Totalvacancy }
    this.setdata = setdata1;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    this.appliedcandidatedetail = '1';
    this.alldetail = '0';
    var UserID = 0;
    var JobId = item.jobid;
    var openingid = item.openingid;
    var InterviewId = 0;
    var SearchKey = '';
    var PageNumber = 0;
    var senddata = {
      'userid': UserID, 'jobid': JobId, 'interviewid': InterviewId, 'searchkey': SearchKey, 'jobopeningid': openingid
    }
    this.spinnerService.show();
    this.masterService.Appliedcandidatedetail(senddata).subscribe(res => {
      this.appliedcandidatedetail1 = res
      if (this.appliedcandidatedetail1 != null) {
        this.spinnerService.hide();
        this.appliedcandidatedetail2 = this.appliedcandidatedetail1;
        this.dtTrigger.next();
        this.Exceldata = this.appliedcandidatedetail2;
        this.Exceldata.forEach(function (item) {
          var obj = {
            'Candidate Name': item.candname,
            'Email': item.email,
            'Mobile': item.mobile,
            'Gender': item.gender,
            'Age': item.age,
            'State': item.statename,
            'District': item.districtname,
            'Partner Name': item.partnername,
            'Scheme': item.trainingscheme,
            'Trade': item.traningtrade,

          }
          data.push(obj);
        });
        this.excelexport = data;
      }
      else {
        this.appliedcandidatedetail1 = [];
        this.spinnerService.hide();
      }
    });

  }

  singleback() {
    if (this.flag == 1) {
      this.totaljoblistshow = '1';
      this.dashboardview = '0';
      this.alldetail = '0';
      this.Allrecentlypostedjoblist(this.flag);
    } else {
      this.router.navigateByUrl('UserManagement', { skipLocationChange: true }).then(() =>
        this.router.navigate(['Dashboard']));
    }
  }
  gotototalcandidatelist() {
    if (this.flag == 1) {
      if (this.param == 1) {
        this.totalcandidateshow = '0';
        this.totaljoblistshow = '0';
        this.dashboardview = '0';
        this.alldetail = '0';
        this.Allrecentlypostedjoblist(this.flag);
      }
      else {
        this.totalcandidateshow = 1;
        this.totaljoblistshow = '1';
        this.dashboardview = '0';
        this.alldetail = '0';
        this.Allrecentlyappliedcandidatelist(this.flag);
      }
    }
    else {
      this.router.navigateByUrl('UserManagement', { skipLocationChange: true }).then(() =>
        this.router.navigate(['Dashboard']));
    }
  }

  gotodashboard() {
    this.router.navigateByUrl('UserManagement', { skipLocationChange: true }).then(() =>
      this.router.navigate(['Dashboard']));
  }

  singleback1(param) {
    param = this.param;
    this.alldetail = '1';
    this.appliedcandidatedetail = '0';
    this.JobCount(this.Jobid, param);
  }

  recentlyappliedcandidate1: any = [];
  recentlyappliedcandidate2: any = [];

  // Recentlyappliedcandidate(){

  //   var Adminid = JSON.parse(localStorage.getItem('phpadminid'));
  //   var OrderbyType="APPLYCAND";
  //   var displaymode="LIMITMODE";
  //   this.spinnerService.show();
  //   this.masterService.Recentlyappliedcandidate(Adminid,OrderbyType,displaymode).subscribe(res => {
  //     this.recentlyappliedcandidate1 = res
  //     if(this.recentlyappliedcandidate1!=null){
  //       this.recentlyappliedcandidate2 = this.recentlyappliedcandidate1;
  //       this.spinnerService.hide();  
  //     }
  //     else{
  //       this.recentlyappliedcandidate1=[];
  //       this.spinnerService.hide();
  //     }
  //   });
  // }

  flag: any;

  totaljoblistshow: any = '0';
  allrecentlypostedjoblist1: any = [];
  allrecentlypostedjoblist2: any = [];

  Allrecentlypostedjoblist(f: any) {
    var data = [];
    this.flag = f;
    this.alldetail = '0';
    this.dashboardview = '0';
    this.totaljoblistshow = '1';
    var Adminid = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    var OrderbyType = "JOBPOST";
    var displaymode = "FULLMODE";
    this.Jobid = 2850;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    this.spinnerService.show();
    this.masterService.Allrecentlypostedjoblist(Adminid, OrderbyType, displaymode).subscribe(res => {
      this.allrecentlypostedjoblist1 = res
      if (this.allrecentlypostedjoblist1 != null) {
        this.spinnerService.hide();
        this.allrecentlypostedjoblist2 = this.allrecentlypostedjoblist1;
        this.dtTrigger.next();
        this.Exceldata = this.allrecentlypostedjoblist2;
        this.Exceldata.forEach(function (item) {
          let obj = {
            'Company Name': item.companyName,
            'Job Title': item.jobtitle,
            'Posted Date': item.jobpusheddate,
            'Valid Upto': item.validupto,
            'No. of Applicants': item.noofappliedcandidate,
          }
          data.push(obj);

        })
        this.excelexport = data;
      }
      else {
        this.allrecentlypostedjoblist1 = [];
        this.spinnerService.hide();
      }
    });
  }


  totalcandidateshow: any = '0';
  allrecentlyappliedcandidatelist1: any = [];
  allrecentlyappliedcandidatelist2: any = [];
  excelexport: any = [];

  Allrecentlyappliedcandidatelist(f: any) {
    var data = [];
    this.flag = f;
    this.alldetail = '0';
    this.dashboardview = '0';
    this.totaljoblistshow = '0';
    this.totalcandidateshow = '1';
    var Adminid = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    var OrderbyType = "APPLYCAND";
    var displaymode = "FULLMODE";
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    this.spinnerService.show();
    this.masterService.Allrecentlyappliedcandidatelist(Adminid, OrderbyType, displaymode).subscribe(res => {
      this.allrecentlyappliedcandidatelist1 = res
      if (this.allrecentlyappliedcandidatelist1 != null) {
        this.spinnerService.hide();
        this.allrecentlyappliedcandidatelist2 = this.allrecentlyappliedcandidatelist1;
        this.dtTrigger.next();
        this.Exceldata = this.allrecentlyappliedcandidatelist2;
        this.Exceldata.forEach(function (item) {
          let obj = {
            'Company Name': item.companyName,
            'Job Title': item.jobtitle,
            'Posted Date': item.jobpusheddate,
            'Valid Upto': item.validupto,
            'No. of Applicants': item.noofappliedcandidate,
          }
          data.push(obj);
        });
        this.excelexport = data;
      }
      else {
        this.allrecentlyappliedcandidatelist1 = [];
        this.spinnerService.hide();
      }
    });
  }
  JobPost(postdata: any) {
    this.router.navigate(['/DashboardReports', { postdata }]);
  }

  PlacedCandidate(postdata) {
    this.router.navigate(['/PlacedCandidate', { postdata }]);
  }

  RegisteredAgent(postdata: any) {
    this.router.navigate(['/fos', { postdata }]);
  }
  RegisteredCompany(postdata: any) {
    this.router.navigate(['/Register', { postdata }]);
  }

}  
