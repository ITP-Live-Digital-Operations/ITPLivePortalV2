import { Component, Input } from '@angular/core';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';

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

  @Input()
  onLeave!: boolean;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private dialogService: ConfirmationDialogService
  ) {}

  public exportSeeds(): void {
    /* this.dataService.exportSeeds().subscribe((res) => {
      const msg: any = res;

      if (msg.message == 'Script executed successfully!') {
        this.toastrService.success('Seeds exported successfully!');
      } else {
        this.toastrService.error('Seeds export failed!');
      }
    }); */
  }

  ngOnChanges() {}

  goOnLeave() {
    this.dialogService
      .openConfirmationDialog(
        'Confirm!',
        'Are you sure you want to go on leave?',
        'yesno'
      )
      .subscribe((result) => {
        if (result == true) {
          this.userService.goOnLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are on leave now!');
            if (this.userId == 15) {
              this.userService.addTalentHead(24).subscribe((res) => {
                window.location.reload();
              });
            }else{
              window.location.reload();
            }
          });

        }
      });
  }

  returnFromLeave() {
    this.dialogService
      .openConfirmationDialog(
        'Confirm!',
        'Are you sure you want to return to work?',
        'yesno'
      )
      .subscribe((result) => {
        if (result == true) {
          this.userService.returnFromLeave(this.userId).subscribe((res) => {
            this.toastrService.success('You are back from leave!');

            if (this.userId == 15) {
              this.userService.removeTalentHead(24).subscribe((res) => {window.location.reload();});
            }else{
              window.location.reload();
            }
          });

        }
      });
  }
}
