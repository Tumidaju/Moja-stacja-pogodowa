using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Weather;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moja_stacja_pogodowa.Repositories
{
    public interface IWeatherRepository
    {
        string getFToday();
        string getF2Days();
        string getF5Days();
    }
}
