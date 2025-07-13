namespace API.Dtos;

public record NewsSummaryDto(
    string Title,
    string ImgUrl,
    string Description,
    string PubDate,
    string Link,
    string Category,
    string Source
);