import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class HttpClient {
    private static readonly _axiosInstance: AxiosInstance = axios.create({
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    static get axiosInstance(): AxiosInstance {
        return this._axiosInstance;
    }

    public static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await HttpClient.axiosInstance.get(url, config);

        return res.data;
    }

    public static async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const res: AxiosResponse<T> = await HttpClient.axiosInstance.post(url, body, config);

        return res.data;
    }

    public static async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        return await HttpClient.axiosInstance.put(url, body, config);
    }

    public static async delete(url: string): Promise<void> {
        await HttpClient.axiosInstance.delete(url);
    }
}