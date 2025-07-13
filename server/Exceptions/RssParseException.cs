namespace API.Exceptions;

public class RssParseException : Exception
{
    public string Status { get; }
    public string SourceUrl { get; }

    public RssParseException(string status, string message, string sourceUrl)
        : base(message)
    {
        Status = status;
        SourceUrl = sourceUrl;
    }

    public override string ToString()
    {
        return $"Status: {Status}, Message: {Message}, Source: {SourceUrl}";
    }
}