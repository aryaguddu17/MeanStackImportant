import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScreeningQuestionService } from '../../Services/screeningquestionadd.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import { MasterService } from '../../Services/master.service';
// import { stat } from 'fs';
@Component({
  selector: 'app-ScreeningQuestion',
  templateUrl: './ScreeningQuestion.component.html'
})
export class ScreeningQuestionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  // dtTrigger = new Subject<any>();

  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you sure you want to delete';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  modalRef: BsModalRef;
  EnablesGroupmodalRef: BsModalRef;

  FilterJob: FormGroup;
  questionForm: FormGroup;
  createGroupForm: FormGroup;
  HideCommon: any = 1;
  adminId: any;
  PageNumber: number = 0;
  viewfalse: any = '1';
  hrefurl: any = 0;

  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private ScreeningQuestionService: ScreeningQuestionService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private masterService: MasterService,
    private router: Router) {
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // if (pos >= (0.8 * max)) {
    if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
      if (this.delay) {
        return
      }
      this.delay = true;
      if (this.companyregisterdata.length >= 10 && this.viewfalse == '1') {
        this.pageNumber = this.pageNumber + 1;
        this.GetFilter(this.pageNumber, 'scroll', 'src');
      }
    }
  }
  ngOnInit() {

    localStorage.removeItem('compid');
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });
    this.adminId = JSON.parse(localStorage.getItem('phpadminid'));
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.hrefurl = 1;
    // this.showCreateQuestion=false;
    this.GetAllState();
    this.GetFilter(this.PageNumber, '', 'init');
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      isMandatory: ['', [Validators.nullValidator,]],
      isActive: [],
      expectedanswer: ['', [Validators.required]],
      preference: ['', [Validators.nullValidator]],
      User: ['', [Validators.nullValidator]],
      // Groupname: ['', [Validators.required]],
    });
    this.createGroupForm = this.fb.group({
      groupName: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      UserName: ['', [Validators.required]],

    })
  }


  // **********Function to get Comapny Details **Rajeev Jha -1174*****************
  pageNumber: any = 0;
  GetFilterSearch(pageNumber, isScrol: any, src) {
    this.showCreateQuestion = 0;
    this.pageNumber = 0;
    this.GetFilter(pageNumber, isScrol, src);
  }

  ShowPushData: any = {};
  Showpushdata: any = 0;
  from: any;
  item: any = [];
  logintype: any = '';
  StateiD: number = 0;
  DistrictID: any = '';
  JobKeyword: any = '';
  walkinpostedstatus: any = '';
  states: any = [];
  district1: any = [];
  senddatafilter: any = [];
  DbResponce: any = [];
  companyregisterdata: any = [];
  delay: any;
  companyregisterdata123: any = [];
  ShowGroupList: boolean = true;

  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox() {
    this.modalRef.hide();
  }
  Status: Boolean;
  ActiveInactiveGroup(id, status) {
    if (status == true) {
      this.Status = false;
    }
    else {
      this.Status = true;
    }

    var getsenddata = { 'adminid': this.adminId, 'groupId': id, 'companyid': this.CompanyId, 'isactive': this.Status }
    let getserializeddata = JSON.stringify(getsenddata);
    // var gethash = CryptoJS.HmacSHA256(getserializeddata, this.key);
    // var gethashInBase64 = CryptoJS.enc.Base64.stringify(gethash);
    let setdata = {
      'HSTPLRequest': {
        // 'clientKey': 'ROJGAAR_ANDROID',
        'data': getserializeddata,
        'typeFor': 'UpdateGroupStatus',
        // 'secrateKey': gethashInBase64
      }
    }
    this.spinnerService.show();
    this.ScreeningQuestionService.SetGroupStatus(setdata).subscribe(res => {
      this.DbResponce = res;
      this.spinnerService.hide();
      if (this.DbResponce.hstplResponse.status == true) {
        this.modalRef.hide();
        this.onClicked(this.CompanyId);
        this.toasterService.success("Group status is updated successfully.");
      }
    });
  }

  EditGroup(groupId) {
    // alert("Group Id = " + groupId);
  }

  GetFilter(pageNumber, isScrol: any, src) {
    // this.showCreateQuestion=false;
    localStorage.removeItem('this.companyregisterdata');
    if (src == 'search') {
      this.Showpushdata = '1';
    }
    this.from = isScrol;
    this.item = localStorage.getItem('phpadminid');
    if (this.FilterJob.value.logintype != '' && this.FilterJob.value.logintype != undefined && this.FilterJob.value.logintype != null) {
      this.logintype = this.FilterJob.value.logintype;
    } else {
      this.logintype = "";
    }
    if (this.FilterJob.value.StateiD != '' && this.FilterJob.value.StateiD != undefined && this.FilterJob.value.StateiD != null) {
      this.StateiD = parseInt(this.FilterJob.value.StateiD);
    } else {
      this.StateiD = 0;
    }
    if (this.FilterJob.value.DistrictID != '' && this.FilterJob.value.DistrictID != undefined && this.FilterJob.value.DistrictID != null) {
      this.DistrictID = parseInt(this.FilterJob.value.DistrictID);
    } else {
      this.DistrictID = 0;
    }
    if (this.FilterJob.value.JobKeyword != '' && this.FilterJob.value.JobKeyword != undefined && this.FilterJob.value.JobKeyword != null) {
      this.JobKeyword = this.FilterJob.value.JobKeyword;
    } else {
      this.JobKeyword = "";
    }

    let statedid;
    let districtid;
    statedid = this.FilterJob.value.StateiD;
    districtid = this.FilterJob.value.DistrictID;
    let statename = (this.states).filter(function (entry) {
      return entry.ID == statedid;
    });
    let districtname = (this.district1).filter(function (entry) {
      return entry.ID == districtid;
    });
    this.adminId = parseInt(JSON.parse(localStorage.getItem('phpadminid')));
    this.senddatafilter = {
      'Adminid': this.adminId,
      'PageNumber': pageNumber,
      'logintype': this.logintype,
      'StateiD': this.StateiD,
      'DistrictID': this.DistrictID,
      'Searchkey': this.JobKeyword,
    };
    if (this.from == 'scroll') {
      this.spinnerService.show();
      this.ScreeningQuestionService.GetFilterCompanyDataforAppReceived(this.senddatafilter).subscribe(res => {
        this.DbResponce = res;
        if (this.DbResponce != null) {
          this.spinnerService.hide();
          this.companyregisterdata = this.companyregisterdata.concat(this.DbResponce.lstCompanyProfile);
          this.from = 'scroll';
        } else {
          this.companyregisterdata = [];
          this.from = '';
          this.spinnerService.hide();
        }
        this.delay = false;
      });
    }
    else {
      this.spinnerService.show();
      this.ScreeningQuestionService.GetFilterCompanyDataforAppReceived(this.senddatafilter).subscribe(res => {
        this.companyregisterdata = res;
        this.companyregisterdata123 = this.companyregisterdata.lstCompanyProfile;
        if (this.companyregisterdata123.length > 0) {
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


  GetAllState() {
    this.spinnerService.show();
    this.ScreeningQuestionService.GetAllStates().subscribe(res => {
      this.states = res
      if (this.states != null) {
        this.spinnerService.hide();
        this.states = this.states.Data;
      }
      else {
        this.states = [];
        this.spinnerService.hide();
      }
    });
  }

  GetAllDistrictforfilter(event: any) {
    if (event == undefined || event == "") {
      this.district1 = [];
      this.FilterJob.controls['DistrictID'].setValue('');
      return false;
    }
    if (event != '' || event != null) {
      this.FilterJob.controls['DistrictID'].setValue('');
    }
    this.spinnerService.show();
    this.ScreeningQuestionService.GetAllDistrict(event).subscribe(res => {
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


  // companyId: any;

  reset1() {
    // this.companyId = [];
    this.PageNumber = 0;
    this.FilterJob = this.formBuilder.group({
      'logintype': ['', Validators.required],
      'JobKeyword': ['', Validators.required],
      'StateiD': ['', Validators.required],
      'DistrictID': ['', Validators.required],
    });
    this.district1 = [];
    this.GetFilter(this.PageNumber, '', 'init');
  }

  questionlist: any = 0;
  addgroup: any = 0;
  CompanyId: any;
  showCreateQuestion: any = 0;
  showQuestionTable: boolean = false;
  BackButtonCompanyList: boolean = false;
  onClicked(companyid: string) {
    this.BackButtonCompanyList = true;
    this.BackButtonGroupList = false;
    this.HideCommon = 0;
    this.questionlist = 1;
    this.CompanyId = companyid;
    this.showCreateQuestion = 1;
    this.showQuestionTable = false;
    this.ShowGroupList = true;
    this.getGroupList(this.CompanyId);
  }

  gotocompanylist() {
    this.BackButtonCompanyList = false;
    this.BackButtonGroupList = false;
    this.HideCommon = 1;
    this.hrefurl = 1;
    this.viewfalse = '1';
    this.questionlist = 0;
    this.groupList = [];
    this.showCreateQuestion = 0;
    this.SaveGroupCount = 1;
  }

  // ***Used to show add group and add question button(Rajeev Jha-1174)***//

  showCreateQuestionbutton: any = 0;
  openCreateQuestionSection(groupId: any) {
    this.showCreateQuestionbutton = 1;
    this.addgroup = 1;
    this.SaveGroupCount = 1;
    this.showCreateQuestion = false;
    this.ShownewGroupList = false;
    this.groupInputShow = false;
    //this.showQuestionTable=false;
    //this.showCreateQuestion=true;
    //this.questionGroupList=[];
    //this.questionList=[];
    // this.createGroupForm.controls['groupName'].setValue("");
  }

  gotoquestionlist() {
    this.showCreateQuestion = true;
    this.addgroup = 0;
    this.showCreateQuestionbutton = 0;
    //this.showQuestionTable = false;
    this.showPrefrence = false;

  }

  ////////////////// get Group List ///////////////////
  groupListResponse: any;
  userid: any = '';

  getGroupList(CompanyId: any) {
    this.viewfalse = 0;
    this.getUser();
    var CompanyId = this.CompanyId
    this.spinnerService.show();
    this.ScreeningQuestionService.getGroupList(CompanyId).subscribe(res => {
      this.spinnerService.hide();
      if (res) {
        this.groupListResponse = res;
        if (this.groupListResponse.length > 0) {
          this.groupList = res;
          //this.userid = this.groupList[0].createdby;
        }
      }
    })
  }


  allusers: any = [];
  getUser() {
    let companyId = this.CompanyId;
    this.masterService.GetAllUser(companyId).subscribe(res => {
      let userresponse = res;
      this.allusers = userresponse['lstAdminVerifiedUser'];
    });
  }

  /////////////////// get question list based on group id gelect from group list /////////////////
  groupList: any;
  groupId: any;
  groupName: any;
  groupname: any;
  BackButtonGroupList: boolean = false;
  getQuestionListByGroup(event: any, groupname, userid: any) {
    // var userid = this.userid;
    this.userid = userid;
    var userid = userid;
    this.BackButtonGroupList = true;
    this.BackButtonCompanyList = false;
    this.getUser();
    this.groupname = groupname;
    // if (event.target.value == "" && event.target.value == '') {
    //   this.questionGroupList = [];
    //   this.showQuestionTable = false;
    //   return false
    // }

    // let groupId = event.target.value;
    let groupId = event;
    var adminid = this.adminId;
    let groupName = this.groupList.filter(function (entry) {
      return entry.groupid == groupId;
    });
    this.groupId = groupId;
    this.groupName = groupName[0]['groupname'];
    this.getscreeningQuestion();
  }

  /////////////////// get question list based on group id and display in data table /////////////////
  questionGroupList: any = [];
  ScreenDataRespose: any = [];
  getscreeningQuestion() {
    this.questionGroupList = [];
    var senddata = {
      "groupId": this.groupId,
      "adminId": this.adminId,
      "userId": this.userid
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      paging: true,
      searching: true,
      destroy: false,
      retrieve: true,
    };
    // this.dtTrigger = new Subject<any>();
    this.spinnerService.show();
    this.ScreeningQuestionService.getscreeningQuestion(this.groupId, this.adminId, this.userid).subscribe(res => {
      this.ScreenDataRespose = res;
      this.questionGroupList = [];
      if (this.ScreenDataRespose != null) {
        this.spinnerService.hide();
        this.showQuestionTable = true;
        this.ShowGroupList = false;
        this.questionGroupList = this.ScreenDataRespose.lstadminGetquestiongroup;
        // this.dtTrigger.next();                 
      }
      else {
        this.ScreenDataRespose = [];
        this.spinnerService.hide();
      }
    })

  }


  // open Question create modal click in add button
  mode: any;

  openQuestionCreateMOdal(template: TemplateRef<any>, mode) {
    this.Getallpreference();
    // this.dtTrigger.unsubscribe();
    //  this.isActive=false;
    // this.isMandatory=false;
    this.mode = mode;
    if (this.mode == 'Add') {
      this.showPrefrence = false;
    }
    this.getUser();

    this.questionForm.reset();
    this.questionForm.controls['User'].setValue('');
    // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalRef = this.modalService.show(template,
      { backdrop: 'static', keyboard: false });

  }
  // open modal for edit question 
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
  close() {
    this.modalRef.hide();
  }

  questionId: any;
  isEnable: boolean = true;
  questionList: any = [];
  questionListShow: any = [];
  result: any;

  submitCreateUpdateQuestion() {
    this.questionForm.value.expectedanswer
    if (!this.questionForm.value.expectedanswer) {
      this.toasterService.error('Please select expected answer. ');
      return false
    }

    if (!this.questionForm.value.question) {
      this.toasterService.error('Please enter question ');
      return false
    }
    if ((this.questionForm.value.isMandatory != null && this.questionForm.value.isMandatory != false) && (this.questionForm.value.expectedanswer == null || this.questionForm.value.expectedanswer == 0 || this.questionForm.value.expectedanswer == "")) {
      this.toasterService.error("Please select expected answer");
      return false;
    }

    if ((this.questionForm.value.isMandatory != null && this.questionForm.value.isMandatory != false) && (this.questionForm.value.preference == null || this.questionForm.value.preference == 0)) {
      this.toasterService.error("Please select question preference");
      return false;
    }

    // if(this.questionForm.value.isMandatory==null && this.questionForm.value.preference!=null ){
    //   this.toasterService.error("please checked Non-Negotiable");
    //   return false;
    // }
    if (this.mode == 'Add') {
      this.questionId = 0;
    } else {
      this.isEnable = this.questionForm.value.isActive;
    }
    this.questionList = [];
    this.questionListShow = [];

    if (this.questionForm.value.preference != null && this.questionForm.value.preference != undefined && this.questionForm.value.preference != '') {
      var Preference = parseInt(this.questionForm.value.preference);
      // this.toasterService.error('add preference')
    }
    else {
      Preference = 0;
    }

    this.questionList.push({
      // "adminId": this.adminId,
      "userId": parseInt(this.userid),
      "questionlist": this.questionForm.value.question,
      "isActive": this.isEnable,
      "Mandatory": this.questionForm.value.isMandatory ? this.questionForm.value.isMandatory : false,

      "Expectanswer": this.questionForm.value.expectedanswer ? this.questionForm.value.expectedanswer : "",
      "preference": Preference,

      "groupquestionid": this.questionId ? this.questionId : 0
    });
    this.questionForm.reset();
    let postData = {
      "adminId": this.adminId,
      "createdBytype": " ",
      "Groupname": this.groupName,
      "Groupid": this.groupId,
      "questionlist": this.questionList,
      "Companyid": this.CompanyId,
    }
    this.modalRef.hide();
    this.spinnerService.show();
    this.ScreeningQuestionService.setScreeningQuestion(postData).subscribe(res => {
      this.spinnerService.hide();
      this.result = res;
      if (this.mode == 'Add') {
        this.toasterService.success('New Question added successfully');
      } else {
        this.toasterService.success('Question updated successfully');
      }

      if (this.result.responseResult) {
        this.getscreeningQuestion();
      }

    })
  }

  groupInputShow: boolean = false;
  ShownewGroupList: boolean = false;

  openGroupform() {
    this.groupInputShow = true;
    this.ShownewGroupList = false;
    this.createGroupForm.reset();
    this.createGroupForm.controls['UserName'].setValue("");
  }

  // cancle create group form

  canclecreateGroupForm() {
    this.groupInputShow = false;
    this.createGroupForm.reset();
  }


  groupResponse: any;
  SaveGroupCount: any = 1;
  submitNewGroup() {
    var companyId = this.CompanyId;
    if (this.SaveGroupCount == 1) {
      if (!this.createGroupForm.value.groupName) {
        this.toasterService.error('Please enter group name');
        return false
      }
      let postData = {
        "Groupname": this.createGroupForm.value.groupName,
        "Companyid": companyId,
        "userId": this.createGroupForm.value.UserName
      }
      this.spinnerService.show();
      this.ScreeningQuestionService.saveGroup(postData).subscribe(res => {
        this.spinnerService.hide();
        this.groupResponse = res;
        if (this.groupResponse.responseResult) {
          this.toasterService.success('Group added successfully');
          this.groupInputShow = false;
          this.showCreateQuestion = true;
          // this.getGroupList(this.CompanyId);
          this.addgroup = 0;
          this.showCreateQuestionbutton = 0;
          this.onClicked(this.CompanyId);
        }
      })
    }
    this.SaveGroupCount++;
  }

  // show group List

  //ShownewGroupList:boolean=false;
  showQuestionAddForm: boolean = false;

  showGroupList() {
    this.Getallpreference();
    this.getUser();
    this.ShownewGroupList = true;
    this.groupInputShow = false;
    this.questionForm.reset();
    this.questionList = [];
    this.questionListShow = [];
    this.showQuestionAddForm = false;
    //this.questionForm.controls['Groupname'].setValue("");
  }
  CreatedBy: any;
  showQuestionForm(event: any) {
    if (event.target.value != '') {
      this.questionForm.controls['User'].setValue('');
      this.questionList = [];
      this.questionListShow = [];
      let groupId = event.target.value;
      let groupName = this.groupList.filter(function (entry) {
        return entry.groupid == groupId;
      });
      this.CreatedBy = groupName[0]['createdby'];
      this.groupId = groupId;
      this.groupName = groupName[0]['groupname'];
      this.showQuestionAddForm = true;

    } else {
      this.groupId = '';
      this.groupName = '';
      this.toasterService.error('Please select group');
      return false;

    }

    // if (!this.questionForm.value.Groupname) {
    //   this.questionForm.controls['Groupname'].setValue('');
    //   this.toasterService.error('Please select group');
    //   return false;
    // }  

  }

  UserName: any;
  addNewQuestion() {
    this.showPrefrence = false;
    if (!this.groupName) {
      this.toasterService.error('Please select group');
      return false;
    }
    if (!this.questionForm.value.question) {
      this.toasterService.error('Please enter question');
      if (this.questionForm.value.isMandatory != null && this.questionForm.value.isMandatory != false) {
        this.showPrefrence = true;
      }
      return false;
    }

    if ((this.questionForm.value.isMandatory != null && this.questionForm.value.isMandatory != false) && (this.questionForm.value.expectedanswer == null || this.questionForm.value.expectedanswer == 0)) {
      this.toasterService.error("Please add expected answer");
      this.showPrefrence = true;
      return false;
    }

    if ((this.questionForm.value.isMandatory != null && this.questionForm.value.isMandatory != false) && (this.questionForm.value.preference == null || this.questionForm.value.preference == 0)) {
      this.toasterService.error("Please add question preference");
      this.showPrefrence = true;
      return false;
    }
    if (this.questionForm.value.preference != null && this.questionForm.value.preference != undefined && this.questionForm.value.preference != '') {
      var Preference = parseInt(this.questionForm.value.preference);
    }
    else {
      Preference = 0;
    }

    // let UserId = this.questionForm.value.User;
    let UserId = this.CreatedBy
    let UserName = this.allusers.filter(function (entry) {
      return entry.userId == UserId;
    });
    this.questionListShow.push({
      "USERNAME": UserName[0].userName,
      "questionlist": this.questionForm.value.question,
      "isActive": true,
      "Mandatory": this.questionForm.value.isMandatory ? this.questionForm.value.isMandatory : false,
      "Expectanswer": this.questionForm.value.expectedanswer ? this.questionForm.value.expectedanswer : "",
      "preference": Preference,
      "groupquestionid": 0
    });
    this.questionList.push({

      "Adminid": this.adminId,
      "Userid": parseInt(UserId),
      // "Userid": parseInt(this.questionForm.value.User),
      // "USERNAME": this.UserName,
      "questionlist": this.questionForm.value.question,
      "isActive": true,
      "Mandatory": this.questionForm.value.isMandatory ? this.questionForm.value.isMandatory : false,
      "Expectanswer": this.questionForm.value.expectedanswer ? this.questionForm.value.expectedanswer : "",
      "preference": Preference,
      "groupquestionid": 0
    });
     this.questionForm.reset();
    // this.questionForm.controls['question'].setValue('');
    // this.questionForm.controls['expectedanswer'].setValue('');
    // this.questionForm.controls['preference'].setValue('');
    // this.questionForm.controls['isMandatory'].setValue('');
    // this.questionForm.controls['preference'].setValue('');
    this.questionForm.controls['User'].setValue('');
    if (this.questionForm.controls.expectedanswer.value == null) {
      this.questionForm.controls['expectedanswer'].setValue("");
    }
    if (this.questionForm.controls.preference.value == null) {
      this.questionForm.controls['preference'].setValue("");
    }
  }


  submitGroupQuestion() {
    if (!this.questionList.length) {
      this.toasterService.error('Plaease add atleast one question');
      return false
    }
    var companyId = this.CompanyId;
    let postData = {
      "Adminid": this.adminId,
      "createdBytype": null,
      "Companyid": companyId,
      "Groupname": this.groupName,
      "Groupid": this.groupId,
      "questionlist": this.questionList,
      "groupquestionid": 0
    }
    this.questionList = [];
    this.questionListShow = [];
    this.spinnerService.show();

    this.ScreeningQuestionService.setScreeningQuestion(postData).subscribe(res => {
      this.spinnerService.hide();
      this.result = res;
      if (this.result.responseResult) {
        this.createGroupForm.controls['groupName'].setValue("");
        this.toasterService.success(this.result.message);

        // this.showCreateQuestion = false;
        // this.ShownewGroupList = false;
        // this.showQuestionAddForm = false;
        // this.showCreateQuestion = 0;
        // this.showQuestionTable=true;
        // this.addgroup = 0;
        // this.showCreateQuestionbutton = 0;


        this.showCreateQuestionbutton = 0;
        this.addgroup = 0;
        this.showCreateQuestion = true;
        this.ShownewGroupList = true;
        this.groupInputShow = true;



        this.getscreeningQuestion();
      }
    })
  }

  // open edit question pop up

  isMandatory: boolean = false;
  editQuestion(template: TemplateRef<any>, item: any, mode, EnablesInCreatedGroup: TemplateRef<any>) {

    this.Getallpreference();
    if (item.isactive) {
      // this.modalRef = this.modalService.show(template, { class: 'modal-md' });
      this.modalRef = this.modalService.show(template,
        { backdrop: 'static', keyboard: false });
      this.groupId = item.groupid;
      this.questionId = item.groupquestionid;
      this.mode = mode;

      if (this.mode == 'edit' && item.mandotary != false) {
        this.showPrefrence = true;
      }
      else {
        this.showPrefrence = false;
      }
      //this.capitalize(this.mode);

      let UserId = item.createdby;
      let UserName = this.allusers.filter(function (entry) {
        return entry.userId == UserId;
      });

      this.questionForm.controls['User'].setValue(UserName[0]['userId']);
      this.questionForm.controls['question'].setValue(item.questions);
      this.questionForm.controls['isActive'].setValue(item.isactive);
      this.questionForm.controls['isMandatory'].setValue(item.mandotary);
      this.questionForm.controls['expectedanswer'].setValue(item.answer);

      this.questionForm.controls['preference'].setValue(item.preference);
      if (item.mandotary) {
        this.isMandatory = true
      } else {
        this.isMandatory = false
      }

    }
    else {
      this.EnablesGroupmodalRef = this.modalService.show(EnablesInCreatedGroup, { class: 'modal-md' });
    }

  }


  // enable disable question

  activeDeactivQuestion(item: any, value) {
    var item = this.newItem;
    var Adminid = this.adminId;
    // var groupid=groupid;
    // var groupquestionid=groupquestionid;
    let postData = {

      "Groupid": item.groupid,
      "groupquestionid": item.groupquestionid,
      // "Groupid": groupid,
      // "groupquestionid": groupquestionid,
      "IsActive": value
    }

    this.ScreeningQuestionService.activeDeactiveQuestion(Adminid, postData).subscribe(res => {
      if (res) {
        this.modalRef.hide();
        if (value) {

          this.toasterService.success('Question is Enabled successfully');
          this.modalRef.hide();
        } else {
          this.toasterService.success('Question is Disabled successfully');
        }
        this.getscreeningQuestion();
      }
    })
  }

  deleteQuestion(index: number) {
    this.modalRef.hide();
    this.questionList.splice(index, 1);
    this.questionListShow.splice(index, 1);
  }

  closeenables() {
    this.EnablesGroupmodalRef.hide();
  }


  // open confirm dialog for delete question

  delete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBoxSecor() {
    this.modalRef.hide();
  }

  newItemdisable: any;
  isactivetemplate(template: TemplateRef<any>, item) {
    this.newItem = item;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineisactivetemplate() {
    this.modalRef.hide();
  }

  newItem: any;
  enablequestionpopup(template: TemplateRef<any>, item) {
    this.newItem = item;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }


  preference: any = [];
  preferenceres: any = [];
  Getallpreference() {
    this.spinnerService.show();
    this.ScreeningQuestionService.Getallpreference().subscribe(res => {
      this.preference = res
      if (this.questionForm.controls.expectedanswer.value == null) {
        this.questionForm.controls['expectedanswer'].setValue("");
      }
      if (this.questionForm.controls.preference.value == null) {
        this.questionForm.controls['preference'].setValue("");
      }

      if (this.preference != null) {
        this.spinnerService.hide();
        this.preferenceres = this.preference.lstPreference;
      }
      else {
        this.preference = [];
        this.spinnerService.hide();
      }
    });
  }

  // check if non negotiable
  showPrefrence: boolean = false;
  peferenceSelect: any;
  isNonNegotiable(e) {
    if (e.target.checked) {
      this.preference = ''
      this.showPrefrence = true;
    } else {
      this.peferenceSelect = ''
      this.questionForm.controls['preference'].setValue('');
      this.showPrefrence = false;
    }
  }

}