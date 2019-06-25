using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;

namespace Moja_stacja_pogodowa.Controllers
{
    [Authorize]
    public class WeatherController : ApiController
    {
        public WeatherController(DatabaseModel db)
        {
            var UserAPI = 1;
            switch(UserAPI)
            {
                case 1:
                    _weatherRepository = new OWMWeatherRepository(db);
                    break;
                case 2:
                    _weatherRepository = new AWWeatherRepository(db);
                    break;
                case 3:
                    _weatherRepository = new WBWeatherRepository(db);
                    break;
            }
        }

        private IWeatherRepository _weatherRepository { get; set; }
        [HttpPost()]
        [Route("api/Weather/FToday")]
        public CurrentWeather FToday()
        {
            var model = _weatherRepository.getFToday();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F2Days")]
        public TwoDaysWeather F2Days()
        {
            var model = _weatherRepository.getF2Days();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F5Days")]
        public FiveDaysWeather F5Days()
        {
            var model = _weatherRepository.getF5Days();
            return model;
        }
    }
}
