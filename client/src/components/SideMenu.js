import React, {Component} from 'react';
import PadlockImg from './../assets/padlock.png';

class SideMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<img
                src={PadlockImg}
                className="SettingsIcon"
                onClick={() => this.props.openLoginMenu()}/>)
    }
}

export default SideMenu;