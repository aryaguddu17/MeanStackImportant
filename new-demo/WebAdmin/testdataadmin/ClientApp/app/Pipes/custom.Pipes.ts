import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

//@Pipe({
//  name: 'limitTo'
//})
//@Pipe({
//    name: 'myfilter'
//})

//@Injectable()
//export class SearchFilterPipe implements PipeTransform {
//  //transform(items: any[], field: string, value: string): any[] {
//  //  if (value != null && value != "")
//  //    //return items.filter(it => it[field] == value);
//  //  return items.filter(item => item[field].toLowerCase().indexOf(value.toLowerCase()) !== -1);
//  //  else
//  //    return items;
//  //}
//  transform(value: string, args: string): string { 
//    let limit = args ? parseInt(args, 10) : 10;
//    let trail = '...';
//    return value.length > limit ? value.substring(0, limit) + trail : value;
//  }
//  transform1(items: any[], filter: Object): any {
//    if (!items || !filter) {
//      return items;
//    }
//    // filter items array, items which match and return true will be
//    // kept, false will be filtered out
//    return items.filter(item => item.title.indexOf(filter) !== -1);
//  }
//}
 



//@Pipe({
//  name: 'safeHtml'
//})
//export class Safe implements PipeTransform {

//  constructor(protected sanitizer: DomSanitizer) { }

//  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//    switch (type) {
//      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//      default: throw new Error(`Invalid safe type specified: ${type}`);
//    }
//  }
//}
 
@Pipe({
  name: 'toFloat'
})
export class IntToFloat implements PipeTransform {
  transform(value: number): any {
    return value.toFixed(2)
  }
}


@Pipe({
  name: 'DateFormatPipe',
})
export class DateFormatPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    let d = new Date(date)
    return moment(d).format('DD/MM/YYYY')

  }

//  //transform(value: string) { 
//  //  var datePipe = new DatePipe("en-US");
//  //  value = datePipe.transform(value, 'dd/MM/yyyy');
//  //  return value;
//  //}
}

//@Pipe({
//  name: 'TimeFormatPipe',
//})
//export class TimeFormatPipe implements PipeTransform {
//  transform(input: any): any {

//    var seconds = input % 60;
//    var minutes = Math.floor(input % 3600 / 60);
//    var hours = Math.floor(input / 3600);
//    return (this.z(hours) + ':' + this.z(minutes) + ':' + this.z(seconds)); 
//  }
//     z(n) { return (n < 10 ? '0' : '') + n; }
//  //transform(value: string) { 
//  //  var datePipe = new DatePipe("en-US");
//  //  value = datePipe.transform(value, 'dd/MM/yyyy');
//  //  return value;
//  //}
//}





//@Pipe({
//  name: 'striphtml'
//})

//export class StripHtmlPipe implements PipeTransform {
//  transform(value: string): any {
//    return value.replace(/<.*?>/g, ''); // replace tags
//  }
//}
