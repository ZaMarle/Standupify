using api.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;
public class VevousDbContext : DbContext
{
    public VevousDbContext(DbContextOptions<VevousDbContext> options) : base(options) { }

    public DbSet<AuthUser> AuthUsers { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(16);
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(16);
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(254);

            entity.ToTable("Users");
        });

        modelBuilder.Entity<AuthUser>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            entity.Property(e => e.UserId)
                .IsRequired();
            entity.Property(e => e.Password)
                .IsRequired()
                .HasMaxLength(32);

            entity.ToTable("AuthUsers");
        });
    }
}
