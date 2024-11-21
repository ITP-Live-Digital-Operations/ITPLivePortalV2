export interface ExportOptions {
  format: 'image' | 'pptx';
  quality?: number;
  includeLinks?: boolean;
  filename?: string;
  dimensions?: {
    width?: number;
    height?: number;
  };
}
