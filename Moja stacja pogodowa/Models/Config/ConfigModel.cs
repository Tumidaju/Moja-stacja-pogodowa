using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Config
{
    public class ConfigModel
    {
        public string UserId { get; set; }
        public int APIId { get; set; }
        public string APIIKey { get; set; }
        public string  Latitude { get; set; }
        public string Longtitude { get; set; }
    }
}