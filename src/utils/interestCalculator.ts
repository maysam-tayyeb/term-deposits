import { round } from "./currency.ts";

export const calculateMonthlyInterest = (
  balance: number,
  annualRate: number,
): number => (balance * annualRate) / 100 / 12;

export function calculateMonthlyCompounding(
  principal: number,
  annualRate: number,
  months: number,
): number {
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = calculateMonthlyInterest(balance, annualRate);
    balance += interest;
  }

  return round(balance);
}
