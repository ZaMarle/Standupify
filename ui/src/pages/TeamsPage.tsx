import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Team from '../models/Team';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import ApiClient from '../dataAccess/ApiClient';

function TeamsPage() {
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

    return (
        <>
            <PageHeader text="Teams" />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow
                                hover
                                key={team.name}
                                sx={{
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                onClick={() => navigate(`${team.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {team.name}
                                </TableCell>
                                <TableCell>{team.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TeamsPage;
