import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);
  currentData = this.dataSubject.asObservable();

  changeData(data: any) {
    this.dataSubject.next(data);
  }

  resetData() {
    this.dataSubject.next(null); // Or any default value you prefer
  }
}
