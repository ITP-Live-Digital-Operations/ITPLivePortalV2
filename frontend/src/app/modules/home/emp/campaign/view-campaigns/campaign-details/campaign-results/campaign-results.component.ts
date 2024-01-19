import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Influencer {
  id: number;
  Name: string;
}

@Component({
  selector: 'app-campaign-results',
  templateUrl: './campaign-results.component.html',
  styleUrls: ['./campaign-results.component.scss'],
})
export class CampaignResultsComponent {
  campaignId: number = 0;
  influencers: Influencer[] = [];
  selectedInfluencer: any;
  selectedPlatform!: string;
  platforms: string[] = [
    'Instagram',
    'Snapchat',
    'YouTube',
    'TikTok',
    'Facebook',
    'X',
    'Twitch',
    'VK',
    'Telegram',
  ];
  selectedDeliverable!: string;

  deliverables: string[] = [
    'Instagram-Stories',
    'Instagram-Post',
    'Instagram-Reel',
    'SnapChat-Stories',
    'YouTube-Videos',
    'YouTube-Shorts',
    'YouTube-Stream',
    'TikTok-Video',
    'Facebook-Post',
    'X-Post',
    'Twitch-Stream',
    'VK-Post',
    'Telegram-Post',

  ];

  COLUMNS_SCHEMA_POST_REEL = [
  {
    key: 'followers',
    type: 'number',
    label: 'Followers',
  },
  {
    key: 'reach',
    type: 'number',
    label: 'Reach',
  },
  {
    key: 'impressions',
    type: 'number',
    label: 'Impressions',
  },
  {
    key: 'likes',
    type: 'number',
    label: 'Likes',
  },
  {
    key: 'comments',
    type: 'number',
    label: 'Comments',
  },
  {
    key: 'shares',
    type: 'number',
    label: 'Shares',
  },
  {
    key: 'saves',
    type: 'number',
    label: 'Saves',
  },
  ]

  COLUMNS_SCHEMA_YOUTUBE_VIDEOS_SHORTS = [
    {
      key: 'subscribers',
      type: 'number',
      label: 'Subscribers',
    },
    {
      key: 'videoViews',
      type: 'number',
      label: 'Video Views',
    },
    {
      key: 'uniqueViewers',
      type: 'number',
      label: 'Unique Viewers',
    },
    {
      key: 'impressions',
      type: 'number',
      label: 'Impressions',
    },
    {
      key: 'likes',
      type: 'number',
      label: 'Likes',
    },
    {
      key: 'dislikes',
      type: 'number',
      label: 'Dislikes',
    },
    {
      key: 'comments',
      type: 'number',
      label: 'Comments',
    },
  ]

  COLUMNS_SCHEMA_TIKTOK = [
    {
      key: 'followers',
      type: 'number',
      label: 'Followers',
    },
    {
      key: 'videoViews',
      type: 'number',
      label: 'Video Views',
    },
    {
      key: 'likes',
      type: 'number',
      label: 'Likes',
    },
    {
      key: 'comments',
      type: 'number',
      label: 'Comments',
    },
    {
      key: 'shares',
      type: 'number',
      label: 'Shares',
    },
    {
      key: 'saves',
      type: 'number',
      label: 'Saves',
    },
  ]

  COLUMNS_SCHEMA_FACEBOOK = [
    {
      key: 'followers',
      type: 'number',
      label: 'Followers',
    },
    {
      key: 'reach',
      type: 'number',
      label: 'Reach',
    },
    {
      key: 'likes',
      type: 'number',
      label: 'Likes',
    },
    {
      key: 'comments',
      type: 'number',
      label: 'Comments',
    },
    {
      key: 'shares',
      type: 'number',
      label: 'Shares',
    },
  ]

