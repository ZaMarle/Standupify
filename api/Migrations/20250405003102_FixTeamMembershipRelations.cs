using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FixTeamMembershipRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembership_Team_TeamId1",
                table: "TeamMembership");

            migrationBuilder.DropForeignKey(
                name: "FK_TeamMembership_Users_UserId1",
                table: "TeamMembership");

            migrationBuilder.DropIndex(
                name: "IX_TeamMembership_TeamId1",
                table: "TeamMembership");

            migrationBuilder.DropIndex(
                name: "IX_TeamMembership_UserId1",
                table: "TeamMembership");

            migrationBuilder.DropColumn(
                name: "TeamId1",
                table: "TeamMembership");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "TeamMembership");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TeamId1",
                table: "TeamMembership",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "TeamMembership",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembership_TeamId1",
                table: "TeamMembership",
                column: "TeamId1");

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembership_UserId1",
                table: "TeamMembership",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembership_Team_TeamId1",
                table: "TeamMembership",
                column: "TeamId1",
                principalTable: "Team",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TeamMembership_Users_UserId1",
                table: "TeamMembership",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
