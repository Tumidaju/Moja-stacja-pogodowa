using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class APIRepository :IAPIRepository
    {
        private readonly DatabaseModel _db;

        public APIRepository(DatabaseModel db)
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
    }
}