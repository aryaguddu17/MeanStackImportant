import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable()
export class MasterService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }
  // Grievance MAster
  GetGrievanceCategory() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Grievance/GetGrievanceCategory', httpOptions);
  }
  GetGrievanceSubject(CategoryCode: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Grievance/GetGrievanceSubject/' + CategoryCode, httpOptions);
  }
  GetStandardConcern(SubjectCode: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Grievance/GetStandardConcern/' + SubjectCode, httpOptions);
  }

  GetAllStates() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllState', httpOptions);
  }

  GetHistory() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetHistory', httpOptions);
  }


  GetAllDistrict(StateID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllDistricts/' + StateID, httpOptions);
  }

  GetAllCity(StateID:any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllCity/' + StateID, httpOptions);
  }

  GetAllDistrictvenu(StateVenuID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllDistricts/' + StateVenuID, httpOptions);
  }

  GetReligion() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetReligion', httpOptions);
  }

  GetQualification() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetQualification', httpOptions);
  }

  GetAllSectors() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllSectors', httpOptions);
  }
  GetPrivacy() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetPrivacy', httpOptions);
  }


  GetAllTrade(SectorID: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllTrades/' + SectorID, httpOptions);
  }
  GetScheme() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetScheme', httpOptions);
  }
  GetTrainingCenter(StateID: any, DistrictID: any, TCNature: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetTrainingCenter/' + StateID + '/' + DistrictID + '/' + TCNature, httpOptions);
  }
  // End Grievance MAster  
  GetAllCountry() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetAllCountry', httpOptions);
  }

  GetTradByTC(TCID: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetTradByTC/' + TCID, httpOptions);
  }
  
  GetAllLanguage() {
  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllLanguage', httpOptions);
  }
  
  GetPhotosCategory() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetPhotosCategory', httpOptions);
  }
  tslint
  SaveMyPhotoAlbum(objMyPhotoAlbum: FormData) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': this.config.UserInfo.token }) };
    return this.httpClient.post(environment.apiUrl + 'Master/SaveMyPhotoAlbum', objMyPhotoAlbum, httpOptions);
  }

  GetMyPhotoAlbum(ID: any) {
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.config.UserInfo.token }) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetMyPhotoAlbum/' + ID, httpOptions);
  }

  UpdateMyPhotoAlbum(objMyPhotoAlbum: FormData) {
    const httpOptions = { headers: new HttpHeaders({ 'Authorization': this.config.UserInfo.token }) };
    return this.httpClient.post(environment.apiUrl + 'Master/UpdateMyPhotoAlbum', objMyPhotoAlbum, httpOptions);
  }

  DeleteCandAlbum(ID: any) {
  
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.apiUrl + 'Master/DeleteCandAlbum/' + ID, null, httpOptions);
  }
  DeletePhoto(ID: any) {
     
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.apiUrl + 'Master/DeletePhoto/' + ID, null, httpOptions);
  }
  // Get All Joining
 
  GetJoiningPrority() {
    //alert(environment.apiUrl);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetJoiningPriority', httpOptions);
  } 

  GetAllIndustryArea() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllIndustryAreas', httpOptions);
  }

   // Get All Education
   GetAllMinEducation() {
    //alert(environment.apiUrl);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetEducation', httpOptions);
  }
  
 

  GetHiringLevel() {
    //alert(environment.apiUrl);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'User/GetHiringLevel', httpOptions);
  }

  GetUserSkillDetails() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
    return this.httpClient.get(environment.apiUrl + 'User/GetUserSkillDetails/',httpOptions);
  }
  
  
  GetGender()
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.apiUrl + 'Master/GetGender', httpOptions);
  }
  // GetAllFunctionArea() {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllFunctionalAreas', httpOptions);
  // }
  GetAllFunctionArea() {//Rajeev Jha on 17/7/19
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Master/GetAllFunctioAreaList', httpOptions);
  }

  

  GetJobStatics() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Dashboard/GetJobStatics', httpOptions);
  }
  GetCompaniesList() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Dashboard/GetCompaniesList', httpOptions);
  }
  StatsJobsByCategories() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'Dashboard/DashsboardStatsJobsByCategories', httpOptions);
  }

 objSearchjobs: any = {
  FunctionAreaId: 0,
  IndustryAreaId: 0,
  StatesId: 0,
   DistrictId: 0,
   minExp:0,
  maxExp:0,
  minCtc:0,
  maxCtc:0,
};
  
  SearchJobHome(PageNumber: number, objSearchjobs: any) {
   
    //const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.apiUrl + 'job/SearchJobHome/' + PageNumber, objSearchjobs, httpOptions);
  }
  GetHomeJobDetails(jobid: number) {
    //const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.apiUrl + 'job/GetHomeJobDetails/' + jobid, httpOptions);
  }
 
  GetAllSectorsys() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.ysUrl + 'Master/GetAllSectors', httpOptions);
  }
  GetAllTrades(tradeid:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.ysUrl + 'Master/GetAllTrades/' + tradeid, httpOptions);
  }
  
  GetEmpDashboardValue(){
    const token =sessionStorage.getItem('usertoken');
    //const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/GetEmpDashBoard',httpOptions );
  }

  GetToken(UserID:any){
  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/GetToken/' + UserID,httpOptions );
  }

  GetAllUser(companyid:number){
    
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/AdminGetVerifiedUser/' + companyid,httpOptions );
  }

  GetAllMrigsSector(schemeId) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'MrigsRojgaar/GelAllSector/'+schemeId, httpOptions);
  }

  GetAllMrigsTrade(SchemeId,tradeid:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'MrigsRojgaar/GetAllTrade/'+SchemeId+'/'+ tradeid, httpOptions);
  }

  Getallscheme(Schemelist:any) {//new
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData/' ,Schemelist, httpOptions);
  }

  GetOpeningDetails(adminid:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdmGetEmpDashBoard/' + adminid, httpOptions);
  }

  GetrecentOpeningDetails(adminid:any,OrderbyType:any,displaymode:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/Adminempdashbordjobtitlewise/' + adminid+'/'+OrderbyType+'/'+displaymode, httpOptions);
  }

  Recentlyappliedcandidate(adminid:any,OrderbyType:any,displaymode:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/Adminempdashbordjobtitlewise/' + adminid+'/'+OrderbyType+'/'+displaymode, httpOptions);
  }

  JobCount(Adminid:any,Jobid:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/AdminEmpDashbordJobIdWise/' +Adminid+'/'+Jobid, httpOptions);
  }

  Appliedcandidatedetail(senddata: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   // const body = JSON.stringify({ 'senddata': senddata });
    return this.httpClient.post(environment.rojgaarUrl + 'Dashboard/AdminDashboardGetCandidateList', senddata, httpOptions);
  }

  Allrecentlypostedjoblist(adminid:any,OrderbyType:any,displaymode:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/Adminempdashbordjobtitlewise/' + adminid+'/'+OrderbyType+'/'+displaymode, httpOptions);
  }
 

  Allrecentlyappliedcandidatelist(adminid:any,OrderbyType:any,displaymode:any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.get(environment.rojgaarUrl + 'Dashboard/Adminempdashbordjobtitlewise/' + adminid+'/'+OrderbyType+'/'+displaymode, httpOptions);
  }
// Get Server Date and time
GetServerDateTime(){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.get(environment.rojgaarUrl + 'Master/GetSysCurrentDate', httpOptions);
}
GetBenifitDetail(postDataSalary:any){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.post(environment.rojgaarUrl + 'RojgaarCommon/GetData',postDataSalary, httpOptions);
}

}