  COLUMNS_SCHEMA_X = [
    {
      key: 'followers',
      type: 'number',
      label: 'Followers',
    },
    {
      key: 'impressions',
      type: 'number',
      label: 'Impressions',
    },
    {
      key: 'likes',
      type: 'number',
      label: 'Likes',
    },
    {
      key: 'comments',
      type: 'number',
      label: 'Comments',
    },
    {
      key: 'retweets',
      type: 'number',
      label: 'Retweets',
    },
  ]

  COLUMNS_SCHEMA_TWITCH = [
    {
      key: 'followers',
      type: 'number',
      label: 'Followers',
    },
    {
      key: 'views',
      type: 'number',
      label: 'Views',
    },
    {
      key: 'uniqueViewers',
      type: 'number',
      label: 'Unique Viewers',
    },
    {
      key: 'likes',
      type: 'number',
      label: 'Likes',
    },
    {
      key: 'dislikes',
      type: 'number',
      label: 'Dislikes',
    },
    {
      key: 'comments',
      type: 'number',
      label: 'Comments',
    },
  ]

COLUMNS_SCHEMA_IG_STORIES = [
    {
      key: 'views',
      type: 'number',
      label: 'Views',
    },
    {
      key: 'reach',
      type: 'number',
      label: 'Reach',
    },
    {
      key: 'impressions',
      type: 'number',
      label: 'Impressions',
    },
    {
      key: 'interactions',
      type: 'number',
      label: 'Interactions',
    },
    {
      key: 'stickerTaps',
      type: 'number',
      label: 'Sticker Taps',
    },
    {
      key: 'linkClicks',
      type: 'number',
      label: 'Link Clicks',
    },
]

COLUNMS_SCHEMA_SC_STORIES = [
    {
      key: 'views',
      type: 'number',
      label: 'Views (Impressions)',
    },
    {
      key: 'viewers',
      type: 'number',
      label: 'Viewers (Reach)',
    },
    {
      key: 'screenshots',
      type: 'number',
      label: 'Screenshots',
    },
    {
      key: 'replies',
      type: 'number',
      label: 'Replies',
    },
    {
      key: 'clicks',
      type: 'number',
      label: 'Clicks',
    },
  ]

  COLUMNS_SCHEMA_REGULAR_POSTS = [
    {
      key: 'followers',
      type: 'number',
      label: 'Followers',
    },
    {
      key: 'reach',
      type: 'number',
      label: 'Reach',
    },
    {
      key: 'impressions',
      type: 'number',
      label: 'Impressions',
    },
  ]
  POCS = [
    'Zerbia Khan',
    'Adnan Zahabi',
    'Fatmah Alsharif',
    'Nada Kattan',
    'Mira Moukaddem',
    'Ghinwa Bassil',
  ]

  combinedPlatformDeliverable!: string;
  poc!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data) {
      this.campaignId = this.data.campaignId;
      this.influencers = this.data.influencers;
    }
  }

  getDeliverables(selectedPlatform: string): any[] {
    if (selectedPlatform === 'Instagram') {
      return ['Stories', 'Post', 'Reel'];
    } else if (selectedPlatform === 'Snapchat') {
      return ['Stories'];
    } else if (selectedPlatform === 'YouTube') {
      return ['Videos', 'Shorts', 'Stream'];
    } else if (selectedPlatform === 'TikTok') {
      return ['Video'];
    } else if (selectedPlatform === 'Facebook') {
      return ['Post'];
    } else if (selectedPlatform === 'X') {
      return ['Post'];
    } else if (selectedPlatform === 'Twitch') {
      return ['Stream'];
    }
    else if (selectedPlatform === 'VK') {
      return ['Post'];
    }
    else if (selectedPlatform === 'Telegram') {
      return ['Post'];
    } else {
      return [];
    }
  }

  onSelectionChange(): void {
    if (this.selectedPlatform && this.selectedDeliverable) {
      this.combinedPlatformDeliverable =
        this.selectedPlatform + ' ' + this.selectedDeliverable;
    }

  }

}
