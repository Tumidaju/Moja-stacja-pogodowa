using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class APIRepository :IAPIRepository
    {
        private readonly DBModel _db;

        public APIRepository(DBModel db)
        {
            _db = db;
        }
        public List<APIModel> GetAll()
        {
            var result = _db.APIs.Select(x => new APIModel()
            {
                Id = x.Id,
                Name = x.Name,
                URL = x.URL
            }).ToList();
            return result;
        }
        public APIModel Get(int APIId)
        {
            var result = _db.APIs.Where(x=>x.Id==APIId).Select(x => new APIModel()
            {
                Id = x.Id,
                Name = x.Name,
                URL = x.URL
            }).FirstOrDefault();
            return result;
        }
        public string GetCityList(int APIId)
        {
            string result = "";

            var APICode = "";
            switch (APIId)
            {
                case 1:
                    APICode = "OWM";
                    break;
                case 2:
                    APICode = "AW";
                    break;
                case 3:
                    APICode = "WB";
                    break;
            }
            if(APICode!="")
            {
                var path = HttpContext.Current.Server.MapPath(string.Concat("~/Repositories/CityLists/", APICode, "_cities.json"));
                using (StreamReader r = new StreamReader(path))
                {
                    result = r.ReadToEnd();
                }
            }
            return result;
        }
    }
}