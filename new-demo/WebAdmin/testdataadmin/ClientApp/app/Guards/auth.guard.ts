import { HostListener, Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from '../Globals/app.config';
@Injectable()
export class AuthGuard implements CanActivate {
  lsUserInfo: any;
  ckUserInfo: any;
  constructor(private router: Router, private config: AppConfig, private _cookieService: CookieService
  ) { }

  canActivate() {
    
    const host = window.location.host;
    if (this._cookieService.get('UserInfo') != null) {
      this.ckUserInfo = JSON.stringify(this._cookieService.get('UserInfo'));
      if (localStorage.getItem('UserInfo')) {
        this.lsUserInfo = this.config.UserInfo;
        if (this.lsUserInfo.token === this.ckUserInfo.token) {
          //if (this.lsUserInfo.stateID!='' || this.lsUserInfo.districtID!='') {
          //  this.router.navigate(['/updateprofile']);
          //}
          //const exp = this.lsUserInfo.ExpiresIn;
          //const ctime = Date.now() / 1000;
          //const ctimefix = parseInt(ctime.toFixed(0), 10);
          //if (exp < ctimefix) {
          //  localStorage.removeItem('UserInfo');
          //  this._cookieService.deleteAll('/', this.config.DomainName);
          //  this.router.navigate(['/']);
          //  return false;
          //} else {
          return true;
          //}

          //   var myCookie = this._cookieService.get('UserInfo');
          //if (username != null && username != "") {
          //  username = "0";
          //  setCookie("username", username, 1000);
          //}
          //else {
          //  username = " ";
          //  if (username != null && username != "") {
          //    username = "0";
          //    setCookie("username", username, 1000);
          //  }
          //}

        } else {
          this.config.UserInfoDetails();
          return true;
          //localStorage.removeItem('UserInfo');
          //this._cookieService.deleteAll('/', this.config.DomainName);
          //this.router.navigate(['/']);
          //// location.reload();
          //return false;
        }

      } else {
        localStorage.removeItem('UserInfo');
        this._cookieService.deleteAll('/', this.config.DomainName);
        this.router.navigate(['/']);
        // location.reload();
        return false;
      }

    }
  }
}
//@Injectable()
//export class CanDeactivateGuardAPT implements CanDeactivate<ComponentCanDeactivateAPT> {
//   canDeactivateAPT(component: ComponentCanDeactivateAPT): boolean {
//    if (!component.canDeactivateAPT()) {
//      if (confirm("Your Online examination running! If you leave to click ok button other otherwise cancel button.")) {
//        return true;
//      } else {
//        return false;
//      }
//    }
//    return true;
//  }
//}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {
    if (!component.canDeactivate()) {
      if (confirm("Your Online examination running! If you leave to click ok button other otherwise cancel button.")) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}


export abstract class ComponentCanDeactivate {
  abstract canDeactivate(): boolean;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}


  //export abstract class ComponentCanDeactivateAPT {
  //abstract canDeactivateAPT(): boolean;
  //@HostListener('window:beforeunload', ['$event'])
  //unloadNotification($event: any) {
  //  if (!this.canDeactivateAPT()) {
  //    $event.returnValue = true;
  //  }
  //}


