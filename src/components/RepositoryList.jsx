import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';



const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  picker: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    fontSize: theme.fontSizes.subheading,
  },
}
);

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchKeyword,
  setSearchKeyword,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const navigate = useNavigate();

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />

          <Picker
            style={styles.picker}
            selectedValue={selectedOrder}
            onValueChange={(itemValue) => setSelectedOrder(itemValue)}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highestRated" />
            <Picker.Item label="Lowest rated repositories" value="lowestRated" />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderVariables = {
    latest: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
    highestRated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
    lowestRated: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  };

  const { repositories } = useRepositories({
    ...orderVariables[selectedOrder],
    searchKeyword: debouncedSearchKeyword,
  });;

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
