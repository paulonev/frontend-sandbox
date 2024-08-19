import { PortfolioItem, PortfoliosData } from "../MainScreen/types";
import { NewPortfolioFormData } from "../СreatePortfolioScreen/types";
import HttpClient from "./HttpClient";

export class PortfolioApi {
    public static async createPortfolio(data: NewPortfolioFormData): Promise<void> {
        return HttpClient.post(`api/portfolio`, data);
    }

    public static async getPortfolios(): Promise<PortfoliosData> {
        return HttpClient.get(`api/portfolio`);
    }

    public static async getPortfolio(id: number): Promise<PortfolioItem> {
        return HttpClient.get(`api/portfolio/${id}`);
    }

    public static async getGson(): Promise<unknown> {
        return HttpClient.get(`api/gson`);
    }
}