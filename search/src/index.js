import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import ResultsContainer from './components/ResultsContainer';
import * as actions from './actions/index';
import { mainReducer as reducers} from './reducers/index.js';
import registerServiceWorker from './registerServiceWorker';
import * as initialState from './initialState';


fetch('/results?pg=1&lim=20&ord=-1&srt=date').
  then(function(res) {
    return (res.json());
 }).
 then(function (data) {
   const store = createStore(reducers, {
     lim: initialState.lim,
     page: initialState.page,
     sort: initialState.sort,
     apartments: initialState.apartments,
     houses: initialState.houses,
     occupancy: initialState.occupancy,
     maxPrice: initialState.maxPrice,
     minPrice: initialState.minPrice,
     ord: initialState.ord,
     term: initialState.term,
     furnished: initialState.furnished,
     defaults: data,
   });
   const resultsContainer = <ResultsContainer store={store}/>
   ReactDOM.render(
     resultsContainer,
     document.getElementById('root')
   );
   registerServiceWorker();
});
