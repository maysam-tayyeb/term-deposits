import { describe, expect, test } from "vitest";
import {
  calculateAtMaturity,
  calculateMonthlyCompounding,
  calculateQuarterlyCompounding,
} from "./interestCalculator.ts";

describe("calculate monthly compounding", () => {
  test("1 month @ 1.1%", () => {
    expect(calculateMonthlyCompounding(10_000, 1.1, 1)).toBe(10_009.17);
  });

  test("3 months @ 1.1%", () => {
    expect(calculateMonthlyCompounding(10_000, 1.1, 3)).toBe(10_027.53);
  });

  test("3 months @ 3.4%", () => {
    expect(calculateMonthlyCompounding(600_000, 3.4, 3)).toBe(605_114.46);
  });

  test("6 months @ 3.4%", () => {
    expect(calculateMonthlyCompounding(600_000, 3.4, 6)).toBe(610_272.52);
  });
});

describe("calculate quarterly compounding", () => {
  test("3 months term @ 3.4%", () => {
    expect(calculateQuarterlyCompounding(600_000, 3.4, 3)).toBe(605_100);
  });

  test("5 months term @ 3.4%", () => {
    expect(calculateQuarterlyCompounding(600_000, 3.4, 5)).toBe(608_524.06);
  });

  test("6 months term @ 3.4%", () => {
    expect(calculateQuarterlyCompounding(600_000, 3.4, 6)).toBe(610_243.35);
  });

  test("2 months term @ 3.4%", () => {
    expect(calculateQuarterlyCompounding(610_243.35, 3.4, 1)).toBe(613_600);
  });
});

describe("calculate at maturity", () => {
  test("3 months term @ 3.4%", () => {
    expect(calculateAtMaturity(600_000, 3.4, 3)).toBe(605_100);
  });

  test("8 months term @ 3.4%", () => {
    expect(calculateAtMaturity(600_000, 3.4, 8)).toBe(613_600);
  });
});
