import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { createSuggestionModel, returnSuggestionModel, returnSuggestionModelSingle, statusAndMessage } from '../interfaces/suggestions.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  suggestionsApiURL = environment.apiUrl + '/v1/suggestions';


  constructor(private http: HttpClient) { }

  addSuggestion(suggestion: createSuggestionModel ) : Observable<statusAndMessage> {
    return this.http.post<statusAndMessage>(`${this.suggestionsApiURL}/addSuggestion`, suggestion);
  }

  getSuggestionById(suggestionId: number) : Observable<returnSuggestionModelSingle>{
    return this.http.get<returnSuggestionModelSingle>(`${this.suggestionsApiURL}/getSuggestionById/${suggestionId}`);
  }

  getSuggestionsByDevelopement() : Observable<returnSuggestionModel>{
    return this.http.get<returnSuggestionModel>(`${this.suggestionsApiURL}/getSuggestionsByDevelopement`);
  }

  getSuggestionsByTeam() : Observable<returnSuggestionModel>{
    return this.http.get<returnSuggestionModel>(`${this.suggestionsApiURL}/getSuggestionsByTeam`);
  }

  getSuggestionsByUserId(userId: number) : Observable<returnSuggestionModel>{
    return this.http.get<returnSuggestionModel>(`${this.suggestionsApiURL}/getSuggestionsByUserId/${userId}`);
  }

  getSuggestionsByPriorityASC() : Observable<returnSuggestionModel>{
    return this.http.get<returnSuggestionModel>(`${this.suggestionsApiURL}/getSuggestionsByPriorityASC`);
  }

  rejectSuggestion(suggestionId: number): Observable<statusAndMessage>{
    return this.http.put<statusAndMessage>(`${this.suggestionsApiURL}/rejectSuggestion/${suggestionId}`,{});
  }

  approveSuggestion(suggestionId: number): Observable<statusAndMessage>{
    return this.http.put<statusAndMessage>(`${this.suggestionsApiURL}/approveSuggestion/${suggestionId}`,{});
  }

  updatePriorityAndDate(suggestionId : number, priority: number, startDate: any): Observable<statusAndMessage>{
    return this.http.put<statusAndMessage>(`${this.suggestionsApiURL}/updatePriorityAndDate/${suggestionId}`,{priority: priority, startDate: startDate});
  }

  updateEstimatedTime( suggestionId: number, estimatedTime: number): Observable<statusAndMessage>{
    return this.http.put<statusAndMessage>(`${this.suggestionsApiURL}/updateEstimatedTime/${suggestionId}`,{estimatedTime: estimatedTime});
  }
}
