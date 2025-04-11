import { Card, CardContent, Typography } from '@mui/material';
import UserTeamsTable from '../components/UserTeamsTable';

function ProfilePage() {
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
            <Typography variant="h4" sx={{ mt: 4, mb: 1 }}>
                Teams
            </Typography>
            <UserTeamsTable />
        </>
    );
}

export default ProfilePage;
