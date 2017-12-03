import  React  from 'react';

export default class Preview extends React.Component {
  constructor() {
    super();
    this.onPreviewClick = this.onPreviewClick.bind(this);
  }

  onPreviewClick() {
    console.log('preview clicked');
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
    let imgSource = null;
    if (this.props.photos) {
       imgSource = "/images/?id=" + this.props.photos[0];
    }
    let viewLink = "/view/" + this.props.id;
    let availability ="";
    for (let i = 0; i < this.props.availability.length; i++) {
      availability = availability + this.props.availability[i];
      if (i < this.props.availability.length - 1) {
        availability = availability + ', ';
      }
    }
    let price = "$" + this.props.price;
    let location = (this.props.buildingName) ? this.props.buildingName :
      (this.props.housingType === 'House') ? 'House' : 'Apartment';
    return (
      <a href = {viewLink}>
        <div className="panel panel-default container"
          onClick = {(e) => this.onPreviewClick(e)}>
          <div className="panel-heading">
            <h3 className="panel-title">{addressTitle}</h3>
          </div>
          <div className="panel-body">
            <div className='container'>
              <div className="row">
                <div className="col-xs-4">

                  { this.props.photos
                    ? <img src={imgSource} className = "img-fluid
                      img-thumbnail"
                      alt='preview of property'>
                    </img>
                    : null
                  }
                </div>
                <div className="col-xs-8">
                  <dl className="row">
                    <dt className="col-xs-3">Availability</dt>
                    <dd className="col-xs-9">{availability}</dd>

                    <dt className="col-xs-3">Price</dt>
                    <dd className="col-xs-9">{price}</dd>

                    <dt className="col-xs-3">Location</dt>
                    <dd className="col-xs-9">{location}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>);
  }
}
