import { useState, useContext } from 'react';
import UserContext from '../Context';
import { Popup, useMapEvents } from 'react-leaflet';


function TrackmarkerPopup({item, coords, editTrack, splitTrack}) {
    const user = useContext(UserContext)
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
        <Popup className='trackInfo' id={item._id} position={position}>
            <p>Navn: {item._id}</p>
            {user.loggedIn && <button onClick={() => {editTrack(item._id); setPosition(null)}}>Endre</button>}
            {user.loggedIn && <button onClick={() => {splitTrack(item, coords); setPosition(null)}}>Split her</button>}
        </Popup>
    )
}

export default TrackmarkerPopup;