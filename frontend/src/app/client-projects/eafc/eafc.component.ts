import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-eafc',
  templateUrl: './eafc.component.html',
  styleUrls: ['./eafc.component.css']
})
export class EafcComponent {

  constructor(private renderer: Renderer2, private el: ElementRef, private sanitizer: DomSanitizer) {

  }

  youtubeVideos = [
    'YXPyB4XeYLA',
    'X1oIG9sWRbk',
    'qjrwwV-bMTI',
  ]



  getSafeVideoUrl(videoId: string): SafeResourceUrl {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
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


