using api.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure;
public class VevousDbContext : DbContext
{
    public VevousDbContext(DbContextOptions<VevousDbContext> options) : base(options) { }

    public DbSet<AuthUser> AuthUsers { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<Standup> Standups { get; set; }
    // public DbSet<TeamMembership> TeamMemberships { get; set; }

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
            entity.HasIndex(e => e.Email)
                .IsUnique();

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
                .HasMaxLength(127);

            // Foreign key relation
            entity.HasOne<User>()
                .WithOne()
                .HasForeignKey<AuthUser>(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.ToTable("AuthUsers");
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(64);
            entity.Property(e => e.Description)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.CreatedById)
                .IsRequired();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Foreign key relation
            entity.HasOne<User>()
                .WithOne()
                .HasForeignKey<Team>(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Cascade);

            entity.ToTable("Team");
        });

        modelBuilder.Entity<Standup>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd();
            entity.Property(e => e.Yesterday)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Today)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.Blockers)
                .IsRequired()
                .HasMaxLength(255);
            entity.Property(e => e.CreatedById)
                .IsRequired();
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Foreign key relation
            entity.HasOne<User>()
                .WithOne()
                .HasForeignKey<Standup>(a => a.CreatedById)
                .OnDelete(DeleteBehavior.Cascade);

            entity.ToTable("Standup");
        });

        // modelBuilder.Entity<TeamMembership>(entity =>
        // {
        //     entity.HasKey(e => e.Id);
        //     entity.Property(e => e.Id)
        //         .ValueGeneratedOnAdd();

        //     entity.Property(e => e.TeamId)
        //         .IsRequired();

        //     entity.HasOne<Team>()
        //         .WithMany()
        //         .HasForeignKey(e => e.TeamId)
        //         .OnDelete(DeleteBehavior.Cascade);

        //     entity.Property(e => e.UserId)
        //         .IsRequired();

        //     entity.HasOne<User>()
        //         .WithMany()
        //         .HasForeignKey(e => e.UserId)
        //         .OnDelete(DeleteBehavior.Cascade);

        //     entity.ToTable("TeamMembership");
        // });
    }
}
