import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { JobpostService } from '../../Services/jobpost.service';
import { CompanyProfileService } from '../../Services/companyprofile.service';
import { RegistrationService } from '../../Services/registration.service';
import { MasterService } from '../../Services/master.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { send } from 'q';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

declare var toastr: any
@Component({
    selector: 'app-CompanyProfileComponent',
    templateUrl: './CompanyProfile.component.html',
    styleUrls: ['./CompanyProfile.component.css'],
})
export class CompanyProfileComponent implements OnInit {
    modalRef: BsModalRef;
    CompanyProfileForm: FormGroup;
    data: any;
    a: any;
    c: any;
    titleAlert: string = 'can not be blank';
    Response: any;
    states: any = [];
    district: any;
    district1: any = [];
    users: any = [];
    industialrea: any = [];
    companytype: any = [];
    docname: any = [];
    public companyid: number;
    workLocationId: any;
    public sid: any;
    id: any;
    Exitprofile: any = '1';
    editid: boolean = false;
    count: any = 1;
    showSectorskillForm: any = '0';
    profilesubmit: any = [];
    hidecompanyprofile: any = '1';
    hideupdate: any;
    adminid: any;
    imagename: string = '';
    displaytextBox: any = 0;
    sectorskils: FormGroup;
    item: any = [];
    ID: any;
    Responce: any;
    dbResponse: any = {};
    emailavil: any = [];
    companyprofileshow: any = '0';
    ShowCompanyWorkLocation: any = '0';
    public WorkLocation = [];
    WorkLocationshow: any = [];
    showlist: any = 0;
    CompanyDetail: any = '0';
    companyId: any;
    backbtn: any = '1';
    DBResponce: any = [];
    TokenNo: any;
    CompanyData: any = [];
    getAgency: any = [];
    showAgency: any = '0';
    profileshow1: any = 0;
    showEmployer: any = '0';
    companyTypeO: any;
    ShowCompanyData: any = {};
    resend: any = '0';

    constructor(private formBuilder: FormBuilder,
        private http: Http,
        private JobpostService: JobpostService,
        private CompanyProfileService: CompanyProfileService,
        private https: HttpClientModule,
        private toasterService: ToastrService,
        private registService: RegistrationService,
        private spinnerService: Ng4LoadingSpinnerService,
        private MasterService: MasterService,
        private modalService: BsModalService,
        private router: Router) { }


    onClicked(companyid: string) {
        if (companyid != '') {
            this.CompanyData = [];
            this.ShowCompanyData = [];
            this.companyId = companyid;
            this.GetCompanydata(this.companyId);//used to get company Details
            this.getallprofilecompany(companyid, this.adminid);//used to get company work location details
            this.companyprofileshow = '0';
            this.CompanyDetail = '1';
            this.ShowCompanyWorkLocation = '1';
            this.hidecompanyprofile = '1';
        }
    }

    onbackregist() {
        this.showSectorskillForm = 0;
        this.companyprofileshow = '0';
        this.CompanyDetail = '0';
        this.ShowCompanyWorkLocation = '0';
        this.hidecompanyprofile = '0';
    }

