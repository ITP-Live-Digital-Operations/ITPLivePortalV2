import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ExportModashInfluencerProfile,
  ExportModashInstagramAudienceDemographic,
  ExportModashInstagramInterest,
} from 'src/app/core/interfaces/influencerAPI.model';
import { ChartConfiguration, ChartData } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import pptxgen from 'pptxgenjs';

interface CustomInterest {
  name: string;
  weight: number;
}

interface CustomCountry {
  name: string;
  weight: number;
}

@Component({
  selector: 'app-export-modash-profile',
  templateUrl: './export-modash-profile.component.html',
  styleUrls: ['./export-modash-profile.component.scss'],
})
export class ExportModashProfileComponent {
  @Input() profile!: ExportModashInfluencerProfile;
  @Input() isFormSubmitted: boolean = false;

  @ViewChild('profileContainer') profileContainer!: ElementRef;

  @Output() profileEdited = new EventEmitter<ExportModashInfluencerProfile>();

  isDialog: boolean = false;

  bio: string = ''; // limit to 250 characters for display
  reasonToChoose: string = ''; // limit to 250 characters for display

  ChartDataLabels = ChartDataLabels;
  influencerCategory: string = '';


  uploadedName: string | null = null;
  uploadedPicture: string | null = null;
  customBio: string = '';
  selectedPlatforms: any = {};
  uploadedRate: number | null = null;

  form!: FormGroup;

  uploadedAvgLikes: number | null = null;
  uploadedGenderSplit: number | null = null; // Stores female percentage
  originalMaleData: number[] = [];
  originalFemaleData: number[] = [];

  customFollowerInterests: CustomInterest[] = [];
  customTopCountries: CustomCountry[] = [];


  // Custom color scheme
  private genderChartColors = {
    male: '#3a0083', // Dark purple for male
    female: '#ef5350', // Pink for female
  };

  public ageGenderChartData: ChartData<'bar'> = {
    labels: ['13-17', '18-24', '25-34', '35-44', '45-64'],
    datasets: [
      { data: [], label: 'Male', backgroundColor: this.genderChartColors.male },
      { data: [], label: 'Female', backgroundColor: this.genderChartColors.female },
    ],
  };

  public genderChartData: ChartData<'doughnut'> = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [],
        backgroundColor: [this.genderChartColors.male, this.genderChartColors.female],
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

    this.uploadedAvgLikes = this.profile.instagramProfile.avgLikes;
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
      engagementRate: [this.profile.engagementRate],
      avgLikes: [this.profile.instagramProfile.avgLikes, [Validators.min(0)]],
      genderSplit: [this.getFemalePercentage(), [Validators.min(0), Validators.max(100)]],

      followerInterests: this.fb.array([], [this.totalPercentageValidator(100)]),
      topCountries: this.fb.array([], [this.totalPercentageValidator(100)]),
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

