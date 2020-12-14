import React from 'react';
import { Popup, Polyline } from 'react-leaflet';
import proj4 from 'proj4';
    
    // draws the relevant track for the item given 
    export default function TrackMarker({item}) {

        //TODO Something is wrong here
        let coordinates = item.geometry.coordinates.map((item,index) => ([item[0], item[1]]))
        coordinates = coordinates.map((item,index) => (proj4(
            '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs', 
            '+proj=longlat +datum=WGS84 +no_defs ', 
            item)));

        coordinates = coordinates.map((item,index) => ([item[1], item[0]]))


        return(
            <Polyline positions={coordinates}>
                <Popup className='PoiInfo'>
                    <p>Navn: {item.properties.NAVN}</p>
                </Popup>
            </Polyline>
        );
    }