import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import redux from './redux';

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_STRAPI_TOKEN}`
  }
});

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