     // Initialize the follower interests FormArray
  const interestsArray = this.form.get('followerInterests') as FormArray;
  this.profile.instagramProfile.InstagramInterest.forEach((interest) => {
    interestsArray.push(
      this.fb.group({
        name: [interest.name, Validators.required],
        weight: [
          interest.weight * 100,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      })
    );
  });

  // Initialize the top countries FormArray
  const countriesArray = this.form.get('topCountries') as FormArray;
  this.getTopCountries().forEach((country) => {
    countriesArray.push(
      this.fb.group({
        name: [country.name, Validators.required],
        weight: [
          country.weight * 100,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      })
    );
  });
  }

  get followerInterests(): FormArray {
    return this.form.get('followerInterests') as FormArray;
  }

  get topCountries(): FormArray {
    return this.form.get('topCountries') as FormArray;
  }

  // Separate conversion method for interests
  private convertInterest(interest: ExportModashInstagramInterest): CustomInterest {
    return {
      name: interest.name || '',
      weight: interest.weight
    };
  }

  // Separate conversion method for demographic data (countries)
  private convertDemographic(demographic: ExportModashInstagramAudienceDemographic): CustomCountry {
    return {
      name: demographic.name || '',
      weight: demographic.weight
    };
  }

  // Helper method to get interests in the correct format
  getDisplayInterests(): CustomInterest[] {
    if (this.customFollowerInterests.length) {
      return this.customFollowerInterests.slice(0, 5); // Limit to 5 interests
    }
    return this.profile.instagramProfile.InstagramInterest
      .slice(0, 5) // Limit to 5 interests
      .map(interest => this.convertInterest(interest));
  }

  // Helper method to get countries in the correct format
  getDisplayCountries(): CustomCountry[] {
    if (this.customTopCountries.length) {
      return this.customTopCountries.slice(0, 3);;
    }
    return this.getTopCountries().slice(0, 3)
    .map(demographic =>
      this.convertDemographic(demographic)
    );
  }

  private getFemalePercentage(): number {
    const genderData = this.profile.instagramProfile.InstagramAudienceDemographic.filter(
      (demo) => demo.type === 'gender'
    );
    const femaleTotal = genderData.find((d) => d.code === 'FEMALE')?.weight || 0;
    return femaleTotal * 100;
  }


  get bioRemainingChars(): number {
    return 300 - (this.form.get('bio')?.value?.length || 0);
  }

  get reasonToChooseRemainingChars(): number {
    return 300 - (this.form.get('reasonToChoose')?.value?.length || 0);
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


  onGenderSplitChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.form.get('genderSplit')?.setValue(Number(value));
    this.updateGenderCharts();
  }

  private updateGenderCharts(): void {
    const femalePercentage = this.form.value.genderSplit || 0;
    const malePercentage = 100 - femalePercentage;
    this.genderChartData.datasets[0].data = [malePercentage, femalePercentage];

    const originalMaleTotal = this.originalMaleData.reduce((sum, value) => sum + value, 0);
    const originalFemaleTotal = this.originalFemaleData.reduce((sum, value) => sum + value, 0);

    const maleScalingFactor = originalMaleTotal > 0 ? malePercentage / originalMaleTotal : 0;
    const femaleScalingFactor = originalFemaleTotal > 0 ? femalePercentage / originalFemaleTotal : 0;

    const adjustedMaleData = this.originalMaleData.map(value => value * maleScalingFactor);
    const adjustedFemaleData = this.originalFemaleData.map(value => value * femaleScalingFactor);

    this.ageGenderChartData.datasets[0].data = adjustedMaleData;
    this.ageGenderChartData.datasets[1].data = adjustedFemaleData;
  }


  editForm() {
    this.isFormSubmitted = false;
  }

  getTopCountries(): ExportModashInstagramAudienceDemographic[] {
    return this.profile.instagramProfile.InstagramAudienceDemographic
      .filter((demo) => demo.type === 'country')
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

    this.originalMaleData = [...maleData];
    this.originalFemaleData = [...femaleData];
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


  private totalPercentageValidator(maxTotal: number): ValidatorFn {
    return (formArray: AbstractControl): { [key: string]: any } | null => {
      const total = formArray.value.reduce(
        (sum: number, curr: any) => sum + Number(curr.weight || 0),
        0
      );
      return total > maxTotal
        ? { totalPercentageExceeds: { total: total } }
        : null;
    };
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

  onSubmit() {
    // Assign form values to component variables
    this.uploadedName = this.form.value.name;
    this.customBio = this.form.value.bio;
    this.reasonToChoose = this.form.value.reasonToChoose;
    this.selectedPlatforms = this.form.value.selectedPlatforms;
    this.uploadedRate = this.form.value.engagementRate;
    this.uploadedAvgLikes = this.form.value.avgLikes;
    this.uploadedGenderSplit = this.form.value.genderSplit;

    // Update the gender chart data
    const femalePercentage = this.uploadedGenderSplit || 0;
    const malePercentage = 100 - femalePercentage;
    this.genderChartData.datasets[0].data = [malePercentage, femalePercentage];

    // Update the age-gender chart data
    const originalMaleTotal = this.originalMaleData.reduce((sum, value) => sum + value, 0);
    const originalFemaleTotal = this.originalFemaleData.reduce((sum, value) => sum + value, 0);

    const maleScalingFactor = originalMaleTotal > 0 ? malePercentage / originalMaleTotal : 0;
    const femaleScalingFactor = originalFemaleTotal > 0 ? femalePercentage / originalFemaleTotal : 0;

    const adjustedMaleData = this.originalMaleData.map(value => value * maleScalingFactor);
    const adjustedFemaleData = this.originalFemaleData.map(value => value * femaleScalingFactor);

    this.ageGenderChartData.datasets[0].data = adjustedMaleData;
    this.ageGenderChartData.datasets[1].data = adjustedFemaleData;

    // Update follower interests with proper typing
    this.customFollowerInterests = this.followerInterests.value
      .filter((interest: any) => interest.name && interest.weight)
      .map((interest: any): CustomInterest => ({
        name: interest.name,
        weight: interest.weight / 100,
      }));

    // Update top countries with proper typing and type annotations in sort
    this.customTopCountries = this.topCountries.value
      .filter((country: any) => country.name && country.weight)
      .map((country: any): CustomCountry => ({
        name: country.name,
        weight: country.weight / 100,
      }))
      .sort((a: CustomCountry, b: CustomCountry) => b.weight - a.weight);


    // Set isFormSubmitted to true to display the profile preview
    this.isFormSubmitted = true;

    this.profileEdited.emit(this.profile); // Emit the updated profile
  }

  async exportToPowerPoint() {
    const element = this.profileContainer.nativeElement;

    // Get the container dimensions
    const containerRect = element.getBoundingClientRect();
    const inchPerPx = 1 / 96;
    const slideWidthInches = containerRect.width * inchPerPx;
    const slideHeightInches = containerRect.height * inchPerPx;

    // Initialize pptxgenjs presentation
    const pptx = new pptxgen();
    pptx.defineLayout({ name: 'Custom', width: slideWidthInches, height: slideHeightInches });
    pptx.layout = 'Custom';
    const slide = pptx.addSlide();

      // Define social media platforms and their link patterns
  const socialPlatforms = [
    {
      selector: '.social-info .instagram',
      getUrl: () => `https://www.instagram.com/${this.profile.instagramProfile.username}`,
      shouldAdd: () => true // Instagram is always available
    },
    {
      selector: '.social-info .tiktok',
      getUrl: () => `https://www.tiktok.com/@${this.profile.TiktokHandle}`,
      shouldAdd: () => Boolean(this.profile.TiktokHandle && this.selectedPlatforms.tiktok)
    },
    {
      selector: '.social-info .youtube',
      getUrl: () => `https://www.youtube.com/${this.profile.YoutubeHandle}`,
      shouldAdd: () => Boolean(this.profile.YoutubeHandle && this.selectedPlatforms.youtube)
    },
    {
      selector: '.social-info .snapchat',
      getUrl: () => `https://www.snapchat.com/add/${this.profile.SnapchatHandle}`,
      shouldAdd: () => Boolean(this.profile.SnapchatHandle && this.selectedPlatforms.snapchat)
    },
    {
      selector: '.social-info .twitch',
      getUrl: () => `https://www.twitch.tv/${this.profile.TwitchHandle}`,
      shouldAdd: () => Boolean(this.profile.TwitchHandle && this.selectedPlatforms.twitch)
    },
    {
      selector: '.social-info .twitter',
      getUrl: () => `https://www.twitter.com/${this.profile.TwitterHandle}`,
      shouldAdd: () => Boolean(this.profile.TwitterHandle && this.selectedPlatforms.twitter)
    }
  ];

  // Group selectors by their desired layer order (back to front)
  const selectorsByLayer = {
    background: [
      '.charts-container',
      '.data-section',
      '.metrics-row',
    ],
    middle: [
      '.category-label',
      '.profile-picture-container',
      '.profile-name',
      '.profile-bio',
      '.reasons-section'
    ],
    foreground: [
      '.logo'
    ]
  };

    // Function to capture and add a section
  const captureAndAddSection = async (selector: string, addLink?: string) => {
    const sectionElem = element.querySelector(selector) as HTMLElement;
    if (sectionElem) {
      // Remove comments within the section
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
      removeComments(sectionElem);

      // Capture the section as an image
      const canvas = await html2canvas(sectionElem, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        backgroundColor: null
      });

      const imgDataUrl = canvas.toDataURL('image/png');

      // Get position and size relative to the container
      const rect = sectionElem.getBoundingClientRect();
      const x = (rect.left - containerRect.left) * inchPerPx;
      const y = (rect.top - containerRect.top) * inchPerPx;
      const w = rect.width * inchPerPx;
      const h = rect.height * inchPerPx;

      // Add the image to the slide
      const imageOptions: any = {
        data: imgDataUrl,
        x,
        y,
        w,
        h
      };

      // If a link is provided, add it to the image
      if (addLink) {
        imageOptions.hyperlink = { url: addLink };
      }

      slide.addImage(imageOptions);
    }
  };


// Process elements in order from background to foreground
  // 1. Background elements first
  for (const selector of selectorsByLayer.background) {
    await captureAndAddSection(selector);
  }

  // 2. Social media sections
  for (const platform of socialPlatforms) {
    if (platform.shouldAdd()) {
      await captureAndAddSection(platform.selector, platform.getUrl());
    }
  }

  // 3. Middle layer elements
  for (const selector of selectorsByLayer.middle) {
    await captureAndAddSection(selector);
  }

  // 4. Foreground elements last (will appear on top)
  for (const selector of selectorsByLayer.foreground) {
    await captureAndAddSection(selector);
  }

    // Save the presentation
    pptx.writeFile({ fileName: `${this.profile.Name}_profile.pptx` });
  }

}
