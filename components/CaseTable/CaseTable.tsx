import { GetAllCasesData, GetUpdateTimestamp } from '../shared/api-manager'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const headers = [
    {
        field: 'name',
        headerName: 'Case Name',
        flex: 1.5
    },
    {
        field: 'cost of case',
        type: 'number',
        headerName: 'Cost of Case',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'cost of key',
        type: 'number',
        headerName: 'Cost of Key',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'Average mill-spec',
        type: 'number',
        headerName: 'Average Mill-spec',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'Average restricted',
        type: 'number',
        headerName: 'Average Restricted',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'Average classified',
        type: 'number',
        headerName: 'Average Classified',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'Average covert',
        type: 'number',
        headerName: 'Average Covert',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'Average special',
        type: 'number',
        headerName: 'Average Special',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'average return',
        type: 'number',
        headerName: 'Average Return on Case',
        valueFormatter: ({ value }: { value: number }) => currencyFormatter.format(Number(value)),
        flex: 1.1,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'roi',
        type: 'number',
        headerName: 'Return on Investment',
        valueFormatter: ({ value }: { value: number }) => {return `${value.toFixed(2)}%`},
        flex: 1,
        align: 'center',
        headerAlign: 'center'
    }
]

export function CustomFooter(){
    const { data, isLoading, isError } = GetUpdateTimestamp();
    if (isError) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    return(
        <Box sx={{ padding: '10px', display: 'flex' }}>
            <i>Sources: <a href="https://github.com/jonese1234/Csgo-Case-Data" target="_blank" rel="noopener noreferrer">Csgo Case Data</a> &amp; <a href="https://csgobackpack.net/api/" target="_blank" rel="noopener noreferrer">Csgo Backpack.net</a>. Data is current as of {data} UTC</i>
        </Box>
    );
}

function  CaseTable() {
    const { data, isLoading, isError } = GetAllCasesData();
    if (isError) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    console.log(data);
    let rows = [];
    let i = 1;
    for (const x in data) {
        rows.push({
            'id': i,
            'name': data[x]['name'],
            'cost of case': data[x]['cost of case'],
            'cost of key': data[x]['cost of key'],
            'Average mill-spec': data[x]['Average mill-spec'],
            'Average restricted': data[x]['Average restricted'],
            'Average classified': data[x]['Average classified'],
            'Average covert': data[x]['Average covert'],
            'Average special': data[x]['Average special'],
            'average return': data[x]['average return'],
            'roi': data[x]['roi']
        })
        i++;
    }
    console.log(rows)
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{flexGrow: 1 }}>
                <DataGrid
                    rows={rows}
                    columns={headers}
                    disableColumnMenu
                    autoHeight
                    hideFooterPagination
                    headerHeight={80}
                    components={{
                        Footer: CustomFooter,
                    }}
                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textOverflow: "clip",
                            whiteSpace: "break-spaces",
                            lineHeight: 1.5
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default CaseTable;