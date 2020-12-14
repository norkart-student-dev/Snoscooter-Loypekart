import React, {useContext} from 'react';
import { Popup, Marker } from 'react-leaflet';
import { parkingIcon, restStopIcon, reststopWcIcon, tentIcon, foodStopIcon, defaultIcon } from './Icons';
import UserContext from '../Context';
    
    // Returns the relevant marker for the item given 
    export default function PoiMarker({item, editPoi, deletePoi}) {
        const user = useContext(UserContext)
        
        let icon = null
        if(item.type === 'Parkeringsplass'){
            icon = parkingIcon
        } else if(item.type === 'Rasteplass'){
            icon = restStopIcon
        } else if(item.type === 'Rasteplass med WC'){
            icon = reststopWcIcon
        } else if(item.type === 'Matservering'){
            icon = foodStopIcon
        } else if(item.type === 'Teltplass'){
            icon = tentIcon
        } else {
            icon = defaultIcon
        }

        return(
            <Marker position={item.location.coordinates} icon={icon}>
                <Popup className='PoiInfo'>
                    <p>Navn: {item.name} <br/>Type: {item.type}</p>
                    {user.loggedIn && <button onClick={() => editPoi(item._id)}>Endre</button>}
                    {user.loggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi(item._id)}}>Slett</button>}

                </Popup>
            </Marker>
        );
    }