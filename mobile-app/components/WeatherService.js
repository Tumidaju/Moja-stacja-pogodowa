import axios from "axios";
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'

class WeatherService {
    async today() {
        const sp = new SettingProvider();
        const baseUrl = (await sp.getBaseUrl()) + (await sp.getSuffixApi());
        const tokenInfo = new TokenInfo();
        const url = baseUrl + "Weather/Today";
        const token = await tokenInfo.getCurrentToken();
        let data = await axios.post(url, null, {headers: {
            Authorization: 'Bearer ' + token
        }});
        return data.data;
    }
}

export default WeatherService