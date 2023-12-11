import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { ClientService } from 'src/app/core/services/client.service';
import { campaignobjectives, clientIndustries, currencies } from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent {

  public clientIndustries: string[] = clientIndustries;
  public campaignobjectives: string[] = campaignobjectives;
  public currencies: string[] = currencies;

  @Input()
  formGroupName: string = '';


  clients: any

  public form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective,
    private clientService: ClientService, ){  }

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.getClients();
  }

  private getClients(): void {
    this.clientService.getClients().subscribe((res) => {
      this.clients = res;
      this.clients.sort((a: any, b: any) => a.name.localeCompare(b.name));
    });
  }




}
