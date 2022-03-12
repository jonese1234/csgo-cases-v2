import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Link from "next/link";

function Header() {
    return (
        <Box height={36} display={'flex'}>
            <Box sx={{ flex: 1, marginLeft: '1rem'}}>
                <Link href="/" passHref><span style={{cursor: 'pointer'}}><HomeIcon fontSize="large" /></span></Link>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center',  marginRight: '1rem', fontWeight: 700, fontFamily: 'Montserrat'}}>
                <Link href="https://jonesy.moe" passHref><span style={{cursor: 'pointer', textDecoration: 'none'}}>JONESY.MOE</span></Link>
            </Box>
        </Box>
    );
}

export default Header;