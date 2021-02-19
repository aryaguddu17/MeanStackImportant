import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Md5 } from "md5-typescript";
import { Subject } from 'rxjs';
// import { timingSafeEqual } from 'crypto-js';
import {ExcelService} from '../../Services/excel.service';
import { MasterService } from '../../Services/master.service';

@Component({
  selector: 'app-companywisereport',
  templateUrl: './companywisereport.component.html',
 
})
export class CompanyWiseComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  dbResponse:any=[];
  jobDetails:any=[];
  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private excelService:ExcelService
    , private masterService: MasterService

    ) { }
  ngOnInit() {
   this.GetCompanyWiseJobsDetail();
  }
  Companywiselist:any='1';
  CompanyExelData:any=[];
GetCompanyWiseJobsDetail(){
  this.spinnerService.show();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    paging: true,
    searching: true,
    destroy: false,
    retrieve: true,
  };
  this.dtTrigger = new Subject<any>();
  this.JobpostService.GetCompanyWiseJobs().subscribe(res => {
    this.dbResponse   = res
    if(this.dbResponse.lstCompanyWorkLocation!=null){
      this.jobDetails =  this.dbResponse.lstCompanyWorkLocation;
      this.dtTrigger.next();
      this.spinnerService.hide();

    }
  })
}
 
ShowAllexcelExport(item:any)
{
  var data=[];
  this.CompanyExelData=item;
  this.CompanyExelData.forEach(function(item){
    var obj={
      'Company Name' : item.companyname,
      'Job Title':item.jobtitle,
      'State Name':item.statename,
      'District Name':item.districtname,
      'Total Vacancy':item.totalvacancy?item.totalvacancy:'0',
      'Active Vacancy':item.activevacancy?item.activevacancy:'0',
      'Close Vacancy':item.closevacancy?item.closevacancy:'0',
      'Scrap Vacancy':item.scrabvacancy?item.scrabvacancy:'0',
      'Revoked Vacancy':item.revokedvacancy?item.revokedvacancy:'0',
      'Expired Vacancy':item.expiredvacancy?item.expiredvacancy:'0',
      'Total Applied':item.applied?item.applied:'0',


    }
    data.push(obj);
  })
this.CompanyExelData=data; 
this.excelService.exportAsExcelFile(this.CompanyExelData, 'CompanywiseJobReports');
}
/////////////////////////////////// add new code ////////////////////////////////
setdata:any=[];
  appliedcandidatedetail:any='0';
  appliedcandidatedetail1:any=[];
  appliedcandidatedetail2:any=[];
  Exceldata:any=[];
  alldetail:any;
  excelexport:any=[];
  Appliedcandidatedetail(item:any){ //used to get the list of applied candidate using jobid
    var data=[];
    this.Companywiselist='0';
     var Companyname=item.companyname;
     var Statename=item.statename;
     var Districtname=item.districtname;
     var Jobtitle=item.jobtitle;
     var Totalvacancy=item.totalvacancy;
     var setdata1={'Companyname':Companyname,'Statename':Statename,'Districtname':Districtname,'Jobtitle':Jobtitle,'Totalvacancy':Totalvacancy}
     this.setdata=setdata1;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    this.dtTrigger = new Subject<any>();
    this.appliedcandidatedetail='1';
    this.alldetail='0';
    var UserID=0;
    var JobId=item.jobId;
    var openingid=item.openingId;
    var InterviewId=0;
    var SearchKey='';
    var PageNumber=0;
    var senddata={'userid':UserID,'jobid':JobId,'interviewid':InterviewId,'searchkey':SearchKey,'jobopeningid':openingid
    }
    this.spinnerService.show();
    this.masterService.Appliedcandidatedetail(senddata).subscribe(res => {
      this.appliedcandidatedetail1 = res
      if(this.appliedcandidatedetail1!=null){
        this.spinnerService.hide(); 
    this.appliedcandidatedetail2 =this.appliedcandidatedetail1;
    this.dtTrigger.next();
    this.Exceldata=this.appliedcandidatedetail2;
    this.Exceldata.forEach(function(item){
      var obj={
        'Candidate Name' : item.candname,
        'Email':item.email,
        'Mobile':item.mobile,
        'Gender':item.gender,
        'Age':item.age,
        'State':item.statename,
        'District':item.districtname,
        'Partner Name':item.partnername,
        'Scheme':item.trainingscheme,
        'Trade':item.traningtrade,

      }
      data.push(obj);
    })
    this.excelexport=data;    
      }
      else{
        this.appliedcandidatedetail1=[];
        this.spinnerService.hide();
      }
    });

  }
///////////////////  back ///////////////

singleback()
{
  this.Companywiselist='1';
  this.appliedcandidatedetail='0';
  this.GetCompanyWiseJobsDetail();

}
 
excelExport()
{
this.excelService.exportAsExcelFile(this.excelexport, 'AppliedCandidateList');
}
}
