import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OgService } from 'src/app/core/Services/og.service';
import { PATH } from 'src/app/core/constant/routes.constants';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss'],
})
export class ProductionFormComponent {
  ogBookingId!: number;
  protected productionBookingForm!: FormGroup;
  path = PATH;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ogService: OgService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.ogBookingId = params['id'];
      console.log(this.ogBookingId);

      this.initializeForm();
    });
  }

  private initializeForm(): void {
    this.productionBookingForm = this.formBuilder.group({
      ogbookingId: [this.ogBookingId],
      locationOfShoot: ['', Validators.required],
      fullShootBrief: ['', Validators.required],
      equipmentNeeded: [''],
      cameraNumber: [''],
      nicMicNumber: [''],
      paintingOrProps: [''],
    });
  }

  onSubmit(): void {
    this.ogService
      .createOgBookingProductionForm(this.productionBookingForm.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate([this.path['productionTeamMembers'], this.ogBookingId])

      });
  }
}
