import * as WebBrowser from 'expo-web-browser';
import { Input } from 'react-native-elements';
import { Button } from 'react-native';
import React from 'react';
import Alert from '../components/Alert';
import AutenticationHelper from '../components/AutenticationHelper';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmailValidator from '../components/EmailValidator';

class CreateAccount extends React.Component {
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
                  onPress={() => navigation.navigate('Auth')}
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
        login: '',
        password: '',
        confirmedPassword: '',
    };

    _bootstrapAsync = async () => {
    };
  
    _createAccount = async () => {
        const autenticationHelper = new AutenticationHelper();
        const emailValidator = new EmailValidator();

        if(this.state.password !== this.state.confirmedPassword)
            Alert("Hasła nie są identyczne!")
        
        if(!emailValidator.validateEmail(this.state.login))
            Alert("Niepoprawny adres email!")
            
        let data = await autenticationHelper.createUser({
            Email: this.state.login,
            Password: this.state.password,
            ConfirmPassword: this.state.confirmedPassword
        });

        if(data == null)
            return;
        
        this.props.navigation.navigate('AuthLoading', {
            login: this.state.login,
        });
    }

    _backToLogin = () => {
        debugger;
        this.props.navigation.navigate('Auth');
    }

    _loginChanged = text => {
        this.setState({ login: text });
    };

    _passwordChanged = text => {
        this.setState({ password: text });
    };

    _confirmedPasswordChanged = text => {
        this.setState({ confirmedPassword: text });
    };

    render() {
      return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.getStartedContainer}>
                    <Text>Wpisz dane do utworzenia nowego konta</Text>

                    <View style={styles.dataSection}>
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
                        <Input secureTextEntry={true} 
                            textContentType="password" 
                            placeholder='Powtórz hasło' 
                            onChangeText={this._confirmedPasswordChanged} 
                            editable={true} 
                            value={this.state.confirmedPassword}/>
                    </View>
                    
                    <View style={styles.buttonsContainer}>
                        <Button onPress={this._createAccount}
                            title="Utwórz konto"
                            color="#68b78a"/>
                    </View>
                </View>
            </ScrollView>
        </View>
      );
    }
  }
  
export default CreateAccount

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
leftArrow: {
    width: 100,
},
dataSection: {
    marginTop: 25,
    width: 500,
},
buttonsContainer: {
    marginTop: 25,
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
}
});
