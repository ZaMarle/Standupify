import { Card, CardContent, Typography } from '@mui/material';
import Standup from '../models/Standup';

function HomePage() {
    const standups = [
        new Standup(
            1,
            'Zac Marley',
            new Date(),
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet harum quia impedit magni voluptatum esse veritatis, ipsa ratione fuga blanditiis deleniti corporis fugit expedita?',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, accusantium?',
            'none im a beast',
        ),
        new Standup(
            2,
            'Zac Marley',
            new Date(),
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla harum blanditiis architecto earum. Consequuntur magnam perferendis fugiat omnis hic, quidem at laudantium quod harum tempore beatae. Illum, aliquid minus explicabo rem eius deserunt molestiae ducimus nulla fuga harum quos labore dolore sit neque ratione, nostrum accusantium! Porro impedit vel eum, iste, officiis necessitatibus omnis voluptate sit aperiam cupiditate quia ipsum? Optio perferendis obcaecati nostrum maiores eveniet quam voluptatem harum reiciendis.',
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, veritatis suscipit quidem perspiciatis et incidunt quos culpa, asperiores, est dicta esse commodi fugit hic ex repellendus sunt velit quisquam consectetur. Voluptatem vel voluptas autem impedit commodi enim recusandae blanditiis, debitis expedita dolores dolorum rerum id fugiat modi aut cumque. Harum nam neque nobis nihil dignissimos cum, eos, repellendus ipsa quidem voluptatum facere? Vitae blanditiis mollitia itaque labore natus ratione tempora, iure architecto nulla soluta voluptatum, quis nesciunt est corporis dolore provident possimus dolores modi ad. Dicta nostrum voluptatibus velit dolorem?',
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maxime, iste, dolore itaque explicabo harum perferendis ex doloremque nam minus illum ratione.',
        ),
    ];
    return (
        <>
            {standups.map((standup) => (
                <Card sx={{ width: '100%', mb: 2 }} key={standup.id}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {standup.createdBy} | {''}
                            {`${standup.createdDate.getDate()}-${standup.createdDate.getMonth()}-${standup.createdDate.getFullYear()}`}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Yesterday
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {standup.yesterday}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Today
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {standup.today}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1 }}>
                            Blockers
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                        >
                            {standup.blockers}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export default HomePage;
