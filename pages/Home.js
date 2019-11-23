/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {View, Text, Linking, StyleSheet, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  // #region hooks
  const [links, setLinks] = useState([]);
  useEffect(() => {
    navigation.addListener('willFocus', () => {
      loadLinks().then(links => {
        let linksArray;
        if (links === null) {
          linksArray = [];
        } else {
          linksArray = JSON.parse(links);
        }
        setLinks(linksArray);
      });
    });
  }, [navigation]);
  // #endregion

  // #region functions
  function remove(index) {
    AsyncStorage.setItem(
      'links',
      JSON.stringify(Array.from(links).filter((item, i) => i !== index)),
    ).then(() =>
      AsyncStorage.getItem('links')
        .then(link => {
          setLinks(JSON.parse(link));
        })
        .then(() => ToastAndroid.show('Deleted', ToastAndroid.SHORT)),
    );
  }
  function loadLinks() {
    return AsyncStorage.getItem('links');
  }
  // #endregion

  return (
    <View style={styles.container}>
      {links.map(({title, link}, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              Linking.canOpenURL(link).then(supported => {
                supported
                  ? Linking.openURL(link).catch(() =>
                      ToastAndroid.show('Error', ToastAndroid.SHORT),
                    )
                  : ToastAndroid.show(
                      'Could not open link',
                      ToastAndroid.SHORT,
                    );
              })
            }
            key={index}
            onLongPress={() => remove(index)}
            style={styles.linkContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text>{link}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {margin: 10},
  linkContainer: {
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ffd970',
  },
  title: {fontSize: 25},
});

export default Home;
