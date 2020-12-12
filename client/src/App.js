import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import Map from './components/Map';
import NewPoiDialog from './components/NewPoiDialog';
import { UserProvider } from './Context'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatingPoi: null
    };

    this.user = {
      loggedIn: true
    }

    this.createPoi = this.createPoi.bind(this);
    this.editPoi = this.editPoi.bind(this);
    this.deletePoi = this.deletePoi.bind(this);
  }

  componentDidMount() {
    this.getPois().then(data => this.setState({poi_data: data}));
  }

  render(){
    return(
      <UserProvider value={this.user}>
        <Map 
          poi_data={this.state.poi_data} 
          createPoi={this.createPoi} 
          creatingPoi={this.state.creatingPoi} 
          editPoi={this.editPoi}
          deletePoi={this.deletePoi}
        />

        {this.state.creatingPoi && <NewPoiDialog onDone={this.createPoi} coords={this.state.creatingPoi}/>}
        {this.state.editingPoi && <NewPoiDialog onDone={this.editPoi}/>}
      </UserProvider>
    );
  }

  // Request a list of all PoI's from the backend
  async getPois(){
    const res = await axios.get('/poi');

    let data = res.data;
    return(data);
  }

  async deletePoi(id) {
    const res = await axios.delete('/poi/' + id);
    if(res.status === 201){
      const data = await this.getPois();
      this.setState({poi_data: data})
    }
  }

  // Value is either null or the id of the point that was clicked
  async editPoi(value, data){
    this.setState({editingPoi: value})
    if (value !== null){
      this.setState({selectedPoi: value})
    }

    if(data !== undefined){
      const res = await axios.patch('/poi/' + this.state.selectedPoi, data);
      if(res.status === 201){
        const data = await this.getPois();
        this.setState({poi_data: data})
      }
    }
  }

  // Controls wether we are currently making a new PoI and passes data to the backend when done
  // value is either null or an array with latitude, longitude
  async createPoi(value, data){
    this.setState({creatingPoi: value})

    if(data !== undefined){
      const res = await axios.post('/poi', data);
      if(res.status === 201){
        const data = await this.getPois();
        this.setState({poi_data: data})
      }
    }
  }
}

export default App;
