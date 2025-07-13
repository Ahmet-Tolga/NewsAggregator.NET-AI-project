using System.Net;
using System.Xml.Linq;
using API.Common;
using API.Dtos;
using API.Exceptions;

namespace API.Services;

public class GetDetailsService
{
    private readonly HttpClient httpClient;

    public GetDetailsService(HttpClient httpClient)
    {
        this.httpClient = httpClient;
    }

    public async Task<List<NewsSummaryDto>> GetHurriyetService(string category)
    {
        var rssUrl = $"{Urls.HURRIYET_RSS}{category}";

        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            var items = xml.Descendants("item");

            var result = items.Select(item => new NewsSummaryDto(
            Title: item.Element("title")?.Value ?? "No Title",
            Description: item.Element("description")?.Value ?? "No Description",
            ImgUrl: item.Elements().FirstOrDefault(e => e.Name.LocalName == "content")?.Attribute("url")?.Value ?? "",
            PubDate: item.Element("pubDate")?.Value ?? "",
            Link: item.Element("link")?.Value ?? "",
            Category: item.Element("category")?.Value ?? "",
            Source: "hurriyet"
        )).ToList();

            return result;
        }

        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Beklenmeyen hata: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

    public async Task<List<NewsSummaryDto>> GetYeniAkitService(string category)
    {
        var rssUrl = $"{Urls.YENI_AKIT}{category}";

        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            var items = xml.Descendants("item");

            return items.Select(item =>
            {
                var contentEncoded = item.Element(NameSpaces.content + "encoded")?.Value ?? "";

                var description = item.Element("description")?.Value ?? "";
                var cleanDescription = ParserService.CleanDescription(description);

                return new NewsSummaryDto(
                    Title: item.Element("title")?.Value?.Trim() ?? "Başlık Yok",
                    Description: cleanDescription,
                    ImgUrl: ParserService.ExtractFirstImageUrl(contentEncoded) ?? "",
                    PubDate: item.Element("pubDate")?.Value,
                    Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                    Category: category.ToUpper(),
                    Source: "yeni akit"
                );
            })
            .Where(x => !string.IsNullOrEmpty(x.Title))
            .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Beklenmeyen hata: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }


