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
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-AgentReport',
  templateUrl: './AgentReport.component.html',
 
})
export class AgentReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  dbResponse:any=[];
  jobDetails:any=[];
  key: any = 'iamskillindiafriendlyemp';

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
   this.GetAgentWiseDetail();
  }
  Companywiselist:any='1';
  CompanyExelData:any=[];
GetAgentWiseDetail(){
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
  this.JobpostService.GetAgentWiseReports().subscribe(res => {
    this.dbResponse   = res
    if(this.dbResponse.hstplResponse!=null){
      this.jobDetails = JSON.parse(this.dbResponse.hstplResponse.data);
      this.dtTrigger.next();
      this.spinnerService.hide();
      
    }
  })
}
 
ShowAllexcelExport(item:any)
{
 // alert(JSON.stringify(item));
  var data=[];
  this.CompanyExelData=item;
  this.CompanyExelData.forEach(function(item,index){
    var obj={ 
      'S.No':index+1,
      'Agent Name' : item.agentName,
      'Email':item.Email,
      'Mobile No.':item.MobileNo,
      'State Name':item.StateName,
      'District Name':item.DistrictName?item.DistrictName:'',
      'Total Employer':item.TotalEmployer?item.TotalEmployer:'0',
      'Total Approved User':item.TotalApprovedUser?item.TotalApprovedUser:'0',
      'Total Pending User':item.TOTALPENDINGUser?item.TOTALPENDINGUser:'0',
      'Total Rejected User':item.TotalRejectedUser?item.TotalRejectedUser:'0',
      'Total Jobs':item.TotalJobs?item.TotalJobs:'0',

    }
  
    data.push(obj);
  })
this.CompanyExelData=data; 
this.excelService.exportAsExcelFile(this.CompanyExelData, 'AgentWiseReports');
}
/////////////////////////////////// add new code ////////////////////////////////
setdata:any=[];
  appliedcandidatedetail:any='0';
  appliedcandidatedetail1:any=[];
  appliedcandidatedetail2:any=[];
  Exceldata:any=[];
  alldetail:any;
  excelexport:any=[];
  Appliedcandidatedetail(item:any,Status:any){ //used to get the list of applied candidate using jobid
    var data=[];
    this.setdata=item;
    this.Companywiselist='0';
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    
    var getsenddatabyid = {  "AgentId":item.ID,
    "Status":Status }
    let getserializeddatabyid = JSON.stringify(getsenddatabyid);
    var gethashbyid = CryptoJS.HmacSHA256(getserializeddatabyid, this.key);
    var gethashInBase64byid = CryptoJS.enc.Base64.stringify(gethashbyid);

    
    let getdata = {
      'HSTPLRequest': {
        'clientKey': 'ROJGAAR_ANDROID',
        'data':getserializeddatabyid ,
        'typeFor': 'EmployerReport',
        'secrateKey': gethashInBase64byid
      }
    }
    this.dtTrigger = new Subject<any>();
    this.appliedcandidatedetail='1';
    this.alldetail='0';
    this.spinnerService.show();
    this.JobpostService.GetEmployerWiseReports(getdata).subscribe(res => {
      this.appliedcandidatedetail1 = res
    if(this.appliedcandidatedetail1.hstplResponse!=null){
    this.spinnerService.hide(); 
    this.appliedcandidatedetail2 =JSON.parse(this.appliedcandidatedetail1.hstplResponse.data);
    this.dtTrigger.next();
    this.Exceldata=this.appliedcandidatedetail2;
    this.Exceldata.forEach(function(item,index){
      var obj={
      "S.No.":index+1,
      "Owner Name":item.ownername?item.ownername:'NA',
      "Establishment Name":item.establishmentname?item.establishmentname:'NA',
      "Mobile No.":item.mobileno?item.mobileno:'NA',
      "Email":item.email?item.email:'NA',
      "Businessnature":item.businessnature?item.businessnature:'NA',
      "Address":item.address?item.address:'NA',
      "Nearby":item.nearby?item.nearby:'NA',
      "State Name":item.statename?item.statename:'NA',
      "District Name":item.districtname?item.districtname:'NA',
      "Total Jobs":item.totaljobs?item.totaljobs:'NA'

      }
      data.push(obj);
    })
   this.excelexport=data;    
      }
      else{
        this.appliedcandidatedetail1=[];
        this.appliedcandidatedetail2=[];
        this.spinnerService.hide();
      }
    });

  }
///////////////////  back ///////////////

singleback()
{
  this.Companywiselist='1';
  this.appliedcandidatedetail='0';
  this.GetAgentWiseDetail();

}
 
excelExport()
{
this.excelService.exportAsExcelFile(this.excelexport, 'EmployerList');
}
}
