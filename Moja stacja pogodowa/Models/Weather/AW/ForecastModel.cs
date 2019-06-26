using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.AW
{
    public class ForecastModel
    {
        public HeadLine Headline { get; set; }
        public List<DayWeatherModel> DailyForecasts { get; set; }

    }
}