import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {IMGS} from '../consts';

const ContactIcon = ({item: {id, img}, selected, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={[styles.img, selected === id && styles.selected]}
        source={IMGS[img]}
      />
    </TouchableOpacity>
  );
};

export default ContactIcon;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  img: {
    width: 90,
    height: 90,
  },
  selected: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 90,
  },
});
