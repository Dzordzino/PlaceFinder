import React, { Component } from "react";
import "../App.css";
import Maps from "./Maps";
import SearchComponent from "./SearchComponent";

class App extends Component {
  state = {
    latitude: "",
    longitude: "",
    locationDetected: false,
    places: "",
    showMap: false,
    radius: 2000,
  };

  showMap() {
    this.setState({ showMap: true });
  }

  changeRadius(e) {
    let inputValue = e.currentTarget.value;
    console.log(inputValue);
    document.querySelector(".js-rangeInput").setAttribute("value", inputValue);
    this.setState({ radius: inputValue });
  }

  render() {
    const { showMap } = this.state;

    return (
      <div className='App'>
        <h1>Hello</h1>
        {showMap ? (
          <div className='mapHolder'>
            <Maps data={this.state} />
          </div>
        ) : (
          <SearchComponent
            data={this.state}
            showMap={this.showMap.bind(this)}
            changeRadius={this.changeRadius.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default App;
