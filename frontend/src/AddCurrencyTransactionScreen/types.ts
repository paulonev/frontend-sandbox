import dayjs from "dayjs";

export type CurrencyTransactionType = "Replenish" | "Withdraw";

export type AddCurrencyTransactionFormData = {
    type: CurrencyTransactionType;
    amount: string;
    currency?: string;
    date: dayjs.Dayjs;
    notes?: string;
}

export type AddCurrencyTransactionRequest = {
    portfolioId: number;
    type: CurrencyTransactionType;
    amount: number;
    currency: string;
    date: string;
    notes?: string;
}

export const defaultValues: AddCurrencyTransactionFormData = {
    type: "Replenish",
    amount: "",
    currency: "USD",
    date: dayjs(new Date()),
}