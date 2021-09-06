/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

const ListView = (commitList: any) => {
  return (
    <FlatList
      data={commitList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />)
}


const renderItem = ({ item }: any) => (
  <Item item={item} />
);

const Item = ({ item }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>author: {item.author}</Text>
    <Text style={styles.commithash}>Commit# {item.commitHash}</Text>
    <Text style={styles.commithash}>Message: {item.message}</Text>
  </View>
);


const userName = 'sameethh'
const repo = 'General-motors'



const App = () => {

  const [commitList, setCommitList] = useState<any>([])


  const TriggerGitAPI = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
      const json = await response.json()
      let commitArray: { commitHash: string; author: string; message: string }[] = []
      json.map((obj: any) => {
        console.log(obj)
        commitArray.push({ commitHash: obj?.sha, author: obj?.commit?.author?.name, message: obj?.commit?.message })
      })
      setCommitList(commitArray)
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    TriggerGitAPI()
  }, [])
  
  const backgroundStyle = {
    height: 80,
    backgroundColor: 'teal',
  };
  return (
    <View>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Git Users Commits</Text>
        </View>
      </SafeAreaView>
      {ListView(commitList)}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 20
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'red',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  commithash:{
    fontSize: 10,
  }
});

export default App;
