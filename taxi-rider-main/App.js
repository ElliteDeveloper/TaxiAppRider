import React from "react";
import  AppLoading  from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppContainer from "./src/navigation/AppNavigator";

//Database import
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAD750rfCEsekwor6b3CcTezTELK1x4ZnM",
  authDomain: "skystep.firebaseapp.com",
  databaseURL: "https://skystep.firebaseio.com",
  projectId: "skystep",
  storageBucket: "skystep.appspot.com",
  messagingSenderId: "973504609258",
  appId: "1:973504609258:web:967ed449b538ce4c451093"
};
// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }else {
//   firebase.app(); // if already initialized, use that one
// }
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
  };

  constructor() {
    super();
    console.disableYellowBox = true;
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/background.png"),
        require("./assets/images/logo.png"),
      ]),
      Font.loadAsync({
        "Roboto-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "Roboto-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
        "Roboto-Light": require("./assets/fonts/Roboto-Regular.ttf"),

      }),
    ]);
  };

  render() {
    return (
      <>
        {this.state.assetsLoaded ?
        <AppContainer />
        :
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={() => this.setState({ assetsLoaded: true })}
          onError={console.warn}
          autoHideSplash={true}
        />}
      </>
    );
  }
}
