import { round } from "../../utils/currency.ts";
import type {
  CalculationResult,
  PeriodicFrequency,
} from "./interestCalculator.types.ts";

export const compoundingPeriods: Record<PeriodicFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export const calculateRawBalanceForMonth = (
  principal: number,
  rate: number,
  targetMonth: number,
  reInvestFrequency: number,
): number => {
  const r = rate;
  const n = reInvestFrequency;
  const t = targetMonth / 12;

  return principal * Math.pow(1 + r / n, n * t);
};

export function calculateCompoundingInterestAmounts(
  principal: number,
  annualRate: number,
  months: number,
  reInvestFrequency: number,
): CalculationResult[] {
  const schedule: CalculationResult[] = [];
  const rate = annualRate / 100;

  for (let month = 1; month <= months; month++) {
    const balanceForMonth = calculateRawBalanceForMonth(
      principal,
      rate,
      month,
      reInvestFrequency,
    );

    schedule.push({
      month,
      annualRate,
      interest: round(balanceForMonth - principal),
      balance: round(balanceForMonth),
    });
  }

  return schedule;
}

export function calculateMonthlyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): CalculationResult[] {
  return calculateCompoundingInterestAmounts(
    principal,
    annualRate,
    months,
    compoundingPeriods["monthly"],
  );
}

export function calculateQuarterlyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): CalculationResult[] {
  return calculateCompoundingInterestAmounts(
    principal,
    annualRate,
    months,
    compoundingPeriods["quarterly"],
  );
}

export function calculateAnnuallyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): CalculationResult[] {
  return calculateCompoundingInterestAmounts(
    principal,
    annualRate,
    months,
    compoundingPeriods["annually"],
  );
}

export function calculateAtMaturity(
  principal: number,
  annualRate: number,
  months: number,
): CalculationResult[] {
  const reInvestmentFrequency = 12 / months;

  return calculateCompoundingInterestAmounts(
    principal,
    annualRate,
    months,
    reInvestmentFrequency,
  );
}
