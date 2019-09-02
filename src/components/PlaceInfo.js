import React, { Component, Fragment } from 'react'

import List from "./List";

class PlaceInfo extends Component {

    renderList(places, showInfo){
        let m = document.querySelector(".js-placesList");
        if(m !== null){
            m.innerHTML = "";
            places.forEach(item => {
                let li = document.createElement("LI");
                li.innerHTML = item.name.split("_").join(" ");
                li.setAttribute("data-id", item.id);
                li.addEventListener("click", showInfo);
                document.querySelector(".js-placesList").appendChild(li);
            });
        }   
    };
    
    render() {
        const { showPlaceInfo, selectedPlace, showList, data, showInfo } = this.props;
        return (
            <Fragment>
                { showPlaceInfo ? (
                    <Fragment>
                        <img src=
                        { selectedPlace.photos ? (
                            selectedPlace.photos[0].getUrl()
                        ) : (  selectedPlace.icon )}
                        alt={selectedPlace.name +" image"} className="placeInfoImage" />
                        <p className="placeInfoTitle">
                            {selectedPlace.name}
                            <span className={selectedPlace.opening_hours && selectedPlace.opening_hours.open_now ? "statusCircle" : "statusCircle closed"}></span>
                        </p>
                        <p className="placeInfoTitle">
                            {selectedPlace.rating ? "rating: " + selectedPlace.rating : "No one rated this place"}
                        </p>
                        <p className="placeInfoTitle">
                            {selectedPlace.vicinity ? selectedPlace.vicinity : "Unknown address"}
                        </p>
                        <button type="button" onClick={ showList }>Go to the list</button>
                    </Fragment>
                ) : (
                    <Fragment>
                        { data.places ? (
                            <List data={data.places} showInfo={(e) => showInfo(e)} />
                            ):(
                                ""
                            )
                        }    
                    </Fragment>
                )}
            </Fragment>
        );
    };
};

export default PlaceInfo;
