export interface ChartConfiguration {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
  plugins?: ChartPlugin[];
}

export type ChartType = 'bar' | 'doughnut' | 'line' | 'pie' | 'radar';

export interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  data: number[];
  label?: string;
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  hoverBackgroundColor?: string | string[];
  hoverBorderColor?: string | string[];
  hoverBorderWidth?: number;
  pointStyle?: 'circle' | 'cross' | 'dash' | 'line' | 'rect' | 'star' | 'triangle';
  pointRadius?: number;
  pointHoverRadius?: number;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  animation?: ChartAnimationOptions;
  layout?: {
    padding?: number | {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
  };
  scales?: {
    x?: ChartAxisOptions;
    y?: ChartAxisOptions;
  };
  plugins?: ChartPluginOptions;
}

export interface ChartAnimationOptions {
  duration?: number;
  easing?: 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad';
  delay?: number;
  loop?: boolean;
}

export interface ChartAxisOptions {
  display?: boolean;
  position?: 'left' | 'right' | 'top' | 'bottom';
  grid?: {
    display?: boolean;
    color?: string;
    borderColor?: string;
    tickColor?: string;
    drawBorder?: boolean;
    drawOnChartArea?: boolean;
    drawTicks?: boolean;
    lineWidth?: number;
  };
  ticks?: {
    display?: boolean;
    color?: string;
    font?: {
      family?: string;
      size?: number;
      style?: 'normal' | 'italic' | 'oblique';
      weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    };
    padding?: number;
    stepSize?: number;
    maxTicksLimit?: number;
    callback?: (value: any, index: number, values: any[]) => string | number;
  };
  title?: {
    display?: boolean;
    text?: string;
    color?: string;
    font?: {
      family?: string;
      size?: number;
      style?: 'normal' | 'italic' | 'oblique';
      weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    };
    padding?: number;
  };
}

export interface ChartPluginOptions {
  legend?: ChartLegendOptions;
  tooltip?: ChartTooltipOptions;
  datalabels?: ChartDataLabelsOptions;
  title?: ChartTitleOptions;
}

export interface ChartLegendOptions {
  display?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  labels?: {
    boxWidth?: number;
    boxHeight?: number;
    color?: string;
    font?: {
      family?: string;
      size?: number;
      style?: 'normal' | 'italic' | 'oblique';
      weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
    };
    padding?: number;
    usePointStyle?: boolean;
    pointStyle?: 'circle' | 'cross' | 'dash' | 'line' | 'rect' | 'star' | 'triangle';
    generateLabels?: (chart: any) => any[];
  };
  onClick?: (event: any, legendItem: any, legend: any) => void;
}

export interface ChartTooltipOptions {
  enabled?: boolean;
  mode?: 'point' | 'nearest' | 'index' | 'dataset' | 'x' | 'y';
  intersect?: boolean;
  position?: 'average' | 'nearest';
  backgroundColor?: string;
  titleColor?: string;
  titleFont?: {
    family?: string;
    size?: number;
    style?: 'normal' | 'italic' | 'oblique';
    weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  };
  bodyColor?: string;
  bodyFont?: {
    family?: string;
    size?: number;
    style?: 'normal' | 'italic' | 'oblique';
    weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  };
  borderColor?: string;
  borderWidth?: number;
  padding?: number;
  callbacks?: {
    beforeTitle?: (tooltipItems: any[]) => string | string[];
    title?: (tooltipItems: any[]) => string | string[];
    afterTitle?: (tooltipItems: any[]) => string | string[];
    beforeBody?: (tooltipItems: any[]) => string | string[];
    beforeLabel?: (tooltipItem: any) => string | string[];
    label?: (tooltipItem: any) => string | string[];
    afterLabel?: (tooltipItem: any) => string | string[];
    afterBody?: (tooltipItems: any[]) => string | string[];
    beforeFooter?: (tooltipItems: any[]) => string | string[];
    footer?: (tooltipItems: any[]) => string | string[];
    afterFooter?: (tooltipItems: any[]) => string | string[];
  };
}

export interface ChartDataLabelsOptions {
  align?: 'center' | 'end' | 'start' | 'right' | 'left' | 'top' | 'bottom';
  anchor?: 'center' | 'end' | 'start';
  backgroundColor?: string | null;
  borderColor?: string | null;
  borderRadius?: number;
  borderWidth?: number;
  color?: string;
  display?: boolean | 'auto' | ((context: any) => boolean | 'auto');
  font?: {
    family?: string;
    size?: number;
    style?: 'normal' | 'italic' | 'oblique';
    weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  };
  offset?: number;
  opacity?: number;
  padding?: number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  rotation?: number;
  textAlign?: 'start' | 'center' | 'end' | 'left' | 'right';
  formatter?: (value: any, context: any) => string | number | null;
}

export interface ChartTitleOptions {
  display?: boolean;
  text?: string | string[];
  align?: 'start' | 'center' | 'end';
  color?: string;
  font?: {
    family?: string;
    size?: number;
    style?: 'normal' | 'italic' | 'oblique';
    weight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  };
  padding?: number | {
    top?: number;
    bottom?: number;
  };
}

export interface ChartPlugin {
  id?: string;
  beforeInit?: (chart: any) => void;
  afterInit?: (chart: any) => void;
  beforeUpdate?: (chart: any) => void;
  afterUpdate?: (chart: any) => void;
  beforeDraw?: (chart: any) => void;
  afterDraw?: (chart: any) => void;
  beforeDatasetsDraw?: (chart: any) => void;
  afterDatasetsDraw?: (chart: any) => void;
  destroy?: (chart: any) => void;
}
