using Moja_stacja_pogodowa.Models.Weather;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Moja_stacja_pogodowa.Controllers
{
    [System.Web.Http.Authorize]
    public class WeatherController : ApiController
    {
        public TodayWeather Today()
        {
            var model = new TodayWeather() { Temperature = "-43", WindSpeed = "Działa tak jak trzeba" };
            return model;
        }
    }
}
