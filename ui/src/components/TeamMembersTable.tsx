import React, { useEffect, useState } from 'react';
import { Add, Delete } from '@mui/icons-material';
import InviteToTeamModal from '../components/InviteToTeamModal';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import ApiClient from '../dataAccess/ApiClient';
import { useAuth } from './AuthContext';
import TeamMember from '../models/TeamMember';

// function createData(
//     id: number,
//     firstName: string,
//     lastName: string,
//     role: string,
// ) {
//     return { id, firstName, lastName, role };
// }

// const rows = [
//     createData(1, 'Zachary', 'Marley', 'Owner'),
//     createData(2, 'Oliver', 'Brass', 'Admin'),
//     createData(3, 'Jason', 'Millman', 'User'),
// ];

interface ITeamMembersTableProps {
    teamId: number;
}

function TeamMembersTable({ teamId }: ITeamMembersTableProps) {
    const authContext = useAuth();

    const [members, setMembers] = useState<Array<TeamMember>>([]);
    useEffect(() => {
        const fetchMembers = async () => {
            const apiClient = new ApiClient(authContext);
            const res = await apiClient.teams.getMembers(teamId);
            if (!res.ok)
                throw new Error(
                    'Failed to perform: apiClient.teams.getMembers',
                );

            const membersJson = await res.json();

            const members: Array<TeamMember> = membersJson.map(
                (m: any) =>
                    new TeamMember(
                        m.id,
                        m.user.firstName,
                        m.user.lastName,
                        m.role,
                    ),
            );

            setMembers(members);
        };

        fetchMembers();
    }, [teamId, authContext]);

    // InviteToTeamModal
    const [openInviteToTeamModal, setOpenInviteToTeamModal] =
        React.useState(false);
    const handleOpenInviteToTeamModal = () => setOpenInviteToTeamModal(true);
    const handleCloseInviteToTeamModal = () => setOpenInviteToTeamModal(false);

    const handleDelete = () => {};

    return (
        <>
            <InviteToTeamModal
                open={openInviteToTeamModal}
                handleClose={handleCloseInviteToTeamModal}
                teamName="TODO: implement"
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>
                                <IconButton
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
                        {members.map((member) => (
                            <TableRow
                                hover
                                key={member.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {`${member.firstName} ${member.lastName}`}
                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell sx={{ width: 0 }}>
                                    {member.role !== 'Owner' ? (
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleDelete}
                                            color="error"
                                        >
                                            <Delete />
                                        </IconButton>
                                    ) : (
                                        <Box sx={{ height: 40 }} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TeamMembersTable;
