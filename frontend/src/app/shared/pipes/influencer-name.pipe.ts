import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { InfluencerService } from 'src/app/core/services/influencer.service';

@Pipe({
  name: 'influencerName'
})
export class InfluencerNamePipe implements PipeTransform {

  constructor(private influencerService : InfluencerService) {}

  private influencers = []
  ngOnInit(): void {

  }

  transform(value: number){
    return this.influencerService.getInfluencer(value).pipe(map((res: any) => {
      return res.data.Name;
  }))
}

}
