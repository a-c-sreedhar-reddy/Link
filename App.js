import React, {useState} from 'react';
import AddLink from './pages/AddLink';
import Home from './pages/Home';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

const createAppNavigator = initialRouteName =>
  createStackNavigator(
    {
      Home: {screen: Home, navigationOptions: {title: 'Link'}},
      AddLink: {screen: AddLink, navigationOptions: {title: 'Add Link'}},
    },
    {initialRouteName: initialRouteName || 'Home'},
  );

export default function({text}) {
  const [saved, setSaved] = useState(false);
  function save(link, title) {
    AsyncStorage.getItem('links')
      .then(links => {
        if (!links) {
          return AsyncStorage.setItem('links', JSON.stringify([{link, title}]));
        } else {
          let linksArray = JSON.parse(links);
          linksArray.push({link, title});
          return AsyncStorage.setItem('links', JSON.stringify(linksArray));
        }
      })
      .then(() => setSaved(true));
  }
  const RootStack = createAppContainer(
    createAppNavigator(text && !saved && 'AddLink'),
  );

  return <RootStack screenProps={{text, save}} />;
}
