using System.Net;
using System.Text.RegularExpressions;

namespace API.Services;

public static class ParserService
{
    public static string CleanDescription(string description)
    {
        return WebUtility.HtmlDecode(
                       Regex.Replace(description, "<[^>]+?>", ""))
                       .Trim();
    }
    
    public static string ExtractFirstImageUrl(string htmlContent)
    {
    if (string.IsNullOrWhiteSpace(htmlContent)) 
        return string.Empty;

    var classMatch = Regex.Match(htmlContent, 
        "<img[^>]+?class=[\"'](.*?type:primaryImage.*?)[\"'][^>]+?src=[\"'](.+?)[\"']",
        RegexOptions.IgnoreCase);
    
    var metaMatch = Regex.Match(htmlContent,
        "<meta[^>]+?property=[\"']og:image[\"'][^>]+?content=[\"'](.+?)[\"']",
        RegexOptions.IgnoreCase);

    var imgMatch = Regex.Match(htmlContent,
        "<img[^>]+?src=[\"'](.+?)[\"']",
        RegexOptions.IgnoreCase);

    return (classMatch.Success ? classMatch.Groups[2].Value :
           metaMatch.Success ? metaMatch.Groups[1].Value :
           imgMatch.Success ? imgMatch.Groups[1].Value : "")
           .Split('?')[0];
    }
}