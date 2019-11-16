import React, {useState} from 'react';
import {Text, TextInput, Button} from 'react-native';
export default function AddLink({text, save}) {
  const [link, setLink] = useState(text);
  const [title, setTitle] = useState('');
  return (
    <>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Link</Text>
      <TextInput value={link} onChangeText={setLink} />
      <Button title="save" onPress={() => save(link, title)} />
    </>
  );
}
