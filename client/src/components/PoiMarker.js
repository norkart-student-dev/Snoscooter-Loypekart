import React, {useContext} from 'react';
import { Popup, Marker } from 'react-leaflet';
import { parkingIcon, restStopIcon, reststopWcIcon, tentIcon, foodStopIcon, defaultIcon } from './Icons';
import UserContext from '../Context';
import Icon from './Icon';
    
    // Returns the relevant marker for the item given 
    export default function PoiMarker({item, editPoi, deletePoi}) {
        const user = useContext(UserContext)
        const popup = React.createRef()

        const closePopup = () => {
            console.log(popup.current._closeButton.click())
        }
        
        let icon = null
        if(item.type === 'Parkeringsplass'){
            icon = Icon(item)
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
                <Popup className='PoiInfo' ref={popup}>
                    <p>
                        <b>Navn:</b> {item.name} <br/>
                        <b>Type:</b> {item.type} <br/>
                    </p>
                    {item.comment ? <p>
                        <b>Informasjon:</b> <br/>
                        {item.comment}
                    </p> : null}

                    {user.loggedIn && <button onClick={() => {editPoi(item._id); closePopup();}}>Endre</button>}
                    {user.loggedIn && <button onClick={() => { if (window.confirm('Er du sikker på at du vil slette dette punktet?')) deletePoi(item._id); closePopup();}}>Slett</button>}

                </Popup>
            </Marker>
        );
    }