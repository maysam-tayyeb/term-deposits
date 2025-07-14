import { useEffect, useState } from "react";

import {
  createDurationMonths,
  MAX_ALLOWED_COMPOUNDING_MONTHS,
  MIN_ALLOWED_COMPOUNDING_MONTHS,
} from "./durationMonths.factory.ts";
import {
  calculateMonthlyCompounding,
  calculateQuarterlyCompounding,
  calculateAnnuallyCompounding,
  calculateAtMaturity,
} from "./compoundingInterestCalculators";
import type {
  CalculationResult,
  PayFrequency,
} from "./compoundingInterestCalculators.types";
import { createAnnualInterestRate } from "./annualInterestRate.factory.ts";

const frequencyOptions: { label: string; value: PayFrequency }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annually", value: "annually" },
  { label: "At Maturity", value: "atMaturity" },
];

export function SavingsAndDepositCalculator() {
  const [principal, setPrincipal] = useState<number>(10_000);
  const [annualRate, setAnnualRate] = useState<number>(1.2);
  const [months, setMonths] = useState<number>(3);
  const [frequency, setFrequency] = useState<PayFrequency>("monthly");
  const [schedule, setSchedule] = useState<CalculationResult[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setError("");
    try {
      const annualInterestRate = createAnnualInterestRate(annualRate);
      const duration = createDurationMonths(months);
      let result: CalculationResult[];
      switch (frequency) {
        case "monthly":
          result = calculateMonthlyCompounding(
            principal,
            annualInterestRate,
            duration,
          );
          break;
        case "quarterly":
          result = calculateQuarterlyCompounding(
            principal,
            annualInterestRate,
            duration,
          );
          break;
        case "annually":
          result = calculateAnnuallyCompounding(
            principal,
            annualInterestRate,
            duration,
          );
          break;
        case "atMaturity":
          result = calculateAtMaturity(principal, annualInterestRate, duration);
          break;
      }
      setSchedule(result);
    } catch (e) {
      if (e instanceof RangeError) {
        setError(e.message);
        setSchedule([]);
      } else {
        console.error("Unknown error occurred:", e);
        setError("There is an unknown error occurred.");
      }
    }
  }, [annualRate, frequency, months, principal]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-[#de313b]">
        Calculate Term Deposit (Re-invest)
      </h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Starting with ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Interest rate (% p.a.)
          </label>
          <input
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Investment term (months)
          </label>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(parseInt(e.target.value, 10))}
            min={MIN_ALLOWED_COMPOUNDING_MONTHS}
            max={MAX_ALLOWED_COMPOUNDING_MONTHS}
            className="w-full border rounded p-2"
          />
          <p className="text-xs text-gray-500">
            Min {MIN_ALLOWED_COMPOUNDING_MONTHS} and max{" "}
            {MAX_ALLOWED_COMPOUNDING_MONTHS} months
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Interest paid
          </label>
          <div className="flex gap-4">
            {frequencyOptions.map((opt) => (
              <label key={opt.value} className="inline-flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value={opt.value}
                  checked={frequency === opt.value}
                  onChange={() => setFrequency(opt.value)}
                  className="form-radio mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      {schedule.length > 0 && (
        <div className="flex gap-4">
          <div className="max-h-[32rem] overflow-y-auto flex-1">
            <h2 className="text-xl font-bold mb-4">Projected savings</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-left">Month</th>
                  <th className="border px-2 py-1 text-left">Interest Rate</th>
                  <th className="border px-2 py-1 text-left">
                    Interest Earned
                  </th>
                  <th className="border px-2 py-1 text-left">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.month}>
                    <td className="border px-2 py-1">{row.month}</td>
                    <td className="border px-2 py-1">
                      {row.annualRate.toFixed(2)}%
                    </td>
                    <td className="border px-2 py-1">
                      ${row.interest.toFixed(2)}
                    </td>
                    <td className="border px-2 py-1">
                      ${row.balance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-start border p-4">
            <div>
              <span className="font-medium text-[#de313b]">Final balance</span>
              <span className="block font-bold text-4xl mt-1">
                <span className="text-2xl align-top">$</span>
                {Math.round(schedule[schedule.length - 1].balance)}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-medium text-[#de313b]">
                Total interest earned
              </span>
              <span className="block font-bold text-4xl mt-1">
                <span className="text-2xl align-top">$</span>
                {Math.round(schedule[schedule.length - 1].interest)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
