﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using api.Infrastructure;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(VevousDbContext))]
    [Migration("20250329002431_EnforceUniqueEmail")]
    partial class EnforceUniqueEmail
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("api.Infrastructure.Entities.AuthUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("character varying(32)");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("AuthUsers", (string)null);
                });

            modelBuilder.Entity("api.Infrastructure.Entities.Standup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Blockers")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<int>("CreatedById")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.PrimitiveCollection<List<int>>("TeamId")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("Today")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Yesterday")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById")
                        .IsUnique();

                    b.ToTable("Standup", (string)null);
                });

            modelBuilder.Entity("api.Infrastructure.Entities.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CreatedById")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById")
                        .IsUnique();

                    b.ToTable("Team", (string)null);
                });

            modelBuilder.Entity("api.Infrastructure.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(254)
                        .HasColumnType("character varying(254)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("character varying(16)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("character varying(16)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("api.Infrastructure.Entities.AuthUser", b =>
                {
                    b.HasOne("api.Infrastructure.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("api.Infrastructure.Entities.AuthUser", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("api.Infrastructure.Entities.Standup", b =>
                {
                    b.HasOne("api.Infrastructure.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("api.Infrastructure.Entities.Standup", "CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("api.Infrastructure.Entities.Team", b =>
                {
                    b.HasOne("api.Infrastructure.Entities.User", null)
                        .WithOne()
                        .HasForeignKey("api.Infrastructure.Entities.Team", "CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
