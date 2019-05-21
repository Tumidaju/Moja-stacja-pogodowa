using Moja_stacja_pogodowa.Models.Weather;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Moja_stacja_pogodowa.Controllers
{
    [Authorize]
    public class WeatherController : ApiController
    {
        [HttpPost()]
        [Route("api/Weather/Today")]
        public CurrentWeather Today()
        {
            var model = new CurrentWeather() { Temperature = "-43", WindSpeed = "Działa tak jak trzeba" };
            return model;
        }
    }
}
