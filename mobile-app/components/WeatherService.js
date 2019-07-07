import axios from "axios";
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'

class WeatherService {
    async today(widgetId) {
        const sp = new SettingProvider();
        const baseUrl = (await sp.getBaseUrl()) + (await sp.getSuffixApi());
        const tokenInfo = new TokenInfo();
        const url = baseUrl + "Weather/FToday";
        const token = await tokenInfo.getCurrentToken();
        let data = await axios.post(url, {WidgetId: widgetId}, {headers: {
            Authorization: 'Bearer ' + token
        }});
        return data.data;
    }
}

export default WeatherService