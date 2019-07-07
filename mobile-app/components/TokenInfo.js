import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';

class TokenInfo {
    async getCurrentToken() {
        let tokenInfo = await AsyncStorage.getItem('userToken');
        const info = JSON.parse(tokenInfo);
        if(info == null || info.access_token == null)
            return null;
        return info.access_token;
    }

    async getFullUserInfo() {
        let tokenInfo = await AsyncStorage.getItem('userToken');
        const info = JSON.parse(tokenInfo);
        return info;
    }
}

export default TokenInfo;