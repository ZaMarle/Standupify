namespace api.Models;
public record CreateStandupFormDto(
    string Yesterday,
    string Today,
    string Blockers,
    List<int> TeamIds,
    int CreatedById);
