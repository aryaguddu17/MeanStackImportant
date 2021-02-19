
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class JobpostService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) {
  }

  Getallcompanyregisterdata(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/Getallcompanyregisterdata', senddata, httpOptions);
  }
  ApproveCompany(senddata: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/ApproveCompany', senddata, httpOptions);
  }

  DisapproveCompany(senddata: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/DisapproveCompany', senddata, httpOptions);
  }

  AddJobId(jobdetail: any) {
    var as = jobdetail.username;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/loginEmployee', jobdetail, httpOptions);
  }

  sendOtp(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/sendOtp', senddata, httpOptions);
  }
  // ************(.NET API CALL)********************
  // sendSms(mob:any,message:any){
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
  //   return this.httpClient.get(environment.smsUrl + 'mobile='+mob+'&'+'message='+message, httpOptions);
  // }

  // ************(PHP API CALL)*****************
  sendSms(sendata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/sendSms', sendata, httpOptions);
  }
  //  ***********For live*************
  otpVerify(otpnumber: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/verifyOtp', otpnumber, httpOptions);
  }

  validateotp(otpnumber: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/validateotp', otpnumber, httpOptions);
  }

  resendOtp(resendOtp: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'AngularApi/resendOtp', resendOtp, httpOptions);
  }

  RevokeJob(Jobid: any, UserId: any, AdminId: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/AdminRevokeJob/' + Jobid + '/' + UserId + '/' + AdminId, httpOptions);
  }


  //  GetAllJobs(PushData:any={}) {
  //   // var token=localStorage.getItem('user_token');
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.post(environment.rojgaarUrl+ 'Job/AdminGetAllJobs/',PushData,httpOptions);
  // }

  GetAllJobs(PushData: any = {}) {
    // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetJobList/', PushData, httpOptions);
  }

  PublishJob(JobId: any, userid: any, adminid: any) {
    // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/AdminPublishJob/' + JobId + '/' + userid + '/' + adminid, httpOptions);
  }

  CloseJob(adminid: any, Jobid: any, userid: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/AdminClosedJob/' + adminid + '/' + Jobid + '/' + userid, httpOptions);
  }

  // Registration(senddata:any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
  //   return this.httpClient.post(environment.apiUrl + 'RegisApi/Registration',senddata, httpOptions);
  // }

  Registration(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminSaveUserDetails', senddata, httpOptions);
  }


  // ******************User Management Module Services(Rajeev Jha on 6:2:19)*********
  // UserRegistration(senddata: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'UserManagement/UserRegistration', senddata, httpOptions);
  // }
  // UserRegistration(senddata: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.rojgaarUrl + 'User/AdminUserManagement', senddata, httpOptions);
  // }

  Updateuser(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'UserManagement/Updateuser', senddata, httpOptions);
  }


  Usernamecheck(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'UserManagement/Usernamecheck', senddata, httpOptions);
  }

  Mobilecheck(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'UserManagement/Mobilecheck', senddata, httpOptions);
  }
  Emailcheck(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'UserManagement/Emailcheck', senddata, httpOptions);
  }


  AllUserRegistrationDetails(senddata: any) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'UserManagement/AllUserRegistrationDetails', senddata, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', senddata, httpOptions);
  }

  SingleUserRegistrationDetails(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'UserManagement/SingleUserRegistrationDetails', senddata, httpOptions);
  }

  SingleUseredit(senddata: any) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'UserManagement/SingleUseredit', senddata, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', senddata, httpOptions);
  }

  Deletesingleuser(senddata: any) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'UserManagement/Deletesingleuser', senddata, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/SetData', senddata, httpOptions);
  }


  // *******************End User Management Module ************************
  GetJobOpening(jobopeningdetail: any, JobId: any, adminid: any, userid: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSaveJobOpening/' + JobId + '/' + userid + '/' + adminid, jobopeningdetail, httpOptions);
  }

  CreateJob(jobdetail: any) {
    //var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSetJob', jobdetail, httpOptions);
  }

  GetAllAgency(companytype: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/GetAdminEmployerAgency/' + companytype, httpOptions);
  }

  AgencyGetAllJobs(JobId: any, pageNumber: number) {
    var token = localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Agency/GetAllAgencyJobList/' + JobId + '/' + pageNumber, httpOptions);
  }

  GetJobOpeningDetail(Jobid: any, UserId: any, AdminId: any) {
    // var token=localStorage.getItem('user_token');

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Job/AdminGetJobOpening/' + Jobid + '/' + UserId + '/' + AdminId, httpOptions);
  }
  UpdateJob(jobDetails: any) {
debugger
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSetJob', jobDetails, httpOptions);
  }

  SetJobOpening(jobopeningdetail: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminUpdateJobOpening/', jobopeningdetail, httpOptions);
  }

  DeletOpeningJob(id: any, userid: any, adminid: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/AdminDeleteEmpJobPostOpening/' + id + '/' + userid + '/' + adminid, httpOptions);
  }

  JobPost(jobdetail: any, adminid: any, ImagePath: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'JoppostApi/jobpostDetail', { adminid, jobdetail, ImagePath }, httpOptions);
  }


  GetAllStates() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllState', httpOptions);
  }
  GetAllDistrict(StateID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Master/GetAllDistricts', StateID, httpOptions);
    //return this.httpClient.get(environment.apiUrl + 'Master/GetAllDistricts' +StateID, httpOptions);
  }

  GetAllIndustryArea() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllIndustryAreas', httpOptions);
  }

  GetAllCompantType() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllCompanyTypes', httpOptions);
  }


  GetAllDocName() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllDocList', httpOptions);
  }

  emailcheck(emails: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'Master/emailcheck', emails, httpOptions);
  }

  ImgPost(sendata: any = {}) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/SetAdminCompanyProfileUpdate', sendata, httpOptions);
  }

  // ImgPost(jobdetail:any,adminid:any,ImagePath:any) {   

  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };
  //   return this.httpClient.post(environment.adminapiUrl + 'JoppostApi/imgDetail',{adminid,jobdetail,ImagePath},httpOptions);
  // }
  Worklocationpost(jobdetail: any, adminid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'JoppostApi/Worklocationreceive', { adminid, jobdetail }, httpOptions);
  }

  GetAllCompany() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllCompanyName', httpOptions);
  }

  GetCompanyDetails(companyid: any, adminid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/GetAdminCompanyDetail/' + companyid + '/' + adminid, httpOptions);
  }
  // viewdata(companyid) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/viewdata', companyid, httpOptions);
  // }

  viewdata(companyid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', companyid, httpOptions);
  }


  // editdata(companyid) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/editdata', companyid, httpOptions);
  // }

  editdata(companyid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminGetMultiusersCompanyProfile', companyid, httpOptions);
  }



  // *********Rajeev Jha ************************
  RegistrationTokengeneration(senddata1: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminRegistration', senddata1, httpOptions);
  }

  // CheckGstn(senddata: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'RegisApi/CheckGstn', senddata, httpOptions);
  // }
  CheckGstn(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminGetCompanyName', senddata, httpOptions);
  }
  // CheckPanCard(senddata: any) {

  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'RegisApi/CheckPanCard', senddata, httpOptions);
  // }

  CheckPanCard(senddata: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/AdminGetCompanyName', senddata, httpOptions);
  }

  allfeedbackdata(senddata: any) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'FeedbackView/allfeedbackdata', senddata, httpOptions);

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', senddata, httpOptions);
  }

  viewfeedbackdata(id) {
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    // return this.httpClient.post(environment.apiUrl + 'FeedbackView/viewfeedbackdata', id, httpOptions);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', id, httpOptions);
  }

  GetFilterFeedbackview(senddata: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'FeedbackView/GetFilterFeedbackview', senddata, httpOptions);
  }

  approveCompanyDetails(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/CompanyDocunmentVerification/', data, httpOptions);
  }

  EnableDisable(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/CompanyStatus/', data, httpOptions);
  }

  getAllReports(alldata: any) {
    // alert(JSON.stringify(alldata));
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // return this.httpClient.post(environment.apiUrl + 'CompanyView/adminReport/', alldata, httpOptions);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData/', alldata, httpOptions);
  }

  updatePassword(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarAdmin/ResetPassword/', data, httpOptions);
  }

  // Registrationupdate(senddata: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'RegisApi/Registrationupdate', senddata, httpOptions);
  // }

  Registrationupdate(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Account/UpdateSaveUserDetails', senddata, httpOptions);
  }

  //  deletedata(senddata:any){
  //      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) };   
  //     return this.httpClient.post(environment.apiUrl + 'CompanyRegisterView/deletedata',senddata, httpOptions); 
  //  }

  PostWalkin(postdata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.ysUrl + 'Rojgaar/AddUserPostForRojgaar', postdata, httpOptions);
  }

  scrapJob(Jobid: any, UserID: any, AdminId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/AdminScrapJob/' + Jobid + '/' + UserID + '/' + AdminId, httpOptions);
  }

  GetUserDetail(UserId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetUserDetail/' + UserId, httpOptions);
  }

  postToYS(jobId: any) {
    // alert(jobId)
    // const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'job/PostRojgaarToYs/' + jobId, httpOptions);

  }

  deleteSectorTrade(DeleteList: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminDeleteSectorTrade/', DeleteList, httpOptions);
  }

  GetReportCount() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/StateByCompanyReport/', httpOptions);
  }

  //
  GetStateWiseReport(stateId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/StateReportById/' + stateId, httpOptions);
  }

  GetDistrictWiseReport(stateId: any, District: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/DistrictReportById/' + stateId + '/' + District, httpOptions);
  }
  ///////////////////////  

  reCreateJob(postdata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdmRecreateJob/', postdata, httpOptions);
  }

