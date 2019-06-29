using Moja_stacja_pogodowa.Models;
using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Repositories;
using Moja_stacja_pogodowa.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;

namespace Moja_stacja_pogodowa.Controllers
{
    [Authorize]
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
        public HttpResponseMessage GetConfig([FromBody()] UserId User)
        {
            var model = JsonConvert.SerializeObject(_ConfigRepository.Get(User.Id));
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Config/SetConfig")]
        public HttpResponseMessage SetConfig([FromBody()] ConfigModel ConfigModel)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _ConfigRepository.Set(ConfigModel);
            }
            var model = JsonConvert.SerializeObject(result);
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        
        [AllowAnonymous]
        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Config/IsValid")]
        public bool Ping()
        {
            return true;
        }
    }
}
