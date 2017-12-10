import  React  from 'react';
import Preview from './Preview';
import _ from 'lodash';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listings : this.props.defaultListings,
      addresses: this.props.defaultAddresses
    };
  }

  getFetch() {
    var termString = '';
    console.log(this.props.term);
    console.log(this.props.fart);
    for (var i = 0; i < this.props.term.length; i++) {
      termString += '&term[]=' + this.props.term[i];
    }
    var furnString = '';
    for (var j = 0; j < this.props.furnished.length; j++) {
      furnString += '&furn[]=' + this.props.furnished[j];
    }
    var out = '/results?pg=' + this.props.page + '&lim=' + this.props.lim +
      '&ord=' + this.props.ord + '&srt=' + this.props.sort + '&apt=' +
      this.props.apartments.toString() + '&house=' +
      this.props.houses.toString() + '&occ=' + this.props.occupancy +
     '&min=' + this.props.minPrice + '&max=' + this.props.maxPrice +
     termString + furnString;
       return out;
  }

  componentDidMount() {
    var fetchURL = this.getFetch();
    fetch(fetchURL).
      then(function(res) {
        return (res.json());
      }).
      then(function (data) {
        this.setState(data);
      }.bind(this));
  }

  componentDidUpdate() {
    var fetchURL = this.getFetch();
    fetch(fetchURL).
      then(function(res) {
        return (res.json());
      }).
      then(function (data) {
        if (!(_.isEqual(data, this.state))) {
          this.setState(data);
        }
      }.bind(this));
  }
  render() {
    var resultsArray = Array();
    for (var i = 0; i < this.state.listings.length; i++) {
      console.log(this.state.listings[i]);
      const currResult = (<Preview
        key = {i}
        housingType = {this.state.listings[i].housingType}
        address = {this.state.addresses[i]}
        photos = {this.state.listings[i].photos}
        availability = {this.state.listings[i].term}
        buildingName = {this.state.listings[i].buildingName}
        price = {this.state.listings[i].price}
        id = {this.state.listings[i]._id}>
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
