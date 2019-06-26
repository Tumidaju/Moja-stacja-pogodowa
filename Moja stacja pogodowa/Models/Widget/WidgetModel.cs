using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Widget
{
    public class WidgetModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int APIId { get; set; }
        public string Name { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string CityId { get; set; }
    }
}