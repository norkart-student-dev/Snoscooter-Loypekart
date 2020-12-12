import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import NewPoiDialog from './components/NewPoiDialog';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      creatingPoi: null
    };

    this.createPoi = this.createPoi.bind(this);
  }

  componentDidMount() {
    this.getPois().then(data => this.setState({pois: data}));
  }

  render(){
    return(
      <div>
        <Map pois={this.state.pois} createPoi={this.createPoi} creatingPoi={this.state.creatingPoi}/>

        {this.state.creatingPoi && <NewPoiDialog createPoi={this.createPoi} coords={this.state.creatingPoi}/>}
      </div>
      
    );
  }

  // Request a list of all PoI's from the backend
  async getPois(){
    const res = await axios.get('/poi');

    let data = res.data;
    return(data);
  }

  // Controls wether we are currently making a new PoI and passes data to the backend when done
  async createPoi(value, data){
    this.setState({creatingPoi: value})

    if(data !== undefined){
      const res = await axios.post('/poi', data);
      if(res.status === 201){
        const data = await this.getPois();
        this.setState({pois: data})
      }
    }
  }
}

export default App;
