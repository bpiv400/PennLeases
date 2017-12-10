import _ from 'lodash';

const mainReducer = (state, action) => {
  switch (action.type) {
    case 'SORT': {
      return _.assign({}, state, {sort : action.value});
    }
    case 'TYPE': {
      var newHouse = false;
      if (action.value.includes('House')) {
        newHouse = true;
      }
      var newApartments = false;
      if (action.value.includes('Apartment Building')) {
        newApartments = true;
      }
      return _.assign({}, state, {
        houses: newHouse,
        apartments: newApartments});
    }
    case 'ORDER': {
      return _.assign({}, state, {ord : action.value});
    }

    case 'FURNISH': {
      return _.assign({}, state, {furnished : action.value});
    }
    case 'PAGE': {
      return _.assign({}, state, {page : action.value});
    }
    case 'TERM': {
      console.log(action.value);
      return _.assign({}, state, {term : action.value});
    }
    case 'OCCUPANCY': {
      return _.assign({}, state, {occupancy : action.value});
    }
    case 'LIMIT': {
      return _.assign({}, state, {
        lim : action.value,
        page: 1
      });
    }
    case 'PRICE': {
      return _.assign({}, state, {
        minPrice: action.min,
        maxPrice: action.max
      });
    }
    default : {
      return state;
    }
  }
};
export {mainReducer}
