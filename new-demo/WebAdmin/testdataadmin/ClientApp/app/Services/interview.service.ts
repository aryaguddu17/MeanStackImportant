import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { environment } from '../../environments/environment';
import { Alert } from 'selenium-webdriver';
//import { timingSafeEqual } from 'crypto';
    
@Injectable()
export class interviewListService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

  GetJobListByCompanyId(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarAdmin/GetJobListByCompanyId', Data, httpOptions);
  }
  getAdminInterviewlistByJobId(InterviewDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetInterviewListByJobId', InterviewDetail, httpOptions);
  }
  GetAppliedJobById(AdminId: any, JobId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetJobDetailByJobId/' + AdminId + '/' + JobId, httpOptions);
  }
  getInterviewDetailById(InterviewDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.apiUrl + 'Interview/interviewDetail', InterviewDetail, httpOptions);
  }
  GetCandidateList(Detail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetAppliedCandListForInterview', Detail, httpOptions);
  }

  GetAppByCompanyId(Data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetAppliedJobListAplictRecvdForJob', Data, httpOptions);
  }

  GetOpeningByJobId(InterviewDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetOpeningDetailsForJob', InterviewDetail, httpOptions);
  }

  GetOpeningCandidateList(postdata) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetAppliedCandidateOpeningWiseJob/', postdata, httpOptions);

  }

  GetOpeningJobList(postdata) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdminGetInterviewJobListJob/', postdata, httpOptions);
  }
  GetCompanyWorkLocation(companyid: any, adminid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdminGetEmpCompanyWorkLocation/' + companyid + '/' + adminid, httpOptions);
  }
  GetCommanCandidateList(AdminId: any, Jobid: any, Interviewid: any, UserId: any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/AdminGetAllCandidateData/' + AdminId + '/' + Jobid + '/' + Interviewid + '/' + UserId, httpOptions);
  }
  // getAdminInterviewlistByCompanyId(detail: any) {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
  //   return this.httpClient.post(environment.apiUrl + 'Master/getAdminInterviewlistByCompanyId', detail, httpOptions);
  // }
  getAdminInterviewlistByCompanyId(detail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData', detail, httpOptions);  
  }
  UpdateSuitabilityStatusOfAppliedCandidate(Detail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminSetSuitableUnsuitableCandidate', Detail, httpOptions);
  }
  addInterviewschedule(interviwdetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdminSetInterviewSchedule', interviwdetail, httpOptions);
  }
  GetCompanyWorkLocationstateDistrict(adminid: any, id: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'InterviewSchedule/AdmGetStateDistrictByLoc/' + adminid + '/' + id, httpOptions);
  }
  SetCandidateRescheduleDetail(RescheduleDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdmRescheduleCandidateInterview', RescheduleDetail, httpOptions);
  }
  SetCandidateSelectionDetail(SelectionDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdminSetCandidateInterviewResult', SelectionDetail, httpOptions);
  }
  SetCandidateOfferLetterDetail(OfferLetterDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdmSetCandidateOfferLetter', OfferLetterDetail, httpOptions);
  }
  getCandidateOfferLetterDetail(Adminid: number, UserId: number, JobId: number, InterviewId: number, CandId: number) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'InterviewSchedule/AdmGetCandidateOfferLetter/' + Adminid + '/' + UserId + '/' + JobId + '/' + InterviewId + '/' + CandId, httpOptions);
  }
  SetJoinedCandidateList(JoiningDetail: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'OfferLetter/AdmSetCandidateJoiningstatus', JoiningDetail, httpOptions);
  }
  getScreeningAnswer(postScrData: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'InterviewSchedule/AdminGetInverviewschldCandScreeingans', postScrData, httpOptions);

  }
  getToken(userid: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/GetToken/' + userid, httpOptions);

  }
  GetEmployeeAddress(CANDID: string, tokenid: any) {
    //const token = this.config.UserInfo.token;
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetEmployeeAddress/' + CANDID, httpOptions);
  }

  GetFamilyDetails(CANDID: string, tokenid: any) {
    //const token = this.config.UserInfo.token;
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetFamilyDetails/' + CANDID, httpOptions);
  }

  GetCandidateLanguage(CANDID: string, tokenid: any) {
    //const token = this.config.UserInfo.token;
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetCandidateLanguage/' + CANDID, httpOptions);
  }

  GetEmpAreaOfIntrest(CANDID: string, tokenid: any) {
    //const token = this.config.UserInfo.token;
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetEmpAreaOfIntrest/' + CANDID, httpOptions);
  }

  GetEmpWorkExperience(CANDID: string, tokenid: any) {
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetEmpWorkExperience/' + CANDID, httpOptions);
  }
  GetEmpCertification(CANDID: string, tokenid: any) {
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetEmpCertification/' + CANDID, httpOptions);
  }

  GetEmpEdutnQualifictin(CANDID: string, tokenid: any) {
    const token = tokenid;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/GetEmpEdutnQualifictin/' + CANDID, httpOptions);
  }
  mydatabaseCandidateDetail(candidateID: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/ViewRojgaarCandeSeMyDatase/' + candidateID, httpOptions);
  }
  GetFilterCompanyRegistrationCompany(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyapplicationRecieved', senddata, httpOptions);
    //return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyInterviewShedule', senddata, httpOptions);
  } 
  GetFilterCompanyInterviewSchedule(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
   // return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyapplicationRecieved', senddata, httpOptions);
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyInterviewShedule', senddata, httpOptions);
  } 
  GetFilterCompanyCandiateSelection(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
   // return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyapplicationRecieved', senddata, httpOptions);
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyCandidateselection', senddata, httpOptions);
  } 
  GetFilterCompanyOfferLetter(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminGetCompanyListOfferLetter', senddata, httpOptions);
    //return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyInterviewShedule', senddata, httpOptions);
  } 
  GetFilterCompanyJoiningConfirmation(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // const body = JSON.stringify({ 'senddata': senddata });
    return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdminGetCompanyListOfJoined', senddata, httpOptions);
    //return this.httpClient.post(environment.rojgaarUrl + 'CompanyProfile/AdmCompanyInterviewShedule', senddata, httpOptions);
  } 
  GetOpeningListByJobId(adminid:any,JobId: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetJobAppreviwOpngAddressList/'+ JobId+ '/' + adminid, httpOptions);
  }
  GetJobScreeningquestion(Jobid: any, AdminID: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    //return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetQuesAndAns/' + Jobid + '/' + AdminID , httpOptions);
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetRevwAppExpctAnswer/' + Jobid + '/' + AdminID , httpOptions);
  }
  GetPreference() {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllPreference', httpOptions);
  }
  GetJobScreeningCounts(Jobid: any, AdminID: any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetAppRevwScreeningCounts/' + Jobid + '/' + AdminID , httpOptions);
  }
  GetFilteredCandidateList(postdata) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'UserQuestionsAns/AdminGetAppRevwCandDetails', postdata, httpOptions);

  }
  GetCompanyData(CompanyID:any) {

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'CompanyProfile/AdmGetCompanyDetail/'+CompanyID,httpOptions);
  }





  GetEmployerJobDetails(jobid, employerId, eventid) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Event/AdminGetEventEmployerJobDtlAndContactDtlList/' + jobid + '/' + employerId + '/' + eventid, httpOptions);
  }
  GetWalkInDetail(JobId: any,PageNumber:any) {
    const token = sessionStorage.getItem('usertoken');        // const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.apiUrl + 'InterviewSchedule/GetInterviewWalkList/' + JobId + '/' + PageNumber, httpOptions);
  }
  GetEventDetail(eventid:any,JobId: any,PageNumber:any) {
    const token = sessionStorage.getItem('usertoken');        // const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.apiUrl + 'InterviewSchedule/GetInterviewEventList/'+ eventid + '/'  + JobId + '/' + PageNumber, httpOptions);
  }
  CandidateListForWalkin(adminid:any,jobId: any, InterviewId: any,userid:any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Candidate/AdminGetAllCandidateDataforwalk/' + adminid + '/' + jobId + '/' + InterviewId + '/' + userid, httpOptions);

  }
  CandidateListForEvent(senddata:any) {
    //const token = sessionStorage.getItem('usertoken');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'Candidate/AdminGetAllCandidateDataEvent' ,senddata, httpOptions);

  }


}
