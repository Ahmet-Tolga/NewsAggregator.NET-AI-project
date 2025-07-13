using System.Xml.Linq;
using API.Common;
using API.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Controller]

[Route("api")]

public class GetDetailsController : ControllerBase
{
    private readonly GetDetailsService getDetailsService;

    public GetDetailsController(GetDetailsService getDetailsService)
    {
        this.getDetailsService = getDetailsService;
    }

    [HttpGet("hurriyet/all/{category}")]
    public async Task<IActionResult> GetHurriyetController([FromRoute] string category)
    {
        var response = await getDetailsService.GetHurriyetService(category);
        return Ok(response);

    }

    [HttpGet("yeni_akit/all/{category}")]
    public async Task<IActionResult> GetYeniAkitController([FromRoute] string category)
    {
        var response = await getDetailsService.GetYeniAkitService(category);
        return Ok(response);

    }

    [HttpGet("ntv/all/{category}")]
    public async Task<IActionResult> GetNtvController([FromRoute] string category)
    {

        var response = await getDetailsService.GetNtvService(category);
        return Ok(response);
    }

    [HttpGet("a_haber/all/{category}")]
    public async Task<IActionResult> GetAHaberController([FromRoute] string category)
    {

        var response = await getDetailsService.GetAHaberService(category);
        return Ok(response);
    }

    [HttpGet("haberturk/all/{category}")]
    public async Task<IActionResult> GetHaberTurkController([FromRoute] string category)
    {

        var response = await getDetailsService.GetHaberturkService(category);
        return Ok(response);
    }

    [HttpGet("sabah/all/{category}")]
    public async Task<IActionResult> GetSabahController([FromRoute] string category)
    {
        var response = await getDetailsService.GetSabahService(category);
        return Ok(response);
    }

    [HttpGet("milliyet/all/{category}")]
    public async Task<IActionResult> GetMilliyetController([FromRoute] string category)
    {
        var response = await getDetailsService.GetMilliyetService(category);
        return Ok(response);
    }

    [HttpGet("sozcu/all/{category}")]
    public async Task<IActionResult> GetSozcuController([FromRoute] string category)
    {
        var response = await getDetailsService.GetSozcuService(category);
        return Ok(response);
    }

    [HttpGet("yeni_safak/all/{category}")]
    public async Task<IActionResult> GetYeniSafakController([FromRoute] string category)
    {
        var response = await getDetailsService.GetYeniSafakService(category);
        return Ok(response);
    }
}