/////////////////////////////////
GetCompanyWiseJobs(){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/CompanyWiseJobDetailsReport',httpOptions); 
}
///////////// add  Scrining Sevices /////////////////
saveQuestion(UserID:any,AdminID:any,questionList:any) {   
  //const token = sessionStorage.getItem('usertoken');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/AdmSetUserQuestion/'+UserID+'/'+AdminID,questionList, httpOptions);
 }
 getPreviousQuestionList(Jobid:any,AdminID:any,UserID:any):Observable<any>  {  
   // const token = sessionStorage.getItem('usertoken');   
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetJobScreeningquestion/'+Jobid+'/'+AdminID+'/'+UserID,httpOptions);
 } 
updateQuestion(questionList:any) {
  const token = sessionStorage.getItem('usertoken');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
  return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/SetUserQuestion',questionList, httpOptions);
}

  //////////////////////////////////

  GetJobScreeningquestion(Jobid: any, AdminID: any, UserID: any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetJobScreeningquestion/' + Jobid + '/' + AdminID + '/' + UserID, httpOptions);
  }
  //////////////// End Scrining Services //////////////
///////////////////////   get agent reports /////////

/////////////////////////////////
GetAgentWiseReports(){
  //const data= {"HSTPLRequest":{"clientKey":"ROJGAAR_ANDROID","data":"{}","typeFor":"AgentReport","secrateKey":"rxdfsaj+Q2iJ7/ygmi0zcQXxobsQuVBd5tB1n1TpP6k="}};
  const body = JSON.stringify({"HSTPLRequest":{"clientKey":"ROJGAAR_ANDROID","data":"{}","typeFor":"AgentReport","secrateKey":"rxdfsaj+Q2iJ7/ygmi0zcQXxobsQuVBd5tB1n1TpP6k="}});
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) }; 
  return this.httpClient.post(environment.fosurl + 'User/GetData',body,httpOptions); 
}

/////////////////////////////////
GetEmployerWiseReports(SendData:any){
  //const data= {"HSTPLRequest":{"clientKey":"ROJGAAR_ANDROID","data":"{}","typeFor":"AgentReport","secrateKey":"rxdfsaj+Q2iJ7/ygmi0zcQXxobsQuVBd5tB1n1TpP6k="}};
   
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) }; 
  return this.httpClient.post(environment.fosurl + 'User/GetData',SendData,httpOptions); 
}


/////////////////////////////////
GET_TOTAL_COUNT_Job_List(Adminid:any,Companyid:any,ModuleName:any){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
  return this.httpClient.get(environment.rojgaarUrl + 'Job/AdminGetJobRelatedData/'+Adminid+'/'+Companyid+'/'+ModuleName,httpOptions); 
}

GetJobHtml(JobId:any){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) }; 
  return this.httpClient.get(environment.rojgaarUrl + 'Job/RJGetJobHTML/'+JobId,httpOptions); 
}

  //////////////////////////////////////////////
}