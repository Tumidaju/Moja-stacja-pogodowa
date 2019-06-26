using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Config
{
    public class ConfigModel
    {
        public string UserId { get; set; }
        public string OWMKey { get; set; }
        public string AWKey { get; set; }
        public string WBKey { get; set; }
    }
}