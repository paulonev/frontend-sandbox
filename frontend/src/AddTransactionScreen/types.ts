import dayjs from "dayjs";

export type TransactionType = "Buy" | "Sell";

export type AddTransactionFormData = {
    coinName: string;
    coinTicker: string;
    type: TransactionType;
    pricePerUnit: string;
    amount: string;
    date: dayjs.Dayjs;
    commission?: string;
    notes?: string;
}

export type AddTransactionRequest = {
    coinName: string;
    coinTicker: string;
    type: TransactionType;
    pricePerUnit: string;
    amount: string;
    date: string;
    commission: string;
    notes?: string;
}

export const defaultValues: AddTransactionFormData = {
    coinName: "", 
    coinTicker: "",
    type: "Buy",
    pricePerUnit: "",
    amount: "",
    date: dayjs(new Date()),
}

export type CoinOptions = {
    coinName: string;
    coinTicker: string;
    pricePerUnit: string; // decimal("price_per_unit", 25, 15) [\d]*10.[\d]*15
    webp64?: string;
}[];