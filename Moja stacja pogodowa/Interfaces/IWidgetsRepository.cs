using Moja_stacja_pogodowa.Models;
using Moja_stacja_pogodowa.Models.Widget;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Moja_stacja_pogodowa.Interfaces
{
    public interface IWidgetsRepository
    {
        WidgetModel GetWidget(int widgetId);
        List<WidgetModel> GetAllWidgets(string userId);
        bool AddWidget(WidgetModel widgetModel);
        bool UpdateWidget(WidgetModel widgetModel);
        bool DeleteWidget(WidgetRemoveModel widgetModel);

    }
}
