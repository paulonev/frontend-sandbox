export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function isPositiveNumber(amount: number): boolean { return typeof amount === "number" && !Number.isNaN(amount) && amount >= 0; }
