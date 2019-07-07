import {
    AsyncStorage,
  } from 'react-native';

class SettingProvider {
    async getBaseUrl() {
        return "http://localhost:60898/";
    };

    async getSuffixApi() {
        return "api/";
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