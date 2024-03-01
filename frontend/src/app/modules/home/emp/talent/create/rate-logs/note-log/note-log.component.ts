import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-note-log',
  templateUrl: './note-log.component.html',
  styleUrls: ['./note-log.component.scss'],
})
export class NoteLogComponent {
  public form!: FormGroup;
  public influencers: any;
  private influencerData: any;

  private userId: number = this.userService.getID();

  constructor(
    private formBuilder: FormBuilder,
    private influencerService: InfluencerService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.getInfluencers();

    this.form = this.formBuilder.group({
      influencerId: ['', Validators.required],
      note: ['', Validators.required],
    });

    if (sessionStorage.getItem('influencerData') != null) {
      this.influencerData = JSON.parse(
        sessionStorage.getItem('influencerData') || '{}'
      );
      this.form.controls['influencerId'].setValue(this.influencerData.id);
      /* sessionStorage.removeItem('influencerData'); */
    }
  }

  private getInfluencers(): void {
    this.influencerService.getInfluencerNames().subscribe((item) => {
      this.influencers = item;
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    } else {
      this.influencerService.createInfluencerRemark({ ...this.form.value, createdById: this.userId }).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.toastr.success(response.message);
            this.route.navigate(['/home/main/influencers']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
