import React, {useEffect, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default function Home() {
  const [links, setLinks] = useState([]);
  function loadLinks() {
    return AsyncStorage.getItem('links');
  }
  useEffect(() => {
    loadLinks().then(links => {
      let linksArray;
      if (links === null) {
        linksArray = [];
      } else {
        linksArray = JSON.parse(links);
      }
      setLinks(linksArray);
    });
  }, []);
  console.log({links});
  return (
    <View>
      <Text>Link</Text>
      {links.map(({title, link}) => {
        return (
          <>
            <Text>{title}</Text>
            <Text
              onPress={() => {
                Linking.openURL(link).catch(err =>
                  console.error('An error occurred', err),
                );
              }}>
              {link}
            </Text>
          </>
        );
      })}
    </View>
  );
}
