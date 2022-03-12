import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Case } from "../models/case.model";
import styles from '../../../styles/case.module.css'

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

function CaseHeader({data}: {data: Case}) {

    return (
        <div className={styles.tableheader}>
            <h1>{data.name}</h1>
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
                        <TableCell align="center">{priceFormnat(Number(data["cost of case"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["cost of key"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["Average mill-spec"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["Average restricted"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["Average classified"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["Average covert"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["Average special"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data["average return"]))}</TableCell>
                        <TableCell align="center">{priceFormnat(Number(data.roi))}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default CaseHeader;