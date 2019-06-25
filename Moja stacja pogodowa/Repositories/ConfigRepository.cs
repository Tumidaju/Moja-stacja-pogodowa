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
        private readonly DatabaseModel _db;


        public ConfigRepository(DatabaseModel db)
        {
            _db = db;
        }
        public ConfigModel Get(string UserId)
        {
            var result = _db.Config.Where(x => x.UserId == UserId).Select(x => new ConfigModel() {
                UserId=x.UserId,
                APIId=x.APIId,
                APIIKey=x.APIKey,
                Latitude=x.Latitude,
                Longtitude=x.Longtitude
            }).FirstOrDefault();
            return result;
        }

        public bool Set(ConfigModel model)
        {
            var result = false;
            var FromDb = _db.Config.Where(x => x.UserId == model.UserId).FirstOrDefault();
            if (FromDb != null)
            {
                FromDb.Latitude = model.Latitude;
                FromDb.Longtitude = model.Longtitude;
                FromDb.APIId = model.APIId;
                FromDb.APIKey = model.APIIKey;
            }
            else
            {
                Config entry = new Config() {
                    UserId = model.UserId,
                    APIId=model.APIId,
                    APIKey=model.APIIKey,
                    Latitude=model.Latitude,
                    Longtitude=model.Longtitude
                };
                _db.Config.Add(entry);
            }
            try
            {
                if (_db.SaveChanges()>0)
                {
                    result= true;
                }
                
            }
            catch (DbEntityValidationException ex)
            {
            }
            return result;
        }
    }
}