    public async Task<List<NewsSummaryDto>> GetNtvService(string category)
    {

        var rssUrl = $"{Urls.NTV_RSS}{category}.rss";
        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            var entries = xml.Descendants(NameSpaces.ns + "entry").ToList();

            return entries.Select(entry =>
            {
                var contentHtml = entry.Element(NameSpaces.ns + "content")?.Value ?? "";
                var imgUrl = ParserService.ExtractFirstImageUrl(contentHtml) ?? string.Empty;

                var description = ParserService.CleanDescription(contentHtml);

                return new NewsSummaryDto(
                    Title: WebUtility.HtmlDecode(entry.Element(NameSpaces.ns + "title")?.Value?.Trim() ?? "Başlık Yok"),
                    Description: description,
                    ImgUrl: imgUrl,
                    PubDate: entry.Element(NameSpaces.ns + "published")?.Value ?? entry.Element(NameSpaces.ns + "updated")?.Value,
                    Link: entry.Element(NameSpaces.ns + "link")?.Attribute("href")?.Value ?? string.Empty,
                    Category: category.ToUpper(),
                    Source: "NTV"
                );
            })
            .Where(x => !string.IsNullOrEmpty(x.Title))
            .ToList();
        }

        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Beklenmeyen hata: {ex.Message}",
                sourceUrl: rssUrl);
        }

    }

    public async Task<List<NewsSummaryDto>> GetAHaberService(string category)
    {
        var rssUrl = $"{Urls.A_HABER_RSS}{category}.xml";

        try
        {
            HttpClient httpClient = ClientService.GetCustomClient();
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);


            return xml.Descendants("item")
                .Select(item =>
                {
                    var mediaContent = item.Element(NameSpaces.mediaNs + "content");
                    var imgUrl = mediaContent?.Attribute("url")?.Value ?? string.Empty;

                    var description = item.Element("description")?.Value ?? string.Empty;
                    var cleanDescription = ParserService.CleanDescription(description);

                    return new NewsSummaryDto(
                        Title: item.Element("title")?.Value?.Trim() ?? "Başlık Yok",
                        Description: cleanDescription,
                        ImgUrl: imgUrl,
                        PubDate: item.Element("pubDate")?.Value,
                        Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                        Category: category.ToUpper(),
                        Source: "A HABER"
                    );
                })
                .Where(x => !string.IsNullOrEmpty(x.Title))
                .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "A Haber RSS Error",
                message: $"A Haber haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

    public async Task<List<NewsSummaryDto>> GetHaberturkService(string category)
    {
        var rssUrl = $"{Urls.HABERTURK_RSS}{category}.xml";

        try
        {
            HttpClient httpClient = ClientService.GetCustomClient();
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            var items = xml.Descendants("item");

            return items.Select(item =>
            {
                var title = item.Element("title")?.Value?.Trim() ?? "Başlık Yok";
                var description = item.Element("description")?.Value ?? string.Empty;
                var link = item.Element("link")?.Value?.Trim() ?? string.Empty;
                var pubDate = item.Element("pubDate")?.Value;

                var imgUrl = item.Element("enclosure")?.Attribute("url")?.Value ??
                             ParserService.ExtractFirstImageUrl(description) ?? "";

                var cleanDescription = ParserService.CleanDescription(description);

                return new NewsSummaryDto(
                    Title: WebUtility.HtmlDecode(title),
                    Description: cleanDescription,
                    ImgUrl: imgUrl,
                    PubDate: pubDate,
                    Link: link,
                    Category: category.ToUpper(),
                    Source: "HABERTURK"
                );
            })
            .Where(x => !string.IsNullOrEmpty(x.Title))
            .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Haberturk haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }


    public async Task<List<NewsSummaryDto>> GetSabahService(string category)
    {
        var rssUrl = $"{Urls.SABAH_RSS}{category}.xml";

        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            Console.WriteLine(xml);

            return xml.Descendants("item")
                        .Select(item =>
                        {
                            var description = item.Element("description")?.Value ?? string.Empty;
                            var imgUrl = item.Element(NameSpaces.mediaNs + "content")?.Attribute("url")?.Value ??
                                        ParserService.ExtractFirstImageUrl(description) ?? string.Empty;

                            return new NewsSummaryDto(
                                Title: WebUtility.HtmlDecode(item.Element("title")?.Value?.Trim() ?? "Başlık Yok"),
                                Description: ParserService.CleanDescription(description),
                                ImgUrl: imgUrl,
                                PubDate: item.Element("pubDate")?.Value,
                                Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                                Category: category.ToUpper(),
                                Source: "Sabah"
                            );
                        })
                        .Where(x => !string.IsNullOrEmpty(x.Title))
                        .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Sabah haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

    public async Task<List<NewsSummaryDto>> GetMilliyetService(string category)
    {
        var rssUrl = $"{Urls.MILLIYET}{category}Rss.xml";

        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            return xml.Descendants("item")
                .Select(item =>
                {
                    var description = item.Element("description")?.Value ?? string.Empty;
                    var imgUrl = item.Element("enclosure")?.Attribute("url")?.Value ??
                                 ParserService.ExtractFirstImageUrl(description) ?? "";

                    return new NewsSummaryDto(
                        Title: WebUtility.HtmlDecode(item.Element("title")?.Value?.Trim() ?? "Başlık Yok"),
                        Description: ParserService.CleanDescription(description),
                        ImgUrl: imgUrl,
                        PubDate: item.Element("pubDate")?.Value,
                        Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                        Category: category.ToUpper(),
                        Source: "Milliyet"
                    );
                })
                .Where(x => !string.IsNullOrEmpty(x.Title))
                .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Milliyet haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

    public async Task<List<NewsSummaryDto>> GetSozcuService(string category)
    {
        var rssUrl = $"{Urls.SOZCU_RSS}{category}";

        try
        {
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            return xml.Descendants("item")
                .Select(item =>
                {
                    var description = item.Element("description")?.Value ?? string.Empty;

                    var imgUrl = item.Element(NameSpaces.mediaNs + "content")?.Attribute("url")?.Value ??
                                 item.Element("enclosure")?.Attribute("url")?.Value ??
                                 ParserService.ExtractFirstImageUrl(description) ?? string.Empty;

                    return new NewsSummaryDto(
                        Title: WebUtility.HtmlDecode(item.Element("title")?.Value?.Trim() ?? "Başlık Yok"),
                        Description: ParserService.CleanDescription(description),
                        ImgUrl: imgUrl,
                        PubDate: item.Element("pubDate")?.Value,
                        Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                        Category: category.ToUpper(),
                        Source: "Sözcü"
                    );
                })
                .Where(x => !string.IsNullOrEmpty(x.Title))
                .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Sözcü haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

    public async Task<List<NewsSummaryDto>> GetYeniSafakService(string category)
    {
        var rssUrl = $"{Urls.YENI_SAFAK_RSS}{category}";

        try
        {
            HttpClient httpClient = ClientService.GetCustomClient();
            var response = await httpClient.GetStringAsync(rssUrl);
            var xml = XDocument.Parse(response);

            return xml.Descendants("item")
                .Select(item =>
                {
                    var description = item.Element("description")?.Value ?? string.Empty;
                    var imgUrl = item.Element(NameSpaces.mediaNs + "content")?.Attribute("url")?.Value ??
                                 item.Element("enclosure")?.Attribute("url")?.Value ??
                                 ParserService.ExtractFirstImageUrl(description) ?? string.Empty;

                    return new NewsSummaryDto(
                        Title: WebUtility.HtmlDecode(item.Element("title")?.Value?.Trim() ?? "Başlık Yok"),
                        Description: ParserService.CleanDescription(description),
                        ImgUrl: imgUrl,
                        PubDate: item.Element("pubDate")?.Value,
                        Link: item.Element("link")?.Value?.Trim() ?? string.Empty,
                        Category: category.ToUpper(),
                        Source: "Yeni Şafak"
                    );
                })
                .Where(x => !string.IsNullOrEmpty(x.Title))
                .ToList();
        }
        catch (Exception ex)
        {
            throw new RssParseException(
                status: "RSS Parse Error",
                message: $"Yeni Şafak haber çekme hatası: {ex.Message}",
                sourceUrl: rssUrl);
        }
    }

}