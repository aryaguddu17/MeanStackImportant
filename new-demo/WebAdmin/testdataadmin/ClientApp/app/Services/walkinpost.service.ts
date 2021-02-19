import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';


@Injectable()
export class WalkinPostService {

  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

  AddWalkinId(walkindetail:any) {
    //var token=localStorage.getItem('user_token');
    
    // const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminCandidateWalkInJob/',walkindetail, httpOptions);
  }

  addWalkinListing(walkinlisting:any,jobId:any,AdminId:any,UserId:any) {

   // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminSaveWalkInOpening/'+jobId+'/'+AdminId+'/'+UserId,walkinlisting, httpOptions);
  }

  GetAllWalkin(walkinData: any) { 
   
    //var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminGetCandidateWalkIn/',walkinData , httpOptions);
  }

  getWalkinDetails(WalkInId:any,UserId:any,AdminId:any):Observable<any>{
   // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'CandidateWalkIn/AdminGetWalkInOpening/'+WalkInId+'/'+UserId+'/'+AdminId,httpOptions);
  }

  DeletWalkin(WalkInOpeningId: any,AdminId: any,UserID: any) {
    // var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.get(environment.rojgaarUrl + 'CandidateWalkIn/AdminDeleteWalkInOpening/' + WalkInOpeningId+'/'+AdminId+'/'+UserID, httpOptions);
  }

  updatwWalkin(formvalue,walkinid){

    var token=localStorage.getItem('user_token');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': token}) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/CandidateWalkInJob/'+walkinid,formvalue, httpOptions);

  }

  updateWalkinListing(openingdetail, walkinid){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminUpdateWalkInOpening/',openingdetail, httpOptions);

  }
 
 
closeWalkin(AdminId:any,walkinid:any,UserId:any)
{
  // const token = sessionStorage.getItem('usertoken');      
   // const token = this.config.UserInfo.token;
  //  var token=localStorage.getItem('user_token'); 
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.get(environment.rojgaarUrl + 'job/AdminClosedJob/' + AdminId +'/'+walkinid+'/'+UserId, httpOptions);
}
scrapWalkin(walkinid:any,UserId:any,AdminId:any)
 {
  //  const token = sessionStorage.getItem('usertoken');        
   // const token = this.config.UserInfo.token;
  //  var token=localStorage.getItem('user_token'); 
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.get(environment.rojgaarUrl + 'job/AdminScrapJob/' + walkinid +'/'+UserId+'/'+AdminId, httpOptions);
}


PublishJob(JobId: any,userid:any,adminid:any)
{
  // var token=localStorage.getItem('user_token');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.get(environment.rojgaarUrl+ 'CandidateWalkIn/AdminPublishWalkIn/' + JobId+'/'+userid+'/'+adminid, httpOptions);
}

PostWalkin(postdata: any)
{
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.post(environment.ysUrl + 'Rojgaar/AddUserPostForRojgaar' , postdata , httpOptions);
}
GetUserDetails(userid:any)
{
  // var token=localStorage.getItem('user_token');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json'}) };
  return this.httpClient.get(environment.rojgaarUrl+ 'RojgaarAdmin/AdminGetUserDetail/'+ userid, httpOptions);
}
RevokeJob(Jobid:any,UserId:any,AdminId:any)
  {
    
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
   return this.httpClient.get(environment.rojgaarUrl+ 'job/AdminRevokeJob/' + Jobid+'/'+UserId+'/'+AdminId, httpOptions);
 }

 getJobHtml(jobId:any){
  //const token = sessionStorage.getItem('usertoken');
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json',}) };
  return this.httpClient.get(environment.rojgaarUrl + 'Job/PostRojgaarToYs/' + jobId , httpOptions);

}

PostJobYS(postdata: any)
{
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.post(environment.ysUrl + 'Rojgaar/AddUserPostForRojgaar' , postdata , httpOptions);
}
// ***********Rajeev Jha-1174 ******************
GetFilterCompanyDataforwalkin(CompanyDetails: any) {
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
   return this.httpClient.post(environment.rojgaarUrl + 'CandidateWalkIn/AdminWalkinGetCompanyDetails', CompanyDetails, httpOptions);
 }

 GetFilterData(SearchData:any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
  return this.httpClient.post(environment.rojgaarUrl +'CandidateWalkIn/AdminGetCandidateWalkIn/',SearchData, httpOptions);
}
// *************Used for Application Received Module(Rajeev Jha 1174)****************************
GetFilterCompanyDataforAppReceived(CompanyDetails: any) {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminJobGetJobPostedCompanyReview', CompanyDetails, httpOptions);
}
// *******service to get the total count of walk-in(Rajeev Jha)-1174**
GET_TOTAL_COUNT_Walkin_List(senddata:any){
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'}) }; 
  return this.httpClient.post(environment.rojgaarUrl + 'Job/AdminGetJobRelatedData',senddata,httpOptions); 
}
}




