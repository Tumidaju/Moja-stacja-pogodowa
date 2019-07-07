using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Models.Weather.AW;
using Moja_stacja_pogodowa.Models.Widget;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Moja_stacja_pogodowa.Repositories
{
    public class AWWeatherRepository : IWeatherRepository
    {
        private readonly DBModel _db;
        private string _latitude { get; set; }
        private string _longtitude { get; set; }
        private string _cityId { get; set; }
        private string _apiKey { get; set; }
        private HttpClient _client { get; set; }
        private string _locationKey { get; set; }

        public AWWeatherRepository(DBModel db, string APIUrl, string APIKey, WidgetModel widget)
        {
            _db = db;
            _latitude = widget.Lat;
            _longtitude = widget.Long;
            _cityId = widget.CityId;
            _apiKey = APIKey;
            _client = new HttpClient()
            {
                BaseAddress = new Uri(APIUrl)
            };
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            if (_latitude!=null)
            {
                string urlLocationParameters = string.Concat("locations/v1/cities/geoposition/search?q=", _latitude, ",", _longtitude, "&language=pl-pl&apikey=", _apiKey);
                HttpResponseMessage LocationResponse = _client.GetAsync(urlLocationParameters).Result;
                if (LocationResponse.IsSuccessStatusCode)
                {
                    var LocationObject = LocationResponse.Content.ReadAsAsync<LocationModel>().Result;
                    _locationKey = LocationObject.Key;
                }
            }
            else
            {
                _locationKey = _cityId;
            }
           

        }
        public string getFToday()
        {
            ForecastModel dataObject = new ForecastModel();
            if (_locationKey!="")
            {
                string urlParameters = string.Concat("forecasts/v1/daily/1day/", _locationKey, "?language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
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
            return JsonConvert.SerializeObject(dataObject);
        }
        public string getF2Days()
        {
            ForecastModel dataObject = new ForecastModel();
            if (_locationKey != "")
            {
                string urlParameters = string.Concat("forecast/hourly/", _locationKey, "?language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
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
            return JsonConvert.SerializeObject(dataObject);
        }
        public string getF5Days()
        {
            ForecastModel dataObject = new ForecastModel();
            if (_locationKey != "")
            {
                string urlParameters = string.Concat("forecasts/v1/daily/5day/", _locationKey, "?language=pl-pl&metric=true&details=true&apikey=", _apiKey);
                HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    dataObject = response.Content.ReadAsAsync<ForecastModel>().Result;
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
            return JsonConvert.SerializeObject(dataObject);
        }
    }
}