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
  YellowBox
} from 'react-native';

import ModalDropdown from '../components/ModalDropdown';

class BaseNavigation extends React.Component {
    static configActions = [
        'API', 
        'Widżetów'
    ];

    static configActionsToRouteMappin = {
        0: 'Config',
        1: 'NewWidget',
    }

    static moveBack(navigation) {
        navigation.navigate('App')
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pogoda',
            headerRight: (
                <ModalDropdown options={this.configActions} defaultValue="Ustawienia" 
                    dropdownStyle={{height: 41 * 2, alignItems: 'center', width: 102.17, right:0, top: 0}} 
                    dropdownTextStyle={{fontSize: 14, color: '#fff', backgroundColor: "#68b78a", textTransform: 'uppercase', width: 102.17}}
                    style={styles.menuContent}
                    textStyle={{fontSize: 14, color: '#fff', fontWeight: '500', padding: 8, width: 102.17, justifyContent: 'center'}}
                    adjustFrame={(style) => {
                        height: style.height
                        right: -97
                        top: 0
                        width: style.width
                    }}
                    onSelect={(index, value) => navigation.navigate(this.configActionsToRouteMappin[index])}/>
            ),
            headerLeft: (
                <Button
                  onPress={this.moveBack.bind(this, navigation)}
                  title="Powróc"
                  color="#68b78a"
                />
            ),
            headerTitleStyle: { marginLeft: 20 },
          };
    };

    constructor(props) {
        super(props);
    }
}

export default BaseNavigation

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    menuContent: {
      color: "#000",
      padding: 2,
      fontSize: 20,
      backgroundColor: '#68b78a',
      height:35,
      justifyContent: 'center',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    menuOptions: {
      backgroundColor: '#68b78a',
    },
    headerText: {
      fontSize: 20,
      margin: 10,
      color: "#fff",
      backgroundColor: '#68b78a',
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
  