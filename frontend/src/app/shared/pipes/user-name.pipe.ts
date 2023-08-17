import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNamePipe',
})
export class UserNamePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'Mohamad Hammoud';
      case 14:
        return 'Ahmad Bashour';
      case 15:
        return 'Rachelle Maksoud';
      case 16:
        return 'Sales Testing Account';
      case 18:
        return 'Remy Farah';
      case 19:
        return 'Safwan Nawfal';
      case 20:
        return 'Perla Maria Daoud';
      case 21:
        return 'Rutuja Manjrekar';
      case 22:
        return 'Rand Alfatlawi';
      case 23:
        return 'Zineb Khaoudi';
      case 24:
        return 'Briksam Elbaroudy';
      case 25:
        return 'Ruqayyah Alsubhi';
      case 26:
        return 'Mohammad Elgohary';
      case 27:
        return 'Nourhan Dahie';
      case 28:
        return 'Jaques Elias Jurdak';
      case 29:
        return 'Kerem Akarlar';
      case 30:
        return "Jill D'Silva";
      case 31:
        return 'Fouad El Chaar';
      case 32:
        return 'Monika Vasiliauskaite';
      case 33:
        return 'Max Juby';
      case 34:
        return 'Megan Kemp';
      case 35:
        return 'Theresa Dargham';
      case 36:
        return 'Wafic Kobeissi';
      case 37:
        return 'Farah Hasbany';  
      case 38:
        return 'Nadine Rifai';
      case 40:
        return 'Cynthia Boustani';
      case 41:
        return 'Nader Testing';
      case 43:
        return 'Ghinwa Bassil';
      case 50:
        return 'Aman Dhami';
      case 51:
        return 'Clair De Valk';
      case 52:
        return 'Ajil Abdulla';
      case 53:
        return 'Yazeed Alaqeeli';
      case 54:
        return 'Ruqayyah Alsubhi';

      default:
        return 'Check Username Pipe';
    }
  }
}
