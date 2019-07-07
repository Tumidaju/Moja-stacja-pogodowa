import React from 'react';
import { Input, ListItem, Avatar } from 'react-native-elements';
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
import RestHelper from '../components/RestHelper';
import { FlatList} from 'react-native'

class Widgets extends BaseNavigation {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    state = {
        widgets: [],
    };

    _bootstrapAsync = async () => {
        const tokenInfo = new TokenInfo();
        const restHelper = new RestHelper();

        const userId = await tokenInfo.getUserId();

        const widgets = await restHelper.postWithToken("Widgets/GetWidgets", {Id: userId});
        this.setState({ widgets: widgets });
    };

    _editWidget = (element) => {
        console.log(element);
    }

    _addNew = () => {
        this.props.navigation.navigate('NewWidget');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    <Grid>
                        <Row>
                            <Col style={{alignItems: 'center'}}>
                                <Button onPress={this._addNew}
                                title="Dodaj widget pogodowy"
                                color="#68b78a"
                                style={{
                                    marginTop: 75,
                                    alignItems: 'center'
                                }}/>
                            </Col>
                        </Row>
                        <Row style={{alignItems: 'center'}}>
                            <Col style={{alignItems: 'center'}}>
                                <Text>Zdefiniowane widżety</Text>
                            </Col>
                        </Row>
                        {
                            this.state.widgets.map((l, i) => (
                                <View style={{marginTop: 10}}>
                                    <Row key={i} style={{backgroundColor: "#68b78a", alignItems: 'center',}} onPress={() => this._editWidget(l)}>
                                        <Col style={{alignItems: 'center'}}>
                                            <Avatar
                                                rounded
                                                source={require('../assets/images/iconfinder_Thermometer_Hot_3741361.png')}/>
                                        </Col>
                                        <Col style={{marginLeft: 8, marginRight: 20}}>
                                            <View>
                                                <Text style={{width: 300}}>{l.Name}</Text>
                                            </View>
                                        </Col>
                                        <Col>
                                            <Avatar
                                                rounded
                                                source={require('../assets/images/right-arrow.png')}
                                                size={24}/>
                                        </Col>
                                    </Row>
                                </View>
                            ))
                        }
                    </Grid>
                </ScrollView>
            </View>
        );
    }
}


export default Widgets

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
