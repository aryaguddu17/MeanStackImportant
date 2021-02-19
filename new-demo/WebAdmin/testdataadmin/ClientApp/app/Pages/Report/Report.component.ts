import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { Subject } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ExcelService } from '../../Services/excel.service';

@Component({
  selector: 'app-ReportComponent',
  templateUrl: './Report.component.html',
})
export class ReportComponent implements OnInit {
  DbResponse: any;
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
    this.getData();
  }
  // For Data Table Start
  dtTrigger = null;
  dtOptions: any = {};
  // For Data Table End
  alldata: any = [];
  filter: any = '';
  p: any = '';
  item: any;
  adminid: any;
  getdata: any = [];
  Pagenumber: any = 0;
  count: any = [];
  last: any = 0;
  totalAppliedCandidate: any = 0;
  Exceldata: any = [];
  paramsendtoservice: any;
  getData() {
    if (this.dtTrigger != null)
      this.dtTrigger.unsubscribe();
    this.totalAppliedCandidate = [];
    this.alldata = [];
    this.dtOptions = null;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true,
      jQueryUI: true,
      destroy: true,
      retrieve: false,
      processing: true,
      deferRender: true,
      stateSave: false,
      dom: '"<"H"lfr>t<"F"ip>',
      autoWidth: true,
      displayStart: 0,
      language: {
        emptyTable: "No data available",
        infoEmpty: "Total Record Found: 0",
        infoFiltered: "(searched in _MAX_ records)",
        loadingRecords: "Loading...",
        processing: "Processing...",
        search: "Search all columns:",
        zeroRecords: "No matching records found"
      },
    };

    var data = [];

    this.dtTrigger = new Subject<any>();
    this.item = localStorage.getItem('phpadminid');
    this.adminid = JSON.parse(this.item);
    this.getdata =
      {
        "adminId": this.adminid,
        //"Pagenumber": this.Pagenumber
      }

    let paramsend = JSON.stringify(this.getdata);
    this.paramsendtoservice = {
      'HSTPLRequest': {
        //  'clientKey':"",
        'data': paramsend,
        'typeFor': 'AdminGetRegistrationReport',
        //'lstImage': lstImage
      }
    }
    this.spinnerService.show();
    this.JobpostService.getAllReports(this.paramsendtoservice).subscribe(res => {
      this.alldata = res;
      if (this.alldata != null) {
        this.spinnerService.hide();
        this.alldata = JSON.parse(this.alldata.hstplResponse.data);
        this.totalAppliedCandidate = this.alldata[0].TOTRECDS;
        this.dtTrigger.next();
        // this.Exceldata=this.alldata
        this.alldata.forEach(function (item) {
          var obj = {
            'Name': item.FIRSTNAME,
            'Email': item.EMAIL,
            'Mobile No.': item.PHONENO,
            'User Name': item.USERNAME,
            'Login Type': item.LOGINTYPE,

            'Created Date': item.CREATEDDATE,
            'Is Active': item.ISACTIVE,
            'Company Name': item.COMPANYNAME,
            'Update Profile': item.UPDATEPROFILE,
            'Company Profile': item.COMPANYPRROFILE,
            'Created Job': item.CREATEDJOB,
            'Posted Job': item.JOBPOSTING
          }
          data.push(obj);
        });
        this.Exceldata = data;


      }
    });
  }

  SerialNumber: number = 1;
  pagination(paginationNumber: number, pageno: any) {
    this.Pagenumber = paginationNumber;
    if (this.Pagenumber == 0) {
      this.SerialNumber = 1;
    }
    else {
      this.SerialNumber = ((this.Pagenumber) * pageno) + 1;
    }
    this.getData();
  }
  pageChanged(event) { console.log("pageChanged") }

  excelExport() {

    for (var i = 0; i < this.Exceldata.length; i++) {
      delete this.Exceldata[i]['ID'];
      delete this.Exceldata[i]['TOTRECDS'];
      delete this.Exceldata[i]['LANDLINENO'];
      delete this.Exceldata[i]['FEEDBACK'];
      delete this.Exceldata[i]['FEEDBACKTYPE'];
      delete this.Exceldata[i]['fromDate'];
      delete this.Exceldata[i]['toDate'];
      delete this.Exceldata[i]['toDate'];
      delete this.Exceldata[i]['search'];
      delete this.Exceldata[i]['pageNumber'];
      delete this.Exceldata[i]['USERTYPE'];
      delete this.Exceldata[i]['CANDIDATE'];
      delete this.Exceldata[i]['CREATEDTIME'];
      delete this.Exceldata[i]['USERID'];
      delete this.Exceldata[i]['adminId'];
      delete this.Exceldata[i]['NAME'];
    }
    // console.log(this.Exceldata);
    this.excelService.exportAsExcelFile(this.Exceldata, 'ViewReport');
  }

} 