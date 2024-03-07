import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/core/Services/data.service';
import { OgService } from 'src/app/core/Services/og.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent {

  ogBookingId !: number;
  protected productionBookingForm !: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ogService: OgService,
    private formBuilder: FormBuilder,
  ) { }

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
      paintingOrProps: ['']
    });

  }

  onSubmit(): void {}


}


interface recievedData {
  bookingId: number;
  staffId: number;
  showId: number;
  team: string;

}
