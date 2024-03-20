import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CelebrityService } from 'src/app/core/services/celebrity.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-celebrity-remark',
  templateUrl: './add-celebrity-remark.component.html',
  styleUrls: ['./add-celebrity-remark.component.scss']
})
export class AddCelebrityRemarkComponent {
  public form!: FormGroup;
  public celebrities: any
  private celebrityData: any;

  private userId: number = this.userService.getID();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private celebrityService: CelebrityService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {}

  private getCelebrities(): void {
    this.celebrityService.getCelebrities().subscribe((data) => {
      this.celebrities = data;
    });
  }
}
