/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';

interface IcommitList {
  commitHash: string;
  author: string;
  message: string;
}

const ListView = (commitList: IcommitList[]) => {
  return (
    <FlatList
      data={commitList}
      renderItem={renderItem}
      // eslint-disable-next-line no-shadow
      keyExtractor={commitList => commitList?.commitHash}
    />
  );
};

const renderItem = ({item}: {item: IcommitList}) => <Item item={item} />;

const Item = ({item}: {item: IcommitList}) => (
  <View style={styles.item}>
    <Text style={styles.title}>message: {item.message}</Text>
    <Text style={styles.commithash}>commit# {item.commitHash}</Text>
    <Text style={styles.commithash}>committer: {item.author}</Text>
  </View>
);

const userName = 'sameethh';
const repo = 'General-motors';

const App = () => {
  const [commitList, setCommitList] = useState<IcommitList[]>([]);
  const [input, setInput] = useState<string>('');
  const filteredData = commitList.filter((item: IcommitList) => {
    return item.message.toLowerCase().includes(input.toLocaleLowerCase());
  });

  var commitHash = '';
  const TriggerGitAPI = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${userName}/${repo}/commits`,
      );
      const data = await response.json();
      let commitArray: IcommitList[] = [];
      data.map((obj: any) => {
        commitHash = obj.sha;
        commitArray.push({
          commitHash: obj?.sha,
          author: obj?.commit?.author?.name,
          message: obj?.commit?.message,
        });
      });
      setCommitList(commitArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    TriggerGitAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commitHash]);

  return (
    <View>
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Git Users Commits</Text>
        </View>
      </SafeAreaView>
      <View style={styles.textInput}>
        <TextInput
          placeholder={'Search'}
          clearTextOnFocus
          onChangeText={text => {
            setInput(text);
          }}
        />
      </View>
      <View>{ListView(filteredData)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  item: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 15,
  },
  commithash: {
    fontSize: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 15,
    alignItems: 'center',
    padding: 10,
  },
  backgroundStyle: {
    height: 80,
    backgroundColor: 'teal',
  },
});

export default App;
