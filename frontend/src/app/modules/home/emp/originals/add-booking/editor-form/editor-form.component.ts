import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OgService } from 'src/app/core/Services/og.service';

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent {

  ogBookingId!: number;
  editorList !: any[];

  protected editorBookingForm!: FormGroup;

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
    this.editorBookingForm = this.formBuilder.group({
      ogBookingId: [this.ogBookingId],
      deadlineDateDraft1: [''],
      deadlineDateDraft1Link: [''],
      deadlineDateDraft1Comments: [''],
      deadlineDateDraft2: [''],
      deadlineDateDraft2Link: [''],
      deadlineDateDraft2Comments: [''],
      deadlineDateFinal: [''],
      deadlineDateFinalLink: [''],
      dateOfEpisodeGoingLive: [''],

      linkOfFootage: [''],
      music: [''],
      brolls: [''],
      graphics: [''],
      textNeeded: [''],
      guestSocialMediaLinks: [''],
      requestedEditorId: [''],
      fullEpisodeBrief: [''],
      // wait for the rest of the fields

    });
  }

  onSubmit(): void {}
}
