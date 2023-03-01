import { GetAllCasesData, GetUpdateTimestamp } from '../shared/api-manager'
import { DataGrid, GridCallbackDetails, GridFilterModel, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router'
import { UrlObject } from 'url';
import { createContext, useContext, useState } from 'react';
import { FilterContext } from '../Contexts/MarketContext';
import { CustomFooter } from '../shared/sources-and-market-select';


const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const headers = [
    {
        field: 'name',
        headerName: 'Case Name',
        flex: 1.5,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 150
    },
    {
        field: 'cost of case',
        type: 'number',
        headerName: 'Cost of Case',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'cost of key',
        type: 'number',
        headerName: 'Cost of Key',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'Average mill-spec',
        type: 'number',
        headerName: 'Average Mil-spec',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'Average restricted',
        type: 'number',
        headerName: 'Average Restricted',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'Average classified',
        type: 'number',
        headerName: 'Average Classified',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'Average covert',
        type: 'number',
        headerName: 'Average Covert',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'Average special',
        type: 'number',
        headerName: 'Average Special',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'average return',
        type: 'number',
        headerName: 'Average Return on Case',
        valueFormatter: ({ value }: { value: any }) => currencyFormatter.format(Number(value)),
        flex: 1.1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'roi',
        type: 'number',
        headerName: 'Return on Investment',
        valueFormatter: ({ value }: { value: any }) => {return `${value.toFixed(2)}%`},
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    },
    {
        field: 'market',
        headerName: 'market',
        flex: 1,
        headerAlign: 'center' as const,
        align: 'center' as const,
        minWidth: 75
    }
]

const defaultMarket = "Steam";


function  CaseTable() {
    const { data, isLoading, isError } = GetAllCasesData();
    const router = useRouter();
    const navigate = (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
        let name = params.row.name.split(' ').join('-');
        let url = `/case/${name}`;
        return router.push(url);
    }   

    const [filters, setFilters] = useState<GridFilterModel>({
        items:[
            {
                columnField: 'market',
                operatorValue: 'equals',
                value: defaultMarket
            }
        ]
    }); 
    
    if (isError) return <div>Failed to load</div>
    if (isLoading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
              <CircularProgress />
            </Box>
          );
    }
    let rows = [];
    let i = 1;
    
    for (const x in data) {
        let marketPlaces = data[x]['MarketPlaces'];
        for (const y in marketPlaces){
            let market = marketPlaces[y];
            rows.push({
                'id': i,
                'name': data[x]['Name'],
                'cost of case': data[x]['Cost'],
                'cost of key': data[x]['KeyCost'],
                'market': market['Name'],
                'Average mill-spec': market['Average']['Milspec'],
                'Average restricted': market['Average']['Restricted'],
                'Average classified': market['Average']['Classified'],
                'Average covert': market['Average']['Covert'],
                'Average special': market['Average']['Special'],
                'average return': market['Average']['Return'],
                'roi': market['Average']['ROI']
            })
            i++
        }
    }
    console.log(rows);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{flexGrow: 1 }}>
                    <DataGrid
                        rows={rows}
                        columns={headers}
                        disableColumnMenu
                        autoHeight
                        hideFooterPagination
                        headerHeight={80}
                        rowHeight={40}
                        filterModel={filters}
                        onFilterModelChange={(newFilterModel) => {
                                setFilters(newFilterModel)
                            }
                        }
                        components={{
                            Footer: CustomFooter,
                        }}
                        onRowDoubleClick={navigate}
                        sx={{
                            overflow: 'auto', display: 'block',
                            '& .MuiDataGrid-columnHeaderTitle': {
                                textOverflow: "clip",
                                whiteSpace: "break-spaces",
                                lineHeight: 1.5
                            }
                        }}
                        initialState={{
                            columns: {
                                columnVisibilityModel: {
                                market: false
                                },
                            }
                        }}
                    />
                </div>
            </div>
        </FilterContext.Provider>
    );
}

export default CaseTable;