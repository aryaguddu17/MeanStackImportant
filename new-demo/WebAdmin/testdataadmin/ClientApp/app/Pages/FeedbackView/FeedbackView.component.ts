import { Component, OnInit, HostListener } from '@angular/core';
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
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'app-FeedbackViewComponent',
  templateUrl: './FeedbackView.component.html',
})
export class FeedbackViewComponent implements OnInit {
  FilterFeedbackview: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) { }
  filtershow: any = '1';
  viewfalse: any = '1';
  result: any = '1';
  from: any;
  pageNumber: number = 0;
  copydata: any = '';
  delay: boolean = false;
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
        if (this.allfeedbackdatashow.length >= 10 && this.viewfalse == '1') {
          this.pageNumber = this.pageNumber + 1;
         // alert(this.pageNumber);
          this.allfeedbackdata(this.pageNumber, 'scroll', this.copydata);
        }
      }
    }
  }
  ngOnInit() {
    this.FilterFeedbackview = this.formBuilder.group({
      'JobKeyword': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'fromdate': ['', [Validators.required]],
      'todate': ['', [Validators.required]],
    });
     $('.page-filters h2 a').click(function () {
       $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
       $(this).parent().parent().find('.filter-wrapper').slideToggle();
     });
     $('.filter-toggle').click(function () {
       $('.filter-wrapper').slideToggle();
     });
    this.allfeedbackdata(this.pageNumber, this.from, this.FilterFeedbackview);
  }
  DbResponse: any = [];
  allfeedbackdatashow: any = [];
  fromsenddate1 = '';
  tosenddate1 = '';
  sendsearchkey1 = '';
  search: any = ''
  getdatabytestimonialid:any;
  allfeedbackdatashowres:any=[];
  // ***********Rajeev Jha*****************
  allfeedbackdata(pageNumber: any, from: any, data) {
    this.result = 0;
    this.copydata = data;
    if (data.JobKeyword != undefined) {
      this.search = data.JobKeyword;
    } else {
      this.search = '';
    }
    var date = (data.fromdate);
    if (date != undefined) {
      var t = date.toString().slice(3, 15).trim();
      var t1 = t.split(" ");
      var fromsenddate = t1[2] + "-" + t1[0] + "-" + t1[1];
    } else {
      var fromsenddate = ''
    }
    var todate = data.todate;
    if (todate != undefined) {
      var todate1 = todate.toString().slice(3, 15).trim();
      var todate2 = todate1.split(" ");
      var tosenddate = todate2[2] + "-" + todate2[0] + "-" + todate2[1];
    } else {
      var tosenddate = '';
    }
    if (pageNumber == 0) {
      this.pageNumber = 0;
    } else {
      this.pageNumber = pageNumber;
    }
    var Admin_id1 = localStorage.getItem('phpadminid');
    var Admin_id = JSON.parse(Admin_id1);
    if (fromsenddate != '') {
      this.fromsenddate1 = fromsenddate;
    } else {
      this.fromsenddate1 = '';
    }
    if (tosenddate != '') {
      this.tosenddate1 = tosenddate;
    } else {
      this.tosenddate1 = '';
    }
    if (this.search != '') {
      this.sendsearchkey1 = this.search;
    } else {
      this.sendsearchkey1 = '';
    }
    var senddata = { 'search': this.sendsearchkey1, 'fromDate': this.fromsenddate1, 'toDate': this.tosenddate1, 'pageNumber': this.pageNumber }

    let getserializeddatabyid = JSON.stringify(senddata);

    this.getdatabytestimonialid = {
      'HSTPLRequest': {
         'clientKey':"",
         'data': getserializeddatabyid,
         'typeFor': 'AdminGetFeedBkFiltr',
      }
    }

    this.from = from;
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.JobpostService.allfeedbackdata(this.getdatabytestimonialid).subscribe(res => {
        this.DbResponse = res;
        if (this.DbResponse != null) {
          this.spinnerService.hide();
          this.allfeedbackdatashowres = JSON.parse(this.allfeedbackdatashowres.concat(this.DbResponse.hstplResponse.data));
          this.from = 'scroll';
        } else {
          this.allfeedbackdatashow = [];
          this.spinnerService.hide();
          this.from = '';
        }
        this.delay = false;
      });
    } else {
      this.spinnerService.show();
      this.JobpostService.allfeedbackdata(this.getdatabytestimonialid).subscribe(res => {
        this.allfeedbackdatashow = res;
        if (this.allfeedbackdatashow!=null) {
          this.spinnerService.hide();
          this.allfeedbackdatashowres = JSON.parse(this.allfeedbackdatashow.hstplResponse.data);
        } else {
          this.allfeedbackdatashowres = [];
          this.toastrService.error('No Record Found');
          this.spinnerService.hide();
        }
        this.delay = false;
        this.from = '';
      });
    }
    this.from = '';
  }
  allfeedbackviewdatashow: any = [];
  id: any;
  getdatabyfeebbackid:any;
  viewfeedbackdata(id: any) {
    this.filtershow = 0;
    this.id = id;
    
    var senddata = { "ID": id ,"pageNumber":0}

     let getserializeddatabyid = JSON.stringify(senddata);

    this.getdatabyfeebbackid = {
      'HSTPLRequest': {
         'clientKey':"",
         'data': getserializeddatabyid,
         'typeFor': 'AdminGetFeedback',
      }
    }
    this.spinnerService.show();
    this.JobpostService.viewfeedbackdata(this.getdatabyfeebbackid).subscribe(res => {
      this.allfeedbackviewdatashow = res;
      this.viewfalse = '0';
      if (this.allfeedbackviewdatashow != null) {
        this.spinnerService.hide();
        this.allfeedbackviewdatashow = JSON.parse(this.allfeedbackviewdatashow.hstplResponse.data);
      } else {
        this.allfeedbackviewdatashow = [];
        this.spinnerService.hide();
      }
    });
    this.show1 = 0;
    this.hide1 = 0;
  }

  resetcall() {
    this.id = 0;
    this.allfeedbackdata(this.pageNumber, this.from, this.FilterFeedbackview);
  }
  show1: any = '1';
  hide1: any = '1';
  previous() {
    this.filtershow = 1;
    this.show1 = 1;
    this.hide1 = 1;
    this.viewfalse = '1';
  }

  ShowPushData: any;
  allfilterdatashow: any = [];
  minDate: any;
  maxDate: any;
  MinDate(mndate: any): void {
    if (mndate != null) {
      this.minDate = mndate;
    }
  }
  MaxDate(mxdate: any) {
    if (mxdate != null) {
      this.maxDate = mxdate;
    }
  }
} 