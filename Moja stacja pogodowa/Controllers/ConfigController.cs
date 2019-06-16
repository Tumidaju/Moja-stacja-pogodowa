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

        public ConfigController(IConfigRepository ConfigRepository)
        {
            _ConfigRepository = ConfigRepository;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Config/GetConfig")]
        public ConfigModel GetConfig([FromBody()] string UserId)
        {
            var model = _ConfigRepository.Get(UserId);
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
