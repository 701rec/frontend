export type GrantCalculationRequest = {
  score: number;
  preferredMajor: string;
};

export type GrantChanceResult = {
  percentage: number;
  comment: string; 
};