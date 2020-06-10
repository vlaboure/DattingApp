using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DattingApp.api.Migrations
{
    public partial class CreateMessageClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SenderId = table.Column<int>(nullable: false),
                    ReceptId = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(nullable: true),
                    IsRead = table.Column<bool>(nullable: false),
                    MessageSent = table.Column<DateTime>(nullable: false),
                    DateRead = table.Column<DateTime>(nullable: true),
                    SenderDeleted = table.Column<bool>(nullable: false),
                    ReceptDeleted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Users_ReceptId",
                        column: x => x.ReceptId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceptId",
                table: "Messages",
                column: "ReceptId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");
        }
    }
}
