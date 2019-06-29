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
import { Image } from 'react-native'

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    state = {
        login: '',
        password: '',
    };

    _bootstrapAsync = () => {
        const { navigation } = this.props;
        this.state.login = navigation.getParam('login', '')
    };

    _logIn = async () => {
        const autenticationHelper = new AutenticationHelper();
        let loginData = {
            grant_type: 'password',
            login: this.state.login,
            password: this.state.password,
        };
        const response = await autenticationHelper.getToken(loginData);
        if(response != null && response.msg != null)
            Alert(response.msg);
        if(response.data.access_token == null)
            Alert("Nie udało się zalogować się");
        const responseTokenObject = response.data;
        await AsyncStorage.setItem("userToken", JSON.stringify(responseTokenObject));
        this.props.navigation.navigate('App');
    };

    _signUp = () => {
        this.props.navigation.navigate('SignUp');
    }

    _loginChanged = text => {
        this.setState({ login: text });
    };

    _passwordChanged = text => {
        this.setState({ password: text });
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.welcomeImage}
                  />
                  <Text style={styles.mainTitle}>Moja stacja pogodowa</Text>
                    <Input placeholder='E-mail' 
                        onChangeText={this._loginChanged} 
                        editable={true} 
                        value={this.state.login}/>
                    <Input secureTextEntry={true} 
                            textContentType="password" 
                            placeholder='Hasło' 
                            onChangeText={this._passwordChanged} 
                            editable={true} 
                            value={this.state.password}/>

                    <View style={styles.getStartedContainer}>
                    <Button onPress={this._logIn}
                        title="Zaloguj się"
                        color="#68b78a"
                        style={styles.logInButtonStyle}/>
                    <Button onPress={this._signUp}
                        title="Utwórz konto"
                        color="#717171"/>
                    
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}


export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  mainTitle: {
    marginTop: 20,
    fontSize: 20
  }
});
