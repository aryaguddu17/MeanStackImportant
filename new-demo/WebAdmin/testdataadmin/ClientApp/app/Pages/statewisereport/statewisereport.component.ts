import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { ExcelService } from '../../Services/excel.service';

import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { Subject } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { timingSafeEqual } from 'crypto-js';

@Component({
  selector: 'app-statewisereport',
  templateUrl: './statewisereport.component.html',

})
export class StatewisereportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  ShowCount: boolean = true;
  ShowStateWise: boolean = false;
  previousbtn: boolean;
  ShowdistrictWise: boolean;
  dbResponse: any = [];
  previousbtn1: boolean;
  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    // this.dtTrigger.unsubscribe();
    this.GetStateWiseReport();

  }

  StateReportById: any = [];
  SendStateid: any;
  ShowStateWiseExceldata: any = [];
  Statename: any;
  ShowStateWiseData(StateId: any) {
    var data = [];
    this.Exceldata = [];
    this.excelexport = [];

    this.HomeUrl = '1';
    this.SendStateid = StateId;
    this.StateId = StateId;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   paging: true,
    //   searching: true,
    //   destroy: false,
    //   retrieve: true,
    // };
    // this.dtTrigger = new Subject<any>();
    this.spinnerService.show();
    this.JobpostService.GetStateWiseReport(this.SendStateid).subscribe(res => {
      this.dbResponse = res;
      debugger
      if (this.dbResponse != null) {
        this.spinnerService.hide();
        this.StateReportById = this.dbResponse.lstStateReportById;
        this.Statename = this.StateReportById[0]['statename'];
        // this.dtTrigger.next();
        this.Exceldata = this.StateReportById;
        this.Exceldata.forEach(function (item) {
          var obj = {
            'State Name': item.statename,
            'District Name': item.district,
            // 'No of vacancy': item.noofvancancy,
            'No of Company': item.noofcompanies,
            'No of Job': item.noofjobs,
            'No of Opening': item.noofopening,
            'No of Application Recived': item.applicationreceived
          }
          data.push(obj);
        });
        this.excelexport = data;
        // this.ShowStateWiseExceldata = this.StateReportById;
      }
    });

    this.ShowCount = false;
    this.ShowStateWise = true;
    this.previousbtn = true;
  }

  backbtn() {
    this.ShowCount = true;
    this.ShowStateWise = false;
    this.previousbtn = false;
    this.ShowdistrictWise = false;
    this.GetStateWiseReport();

  }



  statewisedata: any = [];
  GellStateWiseExceldata: any = [];
  Exceldata: any = [];
  excelexport: any = [];
  GetStateWiseReport() {

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   paging: true,
    //   searching: true,
    //   destroy: false,
    //   retrieve: true,
    // };
    // this.dtTrigger = new Subject<any>();

    var data = [];
    this.Exceldata = [];
    this.excelexport = [];


    this.spinnerService.show();

    this.JobpostService.GetReportCount().subscribe(res => {
      this.dbResponse = res
      if (this.dbResponse != null) {

        this.spinnerService.hide();
        this.statewisedata = this.dbResponse.lstStateByCompanyDetail;
        // this.dtTrigger.next();
        this.Exceldata = this.statewisedata;

        this.Exceldata.forEach(function (item) {
          var obj = {
            'State Name': item.statename,
            'No. of Company': item.noofcompanies,
            'No of Jobs': item.noofjobs,
            'No of Opening': item.noofopening,
            'No of Application Recived': item.applicationreceived
          }
          data.push(obj);
        });
        this.excelexport = data;
        // this.GellStateWiseExceldata = this.statewisedata;
      } else {
        this.dbResponse = [];
        this.spinnerService.hide();
      }
    });
  }
  DistrictById: any = [];
  Senddistrictid: any;
  DistrictWiseExceldata: any = [];
  DistricName: any;
  GetDistrictWiseReport(districtid: any) {
    this.StateUrl = '1';
    this.Senddistrictid = districtid;
    this.ShowdistrictWise = true
    this.ShowStateWise = false
    this.previousbtn = false;
    this.previousbtn1 = true;
    this.Showstates = true;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   paging: true,
    //   searching: true,
    //   destroy: false,
    //   retrieve: true,
    // };
    // this.dtTrigger = new Subject<any>();


    var data = [];
    this.Exceldata = [];
    this.excelexport = [];

    this.spinnerService.show();
    this.JobpostService.GetDistrictWiseReport(this.SendStateid, this.Senddistrictid).subscribe(res => {
      this.dbResponse = res
      if (this.dbResponse != null) {
        this.spinnerService.hide();
        this.DistrictById = this.dbResponse.lstStateReportById;
        // this.DistricName = this.DistrictById[0]['district'];
        // this.dtTrigger.next();
        this.Exceldata = this.DistrictById;
        this.Exceldata.forEach(function (item) {
          var obj = {
            'Company Name': item.companyname,
            'State Name': item.statename,
            'District Name': item.district,
            'Job Title': item.jobtitle,
            'No of vacancy': item.noofvancancy,
            'No of Application Recived': item.noofapplicationreceived
          }
          data.push(obj);
        });
        this.excelexport = data;

        // this.DistrictWiseExceldata = this.DistrictById;
      }

    });

  }

  backbtn1() {
    this.previousbtn1 = false;
    this.previousbtn = true;
    this.ShowdistrictWise = false;
    this.ShowStateWise = true;
    this.GetStateWiseReport()
  }

  ShowAllexcelExport() {

    if (this.Exceldata.length != 0 && this.excelexport.length != 0) {
      for (var i = 0; i < this.Exceldata.length; i++) {
        // delete this.Exceldata[i]['stateid'];
      }
      this.excelService.exportAsExcelFile(this.excelexport, 'StatewiseReports');
    }
    else {
      this.toastrService.error("Blank data can not to be export");
    }


    // if (this.GellStateWiseExceldata.length != 0) {
    //   for (var i = 0; i < this.GellStateWiseExceldata.length; i++) {
    //     delete this.GellStateWiseExceldata[i]['stateid'];
    //   }
    //   this.excelService.exportAsExcelFile(this.GellStateWiseExceldata, 'StatewiseReports');
    // } else {
    //   this.toastrService.error("Blank data can not to be export");
    // }
  }


  ShowStateWiseexcelExport() {

    if (this.Exceldata.length != 0 && this.excelexport.length != 0) {
      // for (var i = 0; i < this.Exceldata.length; i++) {
      //   // delete this.Exceldata[i]['districtid'];
      //   delete this.Exceldata[i]['companyname'];
      //   delete this.Exceldata[i]['openingid'];
      //   delete this.Exceldata[i]['noofapplicationreceived'];
      //   delete this.Exceldata[i]['jobid'];
      //   delete this.Exceldata[i]['jobtitle'];
      // }
      this.excelService.exportAsExcelFile(this.excelexport, 'districtWiseReports');
    }
    else {
      this.toastrService.error("Blank data can not to be export");
    }


    // for (var i = 0; i < this.ShowStateWiseExceldata.length; i++) {
    //   delete this.ShowStateWiseExceldata[i]['districtid'];
    //   delete this.ShowStateWiseExceldata[i]['companyname'];
    //   delete this.ShowStateWiseExceldata[i]['openingid'];
    //   delete this.ShowStateWiseExceldata[i]['noofapplicationreceived'];
    //   delete this.ShowStateWiseExceldata[i]['jobid'];
    //   delete this.ShowStateWiseExceldata[i]['jobtitle'];
    // }
    // this.excelService.exportAsExcelFile(this.excelexport, 'districtWiseReports');
  }


  ShowdistrictWiseexcelExport() {

    if (this.Exceldata.length != 0 && this.excelexport.length != 0) {
      for (var i = 0; i < this.Exceldata.length; i++) {
        delete this.Exceldata[i]['districtid'];
        delete this.Exceldata[i]['openingid'];
        // delete this.Exceldata[i]['noofapplicationreceived'];
        delete this.Exceldata[i]['jobid'];
        delete this.Exceldata[i]['noofcompanies'];
        delete this.Exceldata[i]['noofjobs'];
        delete this.Exceldata[i]['noofopening'];
      }
      this.excelService.exportAsExcelFile(this.excelexport, 'CompanyWiseReports');
    }
    else {
      this.toastrService.error("Blank data can not to be export");
    }

    // for (var i = 0; i < this.DistrictWiseExceldata.length; i++) {
    //   delete this.DistrictWiseExceldata[i]['districtid'];
    //   delete this.DistrictWiseExceldata[i]['openingid'];
    //   delete this.DistrictWiseExceldata[i]['noofapplicationreceived'];
    //   delete this.DistrictWiseExceldata[i]['jobid'];
    //   delete this.DistrictWiseExceldata[i]['noofcompanies'];
    //   delete this.DistrictWiseExceldata[i]['noofjobs'];
    //   delete this.DistrictWiseExceldata[i]['noofopening'];

    // }
    // this.excelService.exportAsExcelFile(this.DistrictWiseExceldata, 'CompanyWiseReports');
  }

  Showstates: boolean = true;
  StateId: any;
  HomeUrl: any = '0';
  StateUrl: any = '0';
  setnavigation(type: any) {
    if (type == 'H') {
      this.statewisedata = [];
      this.GetStateWiseReport();
      this.ShowCount = true
      this.ShowStateWise = false;
      this.ShowdistrictWise = false;
      this.Showstates = false;
      this.HomeUrl = '0';
      this.StateUrl = '0';

    }
    if (type == 'S') {
      this.ShowStateWiseData(this.StateId);
      this.ShowStateWise = true;
      this.ShowdistrictWise = false;
      this.StateUrl = '0';
    }
    if (type == 'D') {
      this.ShowStateWise = false;
      this.ShowdistrictWise = true;
      this.Showstates = true;
    }
  }
}
