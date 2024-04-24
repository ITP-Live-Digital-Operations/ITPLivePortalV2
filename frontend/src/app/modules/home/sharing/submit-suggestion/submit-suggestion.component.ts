import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from 'src/app/core/Services/suggestion.service';
import { SuggestionModel } from 'src/app/core/interfaces/suggestions.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-submit-suggestion',
  templateUrl: './submit-suggestion.component.html',
  styleUrls: ['./submit-suggestion.component.scss']
})
export class SubmitSuggestionComponent {

  displayedColumns: string[] = ['suggestion', 'status'];
  suggestions: SuggestionModel[] = [];
  suggestionsDataSource: MatTableDataSource<SuggestionModel>


  public form!: FormGroup;

  private userId: number =this.userService.getID();

  constructor(
    private suggestionService: SuggestionService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SubmitSuggestionComponent>
  ) {
    this.suggestionsDataSource = new MatTableDataSource<SuggestionModel>([]);
  }

  ngOnInit(): void {
    this.fetchSuggestionsByUser();
    this.initializeForm();
  }

  fetchSuggestionsByUser() {
    this.suggestionService.getSuggestionsByUserId(this.userId).subscribe(
      (object) => {

        this.suggestions = object.data;
        this.suggestionsDataSource = new MatTableDataSource<SuggestionModel>(this.suggestions);
      },
      (error) => {
        console.error('Error fetching suggestions by user: ', error);
      }
    );
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      suggestion : ['', Validators.required],
      suggestedBy: this.userId,
    });
  }


  submitSuggestion(): void {
    console.log(this.form.value);
    this.suggestionService.addSuggestion(this.form.value).subscribe( (returnForm) => {
      if (returnForm.status === 'success') {
        this.toastr.success("Thank you for your input.", returnForm.message);
        this.dialogRef.close();
      } else {
        this.toastr.error(returnForm.message);
      }
    });
  }
}
