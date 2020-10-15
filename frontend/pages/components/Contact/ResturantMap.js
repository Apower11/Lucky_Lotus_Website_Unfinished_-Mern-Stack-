import React, { useState } from 'react';
import MyMapComponent from './MyMapComponent';

const RestaurantMap = props => {
    const [isOpen, setIsOpen] = useState(false);

    const GOOGLE_API_KEY = 'AIzaSyAeYlWNeEvsvgvcMo0fdMponEY3peYephc';
    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="restaurant-map">
                <h1>Find Us</h1>
                <MyMapComponent
                containerElement={<div style={{ height: `80vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_API_KEY}`}
               loadingElement={<div style={{ height: `100%` }} />}
               onClick={toggleIsOpen}
               isOpen={isOpen}
                 />
            </div>
    )
}

export default RestaurantMap;