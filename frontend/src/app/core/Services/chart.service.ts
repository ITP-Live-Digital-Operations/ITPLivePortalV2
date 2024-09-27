import { Injectable } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private colors = {
    male: '#3a0083',
    female: '#ef5350',
  };

  getAgeGenderChartData(): ChartData<'bar'> {
    return {
      labels: ['13-17', '18-24', '25-34', '35-44', '45-64'],
      datasets: [
        { data: [], label: 'Male', backgroundColor: this.colors.male },
        { data: [], label: 'Female', backgroundColor: this.colors.female },
      ],
    };
  }

  getGenderChartData(): ChartData<'doughnut'> {
    return {
      labels: ['Male', 'Female'],
      datasets: [
        {
          data: [],
          backgroundColor: [this.colors.male, this.colors.female],
          borderWidth: 0,
        },
      ],
    };
  }

  getBarChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: 'black' },
        },
        y: {
          display: false,
          beginAtZero: true,
          max: 100,
          grid: { display: false },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: 'black',
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: { size: 14 },
          },
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y.toFixed(1) + '%';
              }
              return label;
            },
          },
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          offset: 4,
          color: 'black',
          font: { weight: 'bold', size: 11 },
          formatter: (value: number) => value.toFixed(1) + '%',
        },
      },
    };
  }

  getGenderChartOptions(): ChartConfiguration['options'] {
    return {
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
                  index: index,
                  color: 'black',
                  fontColor: 'black',
                };
              });
            },
            color: 'black',
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: { size: 14 },
            textAlign: 'left' as const,
            boxWidth: 20,
            boxHeight: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed;
              const percentage = value.toFixed(2) + '%';
              return `${label}: ${percentage}`;
            },
          },
        },
        datalabels: {
          color: 'white',
          font: { weight: 'bold', size: 14 },
          formatter: (value: number, context: any) => {
            const sum = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / sum) * 100).toFixed(2) + '%';
            return context.chart.data.labels[context.dataIndex] + '\n' + percentage;
          },
        },
      },
    };
  }
}
