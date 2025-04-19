using api.Infrastructure.Entities;
using api.Infrastructure.Specifications;
using NodaTime;

namespace api.test;
public class StandupsPageFilterSpecTests
{
    private static DateTimeOffset FromLocalTz(string localTimeStr, string tz)
    {
        var localTime = LocalDateTime.FromDateTime(DateTime.Parse(localTimeStr));
        var zone = DateTimeZoneProviders.Tzdb[tz];
        return localTime.InZoneLeniently(zone).ToDateTimeOffset();
    }

    [Fact]
    public void BeforeRangeFailsOk()
    {
        var date = new DateTime(2025, 04, 18);
        var spec = new StandupsPageFilterSpec(date, [], []);

        var timezones = new[]
        {
            "Australia/Brisbane",
            "Asia/Aqtau",
            "Europe/Istanbul",
            "America/Sao_Paulo",
            "America/Los_Angeles"
        };

        foreach (var tz in timezones)
        {
            var offsetBeforeMidnight = FromLocalTz("2025-04-18 00:00:00", tz).AddTicks(-1);

            var standup = new Standup("", "", "", 42, tz)
            {
                CreatedDate = offsetBeforeMidnight
            };

            var standupTeam = new StandupTeam(0, 1) { Standup = standup };

            Assert.False(spec.IsSatisfiedBy(standupTeam), $"Expected standup in {tz} to be before range.");
        }
    }

    [Fact]
    public void FirstInRangeOk()
    {
        var date = new DateTime(2025, 04, 18);
        var spec = new StandupsPageFilterSpec(date, [], []);

        var timezones = new[]
        {
            "Australia/Brisbane",
            "Asia/Aqtau",
            "Europe/Istanbul",
            "America/Sao_Paulo",
            "America/Los_Angeles"
        };

        foreach (var tz in timezones)
        {
            var offsetBeforeMidnight = FromLocalTz("2025-04-18 00:00:00", tz);

            var standup = new Standup("", "", "", 42, tz)
            {
                CreatedDate = offsetBeforeMidnight
            };

            var standupTeam = new StandupTeam(0, 1) { Standup = standup };

            Assert.True(spec.IsSatisfiedBy(standupTeam));
        }
    }

    [Fact]
    public void LastInRangeOk()
    {
        var date = new DateTime(2025, 04, 18);
        var spec = new StandupsPageFilterSpec(date, [], []);

        var timezones = new[]
        {
            "Australia/Brisbane",
            "Asia/Aqtau",
            "Europe/Istanbul",
            "America/Sao_Paulo",
            "America/Los_Angeles"
        };

        foreach (var tz in timezones)
        {
            var offsetBeforeMidnight = FromLocalTz("2025-04-18 00:00:00", tz).AddDays(1).AddTicks(-1);

            var standup = new Standup("", "", "", 42, tz)
            {
                CreatedDate = offsetBeforeMidnight
            };

            var standupTeam = new StandupTeam(0, 1) { Standup = standup };

            Assert.True(spec.IsSatisfiedBy(standupTeam));
        }
    }

    [Fact]
    public void AfterRangeOk()
    {
        var date = new DateTime(2025, 04, 18);
        var spec = new StandupsPageFilterSpec(date, [], []);

        var timezones = new[]
        {
            "Australia/Brisbane",
            "Asia/Aqtau",
            "Europe/Istanbul",
            "America/Sao_Paulo",
            "America/Los_Angeles"
        };

        foreach (var tz in timezones)
        {
            var offsetBeforeMidnight = FromLocalTz("2025-04-18 00:00:00", tz).AddDays(1);

            var standup = new Standup("", "", "", 42, tz)
            {
                CreatedDate = offsetBeforeMidnight
            };

            var standupTeam = new StandupTeam(0, 1) { Standup = standup };

            Assert.False(spec.IsSatisfiedBy(standupTeam));
        }
    }

    [Fact]
    public void MissingTeamIdOk()
    {
        var date = new DateTime(2023, 10, 10);
        var teamIds = new List<int> { 2 };
        var spec = new StandupsPageFilterSpec(date, teamIds, []);

        var ts = new StandupTeam(0, 1)
        {
            Standup = new Standup("", "", "", 42, "Australia/Brisbane")
            {
                CreatedDate = date,
            }
        };

        Assert.False(spec.IsSatisfiedBy(ts));
    }

    [Fact]
    public void ContainsTeamOk()
    {
        var date = new DateTime(2023, 10, 10);
        var teamIds = new List<int> { 2 };
        var spec = new StandupsPageFilterSpec(date, teamIds, []);

        var ts = new StandupTeam(0, 2)
        {
            Standup = new Standup("", "", "", 42, "Australia/Brisbane")
            {
                CreatedDate = date,
            }
        };

        Assert.True(spec.IsSatisfiedBy(ts));
    }

    [Fact]
    public void EmptyTeamsOk()
    {
        var date = new DateTime(2023, 10, 10);
        var spec = new StandupsPageFilterSpec(date, [], []);

        var ts = new StandupTeam(0, 2)
        {
            Standup = new Standup("", "", "", 42, "Australia/Brisbane")
            {
                CreatedDate = date,
            }
        };

        Assert.True(spec.IsSatisfiedBy(ts));
    }


    [Fact]
    public void Should_Throw_When_Standup_IsNull()
    {
        var date = new DateTime(2023, 10, 10);
        var teamIds = new List<int>();
        var userIds = new List<int>();
        var spec = new StandupsPageFilterSpec(date, teamIds, userIds);

        var ts = new StandupTeam(0, 1)
        {
            Standup = null
        };

        Assert.Throws<ArgumentException>(() => spec.IsSatisfiedBy(ts));
    }
}
