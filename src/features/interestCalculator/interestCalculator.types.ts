export type PayFrequency = "monthly" | "quarterly" | "annually" | "atMaturity";

export type PeriodicFrequency = Exclude<PayFrequency, "atMaturity">;
