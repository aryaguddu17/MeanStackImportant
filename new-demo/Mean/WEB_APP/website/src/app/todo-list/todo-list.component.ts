import { Component, OnInit, ViewChild, ElementRef, Renderer, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { WebStorage } from 'src/app/core/utility/web.storage';
import { HttpClient } from '@angular/common/http'
import { Lightbox } from 'ngx-lightbox';
declare let swal: any
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ReturnStatement } from '@angular/compiler';
import { TodoService } from '../services/todo.service';
import { appConfig } from '../core/constant/app.config';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  userDetails: any;
  public params: any = {
    page: 1,
    count: appConfig.perPageDefault,
    searchText: '',
    organizationId: ''
  };


  constructor(private todoService: TodoService, public renderer: Renderer, private sanitizer: DomSanitizer, private _lightbox: Lightbox, public user: UsersService, private http: HttpClient, public storage: WebStorage) {

    this.userDetails = this.storage.get('user');
    // this.params.organizationId = this.userDetails.defaultOrg.organization._id;

  }

  userData: any;
  ngOnInit() {
    this.setTab(0);
    this.setTabPage(0);

    this.getUserFbPages();

    // this.user.loggedin().subscribe(res => {
    //   if (res.code == appConfig.statusCode.ok) {
    //     var objtoken = {
    //       userId: res.user._id,
    //       userOrgId: res.user.defaultOrg.organization._id
    //     }
    //     this.userData=objtoken;
    //     this.getUserFbPages(objtoken);
    //   }
    // });
  }

  tab1: any;
  tab: any;
  setTab(tabId) {
    this.tab1 = tabId;
    this.tab = tabId;
    this.setTabPage(0);
  }

  isSet(tabId) {
    if (this.tab1 === tabId) {
      return true;
    }
  }

  tab2: any;
  tab3: any;
  setTabPage(tabId) {
    this.tab2 = tabId;
    this.tab3 = tabId;
  }

  isSetPage(tabId) {
    if (this.tab2 === tabId) {
      return true;
    }
  }

  httpCall: boolean = false;
  totalCount: any = 0;
  feeds: any;
  pages: any = [];
  getUserFbPages() {
    this.httpCall = true;
    this.listLoader = true;
    this.todoService.Todo_Get().subscribe(response => {
      this.httpCall = false
      if (response.ResponseCode == appConfig.statusCode.ok) {
        this.listLoader = false;
        this.pages = response.ResponseBodyText.data;
        debugger
        this.getUserFbInboxs(this.pages[0].access_token, this.pages[0].id);
        debugger
      } else {
        this.listLoader = false;
        this.pages = [];

      }
    });

  }

  inboxs: any = [];
  inboxsdata: any = [];
  inboxLoader: boolean = false;
  getUserFbInboxs(objtoken, pageid) {
    debugger
    this.inboxLoader = true;
    var objtokenData = {
      access_token: objtoken,
      page_id: pageid
    };
    debugger
    this.httpCall = true;
    this.todoService.Inbox_Get(objtokenData).subscribe(res => {
      this.httpCall = false
      console.log('frontend', res);
      if (res.ResponseCode == appConfig.statusCode.ok) {
        this.inboxLoader = false;
        debugger
        // console.log('dfdffdf\n', res.data.facebook_feeds);
        // this.totalCount = res.data.totalCount;
        this.inboxsdata=[];
        this.inboxsdata = res.ResponseBodyText.data;
        this.getUserFbPostedData(objtokenData);
      } else {
        this.inboxs = [];
        this.inboxLoader = false;
      }
    });
  }

  postLoader: boolean = false;
  getUserFbPostedData(objtoken) {
    this.postLoader = true;
    this.httpCall = true;
    this.todoService.getUserFbPostedData(objtoken).subscribe(res => {
      this.httpCall = false
      if (res.ResponseCode == appConfig.statusCode.ok) {
        // this.totalCount = res.data.totalCount;
        // this.feeds = res.data.facebook_feeds.data;
        this.postedData = res.ResponseBodyText.data;
        this.inboxs = [];
        if (this.postedData.length > 0) {
          this.inboxs = this.inboxsdata;
          this.postLoader = false;
          this.inboxLoader=false;
          this.getUserFbPostedSingleData(this.postedData[0].id);
        } else {
          this.postLoader = false;
          this.inboxLoader=false;
          this.inboxs = [];
          this.inboxsdata = [];
          this.feeds = [];
        }
      } else {
        this.postLoader = false;
        this.feeds = [];
      }
    });
  }

  postedData: any = [];
  commentsCount: any = 0;
  likesCount: any = 0;
  comments: any = [];
  loadPrevious: boolean = false;
  loadDataLimit: boolean = false;
  listLoader: boolean = false;
  getUserFbPostedSingleData(posteddata) {
    debugger
    let posts = (this.postedData).filter(function (entry) {
      return entry.id == posteddata;
    })
    debugger
    if (posts != '' && posts != undefined) {
      this.feeds = posts;
      this.postLoader = false;
      if (posts[0].comments != '' && posts[0].comments != undefined) {
        this.commentsCount = posts[0].comments.data.length;
      }else{
        this.commentsCount=0;
      }

      if (posts[0].likes != '' && posts[0].likes != undefined) {
        this.likesCount = posts[0].likes.data.length;
      }else{
        this.likesCount=0;
      }

      debugger
      if (this.commentsCount > 2) {
        this.loadPrevious = false;
      } else {
        this.postLoader = false;
        this.loadPrevious = true;
      }
      // this.comments = posts[0].comments.data;
      if (posts[0].comments != '' && posts[0].comments != undefined) {
        this.comments = posts[0].comments.data;
      }else{
        this.comments=[];
      }
      
    } else {
      this.postLoader = false;
      this.feeds = [];
    }
  }
  loadAllComments() {
    // $('.postImgs').slideToggle();
    //  $('html, body').animate({scrollTop: $(document).height()}, 'slow');
    //   $('html, body').animate({
    //     scrollBottom: 1000
    // }, 2000);
    // $('html, body').animate({
    //   scrollTop: $("#postImgs").offset().top
    // }, 500);

    //  $("#postImgs").animate({ scrollTop: $('#postImgs').prop("scrollHeight")}, 1000);

    // $('#postComments').scrollTop($('#postComments')[0].scrollHeight);

    if (!this.loadPrevious) {
      this.loadPrevious = true;
    } else {
      this.loadPrevious = false;
    }

  }
  open(feed): void {
    let i: number;
    let albums = [];
    if (feed.attachments.data[0].subattachments.data.length > 0) {
      if (Array.isArray(feed.attachments.data[0].subattachments.data)) {
        for (i = 0; i < feed.attachments.data[0].subattachments.data.length; i++) {
          if (feed.attachments.data[0].subattachments.data[i].media) {
            const src = feed.attachments.data[0].subattachments.data[i].media.image.src;
            const caption = feed.name;
            const thumb = feed.attachments.data[0].subattachments.data[i].media.image.src;
            const album = {
              src: src,
              caption: caption,
              thumb: thumb
            };

            albums.push(album);
          }
        }
      } else {
        const src = feed.attachments.data[0].subattachments.data.media.image.src;
        const caption = feed.name;
        const thumb = feed.attachments.data[0].subattachments.data.media.image.src;
        const album = {
          src: src,
          caption: caption,
          thumb: thumb
        };

        albums.push(album);
      }

    }
    this._lightbox.open(albums);
  }
  openmod(attachmentdata): void {

    let i: number;
    let albums = [];
    if (Array.isArray(attachmentdata)) {
      if (attachmentdata.length > 0) {
        for (i = 0; i < attachmentdata.length; i++) {
          if (attachmentdata[i].media) {
            const src = attachmentdata[i].media.image.src;
            const caption = '';
            const thumb = attachmentdata[i].media.image.src;
            const album = {
              src: src,
              caption: caption,
              thumb: thumb
            };
            albums.push(album);
          }
        }
      }
    } else {
      if (attachmentdata.media) {
        const src = attachmentdata.media.image.src;
        const caption = '';
        const thumb = attachmentdata.media.image.src;
        const album = {
          src: src,
          caption: caption,
          thumb: thumb
        };
        albums.push(album);
      }
    }
    this._lightbox.open(albums);
  }
  close(): void {
    this._lightbox.close();
  }
  remainigMoreImages(total) {
    let remaining = Math.abs(total - 1);
    return '+ ' + remaining;
  }


}
