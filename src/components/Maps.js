import React, { Component, Fragment } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationDetected = true;
        this.setState({ latitude, longitude, locationDetected });
      },
      error => alert(error.message)
    );
  };



  displayMarkers = () => {
    if (this.state.places.length > 0) {
      return this.state.places.map((place, index) => {
        return (
          <Marker
            key={index}
            id={place.id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            onClick={this.props.showInfo.bind(this)}
          />
        );
      });
    }
  };

  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: map.getCenter(),
      radius: this.state.radius,
      type: [this.state.placeType]
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.setState({ places: results});
        this.props.stateUpdate(results);
      }
    });
  };

  render() {
    const { latitude, longitude, locationDetected } = this.state;

    return (
      <Fragment>
        {locationDetected ? (
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{ lat: latitude, lng: longitude }}
            onReady={this.fetchPlaces.bind(this)}>
            {this.displayMarkers()}
          </Map>
        ) : (
          <p>There is no location</p>
        )}
      </Fragment>
    );
  };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCfzWY9B6LyhQJ-bVi2BWitjePhWPeWkpY",
})(Maps);
