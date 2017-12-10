const sort = (choice) => {
  var value;
  if (!choice) {
    value = 'date';
  } else {
    value = choice.value;
  }
  return {
    type: 'SORT',
    value : value
  };
};

const type = (value) => {
  return {
    type: 'TYPE',
    value : value
  };
};

const order = (choice) => {
  var value;
  if (!choice) {
    value = 1;
  } else {
    value = choice.value;
  }
  return {
    type: 'ORDER',
    value : value
  };
};

const furnish = (value) => {
  return {
    type: 'FURNISH',
    value : value
  };
};

const term = (value) => {
  console.log(value);
  return {
    type: 'TERM',
    value : value
  };
};
const limit = (choice) => {
  var value;
  if (!choice) {
    value = 20;
  } else {
    value = choice.value;
  }
  return {
    type: 'LIMIT',
    value: value
  };
};

const occupancy = (choice) => {
  var value;
  if (!choice) {
    value = 0;
  } else {
    value = choice.value;
  }
  return {
    type: 'OCCUPANCY',
    value : value
  };
};

const priceChange = (maxPrice, minPrice) => {
  return {
    type : 'PRICE',
    min : minPrice,
    max : maxPrice
  };
};

const pageChange = (newPage) => {
  return {
    type: 'PAGE',
    value: newPage
  };
};
export {priceChange, occupancy, term, furnish, order,
type, sort, limit, pageChange}
