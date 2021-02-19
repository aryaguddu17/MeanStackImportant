import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http} from '@angular/http';
import { AppConfig } from '../Globals/app.config';
import { environment } from '../../environments/environment';


@Injectable()
export class UserInfoService {
  constructor(private httpClient: HttpClient, private http: Http, private config: AppConfig) { }

  UpdateProfile(objProfile: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateProfile', objProfile, httpOptions);
  }

  UpdateJobProfile(objJobProfile: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateJobProfile', objJobProfile, httpOptions);
  }


  AddAddress(objAddress: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddAddress', objAddress, httpOptions);
  }
  UpdateAddress(objAddress: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateAddress', objAddress, httpOptions);
  }


  GetProfileDetails() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetProfileDetails', httpOptions).do(response => console.log("logging response both bad and ok..."), error => console.log("Something exploded, call 911"));
  }


  GetJobProfileDetails() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetJobProfileDetails', httpOptions);
  }

  GetAddress(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetAddress/' + ID, httpOptions);
  }
  AddFamily(objFamily: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddFamily', objFamily, httpOptions);
  }
  GetFamily(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetFamily/' + ID, httpOptions);
  }
  UpdateFamily(objFamily: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateFamily', objFamily, httpOptions);
  }

  DeleteFamily(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteFamily/' + ID, null, httpOptions);
  }
  DeleteAddress(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteAddress/' + ID, null, httpOptions);
  }

  //Work Experience  Actions
  AddWorkExperience(objFamily: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddWorkExperience', objFamily, httpOptions);
  }
  GetWorkExperience(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetWorkExperience/' + ID, httpOptions);
  }
  UpdateWorkExperience(objFamily: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateWorkExperience', objFamily, httpOptions);
  }
  DeleteWorkExperience(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteWorkExperience/' + ID, null, httpOptions);
  }
  GetInterestArea() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetInterestArea', httpOptions);
  }
  AddInterestArea(objHobbies: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddInterestArea', objHobbies, httpOptions);
  }
  DeleteInterestArea(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteInterestArea/' + ID, null, httpOptions);
  }
  // GetEducationQualification() {
  //   const token = this.config.UserInfo.token;
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
  //   return this.httpClient.get(environment.rojgaarUrl + 'User/GetEducationQualification', httpOptions);
  // }
  DeleteEducationQualification(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteEducationQualification/' + ID, null, httpOptions);
  }
  GetEducationQualification(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetEducationQualification/' + ID, httpOptions);
  }
  UpdateEducationQualification(objEducationQualification: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateEducationQualification', objEducationQualification, httpOptions);
  }
  AddEducationQualification(objEducationQualification: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddEducationQualification', objEducationQualification, httpOptions);
  }
  DeleteCertification(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteCertification/' + ID, null, httpOptions);
  }
  GetCertification(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetCertification/' + ID, httpOptions);
  }
  UpdateCertification(objCertification: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateCertification', objCertification, httpOptions);
  }
  AddCertification(objCertification: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddCertification', objCertification, httpOptions);
  }

  // //post
  // GetUserPost() {
  //   const token = this.config.UserInfo.token;
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
  //   return this.httpClient.get(environment.rojgaarUrl + 'User/GetUserPost/', httpOptions);
  // }
  //
  UpdateProfileImage(Image: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateProfileImage', JSON.stringify({ "Image": Image }), httpOptions).do(response => console.log("logging response both bad and ok..."), error => console.log("Something exploded, call 911"));


  }
  //  User Training
  DeleteTraining(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/DeleteTraining/' + ID, null, httpOptions);
  }
  GetTraining(ID: any) {
    ID = ID != null && ID != "" ? ID : 0;
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetTraining/' + ID, httpOptions);
  }
  UpdateTraining(objTraining: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/UpdateTraining', objTraining, httpOptions);
  }
  AddTraining(objTraining: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/AddTraining', objTraining, httpOptions);
  }
  Getlanguage() {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/Getlanguage', httpOptions);
  }
  Addlanguage(objlanguage: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/Addlanguage', objlanguage, httpOptions);
  }
  Deletelanguage(ID: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.post(environment.rojgaarUrl + 'User/Deletelanguage/' + ID, null, httpOptions);
  }

  GetUserList(Parient_Id: any) {
    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    const body={'Parient_Id':Parient_Id};
    return this.httpClient.get(environment.rojgaarUrl + 'User/GetUserChild/'+Parient_Id ,httpOptions);
  }

  GetPermissionDetails(id:any){

    const token = this.config.UserInfo.token;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token }) };
    return this.httpClient.get(environment.rojgaarUrl + 'User/MenuPermission/'+id ,httpOptions);

  }

  GetEmpSubscriptionDetails(data:any){  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.httpClient.post(environment.rojgaarUrl + 'RojgaarAdmin/GetEmpSubscriptionDetails/',data ,httpOptions);

  }

  GetAdminCompanyDetailBySubscriptionId(id:any){

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.httpClient.get(environment.rojgaarUrl + 'RojgaarAdmin/GetAdminCompanyDetailBySubscriptionId/'+id ,httpOptions);

  }


}