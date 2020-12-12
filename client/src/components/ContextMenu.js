import { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';


function ContextMarker(props) {
    const [position, setPosition] = useState(null)

    const map = useMapEvents({
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
                props.createPoi(position)
                setPosition(null)
            }}>Nytt punkt</button>
        </Popup>
    )
}

export default ContextMarker;