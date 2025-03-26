using api.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Connect to Db
var password = builder.Configuration["VevousDbPassword"];
var connectionString = builder.Configuration.GetConnectionString("VevousDb").Replace("VevousDbPasswordPlaceholder", password);

// Add services to the container.
builder.Services.AddDbContext<VevousDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
