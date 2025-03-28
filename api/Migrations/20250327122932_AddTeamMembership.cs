using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamMembership : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Standups",
                table: "Standups");

            migrationBuilder.RenameTable(
                name: "Standups",
                newName: "Standup");

            migrationBuilder.AlterColumn<string>(
                name: "Yesterday",
                table: "Standup",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Today",
                table: "Standup",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Standup",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "CURRENT_TIMESTAMP",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AlterColumn<string>(
                name: "Blockers",
                table: "Standup",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<List<int>>(
                name: "TeamId",
                table: "Standup",
                type: "integer[]",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Standup",
                table: "Standup",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TeamMembership",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TeamId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamMembership", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamMembership_Team_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Team",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TeamMembership_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup",
                column: "CreatedById",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembership_TeamId",
                table: "TeamMembership",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamMembership_UserId",
                table: "TeamMembership",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Standup_Users_CreatedById",
                table: "Standup",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Standup_Users_CreatedById",
                table: "Standup");

            migrationBuilder.DropTable(
                name: "TeamMembership");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Standup",
                table: "Standup");

            migrationBuilder.DropIndex(
                name: "IX_Standup_CreatedById",
                table: "Standup");

            migrationBuilder.DropColumn(
                name: "TeamId",
                table: "Standup");

            migrationBuilder.RenameTable(
                name: "Standup",
                newName: "Standups");

            migrationBuilder.AlterColumn<string>(
                name: "Yesterday",
                table: "Standups",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Today",
                table: "Standups",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedDate",
                table: "Standups",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "CURRENT_TIMESTAMP");

            migrationBuilder.AlterColumn<string>(
                name: "Blockers",
                table: "Standups",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Standups",
                table: "Standups",
                column: "Id");
        }
    }
}
