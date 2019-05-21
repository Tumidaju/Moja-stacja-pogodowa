using Moja_stacja_pogodowa.Models.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class ConfigRepository : IConfigRepository
    {
        //private readonly DatabaseModel _db;

        //public ConfigRepository(DatabaseModel db)
        //{
        //    _db = db;
        //}
        public ConfigModel Get(string UserId)
        {
            var result = new ConfigModel();
            return result;
        }

        public bool Set(string UserId, ConfigModel model)
        {
            var result = true;
            return result;
        }
    }
}