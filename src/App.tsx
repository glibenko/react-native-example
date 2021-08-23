import React, {useMemo, FC, useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  TextInputScrollEventData,
} from 'react-native';
import {ContactsList, ContactIcon, ContactInfo} from './components/index';
import {DATA} from './consts';
import {Data} from './types';

const App: FC = () => {
  const mode = useColorScheme();
  const barStyle = useMemo(
    () => (mode === 'dark' ? 'light-content' : 'dark-content'),
    [mode],
  );
  const {height} = useWindowDimensions();
  const [drugble, setDrugble] = useState<null | 'top' | 'main'>(null);
  const [selected, setSelected] = useState<null | string>(null);
  const contactsListRef = useRef<FlatList>(null);
  const contactsInfoRef = useRef<FlatList>(null);


  const descSize = height - 100 - 10 - 80;
  const descSizeFull = (DATA.length - 1) * descSize;

  const iconSize = 90 + 10;
  const iconSizeFull = iconSize * (DATA.length - 4); //672 110 * 10 = 1100 / 428

  useEffect(() => {
    if (!selected) {
      return;
    }
    const index = DATA.findIndex(el => el.id === selected);
    contactsListRef?.current?.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
    contactsInfoRef?.current?.scrollToIndex({animated: true, index});
  }, [selected]);

  const onScroll = ({x, y}: {x: number, y: number}) => {
    if (drugble === 'main') {
      const descScroll = y / descSizeFull * 100;
      const iconScroll = iconSizeFull / 100 * descScroll;
      contactsListRef?.current?.scrollToOffset({offset: iconScroll});
    }
    if (drugble === 'top') {
      const iconScroll = x / iconSizeFull * 100;
      const descScroll = descSizeFull / 100 * iconScroll;
      contactsInfoRef?.current?.scrollToOffset({offset: descScroll});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      <View style={styles.main}>
        <ContactsList
          data={DATA}
          customref={contactsListRef}
          horizontal
          styles={styles.contactsList}
          renderItem={({item}: ListRenderItemInfo<Data>) => (
            <ContactIcon
              selected={selected}
              item={item}
              onPress={() => setSelected(item.id)}
            />
          )}
          onScroll={({
            nativeEvent,
          }: NativeSyntheticEvent<TextInputScrollEventData>) =>
            drugble === 'top' && onScroll(nativeEvent.contentOffset)
          }
          onScrollBeginDrag={() => setDrugble('top')}
        />
        <ContactsList
          data={DATA}
          customref={contactsInfoRef}
          renderItem={({item}: ListRenderItemInfo<Data>) => (
            <ContactInfo
              item={item}
              onPress={() => setSelected(item.id)}
              height={height - 100 - 10 - 80}
            />
          )}
          onScroll={({
            nativeEvent,
          }: NativeSyntheticEvent<TextInputScrollEventData>) =>
            drugble === 'main' && onScroll(nativeEvent.contentOffset)
          }
          onScrollBeginDrag={() => setDrugble('main')}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
  },
  contactsList: {
    height: 100,
  },
});
