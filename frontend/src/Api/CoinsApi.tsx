import { AxiosError } from "axios";
import { ApiExtensions } from "./api.extensions";
import HttpClient from "./HttpClient";
import { z } from "zod";
import { ApiError } from "../Entities/Errors/ApiError";
import { CoinOptions, CoinOptionsSchema } from "./coinSearch.schema";

export class CoinsApi {
    public static async search(q: string = "", count: number = 10): Promise<CoinOptions> {
        try {
            const searchParams = new URLSearchParams();
            searchParams.append("q", q);
            searchParams.append("count", count.toString());
            const response = await HttpClient.get(`api/coins/list?${searchParams.toString()}`);
            return CoinOptionsSchema.parse(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                console.error(`Error [${this.search.name}]: response does not match the validation schema. ${JSON.stringify(error.issues)}`);
                throw error;
            } else if (error instanceof AxiosError) {
                const errorResponse = ApiExtensions.processAxiosError(error, this.search.name);
                throw new ApiError(error, errorResponse?.errorId);
            } else {
                console.error(`Unhandled error in ${this.search.name}`);
                throw error; 
            }
        }
    }
}