
export interface BigNumber {
  title: string;
  value: string;
  tooltip: string;
  change?: string;
  changeType?: 'positive' | 'negative';
}

export interface BubbleChartData {
  name: string;
  pdvs: number;
  vendas: number;
  cobertura: number;
}