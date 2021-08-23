import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {CustomText, ContactName} from './';

const ContactInfo = ({item, height, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {height}]}>
      <ContactName>{item.name}</ContactName>
      <CustomText styles={styles.title}>{item.title}</CustomText>
      <CustomText styles={styles.about}>About me</CustomText>
      <CustomText styles={styles.aboutText}>{item.about}</CustomText>
    </TouchableOpacity>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    fontSize: 18,
    marginTop: 50,
    textAlign: 'center',
  },
  title: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 4,
  },
  about: {
    fontWeight: 'bold',
    marginTop: 40,
  },
  aboutText: {
    color: 'grey',
    marginTop: 4,
  },
});
