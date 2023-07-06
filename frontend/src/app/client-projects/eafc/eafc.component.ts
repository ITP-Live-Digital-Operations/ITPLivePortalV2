import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-eafc',
  templateUrl: './eafc.component.html',
  styleUrls: ['./eafc.component.css']
})
export class EafcComponent {

  slides: SafeResourceUrl[] = [];



  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 4,
    "arrows": true,
    "dots": true,
    "autoplay": true,
    "autoplaySpeed": 200,
    "infinite": true,
  };


  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private sanitizer: DomSanitizer) {

    this.slides = [
      this.getSafeUrl('https://www.youtube.com/embed/vHTfNq4nskY'),
      this.getSafeUrl('https://www.youtube.com/embed/WkELiTPMD08'),
      this.getSafeUrl('https://www.youtube.com/embed/9wb953GGrgI'),
      this.getSafeUrl('https://www.youtube.com/embed/K9I1LiXxPAk'),
    ]

   }

   private getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    let nav = this.el.nativeElement.querySelector('nav');
    if (windowScroll > 0){
        this.renderer.addClass(nav, 'sticky');
    } else {
        this.renderer.removeClass(nav, 'sticky');
    }
}


}


