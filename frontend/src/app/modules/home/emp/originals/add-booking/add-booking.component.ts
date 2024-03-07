import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/Services/data.service';
import { OgService } from 'src/app/core/Services/og.service';
import { PATH } from 'src/app/core/constant/routes.constants';
import { ogTeamList } from 'src/app/core/constant/values.constants';
import { ogShow } from 'src/app/core/interfaces/og.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss']
})
export class AddBookingComponent {
  path = PATH
  protected bookingForm !: FormGroup;

  staffId = this.userService.getID();
  ogShowsList !: ogShow[]
  protected teamsList = ogTeamList;
  constructor(
    private userService: UserService,
    private ogService: OgService,
    private formBuilder: FormBuilder,
    private route: Router,
    private dataService: DataService
  ){}

  ngOnInit(): void {
    this.initializeForm();
    this.loadOgShows();

  }

  private initializeForm(): void {
    this.bookingForm = this.formBuilder.group({
      staffId : [this.staffId],
      showId : ['', Validators.required],
      team : ['', Validators.required],
      shootName : ['', Validators.required],
      numberOfGuests : ['', Validators.required],
      guestNames : [''],
      startingDate : ['', Validators.required],
      endingDate : ['', Validators.required],
      notes: ['']
    });
  }

  private loadOgShows(): void {
    this.ogService.getOgShows().subscribe((ogShows: ogShow[]) => {
      this.ogShowsList = ogShows;
    });
  }

  protected onSubmit(): void {

    console.log(this.bookingForm.value);
  this.ogService.createOgBooking(this.bookingForm.value).subscribe((response) => {
    const dataToSend = {
      bookingId: response.data.id,
      staffId: this.staffId,
      showId: this.bookingForm.value.showId,
      team: this.bookingForm.value.team,
    };
    this.dataService.changeData(dataToSend);
    switch (this.bookingForm.value.team) {
      case 'Production':
        this.route.navigate([this.path['addProductionBooking'], response.data.id]);
        break;
      case 'Editing':
        this.route.navigate([this.path['addEditorBooking']]);
        break;
      case 'Graphic Design':
        this.route.navigate([this.path['addGraphicsBooking']]);
        break;
      default:
        console.log('No team selected');
        break;
    }
  });
  }
}
