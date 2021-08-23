import React, {useMemo, FC} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';

const ContactName: FC<{children?: string}> = ({children}) => {
  const [firstName, lastName] = useMemo(
    () => (children ? children.split(' ') : []),
    [children],
  );

  return (
    <View style={styles.container}>
      <CustomText styles={[styles.size, styles.bold]}>{firstName} </CustomText>
      <CustomText styles={styles.size}> {lastName}</CustomText>
    </View>
  );
};

export default ContactName;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  size: {
    fontSize: 18,
    marginTop: 50,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});