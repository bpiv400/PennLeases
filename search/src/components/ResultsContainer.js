import  React  from 'react';
import Preview from './Preview';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import * as initialState from '../initialState';

window.jQuery = window.$ = require('jquery');


export default class ResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.store.getState());
    this.state = this.props.store.getState();
  }


  componentDidMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
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
    return (
      <div className='results-container container'>
        <div className='results'>
          {resultsArray}
        </div>
      </div>
    );
  }
}
