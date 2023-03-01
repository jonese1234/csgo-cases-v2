import { Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Case } from "../models/case.model";
import styles from '../../../styles/case.module.css'
import { GetUpdateTimestamp } from "../../shared/api-manager";
import { CustomFooter } from "../../shared/sources-and-market-select";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const priceFormnat = (price: number) => {
    if (Number.isNaN(price) || price == 0) {
        return "-";
    }
    return currencyFormatter.format(price);
}

function CaseHeader({caseData}: {caseData: Case}) {
    const { data, isLoading, isError } = GetUpdateTimestamp();
    if (isError) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    return (
        <div className={styles.tableheader}>
            <h1>{caseData.name}</h1>
            <Box sx={{ padding: '10px', display: 'flex' }}>
                <CustomFooter></CustomFooter>
            </Box>
            <Table sx={{ 
                minWidth: 200, 
                overflow: 'auto', 
                display: {xs: 'block', sm: 'block', md: 'table', lg: 'table', xl: 'table' },
                '& .css-vtdehq-MuiTableCell-root': {borderBottom: '0px'} 
                }} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Cost of Case</TableCell>
                        <TableCell align="center">Cost of Key</TableCell>
                        <TableCell align="center">Average Mil-Spec</TableCell>
                        <TableCell align="center">Average Restricted</TableCell>
                        <TableCell align="center">Average Classified</TableCell>
                        <TableCell align="center">Average Covert</TableCell>
                        <TableCell align="center">Average Special</TableCell>
                        <TableCell align="center">Average Return</TableCell>
                        <TableCell align="center">Return on Investment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{priceFormnat(Number(caseData["cost of case"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["cost of key"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["Average mill-spec"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["Average restricted"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["Average classified"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["Average covert"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["Average special"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(caseData["average return"]))}</TableCell>
                        <TableCell align="center">{Number(caseData.roi).toFixed(2)}%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default CaseHeader;