import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
import axios from "axios";
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'

class RestHelper {
    async postWithToken(url, data) {
        const sp = new SettingProvider();
        const baseUrl = (await sp.getBaseUrl()) + (await sp.getSuffixApi());
        const tokenInfo = new TokenInfo();
        const fullUrl = baseUrl + url;
        const token = await tokenInfo.getCurrentToken();
        let result = await axios.post(fullUrl, data, {headers: {
            Authorization: 'Bearer ' + token
        }});
        return result.data;
    }

    async getWithToken(url, data) {
        const sp = new SettingProvider();
        const baseUrl = (await sp.getBaseUrl()) + (await sp.getSuffixApi());
        const tokenInfo = new TokenInfo();
        const fullUrl = baseUrl + url;
        const token = await tokenInfo.getCurrentToken();
        let result = await axios.get(fullUrl, data, {headers: {
            Authorization: 'Bearer ' + token
        }});
        if(result == null)
            return  null;
        return result.data;
    }
}

export default RestHelper;