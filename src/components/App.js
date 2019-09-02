import React, { Component, Fragment } from "react";

import "../App.scss";

import Maps from "./Maps";
import SearchComponent from "./SearchComponent";
import PlaceInfo from "./PlaceInfo";

class App extends Component {
  state = {
    latitude: "",
    longitude: "",
    locationDetected: false,
    places: "",
    placeTypes: "",
    showMap: false,
    radius: 1000,
    placeType: "",
    showPlaceInfo: false,
    selectedPlace: ""
  };

  componentDidMount(){
    let that = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let placesArray = JSON.parse(xhttp.responseText).places;
        that.setState({ placeTypes: placesArray });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:3000/placesJson.JSON", true);
    xhttp.send();
  };

  showMapButton() {
    this.setState({ showMap: true });
  };

  changeRadius(e) {
    let inputValue = e.currentTarget.value;

    document.querySelector(".js-rangeInput").setAttribute("value", inputValue);
    document.querySelector(".js-rangeText").innerHTML = inputValue;
    this.setState({ radius: inputValue });
  };

  showInfo(e){
    let elementId = "";

    if(e.id){
      elementId = e.id;
    }else if(e.currentTarget){
      elementId = e.currentTarget.getAttribute("id");
    }
    let placesArray = this.state.places,
        selectedPlace = placesArray.filter(item => item.id === elementId);

    this.setState({ selectedPlace: selectedPlace[0], showPlaceInfo: true });
  };

  showList(){
    this.setState({ showPlaceInfo: false });
  };

  stateUpdate(placesArray){
    this.setState({ places: placesArray});
  };

  singleItemClick(e) {
    let itemValue = e.currentTarget.getAttribute("data-id"),
        itemText = e.currentTarget.innerHTML;
    
    document.querySelector(".js-autocompleteInput").value = itemText;
    document.getElementById("result").innerHTML = "";
    this.setState({ placeType: itemValue});
  };

  render() {
    const { showMap, showPlaceInfo, selectedPlace } = this.state;

    return (
      <div className={showMap ? "App large" : "App"}>
        {showMap ? (
          <div className='infoHolder'>
            <div className='infoWindow'>
              <PlaceInfo
                data={this.state}
                showPlaceInfo={showPlaceInfo} 
                selectedPlace={selectedPlace}
                showList={this.showList.bind(this)}
                showInfo={this.showInfo.bind(this)}/>
            </div>
            <div className='mapHolder'>
              <Maps
                data={this.state} 
                showInfo={this.showInfo.bind(this)}
                stateUpdate={this.stateUpdate.bind(this)} 
              />
            </div>
          </div>
        ) : (
          <Fragment>
          <h1>Find places near you</h1>
          <SearchComponent
            data={this.state}
            showMapButton={this.showMapButton.bind(this)}
            changeRadius={this.changeRadius.bind(this)}
            singleItemClick={this.singleItemClick.bind(this)}
          />
          </Fragment>
        )}
      </div>
    );
  };
};

export default App;
