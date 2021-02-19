import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from '../../../../Globals/app.config';
import { Http, Headers, RequestOptions, Request, Response, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { UserInfoService } from '../../../../Services/userInfo.service.';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';

@Component({
    selector: 'app-Left-Sidebar',
    templateUrl: './Left-Sidebar.Component.html'
})
export class LeftSidebar {
    UserInfo: any;
    loginType: any = "Agency";
    constructor(private appConfig: AppConfig,
        private router: Router) {
        this.UserInfo = appConfig.UserInfo;
        // this.loginType=this.UserInfo.loginType;

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this.router.navigated = false;
                // console.log('current route: ', router.url.toString());
                // window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() {
        var adminid = JSON.parse(localStorage.getItem('phpadminid'));
        if (adminid == '' || adminid == null) {
            this.router.navigate(['/']);
        }
        else {
            $(document).ready(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $('#content').toggleClass('active');
                });
            });

            //add active navigations
            $(function () {
                var current = location.pathname;
                $('.page-Submenu li a').each(function () {
                    var $this = $(this);
                    // if the current path is like this link, make it active
                    if ($this.attr('href').indexOf(current) !== -1) {
                        $(this).parent().addClass('active');
                        $(this).parent().parent().toggleClass('in');
                        $(this).parent().parent().siblings('a').attr("aria-expanded", "true");
                        //$(this).addClass('active');
                    }
                });
            });
        }
    }
}




