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
    [System.Web.Http.Authorize]
    public class ConfigController : ApiController
    {
        private IConfigRepository _ConfigRepository;
        private IAPIService _APIService;

        public ConfigController(IConfigRepository ConfigRepository, IAPIService APIService)
        {
            _ConfigRepository = ConfigRepository;
            _APIService = APIService;
        }

        public ConfigModel GetConfig(string UserId)
        {
            var model = _ConfigRepository.Get(UserId);
            return model;
        }
        public bool SetConfig(string UserId, ConfigModel configModel)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _ConfigRepository.Set(UserId, configModel);
            }
            return result;
        }
    }
}
