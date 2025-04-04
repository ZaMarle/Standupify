using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ManyTeamsForUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Team_CreatedById",
                table: "Team");

            migrationBuilder.CreateIndex(
                name: "IX_Team_CreatedById",
                table: "Team",
                column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Team_CreatedById",
                table: "Team");

            migrationBuilder.CreateIndex(
                name: "IX_Team_CreatedById",
                table: "Team",
                column: "CreatedById",
                unique: true);
        }
    }
}
