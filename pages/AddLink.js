import React, {useState} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ToastAndroid,
} from 'react-native';

export default function AddLink({screenProps: {text, save}, navigation}) {
  // #region hooks
  const [link, setLink] = useState(text);
  const [title, setTitle] = useState('');
  // #endregion

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <Text style={styles.label}>Title</Text>
        <TextInput value={title} onChangeText={setTitle} style={styles.value} />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.label}>Link</Text>
        <TextInput value={link} onChangeText={setLink} style={styles.value} />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="cancel" onPress={() => navigation.navigate('Home')} />
        </View>
        <View style={styles.button}>
          <Button
            title="save"
            onPress={() => {
              title
                ? save(link, title)
                : ToastAndroid.show('Title cant be empty', ToastAndroid.SHORT);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {margin: 10},
  formRow: {marginVertical: 5},
  label: {fontSize: 25, marginBottom: 5},
  value: {borderColor: 'black', borderWidth: 1, marginBottom: 5},
  buttonContainer: {flexDirection: 'row'},
  button: {flex: 1, marginRight: 5},
});
