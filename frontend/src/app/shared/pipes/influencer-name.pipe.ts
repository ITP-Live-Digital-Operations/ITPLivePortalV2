import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Pipe({
  name: 'influencerName'
})
export class InfluencerNamePipe implements PipeTransform {

  constructor(private influencerService : InfluencerService) {}

  transform(value: number){
    return this.influencerService.getInfluencerNameById(value).pipe(
      map((res: any) => res.data.name)
    );
  }

}
