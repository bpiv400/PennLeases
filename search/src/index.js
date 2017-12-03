import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import ResultsContainer from './components/ResultsContainer';
import * as actions from './actions/index';
import { mainReducer as reducers} from './reducers/index.js';
import registerServiceWorker from './registerServiceWorker';
import * as initialState from './initialState';

initialState.searchResults.then(function(data) {
  const store = createStore(reducers, {
    addresses: data.addresses,
    listings: data.listings,
    page: initialState.page
  });
  console.log(store);
  console.log(store.getState());
  const resultsContainer = <ResultsContainer store={store}/>
  ReactDOM.render(
    resultsContainer,
    document.getElementById('root')
    );
  registerServiceWorker();
});
