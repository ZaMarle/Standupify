import Team from '../models/Team';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import ApiClient from '../dataAccess/ApiClient';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import CreateTeamModal from './CreateTeamModal';

function UserTeamsTable() {
    const navigate = useNavigate();
    const authContext = useAuth();

    const [teams, setTeams] = useState<Array<Team>>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const apiClient = new ApiClient(authContext);
            const userId = authContext.token?.userId;
            if (!userId) return;

            const getTeamsRes = await apiClient.users.getTeams(userId);
            if (!getTeamsRes.ok)
                throw new Error('Failed to perform: apiClient.users.getTeams');

            const teamsJson = await getTeamsRes.json();

            const teams: Array<Team> = teamsJson.map((t: any) => ({
                id: t.team.id,
                name: t.team.name,
                description: t.team.description,
                createdById: t.team.createdById,
                createdDate: t.team.createdDate,
            }));

            setTeams(teams);
        };

        fetchTeams();
    }, [authContext]);

    // CreateTeamModal
    const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
    const handleOpenCreateTeamModal = () => setOpenCreateTeamModal(true);
    const handleCloseCreateTeamModal = () => setOpenCreateTeamModal(false);

    return (
        <>
            <CreateTeamModal
                open={openCreateTeamModal}
                handleClose={handleCloseCreateTeamModal}
                handleCreate={(team: Team) => {
                    const newTeams = teams;
                    newTeams.push(team);
                    setTeams(newTeams);
                    handleCloseCreateTeamModal();
                }}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell sx={{ width: '1%' }}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenCreateTeamModal}
                                    color="default"
                                    sx={{ '&:focus': { outline: 'none' } }}
                                >
                                    <Add />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow
                                hover
                                key={team.id}
                                sx={{
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                onClick={() => navigate(`/team/${team.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {team.name}
                                </TableCell>
                                <TableCell>{team.description}</TableCell>
                                <TableCell sx={{ width: 0 }}></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default UserTeamsTable;
