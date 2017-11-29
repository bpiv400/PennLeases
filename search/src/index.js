import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import '/public/css/bootstrap-theme.min.css';
import '/public/css/bootstrap.min.css';
import '/public/bootstrap.min.js';

import SearchResults from '/public/components/SearchResults';
import * as initialState from '/public/initialState';
import * as actions from '/public/actions/index';
import { mainReducer } as reducers from '/public/reducers/index.js';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, initialState);

const searchResults = <SearchResults store={store}/>

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    searchResults,
    document.getElementById('root')
  );
});
registerServiceWorker();
