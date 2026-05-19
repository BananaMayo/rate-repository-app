import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

import Constants from 'expo-constants';
import Text from './Text';

import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text fontWeight="bold" style={styles.tabText}>
            Repositories
          </Text>
        </Link>

        {data && data.me ? (
          <>
            <Link to="/create-review" component={Pressable} style={styles.tab}>
              <Text fontWeight="bold" style={styles.tabText}>
                Create a review
              </Text>
            </Link>

            <Link to="/my-reviews" component={Pressable} style={styles.tab}>
              <Text fontWeight="bold" style={styles.tabText}>
                My reviews
              </Text>
            </Link>

            <Pressable onPress={handleSignOut} style={styles.tab}>
              <Text fontWeight="bold" style={styles.tabText}>
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
          <Link to="/sign-in" component={Pressable} style={styles.tab}>
            <Text fontWeight="bold" style={styles.tabText}>
              Sign in
            </Text>
          </Link>

          <Link to="/sign-up" component={Pressable} style={styles.tab}>
            <Text fontWeight="bold" style={styles.tabText}>
              Sign up
            </Text>
          </Link>
        </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
