import React, { useState, useEffect } from 'react';
import { Polygon, useMapEvents } from 'react-leaflet';

function PolygonDrawer ({onUpdate}){
    const [corners, setCorners] = useState([])

    useEffect(() => {
        if(corners.length > 2){
            onUpdate(corners);
        }
      }, [corners, onUpdate]);

    useMapEvents({
        click(e) {
            let temp = corners.concat([[e.latlng.lat, e.latlng.lng]])
            setCorners(temp)
        },
        popupopen(e) {
                e.popup._closeButton.click()
        }
    })

    return <Polygon color='red' positions= {corners} id='trackSelection'/>;
}

export default PolygonDrawer;