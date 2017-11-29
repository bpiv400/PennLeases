import { React } from 'react';
export default class Preview extends React.Component {
  constructor() {
    super();
    this.onPreviewClick = this.onPreviewClick.bind(this);
  }

  onPreviewClick() {
    console.log('Preview clicked');
  }

  render() {
    let addressTitle = this.props.address.streetNumber + ' ' +
      this.props.address.street;
    if (this.props.address.unit) {
      addressTitle = addressTitle + this.props.address.unit;
    }
    //TODO: Determine whether this needs to be changed when
    // going to production -- understand how react is communicating
    // with the server better
    let imgSource;
    if (this.props.photos) {
       imgSource = "/images/?id=" + this.props.photos[0];
    }

    let availability;
    for (let i = 0; i < this.props.availability.length; i++) {
      availability = this.props.availability[i];
      if (i < this.props.availability.length - 1) {
        availability = availability + ', ';
      }
    }

    let location = (this.props.buildingName) ? this.props.buildingName :
      (this.props.housingType === 'House') ? 'House' : 'Apartment';
    let jsxOut = (
      <div className="panel panel-default container-fluid"
        onClick = {(e) => this.onPreviewClick(e)}>
        <div className="panel-heading">
          <h3 className="panel-title">{addressTitle}</h3>
        </div>
        <div className="panel-body">
          <div className="row"> );
            if (this.props.photos) {
              jsxOut = jsxOut + (
                <div className="col col-md-4">
                  <img src={imgSource} className = "img-fluid
                  img-thumbnail"></img>
                </div>);
            }
            jsxOut = jsxOut + (
            <div className="col-md col">
              <dl className="row list-group">

                <dt className="col-sm-3" >Availability</dt>
                <dd className="col-sm-9">{availability}</dd>

                <dt className="col-sm-3">Price</dt>
                <dd className="col-sm-9">{Price}</dd>

                <dt className="col-sm-3">Location</dt>
                <dd className="col-sm-9">{location}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>);
    return jsxOut;
  }
}
