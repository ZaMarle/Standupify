import { Add, Delete } from '@mui/icons-material';
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React from 'react';
import InviteToTeamModal from '../components/InviteToTeamModal';

function createData(
    id: number,
    firstName: string,
    lastName: string,
    bio: string,
) {
    return { id, firstName, lastName, bio };
}

const rows = [
    createData(1, 'Zachary', 'Marley', 'Elite Developer'),
    createData(2, 'Oliver', 'Brass', 'Principal Developer'),
];

function TeamPage() {
    const handleDelete = () => {};

    // PostModal
    const [openInviteToTeamModal, setOpenInviteToTeamModal] =
        React.useState(false);
    const handleOpenInviteToTeamModal = () => setOpenInviteToTeamModal(true);
    const handleCloseInviteToTeamModal = () => setOpenInviteToTeamModal(false);

    return (
        <>
            <InviteToTeamModal
                open={openInviteToTeamModal}
                handleClose={handleCloseInviteToTeamModal}
                teamName="TODO: implement"
            />
            <Typography variant="h4">Systems</Typography>
            <Typography variant="body1">
                Elite hackers of IT infrastructure.
            </Typography>
            <Typography sx={{ mt: 2 }} variant="h6">
                Members
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenInviteToTeamModal}
                                    color="default"
                                    sx={{ '&:focus': { outline: 'none' } }}
                                >
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {`${row.firstName} ${row.lastName}`}
                                </TableCell>
                                <TableCell>{row.bio}</TableCell>
                                <TableCell sx={{ width: 0 }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleDelete}
                                        color="error"
                                        sx={{ '&:focus': { outline: 'none' } }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                color="error"
            >
                Leave
            </Button>
        </>
    );
}

export default TeamPage;
