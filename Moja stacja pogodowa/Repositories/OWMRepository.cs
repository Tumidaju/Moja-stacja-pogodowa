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
    public class OWMWeatherRepository : IWeatherRepository
    {
        private readonly DatabaseModel _db;
        private string _latitude { get; set; }
        private string _longtitude { get; set; }
        private string _apiKey { get; set; }
        private HttpClient _client { get; set; }

        public OWMWeatherRepository(DatabaseModel db, string APIUrl, string APIKey, string Latitude, string Longtitude)
        {
            _db = db;
            _latitude = Latitude;
            _longtitude = Longtitude;
            _apiKey = APIKey;
            _client = new HttpClient()
            {
                BaseAddress = new Uri(APIUrl)
            };
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public CurrentWeather getFToday()
        {
            string urlParameters = string.Concat("weather?lat=", _latitude, "&lon=", _longtitude, "&lang=pl_pl&units=metric&appid=", _apiKey);
            HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var dataObject = response.Content.ReadAsAsync<DayWeatherModel>().Result;  
            }
            else
            {
                //error
            }

            var model = new CurrentWeather();
            return model;
        }
        public TwoDaysWeather getF2Days()
        {
            string urlParameters = string.Concat("forecast?lat=", _latitude, "&lon=", _longtitude, "&units=metric&cnt=16&lang=pl_pl&appid=", _apiKey);
            HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
            }
            else
            {
                //error
            }
            var model = new TwoDaysWeather();
            return model;
        }
        public FiveDaysWeather getF5Days()
        {
            string urlParameters = string.Concat("forecast?lat=", _latitude, "&lon=", _longtitude, "&units=metric&cnt=40&lang=pl_pl&appid=", _apiKey);
            HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                var dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
            }
            else
            {
                //error
            }
            var model = new FiveDaysWeather();
            return model;
        }
    }
}