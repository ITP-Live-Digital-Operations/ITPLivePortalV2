import { PlatformSelections } from './platform-data.interface';
import { InterestData, CountryData } from './demographic-data.interface';
import { ValidatorFn } from '@angular/forms';

export interface ProfileFormData {
  // Basic Information
  name: string;
  profilePicture?: File | null;
  bio: string;
  reasonToChoose: string;

  // Platform Selection
  selectedPlatforms: PlatformSelections;

  // Metrics
  engagementRate: number;
  avgLikes: number;

  // Demographics
  genderSplit: number; // Represents female percentage (0-100)
  followerInterests: FollowerInterestFormData[];
  topCountries: CountryFormData[];
}

export interface FollowerInterestFormData {
  name: string;
  weight: number; // Percentage (0-100)
}

export interface CountryFormData {
  name: string;
  weight: number; // Percentage (0-100)
}

// Form Control Configuration
export interface FormControlConfig {
  name: {
    maxLength: number;
    required: boolean;
  };
  bio: {
    maxLength: number;
    required: boolean;
  };
  reasonToChoose: {
    maxLength: number;
    required: boolean;
  };
  profilePicture: {
    maxSize: number; // in bytes
    allowedTypes: string[];
  };
  metrics: {
    engagementRate: {
      min: number;
      max: number;
    };
    avgLikes: {
      min: number;
    };
  };
  interests: {
    maxItems: number;
    minWeight: number;
    maxWeight: number;
  };
  countries: {
    maxItems: number;
    minWeight: number;
    maxWeight: number;
  };
}

// Form Validation Errors
export interface FormValidationErrors {
  name?: string[];
  bio?: string[];
  reasonToChoose?: string[];
  profilePicture?: string[];
  engagementRate?: string[];
  avgLikes?: string[];
  genderSplit?: string[];
  followerInterests?: string[];
  topCountries?: string[];
  selectedPlatforms?: string[];
}

// Form State
export interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  errors: FormValidationErrors;
}

// Default Values
export const DEFAULT_FORM_CONFIG: FormControlConfig = {
  name: {
    maxLength: 100,
    required: true,
  },
  bio: {
    maxLength: 300,
    required: false,
  },
  reasonToChoose: {
    maxLength: 300,
    required: false,
  },
  profilePicture: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  metrics: {
    engagementRate: {
      min: 0,
      max: 100,
    },
    avgLikes: {
      min: 0,
    },
  },
  interests: {
    maxItems: 10,
    minWeight: 0,
    maxWeight: 100,
  },
  countries: {
    maxItems: 5,
    minWeight: 0,
    maxWeight: 100,
  },
};

// Form Custom Validators
export interface CustomValidators {
  totalPercentage: (maxTotal: number) => ValidatorFn;
  fileType: (allowedTypes: string[]) => ValidatorFn;
  fileSize: (maxSize: number) => ValidatorFn;
}

// Form Handlers
export interface FormHandlers {
  onSubmit: (formData: ProfileFormData) => void;
  onCancel: () => void;
  onReset: () => void;
  onFileSelect: (event: Event) => void;
  onPlatformChange: (platforms: PlatformSelections) => void;
  onInterestAdd: (interest: FollowerInterestFormData) => void;
  onInterestRemove: (index: number) => void;
  onCountryAdd: (country: CountryFormData) => void;
  onCountryRemove: (index: number) => void;
}
