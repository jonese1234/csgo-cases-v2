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
                <a href='https://steamcommunity.com/tradeoffer/new/?partner=84809161&token=FddS8eDl' target="_blank" rel="noopener noreferrer" style={{marginRight: '1rem', textDecoration: 'none'}}>Donate skins here</a>
                <a href='https://github.com/sponsors/jonese1234' target="_blank" rel="noopener noreferrer" style={{marginRight: '1rem', textDecoration: 'none'}}>Support this project</a>
                <Link href="https://jonesy.moe" passHref><span style={{cursor: 'pointer', textDecoration: 'none'}}>JONESY.MOE</span></Link>
            </Box>
        </Box>
    );
}

export default Header;