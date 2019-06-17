using Moja_stacja_pogodowa.Models;
using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Repositories;
using Moja_stacja_pogodowa.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace Moja_stacja_pogodowa.Controllers
{
    [System.Web.Mvc.Authorize]
    public class ConfigController : ApiController
    {
        private IConfigRepository _ConfigRepository;
        private IAPIService _APIService;
        private IAPIRepository _IAPIRepository;

        public ConfigController(IConfigRepository ConfigRepository,IAPIRepository IAPIRepository)
        {
            _ConfigRepository = ConfigRepository;
            _IAPIRepository = IAPIRepository;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Config/GetConfig")]
        public ConfigModel GetConfig([FromBody()] UserId User)
        {
            var model = _ConfigRepository.Get(User.Id);
            return model;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Config/GetAPIList")]
        public List<APIModel> GetAPIList()
        {
            var model = _IAPIRepository.GetAll();
            return model;
        }
        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Config/SetConfig")]
        public bool SetConfig([FromBody()] ConfigModel ConfigModel)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _ConfigRepository.Set(ConfigModel);
            }
            return result;
        }

        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Config/IsValid")]
        public bool Ping()
        {
            return true;
        }
    }
}
