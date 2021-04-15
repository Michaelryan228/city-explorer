import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './weather.js';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      haveWeSearchedYet: false,
      citySearchedFor: React.createRef(),
      cityName: '',
      cityLat: '',
      cityLon: '',
      cityMapSrc: '',
      weatherData: []
    };
  }

  handleFormSubmit = () => {
    this.setState({ haveWeSearchedYet: false });
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value });
  }
  getCityInfo = async (e) => {
    e.preventDefault();

    try {
      let locationResponseData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION}&q=${this.state.citySearchedFor}&format=json`);

      this.setState({
        haveWeSearchedYet: true,
        locationData: locationResponseData.data[0],
        cityName: locationResponseData.data[0].display_name,
        cityLat: locationResponseData.data[0].lat,
        cityLon: locationResponseData.data[0].lon,
        cityMapSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION}&center=${locationResponseData.data[0].lat},${locationResponseData.data[0].lon}&zoom=10`
      });
    } catch (err) {
      console.log('we found an error')
      this.setState({ error: `${err.message}`});
    }
    this.getWeatherData();
  }

  getWeatherData = async () => {
    try {
    const weatherData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/weather`)
    this.setState({
      weatherData: weatherData.data
    })
  } catch(err) {
    this.setState({error: `${err.message}`})
  }
  }

  render() {
    return (
      <>
      <div className="wrapper">
          <h1>City Explorer</h1>
          <form className="form" onSubmit={(e) => this.getCityInfo(e)}>
            <input type="text" name='citySearchedFor' onChange={(e) => this.handleChange(e)}
              placeholder="Search City,State" />
            <button type="submit">Explore</button>
          </form>
          {this.state.error ?
            <Card>
              <Card.Body>{this.state.error} : {this.state.error}</Card.Body>
            </Card> :
            ''}
          {this.state.haveWeSearchedYet ?
      <>
          <Card className="card" style={{ width: '30rem' }}
            bg="primary"
            text="light"
            >
            <Card.Img variant="top" src={this.state.cityMapSrc} alt="map" />
            <Card.Body>
              <Card.Title>{this.state.cityName}</Card.Title>
              <Card.Text>
                <>
                    Latitude: {this.state.cityLat}
                  <br></br>
                  Longitude: {this.state.cityLon}
                </>
              </Card.Text>
            </Card.Body>
            </Card>
            <Weather weatherData={this.state.weatherData} error={this.state.error} />
      </>
      : ''}
      </div>
    </>
    );
  }
}

export default App;