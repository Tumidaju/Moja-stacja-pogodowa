import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const sp = new SettingProvider();
        const tokenInfo = new TokenInfo();

        const isConfigExist = await sp.isSettingsExist();
        if(!isConfigExist) {
            this.props.navigation.navigate('Config');
            return;
        }

        const userToken = await tokenInfo.getCurrentToken();

        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}


export default AuthLoadingScreen