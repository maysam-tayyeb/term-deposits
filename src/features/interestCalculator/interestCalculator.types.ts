export interface CalculationResult {
  month: number;
  annualRate: number;
  interest: number;
  balance: number;
}

export type PayFrequency = "monthly" | "quarterly" | "annually" | "atMaturity";

export type PeriodicFrequency = Exclude<PayFrequency, "atMaturity">;
