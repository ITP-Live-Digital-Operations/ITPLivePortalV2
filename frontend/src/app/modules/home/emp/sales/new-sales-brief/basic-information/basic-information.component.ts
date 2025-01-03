import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientModel } from 'src/app/core/interfaces/client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { UserService } from 'src/app/core/services/user.service';
import { NewClientComponent } from 'src/app/modules/home/sharing/clients/new-client/new-client.component';
import {
  campaignobjectives,
  clientIndustries,
  currencies,
} from 'src/assets/influencer-form-arrays';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss'],
})
export class BasicInformationComponent {
  public clientIndustries: string[] = clientIndustries;
  public campaignobjectives: string[] = campaignobjectives;
  public currencies: string[] = currencies;
  selectedClient: ClientModel | null = null;
  @Input() basicInfo: any;
  @Input()
  formGroupName: string = '';

  clients: any;
  brands: any;


  public form!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private clientService: ClientService,
    private dialog: MatDialog,
    private userService: UserService,
  ) {}

  ngOnInit() {
    
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.getClients();
    this.setupFormChanges();
    // Add the brandId control, initially disabled
    this.form.addControl(
      'brandId',
      new FormControl({ value: '', disabled: true })
    );
    if (Number(this.userService.getID()) === 78 ){
        currencies.push("USD")
        currencies.push("INR")
    }
  }

  private getClients(): void {
    this.clientService.getClients().subscribe((res: ClientModel[]) => {
      console.log(res);
      this.clients = res;
      this.clients.sort((a: any, b: any) => a.name.localeCompare(b.name));
    });
  }

  private setupFormChanges() {
    this.form.get('clientId')?.valueChanges.subscribe((clientId) => {
      this.selectedClient = this.clients?.find(
        (client: ClientModel) => client.id === clientId
      );
      this.brands = this.selectedClient ? this.selectedClient.brands : [];

      if (this.selectedClient) {
        this.form.get('brandId')?.enable();
      } else {
        this.form.get('brandId')?.disable();
      }
    });
  }
  // Method to format the number for display
  formatNumber(value: number | null | undefined): string {
    return value ? value.toLocaleString() : '0';
  }
  onBudgetInput(value: string): void {
    const parsedValue = this.parseFormattedNumber(value);
    this.form.get('Budget')?.setValue(parsedValue, { emitEvent: false });
  }

  onRecommendationsInput(value: string): void {
    const parsedValue = this.parseFormattedNumber(value);
    // Use optional chaining with ?. and provide a fallback value with ??
    this.form
      .get('NumberofRecommendations')
      ?.setValue(parsedValue, { emitEvent: false });
  }

  // Utility method to parse formatted number
  parseFormattedNumber(value: string): number {
    return Number(value.replace(/,/g, ''));
  }

  addNewClient(): void {
    this.dialog.open(NewClientComponent, {
      width: '600px',
      height: '350px',
    }).afterClosed().subscribe((newClient: ClientModel) => {
      this.getClients();
    });
  }
}
