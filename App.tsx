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
      keyExtractor={commitList => commitList?.commitHash}
    />)
}


const renderItem = ({ item }: any) => (
  <Item item={item} />
);

const Item = ({ item }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>message: {item.message}</Text>
    <Text style={styles.commithash}>commit# {item.commitHash}</Text>
    <Text style={styles.commithash}>committer: {item.author}</Text>
  </View>
);


const userName = 'sameethh'
const repo = 'General-motors'



const App = () => {

  const [commitList, setCommitList] = useState<any>([])

  var commitHash = ''
  const TriggerGitAPI = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
      const json = await response.json()
      let commitArray: { commitHash: string; author: string; message: string }[] = []
      json.map((obj: any , index: number) => {
        commitHash = obj.sha
        commitArray.push({ commitHash: obj?.sha, author: obj?.commit?.author?.name, message: obj?.commit?.message })
      })
      setCommitList(commitArray)
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    TriggerGitAPI()
  }, [commitHash])

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
      <View>
      {ListView(commitList)}
      </View>
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
    borderRadius:10,
    borderWidth:1,
    borderColor:'black',
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 15,
  },
  commithash:{
    fontSize: 10,
  }
});

export default App;
