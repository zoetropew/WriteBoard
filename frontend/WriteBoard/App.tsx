/**
 * Home screen for app
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  Alert,
} from 'react-native';

import {
  Colors, // change when design team has color scheme
} from 'react-native/Libraries/NewAppScreen';

import axios from 'axios';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// Section is currently for each note
function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const createTwoButtonAlert = () => // temporary function
    Alert.alert('TODO', 'Add react native navigation functionality', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  
  return (
    <View style={styles.sectionContainer}>
      <Pressable onPress={ createTwoButtonAlert /* make function direct page to a note later */ }>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
      </Pressable>
      <Text
        style={[
          styles.sectionDescription, 
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const imageSource = isDarkMode ? require('./WB-header-dark.png') : require('./WB-header.png');

  // fetching from backend, should fetch "Hello from the backend API"
  // remember to start node server first: node server.js
  // console message should be: Server is running on port 5000
  const [data, setData] = useState("");
  useEffect(() => {
    fetchData();
  },[]);
  const fetchData=async()=>{
    try {
      const response = await axios.get('http://localhost:5000/');
      setData(response.data.message);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Image 
          // outside of scrollview so that add and help buttons are always accessible
          source={imageSource}
          style={{width: 400, height: 140}}
          resizeMode="center"
          // revisit sizing to scale to screen size
        />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            {/* temporary hardcoded notes */}
          <Section title="">
            <Text>Fetched: {data}.</Text>
          </Section>
          <Section title="Note One">
            [Preview of note...]
          </Section>
          <Section title="Note Two">
            [We should probably make it so you can add sections for each class]
          </Section>
          <Section title="Note Three">
            [Add button will be top right with the logo]
          </Section>
          <Section title="Note Four">
            [One tap can make a selection menu appear, new class or new note so we can offer both]
          </Section>
          <Section title="Note Five">
            [i think i can figure out how to make the first note a tutorial, i'm sorry for rejecting it]
          </Section>
          <Section title="Note Six">
            [Within reading the note, there should be another add button so you can take all pics of board from single class session]
          </Section>
          <Section title="Note Seven">
            [Search bar will appear if you scroll all the way up]
          </Section>
          <Section title="Note Eight">
            [All of this was just to demonstrate you can scroll lol]
          </Section>
          <Section title="Note Nine">
            [This one is a bug tho *intense crying*]
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
