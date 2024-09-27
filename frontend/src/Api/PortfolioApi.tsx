import { z } from "zod";
import { NewPortfolioFormData } from "../СreatePortfolioScreen/types";
import HttpClient from "./HttpClient";
import { AxiosError } from "axios";
import { ApiExtensions } from "./api.extensions";
import { PortfoliosData, PortfoliosDataSchema } from "./portfolios.schema";
import { ApiError } from "../Entities/Errors/ApiError";
import { Portfolio, PortfolioSchema } from "./portfolio.schema";

export class PortfolioApi {
    public static async createPortfolio(data: NewPortfolioFormData): Promise<void> {
        try {
            await HttpClient.post(`api/portfolio`, data);
        } catch (error) {
            if (error instanceof AxiosError) {
                ApiExtensions.processAxiosError(error, this.createPortfolio.name);
            } else {
                console.error(`Unhandled error in ${this.createPortfolio.name}`);
            }

            throw error;
        }
    }

    public static async getPortfolios(): Promise<PortfoliosData> {
        try {
            const response = await HttpClient.get<PortfoliosData>(`api/portfolio`);
            return PortfoliosDataSchema.parse(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`Error [${this.getPortfolios.name}]: response does not match the validation schema. ${JSON.stringify(error.issues)}`);
                throw error;
            } else if (error instanceof AxiosError) {
                const errorResponse = ApiExtensions.processAxiosError(error, this.getPortfolios.name);
                throw new ApiError(error, errorResponse?.errorId);
            } else {
                console.error(`Unhandled error in ${this.getPortfolios.name}`);
                throw error; 
            }
        }
    }

    public static async getPortfolio(id: number): Promise<Portfolio | null> {
        try {
            const response = await HttpClient.get(`api/portfolio/${id}`);
            return PortfolioSchema.parse(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`Error [${this.getPortfolio.name}]: response does not match the validation schema. ${JSON.stringify(error.issues)}`);
                throw error;
            } else if (error instanceof AxiosError) {
                const errorResponse = ApiExtensions.processAxiosError(error, this.getPortfolio.name);
                if (errorResponse?.status === 404 && errorResponse?.title?.includes("Portfolio Not Found")) {
                    return Promise.resolve(null);
                }

                throw new ApiError(error, errorResponse?.errorId);
            } else {
                console.error(`Unhandled error in ${this.getPortfolio.name}`);
                throw error; 
            }
        }
    }
}