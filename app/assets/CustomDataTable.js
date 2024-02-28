import React from 'react';
import DataTable from 'react-datatable';

export const CustomDataTable = ({ data, columns }) => {
    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
            />
        </div>
    );
};
