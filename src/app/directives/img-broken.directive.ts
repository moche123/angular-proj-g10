import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {
  errorImg = 'assets/errorimg.png'
  constructor( private elementRef:ElementRef, private renderer: Renderer2 ) { 
    console.log('HELLO FROM DIRECTIVE')
  }

  @HostListener('error')
  private onError() {
    this.renderer.setAttribute(this.elementRef.nativeElement,"src",this.errorImg)
    // this.renderer.setStyle(this.elementRef.nativeElement,"max-width",'150px')
  }

 


}
