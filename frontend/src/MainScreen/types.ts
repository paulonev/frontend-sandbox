import { DifferenceType } from "../Entities/Portfolio/types";

export function isGain(type: DifferenceType): boolean { return type && type === "gain"; }
