import React, { Component, Fragment } from "react";

class SearchComponent extends Component {

  changeInput(e) {
    document.getElementById("result").innerHTML = "";
    if(e.currentTarget.value !== ""){
      document.querySelector(".js-autocompleteButton").disabled = false;
      let autocompleteInputValue = e.currentTarget.value.split(" ").join("_"),
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
        li.addEventListener("click", this.props.singleItemClick);
        document.querySelector("#result").appendChild(li);
      });
      if(fulteredResults.length === 0){
        let li = document.createElement("LI");

        li.innerHTML = "Please try with diferent word";
        document.querySelector("#result").appendChild(li);
        document.querySelector(".js-autocompleteButton").disabled = true;
      }
    }
  };

  render() {
    const { changeRadius, showMapButton } = this.props;

    return (
      <Fragment>
        <input className='js-autocompleteInput autocompleteInput' type='text' onKeyUp={(e) => this.changeInput(e)} placeholder="Enter place type" />
        <ul id='result'></ul>
        <input
          type='range'
          min='1000'
          step='1000'
          max='10000'
          className='js-rangeInput rangeInput'
          onChange={changeRadius}/>
        <p className="rangeText">Current range <span className="js-rangeText">1000</span>m</p>
        <button className="js-autocompleteButton searchButton" type='button' onClick={showMapButton}>Search</button>
      </Fragment>
    );
  };
};

export default SearchComponent;
