import  React  from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import * as initialState from '../initialState';
import Results from './Results';
import Slider from 'rc-slider';
import * as actions from '../actions/index';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

window.jQuery = window.$ = require('jquery');


export default class ResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.getState();
    this.onSort = this.onSort.bind(this);
    this.onOrder = this.onOrder.bind(this);
    this.onFurnish = this.onFurnish.bind(this);
    this.onType = this.onType.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onOccupancy = this.onOccupancy.bind(this);
    this.onTerm = this.onTerm.bind(this);
    this.onLimit = this.onLimit.bind(this);
  }


  componentDidMount() {
    this.props.store.subscribe(function () {
      console.log(this.props.store.getState());
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  getOccupancyOptions() {
    var out = [];
    out.push({value: 0, label: "Any"});
    out.push({value: 1, label: "One"});
    out.push({value: 2, label: "Two"});
    out.push({value: 3, label: "Three"});
    out.push({value: 4, label: "Four"});
    out.push({value: 5, label: "More than Four"});
    return out;
  }

  getSortOptions() {
    var out = [];
    out.push({value: 'date', label : 'Date'});
    out.push({value: 'price', label : 'Rent'});
    out.push({value: 'size', label : 'Size'});
    out.push({value: 'beds', label : 'Beds'});
    return out;
  }
  onSort(value) {
    this.props.store.dispatch(actions.sort(value));
  }
  onOrder(value) {
    this.props.store.dispatch(actions.order(value));
  }
  onType(value) {
    this.props.store.dispatch(actions.type(value));
  }
  onNextPage() {
    var nextNum = this.state.page + 1;
    this.props.store.dispatch(actions.pageChange(nextNum));
  }

  onPrevPage() {
    if (this.state.page !== 1) {
      var nextNum = this.state.page - 1;
      this.props.store.dispatch(actions.pageChange(nextNum));
    }
  }

  onLimit(value) {
    this.props.store.dispatch(actions.limit(value));
  }
  onFurnish(value) {
    this.props.store.dispatch(actions.furnish(value));
  }
  onTerm(value) {
    this.props.store.dispatch(actions.term(value));
  }
  onOccupancy(value) {
    this.props.store.dispatch(actions.occupancy(value));
  }
  onPriceChange(values) {
    var maxPrice = Math.max(values[0], values[1]);
    var minPrice = Math.min(values[0], values[1]);
    this.props.store.dispatch(actions.priceChange(maxPrice, minPrice));
  }
  getOrderOptions() {
    var out = [];
    var ascendingLabel = 'Low to High';
    var descendingLabel = 'High to Low';
    if (this.state.sort === 'date') {
      ascendingLabel = 'Most Recent First';
      descendingLabel = 'Oldest First';
    }
    out.push({value : 1 , label : ascendingLabel});
    out.push({value : -1, label : descendingLabel});
    return out;
  }

  getLimitOptions() {
    var out = [];
    out.push({value : 5 , label : 'Five'});
    out.push({value : 10, label : 'Ten'});
    out.push({value : 20, label : 'Twenty'});
    out.push({value : 40, label : 'Forty'});
    return out;
  }

  render() {
    //TODO: ADD LISTENERS FOR
    console.log(this.state.term);
    var occupancyOptions = this.getOccupancyOptions();
    var sortOptions = this.getSortOptions();
    var orderOptions = this.getOrderOptions();
    var limitOptions = this.getLimitOptions();
    var termArray = initialState.possTerms.map( function(currTerm) {
      return (
        <label>
          <Checkbox value = {currTerm}></Checkbox>
          {currTerm}
        <br/></label>
      );
    });
    var furnishArray = []
    furnishArray.push(
      <label key = {0}>
        <Checkbox value = {true}
          className = {'form-check-input'}>
          </Checkbox>
        {'Furnished'}
      <br/></label>
    );
    furnishArray.push(
      <label className = {'form-check-label'}
        key = {1}>
        <Checkbox value = {false}
          className = {'form-check-input'}>
        </Checkbox>
        {'Unfurnished'}
      <br/></label>
    );
    var housingArray = []
    housingArray.push(
      <label key = {0}
         className = {'form-check-label'}>
        <Checkbox value = {'House'}></Checkbox>
        {'House'}
      <br/></label>
    );
    housingArray.push(
      <label key = {1}>
        <Checkbox value = {'Apartment Building'}></Checkbox>
        {'Apartment Building'}
      <br/></label>
    );
    return (
      <div className='results-container container-fluid'>
        <div className= 'row'>
          <div className = 'col-xs-2'>
            <h4> Rent Range </h4>
            <Range
               min ={initialState.minPrice}
               max = {initialState.maxPrice}
               defaultValue = {[this.state.minPrice, this.state.maxPrice]}
               tipFormatter = {value => `$${value}`}
               onAfterChange = {this.onPriceChange}
            />
            <h4> Availability </h4>
            <CheckboxGroup
              name = 'term'
              onChange = {this.onTerm}>
              {termArray}
            </CheckboxGroup>
            <h4> Furnishing </h4>
            <CheckboxGroup
              name = 'furnish'
              className = {'form-check-input'}
              onChange = {this.onFurnish}>
              {furnishArray}
            </CheckboxGroup>
            <h4> Location </h4>
            <CheckboxGroup
              name = 'housingType'
              onChange = {this.onType}>
              {housingArray}
            </CheckboxGroup>
            <h4> Occupancy </h4>
            <Select
              name = {'occupancy'}
              value = {this.state.occupancy}
              options = {occupancyOptions}
              onChange = {this.onOccupancy}
             />
          </div>
          <div className = 'col-xs-10'>
            <div className = 'row'>
              <div className = 'col-xs-8'>
                <Select
                  name = {'sort'}
                  value = {this.state.sort}
                  onChange = {this.onSort}
                  options = {sortOptions} />
              </div>
              <div className = 'col-xs-4'>
                <Select
                  name = {'order'}
                  value = {this.state.ord}
                  onChange = {this.onOrder}
                  options = {orderOptions} />
              </div>
            </div>
            <div className={'results'}>
              <Results
                page = {this.state.page}
                lim = {this.state.lim}
                sort = {this.state.sort}
                apartments = {this.state.apartments}
                houses = {this.state.houses}
                occupancy = {this.state.occupancy}
                maxPrice = {this.state.maxPrice}
                minPrice = {this.state.minPrice}
                ord = {this.state.ord}
                term = {this.state.term}
                furnished = {this.state.furnished}
                defaultListings = {this.state.defaults.listings}
                defaultAddresses = {this.state.defaults.addresses}
            ></Results>
            </div>
            <div className = 'row'>
              <div className = 'col-sm-6'>
                <label> {'Results Per Page'}
                  <Select
                    name = {'limit'}
                    value = {this.state.lim}
                    options = {limitOptions}
                    onChange = {this.onLimit}
                  /> </label>
              </div>
              <div className = 'col-xs-2'>
                <button className = 'btn'
                  onClick = {this.onPrevPage}>
                  {'Prev'}
                </button>
              </div>
              <div className = 'col-xs-2'>
                <p> {'Page: ' + this.state.page} </p>
              </div>
              <div className = 'col-xs-2'>
                <button className = 'btn'
                  onClick = {this.onNextPage}>
                  {'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
