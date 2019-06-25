using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.OWM
{
    public class System
    {
        public string country { get; set; }
        public int sunrise { get; set; }
        public int sunset { get; set; }
    }
}