using Moja_stacja_pogodowa.Interfaces;
using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Database;
using Moja_stacja_pogodowa.Models.Widget;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Moja_stacja_pogodowa.Repositories
{
    public class WidgetsRepository : IWidgetsRepository
    {
        private readonly DBModel _db;
        public WidgetsRepository(DBModel db)
        {
            _db = db;
        }
        public List<WidgetModel> GetAllWidgets(string userId)
        {
            var result = _db.UserWidgets.Where(x => x.UserId == userId).Select(x => new WidgetModel()
            {
                Id = x.Id,
                UserId = x.UserId,
                APIId = x.APIID,
                Name = x.Name,
                Lat = x.Lat,
                Long = x.Lon,
                CityId = x.CityID
            }).ToList();
            return result;
        }
        public WidgetModel GetWidget(int widgetId)
        {
            var result = _db.UserWidgets.Where(x => x.Id == widgetId).Select(x => new WidgetModel()
            {
                Id = x.Id,
                UserId = x.UserId,
                APIId = x.APIID,
                Name = x.Name,
                Lat = x.Lat,
                Long = x.Lon,
                CityId = x.CityID
            }).FirstOrDefault();
            return result;
        }
        public bool AddWidget(WidgetModel widgetModel)
        {
            var result = false;
            UserWidgets widget = new UserWidgets()
            {
                UserId = widgetModel.UserId,
                APIID = widgetModel.APIId,
                Name = widgetModel.Name,
                Lat = widgetModel.Lat,
                Lon = widgetModel.Long,
                CityID = widgetModel.CityId
            };
            _db.UserWidgets.Add(widget);
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
        public bool UpdateWidget(WidgetModel widgetModel)
        {
            var result = false;
            var FromDb = _db.UserWidgets.Where(x => x.UserId == widgetModel.UserId && x.Id == widgetModel.Id).FirstOrDefault();
            if (FromDb != null)
            {
                FromDb.APIID = widgetModel.APIId;
                FromDb.Name = widgetModel.Name;
                FromDb.Lat = widgetModel.Lat;
                FromDb.Lon = widgetModel.Long;
                FromDb.CityID = widgetModel.CityId;
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
        public bool DeleteWidget(WidgetRemoveModel widgetModel)
        {
            var result = false;
            var FromDb = _db.UserWidgets.Where(x => x.UserId == widgetModel.UserId && x.Id == widgetModel.Id).FirstOrDefault();
            if (FromDb != null)
            {
                _db.UserWidgets.Remove(FromDb);
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