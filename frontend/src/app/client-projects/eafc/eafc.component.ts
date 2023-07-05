import { Component, Renderer2, ElementRef, HostListener } from '@angular/core';



@Component({
  selector: 'app-eafc',
  templateUrl: './eafc.component.html',
  styleUrls: ['./eafc.component.css']
})
export class EafcComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

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


