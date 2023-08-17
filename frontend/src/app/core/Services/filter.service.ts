import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  private nationalities: string[] = [];

  setNationalities(nationalities: string[]) {
    this.nationalities = nationalities;
  }

  getNationalities() {
    return this.nationalities;
  }
}
