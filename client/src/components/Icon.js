import Leaflet from 'leaflet';
import ParkingImage from '../assets/Parkering.jpg';
import ReststopImage from '../assets/Rasteplass.jpg';
import TentImage from '../assets/Teltplass.jpg';
import FoodstopImage from '../assets/Spisested.jpg';
import ReststopWcImage from '../assets/Rasteplass_wc.jpg';

export default function Icon(item, image){
    const markerHtmlStyles = `
        background-color: transparent;
        display: grid;
        justify-items: center;
        justify-content: center;
        font-size: medium;
        color: white;
        text-shadow: -1.1px -1.1px 0 black, 1.1px -1.1px 0 black, -1.1px 1.1px 0 black, 1.1px 1.1px 0 black;
        grid-template-rows: 1fr 1fr;`
    
    const defaultIcon = Leaflet.divIcon({
        iconSize:     [30, 30], // size of the icon
        iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, 0],
        className: 'divIcon',
        html: `
            <div style="${markerHtmlStyles}">
                <b>${item.name}</b>
                <img class="Icon" src="${image}" width="30" height="30"/>
            </div>`
    })

    return defaultIcon
}