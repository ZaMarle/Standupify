import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ISidebarProps {
    items: Array<{ text: string; path: string }>;
}

function Sidebar({ items }: ISidebarProps) {
    const navigate = useNavigate();

    return (
        <List>
            {items.map((item) => (
                <ListItem key={item.text} disablePadding>
                    <ListItemButton onClick={() => navigate(item.path)}>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
            {/* <ListItem key="Standups" disablePadding>
                <ListItemButton onClick={() => navigate('/Standups')}>
                    <ListItemText primary="Standups" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Teams" disablePadding>
                <ListItemButton onClick={() => navigate('/teams')}>
                    <ListItemText primary="Teams" />
                </ListItemButton>
            </ListItem>
            <ListItem key="Teams" disablePadding>
                <ListItemButton
                    onClick={() => navigate('/OrganizationSettings')}
                >
                    <ListItemText primary="Organization Settings" />
                </ListItemButton>
            </ListItem> */}
        </List>
    );
}

export default Sidebar;
