import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
})
export class SideNavContentComponent {

  public path = PATH;

  @Input()
  privilegeLevel!: number;

  @Input()
  userRole!: string;

  @Input()
  userName!: string;
  
  @Input()
  userId!: number;

  constructor(
    private dataService: DataService,
    private toastrService: ToastrService
  ) { }

  public exportSeeds(): void {
    this.dataService.exportSeeds().subscribe((res) => {
      const msg: any = res;

      if (msg.message == 'Script executed successfully!') {
        this.toastrService.success('Seeds exported successfully!');
      } else {
        this.toastrService.error('Seeds export failed!');
      }
    });
  }
}
