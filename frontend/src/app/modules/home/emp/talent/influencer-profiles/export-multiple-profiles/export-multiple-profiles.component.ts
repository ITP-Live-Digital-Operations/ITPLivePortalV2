import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportModashProfileComponent } from 'src/app/modules/home/sharing/influencer-id/export-modash-profile/export-modash-profile.component';

@Component({
  selector: 'app-export-multiple-profiles',
  templateUrl: './export-multiple-profiles.component.html',
  styleUrls: ['./export-multiple-profiles.component.scss'],
})
export class ExportMultipleProfilesComponent{
  @Input() profiles: ExportModashInfluencerProfile[] = [];
  @ViewChildren(ExportModashProfileComponent) profileComponents!: QueryList<ExportModashProfileComponent>;

  currentProfileIndex: number = 0;
  currentProfile!: ExportModashInfluencerProfile;

  isFormSubmitted: boolean = false;
  isAllApproved: boolean = false;

  approvedProfiles: ExportModashInfluencerProfile[] = [];

  @ViewChild('profileContainer') profileContainer!: ElementRef;

  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { profiles: ExportModashInfluencerProfile[] }
  ){}

  ngOnInit() {
    if (this.data && this.data.profiles) {
      this.profiles = this.data.profiles;
    }

    if (this.profiles && this.profiles.length > 0) {
      this.currentProfile = this.profiles[this.currentProfileIndex];
    }
  }

  // Handle profile editing and approval
  onProfileEdited(updatedProfile: ExportModashInfluencerProfile) {
    this.currentProfile = updatedProfile;
    this.isFormSubmitted = true;
  }

  approveProfile() {
    this.approvedProfiles.push(this.currentProfile);
    if (this.currentProfileIndex < this.profiles.length - 1) {
      this.currentProfileIndex++;
      this.currentProfile = this.profiles[this.currentProfileIndex];
      this.isFormSubmitted = false;
    } else {
      this.isAllApproved = true;
    }
  }

  editProfile() {
    this.isFormSubmitted = false;
  }

  exportAllProfilesToPowerPoint() {
    const pptx = new pptxgen();

    this.approvedProfiles.forEach((profile, index) => {
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
        scale: 1,
      };

      html2canvas(element, options)
        .then((canvas) => {
          const imgDataUrl = canvas.toDataURL('image/png');

          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // Convert pixels to inches (assuming 96 DPI)
          const inchPerPx = 1 / 96;

          const slideWidthInches = canvasWidth * inchPerPx;
          const slideHeightInches = canvasHeight * inchPerPx;

          // Define custom layout
          pptx.defineLayout({ name: 'Custom', width: slideWidthInches, height: slideHeightInches });
          pptx.layout = 'Custom';

          const slide = pptx.addSlide();

          // Add image to slide
          slide.addImage({
            data: imgDataUrl,
            x: 0,
            y: 0,
            w: slideWidthInches,
            h: slideHeightInches,
          });

          // Get the positions of the social platform elements
          const socialPlatforms = element.querySelectorAll('.social-platform');

          socialPlatforms.forEach((platformElement: HTMLElement) => {
            const rect = platformElement.getBoundingClientRect();
            const containerRect = element.getBoundingClientRect();

            // Position relative to the container
            const x = rect.left - containerRect.left;
            const y = rect.top - containerRect.top;
            const width = rect.width;
            const height = rect.height;

            // Convert positions from pixels to inches
            const xInches = x * inchPerPx;
            const yInches = y * inchPerPx;
            const wInches = width * inchPerPx;
            const hInches = height * inchPerPx;

            // Get the URL to link to
            let url = '';

            if (platformElement.classList.contains('instagram')) {
              url = `https://www.instagram.com/${profile.instagramProfile.username}`;
            } else if (platformElement.classList.contains('tiktok')) {
              url = `https://www.tiktok.com/@${profile.TiktokHandle}`;
            } else if (platformElement.classList.contains('youtube')) {
              url = `https://www.youtube.com/${profile.YoutubeHandle}`;
            } else if (platformElement.classList.contains('twitter')) {
              url = `https://www.twitter.com/${profile.TwitterHandle}`;
            } else if (platformElement.classList.contains('snapchat')) {
              url = `https://www.snapchat.com/add/${profile.SnapchatHandle}`;
            } else if (platformElement.classList.contains('twitch')) {
              url = `https://www.twitch.tv/${profile.TwitchHandle}`;
            }

            if (url) {
              slide.addShape(pptx.ShapeType.rect, {
                x: xInches,
                y: yInches,
                w: wInches,
                h: hInches,
                fill: { color: 'FFFFFF', transparency: 100 },
                line: { color: 'FFFFFF', transparency: 100 },
                hyperlink: { url: url },
              });
            }
          });
        })
        .catch((err) => {
          console.error('Error exporting profile to PowerPoint:', err);
        });
    });

    // Save the presentation after processing all profiles
    pptx
      .writeFile({ fileName: 'Approved_Profiles.pptx' })
      .then(() => {
        console.log('Presentation created successfully');
      })
      .catch((err) => {
        console.error('Error creating presentation:', err);
      });
  }
}
