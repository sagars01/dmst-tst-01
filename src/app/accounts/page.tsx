"use client"
import React, { useState, useEffect } from 'react';
import AdvancedTable from '../utils/components/advancedtable.util';


const AccountsPage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/v1/Reports/BalanceSheet");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result.data); // Adjust this based on your API response structure
                setError(null);
            } catch (err) {
                setError('Failed to fetch data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

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

export default AccountsPage;
