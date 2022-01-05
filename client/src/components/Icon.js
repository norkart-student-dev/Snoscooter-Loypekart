import Leaflet from 'leaflet';

export default function Icon(item) {
    const markerHtmlStyles = `
        display: grid;
        justify-items: center;
        justify-content: center;
        font-size: medium;
        color: white;
        text-shadow: -1.1px -1.1px 0 black, 1.1px -1.1px 0 black, -1.1px 1.1px 0 black, 1.1px 1.1px 0 black;
        grid-template-rows: 1fr 1fr;`

    const defaultIcon = Leaflet.divIcon({
        iconSize: [30, 30], // size of the icon
        iconAnchor: [15, 35], // point of the icon which will correspond to marker's location
        popupAnchor: [15, 15],
        className: 'divIcon',
        html: `
            <div style="${markerHtmlStyles}">
                <div><b>${item.name}</b></div>
                <div class="placeIcon"/>
            </div>`
    })

    return defaultIcon
}