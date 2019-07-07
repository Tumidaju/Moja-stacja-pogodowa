import React from 'react';
import { Input, CheckBox, Overlay } from 'react-native-elements';
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
import { Col, Row, Grid } from "react-native-easy-grid";
import BaseNavigation from '../components/BaseNavigation';
import TokenInfo from '../components/TokenInfo';
import SettingProvider from '../components/SettingProvider'
import RestHelper from '../components/RestHelper'

class SignInScreen extends BaseNavigation {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    state = {
        name: '',
        lat: '',
        lon: '',
        OWMKeyChecked: false,
        AWKeyChecked: false,
        WBKeyChecked: false,
        isGetLocationPopupVisible: false,
    };

    _bootstrapAsync = async () => {
        
    };

    _latChanged = text => {
        this.setState({ lat: text });
    };
    
    _nameChanged = text => {
        this.setState({ name: text });
    };

    _lonChanged = text => {
        this.setState({ lon: text });
    };

    _findCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ lon: position.coords.longitude, lat: position.coords.latitude });
        }, (error) => {
            Alert(JSON.stringify(error))
        }, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    };

    _selectApiType = (type) => {
        if(type == "AW") {
            this.setState({ AWKeyChecked: !this.state.AWKeyChecked, OWMKeyChecked: false, WBKeyChecked: false});
        }
        if(type == "OWM") {
            this.setState({ OWMKeyChecked: !this.state.OWMKeyChecked, AWKeyChecked: false, WBKeyChecked: false});
        }
        if(type == "WB") {
            this.setState({ WBKeyChecked: !this.state.WBKeyChecked, OWMKeyChecked: false, AWKeyChecked: false});
        }
    }

    _getSelectedApiId = async () => {
        const settingProvider = new SettingProvider();
        const settings = await settingProvider.getSettingModel();
        if(this.state.AWKeyChecked) {
            return 2;
        }
        if(this.state.OWMKeyChecked) {
            return 1;
        }
        if(this.state.WBKeyChecked) {
            return 3;
        }
    }

    _addNew = async () => {
        const tokenInfo = new TokenInfo();
        const restHelper = new RestHelper();

        const userId = await tokenInfo.getUserId();
        const apiId = await this._getSelectedApiId();
        
        const newWigder = {
            UserId: userId,
            Name: this.state.name,
            Lat: this.state.lat,
            Long: this.state.lon,
            APIId: apiId
        }

        const response = await restHelper.postWithToken("Widgets/CreateWidget", newWigder);

        if(response) {
            this.props.navigation.navigate('Widgets');
            return;
        }
        Alert("Nie udało się dodac widżet, proszę sprawdzić wpisane dane");
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                <Grid>
                    <Row>
                        <Col style={{alignItems: 'center',}}>
                            <Text>Wpisz dane:</Text>
                        </Col>
                    </Row>
                    <Row style={{alignItems: 'center',}}>
                        <Col style={{alignItems: 'center',}}>
                            <Input placeholder='Nazwa'
                                onChangeText={this._nameChanged} 
                                editable={true} 
                                value={this.state.name}/>
                            <Input placeholder='Lat'
                                onChangeText={this._latChanged} 
                                editable={true} 
                                value={this.state.lat}/>
                            <Input placeholder='Lon' 
                                onChangeText={this._lonChanged} 
                                editable={true} 
                                value={this.state.lon}/>
                            <Button onPress={this._addNew}
                                title="Pobierz bierzącą lokalizacje..."
                                color="#68b78a"
                                style={{
                                    marginTop: 75,
                                    alignItems: 'center'
                                }}
                                onPress={this._findCurrentLocation}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{alignItems: 'center',}}>
                            <Text>Rodzaj API dla widżeta</Text>
                            <CheckBox
                                title='AccuWeather API'
                                checked={this.state.AWKeyChecked}
                                onPress={() => this._selectApiType('AW')}/>
                            <CheckBox
                                title='Open Weather Map API'
                                checked={this.state.OWMKeyChecked}
                                onPress={() => this._selectApiType('OWM')}/>
                            <CheckBox
                                title='Weatherbit API'
                                checked={this.state.WBKeyChecked}
                                onPress={() => this._selectApiType('WB')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{alignItems: 'center',}}>
                            <Button onPress={this._addNew}
                                title="Dodaj"
                                color="#68b78a"
                                style={{
                                    marginTop: 75,
                                    alignItems: 'center'
                                }}/>
                        </Col>
                    </Row>
                </Grid>
                
                </ScrollView>
            </View>
        );
    }
}


export default SignInScreen

const styles = StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    dataSection: {
        marginTop: 25,
        width: 500,
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
    marginTop: 25,
    justifyContent: 'flex-start',
    marginRight: 10,
  },

  createButtonStyle: {
    marginTop: 25,
    justifyContent: 'flex-end',
    marginLeft: 10,
  },

  mainTitle: {
    marginTop: 20,
    fontSize: 20
  }
});
