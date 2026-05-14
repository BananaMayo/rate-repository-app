import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
        <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;

"npx expo start"
"npm start"
