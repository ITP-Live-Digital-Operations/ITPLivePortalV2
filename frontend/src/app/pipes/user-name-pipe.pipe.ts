import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNamePipe'
})
export class UserNamePipePipe implements PipeTransform {

  transform(value: number): string {

      switch(value){
        case 1:
          return 'Mohamad Hammoud';
        case 14:
          return 'Ahmad Bashour';
        case 15:
          return 'Rachelle Maksoud';
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




        default:
          return 'Unknown User';
      }



  }

}
