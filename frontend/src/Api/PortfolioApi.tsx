import { PortfolioItem, PortfoliosData } from "../MainScreen/types";
import { NewPortfolioFormData } from "../СreatePortfolioScreen/types";
import HttpClient from "./HttpClient";

export class PortfolioApi {
    private static getUrl = () => `${import.meta.env.VITE_SERVER_API_BASEURL}/api`;

    public static async createPortfolio(data: NewPortfolioFormData): Promise<void> {
        return HttpClient.post(`${PortfolioApi.getUrl()}/portfolio`, data);
    }

    public static async getPortfolios(): Promise<PortfoliosData> {
        return HttpClient.get(`${PortfolioApi.getUrl()}/portfolio`);
    }

    public static async getPortfolio(id: number): Promise<PortfolioItem> {
        return HttpClient.get(`${PortfolioApi.getUrl()}/portfolio/${id}`);
    }
}