    ngOnInit() {
        localStorage.removeItem('compid');
        this.GetAllState();
        this.GetAllIndustryArea();
        this.GetAllDocName();
        this.GetCompanyType();
        this.adminid = JSON.parse(localStorage.getItem('phpadminid'));

        this.CompanyProfileForm = this.formBuilder.group({
            CompanyName: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
            logintype: ['', Validators.required],
            ShortCode: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
            ImgName: ['', ''],
            TagLine: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
            email: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces, CustomValidators.vaildEmail])]],
            gstn: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
            PAN: ['', [Validators.required, Validators.compose([CustomValidators.validpanformate, CustomValidators.removeSpaces])]],
            IndustryType: ['', Validators.required],
            Description: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
            StateiD: ['', Validators.required],
            DistrictID: ['', Validators.required],
            OfficeAddress: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
            panImg: ['', ''],
            gstImg: ['', ''],
            GstinImgName: ['', ''],
            PanImgName: ['', ''],
            ImgNames: ['', [Validators.nullValidator]],
            mobile: ['', [Validators.required, Validators.compose([CustomValidators.validMobile])]],
            website: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
            aboutCompany: ['', [Validators.nullValidator, Validators.compose([CustomValidators.removeSpaces])]],
            landline: ['', Validators.nullValidator],
        });

        this.sectorskils = this.formBuilder.group({
            Userid: ['', [Validators.required]],
            Stateid: ['', [Validators.required]],
            Districtid: ['', [Validators.required]],
            Caddress: ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
            CtypeName: ['', [Validators.required]],
            CompanyTypeOther: ['', '']
        });
    }

    GetUserData(companyId) {
        this.sectorskils.controls['Userid'].setValue('');
        this.spinnerService.show();
        this.MasterService.GetAllUser(companyId).subscribe(res => {
            this.dbResponse = res;
            if (this.dbResponse != null) {
                this.spinnerService.hide();
                this.users = this.dbResponse.lstAdminVerifiedUser;
            }
            else {
                this.users = [];
                this.spinnerService.hide();
            }
        });
    }

    GetAllState() {
        this.spinnerService.show();
        this.MasterService.GetAllStates().subscribe(res => {
            this.states = res
            if (this.states != null && this.states.length > 0) {
                this.states = this.states;
                this.spinnerService.hide();
            }
            else{
                this.states=[];
                this.spinnerService.hide();
            }
        });
    }

    // **************Used for Company state District*************
    GetAllDistrict(event: any) {
        this.CompanyProfileForm.controls['DistrictID'].setValue('');
        this.id = event.target.value;
        if (this.id == undefined || this.id == "") {
            this.district = [];
            return false;
        }
        this.spinnerService.show();
        this.MasterService.GetAllDistrict(this.id).subscribe(res => {
            this.district = res
            if (this.district != null && this.district.length > 0) {
                this.district = this.district;
                this.spinnerService.hide();
            }
            else {
                this.district = [];
                this.spinnerService.hide();
            }
        });
    }

    GetDistrict(event: any) {
        this.sectorskils.controls['Districtid'].setValue('');
        this.id = event.target.value;
        if (this.id == undefined || this.id == '') {
            this.district1 = [];
            return false;
        }
        this.spinnerService.show();
        this.MasterService.GetAllDistrict(this.id).subscribe(res => {
            this.district1 = res
            if (this.district1 != null && this.district1.length > 0) {
                this.district1 = this.district1;
                this.spinnerService.hide();
            }
            else {
                this.district1 = [];
                this.spinnerService.hide();
            }
        });
    }

    GetNewDistrict(stateid: any) {
        this.id = stateid;
        this.spinnerService.show();
        this.MasterService.GetAllDistrict(this.id).subscribe(res => {
            this.district1 = res
            if (this.district1 != null && this.district1.length > 0) {
                this.district1 = this.district1;
                this.spinnerService.hide();
            }
        });
    }

    GetAllIndustryArea() {
        this.spinnerService.show();
        this.JobpostService.GetAllIndustryArea().subscribe(res => {
            this.industialrea = res
            if (this.industialrea != null) {
                this.industialrea = this.industialrea.Data;
                this.spinnerService.hide();
            }
            else {
                this.industialrea = [];
                this.spinnerService.hide();
            }
        });
    }

    GetCompanyType() {
        this.spinnerService.show();
        this.CompanyProfileService.GetCompanyTypeData().subscribe(res => {
            setTimeout(() => this.spinnerService.hide(), 500)
            this.companytype = res
        });
    }

    GetAllDocName() {
        this.spinnerService.show();
        this.JobpostService.GetAllDocName().subscribe(res => {
            this.docname = res
            if (this.docname != null) {
                this.docname = this.docname.Data;
                this.spinnerService.hide();
            }
            else {
                this.docname = [];
                this.spinnerService.hide();
            }
        });
    }

    ctype: any;
    ShowTextBox(event: any) {
        this.ctype = event.target.value;
        this.companyTypeO = this.ctype;
        if (this.ctype == 5) {
            this.displaytextBox = 1;
        }
        else {
            this.displaytextBox = 0;
            this.sectorskils.controls['CompanyTypeOther'].setValue('');
        }
    }

    Showsectorbutton: any = '0';
    Addsectorbutton() {
        this.count = '1';
        this.Showsectorbutton = '1'
        this.editid = false;
        this.showSectorskillForm = '1';
        this.hidecompanyprofile = '0';
        this.sectorskils.reset();
        this.GetUserData(this.companyId);
        this.sectorskils.controls['Stateid'].setValue("");
        this.sectorskils.controls['Districtid'].setValue("");
        this.sectorskils.controls['CtypeName'].setValue("");
        this.sectorskils.controls['CompanyTypeOther'].setValue("");
    }

    // ***************Function to update company profile*******************
    cutpanfromgst = '';
    UpdateCompanyProfile() {
       

        if (this.CompanyProfileForm.controls.ShortCode.value.trim() == '') {
            this.toasterService.error("All mandatory fields are required.")
            return false
        }
        if (this.CompanyProfileForm.controls.TagLine.value.trim() == '') {
            this.toasterService.error("All mandatory fields are required.")
            return false
        }
        if (this.CompanyProfileForm.controls.OfficeAddress.value.trim() == '') {
            this.toasterService.error("All mandatory fields are required.")
            return false
        }
        if (this.CompanyProfileForm.controls.email.value.trim() == '') {
            this.toasterService.error("Please enter your email.")
            return false
        }
        if (this.CompanyProfileForm.controls.IndustryType.value == 0) {
            this.toasterService.error("Please select industry.")
            return false
        }
        this.sectorskils.controls['Stateid'].setValue('');
        this.sectorskils.controls['Districtid'].setValue('');
        if (this.companyTypeO == "5") {
            if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls['CtypeName'].value == '') {
                if (this.sectorskils.controls['CompanyTypeOther'].value == '') {
                    this.toasterService.error("Please enter the other value.");
                    return false;
                }
            }
        }
        if (this.count == 1) {
            var companyName = this.CompanyProfileForm.value.CompanyName;
            var ImgNames = this.CompanyProfileForm.value.ImgNames;
            var TagLine = this.CompanyProfileForm.value.TagLine;
            var logintype = this.CompanyProfileForm.value.logintype;
            var email = this.CompanyProfileForm.value.email;
            var gstn = this.CompanyProfileForm.value.gstn;
            var PAN = this.CompanyProfileForm.value.PAN;
            var IndustryType = this.CompanyProfileForm.value.IndustryType;
            var Description = this.CompanyProfileForm.value.Description;
            var StateiD = this.CompanyProfileForm.value.StateiD;
            var DistrictID = this.CompanyProfileForm.value.DistrictID;
            var OfficeAddress = this.CompanyProfileForm.value.OfficeAddress;
            var ImagePath = this.imagename;
            var companyid = this.CompanyData.companyId;
            var companyshortname = this.CompanyProfileForm.value.ShortCode;
            var GstinImage = this.gstImage;
            var PanImage = this.panImage1;
            var PanImgName = this.CompanyProfileForm.value.PanImgName;
            var GstinImgName = this.CompanyProfileForm.value.GstinImgName;
            var GstinDocName = "GSTN";
            var PanDocName = "PAN";
            var GstnExtention = this.GstnExtention;
            var PanExtention = this.PanExtention
            var mobile = this.CompanyProfileForm.value.mobile;
            var website = this.CompanyProfileForm.value.website;
            var aboutCompany = this.CompanyProfileForm.value.aboutCompany;
            var landline = this.CompanyProfileForm.value.landline;

            if (gstn != undefined && gstn.length == 15) {
                this.cutpanfromgst = gstn.substr(2, 10);
            }
            else if (gstn == '') {
                gstn = undefined;
                this.cutpanfromgst = '';
            }
            else {
                this.cutpanfromgst = '';
            }
            var senddata = {
                'adminid': this.adminid,
                'CompanyName': companyName,
                'Description': Description,
                'StateiD': StateiD,
                'DistrictID': DistrictID,
                'IndustryType': IndustryType,
                'PAN': PAN,
                'OfficeAddress': OfficeAddress,
                'ImgName': ImgNames,
                'Image': ImagePath,
                'TagLine': TagLine,
                'companyid': companyid,
                'gstn': gstn,
                'companyshortname': companyshortname,
                'Email': email,
                'Mobile': mobile,
                'AboutCompany': aboutCompany,
                'Website': website,
                'LandLineNo': landline,
                'GstinImage': GstinImage,
                'PanImage': PanImage,
                'PanImgName': PanImgName,
                'GstinImgName': GstinImgName,
                'GstinDocName': GstinDocName,
                'PanDocName': PanDocName,
                'GstnExtention': GstnExtention,
                'PanExtention': PanExtention,
            };

            if (this.cutpanfromgst == PAN || gstn == undefined || PAN == undefined) {
                this.spinnerService.show();
                this.CompanyProfileService.SaveCompanyProfile(senddata).subscribe(res => {
                   
                    this.Responce = res;
                    if (this.Responce != null) {
                        this.spinnerService.hide();
                        this.GetCompanydata(this.companyId);
                        this.toasterService.success(this.Responce.message);
                        this.CompanyProfileForm.reset();
                    }
                    else {
                        this.Responce = [];
                        this.spinnerService.hide();
                    }
                });
                this.CompanyDetail = '1';
                this.companyprofileshow = '0';
                this.hidecompanyprofile = '1';
                this.ShowCompanyWorkLocation = 1;
            }
            else {
                this.companyprofileshow = '1';
                this.CompanyDetail = '0';
                this.toasterService.clear();
                this.toasterService.error("PAN must be a part of GSTIN");
                this.count = 0;
            }
        }
        this.getallprofilecompany(this.companyId, this.adminid);
        this.count++;
    }

    // ******************Function to update company profile End here************
    addworkloc(data) {
        this.item = localStorage.getItem('item');
        var b = this.adminid;
        this.spinnerService.show();
        this.JobpostService.Worklocationpost(data, b).subscribe(res => {
            this.Response = res;
            if (this.Response != null) {
                this.toasterService.success("Work location has been added successfully. ");
                this.spinnerService.hide();
            }
            else {
                this.Response = [];
                this.spinnerService.hide();
            }
        });
        this.sectorskils.reset();
    }

    GetAllCompanyData() {
        this.spinnerService.show();
        this.CompanyProfileService.GetCompanyData(this.companyId).subscribe(res => {
            this.Responce = res;
            if (this.Responce != null) {
                this.spinnerService.hide();
                this.CompanyData = this.Responce.lstCompanyProfile[0];
            }
            else {
                this.Responce = [];
                this.spinnerService.hide();
            }
        });
    }

    panGetImage: any;
    gstGetImage: any;
    gstGetImg: boolean = false;
    panGetImg: boolean = false;
    GetCompanydata(companyId) {
        this.spinnerService.show();
        this.CompanyProfileService.GetCompanyData(companyId).subscribe(res => {
            this.Responce = res;
            if (this.Responce != null) {
                this.spinnerService.hide();
                this.CompanyData = this.Responce.lstCompanyProfile[0];
                if (this.CompanyData.panImage) {
                    this.panGetImage = this.CompanyData.panImage;
                    this.panGetImg = true;
                    this.showMagPan = false;
                }
                if (this.CompanyData.gstinImage) {
                    this.gstGetImage = this.CompanyData.gstinImage;
                    this.gstGetImg = true;
                    this.showMagGst = false;
                }
            }
            else {
                this.Responce = [];
                this.spinnerService.hide();
            }
            this.spinnerService.show();
            this.JobpostService.GetAllIndustryArea().subscribe(res => {
                this.industialrea = res
                if (this.industialrea != null) {
                    this.spinnerService.hide();
                    this.industialrea = this.industialrea.Data;
                }
                else {
                    this.industialrea = [];
                    this.spinnerService.hide();
                }
            });
            this.spinnerService.show();
            this.JobpostService.GetAllDistrict(this.CompanyData.stateiD).subscribe(res => {
                this.district1 = res
                if (this.district1 != null) {
                    this.spinnerService.hide();
                    this.district1 = this.district1.Data;
                }
                else {
                    this.spinnerService.hide();
                    this.district1 = [];
                }
            });
        });
    }

    SetToken(id: any) {
        this.spinnerService.show();
        this.MasterService.GetToken(this.companyid).subscribe(res => {
            this.DBResponce = res;
            if (this.DBResponce != null) {
                this.spinnerService.hide();
                var token = this.DBResponce.lsttoken[0].token;
                this.TokenNo = "Bearer" + ' ' + token;
                localStorage.setItem('token', this.TokenNo);
            }
            else {
                this.DBResponce = [];
                this.spinnerService.hide();
            }
        });
    }

    EditCompanyProfile() {
        this.CompanyDetail = '0';
        this.editid = true;
        this.hidecompanyprofile = '1';
        this.companyprofileshow = '1';
        this.ShowCompanyWorkLocation = 0;
        this.showSectorskillForm = 0;
        this.GetCompanyEditdata();
        this.showlist = '0';
    }

    gstvalues = '';
    checkverifygst: boolean = false;
    gstncheckupdatecase(event: any) {
        this.gstvalues = event.target.value;
        var gstvalues = this.gstvalues;
        var reggstin = /^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/;
        if (this.gstvalues.length == 15 && reggstin.test(this.gstvalues)) {
            this.spinnerService.show();
            this.registService.CheckGstn(gstvalues).subscribe(res => {
                this.Response = res;
                this.dbResponse = this.Response;
                if (this.dbResponse != null) {
                    this.spinnerService.hide();
                    if (this.dbResponse.responseResult) {
                        this.checkverifygst = true;
                    }
                    else {
                        this.toasterService.error('GSTN already exist');
                        this.checkverifygst = false;
                        this.CompanyProfileForm.controls['gstn'].setValue('');
                    }
                } else {
                    this.spinnerService.hide();
                    this.toasterService.error(this.Response.message);
                    this.checkverifygst = false;
                    this.CompanyProfileForm.controls['gstn'].setValue('');
                }
            });
        }
    }

    panvalue1: any = '';
    panvalues = '';
    checkveriypan: boolean = false;
    pancheckupdatecase(event: any) {
        this.panvalues = event.target.value;
        var panvalues = this.panvalues;
        this.panvalue1 = event.target.value;
        var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if (this.panvalues.length == 10 && regpan.test(this.panvalues)) {
            this.spinnerService.show();
            this.registService.CheckPanCard(panvalues).subscribe(res => {
                this.Response = res;
                this.dbResponse = this.Response;
                if (this.dbResponse != null) {
                    this.spinnerService.hide();
                    if (this.dbResponse.responseResult) {
                        this.checkveriypan = true;
                    }
                    else {
                        this.toasterService.error(this.dbResponse.message);
                        this.checkveriypan = false;
                        this.CompanyProfileForm.controls['pancard'].setValue('');
                    }
                } else {
                    this.spinnerService.hide();
                    this.toasterService.error(this.Response.message);
                    this.checkveriypan = false;
                    this.CompanyProfileForm.controls['pancard'].setValue('');
                }
            });
        }
    }


    base64textString: any = [];
    img: any;
    imgGstName: any;
    imgPanName: any;
    PanExtention: any;
    GstnExtention: any;
    gstImage: any;
    showMagGst: boolean = false;
    panImage1: any;
    showMagPan: boolean = false;
    panImage: any;
    currentFile: any;
    ValidImageTypes: any;

    onUploadChange(evt: any, sf: any) {
        this.img = sf;
        this.base64textString = [];
        var file: File = evt.target.files[0];
        this.currentFile = file;
        var imn1 = this.currentFile.type.split('/');
        let ValidImageExt = ["jpeg", "png", "jpg"];
        if ($.inArray(imn1[1], ValidImageExt) < 0) {
            this.toasterService.error("Only formats are allowed : jpg, jpeg & png");
            this.CompanyProfileForm.controls['ImgName'].setValue('');
            return false;
        }
        if (this.img == 'gstImg') {

            this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        } else if (this.img == 'panImg') {
            this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        } else {
            this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        }
        var mimetypereader = new FileReader();
        mimetypereader.onloadend = this.CheckMimeType.bind(this);
        const Eblob = file.slice(0, 4);
        var data = mimetypereader.readAsArrayBuffer(Eblob);
    }

    CheckMimeType(e) {
        var res = e.target.result;
        let bytes = [];
        const uint = new Uint8Array(res);
        uint.forEach((byte) => {
            bytes.push(byte.toString(16));
        })
        const hex = bytes.join('').toUpperCase();
        var fileType = this.getMimetype(hex);
        if ($.inArray(fileType, this.ValidImageTypes) < 0) {
            this.toasterService.error("Only formats are allowed : jpg, jpeg & png");
            $("#fileProfile").val('');
            if (this.img == 'gstImg') {
                this.CompanyProfileForm.controls.gstImg.setValue('');
            } else if (this.img == 'panImg') {
                this.CompanyProfileForm.controls.panImg.setValue('');
            } else {
                this.CompanyProfileForm.controls.ImgName.setValue('');
            }
            return false
        } else {
            var reader = new FileReader();
            var size = Math.round(this.currentFile.size / 1024);
            if (size > 2000) {
                this.toasterService.error("File Size must be less then 2 MB", null, { enableHtml: true });
                if (this.img == 'gstImg') {
                    this.CompanyProfileForm.controls.gstImg.setValue('');
                } else if (this.img == 'panImg') {
                    this.CompanyProfileForm.controls.panImg.setValue('');
                } else {
                    this.CompanyProfileForm.controls.ImgName.setValue('');
                }
                return false;
            }
            reader.onloadend = this.handleReaderLoaded.bind(this);
            var data = reader.readAsBinaryString(this.currentFile);
        }
    }
    mimeimage: any;

    handleReaderLoaded(e) {
        var imn = this.currentFile.name;
        if (this.img == 'gstImg') {
            var imn2 = imn.split('.');
            this.imgGstName = imn;
            this.GstnExtention = imn2[1];
            this.gstImage = 'data:image/png;base64,' + btoa(e.target.result);
            this.showMagGst = true;
            this.gstGetImg = false;
            this.CompanyProfileForm.controls['GstinImgName'].setValue("");
        } else if (this.img == 'panImg') {

            var imn3 = imn.split('.');
            this.imgPanName = imn;
            this.PanExtention = imn3[1];
            this.panImage1 = 'data:image/png;base64,' + btoa(e.target.result);
            this.showMagPan = true;
            this.panGetImg = false;
            this.CompanyProfileForm.controls['PanImgName'].setValue("");
        } else {

            this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
            for (var i = 0; i < this.base64textString.length; i++) {
                this.imagename = '';
                this.imagename = this.base64textString[i]
            }
            this.CompanyProfileForm.controls['ImgNames'].setValue('');
        }
    }

    getMimetype(signature) {
        switch (signature) {
            case '89504E47':
                return 'image/png'
            case '47494638':
                return 'image/gif'
            case '25504446':
                return 'application/pdf'
            case 'FFD8FFDB':
            case 'FFD8FFE0':
                return 'image/jpeg'
            case '504B0304':
                return 'application/zip'
            default:
                return 'Unknown filetype'
        }
    }

    GetCompanyEditdata() {
        this.count = 1;
        this.editid = true;
        this.showMagGst = false;
        this.showMagPan = false;
        this.CompanyProfileForm.controls['CompanyName'].setValue(this.CompanyData.companyName);
        this.CompanyProfileForm.controls['gstn'].setValue(this.CompanyData.gstn);
        this.CompanyProfileForm.controls['Description'].setValue(this.CompanyData.description);
        this.CompanyProfileForm.controls['StateiD'].setValue(this.CompanyData.stateiD != '' ? this.CompanyData.stateiD : '');
        this.CompanyProfileForm.controls['DistrictID'].setValue(this.CompanyData.districtID != '' ? this.CompanyData.districtID : '');
        this.imagename = this.CompanyData.image;
        if (this.CompanyData.panImage) {
            this.panImage1 = this.CompanyData.panImage;
            this.showMagPan = true;
        }
        if (this.CompanyData.gstinImage) {
            this.gstGetImage = this.CompanyData.gstinImage;
            this.gstGetImg = true;
            this.showMagGst = false;
        }
        if (this.CompanyData.panImage) {
            this.panGetImage = this.CompanyData.panImage;
            this.panGetImg = true;
            this.showMagPan = false;
        }
        this.CompanyProfileForm.controls['PAN'].setValue(this.CompanyData.pan);
        this.CompanyProfileForm.controls['email'].setValue(this.CompanyData.companyEmail);
        this.CompanyProfileForm.controls['IndustryType'].setValue(this.CompanyData.industryID);
        this.CompanyProfileForm.controls['TagLine'].setValue(this.CompanyData.tagLine);
        this.CompanyProfileForm.controls['OfficeAddress'].setValue(this.CompanyData.officeAddress);
        this.CompanyProfileForm.controls['ImgNames'].setValue(this.CompanyData.imgName);
        this.CompanyProfileForm.controls['PanImgName'].setValue(this.CompanyData.PanImgName);
        this.CompanyProfileForm.controls['GstinImgName'].setValue(this.CompanyData.GstinImgName);
        this.CompanyProfileForm.controls['logintype'].setValue(this.CompanyData.loginType);
        this.CompanyProfileForm.controls['ShortCode'].setValue(this.CompanyData.companyShortName);
        this.CompanyProfileForm.controls['mobile'].setValue(this.CompanyData.mobile);
        this.CompanyProfileForm.controls['website'].setValue(this.CompanyData.website);
        this.CompanyProfileForm.controls['aboutCompany'].setValue(this.CompanyData.aboutCompany);
        this.CompanyProfileForm.controls['landline'].setValue(this.CompanyData.landLineNo);
        this.CompanyProfileService.GetCompanyTypeData().subscribe(res => {
            this.companytype = res;
            this.spinnerService.hide();
        });
        this.spinnerService.show();
        this.MasterService.GetAllDistrict(this.CompanyData.stateiD).subscribe(res => {
            this.district = res;
            this.spinnerService.hide();

        });
        this.hidecompanyprofile = '0';
        this.GetCompanydata(this.companyId);
    }

    exitHireForm() {
        this.showSectorskillForm = '0';
        this.hidecompanyprofile = '1';
        this.WorkLocation = [];
        this.WorkLocationshow = [];
    }

    exitCompanyprofile() {
        this.CompanyProfileForm.reset();
        this.hidecompanyprofile = '1';
        this.companyprofileshow = '0';
        this.CompanyDetail = '1';
        this.profileshow1 = '1';
        this.CompanyDetail = '1';
        this.Exitprofile = '1';
        this.hidecompanyprofile = '1';
        this.ShowCompanyWorkLocation = 1;
        this.showSectorskillForm = 0;
    }

    CompanyWorkLocation() {
        if (this.sectorskils.controls.Caddress.value.trim() == '') {
            this.toasterService.error("All mandatory fields are required")
            return false
        }
        if (this.companyTypeO == "5") {
            if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls.CompanyTypeOther.value.trim() == '') {
                this.toasterService.error("Please enter the other value.");
                return false;
            }
        }
        let statedid;
        let districtid;
        let typeid;
        let Userid;
        Userid = this.sectorskils.value.Userid;
        statedid = this.sectorskils.value.Stateid;
        districtid = this.sectorskils.value.Districtid;
        typeid = this.sectorskils.value.CtypeName;
        let username = (this.users).filter(function (entry) {
            return entry.id == Userid;
        });
        let statename = (this.states).filter(function (entry) {
            return entry.id == statedid;
        });
        let districtname = (this.district1).filter(function (entry) {
            return entry.id == districtid;
        });
        let typename = (this.companytype).filter(function (entry) {
            return entry.id == typeid;
        });
        var pushdata = {
            "Cwlid": this.adminid,
            "companyId": this.companyId,
            "Address": this.sectorskils.controls.Caddress.value,
            "CompanyType": this.sectorskils.controls.CtypeName.value,
            "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
            "StateId": this.sectorskils.controls.Stateid.value,
            "DistrictId": this.sectorskils.controls.Districtid.value,
            "Userid": this.sectorskils.controls.Userid.value,
            "workLocationId": 0,
        };
        this.WorkLocation.push(pushdata);
        this.WorkLocationshow.push({
            "Username": this.users[0].userName,
            "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
            "Caddress": this.sectorskils.controls.Caddress.value,
            "CtypeName": typename[0]['companyType'],
            "Stateid": statename[0]['stateName'],
            "Districtid": districtname[0]['districtName'],

        });
        this.showlist = '1';
        this.displaytextBox = 0;
        this.sectorskils.reset();
        this.sectorskils.controls['Userid'].setValue('');
        this.sectorskils.controls['Stateid'].setValue('');
        this.sectorskils.controls['Districtid'].setValue('');
        this.sectorskils.controls['CtypeName'].setValue('');
        this.sectorskils.controls['CompanyTypeOther'].setValue('');
        this.sectorskils.controls['Caddress'].setValue('');
    }

    onItemDeleted(itemNo: number) {
        this.modalRef.hide();
        var index = this.WorkLocationshow.findIndex(function (o, index) {
            return index === itemNo;
        })
        if (index !== -1) {
            this.WorkLocationshow.splice(index, 1);
            this.WorkLocation.splice(index, 1);
        }
        if (this.WorkLocationshow.length === 0) {
            this.showlist = 0;
            this.WorkLocationshow = [];
            this.WorkLocation = [];
        }
    }

    getallprofilecompany(companyId: any, adminid: any) {
        this.spinnerService.show();
        this.CompanyProfileService.GetCompanyLocationdata(companyId, adminid).subscribe(res => {
            this.ShowCompanyData = res;
            if (this.ShowCompanyData != null) {
                this.spinnerService.hide();
                this.ShowCompanyData = this.ShowCompanyData.lstCompanyWorkLocation;
                this.showSectorskillForm = '0';
            }
            else {
                this.ShowCompanyData = [];
                this.spinnerService.hide();
            }
        });
    }

    SaveCompanyProfileData() {
        if (this.count == 1) {
            this.spinnerService.show();
            this.CompanyProfileService.SaveMultidata(this.WorkLocation).subscribe(res => {
                this.Responce = res;
                if (this.Responce != null) {
                    this.spinnerService.hide();
                    this.WorkLocationshow = [];
                    this.WorkLocation = [];
                    this.sectorskils.reset();
                    this.getallprofilecompany(this.companyId, this.adminid)
                    this.toasterService.success(this.Responce.message);
                    this.sectorskils.reset();
                    this.hidecompanyprofile = '1';
                }
                else {
                    this.Responce = [];
                    this.spinnerService.hide();
                }
            });
        }
        else {
            this.count = 0;
        }
        this.count++;
        this.showlist = '0';
        this.showSectorskillForm = '0';
        this.hidecompanyprofile = '1';
    }

    currentTime: any;
    endTime: any;
    finalCountdown: any;
    finalCountdown1: any;
    editcompanydetails(username: any, createdby: any, id: any, address: any, stateId: any, districtId: any, companyTypeOther: any, companyId: any, workLocationId: any, other: any) {
        this.profilesubmit = [];
        this.editid = true;
        this.showSectorskillForm = '1';
        this.hidecompanyprofile = '0';
        this.GetUserData(this.companyId);
        this.sectorskils.controls['Stateid'].setValue(stateId);
        this.sectorskils.controls['Userid'].setValue(createdby);
        this.GetNewDistrict(stateId);
        this.sectorskils.controls['Districtid'].setValue(districtId);
        this.sectorskils.controls['Caddress'].setValue(address);
        this.GetCompanyType();
        this.sectorskils.controls['CtypeName'].setValue(companyTypeOther);
        this.companyid = companyId;
        this.workLocationId = workLocationId;
        this.sid = id;
        if (companyTypeOther == "5") {
            this.displaytextBox = "1";
            this.sectorskils.controls['CompanyTypeOther'].setValue(other);
        }
        else {
            this.displaytextBox = "0";
        }
    }

    UpdateWorkLocation(id: any) {
        if (this.sectorskils.controls.Caddress.value.trim() == '') {
            this.toasterService.error("All mandatory fields are required")
            return false
        }
        if (this.companyTypeO == "5") {
            if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls['CtypeName'].value == '') {
                if (this.sectorskils.controls['CompanyTypeOther'].value == '') {
                    this.toasterService.error("Please enter the other value.");
                    return false;
                }
            }
        }
        var pushdata = {
            "Cwlid": this.adminid,
            "companyId": this.companyid,
            "Address": this.sectorskils.controls.Caddress.value,
            "CompanyType": this.sectorskils.controls.CtypeName.value,
            "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
            "StateId": this.sectorskils.controls.Stateid.value,
            "DistrictId": this.sectorskils.controls.Districtid.value,
            "userId": this.sectorskils.controls.Userid.value,
            "workLocationId": this.sid,
        };
        this.profilesubmit.push(pushdata);
        this.spinnerService.show();
        this.CompanyProfileService.SaveMultidata(this.profilesubmit).subscribe(res => {
            this.Responce = res;
            if (this.Responce != null) {
                this.spinnerService.hide();
                this.ShowCompanyData = [];
                this.profilesubmit = [];
                this.Removeaddbuttondata();
                this.toasterService.success(this.Responce.message);
                this.getallprofilecompany(this.companyid, this.adminid);
            }
            else {
                this.Responce = [];
                this.spinnerService.hide();
            }
        });
        this.hideupdate = '1';
        this.hidecompanyprofile = '1';
        this.showSectorskillForm = '0';
    }

    Removeaddbuttondata() {
        this.Showsectorbutton = '0'
        this.editid = true;
        this.showSectorskillForm = '0';
    }

    deletecompanydetail(UserID: any, workLocationId: any) {
        this.modalRef.hide();
        this.spinnerService.show();
        this.CompanyProfileService.DeleteCompanyProfile(UserID, workLocationId, this.adminid).subscribe(res => {
            this.Responce = res;
            if (this.Responce != null) {
                this.spinnerService.hide();
                this.hidecompanyprofile = '1';
                this.toasterService.success(this.Responce.message);
                this.getallprofilecompany(this.companyId, this.adminid);
            }
            else {
                this.spinnerService.hide();
                this.Responce = [];
            }
        });
    }

    employer_save(id: any) {
        if (this.companyTypeO == "5") {
            if (this.sectorskils.controls['CompanyTypeOther'].value == '' || this.sectorskils.controls['CtypeName'].value == '') {
                if (this.sectorskils.controls['CompanyTypeOther'].value == '') {
                    this.toasterService.error("Please enter the other value.");
                    return false;
                }
            }
        }
        var pushdata = {
            "AdminId": this.adminid,
            "companyId": this.companyId,
            "Address": this.sectorskils.controls.Caddress.value,
            "CompanyType": this.sectorskils.controls.CtypeName.value,
            "CompanyTypeOther": this.sectorskils.controls.CompanyTypeOther.value,
            "StateId": this.sectorskils.controls.Stateid.value,
            "DistrictId": this.sectorskils.controls.Districtid.value,
            "UserID": this.sectorskils.controls.Userid.value,
            "workLocationId": this.workLocationId,
        };
        this.profilesubmit.push(pushdata);
        this.spinnerService.show();
        this.CompanyProfileService.SaveMultidata(this.profilesubmit).subscribe(res => {
            this.Responce = res;
            if (this.Responce != null) {
                this.spinnerService.hide();
                this.editid = false;
                this.Removeaddbuttondata();
                this.toasterService.success(this.Responce.message);
                this.getallprofilecompany(this.companyId, this.adminid);
            }
            else {
                this.spinnerService.hide();
                this.Responce = [];
            }
        });
        this.hideupdate = '1';
        this.hidecompanyprofile = '1';
        this.showSectorskillForm = '0';
    }

    checkverifymail: boolean = false;
    emailvalues: any = '';
    emailcheckupdatecase(event: any) {
        this.emailvalues = event.target.value;
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (this.emailvalues.length > 0 && regexEmail.test(this.emailvalues)) {
            var emailsend = this.emailvalues;
            this.spinnerService.show();
            this.registService.CheckEmail(emailsend).subscribe(res => {
                this.Response = res;
                this.dbResponse = this.Response;
                if (this.dbResponse != null) {
                    this.spinnerService.hide();
                    if (this.dbResponse.responseResult) {
                        this.checkverifymail = true;
                    }
                    else {
                        this.toasterService.clear();
                        this.toasterService.error(this.dbResponse.message);
                        this.checkverifymail = false;
                        this.CompanyProfileForm.controls['email'].setValue('');
                    }
                } else {
                    this.spinnerService.hide();
                    this.toasterService.error(this.Response.message);
                    this.checkverifymail = false;
                    this.CompanyProfileForm.controls['email'].setValue('');
                }
            });
        }
    }
    mobilevalues: any = '';
    checkveriymobile: boolean = false;
    mobilecheckupdatecase(event: any) {
        this.mobilevalues = event.target.value;
        var mobilevalues = this.mobilevalues;
        var IndNum = /^[0]?[6789]\d{9}$/;
        if (this.mobilevalues.length == 10 && IndNum.test(this.mobilevalues)) {
            this.spinnerService.show();
            this.registService.CheckMobile(mobilevalues).subscribe(res => {
                this.Response = res;
                this.dbResponse = this.Response;
                if (this.dbResponse != null) {
                    this.spinnerService.hide();
                    if (this.dbResponse.responseResult) {
                        this.checkveriymobile = true;
                    }
                    else {
                        this.toasterService.clear();
                        this.toasterService.error(this.dbResponse.message);
                        this.checkveriymobile = false;
                        this.CompanyProfileForm.controls['mobile'].setValue('');
                    }
                } else {
                    this.spinnerService.hide();
                    this.toasterService.error(this.Response.message);
                    this.checkveriymobile = false;
                    this.CompanyProfileForm.controls['mobile'].setValue('');
                }
            });
        }
    }


    PushedTemplate(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    declineBox(): void {

        this.modalRef.hide();
    }

}
