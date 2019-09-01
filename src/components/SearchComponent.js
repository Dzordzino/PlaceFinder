import React, { Component, Fragment } from "react";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  componentDidMount = () => {
    let that = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // Typical action to be performed when the document is ready:
        let placesArray = JSON.parse(xhttp.responseText).places;
        that.setState({ places: placesArray });
      }
    };
    xhttp.open("GET", "http://127.0.0.1:3000/placesJson.JSON", true);
    xhttp.send();
  };

  singleItemClick() {
    console.log("e");
  }

  changeInput(e) {
    document.getElementById("result").innerHTML = "";
    let autocompleteInputValue = e.currentTarget.value,
      places = this.state.places,
      reg = new RegExp(
        autocompleteInputValue
          .split("")
          .join("\\w*")
          .replace(/\W/, ""),
        "i"
      );
    let fulteredResults = places.filter(function(person) {
      if (person.match(reg)) {
        return person;
      }
    });
    fulteredResults.forEach(item => {
      document.getElementById(
        "result"
      ).innerHTML += `<li onClick=${this.singleItemClick} >${item}</li>`;
    });
  }

  render() {
    const { changeRadius, showMap } = this.props;

    return (
      <Fragment>
        <input type='text' onKeyUp={this.changeInput.bind(this)} />
        <ul id='result'></ul>
        <button type='button' onClick={showMap}>
          Search
        </button>
        <input
          type='range'
          min='0'
          step='1000'
          max='10000'
          className='js-rangeInput'
          onChange={changeRadius}></input>
      </Fragment>
    );
  }
}

export default SearchComponent;
