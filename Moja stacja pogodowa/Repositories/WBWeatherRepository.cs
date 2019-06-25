using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Models.Weather.OWM;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class WBWeatherRepository : IWeatherRepository
    {
        private readonly DatabaseModel _db;
        private string _latitude { get; set; }
        private string _longtitude { get; set; }
        private string _apiKey { get; set; }
        private HttpClient _client { get; set; }


        public WBWeatherRepository(DatabaseModel db,string APIUrl,string APIKey, string Latitude, string Longtitude)
        {
            _db = db;
            _latitude = Latitude;
            _longtitude = Longtitude;
            _apiKey = APIKey;
            _client= new HttpClient()
            {
                BaseAddress= new Uri(APIUrl)
            };
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
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