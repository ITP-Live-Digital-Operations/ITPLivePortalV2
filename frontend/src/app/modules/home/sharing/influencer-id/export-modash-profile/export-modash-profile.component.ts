import { Component, Input, SimpleChanges } from '@angular/core';
import {
  ExportModashInfluencerProfile,
  ExportModashInstagramAudienceDemographic,
  InstagramAudienceDemographic,
} from 'src/app/core/interfaces/influencerAPI.model';
import { ChartConfiguration, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-export-modash-profile',
  templateUrl: './export-modash-profile.component.html',
  styleUrls: ['./export-modash-profile.component.scss'],
})
export class ExportModashProfileComponent {
  @Input() profile!: ExportModashInfluencerProfile;

  ChartDataLabels = ChartDataLabels;

  // Custom color scheme
  private colors = {
    male: '#3a0083', // Dark purple for male
    female: '#ef5350', // Pink for female
  };

  public ageGenderChartData: ChartData<'bar'> = {
    labels: ['13-17', '18-24', '25-34', '35-44', '45-64'],
    datasets: [
      { data: [], label: 'Male', backgroundColor: this.colors.male },
      { data: [], label: 'Female', backgroundColor: this.colors.female },
    ],
  };

  public genderChartData: ChartData<'doughnut'> = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [],
        backgroundColor: [this.colors.male, this.colors.female],
        borderWidth: 0,
      },
    ],
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1) + '%';
            }
            return label;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        offset: 4,
        color: '#000',
        font: {
          weight: 'bold',
          size: 11
        },
        formatter: (value: number) => {
          return value.toFixed(1) + '%';
        }
      }
    }
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const dataset = context.dataset.data as number[];
            const total = dataset.reduce((acc, data) => acc + (data || 0), 0);
            const percentage =
              total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };

  public genderChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels!.map((label, index) => {
              const value = datasets[0].data[index] as number;
              const backgroundColor = datasets[0].backgroundColor as string[];
              return {
                text: `${label}: ${value.toFixed(2)}%`,
                fillStyle: backgroundColor[index],
                strokeStyle: backgroundColor[index],
                lineWidth: 0,
                hidden: false,
                index: index
              };
            });
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = value.toFixed(2) + '%';
            return `${label}: ${percentage}`;
          }
        }
      }
    }
  };


  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && !changes['profile'].firstChange && this.profile) {
      this.initializeCharts();
    }
  }

  getTopCountries(): ExportModashInstagramAudienceDemographic[] {
    return this.profile.instagramProfile.InstagramAudienceDemographic.filter(
      (demo) => demo.type === 'country'
    )
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 5);
  }

  private initializeCharts(): void {
    console.log('here');
    const ageGenderData =
      this.profile.instagramProfile.InstagramAudienceDemographic.filter(
        (demo) => demo.type === 'gendersPerAge'
      );

    const maleData: number[] = [];
    const femaleData: number[] = [];

    ['13-17', '18-24', '25-34', '35-44', '45-64'].forEach((ageGroup) => {
      const maleEntry = ageGenderData.find(
        (d) => d.code === `${ageGroup}_male`
      );
      const femaleEntry = ageGenderData.find(
        (d) => d.code === `${ageGroup}_female`
      );

      maleData.push(maleEntry ? maleEntry.weight * 100 : 0);
      femaleData.push(femaleEntry ? femaleEntry.weight * 100 : 0);
    });

    this.ageGenderChartData.datasets[0].data = maleData;
    this.ageGenderChartData.datasets[1].data = femaleData;

    const genderData =
      this.profile.instagramProfile.InstagramAudienceDemographic.filter(
        (demo) => demo.type === 'gender'
      );

    const maleTotal = genderData.find((d) => d.code === 'MALE')?.weight || 0;
    const femaleTotal =
      genderData.find((d) => d.code === 'FEMALE')?.weight || 0;

    this.genderChartData.datasets[0].data = [
      maleTotal * 100,
      femaleTotal * 100,
    ];
  }
}
