import Team from './Team';

export default class UserTeams {
    id: number;
    team: Team;
    teamId: number;
    userId: number;

    constructor(id: number, team: Team, teamId: number, userId: number) {
        this.id = id;
        this.team = team;
        this.teamId = teamId;
        this.userId = userId;
    }
}
