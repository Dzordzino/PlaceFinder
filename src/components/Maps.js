import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class Maps extends Component {

    state = {
        latitude: "",
        longitude: "",
        locationDetected: false,
        places:""
   }

   componentDidMount = () => {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationDetected = true;
            this.setState({ latitude, longitude, locationDetected });
         },
         (error) => alert(error.message)
      );

      var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            // Typical action to be performed when the document is ready:
                console.log(JSON.parse(xhttp.responseText));
            }
        };
        xhttp.open("GET", "http://127.0.0.1:3000/placesJson.JSON", true);
        xhttp.send();
    }

    displayMarkers = () => {
        if(this.state.places.length > 0){
            return this.state.places.map((place, index) => {
                return <Marker key={index} id={index} position={{
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        }}
                        onClick={() => console.log("You clicked me!")} />
            })
        }
    }

    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        const request = {
            location: map.getCenter(),
            radius: "2000",
            type: ["restaurant"]
          };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const places = results;
                this.setState({places});
            }
        });
    }

    
  

    render() {
       
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        const { latitude, longitude, locationDetected} = this.state;

        return (
            <div>
                {locationDetected ? (
                    <Map google={this.props.google}
                        zoom={14}
                        style={mapStyles}
                        initialCenter={{ lat: latitude, lng: longitude}}
                        onReady={this.fetchPlaces.bind(this)}>
                            {this.displayMarkers()}
                    </Map>
                ) : ( <p>There is no location</p> )}
            </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCfzWY9B6LyhQJ-bVi2BWitjePhWPeWkpY'
})(Maps);