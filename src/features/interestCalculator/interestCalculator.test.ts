import { describe, expect, test } from "vitest";
import {
  calculateAtMaturity,
  calculateMonthlyCompounding,
  calculateQuarterlyCompounding,
  calculateAnnuallyCompounding,
} from "./interestCalculator.ts";

describe("Term deposit", () => {
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

    test("12 months term @ 3.4%", () => {
      expect(calculateQuarterlyCompounding(600_000, 3.4, 12)).toBe(620_661.58);
    });

    test("14 months term @ 3.4%", () => {
      expect(calculateQuarterlyCompounding(600_000, 3.4, 14)).toBe(620_661.58);
    });

    test("2 months term @ 3.4%", () => {
      expect(calculateQuarterlyCompounding(610_243.35, 3.4, 1)).toBe(613_600);
    });
  });

  describe("calculate yearly compounding", () => {
    test("1 year term @ 3.4%", () => {
      expect(calculateAnnuallyCompounding(600_000, 3.4, 12)).toBe(620_400);
    });

    test("2 years term @ 3.4%", () => {
      expect(calculateAnnuallyCompounding(600_000, 3.4, 24)).toBe(641_493.6);
    });

    test("3 years term @ 3.4%", () => {
      expect(calculateAnnuallyCompounding(600_000, 3.4, 36)).toBe(663_304.38);
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
});
