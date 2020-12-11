import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Mapview from './components/Map';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 60.0084857, lng:11.0648648 },
    };
  }

  componentDidMount() {
    this.getPois().then(data => this.setState({pois: data}));
  }

  render(){
    return(
      <Mapview pois={this.state.pois}/>
    );
  }

  async getPois(){
    const res = await axios.get('/poi');

    let data = res.data;
    return(data);
  }
}

export default App;
