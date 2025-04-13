using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveShadowPropertyColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Standup_Users_CreatedByUserId",
                table: "Standup");

            migrationBuilder.DropIndex(
                name: "IX_Standup_CreatedByUserId",
                table: "Standup");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Standup");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Standup",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Standup_CreatedByUserId",
                table: "Standup",
                column: "CreatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Standup_Users_CreatedByUserId",
                table: "Standup",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
