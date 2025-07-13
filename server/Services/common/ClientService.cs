using System.Net;
using API.Common;

namespace API.Services;

public static class ClientService
{
    public static HttpClient GetCustomClient()
    {
        var handler = new HttpClientHandler

        {
            UseCookies = true,
            CookieContainer = new CookieContainer(),
            AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
            AllowAutoRedirect = true,
            UseProxy = false
        };

        var httpClient = new HttpClient(handler);

        httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(ClientConstants.UserAgent);
    
        return httpClient;
   }
}