import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ExportModashInfluencerProfile,
  ExportModashInstagramAudienceDemographic,
} from 'src/app/core/interfaces/influencerAPI.model';
import { ChartConfiguration, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import pptxgen from 'pptxgenjs';
import { InfluencerService } from 'src/app/core/services/influencer.service';
import { ChartService } from 'src/app/core/Services/chart.service';

@Component({
  selector: 'app-export-multiple-profiles',
  templateUrl: './export-multiple-profiles.component.html',
  styleUrls: ['./export-multiple-profiles.component.scss'],
})
export class ExportMultipleProfilesComponent{

  

  constructor(
    private chartService: ChartService,
  ){}
}
