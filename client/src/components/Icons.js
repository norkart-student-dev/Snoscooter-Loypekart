import Leaflet from 'leaflet';
import ParkingImage from '../assets/Parking.jpg';



const parkingIcon = Leaflet.icon({ //add this new icon
    iconUrl: ParkingImage,
    iconSize:     [30, 30], // size of the icon
    iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export {
    parkingIcon
}