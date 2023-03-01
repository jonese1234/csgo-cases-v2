import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useState, useContext } from "react";
import { FilterContext } from "../Contexts/MarketContext";
import { GetUpdateTimestamp } from "./api-manager";

export function MarketSelect() {
    const [market, setMarket] = useState('Steam');
    const {filters, setFilters} = useContext(FilterContext);
  
    const handleChange = (event: SelectChangeEvent) => {
        setMarket(event.target.value);
        
        let filters: GridFilterModel = {
            items:[
                {
                    columnField: 'market',
                    operatorValue: 'equals',
                    value: event.target.value
                }
            ]
        }
        setFilters(filters);
    };
  
    return (
      <FormControl sx={{ m: 1, minWidth: 150, margin: '0px', marginLeft: '1rem' }} size="small">
        <InputLabel id="market-select-small">Market</InputLabel>
        <Select
          labelId="market-select-small"
          id="market-select-small"
          value={market}
          label="Market"
          onChange={handleChange}
          defaultValue="Steam"
        >
          <MenuItem value={"Steam"}>Steam</MenuItem>
          <MenuItem value={"Csmoney"}>Csmoney</MenuItem>
          <MenuItem value={"Bitskins"}>Bitskins</MenuItem>
          <MenuItem value={"Lootfarm"}>Lootfarm</MenuItem>
          <MenuItem value={"Csgotm"}>Csgotm</MenuItem>
          <MenuItem value={"Skinport"}>Skinport</MenuItem>
          <MenuItem value={"Csgotrader"}>Csgotrader</MenuItem>
          <MenuItem value={"Csgoempire"}>Csgoempire</MenuItem>
          <MenuItem value={"Swapgg"}>Swapgg</MenuItem>
          <MenuItem value={"Csgoexo"}>Csgoexo</MenuItem>
          <MenuItem value={"Cstrade"}>Cstrade</MenuItem>
          <MenuItem value={"Buff163"}>Buff163</MenuItem>
        </Select>
      </FormControl>
    );
  }

export function CustomFooter(){
    const { data, isLoading, isError } = GetUpdateTimestamp();
    if (isError) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    return(
        <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <i>Sources: <a href="https://github.com/jonese1234/Csgo-Case-Data" target="_blank" rel="noopener noreferrer">Csgo Case Data</a> &amp; <a href="https://csgotrader.app/prices/" target="_blank" rel="noopener noreferrer">Csgo Trader.app</a>. Data is current as of {data} UTC</i>
            <MarketSelect></MarketSelect>
        </Box>
    );
}