using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Models.Weather.WB;
using Moja_stacja_pogodowa.Models.Widget;
using Newtonsoft.Json;
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
        private readonly DBModel _db;
        private string _latitude { get; set; }
        private string _longtitude { get; set; }
        private string _cityId { get; set; }
        private string _apiKey { get; set; }
        private HttpClient _client { get; set; }


        public WBWeatherRepository(DBModel db,string APIUrl,string APIKey, WidgetModel widget)
        {
            _db = db;
            _latitude = widget.Lat;
            _longtitude = widget.Long;
            _cityId = widget.CityId;
            _apiKey = APIKey;
            _client= new HttpClient()
            {
                BaseAddress= new Uri(APIUrl)
            };
            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public string getFToday()
        {
            string dataObject = "";
            string urlParameters = string.Concat("weather?lat=", _latitude, "&lon=", _longtitude, "&lang=pl_pl&units=metric&appid=", _apiKey);
            HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                dataObject = response.Content.ReadAsStringAsync().Result;
            }
            else
            {
                //error
            }

            return dataObject;
        }
        public string getF2Days()
        {
            ForecastModel dataObject = new ForecastModel();
            string urlParameters = string.Concat("weather?lat=", _latitude, "&lon=", _longtitude, "&lang=pl_pl&units=metric&appid=", _apiKey);
            HttpResponseMessage response = _client.GetAsync(urlParameters).Result;
            if (response.IsSuccessStatusCode)
            {
                //var dataObject = response.Content.ReadAsAsync<DayWeatherModel>().Result;
            }
            else
            {
                //error
            }

            return JsonConvert.SerializeObject(dataObject);
        }
        public string getF5Days()
        {
            ForecastModel dataObject = new ForecastModel();
            return JsonConvert.SerializeObject(dataObject);
        }
    }
}