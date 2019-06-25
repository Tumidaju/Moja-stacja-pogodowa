using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class AWWeatherRepository : IWeatherRepository
    {
        private readonly DatabaseModel _db;

        public AWWeatherRepository(DatabaseModel db)
        {
            _db = db;
        }
        public CurrentWeather getFToday()
        {
            var model = new CurrentWeather();
            return model;
        }
        public TwoDaysWeather getF2Days()
        {
            var model = new TwoDaysWeather();
            return model;
        }
        public FiveDaysWeather getF5Days()
        {
            var model = new FiveDaysWeather();
            return model;
        }
    }
}