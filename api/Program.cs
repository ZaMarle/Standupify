using api.Infrastructure;
using api.Infrastructure.Repos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://localhost:7250/"; // URL for your identity provider
        options.Audience = "http://localhost:5173/signup"; // Audience, usually your API identifier
        // options.RequireHttpsMetadata = false; // For development, set this to true in production
    });

// Connect to Db
var password = builder.Configuration["VevousDbPassword"];
var connectionString = builder.Configuration.GetConnectionString("VevousDb").Replace("VevousDbPasswordPlaceholder", password);

// Add services to the container.
builder.Services.AddDbContext<VevousDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddTransient<ITeamMembershipsRepository, TeamMembershipsRepository>();
builder.Services.AddTransient<IUsersRepository, UsersRepository>();
builder.Services.AddTransient<ITeamsRepository, TeamsRepository>();
builder.Services.AddTransient<ITeamMembershipsRepository, TeamMembershipsRepository>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Whitelist frontend origin
            .AllowAnyMethod() // Allow all HTTP methods (GET, POST, etc.)
            .AllowAnyHeader() // Allow all headers
            .AllowCredentials(); // Allow cookies/auth headers if needed
    });
});

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowSpecificOrigin");

// Enable Swagger middleware
if (app.Environment.IsDevelopment()) // Only enable in development
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        options.RoutePrefix = string.Empty; // Access at root (localhost:5000)
    });
}

app.UseAuthentication();  // Ensure authentication middleware is in place
app.UseAuthorization();   // Authorization would typically be added if you need it

app.MapControllers();

app.Run();
