import RestService from "@/app/lib/services/rest";
import { NextResponse } from 'next/server';

const restService = new RestService();

export async function GET() {
    try {
        const response = await restService.GET<any>('/api.xro/2.0/Reports/BalanceSheet');
        const serializedResponse = {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        };
        return NextResponse.json(serializedResponse);
    } catch (error: any) {
        return NextResponse.json({
            error,
            message: 'Error: error fetching details',
            status: 'NOT_OK'
        }, { status: error?.status || 500 });
    }
}
