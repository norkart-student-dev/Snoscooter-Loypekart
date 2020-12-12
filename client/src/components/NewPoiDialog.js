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
    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <input className='NewPoiDialog-items' type='text' placeholder='Navn' value={textValue} onChange={onTextChange}></input>
                <select className='NewPoiDialog-items' value={typeValue} onChange={onTypeChange}>
                    <option value="Parkeringsplass">Parkeringsplass</option>
                    <option value="Rasteplass">Rasteplass</option>
                </select>
                <button className='NewPoiDialog-button' 
                    onClick={() => props.createPoi(null, { 
                        "name": textValue, 
                        "type": typeValue,
                        "location": { 
                            "type": "Point", 
                            "coordinates": [props.coords.lat, props.coords.lng]
                            }
                      })}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => props.createPoi(null)}>Avbryt</button>
            </div>
        </div>
        
    )
}