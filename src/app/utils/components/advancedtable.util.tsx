import React from 'react';

type Cell = {
    Value: string;
    Attributes?: { Value: string; Id: string }[];
};

type Row = {
    RowType: string;
    Cells: Cell[];
    Title?: string;
    Rows?: Row[];
};

type Report = {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[];
    ReportDate: string;
    UpdatedDateUTC: string;
    Fields: any[];
    Rows: Row[];
};

type ReportData = {
    Status: string;
    Reports: Report[];
};

type TableProps = {
    data: ReportData;
};

const AdvancedTable: React.FC<TableProps> = ({ data }) => {
    const { Reports } = data;
    const report = Reports[0];

    const renderRows = (rows: Row[]) => {
        return rows.map((row, index) => {
            if (row.RowType === 'Header') {
                return (
                    <tr key={index} className="bg-gray-200">
                        {row.Cells.map((cell, cellIndex) => (
                            <th key={cellIndex} className="border px-4 py-2 text-left">{cell.Value}</th>
                        ))}
                    </tr>
                );
            }

            if (row.RowType === 'Section') {
                return (
                    <React.Fragment key={index}>
                        {row.Title && (
                            <tr>
                                <td colSpan={3} className="border px-4 py-2 font-bold bg-gray-100">{row.Title}</td>
                            </tr>
                        )}
                        {row.Rows && renderRows(row.Rows)}
                    </React.Fragment>
                );
            }

            if (row.RowType === 'Row' || row.RowType === 'SummaryRow') {
                return (
                    <tr key={index}>
                        {row.Cells.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border px-4 py-2">{cell.Value}</td>
                        ))}
                    </tr>
                );
            }

            return null;
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                {/* <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Section</th>
                        <th className="px-4 py-2 text-left">07 June 2024</th>
                        <th className="px-4 py-2 text-left">08 June 2023</th>
                    </tr>
                </thead> */}
                <tbody>
                    {renderRows(report.Rows)}
                </tbody>
            </table>
        </div>
    );
};

export default AdvancedTable;
