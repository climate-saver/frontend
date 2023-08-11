export interface IMessage {
  id?: string;
  message: string;
  sender: 'User' | 'Bot';
  answerSuggestions?: string[];
  homeInfoKey?: string;
  more?: boolean;
  readyForRecommendations?: boolean;
}

export interface IProjectRecommendationInfo {
  name: string;
  annualEnergySavings: number;
  totalInstallationCost: number;
  annualInstallationCost: number;
  percentageEmissionsReduction: number;
  rebateAmount: number;
}
