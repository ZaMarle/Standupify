import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function createData(id: number, name: string, description: string) {
    return { id, name, description };
}

const rows = [
    createData(1, 'Systems', 'Elite hackers of IT infrastructure.'),
    createData(
        2,
        'Software Development',
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate ex harum numquam, ipsum vel animi mollitia aliquid nesciunt saepe iste dicta? Repudiandae molestiae molestias non quia dolore? Vel corrupti doloremque nemo ad nam excepturi, magnam sequi ab. Neque, provident cumque.',
    ),
    createData(3, 'Front End Development', 'Typescript go brr.'),
    createData(4, 'Engineering', 'We enjoy water.'),
];

function TeamsPage() {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant="h4">Teams</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.name}
                                sx={{
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                onClick={() => navigate(`${row.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TeamsPage;
