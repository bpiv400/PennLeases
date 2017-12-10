import  React  from 'react';
import Preview from './Preview';

export default class Results extends React.Component {
  render() {
    var resultsArray = [];
    for (var i = 0; i < this.props.listings.length; i++) {
      console.log(this.props.listings[i]);
      const currResult = (<Preview
        key = {i}
        housingType = {this.props.listings[i].housingType}
        address = {this.props.addresses[i]}
        photos = {this.props.listings[i].photos}
        availability = {this.props.listings[i].term}
        buildingName = {this.props.listings[i].buildingName}
        price = {this.props.listings[i].price}
        id = {this.props.listings[i]._id}>
      </Preview>);
      resultsArray.push(currResult);
    }
    if (resultsArray.length === 0) {
      resultsArray = <h1 className =
        {'text-warning bg-warning text-center'}
        >No more results! Go back!</h1>
    }
    return resultsArray;
  }
}
