using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.OWM
{
    public class City   
    {
        public string id { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public LatLong coord { get; set; }
    }
}