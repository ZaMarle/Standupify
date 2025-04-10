using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class StandupTeam : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Standup");

            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Standup",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StandupTeam",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StandupId = table.Column<int>(type: "integer", nullable: false),
                    TeamId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StandupTeam", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StandupTeam_Standup_StandupId",
                        column: x => x.StandupId,
                        principalTable: "Standup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StandupTeam_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Standup_CreatedByUserId",
                table: "Standup",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_StandupTeam_StandupId",
                table: "StandupTeam",
                column: "StandupId");

            migrationBuilder.CreateIndex(
                name: "IX_StandupTeam_TeamId",
                table: "StandupTeam",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Standup_Users_CreatedByUserId",
                table: "Standup",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Standup_Users_CreatedByUserId",
                table: "Standup");

            migrationBuilder.DropTable(
                name: "StandupTeam");

            migrationBuilder.DropIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup");

            migrationBuilder.DropIndex(
                name: "IX_Standup_CreatedByUserId",
                table: "Standup");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Standup");

            migrationBuilder.AddColumn<List<int>>(
                name: "TeamId",
                table: "Standup",
                type: "integer[]",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup",
                column: "CreatedById",
                unique: true);
        }
    }
}
