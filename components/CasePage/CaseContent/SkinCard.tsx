import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Table, TableBody, TableCell, TableHead, TableRow, Link} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Rarity, Skin } from "../models/case.model";

const useStyles = makeStyles(() => ({
    ribbon: {
        textAlign: 'center',
        color: 'rgba(0,0,0,0.87)',
        letterSpacing: 1
    },
}));

const headerColour = (type: Rarity) => {
    switch (type){
        case(Rarity.MilSpecGrade):
            return 'rgb(175 212 243)';
        case(Rarity.Restricted):
            return 'rgb(197 182 243)';
        case(Rarity.Classified):
            return 'rgb(245 151 251)';
        case(Rarity.Covert):
            return 'rgb(255 186 186)';
        case(Rarity.Special):
            return 'rgb(245 247 133)';
    }
}

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

interface SkinRow {
    name: string;
    stPrice: number | undefined;
    normalPrice: number | undefined;
}

function SkinCard({skin}: {skin: Skin}) {
    const styles = useStyles();
    let wears = ["FN", "MW", "FT", "WW" ,"BS"]
    let rows: SkinRow[] = [];
    let searchUrl = `https://steamcommunity.com/market/search?appid=730&q=${skin.name}`

    for (const id in wears){
        let wear = wears[id];
        let normal = skin.prices[wear] ?? undefined;
        let st = skin.prices[`ST${wear}`] ?? undefined;
        let row: SkinRow = {
            name: wear,
            stPrice: st,
            normalPrice: normal
        }
        rows.push(row);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={
                    <a href={searchUrl} target="_blank" rel="noopener noreferrer">{skin.name}</a>
                }
                subheader={skin.rarity}
                className={styles.ribbon}
                sx = {{ "backgroundColor": headerColour(skin.rarity as Rarity)}}
            />
            <CardContent>
            <Table size="small">
                <TableHead>
                    <TableRow>
                    <TableCell>Wear</TableCell>
                    <TableCell align="right">StatTrack</TableCell>
                    <TableCell align="right">Normal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{priceFormnat(Number(row.stPrice))}</TableCell>
                        <TableCell align="right">{priceFormnat(Number(row.normalPrice))}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );
}

export default SkinCard;