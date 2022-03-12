import { Divider, Box, Typography } from "@mui/material";
import Link from "next/link";

function Footer() {
    return (
        <footer>
            <Divider />
            <Box>
                <Box py={1} textAlign={{ xs: 'center', md: 'center' }}>
                    <Typography
                    component={'p'}
                    variant={'caption'}
                    color={'textSecondary'}
                    >
                    Designed by Rhys Jones © <Link href="https://jonesy.moe">Jonesy.moe</Link> {(new Date()).getFullYear()} All right reserved
                    </Typography>
                </Box>
            </Box>
        </footer>
    );
}

export default Footer;