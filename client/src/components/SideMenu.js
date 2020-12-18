import React, {Component} from 'react';
import PadlockImg from './../assets/padlock.png';

class SideMenu extends Component {
    constructor(props) {
        super(props);
    }


    component
    render() {
        return (
            <div className="SideDiv">
                <img
                    src={PadlockImg}
                    onClick={() => this.props.openLoginMenu()}/>
            </div>
        )
    }
}

export default SideMenu;