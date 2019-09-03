import React, { Fragment } from 'react'

import List from "./List";

const PlaceInfo = ({ showPlaceInfo, selectedPlace, showList, data, showInfo }) => (
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
                    <List data={data.places} showInfo={showInfo} />
                    ):(
                        ""
                    )
                }    
            </Fragment>
        )}
    </Fragment>
);

export default PlaceInfo;
