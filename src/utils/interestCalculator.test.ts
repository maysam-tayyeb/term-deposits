import { describe, expect, test } from "vitest";
import { calculateMonthlyCompounding } from "./interestCalculator.ts";

describe("calculateMonthlyCompounding", () => {
  test("calculate compounding for a month", () => {
    expect(calculateMonthlyCompounding(10_000, 1.1, 1)).toBe(10_009.17);
  });

  test("calculate compounding for minimum month", () => {
    expect(calculateMonthlyCompounding(10_000, 1.1, 3)).toBe(10027.53);
  });
});
