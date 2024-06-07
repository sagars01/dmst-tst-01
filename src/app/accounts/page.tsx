import { GetServerSideProps } from 'next';
import AdvancedTable from '../utils/components/advancedtable.util';
import RestService from '../lib/services/rest';

const restService = new RestService();

type HomePageProps = {
    data: any;
    error?: string | null;
};

const HomePage: React.FC<HomePageProps> = async () => {
    const { data, error } = await fetchBalanceSheetData();
    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Balance Sheet</h1>
                <div>Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Balance Sheet</h1>
            <AdvancedTable data={data} />
        </div>
    );
};

async function fetchBalanceSheetData() {
    try {
        const response = await restService.GET<any>('/api.xro/2.0/Reports/BalanceSheet');
        return { data: response.data, error: null };
    } catch (error) {
        return { data: null, error: 'Failed to fetch data' };
    }
}

export default HomePage;
