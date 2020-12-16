import {useState, useEffect} from 'react';

export default function NewPoiDialog({onDone, selectedTrack}){
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        if(selectedTrack !== null && selectedTrack !== undefined){
            setClosed(selectedTrack.properties.MIDL_STENGT)
        }
    }, [selectedTrack])

    const closedOnChange = (event) => {
        setClosed(Boolean(event.target.value))
    }

    let onConfirm = () => onDone(null, { 
            "MIDL_STENGT": closed 
        })

    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <select className='NewPoiDialog-items' value={closed} onChange={closedOnChange}>
                    <option value={false}>Åpen</option>
                    <option value={true}>Stengt</option>

                </select>
                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone(null)}>Avbryt</button>
            </div>
        </div>
    )
}