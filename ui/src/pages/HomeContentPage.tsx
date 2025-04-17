import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Standup from '../models/Standup';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuth } from '../components/AuthContext';
import { useEffect, useState } from 'react';
import Team from '../models/Team';
import ApiClient from '../dataAccess/ApiClient';
import { Controller, useForm } from 'react-hook-form';
import IFilterStandupsForm from '../interfaces/IFilterStandupsForm';
import dayjs from 'dayjs';
import User from '../models/User';

function HomeContentPage() {
    const authContext = useAuth();

    // Filter form
    const filterForm = useForm<IFilterStandupsForm>({
        defaultValues: {
            date: new Date(),
        },
    });
    const filterFormTeamIds = filterForm.watch('teamIds');

    const onSubmit = async (data: IFilterStandupsForm) => {
        console.log('submit');
        console.log(data);
        getStandups(data);
    };

    // Fetch standups
    const [standups, setStandups] = useState<Array<Standup>>([]);
    useEffect(() => {
        getStandups(filterForm.getValues());
    }, []);

    const getStandups = (data: IFilterStandupsForm) => {
        const fetchStandups = async () => {
            const apiClient = new ApiClient(authContext);

            const res = await apiClient.standups.list(data);
            console.log(res);

            if (!res.ok)
                throw new Error('Failed to perform: apiClient.standups.list');

            const resJson = await res.json();
            console.log(resJson);

            const standups: Array<Standup> = resJson.map((t: any) => ({
                id: t.id,
                yesterday: t.yesterday,
                today: t.today,
                blockers: t.blockers,
                createdBy: 'string',
                createdDate: new Date(),
            }));

            console.log(standups);

            setStandups(standups);
        };

        fetchStandups();
    };

    // Fetch teams for dropdown
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

    // Fetch users from dropdown
    const [users, setUsers] = useState<Array<User>>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            // I want to get all the users in the selected teams
            if (teams.length == 0) {
                return;
            }

            let teamsToSearch: Array<number> = [];

            if (filterFormTeamIds && filterFormTeamIds.length > 0) {
                teamsToSearch = filterFormTeamIds;
            } else {
                teamsToSearch = teams.map((t) => t.id);
            }

            const apiClient = new ApiClient(authContext);
            const res = await apiClient.teams.getMembers(teamsToSearch);
            const teamMembersJson = await res.json();

            const fetchedUsers: Array<User> = [];
            teamMembersJson.forEach((tm: any) => {
                if (fetchedUsers.some((u) => u.id == tm.user.id)) {
                    return;
                }

                const user = {
                    id: tm.user.id,
                    firstName: tm.user.firstName,
                    lastName: tm.user.lastName,
                    email: '',
                };

                fetchedUsers.push(user);
            });

            setUsers(fetchedUsers);
        };

        fetchUsers();
    }, [teams, filterFormTeamIds, authContext]);

    return (
        <>
            <Box sx={{ mb: 2 }}>
                <form
                    onSubmit={filterForm.handleSubmit(onSubmit)}
                    style={{ width: '100%' }}
                >
                    <Controller
                        name="date"
                        control={filterForm.control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    {...field}
                                    value={
                                        field.value ? dayjs(field.value) : null
                                    }
                                    onChange={(date) => field.onChange(date)}
                                />
                            </LocalizationProvider>
                        )}
                    />
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel id="teams-label">Teams</InputLabel>
                        <Controller
                            name="teamIds"
                            control={filterForm.control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="teams-label"
                                    id="teams-checkbox"
                                    multiple
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                        teams
                                            .filter((t) =>
                                                selected.includes(t.id),
                                            )
                                            .map((t) => t.name)
                                            .join(', ')
                                    }
                                >
                                    {teams.map((team) => (
                                        <MenuItem key={team.id} value={team.id}>
                                            <Checkbox
                                                checked={field.value.includes(
                                                    team.id,
                                                )}
                                            />
                                            <ListItemText primary={team.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                            Users
                        </InputLabel>
                        <Controller
                            name="userIds"
                            control={filterForm.control}
                            defaultValue={[]}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) =>
                                        users
                                            .filter((u) =>
                                                selected.includes(u.id),
                                            )
                                            .map(
                                                (u) =>
                                                    `${u.firstName} ${u.lastName}`,
                                            )
                                            .join(', ')
                                    }
                                >
                                    {users.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            <Checkbox
                                                checked={field.value.includes(
                                                    user.id,
                                                )}
                                            />
                                            <ListItemText
                                                primary={`${user.firstName} ${user.lastName}`}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Button
                        sx={{ mt: 2 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Search
                    </Button>
                </form>
            </Box>
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

export default HomeContentPage;
