import React, {FC, useRef} from 'react';
import {
  FlatList,
  View,
  NativeSyntheticEvent,
  TextInputScrollEventData,
  NativeScrollEvent,
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Data} from '../types';

interface Props {
  data?: Data[],
  customref: typeof useRef,
  horizontal?: boolean,
  styles: StyleProp<ViewStyle>,
  onScroll: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void,
  onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void,
  renderItem: ListRenderItem<Data>,
}

const ContactsList: FC<Props> = ({
  data,
  customref,
  horizontal,
  styles,
  onScroll,
  onScrollBeginDrag,
  renderItem,
}) => {
  if (!data?.length) {
    return null;
  }

  return (
    <View style={styles}>
      <FlatList
        data={data}
        horizontal={horizontal}
        ref={customref}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={(...args) => console.log('object', args)}
      />
    </View>
  );
};

export default ContactsList;
