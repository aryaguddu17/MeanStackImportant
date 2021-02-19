import { Directive, HostListener } from '@angular/core';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor(
    private toasterService: ToastrService,
  ) { }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    //this.toasterService.error("For Security Purpose Paste option is Disabled")
    e.preventDefault();
  }

  // @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
  //   e.preventDefault();
  //  // this.toasterService.error("For Security Purpose Copy option is Disabled")
   
    
  // }

  // @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
  //   e.preventDefault();
  // }
}