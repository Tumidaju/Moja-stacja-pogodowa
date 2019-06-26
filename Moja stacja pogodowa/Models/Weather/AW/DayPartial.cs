using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.AW
{
    public class DayPartial
    {
        public int Icon { get; set; }
        public string IconPhrase { get; set; }
        public bool HasPrecipitation { get; set; }
        public string ShortPhrase { get; set; }
        public string LongPhrase { get; set; }
        public int PrecipitationProbability { get; set; }
        public int ThunderstormProbability { get; set; }
        public int RainProbability { get; set; }
        public int SnowProbability { get; set; }
        public int IceProbability { get; set; }
        public Wind Wind { get; set; }
        public double HoursOfPrecipitation { get; set; }
        public double HoursOfRain { get; set; }
        public double HoursOfSnow { get; set; }
        public double HoursOfIce { get; set; }
        public int CloudCover { get; set; }
        public string PrecipitationType { get; set; }
        public string PrecipitationIntensity { get; set; }
    }
}