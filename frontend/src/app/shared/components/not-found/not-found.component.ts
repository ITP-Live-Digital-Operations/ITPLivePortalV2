import { Component, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
 protected back(){
    window.history.back();
  }

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.toastr.error(' Click to go back', '404 Error');
  }
}
