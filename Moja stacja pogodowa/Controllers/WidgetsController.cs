using Moja_stacja_pogodowa.Interfaces;
using Moja_stacja_pogodowa.Models;
using Moja_stacja_pogodowa.Models.API;
using Moja_stacja_pogodowa.Models.Config;
using Moja_stacja_pogodowa.Models.Weather;
using Moja_stacja_pogodowa.Models.Widget;
using Moja_stacja_pogodowa.Repositories;
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
    public class WidgetsController : ApiController
    {
        private IWidgetsRepository _WidgetsRepository;
        private IAPIRepository _IAPIRepository;

        public WidgetsController(IWidgetsRepository WidgetsRepository, IAPIRepository IAPIRepository)
        {
            _WidgetsRepository = WidgetsRepository;
            _IAPIRepository = IAPIRepository;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Widgets/GetWidgets")]
        public HttpResponseMessage GetWidgets([FromBody()] UserId User)
        {
            var model = JsonConvert.SerializeObject(_WidgetsRepository.GetAllWidgets(User.Id));
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Widgets/CreateWidget")]
        public HttpResponseMessage CreateWidget([FromBody()] WidgetModel Widget)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _WidgetsRepository.AddWidget(Widget);
            }
            var model = JsonConvert.SerializeObject(result);
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Mvc.HttpPost()]
        [System.Web.Http.Route("api/Widgets/UpdateWidget")]
        public HttpResponseMessage UpdateWidget([FromBody()] WidgetModel Widget)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _WidgetsRepository.UpdateWidget(Widget);
            }
            var model = JsonConvert.SerializeObject(result);
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Widgets/DeleteWidget")]
        public HttpResponseMessage DeleteWidget([FromBody()] WidgetRemoveModel widget)
        {
            var result = false;
            if (ModelState.IsValid)
            {
                result = _WidgetsRepository.DeleteWidget(widget);
            }
            var model = JsonConvert.SerializeObject(result);
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Widgets/GetAPIList")]
        public HttpResponseMessage GetAPIList()
        {
            var model = JsonConvert.SerializeObject(_IAPIRepository.GetAll());
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
        [System.Web.Http.HttpPost()]
        [System.Web.Http.Route("api/Widgets/GetCityList")]
        public HttpResponseMessage GetAPIList([FromBody()] int APIId)
        {
            var model = _IAPIRepository.GetCityList(APIId);
            var response = this.Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(model, Encoding.UTF8, "application/json");
            return response;
        }
    }
}
