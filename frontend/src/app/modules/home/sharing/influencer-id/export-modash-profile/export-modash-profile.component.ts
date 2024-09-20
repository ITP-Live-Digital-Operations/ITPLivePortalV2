import {
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import pptxgen from 'pptxgenjs';

@Component({
  selector: 'app-export-modash-profile',
  templateUrl: './export-modash-profile.component.html',
  styleUrls: ['./export-modash-profile.component.scss'],
})
export class ExportModashProfileComponent {
  @Input() profile!: ExportModashInfluencerProfile;
  isDialog: boolean = false;

  bio: string = ''; // limit to 250 characters for display
  reasonToChoose: string = ''; // limit to 250 characters for display

  ChartDataLabels = ChartDataLabels;
  influencerCategory: string = '';

  isFormSubmitted: boolean = false;

  uploadedName: string | null = null;
  uploadedPicture: string | null = null;
  customBio: string = '';
  selectedPlatforms: any = {};
  uploadedRate: number | null = null;

  form!: FormGroup;

  @ViewChild('profileContainer') profileContainer!: ElementRef;

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
          display: false,
        },
        ticks: {
          color: 'black', // Change x-axis labels to white
        },
      },
      y: {
        display: false, // Hide y-axis
        beginAtZero: true,
        max: 100,
        grid: {
          display: false, // Hide background lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'black', // Change legend labels to white
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
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
        font: {
          weight: 'bold',
          size: 11,
        },
        formatter: (value: number) => {
          return value.toFixed(1) + '%';
        },
      },
    },
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
                index: index,
                // Add these properties to ensure white text
                color: 'black',
                fontColor: 'black',
              };
            });
          },
          color: 'black', // This sets the default color for all legend items
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
          },
          // Add this to override any default text color
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
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const sum = context.dataset.data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          const percentage = ((value / sum) * 100).toFixed(2) + '%';
          return (
            context.chart.data.labels[context.dataIndex] + '\n' + percentage
          );
        },
      },
    },
  };

  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<ExportModashProfileComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { profile: ExportModashInfluencerProfile }
  ) {}

  ngOnInit() {
    if (this.data && this.data.profile) {
      this.profile = this.data.profile;
      this.isDialog = true;
    }
    this.initForm();
    if (this.profile) {
      this.initializeCharts();
      this.calculateInfluencerCategory();
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: [this.profile.Name],
      profilePicture: [null],
      bio: [this.profile.Bio, [Validators.maxLength(300)]],
      reasonToChoose: ['', [Validators.maxLength(300)]],
      selectedPlatforms: this.fb.group({
        instagram: [{ value: true, disabled: false }],
        tiktok: [{ value: false, disabled: true }],
        youtube: [{ value: false, disabled: true }],
        snapchat: [{ value: false, disabled: true }],
        twitch: [{ value: false, disabled: true }],
        twitter: [{ value: false, disabled: true }],
      }),
      engagementRate: [this.profile.engagementRate]
    });

    if (this.profile) {
      const platformsGroup = this.form.get('selectedPlatforms') as FormGroup;
      const platformControls = {
        tiktok: this.profile.TiktokHandle,
        youtube: this.profile.YoutubeHandle,
        snapchat: this.profile.SnapchatHandle,
        twitch: this.profile.TwitchHandle,
        twitter: this.profile.TwitterHandle,
      };

      Object.entries(platformControls).forEach(([platform, handle]) => {
        const control = platformsGroup.get(platform);
        if (control) {
          if (handle) {
            control.enable();
            control.setValue(true);
          } else {
            control.disable();
            control.setValue(false);
          }
        }
      });
    }
  }

  get bioRemainingChars(): number {
    return 300 - (this.form.get('bio')?.value?.length || 0);
  }

  get reasonToChooseRemainingChars(): number {
    return 300 - (this.form.get('reasonToChoose')?.value?.length || 0);
  }

  onInput(event: Event, fieldName: string) {
    const input = event.target as HTMLTextAreaElement;
    const maxLength = 300;

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
      this.form.get(fieldName)?.setValue(input.value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      // Update form initial values based on profile
      this.initForm();
      this.initializeCharts();
      this.calculateInfluencerCategory();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedPicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Assign form values to component variables
    this.uploadedName = this.form.value.name;
    this.customBio = this.form.value.bio;
    this.reasonToChoose = this.form.value.reasonToChoose;
    this.selectedPlatforms = this.form.value.selectedPlatforms;
    this.uploadedRate = this.form.value.engagementRate;

    // Set isFormSubmitted to true to display the profile preview
    this.isFormSubmitted = true;
  }

  editForm() {
    this.isFormSubmitted = false;
  }

  getTopCountries(): ExportModashInstagramAudienceDemographic[] {
    return this.profile.instagramProfile.InstagramAudienceDemographic.filter(
      (demo) => demo.type === 'country'
    )
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
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

  private calculateInfluencerCategory(): void {
    const followerCount = this.profile.instagramProfile.followerCount;
    if (followerCount >= 1000000) {
      this.influencerCategory = 'MEGA';
    } else if (followerCount >= 100000) {
      this.influencerCategory = 'Macro';
    } else if (followerCount >= 10000) {
      this.influencerCategory = 'Micro';
    } else {
      this.influencerCategory = 'Nano';
    }
  }

  openInstagram(): void {
    window.open(
      `https://www.instagram.com/${this.profile.instagramProfile.username}`
    );
  }

  openTikTok(): void {
    window.open(`https://www.tiktok.com/@${this.profile.TiktokHandle}`);
  }

  openYoutube(): void {
    window.open(`https://www.youtube.com/${this.profile.YoutubeHandle}`);
  }

  openTwitter(): void {
    window.open(`https://www.twitter.com/${this.profile.TwitterHandle}`);
  }

  openSnapchat(): void {
    window.open(`https://www.snapchat.com/add/${this.profile.SnapchatHandle}`);
  }

  openTwitch(): void {
    window.open(`https://www.twitch.tv/${this.profile.TwitchHandle}`);
  }

  exportAsImage() {
    const element = this.profileContainer.nativeElement;

    // Remove comment nodes
    const removeComments = (elem: Node) => {
      for (let i = 0; i < elem.childNodes.length; i++) {
        const child = elem.childNodes[i];
        if (child.nodeType === 8) {
          elem.removeChild(child);
          i--;
        } else if (child.nodeType === 1) {
          removeComments(child);
        }
      }
    };

    removeComments(element);

    const options = {
      useCORS: true,
      allowTaint: true,
      logging: false,
    };

    html2canvas(element, options)
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = `${this.profile.Name}_profile.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .catch((err) => {
        console.error('Error exporting image:', err);
      });
  }

  exportToPowerPoint() {
    const element = this.profileContainer.nativeElement;

    // Remove comment nodes
    const removeComments = (elem: Node) => {
      for (let i = 0; i < elem.childNodes.length; i++) {
        const child = elem.childNodes[i];
        if (child.nodeType === 8) {
          elem.removeChild(child);
          i--;
        } else if (child.nodeType === 1) {
          removeComments(child);
        }
      }
    };

    removeComments(element);

    const options = {
      useCORS: true,
      allowTaint: true,
      logging: false,
    };

    html2canvas(element, options).then((canvas) => {
      const imageDataUrl = canvas.toDataURL('image/png');

      // Create a new PowerPoint presentation
      let pptx = new pptxgen();

      // Add a new slide
      let slide = pptx.addSlide();

      // Add the image to the slide
      slide.addImage({ data: imageDataUrl, x: 0, y: 0, w: '100%', h: '100%' });

      // Save the PowerPoint file
      pptx.writeFile({ fileName: `${this.profile.Name}_profile.pptx` });
    }).catch((err) => {
      console.error('Error exporting to PowerPoint:', err);
    });
  }

}
