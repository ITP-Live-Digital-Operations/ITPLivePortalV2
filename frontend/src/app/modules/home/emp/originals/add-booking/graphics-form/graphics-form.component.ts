import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OgService } from 'src/app/core/Services/og.service';

@Component({
  selector: 'app-graphics-form',
  templateUrl: './graphics-form.component.html',
  styleUrls: ['./graphics-form.component.scss'],
})
export class GraphicsFormComponent {
  ogBookingId!: number;

  protected graphicsBookingForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ogService: OgService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.ogBookingId = params['id'];
    });
    this.initializeForm();
  }

  private initializeForm(): void {
    this.graphicsBookingForm = this.formBuilder.group({
      ogBookingId: [this.ogBookingId],
      deadlineDateDraft1: [''],
      deadlineDateDraft1Link: [''],
      deadlineDateDraft1Comments: [''],
      deadlineDateFinal: [''],
      deadlineDateFinalLink: [''],
      dateOfThumbnailGoingLive: [''],
      fullThumbnailBrief: [''],
      linkOfPictures: [''],
      requestedGraphicDesignerId: [''],
    });
  }

  onSubmit(): void {
    this.ogService
      .createOgBookingGraphicsForm(this.graphicsBookingForm.value)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
