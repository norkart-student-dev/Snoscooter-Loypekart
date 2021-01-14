import React, {useState, useContext} from 'react';
import PadlockImg from './../assets/padlock.png';
import UserContext from '../Context';

function SideMenu({openLoginMenu, setDrawing}) {
    const [selecting, setSelecting] = useState(false)
    const user = useContext(UserContext)
    return (
        <div className="SideDiv">
            <img
                src={PadlockImg}
                width="50"
                onClick={() => openLoginMenu()}
                alt='Error'/>
            {!selecting && user.loggedIn && <button onClick={() => {setSelecting(true); setDrawing(true)}}>Velg løyper</button>}
            {selecting && user.loggedIn && <button onClick={() => {setSelecting(false); setDrawing(false)}}>Ferdig valgt</button>}
        </div>
    )
}

export default SideMenu;