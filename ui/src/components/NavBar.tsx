import { AccountCircle, Draw } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateStandupModal from './CreateStandupModal';
import { useAuth } from './AuthContext';
import theme from '../theme';
import Sidebar from './Sidebar';

function Navbar() {
    const navigate = useNavigate();

    const { signOut, token } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // PostModal
    const [openPostModal, setOpenPostModal] = React.useState(false);
    const handleOpenPostModal = () => setOpenPostModal(true);
    const handleClosePostModal = () => setOpenPostModal(false);

    // Drawer
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    useEffect(() => {
        if (!isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Vevous
                    </Typography>
                </Toolbar>
            </AppBar>
            <Sidebar />
        </Box>
    );

    return (
        <>
            <CreateStandupModal
                open={openPostModal}
                handleClose={handleClosePostModal}
            />
            <AppBar position="relative">
                {isMobile && (
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                )}
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="div"
                        sx={{
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Vevous
                    </Typography>
                    <div style={{ marginLeft: 'auto' }}>
                        {!token ? (
                            <Button
                                style={{ marginLeft: 'auto' }}
                                onClick={() => navigate('/signin')}
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Sign in
                            </Button>
                        ) : (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenPostModal}
                                    color="inherit"
                                    sx={{ '&:focus': { outline: 'none' } }}
                                >
                                    <Draw />
                                </IconButton>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    sx={{ '&:focus': { outline: 'none' } }}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    disableScrollLock
                                >
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/profile');
                                            handleClose();
                                        }}
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/notifications');
                                            handleClose();
                                        }}
                                    >
                                        Notifications
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            console.log('sign out');
                                            signOut();
                                            navigate('/');
                                        }}
                                    >
                                        Sign out
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
