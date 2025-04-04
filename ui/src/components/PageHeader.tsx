import { Typography } from '@mui/material';

interface PageHeaderProps {
    text: string;
}

function PageHeader({ text }: PageHeaderProps) {
    return (
        <Typography variant="h4" sx={{ mb: 2 }}>
            {text}
        </Typography>
    );
}

export default PageHeader;
