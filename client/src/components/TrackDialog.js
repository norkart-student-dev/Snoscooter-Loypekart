import {useState, useEffect} from 'react';

export default function TrackDialog({onDone, selectedTracks}){
    const [closed, setClosed] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if(selectedTracks.length === 1){
            setClosed(selectedTracks[0].properties.MIDL_STENGT)
            setComment(selectedTracks[0].properties.KOMMENTAR)
        }
    }, [selectedTracks])

    const closedOnChange = (event) => {
        setClosed(Boolean(event.target.value))
    }
    const commentOnChange = (event) => {
        setComment(event.target.value)
    }

    let onConfirm = () => onDone([], { 
            "MIDL_STENGT": closed,
            "KOMMENTAR": comment
        })

    return(
        <div className='NewPoiDialog'>
            <div className='NewPoiDialog-inner'>
                <select className='NewPoiDialog-items' value={closed} onChange={closedOnChange}>
                    <option value={false}>Åpen</option>
                    <option value={true}>Stengt</option>
                </select>

                <textarea value={comment} onChange={commentOnChange}></textarea>

                <button className='NewPoiDialog-button' 
                    onClick={() => onConfirm()}>Bekreft</button>
                <button className='NewPoiDialog-button' onClick={() => onDone([])}>Avbryt</button>
            </div>
        </div>
    )
}