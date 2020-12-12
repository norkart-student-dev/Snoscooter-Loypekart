import {useState} from 'react';

export default function NewPoiDialog(props){
    const [textValue, setTextValue] = useState('');
    const [typeValue, setTypeValue] = useState('Parkeringsplass');

    const onTypeChange = (event) => {
        setTypeValue(event.target.value);
    };

    const onTextChange = (event) => {
      setTextValue(event.target.value);
    };

    let onConfirm = null;

    if(props.coords === undefined){
        onConfirm = () => props.onDone(null, { 
            "name": textValue, 
            "type": typeValue,
          })
    } else {
        onConfirm = () => props.onDone(null, { 
            "name": textValue, 
            "type": typeValue,
            "location": { 
                "type": "Point", 
                "coordinates": [props.coords.lat, props.coords.lng]
                }
          })
    }

    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={textValue} onChange={onTextChange}></input>
                <select className='NewPoiDialog-items' value={typeValue} onChange={onTypeChange}>
                    <option value="Parkeringsplass">Parkeringsplass</option>
                    <option value="Rasteplass">Rasteplass</option>
                </select>
                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => props.onDone(null)}>Avbryt</button>
            </div>
        </div>
        
    )
}