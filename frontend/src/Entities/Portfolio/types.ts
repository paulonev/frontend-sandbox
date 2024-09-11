export type DifferenceType = "gain" | "loss";

export type PortfolioDifference = {
    readonly type: DifferenceType;
    readonly inVolume: number;
    readonly inPercentage: number;
}