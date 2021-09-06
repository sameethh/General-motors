/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';





const App = () => {
  const backgroundStyle = {
    height:80,
    backgroundColor: 'teal',
  };
  return (
    <View>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Git Users Commits</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
header:{
  justifyContent:'center',
  alignItems:'center'
},
headerText:{
  fontSize:20
}
});

export default App;
