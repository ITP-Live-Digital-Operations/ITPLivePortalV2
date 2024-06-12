import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from 'src/app/core/Services/suggestion.service';
import { SuggestionModel } from 'src/app/core/interfaces/suggestions.model';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation.service';
import { UserService } from 'src/app/core/services/user.service';
import { ViewSuggestionComponent } from './view-suggestion/view-suggestion.component';

@Component({
  selector: 'app-team-suggestions',
  templateUrl: './team-suggestions.component.html',
  styleUrls: ['./team-suggestions.component.scss'],
})
export class TeamSuggestionsComponent {
  displayedColumnsSuggestions: string[] = [
    'suggestion',
    'estimatedTime',
    'status',
    'action',
  ];
  displayedColumnsPriorities: string[] = [
    'suggestion',
    'estimatedTime',
    'startDate',
  ];
  displayedColumnsTeamSuggestions: string[] = [
    'suggestion',
    'estimatedTime',
    'user',
    'status',
    'action',
  ];

  startDateArray : any


  suggestions: SuggestionModel[] = [];
  developerSuggestionsDataSource: MatTableDataSource<SuggestionModel>;
  teamSuggestionsDataSource: MatTableDataSource<SuggestionModel>;
  prioritiesDataSource: MatTableDataSource<SuggestionModel>;

  dragging = false; // Add this line
  success = false;

  userId = this.userService.getID();

  constructor(
    private suggestionService: SuggestionService,
    private userService: UserService,
    private confirmationDialogService: ConfirmationDialogService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.developerSuggestionsDataSource =
      new MatTableDataSource<SuggestionModel>([]);
    this.teamSuggestionsDataSource = new MatTableDataSource<SuggestionModel>(
      []
    );
    this.prioritiesDataSource = new MatTableDataSource<SuggestionModel>([]);
  }

  ngOnInit(): void {
    this.fetchSuggestionsByDevelopers();
    this.fetchSuggestionsByTeam();
    this.fetchPriorityList();
    this.updatePriorities();
  }

  fetchSuggestionsByDevelopers() {
    this.suggestionService.getSuggestionsByDevelopement().subscribe(
      (object) => {
        this.suggestions = object.data;
        this.developerSuggestionsDataSource =
          new MatTableDataSource<SuggestionModel>(this.suggestions);
      },
      (error) => {
        console.error('Error fetching suggestions by developers: ', error);
      }
    );
  }

  fetchSuggestionsByTeam() {
    this.suggestionService.getSuggestionsByTeam().subscribe(
      (object) => {
        console.log(object);
        this.suggestions = object.data;
        this.teamSuggestionsDataSource =
          new MatTableDataSource<SuggestionModel>(this.suggestions);
      },
      (error) => {
        console.error('Error fetching suggestions by team: ', error);
      }
    );
  }

  fetchPriorityList() {
    this.suggestionService.getSuggestionsByPriorityASC().subscribe(
      (object) => {
        this.suggestions = object.data;
        this.prioritiesDataSource = new MatTableDataSource<SuggestionModel>(
          this.suggestions
        );
      },
      (error) => {
        console.error('Error fetching priority list: ', error);
      }
    );
  }

  drop(event: CdkDragDrop<SuggestionModel[]>): void {
    moveItemInArray(
      this.prioritiesDataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    this.prioritiesDataSource.data = [...this.prioritiesDataSource.data]; // Refresh the data source to update the view
    this.updatePriorities();
  }

  updatePriorities(): void {
    let currentDate = new Date(); // Start with today's date
    this.prioritiesDataSource.data.forEach((item, index) => {
    item.priority = index + 1;
       // Assign the current date to this item's startDate
    item.startDate = new Date(currentDate);  // Copy currentDate to startDate
    item.startDate = item.startDate.toISOString().split('T')[0];  // Format the date
    currentDate.setDate(currentDate.getDate() + item.estimatedTime); // Increment the date by the estimated time
    // assign endDate based on calculations
    // assign endDate based on calculations
    item.endDate.setDate(item.endDate.getDate() + item.estimatedTime); // Add the estimated time to endDate
    item.endDate = item.endDate.toISOString().split('T')[0]; // Format the date

      this.suggestionService.updatePriorityAndDates(item.id, item.priority, item.startDate, item.endDate).subscribe(
        (object) => {
          if (object.status === 'success') {
            this.success = true;
            console.log(object.message);
          }
        },
        (error) => {
          console.error('Error updating priority: ', error);
        }
      );
    });
    if (this.success) {
      this.toastr.success('Priorities updated successfully');
    }
  }

  viewSuggestion(suggestionId: number) {
    this.dialog
      .open(ViewSuggestionComponent, {
        width: '50%',
        height: 'auto',
        data: {
          suggestionId: suggestionId,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.fetchSuggestionsByDevelopers();
        this.fetchSuggestionsByTeam();
        this.fetchPriorityList();
      });
  }
}
