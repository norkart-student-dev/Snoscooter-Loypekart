import { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';


function ContextMarker({createPoi}) {
    const [position, setPosition] = useState(null)

    useMapEvents({
        click(e) {
            if(position !== null){
                setPosition(null)
            } else {
                setPosition(e.latlng)
            }
        },
        popupclose(e) {
            if(e.popup.options.id === 'poiPopup'){
                setPosition(null)
            }
        }
    })

    return position === null ? null : (
        <Popup position={position} id='poiPopup'>
            <button onClick={() => {
                createPoi(position)
                setPosition(null)
            }}>Nytt punkt</button>
        </Popup>
    )
}

export default ContextMarker;