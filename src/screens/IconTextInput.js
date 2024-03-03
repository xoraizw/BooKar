import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconTextInput = ({ iconName, ...props }) => (
  <View style={styles.inputWrapper}>
    <Icon name={iconName} size={20} color="#000" style={styles.inputIcon} />
    <TextInput {...props} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 50,
  },
  inputIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default IconTextInput;