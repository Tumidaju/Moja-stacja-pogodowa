import {
    AsyncStorage,
  } from 'react-native';

class SettingProvider {
    async getBaseUrl() {
        const jsonConfig = await AsyncStorage.getItem('config');
        const config = JSON.parse(jsonConfig);
        if(config == null || config.url == null)
            return "";
        return config.url;
    };

    async getSuffixApi() {
        const jsonConfig = await AsyncStorage.getItem('config');
        const config = JSON.parse(jsonConfig);
        if(config == null || config.apiSuffix == null)
            return "";
        return config.apiSuffix;
    };

    async isSettingsExist() {
        const jsonConfig = await AsyncStorage.getItem('config');
        if(jsonConfig == null)
            return false;

        const config = JSON.parse(jsonConfig);

        return config != null && config.url != null && config.apiSuffix != null && config.url != "" && config.apiSuffix != "";
    }
}

export default SettingProvider