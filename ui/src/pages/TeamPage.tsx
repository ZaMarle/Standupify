import {
    Button,
    Card,
    CardContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import TeamMembersTable from '../components/TeamMembersTable';
import { useParams } from 'react-router-dom';

function createDangerItem(
    id: number,
    title: string,
    body: string,
    btn: string,
) {
    return { id, title, body, btn };
}

const dangerItems = [
    createDangerItem(
        1,
        'Leave this team',
        'You will lose access to team resources and permissions. This action cannot be undone. Make sure you no longer need access before proceeding.',
        'Leave',
    ),
    createDangerItem(
        2,
        'Delete this team',
        'Once you delete a team, there is no going back. Please be certain.',
        'Delete',
    ),
    createDangerItem(
        3,
        'Transfer ownership',
        'Transfer this repository to another user or to an organization where you have the ability to create repositories.',
        'Transfer',
    ),
];

function TeamPage() {
    const { teamId } = useParams<{ teamId: string }>();

    return (
        <>
            <Typography variant="h4" sx={{ mb: 1 }}>
                General
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="body1">Systems</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quam velit repellendus illo, cupiditate tenetur, libero
                        dolor consequuntur magnam atque deserunt voluptatem,
                        alias ut. Facere tempora molestiae sunt eius. Doloribus,
                        molestias. Pariatur facilis totam nesciunt architecto
                        tempora mollitia dolore autem rem?
                    </Typography>
                </CardContent>
            </Card>
            <Typography sx={{ mt: 4, mb: 1 }} variant="h4">
                Members
            </Typography>
            {teamId ? <TeamMembersTable teamId={Number(teamId)} /> : <></>}
            <Typography variant="h4" sx={{ mt: 4, mb: 1 }}>
                Danger Zone
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {dangerItems.map((dangerItem) => (
                            <TableRow
                                hover
                                key={dangerItem.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <h3>{dangerItem.title}</h3>
                                    <p>{dangerItem.body}</p>
                                </TableCell>
                                <TableCell
                                    sx={{ width: 0, textAlign: 'right' }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="error"
                                    >
                                        {dangerItem.btn}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TeamPage;
