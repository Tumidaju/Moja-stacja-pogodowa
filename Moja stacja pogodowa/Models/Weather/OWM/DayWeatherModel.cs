using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.OWM
{
    public class DayWeatherModel
    {
        public LatLong coord { get; set; }
        public List<Weather> weather { get; set; }
        public Main main { get; set; }
        public Wind wind { get; set; }
        public Clouds clouds { get; set; }
        public System sys { get; set; }
        public string name { get; set; }
        public string dt { get; set; }
        public string dt_txt { get; set; }

    }
}