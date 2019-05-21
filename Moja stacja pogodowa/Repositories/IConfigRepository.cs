using Moja_stacja_pogodowa.Models.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moja_stacja_pogodowa.Repositories
{
    public interface IConfigRepository
    {
        ConfigModel Get(string UserId);
        bool Set(string UserId, ConfigModel model);
    }
}
