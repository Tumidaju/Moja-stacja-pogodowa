using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.OWM
{
    public class ForecastModel
    {
        public City city { get; set; }
        public string country { get; set; }
        public string cnt { get; set; }
        public List<DayWeatherModel> list { get; set; }
    }
}