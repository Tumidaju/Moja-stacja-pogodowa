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
using Moja_stacja_pogodowa.Interfaces;

namespace Moja_stacja_pogodowa.Controllers
{
    [Authorize]
    public class WeatherController : ApiController
    {
        public WeatherController(DBModel db, IConfigRepository configRepository, IAPIRepository apiRepository, IWidgetsRepository widgetRepository)
        {
            _db = db;
            _configRepository = configRepository;
            _apiRepository = apiRepository;
            _widgetRepository = widgetRepository;
        }
        private readonly DBModel _db;
        private IWeatherRepository _weatherRepository { get; set; }
        private IWidgetsRepository _widgetRepository { get; set; }
        private IConfigRepository _configRepository { get; set; }
        private IAPIRepository _apiRepository { get; set; }


        [HttpPost()]
        [Route("api/Weather/FToday")]
        public string FToday([FromBody()] GetWeatherModel getWeatherModel)
        {
            CreateWeatherRepo(getWeatherModel.WidgetId);
            var model = _weatherRepository.getFToday();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F2Days")]
        public string F2Days([FromBody()] GetWeatherModel getWeatherModel)
        {
            CreateWeatherRepo(getWeatherModel.WidgetId);
            var model = _weatherRepository.getF2Days();
            return model;
        }
        [HttpPost()]
        [Route("api/Weather/F5Days")]
        public string F5Days([FromBody()] GetWeatherModel getWeatherModel)
        {
            CreateWeatherRepo(getWeatherModel.WidgetId);
            var model = _weatherRepository.getF5Days();
            return model;
        }
        private void CreateWeatherRepo(int WidgetId)
        {
            var userId = HttpContext.Current.User.Identity.GetUserId();
            var user = _configRepository.Get(userId);
            var widget = _widgetRepository.GetWidget(WidgetId);
            var api = _apiRepository.Get(widget.APIId);
            switch (widget.APIId)
            {
                case 1:
                    _weatherRepository = new OWMWeatherRepository(_db, api.URL,user.OWMKey, widget);
                    break;
                case 2:
                    _weatherRepository = new AWWeatherRepository(_db, api.URL, user.AWKey, widget);
                    break;
                case 3:
                    _weatherRepository = new WBWeatherRepository(_db, api.URL, user.WBKey, widget);
                    break;
            }
        }
    }
}
