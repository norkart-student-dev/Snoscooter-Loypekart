import React, { useState } from 'react';
import Leaflet from 'leaflet';
import { Polygon, useMapEvents } from 'react-leaflet';

function PolygonDrawer ({onUpdate}){
    const [corners, setCorners] = useState([])
    const markerHtmlStyles = `
        background-color: blue;
        opacity: 0.5;
        width: 15px;
        height: 15px;
        display: block;
        border: 1px solid #FFFFFF`;

    const icon = Leaflet.divIcon({
        className: 'corner',
        html: `<span style="${markerHtmlStyles}" />`
    });

    useMapEvents({
        click(e) {
                let temp = corners.concat([[e.latlng.lat, e.latlng.lng]])
                setCorners(temp)
                onUpdate(temp)
        },
        popupopen(e) {
                e.popup._closeButton.click()
        }
    })

    return <Polygon color='red' positions= {corners} id='trackSelection'/>;
}

export default PolygonDrawer;