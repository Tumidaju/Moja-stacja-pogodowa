using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class ConfigRepository : IConfigRepository
    {
        private readonly DBModel _db;


        public ConfigRepository(DBModel db)
        {
            _db = db;
        }
        public ConfigModel Get(string UserId)
        {
            var result = _db.Config.Where(x => x.UserId == UserId).Select(x => new ConfigModel()
            {
                UserId = x.UserId,
                AWKey = x.AWKey,
                OWMKey = x.OWMKey,
                WBKey = x.WBKey
            }).FirstOrDefault();
            return result;
        }

        public bool Set(ConfigModel model)
        {
            var result = false;
            var FromDb = _db.Config.Where(x => x.UserId == model.UserId).FirstOrDefault();
            if (FromDb != null)
            {
                FromDb.AWKey = model.AWKey;
                FromDb.OWMKey = model.OWMKey;
                FromDb.WBKey = model.WBKey;
            }
            else
            {
                Config entry = new Config()
                {
                    UserId = model.UserId,
                    AWKey = model.AWKey,
                    OWMKey = model.OWMKey,
                    WBKey = model.WBKey
                };
                _db.Config.Add(entry);
            }
            try
            {
                if (_db.SaveChanges() > 0)
                {
                    result = true;
                }

            }
            catch (DbEntityValidationException ex)
            {
            }
            return result;
        }
    }
}