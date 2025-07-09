export type PayFrequency = "monthly" | "quarterly" | "yearly" | "atMaturity";

export type PeriodicFrequency = Exclude<PayFrequency, "atMaturity">;
