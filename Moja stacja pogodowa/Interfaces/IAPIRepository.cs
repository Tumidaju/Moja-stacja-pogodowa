using Moja_stacja_pogodowa.Models.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moja_stacja_pogodowa.Repositories
{
    public interface IAPIRepository
    {
        List<APIModel> GetAll();
        APIModel Get(int APIId);
        string GetCityList(int APIId);
    }
}
