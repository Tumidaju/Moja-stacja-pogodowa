using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Models.Weather.AW;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Moja_stacja_pogodowa.Repositories
{
    public class AWWeatherRepository : IWeatherRepository
    {
        private readonly DatabaseModel _db;
        private string _latitude { get; set; }
        private string _longtitude { get; set; }
        private string _apiKey { get; set; }
        private HttpClient _client { get; set; }
        private string _locationKey { get; set; }

        public AWWeatherRepository(DatabaseModel db, string APIUrl, string APIKey, string Latitude, string Longtitude)
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
            string urlLocationParameters = string.Concat("locations/v1/cities/geoposition/search?q=", _latitude, ",", _longtitude, "&language=pl-pl&apikey =", _apiKey);
            HttpResponseMessage LocationResponse = _client.GetAsync(urlLocationParameters).Result;
            if (LocationResponse.IsSuccessStatusCode)
            {
                var LocationObject = LocationResponse.Content.ReadAsAsync<LocationModel>().Result;
                _locationKey = LocationObject.Key;
            }

        }
        public CurrentWeather getFToday()
        {
            if (_locationKey!="")
            {
                string urlParameters = string.Concat("forecasts/v1/daily/1day/", _locationKey, "?lat=", _latitude, "&lon=", _longtitude, "&language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
                }
                else
                {
                    //error - blad pobierania danych
                }
            }
            else
            {
                //error - zla lokalizacja
            }
            var model = new CurrentWeather();
            return model;
        }
        public TwoDaysWeather getF2Days()
        {
            if (_locationKey != "")
            {
                string urlParameters = string.Concat("forecasts/v1/daily/5day/", _locationKey, "?lat=", _latitude, "&lon=", _longtitude, "&language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
                }
                else
                {
                    //error - blad pobierania danych
                }
            }
            else
            {
                //error - zla lokalizacja
            }
            var model = new TwoDaysWeather();
            return model;
        }
        public FiveDaysWeather getF5Days()
        {
            if (_locationKey != "")
            {
                string urlParameters = string.Concat("forecasts/v1/daily/5day/", _locationKey, "?lat=", _latitude, "&lon=", _longtitude, "&language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    var dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
                }
                else
                {
                    //error - blad pobierania danych
                }
            }
            else
            {
                //error - zla lokalizacja
            }
            var model = new FiveDaysWeather();
            return model;
        }
    }
}