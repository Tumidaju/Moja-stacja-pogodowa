using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.AW
{
    public class Sun
    {
        public DateTime Rise { get; set; }
        public int EpochRise { get; set; }
        public DateTime Set { get; set; }
        public int EpochSet { get; set; }
    }

}