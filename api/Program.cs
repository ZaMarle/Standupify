using System.Text;
using api.Helper;
using api.Infrastructure;
using api.Infrastructure.Repos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://localhost:7250",

            ValidateAudience = true,
            ValidAudience = "http://localhost:5173",

            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),

            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero // Ensure token expiration is precise
        };
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
builder.Services.AddTransient<JwtService, JwtService>(sp => new JwtService(builder.Configuration["Jwt:Key"]));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://localhost:5173") // Whitelist frontend origin
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
