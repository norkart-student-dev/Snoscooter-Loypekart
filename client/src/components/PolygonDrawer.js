import React, { useState } from 'react';
import { Polygon, useMapEvents } from 'react-leaflet';

function PolygonDrawer ({onUpdate}){
    const [corners, setCorners] = useState([])

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