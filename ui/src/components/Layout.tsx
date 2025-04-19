import { Box, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Outlet } from 'react-router-dom';
import theme from '../theme';
import Navbar from './Navbar';
import { ReactElement } from 'react';

interface ILayoutProps {
    sidebar: ReactElement;
}

function Layout({ sidebar }: ILayoutProps) {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
            }}
        >
            <Navbar />
            <Box
                sx={{
                    display: 'grid',
                    height: '100%',
                    overflow: 'hidden',
                    ...(!isMobile
                        ? {
                              gridTemplateColumns: '260px 1fr',
                          }
                        : {}),
                }}
            >
                {!isMobile && <Grid size={{ md: 3 }}>{sidebar}</Grid>}

                <Grid
                    sx={{ overflowY: 'scroll', height: '100%' }}
                    size={{ xs: 12, md: 9 }}
                >
                    <Box sx={{ p: 2 }}>
                        <Outlet />
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default Layout;
