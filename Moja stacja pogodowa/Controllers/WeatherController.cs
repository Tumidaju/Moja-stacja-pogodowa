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
using Microsoft.AspNet.Identity;

namespace Moja_stacja_pogodowa.Controllers
{
    [Authorize]
    public class WeatherController : ApiController
    {
        public WeatherController(DatabaseModel db, IConfigRepository configRepository, IAPIRepository apiRepository)
        {
            _db = db;
            _configRepository = configRepository;
            _apiRepository = apiRepository;
        }
        private readonly DatabaseModel _db;
        private IWeatherRepository _weatherRepository { get; set; }
        private IConfigRepository _configRepository { get; set; }
        private IAPIRepository _apiRepository { get; set; }


        [HttpPost()]
        [Route("api/Weather/FToday")]
        public CurrentWeather FToday()
        {
            CreateWeatherRepo();
            var model = _weatherRepository.getFToday();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F2Days")]
        public TwoDaysWeather F2Days()
        {
            CreateWeatherRepo();
            var model = _weatherRepository.getF2Days();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F5Days")]
        public FiveDaysWeather F5Days()
        {
            CreateWeatherRepo();
            var model = _weatherRepository.getF5Days();
            return model;
        }
        private void CreateWeatherRepo()
        {
            var userId = HttpContext.Current.User.Identity.GetUserId();
            var user = _configRepository.Get(userId);
            var api = _apiRepository.Get(user.APIId);
            switch (user.APIId)
            {
                case 1:
                    _weatherRepository = new OWMWeatherRepository(_db, api.URL,user.APIIKey, user.Latitude, user.Longtitude);
                    break;
                case 2:
                    _weatherRepository = new AWWeatherRepository(_db, api.URL, user.APIIKey, user.Latitude, user.Longtitude);
                    break;
                case 3:
                    _weatherRepository = new WBWeatherRepository(_db, api.URL, user.APIIKey, user.Latitude, user.Longtitude);
                    break;
            }
        }
    }
}
