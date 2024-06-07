import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class RestService {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:3001',
        });
    }

    public async GET<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            const response = await this.axios.get<T>(url, options);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error;
        }
    }
}

export default RestService;
