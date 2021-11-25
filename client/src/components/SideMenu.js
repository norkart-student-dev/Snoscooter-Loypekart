import React, { useState, useContext } from 'react';
import PadlockImg from './../assets/padlock.png';
import UserContext from '../Context';

function SideMenu({ openLoginMenu, setDrawing, forceReloadDB }) {
    const [selecting, setSelecting] = useState(false)
    const user = useContext(UserContext)
    return (
        <div className="SideDiv">
            <img
                src={PadlockImg}
                width="50"
                onClick={() => openLoginMenu()}
                alt='Error' />
            {!selecting && <button onClick={() => { setSelecting(true); setDrawing(true) }}>Velg løyper</button>}
            {selecting && <button onClick={() => { setSelecting(false); setDrawing(false) }}>Ferdig valgt</button>}
            {<button onClick={() => { forceReloadDB() }}>Last inn Løypedata på nytt</button>}
        </div>
    )
}

export default SideMenu;