import { round } from "../../utils/currency.ts";
import type { PeriodicFrequency } from "./interestCalculator.types.ts";
import type { ValueOf } from "../../types/generic.types.ts";

export const compoundingPeriodLength: Record<PeriodicFrequency, number> = {
  monthly: 1,
  quarterly: 3,
  annually: 12,
};

export const compoundingPeriodsPerYear: Record<PeriodicFrequency, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export const calculateInterest = (
  balance: number,
  annualRate: number,
  numberOfReinvestPerYear: ValueOf<typeof compoundingPeriodsPerYear>,
): number => (balance * (annualRate / 100)) / numberOfReinvestPerYear;

export function calculateCompounding(
  principal: number,
  annualRate: number,
  months: number,
  reInvestFrequency: PeriodicFrequency,
): number {
  let balance = principal;

  for (
    let month = 1;
    month <= months;
    month += compoundingPeriodLength[reInvestFrequency]
  ) {
    const interest = calculateInterest(
      balance,
      annualRate,
      compoundingPeriodsPerYear[reInvestFrequency],
    );
    balance += interest;
  }

  return round(balance);
}

export function calculateMonthlyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): number {
  return calculateCompounding(principal, annualRate, months, "monthly");
}

export function calculateQuarterlyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): number {
  return calculateCompounding(principal, annualRate, months, "quarterly");
}

export function calculateAnnuallyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): number {
  return calculateCompounding(principal, annualRate, months, "annually");
}

export function calculateAtMaturity(
  principal: number,
  annualRate: number,
  months: number,
): number {
  const interest = (principal * (annualRate / 100) * months) / 12;

  return round(principal + interest);
}
