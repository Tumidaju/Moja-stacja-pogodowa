using Moja_stacja_pogodowa.Models.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class APIRepository :IAPIRepository
    {
        //private readonly DatabaseModel _db;

        //public APIRepository(DatabaseModel db)
        //{
        //    _db = db;
        //}
        public List<APIModel> GetAll()
        {
            var result = new List<APIModel>();
            return result;
        }
        public APIModel Get(int APIId)
        {
            var result = new APIModel();
            return result;
        }
    }
}