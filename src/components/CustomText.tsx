import React from 'react';
import {Text} from 'react-native';

const CustomText = ({styles, children}) => (
  <Text style={styles} allowFontScaling={false}>
    {children}
  </Text>
);

export default CustomText;
