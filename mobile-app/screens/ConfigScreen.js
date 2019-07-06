import React from 'react';
import { Input } from 'react-native-elements';
import { Button } from 'react-native';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
} from 'react-native';
import AutenticationHelper from '../components/AutenticationHelper';
import Alert from '../components/Alert';
import WeatherService from '../components/WeatherService'
import SettingProvider from '../components/SettingProvider'
import axios from "axios";
import TokenInfo from '../components/TokenInfo';
import RestHelper from '../components/RestHelper'

class ConfigScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Moja stacja pogodowa',
            headerRight: (
                <Button
                onPress={() => navigation.navigate('Config')}
                title="Ustawienia"
                color="#68b78a"
                />
            ),
            headerLeft: (
                <Button
                  onPress={() => navigation.navigate('App')}
                  title="Powróc"
                  color="#68b78a"
                />
            ),
            headerTitleStyle: { marginLeft: 20 },
          };
    };

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    state = {
        OWMKey: '',
        AWKey: '',
        WBKey: '',
    };

    _bootstrapAsync = async () => {
        await this._restoreState();
    };

    _restoreState = async () => {
        const restHelper = new RestHelper();
        const actionUrl = "Config/GetConfig";

        const tokenInfo = new TokenInfo();
        const userInfo = await tokenInfo.getFullUserInfo();
        if(userInfo == null)
          this.props.navigation.navigate('Auth');
        const userID = userInfo.userID;

        let config = await restHelper.postWithToken(actionUrl, {
            Id: userID
        });

        if(config == null)
            return;

        const sp = new SettingProvider();
        this.setState({
            OWMKey: config.OWMKey,
            AWKey: config.AWKey,
            WBKey: config.WBKey,
        });
    };

    _save = async () => {
        const restHelper = new RestHelper();
        const actionUrl = "Config/SetConfig";
        const isValid = await this._ping();
        if(!isValid || !this._isUserProvidedInfoValid()) {
            Alert("Niepoprawna konfiguracja");
            return;
        }

        const tokenInfo = new TokenInfo();
        const userID = (await tokenInfo.getFullUserInfo()).userID;
        const saveData = {
            UserId: userID,
            OWMKey: this.state.OWMKey,
            AWKey: this.state.AWKey,
            WBKey: this.state.WBKey
        };

        let saveResult = await restHelper.postWithToken(actionUrl, saveData);

        let json = JSON.stringify(this.state);
        AsyncStorage.setItem('config', json);
        this.props.navigation.navigate('AuthLoading');
    };

    _isUserProvidedInfoValid() {
        if(this.state.WBKey != null && this.state.OWMKey != null && this.state.AWKey != null)
            return true;
        return false;
    }

    _OWMKeyChanged = text => {
      this.setState({ OWMKey: text });
    };

    _AWKeyChanged = text => {
      this.setState({ AWKey: text });
    };

    _WBKeyChanged = text => {
      this.setState({ WBKey: text });
    };

    async _ping() {
        try {
            const sp = new SettingProvider();
            const url = await sp.getBaseUrl();
            const apiSuffix = await sp.getSuffixApi();
            let data = await axios.post(url + apiSuffix + "Config/IsValid");
            return data != null;
        } catch (error) {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text>Ustawienia użytkownika</Text>

                    <Input placeholder='OWMKey' 
                            onChangeText={this._OWMKeyChanged} 
                            editable={true} 
                            value={this.state.OWMKey}/>

                    <Input placeholder='AWKey' 
                            onChangeText={this._AWKeyChanged} 
                            editable={true} 
                            value={this.state.AWKey}/>

                    <Input placeholder='WBKey' 
                            onChangeText={this._WBKeyChanged} 
                            editable={true} 
                            value={this.state.WBKey}/>


                    <View style={styles.buttonsContainer}>
                        <View style={styles.logInButtonStyle}>
                            <Button onPress={this._save}
                                title="Zapisz zmiany"
                                color="#68b78a"/>
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}


export default ConfigScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },

  logInButtonStyle: {
    marginTop: 75,
    alignItems: 'center'
  },
});
