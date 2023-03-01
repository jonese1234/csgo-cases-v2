import React, { createContext, useContext } from 'react';
import { GridFilterModel } from '@mui/x-data-grid';


const defaultMarket = "Steam";

interface FilterContextProps {
    filters: GridFilterModel;
    setFilters: (filters: GridFilterModel) => void;
}

export const FilterContext = createContext<FilterContextProps>({
    filters:{
        items:[
            {
                columnField: 'market',
                operatorValue: 'equals',
                value: defaultMarket
            }
        ]
    },
    setFilters: () => {}
});