﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Models.Weather.AW
{
    public class Wind
    {
        public ValRange Speed { get; set; }
        public Direction Direction { get; set; }
    }
}