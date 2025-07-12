export interface CalculationResult {
  month: number;
  annualRate: number;
  interest: number;
  balance: number;
}

export type PayFrequency = "monthly" | "quarterly" | "annually" | "atMaturity";

export type PeriodicFrequency = Exclude<PayFrequency, "atMaturity">;

export type AnnualInterestRate = number & {
  readonly __brand: unique symbol;
};
export type DurationMonths = number & { readonly __brand: unique symbol };
