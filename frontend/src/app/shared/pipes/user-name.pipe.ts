import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { UserService } from 'src/app/core/services/user.service';

@Pipe({
  name: 'userNamePipe',
})
export class UserNamePipe implements PipeTransform {

  constructor(private userService : UserService) {}

  transform(value: number){
    return this.userService.getUserNameById(value).pipe(
      map((res: any) => res.name)
    )
  }
}
