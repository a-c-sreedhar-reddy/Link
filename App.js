import React, {useState} from 'react';
import AddLink from './pages/AddLink';
import Home from './pages/Home';
import AsyncStorage from '@react-native-community/async-storage';

function App({text}) {
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
  return text && !saved ? <AddLink text={text} save={save} /> : <Home />;
}

export default App;
