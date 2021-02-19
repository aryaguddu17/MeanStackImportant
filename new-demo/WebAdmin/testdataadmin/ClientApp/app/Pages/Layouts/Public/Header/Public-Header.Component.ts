import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../../Services/authenticate.service';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from '../../../../Globals/app.config';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-PublicHeader',
  templateUrl: './Public-Header.Component.html'
})
export class PublicHeaderComponent { 
  constructor( 
  ) {
  } 
  ngOnInit() { 
  } 
}
