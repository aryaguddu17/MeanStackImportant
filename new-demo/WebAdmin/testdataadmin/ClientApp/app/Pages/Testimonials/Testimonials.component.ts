import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { JobpostService } from '../../Services/jobpost.service';
import { UserManagementService } from '../../Services/UserManagement.service';
import { TestimonialsService } from '../../Services/Testimonials.service';
import { CustomValidators } from '../../Validators/custom-validator.directive';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../Services/registration.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-Testimonials',
  templateUrl: './Testimonials.component.html'
})
export class TestimonialsComponent implements OnInit {
  public popoverTitle: string = '';
  public popoverMessage: string = 'Are you sure you want to delete';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  modalRef: BsModalRef;

  delay: boolean = false;
  viewfalse: any = 1;
  from: any;
  data: any;

  Response: any = [];
  alluserdetail: any = [];
  singleuserdetail: any = [];
  deleteuser: any = [];
  singleuserupdatedetails: any = [];
  singleusereditdetails: any = [];
  item: any;
  Usermanagementid: any;
  cardview: any = '1';
  formview: any = '1';
  singledetailsview: any = '1';
  Editview: any = '1';
  pageNumber: number = 0;
  Testimonialform: FormGroup;
  Testimonialfilter: FormGroup;
  Userdata: any = '';
  Adminid: any;
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private http: Http,
    private JobpostService: JobpostService,
    private https: HttpClientModule,
    private toasterService: ToastrService,
    private registService: RegistrationService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private UserManagementService: UserManagementService,
    private TestimonialsService: TestimonialsService,
    private router: Router) {
  }

  // @HostListener('window:scroll', ['$event'])
  // scrollHandler(event) {
  //   if ($(window).scrollTop() >= ($(document).height() - $(window).height()) * 0.8) {
  //     let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  //     let max = document.documentElement.scrollHeight;
  //     if (pos >= (0.8 * max)) {
  //       if (this.delay) {
  //         return
  //       }
  //       this.delay = true;
  //       if (this.alluserdetail.length >= 10 && this.viewfalse == 1) {
  //         this.pageNumber = this.pageNumber + 1;
  //         // this.AllTestimonialdDetails(this.pageNumber, 'scroll', this.Userdata);
  //         this.AllTestimonialdDetails(this.getdatabytestimonialid);
  //       }
  //     }
  //   }
  // }

  ngOnInit() {
    $('.page-filters h2 a').click(function () {
      $(this).find('i').toggleClass('fa-chevron-down fa-chevron-right');
      $(this).parent().parent().find('.filter-wrapper').slideToggle();
    });
    $('.filter-toggle').click(function () {
      $('.filter-wrapper').slideToggle();
    });

    this.item = localStorage.getItem('phpadminid');
    this.Adminid = JSON.parse(this.item);

    this.Testimonialform = this.formBuilder.group({
      'title': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'name': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'description': ['', [Validators.required, , Validators.compose([CustomValidators.removeSpaces])]],
      'Testimonialimage': ['', [Validators.required]],
    });

    this.Testimonialfilter = this.formBuilder.group({
      'title': ['', Validators.nullValidator],
      'name': ['', Validators.nullValidator],
      'search': ['', Validators.nullValidator],
    });
    // this.AllTestimonialdDetails(0, '', this.Testimonialfilter);
    this.AllTestimonialdDetails(this.getdatabytestimonialid);
  }

  // *************Testimonial Add(Rajeev Jha on 14:6:19)*******
  Testmonialsc: any = 1;
  TestimonialAdd(data) {

    // ********* Condition to remove the space *****************
    if (this.Testimonialform.controls.title.value.trim() == '') {
      this.toasterService.error("Please enter title.")
      return false;
    }

    if (this.Testimonialform.controls.name.value.trim() == '') {
      this.toasterService.error("Please enter name.")
      return false;
    }

    if (this.Testimonialform.controls.description.value.trim() == '') {
      this.toasterService.error("Please enter description.")
      return false;
    }

    // ********* Condition to remove the space End Here **********

    if (this.Testimonialform.valid) {
      var title = data.title;
      var name = data.name;
      var description = data.description;
      // var Testimonialimage = data.Testimonialimage;
      // var senddata = {
      //   // 'Adminid': this.Adminid,
      //   'Title':title,
      //   'Name': name,
      //   'Description': description,
      //   'Imagename':this.ImgName,
      //   'Imgext':this.ImgExtention,
      //   'Imgpath': this.ImgPath,
      // }

      var getsenddatabyid = { 'Name': name, 'Designation': title, 'Comment': description, 'Adminid': this.Adminid }
      var lstImage1 = { 'TestimonialImagepath': this.ImgPath, 'TestimonialImageExt': this.ImgExtention, 'TestimonialImageName': this.ImgName }
      var lstImage = JSON.stringify(lstImage1);
      let getserializeddatabyid = JSON.stringify(getsenddatabyid);

      let getdatabylogind = {
        'HSTPLRequest': {
          'data': getserializeddatabyid,
          'typeFor': 'Settestimonial',
          'lstImage': lstImage
        }
      }

      this.spinnerService.show();
      if (this.Testmonialsc == 1) {
        this.TestimonialsService.TestimonialAdd(getdatabylogind).subscribe(res => {
          this.Response = res;

          if (this.Response.hstplResponse != null) {
            this.spinnerService.hide();
            this.Response = this.Response.hstplResponse.message;
            this.Testimonialform.reset();
            // this.toasterService.success("Testimonial data added successfully.");
            this.toasterService.success(this.Response);
            this.cardview = 1;
            this.formview = 1;
            // this.AllTestimonialdDetails(0, '', this.Testimonialfilter);
            this.AllTestimonialdDetails(this.getdatabytestimonialid);
          } else {
            this.Response = [];
            this.spinnerService.hide();
          }
        });
      }

    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
    this.Testmonialsc++;
  }

  img: any;
  base64textString: any = [];
  imgtype: any;
  currentFile: any;
  ValidImageTypes: any;
  imagename: any;
  onUploadChange(evt: any, selectFile: any) {
    this.img = selectFile;
    this.base64textString = [];
    var file: File = evt.target.files[0];
    this.currentFile = file;
    var imagetype = this.currentFile.type.split('/');
    let ValidImageExt = ["jpeg", "png", "jpg"];
    this.imgtype = imagetype[1];
    if ($.inArray(imagetype[1], ValidImageExt) < 0) {
      this.toasterService.error("Only formats are allowed : jpg, jpeg, png ");
      this.Testimonialform.controls['Testimonialimage'].setValue('');
      return false;
    }
    this.ValidImageTypes = ["image/jpeg", "image/png", "image/jpg"];
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
      this.Testimonialform.controls.Testimonialimage.setValue('');
      return false
    } else {
      var reader = new FileReader();
      var size = Math.round(this.currentFile.size / 1024);
      if (size > 2000) {
        this.toasterService.error("File Size must be less then 2 MB", null, { enableHtml: true });
        this.Testimonialform.controls.Testimonialimage.setValue('');
        return false;
      }
      reader.onloadend = this.handleReaderLoaded.bind(this);
      var data = reader.readAsBinaryString(this.currentFile);
    }
  }
  imagenameshow: any;
  ImgExtention: any = '';
  ImgName: any = '';
  ImgPath: any = "";
  handleReaderLoaded(e) {
    var imn = this.currentFile.name;
    this.imagenameshow = this.currentFile.name;
    var imn2 = imn.split('.');
    this.ImgExtention = '.' + imn2[1];
    this.ImgName = imn2[0];

    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));//used to get image on select image form

    // for (var i = 0; i < this.base64textString.length; i++) {
    this.ImgPath = '';
    // this.ImgPath = this.base64textString[i]
    this.ImgPath = 'data:image/png;base64,' + btoa(e.target.result);
    // }
    // this.Testimonialform.controls['Testimonialimage'].setValue("");
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


  UserRegister() {
    this.Testmonialsc = 1;
    this.viewfalse = 0;
    this.Testimonialform.reset();
    this.cardview = 0;
    this.formview = 0;

    this.base64textString = [];//Use to blank the image history
    this.ImgExtention = '';
    this.ImgName = '';
    this.ImgPath = '';
    this.imagenameshow = '';
  }
  Back() {
    this.cardview = 1;
    this.formview = 1;
    this.Testimonialform.reset();

    this.base64textString = [];
    this.ImgExtention = '';
    this.ImgName = '';
    this.ImgPath = '';
    this.imagenameshow = '';
  }
  Close() {
    this.viewfalse = 1;
    this.cardview = 1;
    this.formview = 1;
    this.Testimonialform.reset();

    this.base64textString = [];
    this.ImgExtention = '';
    this.ImgName = '';
    this.ImgPath = '';
    this.imagenameshow = '';
  }
  singleback() {
    this.cardview = '1';
    this.formview = '1';
    this.singledetailsview = '1';
  }
  updateback() {
    this.cardview = '1';
    this.singledetailsview = '1';
    this.Editview = '1';
  }


  id: any = '';
  SingleUserRegistrationDetails(id) {
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '0';
    this.id = id;
    localStorage.setItem('usermanagementid', JSON.stringify(id));
    var senddata = {
      'Adminid': this.Adminid,
      'Id': id
    }
    this.spinnerService.show();
    this.JobpostService.SingleUserRegistrationDetails(senddata).subscribe(res => {
      this.singleuserdetail = res;
      if (this.singleuserdetail != null) {
        this.spinnerService.hide();
        this.singleuserdetail = this.singleuserdetail.Data;
      } else {
        this.singleuserdetail = [];
        this.spinnerService.hide();
      }
    });
  }

  userid: any;
  Testimonialedit(id) {

    this.viewfalse = 0;
    this.cardview = '0';
    this.formview = '1';
    this.singledetailsview = '1';
    this.Editview = '0';
    this.userid = id;
    var senddata = {
      'Adminid': this.Adminid,
      'Id': this.userid
    }
    this.spinnerService.show();

    this.JobpostService.SingleUseredit(senddata).subscribe(res => {
      this.singleusereditdetails = res;
      if (this.singleusereditdetails != null) {
        this.spinnerService.hide();
        this.singleusereditdetails = this.singleusereditdetails.Data;
      } else {
        this.singleusereditdetails = [];
        this.spinnerService.hide();
      }
      this.Testimonialform.controls['name'].setValue(this.singleusereditdetails[0].FIRSTNAME);
      this.Testimonialform.controls['email'].setValue(this.singleusereditdetails[0].EMAIL);
      this.Testimonialform.controls['mobile'].setValue(this.singleusereditdetails[0].PHONENO);
      this.Testimonialform.controls['username'].setValue(this.singleusereditdetails[0].USERNAME);
      this.Testimonialform.controls['designation'].setValue(this.singleusereditdetails[0].DESIGNATION);
    });

  }
  Updateuser(data) {
    this.viewfalse = 0;
    if (this.Testimonialform.controls.name.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }
    if (this.Testimonialform.controls.designation.value.trim() == '') {
      this.toasterService.error("All mandatory fields are required.")
      return false;
    }

    if (this.Testimonialform.valid) {
      var usermanagementid = this.userid;
      var name = data.name;
      var email = data.email;
      var mobile = data.mobile;
      var username = data.username;
      var designatiom = data.designation
      var senddata = {
        'Adminid': this.Adminid,
        'Usermanagementid': usermanagementid,
        'Name': name,
        'Email': email,
        'Mobile': mobile,
        'Username': username,
        'Designation': designatiom
      }
      this.spinnerService.show();
      this.JobpostService.Updateuser(senddata).subscribe(res => {
        this.Response = res;
        if (this.Response != null) {
          this.spinnerService.hide();
          this.Response = this.Response.Data;
          this.Testimonialform.reset();
          this.toasterService.success("User has been updated successfully.");
          this.viewfalse = 1;
          this.cardview = 1;
          this.Editview = 1;
          // this.AllTestimonialdDetails(0, '', this.Userdata);
          this.AllTestimonialdDetails(this.getdatabytestimonialid);
        } else {
          this.Response = [];
          this.spinnerService.hide();
        }
      });
    }
    else {
      this.toasterService.error("All mendatory fields are required");
    }
  }

  dbResponse: any;

  onlyNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  PushedTemplate(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  declineBox(): void {

    this.modalRef.hide();
  }
  senddatatogetteslist: any;
  getdatabytestimonialid: any;
  alluserdetailget: any = [];
  Mobile: any = '';
  Email: any = '';
  JobKeyword: any = '';
  testimonialdata: any = [];
  testimonialimage: any = [];
  // AllTestimonialdDetails(pageNumber, from, data) {
  AllTestimonialdDetails(data) {
    this.id = 0;
    this.Userdata = data;
    this.Testimonialfilter.controls.search.value
    // if (this.Userdata.Email != undefined) {
    //   this.Email = this.Userdata.Email;
    // }
    // else {
    //   this.Email = '';
    // }
    if (this.Testimonialfilter.controls.search.value != undefined) {
      this.JobKeyword = this.Testimonialfilter.controls.search.value;
    }
    else {
      this.JobKeyword = '';
    }
    // if (this.Userdata.Mobile != undefined) {
    //   this.Mobile = this.Userdata.Mobile;
    // }
    // else {
    //   this.Mobile = '';
    // }
    //this.pageNumber = pageNumber
    var senddata = {
      'eventId': 0,
      //'Mobile': this.Mobile,
      // 'Email': this.Email,
       'jobKeyword': this.JobKeyword,
      // 'Pagenumber': pageNumber
    }
    let getserializeddatabyid = JSON.stringify(senddata);

    this.getdatabytestimonialid = {
      'HSTPLRequest': {
        'clientKey': "",
        'data': getserializeddatabyid,
        'typeFor': 'Gettestimonial',
        //'lstImage': lstImage
      }
    }
    //console.log(getdatabytestimonialid);
    // alert(JSON.stringify(this.getdatabytestimonialid))
    // console.log(getdatabylogind);
    // if (from == 'scroll') {
    //   this.spinnerService.show();
    //   this.TestimonialsService.AllTestimonialdDetails(this.senddatatogetteslist).subscribe(res => {
    //     this.dbResponse = res;
    //     if (this.dbResponse != null) {
    //       this.spinnerService.hide();
    //       this.alluserdetail = this.alluserdetail.concat(this.dbResponse.Data);
    //     }
    //     this.delay = false;
    //   });
    // }
    // else {
    this.spinnerService.show();
    this.TestimonialsService.AllTestimonialdDetails(this.getdatabytestimonialid).subscribe(res => {
      this.dbResponse = res;
      //  console.log(this.dbResponse)
      if (this.dbResponse.hstplResponse != null) {
        this.spinnerService.hide();
        // this.alluserdetail = this.dbResponse.Data;

        this.testimonialdata = JSON.parse(this.dbResponse.hstplResponse.data);

        this.testimonialimage = JSON.parse(this.dbResponse.hstplResponse.lstImage);
        // console.log(this.testimonialimage);


      } else {
        this.alluserdetail = [];
        this.spinnerService.hide();
      }
      this.delay = false;
      this.from = '';
    });
    // }
    // this.from = '';
  }

  ResetUser() {
    this.Testimonialfilter.controls.title.setValue('');
    this.Testimonialfilter.controls.name.setValue('');
    this.Testimonialfilter.controls.search.setValue('');
    // this.AllTestimonialdDetails(0, '', this.Testimonialfilter);
    this.AllTestimonialdDetails(this.getdatabytestimonialid);
  }
  SendData: any;
  DeleteTestomonial(Id: any) {
    var para = {
      "testimonialId": Id,
    }
    var parasend = JSON.stringify(para);
    this.SendData = {
      'HSTPLRequest': {
        "clientKey": "",
        'data': parasend,
        'typeFor': 'DeleteTestimonial'
      }
    }
    this.spinnerService.show();
    this.TestimonialsService.DeleteTestimonial(this.SendData).subscribe(res => {
      this.dbResponse = res;
      if (this.dbResponse.hstplResponse != null) {
        this.spinnerService.hide();
        this.toasterService.success("Testimonial deleted successfully");
        this.AllTestimonialdDetails(this.getdatabytestimonialid);

      }
      else {
        this.spinnerService.hide();
        this.toasterService.success(this.dbResponse.hstplResponse.message);
      }
    });
    this.modalRef.hide();

  }
}