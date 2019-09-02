import React, { Component, Fragment } from "react";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  changeInput(e) {
    document.getElementById("result").innerHTML = "";
    if(e.currentTarget.value !== ""){
      let autocompleteInputValue = e.currentTarget.value,
          places = this.props.data.placeTypes,
          reg = new RegExp(
            autocompleteInputValue
              .split("")
              .join("\\w*")
              .replace(/\W/, ""),
            "i"
          ),
          fulteredResults = places.filter(person => person.match(reg));
      fulteredResults.forEach(item => {
        let li = document.createElement("LI");

        li.innerHTML = item.split("_").join(" ");
        li.setAttribute("data-id", item);
        li.addEventListener("click", this.props.singleItemClick.bind(this));
        document.querySelector("#result").appendChild(li);
      });
      if(fulteredResults.length === 0){
        let li = document.createElement("LI");

        li.innerHTML = "Please try with diferent word";
        document.querySelector("#result").appendChild(li);
      }
    }
  };

  render() {
    const { changeRadius, showMapButton } = this.props;

    return (
      <Fragment>
        <input className='js-autocompleteInput autocompleteInput' type='text' onKeyUp={this.changeInput.bind(this)} placeholder="Enter place type" />
        <ul id='result'></ul>
        <input
          type='range'
          min='1000'
          step='1000'
          max='10000'
          className='js-rangeInput rangeInput'
          onChange={changeRadius}/>
        <p className="rangeText">Current range <span className="js-rangeText">1000</span>m</p>
        <button className="searchButton" type='button' onClick={showMapButton}>Search</button>
      </Fragment>
    );
  };
};

export default SearchComponent;
